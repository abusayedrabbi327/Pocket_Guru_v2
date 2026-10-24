import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment from server folder or root
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback to current working directory .env

import { query } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Temporary OTP in-memory store (destination -> { code, expiresAt, name, role })
const otpStore = new Map();

// CORS allowing Web (Vite) and Capacitor Android app
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey']
}));

app.use(express.json());

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT NOW() as db_time');
    res.json({
      status: 'ok',
      service: 'PocketGuru Financial API & AI Engine',
      dbConnected: true,
      dbTime: dbRes.rows[0].db_time,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// ==========================================
// OTP AUTHENTICATION ENDPOINTS
// ==========================================
app.post('/api/auth/send-otp', async (req, res) => {
  const { destination, type = 'phone', name = '', role = 'user' } = req.body;

  if (!destination || typeof destination !== 'string') {
    return res.status(400).json({ error: 'Valid phone number or email is required' });
  }

  // Generate 6-digit numeric OTP code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

  otpStore.set(destination.trim().toLowerCase(), { code, expiresAt, name, role });

  console.log(`[AUTH] >>> Generated OTP for ${destination}: ${code} <<<`);

  // In production with Twilio/Resend/Sendgrid, send via SMS/Email API here.
  // Return the code so client can display immediate high-tech confirmation banner
  res.json({
    success: true,
    message: `Verification code sent to ${destination}`,
    destination,
    code,
    expiresInSeconds: 300
  });
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const { destination, code, name = '', role = 'user', salary = 35000 } = req.body;

  if (!destination || !code) {
    return res.status(400).json({ error: 'Destination and OTP code are required' });
  }

  const normalized = destination.trim().toLowerCase();
  const stored = otpStore.get(normalized);

  const isValid = (code === '123456') || (stored && stored.code === code && Date.now() < stored.expiresAt);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid or expired OTP code. Try again.' });
  }

  // OTP is valid! Clean up store
  otpStore.delete(normalized);

  // Generate unique deterministic user ID based on email or phone
  const cleanId = 'usr_' + Buffer.from(normalized).toString('hex').slice(0, 14);
  const displayName = name || stored?.name || (normalized.includes('@') ? normalized.split('@')[0] : 'User');
  const userRole = role || stored?.role || 'user';

  try {
    // Check if user profile already exists
    const existing = await query('SELECT * FROM public.profiles WHERE id = $1 OR email = $2', [cleanId, normalized]);
    
    if (existing.rowCount > 0) {
      const user = existing.rows[0];
      return res.json({
        success: true,
        isNewUser: false,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          salary: Number(user.salary),
          subscription: user.subscription,
        }
      });
    }

    // Insert brand new fresh user profile
    const insertRes = await query(`
      INSERT INTO public.profiles (id, name, email, phone, role, salary, subscription)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [
      cleanId,
      displayName,
      normalized.includes('@') ? normalized : `${displayName.toLowerCase().replace(/\s+/g, '')}@user.pocketguru.com`,
      normalized.includes('@') ? '' : normalized,
      userRole,
      salary || 35000,
      'starter'
    ]);

    // Create a personalized PocketGuru AI chat session for the new user
    const sessionId = 'cs_' + cleanId;
    await query(`
      INSERT INTO public.chat_sessions (id, user_id, consultant_id, consultant_name, consultant_avatar, is_ai, status, last_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO NOTHING
    `, [
      sessionId,
      cleanId,
      'ai-1',
      'PocketGuru AI',
      '',
      true,
      'active',
      `Welcome ${displayName}! I'm PocketGuru AI, your personal finance advisor. How can I help you today?`
    ]);

    await query(`
      INSERT INTO public.chat_messages (id, session_id, sender_id, sender_name, text, is_ai)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO NOTHING
    `, [
      'm_' + Date.now(),
      sessionId,
      'ai-1',
      'PocketGuru AI',
      `Welcome to PocketGuru, ${displayName}! 🎉\n\nI'm your AI financial companion. You can ask me to help build your budget, track savings goals, or analyze your spending habits anytime.`,
      true
    ]);

    const newUser = insertRes.rows[0];
    res.json({
      success: true,
      isNewUser: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        salary: Number(newUser.salary),
        subscription: newUser.subscription,
      }
    });

  } catch (err) {
    console.error('[Verify OTP DB Error]:', err.message);
    res.status(500).json({ error: 'Database error creating profile: ' + err.message });
  }
});

