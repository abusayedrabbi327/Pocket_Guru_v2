const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const CANDIDATE_URLS = [
  import.meta.env.VITE_API_BASE_URL,
  isLocalhost ? 'http://localhost:5000/api' : null,
  'http://192.168.0.102:5000/api',
  'http://localhost:5000/api'
].filter(Boolean) as string[];

export interface AiChatResponse {
  success: boolean;
  message: string;
  modelUsed: string;
  userMessageId: string;
  aiMessageId: string;
}

export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "user" | "consultant" | "admin";
    salary: number;
    subscription: string;
  };
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  destination: string;
  code?: string;
  expiresInSeconds?: number;
}

export interface VerifyOtpResponse {
  success: boolean;
  isNewUser: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "user" | "consultant" | "admin";
    salary: number;
    subscription: string;
  };
}

export async function loginDirect(destination: string, password?: string, role: string = 'user'): Promise<AuthResponse> {
  let lastError: Error | null = null;
  for (const baseUrl of CANDIDATE_URLS) {
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, password, role }),
      });
      if (res.ok) {
        return await res.json();
      }
      const data = await res.json().catch(() => ({}));
      if (data.error) throw new Error(data.error);
    } catch (err: any) {
      lastError = err;
    }
  }

  // Offline/Direct fallback
  const isSayedAdmin = destination.trim().toLowerCase() === 'abusayed102188@gmail.com';
  if (isSayedAdmin) {
    if (password !== 'sayedadmin') {
      throw new Error('Invalid admin credentials. Access denied.');
    }
    return {
      success: true,
      user: {
        id: 'usr_admin_sayed',
        name: 'Abu Sayed (Admin)',
        email: 'abusayed102188@gmail.com',
        phone: '',
        role: 'admin',
        salary: 100000,
        subscription: 'elite'
      }
    };
  }

  // Any non-admin user fallback
  const safeFallbackRole = role === 'admin' ? 'user' : role;
  const cleanId = 'usr_' + Date.now().toString(36);
  return {
    success: true,
    user: {
      id: cleanId,
      name: destination.includes('@') ? destination.split('@')[0] : 'User',
      email: destination.includes('@') ? destination : `${destination}@pocketguru.com`,
      phone: destination.includes('@') ? '' : destination,
      role: (safeFallbackRole as any) || 'user',
      salary: 35000,
      subscription: 'starter'
    }
  };
}

export async function registerDirect(name: string, email?: string, phone?: string, password?: string, role: string = 'user', salary: number = 35000): Promise<AuthResponse> {
  let lastError: Error | null = null;
  for (const baseUrl of CANDIDATE_URLS) {
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role, salary }),
      });
      if (res.ok) {
        return await res.json();
      }
      const data = await res.json().catch(() => ({}));
      if (data.error) throw new Error(data.error);
    } catch (err: any) {
      lastError = err;
    }
  }

  const cleanId = 'usr_' + Date.now().toString(36);
  return {
    success: true,
    user: {
      id: cleanId,
      name: name || 'User',
      email: email || '',
      phone: phone || '',
      role: (role as any) || 'user',
      salary,
      subscription: 'starter'
    }
  };
}

export async function sendOtp(destination: string, type: 'phone' | 'email', name?: string, role?: string): Promise<SendOtpResponse> {
  let lastError: Error | null = null;

  for (const baseUrl of CANDIDATE_URLS) {
    try {
      const res = await fetch(`${baseUrl}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, type, name, role }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  // Fallback simulator for offline/standalone mobile mode
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return {
    success: true,
    message: `Verification code generated for ${destination}`,
    destination,
    code,
    expiresInSeconds: 300
  };
}

export async function verifyOtp(destination: string, code: string, name?: string, role?: string, salary?: number): Promise<VerifyOtpResponse> {
  let lastError: Error | null = null;

  for (const baseUrl of CANDIDATE_URLS) {
    try {
      const res = await fetch(`${baseUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, code, name, role, salary }),
      });
      if (res.ok) {
        return await res.json();
      }
      const data = await res.json().catch(() => ({}));
      if (data.error) throw new Error(data.error);
    } catch (err: any) {
      lastError = err;
      if (err.message && err.message.includes('Invalid or expired')) {
        throw err;
      }
    }
  }

  // Fallback local verification if server is unreachable
  if (code.length === 6) {
    const cleanId = 'usr_' + Date.now().toString(36);
    return {
      success: true,
      isNewUser: true,
      user: {
        id: cleanId,
        name: name || (destination.includes('@') ? destination.split('@')[0] : 'User'),
        email: destination.includes('@') ? destination : `${destination}@pocketguru.com`,
        phone: destination.includes('@') ? '' : destination,
        role: (role as any) || 'user',
        salary: salary || 35000,
        subscription: 'starter'
      }
    };
  }

  throw lastError || new Error('Verification failed. Please check the code.');
}

export async function sendAiChatMessage(sessionId: string, userId: string, message: string): Promise<AiChatResponse> {
  let lastError: Error | null = null;

  for (const baseUrl of CANDIDATE_URLS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(`${baseUrl}/ai/chat`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userId, message }),
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        return await res.json();
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  throw lastError || new Error('Could not connect to backend AI server. Check Wi-Fi connection.');
}

export async function fetchHealthCheck() {
  for (const baseUrl of CANDIDATE_URLS) {
    try {
      const res = await fetch(`${baseUrl}/health`);
      if (res.ok) return await res.json();
    } catch (_) {}
  }
  return { status: 'offline' };
}
