import { pool, query } from '../db.js';

const schemaSql = `
-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Alex Johnson',
  email TEXT NOT NULL DEFAULT 'alex@example.com',
  phone TEXT DEFAULT '',
  avatar TEXT DEFAULT '',
  role TEXT DEFAULT 'user',
  salary NUMERIC DEFAULT 25000,
  subscription TEXT DEFAULT 'basic',
  dark_mode BOOLEAN DEFAULT false,
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date DESC);

-- 3. Savings Goals Table
CREATE TABLE IF NOT EXISTS public.savings_goals (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC NOT NULL DEFAULT 0,
  deadline DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_goals_user ON public.savings_goals(user_id);

-- 4. Budget Categories Table
CREATE TABLE IF NOT EXISTS public.budget_categories (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  budget_amount NUMERIC NOT NULL DEFAULT 0,
  spent_amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_budgets_user ON public.budget_categories(user_id);

-- 5. Consultants Table
CREATE TABLE IF NOT EXISTS public.consultants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INT DEFAULT 0,
  avatar TEXT DEFAULT '',
  is_ai BOOLEAN DEFAULT false,
  hourly_rate NUMERIC DEFAULT 0,
  availability TEXT DEFAULT 'available',
  bio TEXT DEFAULT '',
  certifications JSONB DEFAULT '[]'::jsonb,
  experience INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Chat Sessions Table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  consultant_id TEXT NOT NULL,
  consultant_name TEXT NOT NULL,
  consultant_avatar TEXT DEFAULT '',
  is_ai BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  last_message TEXT DEFAULT '',
  last_message_time TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user ON public.chat_sessions(user_id);

-- 7. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  text TEXT NOT NULL,
  is_ai BOOLEAN DEFAULT false,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id, timestamp ASC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public access for anon/authenticated (controlled by app token/user_id)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to profiles') THEN
    CREATE POLICY "Allow all access to profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to transactions') THEN
    CREATE POLICY "Allow all access to transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to savings_goals') THEN
    CREATE POLICY "Allow all access to savings_goals" ON public.savings_goals FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to budget_categories') THEN
    CREATE POLICY "Allow all access to budget_categories" ON public.budget_categories FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to consultants') THEN
    CREATE POLICY "Allow all access to consultants" ON public.consultants FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to chat_sessions') THEN
    CREATE POLICY "Allow all access to chat_sessions" ON public.chat_sessions FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access to chat_messages') THEN
    CREATE POLICY "Allow all access to chat_messages" ON public.chat_messages FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
`;