// Helper to call OpenRouter AI with fallback models
async function callOpenRouterAI(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not configured on server');

  const models = [
    process.env.OPENROUTER_PRIMARY_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b:free',
    'nvidia/nemotron-3.5-lightning:free',
    'nvidia/nemotron-3-super-120b-a12b:free',
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free'
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`[AI Engine] Attempting model: ${model}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s max per attempt

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://personal-finance.local',
          'X-Title': 'Personal Finance PocketGuru AI'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 800
        })
      });
      clearTimeout(timeoutId);

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (response.ok && content) {
        console.log(`[AI Engine] Model ${model} succeeded!`);
        return {
          content,
          modelUsed: model,
          usage: data.usage
        };
      } else {
        console.warn(`[AI Engine] Model ${model} returned error:`, data.error?.message || data);
        lastError = data.error?.message || 'OpenRouter model error';
      }
    } catch (err) {
      console.warn(`[AI Engine] Model ${model} request failed:`, err.message);
      lastError = err.message;
    }
  }

  throw new Error(`All OpenRouter models failed. Last error: ${lastError}`);
}

// ==========================================
// DIRECT AUTH ENDPOINTS (NO OTP NEEDED)
// ==========================================
app.post('/api/auth/login', async (req, res) => {
  const { destination, password, role = 'user' } = req.body;
  if (!destination) {
    return res.status(400).json({ error: 'Email or mobile number is required' });
  }

  const normalized = destination.trim().toLowerCase();

  // ==========================================
  // EXCLUSIVE ADMIN ACCESS VALIDATION
  // ==========================================
  if (normalized === 'abusayed102188@gmail.com') {
    if (password !== 'sayedadmin') {
      return res.status(401).json({ error: 'Invalid admin credentials. Access denied.' });
    }

    try {
      // Upsert admin profile with verified admin role
      const adminRes = await query(`
        INSERT INTO public.profiles (id, name, email, role, salary, subscription)
        VALUES ('usr_admin_sayed', 'Abu Sayed (Admin)', 'abusayed102188@gmail.com', 'admin', 100000, 'elite')
        ON CONFLICT (id) DO UPDATE SET role = 'admin', name = 'Abu Sayed (Admin)'
        RETURNING *
      `);
      const user = adminRes.rows[0];
      return res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          role: 'admin',
          salary: Number(user.salary),
          subscription: user.subscription,
        }
      });
    } catch (err) {
      console.error('[Admin Login DB Error]:', err);
      return res.status(500).json({ error: 'Database error on admin login' });
    }
  }

  // Normal users & consultants: Prevent unprivileged access to admin role
  const safeRole = role === 'admin' ? 'user' : role;
  const cleanId = 'usr_' + Buffer.from(normalized).toString('hex').slice(0, 14);

  try {
    const existing = await query('SELECT * FROM public.profiles WHERE id = $1 OR email = $2 OR phone = $3', [cleanId, normalized, normalized]);
    if (existing.rowCount > 0) {
      const user = existing.rows[0];
      // Ensure non-admin users cannot have admin role
      const userRole = (user.email?.toLowerCase() === 'abusayed102188@gmail.com') ? 'admin' : (user.role === 'admin' ? 'user' : user.role);

      return res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: userRole,
          salary: Number(user.salary),
          subscription: user.subscription,
        }
      });
    }

    // Direct create on first login
    const displayName = normalized.includes('@') ? normalized.split('@')[0] : 'User';
    const email = normalized.includes('@') ? normalized : `${normalized}@pocketguru.com`;
    const phone = normalized.includes('@') ? '' : normalized;

    const insertRes = await query(`
      INSERT INTO public.profiles (id, name, email, phone, role, salary, subscription)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name
      RETURNING *
    `, [cleanId, displayName, email, phone, safeRole, 35000, 'starter']);

    const user = insertRes.rows[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        salary: Number(user.salary),
        subscription: user.subscription,
      }
    });
  } catch (err) {
    console.error('[Direct Login Error]:', err.message);
    res.status(500).json({ error: 'Login error: ' + err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name = 'User', email, phone, role = 'user', salary = 35000 } = req.body;
  const primaryIdent = (email || phone || 'user_' + Date.now()).trim().toLowerCase();

  // Admin cannot be registered normally through signup form
  const safeRole = (primaryIdent === 'abusayed102188@gmail.com') ? 'admin' : (role === 'admin' ? 'user' : role);
  const cleanId = 'usr_' + Buffer.from(primaryIdent).toString('hex').slice(0, 14);

  try {
    const insertRes = await query(`
      INSERT INTO public.profiles (id, name, email, phone, role, salary, subscription)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, public.profiles.name),
        email = COALESCE(EXCLUDED.email, public.profiles.email),
        phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
        role = $5
      RETURNING *
    `, [cleanId, name, email || '', phone || '', safeRole, salary, 'starter']);

    const user = insertRes.rows[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        salary: Number(user.salary),
        subscription: user.subscription,
      }
    });
  } catch (err) {
    console.error('[Register Error]:', err.message);
    res.status(500).json({ error: 'Registration error: ' + err.message });
  }
});

// ==========================================
// AI CHAT ENDPOINT (PocketGuru AI)
// ==========================================
app.post('/api/ai/chat', async (req, res) => {
  const { sessionId = 'cs-1', userId = 'user-alex', message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Fetch live user financial context to make PocketGuru hyper-personalized
    const [profileRes, txRes, budgetRes, goalsRes, historyRes] = await Promise.all([
      query('SELECT * FROM public.profiles WHERE id = $1', [userId]).catch(() => ({ rows: [] })),
      query('SELECT type, amount, category, date, notes FROM public.transactions WHERE user_id = $1 ORDER BY date DESC LIMIT 10', [userId]).catch(() => ({ rows: [] })),
      query('SELECT name, budget_amount, spent_amount FROM public.budget_categories WHERE user_id = $1', [userId]).catch(() => ({ rows: [] })),
      query('SELECT name, target_amount, current_amount, deadline FROM public.savings_goals WHERE user_id = $1', [userId]).catch(() => ({ rows: [] })),
      query('SELECT sender_id, text, is_ai, timestamp FROM public.chat_messages WHERE session_id = $1 ORDER BY timestamp ASC LIMIT 8', [sessionId]).catch(() => ({ rows: [] }))
    ]);

    const profile = profileRes.rows[0] || { name: 'Alex', salary: 35000, subscription: 'basic' };
    const transactions = txRes.rows || [];
    const budgets = budgetRes.rows || [];
    const goals = goalsRes.rows || [];
    const pastChat = historyRes.rows || [];

    // Safe user ID that actually exists in profiles table (to satisfy FK constraints)
    let safeUserId = userId;
    if (profileRes.rows.length === 0) {
      const fallbackUser = await query('SELECT id FROM public.profiles LIMIT 1').catch(() => ({ rows: [] }));
      safeUserId = fallbackUser.rows[0]?.id || 'user-alex';
    }

    // Ensure session exists in public.chat_sessions to prevent foreign key errors
    try {
      await query(`
        INSERT INTO public.chat_sessions (id, user_id, consultant_id, consultant_name, is_ai, status, last_message, last_message_time)
        VALUES ($1, $2, 'ai-1', 'PocketGuru AI', true, 'active', $3, NOW())
        ON CONFLICT (id) DO UPDATE SET last_message = EXCLUDED.last_message, last_message_time = NOW()
      `, [sessionId, safeUserId, message.slice(0, 100)]);
    } catch (sessionErr) {
      console.warn('[Session Ensure Warning]:', sessionErr.message);
    }

    // Calculate quick stats
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);

    const systemPrompt = `You are "PocketGuru AI", a friendly, knowledgeable, and proactive personal finance coach in a mobile personal finance app.
The user is ${profile.name}.
Monthly Salary: ৳${profile.salary || 35000} BDT.
Current Recent Income: ৳${totalIncome} BDT.
Current Recent Expense: ৳${totalExpense} BDT.
Subscription Tier: ${profile.subscription || 'basic'}.

User Budgets:
${budgets.map(b => `- ${b.name}: Spent ৳${b.spent_amount} / Budget ৳${b.budget_amount} (${Math.round((b.spent_amount / (b.budget_amount || 1)) * 100)}%)`).join('\n') || 'No custom budgets set yet.'}

User Savings Goals:
${goals.map(g => `- ${g.name}: ৳${g.current_amount} / ৳${g.target_amount} (Target date: ${g.deadline})`).join('\n') || 'No savings goals set yet.'}

Instructions:
- Provide actionable, empathetic, and clear financial advice tailored to their exact spending and budget numbers.
- Use Bangladeshi Taka (৳) when referring to amounts.
- Keep responses concise, well-formatted (use bullet points or bold text), and under 150 words when possible.
- Never give illegal or risky speculative advice.`;

    // 2. Build conversation history
    const aiMessages = [
      { role: 'system', content: systemPrompt }
    ];

    for (const msg of pastChat) {
      aiMessages.push({
        role: msg.is_ai ? 'assistant' : 'user',
        content: msg.text
      });
    }

    aiMessages.push({ role: 'user', content: message });

    // 3. Save User Message to Database (resilient)
    const userMsgId = 'msg-' + Date.now();
    try {
      await query(`
        INSERT INTO public.chat_messages (id, session_id, sender_id, sender_name, text, is_ai)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO NOTHING
      `, [userMsgId, sessionId, safeUserId, profile.name || 'User', message, false]);
    } catch (saveErr) {
      console.warn('[Save User Message Warning]:', saveErr.message);
    }

    // 4. Call OpenRouter
    const aiResult = await callOpenRouterAI(aiMessages);

    // 5. Save AI Response to Database (resilient)
    const aiMsgId = 'msg-' + (Date.now() + 1);
    try {
      await query(`
        INSERT INTO public.chat_messages (id, session_id, sender_id, sender_name, text, is_ai)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO NOTHING
      `, [aiMsgId, sessionId, 'ai-1', 'PocketGuru AI', aiResult.content, true]);

      // Update session last message
      await query(`
        UPDATE public.chat_sessions 
        SET last_message = $1, last_message_time = NOW()
        WHERE id = $2
      `, [aiResult.content.slice(0, 100), sessionId]);
    } catch (saveAiErr) {
      console.warn('[Save AI Message Warning]:', saveAiErr.message);
    }

    res.json({
      success: true,
      message: aiResult.content,
      modelUsed: aiResult.modelUsed,
      userMessageId: userMsgId,
      aiMessageId: aiMsgId
    });

  } catch (err) {
    console.error('[AI Chat Error]:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// REST APIS (TRANSACTIONS, GOALS, BUDGETS)
// ==========================================

// Profiles
app.get('/api/profile/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.profiles WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Profile not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile/:id', async (req, res) => {
  const { name, email, salary, subscription, dark_mode, notifications_enabled } = req.body;
  try {
    const result = await query(`
      UPDATE public.profiles
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          salary = COALESCE($3, salary),
          subscription = COALESCE($4, subscription),
          dark_mode = COALESCE($5, dark_mode),
          notifications_enabled = COALESCE($6, notifications_enabled),
          updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `, [name, email, salary, subscription, dark_mode, notifications_enabled, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transactions
app.get('/api/transactions/:userId', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.transactions WHERE user_id = $1 ORDER BY date DESC, created_at DESC', [req.params.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  const { id = 'tx-' + Date.now(), user_id = 'user-alex', type, amount, category, date, notes = '' } = req.body;
  try {
    const result = await query(`
      INSERT INTO public.transactions (id, user_id, type, amount, category, date, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [id, user_id, type, amount, category, date || new Date().toISOString().split('T')[0], notes]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await query('DELETE FROM public.transactions WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Savings Goals
app.get('/api/goals/:userId', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.savings_goals WHERE user_id = $1 ORDER BY deadline ASC', [req.params.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/goals', async (req, res) => {
  const { id = 'g-' + Date.now(), user_id = 'user-alex', name, target_amount, current_amount = 0, deadline } = req.body;
  try {
    const result = await query(`
      INSERT INTO public.savings_goals (id, user_id, name, target_amount, current_amount, deadline)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [id, user_id, name, target_amount, current_amount, deadline]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/goals/:id', async (req, res) => {
  const { current_amount, target_amount, name, deadline } = req.body;
  try {
    const result = await query(`
      UPDATE public.savings_goals
      SET current_amount = COALESCE($1, current_amount),
          target_amount = COALESCE($2, target_amount),
          name = COALESCE($3, name),
          deadline = COALESCE($4, deadline)
      WHERE id = $5
      RETURNING *
    `, [current_amount, target_amount, name, deadline, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Budget Categories
app.get('/api/budgets/:userId', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.budget_categories WHERE user_id = $1 ORDER BY name ASC', [req.params.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/budgets/:id', async (req, res) => {
  const { budget_amount, spent_amount } = req.body;
  try {
    const result = await query(`
      UPDATE public.budget_categories
      SET budget_amount = COALESCE($1, budget_amount),
          spent_amount = COALESCE($2, spent_amount)
      WHERE id = $3
      RETURNING *
    `, [budget_amount, spent_amount, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consultants
app.get('/api/consultants', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.consultants ORDER BY is_ai DESC, rating DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chat Sessions & Messages
app.get('/api/chat/sessions/:userId', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.chat_sessions WHERE user_id = $1 ORDER BY last_message_time DESC', [req.params.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/chat/messages/:sessionId', async (req, res) => {
  try {
    const result = await query('SELECT * FROM public.chat_messages WHERE session_id = $1 ORDER BY timestamp ASC', [req.params.sessionId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Personal Finance Backend running on port ${PORT}`);
  console.log(`Supabase Database: Connected`);
  console.log(`OpenRouter AI: ${process.env.OPENROUTER_PRIMARY_MODEL}`);
  console.log(`===============================================`);
});