async function seedData() {
  console.log('--- Initializing Supabase Tables & Schema ---');
  await query(schemaSql);
  console.log('✓ Tables & RLS Policies ensured.');

  // Enable Realtime Publication
  try {
    await query(`
      DO $$
      BEGIN
        BEGIN
          ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions, public.savings_goals, public.budget_categories, public.chat_sessions, public.chat_messages;
        EXCEPTION
          WHEN duplicate_object THEN NULL;
          WHEN undefined_object THEN NULL;
        END;
      END $$;
    `);
    console.log('✓ Supabase Realtime publication configured.');
  } catch (err) {
    console.warn('Realtime publication note:', err.message);
  }

  // Check and seed default user profile
  const userCheck = await query('SELECT id FROM public.profiles WHERE id = $1', ['user-alex']);
  if (userCheck.rowCount === 0) {
    await query(`
      INSERT INTO public.profiles (id, name, email, avatar, role, salary, subscription)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      'user-alex',
      'Alex Johnson',
      'alex.j@example.com',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      'user',
      25000,
      'basic'
    ]);
    console.log('✓ Seeded default profile (Alex Johnson).');
  }

  // Check and seed consultants
  const consultantCheck = await query('SELECT count(*) as count FROM public.consultants');
  if (parseInt(consultantCheck.rows[0].count) === 0) {
    const consultants = [
      {
        id: "ai-1",
        name: "PocketGuru AI",
        specialty: "Budget Planning & Analysis",
        rating: 4.9,
        reviewCount: 12450,
        avatar: "",
        isAI: true,
        hourlyRate: 0,
        availability: "available",
        bio: "Your AI-powered financial companion powered by NVIDIA Nemotron. I analyze your spending patterns, create personalized budgets, and provide instant financial advice 24/7.",
        certifications: ["AI Financial Advisor", "Nemotron Optimization Engine"],
        experience: 0,
      },
      {
        id: "h-1",
        name: "Sarah Rahman",
        specialty: "Budget Planning",
        rating: 4.8,
        reviewCount: 234,
        avatar: "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?fit=max&fm=jpg&w=400&q=80",
        isAI: false,
        hourlyRate: 500,
        availability: "available",
        bio: "Certified financial planner with 8 years of experience helping young professionals manage their money wisely.",
        certifications: ["CFP", "CFA Level II"],
        experience: 8,
      },
      {
        id: "h-2",
        name: "Ahmed Khan",
        specialty: "Investment Strategy",
        rating: 4.9,
        reviewCount: 412,
        avatar: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?fit=max&fm=jpg&w=400&q=80",
        isAI: false,
        hourlyRate: 800,
        availability: "busy",
        bio: "Former investment banker turned personal finance advisor. I help build wealth through smart investing.",
        certifications: ["CFA", "CAIA", "FRM"],
        experience: 12,
      },
      {
        id: "h-3",
        name: "Priya Sharma",
        specialty: "Tax Planning",
        rating: 4.7,
        reviewCount: 189,
        avatar: "https://images.unsplash.com/photo-1659353220597-71b8c6a56259?fit=max&fm=jpg&w=400&q=80",
        isAI: false,
        hourlyRate: 600,
        availability: "available",
        bio: "Tax consultant specializing in freelancer and gig economy workers. Smart deductions and tax planning.",
        certifications: ["CPA", "EA"],
        experience: 6,
      }
    ];

    for (const c of consultants) {
      await query(`
        INSERT INTO public.consultants (id, name, specialty, rating, review_count, avatar, is_ai, hourly_rate, availability, bio, certifications, experience)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        c.id, c.name, c.specialty, c.rating, c.reviewCount, c.avatar, c.isAI, c.hourlyRate, c.availability, c.bio, JSON.stringify(c.certifications), c.experience
      ]);
    }
    console.log(`✓ Seeded ${consultants.length} consultants.`);
  }

  // Seed default transactions for user-alex
  const txCheck = await query('SELECT count(*) as count FROM public.transactions WHERE user_id = $1', ['user-alex']);
  if (parseInt(txCheck.rows[0].count) === 0) {
    const txs = [
      { id: "tx-1", type: "income", amount: 10000, category: "Salary", date: "2026-02-03", notes: "Monthly salary" },
      { id: "tx-2", type: "income", amount: 5000, category: "Freelance", date: "2026-02-08", notes: "Consulting work" },
      { id: "tx-3", type: "expense", amount: 500, category: "Food", date: "2026-02-09", notes: "Groceries" },
      { id: "tx-4", type: "expense", amount: 1200, category: "Transport", date: "2026-02-05", notes: "Uber rides" },
      { id: "tx-5", type: "expense", amount: 800, category: "Shopping", date: "2026-02-01", notes: "New headphones" },
      { id: "tx-6", type: "expense", amount: 2500, category: "Rent", date: "2026-02-01", notes: "Monthly rent" },
      { id: "tx-7", type: "expense", amount: 300, category: "Entertainment", date: "2026-02-12", notes: "Movie tickets" },
      { id: "tx-8", type: "income", amount: 2000, category: "Side Hustle", date: "2026-02-15", notes: "Design project" },
    ];
    for (const tx of txs) {
      await query(`
        INSERT INTO public.transactions (id, user_id, type, amount, category, date, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [tx.id, 'user-alex', tx.type, tx.amount, tx.category, tx.date, tx.notes]);
    }
    console.log(`✓ Seeded ${txs.length} transactions.`);
  }

  // Seed default savings goals
  const goalsCheck = await query('SELECT count(*) as count FROM public.savings_goals WHERE user_id = $1', ['user-alex']);
  if (parseInt(goalsCheck.rows[0].count) === 0) {
    const goals = [
      { id: "g-1", name: "Emergency Fund", targetAmount: 50000, currentAmount: 37500, deadline: "2026-06-30" },
      { id: "g-2", name: "New Laptop", targetAmount: 80000, currentAmount: 25000, deadline: "2026-12-31" },
      { id: "g-3", name: "Vacation Trip", targetAmount: 30000, currentAmount: 12000, deadline: "2026-08-15" },
    ];
    for (const g of goals) {
      await query(`
        INSERT INTO public.savings_goals (id, user_id, name, target_amount, current_amount, deadline)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [g.id, 'user-alex', g.name, g.targetAmount, g.currentAmount, g.deadline]);
    }
    console.log(`✓ Seeded ${goals.length} savings goals.`);
  }

  // Seed default budget categories
  const budgetCheck = await query('SELECT count(*) as count FROM public.budget_categories WHERE user_id = $1', ['user-alex']);
  if (parseInt(budgetCheck.rows[0].count) === 0) {
    const budgets = [
      { id: "b-1", name: "Food", budgetAmount: 5000, spentAmount: 3200 },
      { id: "b-2", name: "Transport", budgetAmount: 3000, spentAmount: 2700 },
      { id: "b-3", name: "Shopping", budgetAmount: 4000, spentAmount: 1800 },
      { id: "b-4", name: "Rent", budgetAmount: 10000, spentAmount: 10000 },
      { id: "b-5", name: "Entertainment", budgetAmount: 2000, spentAmount: 800 },
      { id: "b-6", name: "Utilities", budgetAmount: 2000, spentAmount: 1500 },
    ];
    for (const b of budgets) {
      await query(`
        INSERT INTO public.budget_categories (id, user_id, name, budget_amount, spent_amount)
        VALUES ($1, $2, $3, $4, $5)
      `, [b.id, 'user-alex', b.name, b.budgetAmount, b.spentAmount]);
    }
    console.log(`✓ Seeded ${budgets.length} budget categories.`);
  }

  // Seed default chat session
  const chatCheck = await query('SELECT count(*) as count FROM public.chat_sessions WHERE user_id = $1', ['user-alex']);
  if (parseInt(chatCheck.rows[0].count) === 0) {
    await query(`
      INSERT INTO public.chat_sessions (id, user_id, consultant_id, consultant_name, consultant_avatar, is_ai, status, last_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      'cs-1',
      'user-alex',
      'ai-1',
      'PocketGuru AI',
      '',
      true,
      'active',
      'This could save you ৳1,200/month! Shall I set up a daily food budget alert?'
    ]);

    const initialMessages = [
      {
        id: "m1",
        senderId: "ai-1",
        senderName: "PocketGuru AI",
        text: "Hi Alex! I've analyzed your spending patterns. Your food expenses are 36% above your budget. Would you like me to suggest ways to optimize?",
        isAI: true,
      },
      {
        id: "m2",
        senderId: "user-alex",
        senderName: "Alex",
        text: "Yes please! What can I do to reduce my food spending?",
        isAI: false,
      },
      {
        id: "m3",
        senderId: "ai-1",
        senderName: "PocketGuru AI",
        text: "Great question! Here are 3 actionable tips:\n\n1. **Meal prep on Sundays** — saves ~৳800/month\n2. **Use cashback apps** for groceries — saves ~৳200/month\n3. **Set a daily food budget** of ৳150 instead of spending freely\n\nThis could save you ৳1,200/month! Shall I set up a daily food budget alert?",
        isAI: true,
      }
    ];

    for (const m of initialMessages) {
      await query(`
        INSERT INTO public.chat_messages (id, session_id, sender_id, sender_name, text, is_ai)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [m.id, 'cs-1', m.senderId, m.senderName, m.text, m.isAI]);
    }
    console.log('✓ Seeded initial chat session & messages.');
  }

  console.log('--- Database Initialization Complete! ---');
  await pool.end();
}

seedData().catch(err => {
  console.error('Database migration/seed error:', err);
  process.exit(1);
});
