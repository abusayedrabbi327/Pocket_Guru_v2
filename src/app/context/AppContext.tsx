import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { sendAiChatMessage } from "../lib/api";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  role: "user" | "consultant" | "admin";
  salary: number;
  subscription: SubscriptionTier | null;
}

export type SubscriptionTier = "starter" | "basic" | "premium" | "elite";

export type LoginRole = "user" | "consultant";

export interface ConsultantOwnProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specialty: string;
  bio: string;
  certifications: string[];
  experience: number;
  hourlyRate: number;
  availability: "available" | "busy" | "offline";
  languages: string[];
  education: string;
  isOnboarded: boolean;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  features: string[];
  aiChats: number | "unlimited";
  humanSessions: number | "unlimited";
  color: string;
}

export interface Consultant {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  isAI: boolean;
  hourlyRate: number;
  availability: "available" | "busy" | "offline";
  bio: string;
  certifications: string[];
  experience: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isAI: boolean;
}

export interface ChatSession {
  id: string;
  consultantId: string;
  consultantName: string;
  consultantAvatar: string;
  isAI: boolean;
  messages: ChatMessage[];
  status: "active" | "closed";
  lastMessage: string;
  lastMessageTime: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    tier: "starter",
    name: "Starter",
    price: 199,
    salaryRange: "Under ৳20,000",
    salaryMin: 0,
    salaryMax: 19999,
    features: ["AI Budget Advisor", "5 AI chats/month", "Basic insights"],
    aiChats: 5,
    humanSessions: 0,
    color: "#94A3B8",
  },
  {
    tier: "basic",
    name: "Basic",
    price: 499,
    salaryRange: "৳20,000 – ৳50,000",
    salaryMin: 20000,
    salaryMax: 50000,
    features: ["Unlimited AI chats", "2 human sessions/month", "Email support", "Budget templates"],
    aiChats: "unlimited",
    humanSessions: 2,
    color: "#1E3A8A",
  },
  {
    tier: "premium",
    name: "Premium",
    price: 999,
    salaryRange: "৳50,000 – ৳100,000",
    salaryMin: 50001,
    salaryMax: 100000,
    features: ["Unlimited AI chats", "5 human sessions/month", "Priority booking", "Investment advice", "Tax planning"],
    aiChats: "unlimited",
    humanSessions: 5,
    color: "#4CAF50",
  },
  {
    tier: "elite",
    name: "Elite",
    price: 1999,
    salaryRange: "Above ৳100,000",
    salaryMin: 100001,
    salaryMax: Infinity,
    features: ["Unlimited everything", "Dedicated consultant", "Portfolio review", "Tax filing help", "Priority 24/7 support"],
    aiChats: "unlimited",
    humanSessions: "unlimited",
    color: "#FFDD36",
  },
];

// Demo dataset for testing and sample showcase only
const demoTransactions: Transaction[] = [
  { id: "tx-1", type: "income", amount: 10000, category: "Salary", date: "2026-02-03", notes: "Monthly salary" },
  { id: "tx-2", type: "income", amount: 5000, category: "Freelance", date: "2026-02-08", notes: "Consulting work" },
  { id: "tx-3", type: "expense", amount: 500, category: "Food", date: "2026-02-09", notes: "Groceries" },
  { id: "tx-4", type: "expense", amount: 1200, category: "Transport", date: "2026-02-05", notes: "Uber rides" },
  { id: "tx-5", type: "expense", amount: 800, category: "Shopping", date: "2026-02-01", notes: "New headphones" },
  { id: "tx-6", type: "expense", amount: 2500, category: "Rent", date: "2026-02-01", notes: "Monthly rent" },
  { id: "tx-7", type: "expense", amount: 300, category: "Entertainment", date: "2026-02-12", notes: "Movie tickets" },
  { id: "tx-8", type: "income", amount: 2000, category: "Side Hustle", date: "2026-02-15", notes: "Design project" },
];

const demoGoals: SavingsGoal[] = [
  { id: "g-1", name: "Emergency Fund", targetAmount: 50000, currentAmount: 37500, deadline: "2026-06-30" },
  { id: "g-2", name: "New Laptop", targetAmount: 80000, currentAmount: 25000, deadline: "2026-12-31" },
  { id: "g-3", name: "Vacation Trip", targetAmount: 30000, currentAmount: 12000, deadline: "2026-08-15" },
];

const demoBudgetCategories: BudgetCategory[] = [
  { id: "b-1", name: "Food", budgetAmount: 5000, spentAmount: 3200 },
  { id: "b-2", name: "Transport", budgetAmount: 3000, spentAmount: 2700 },
  { id: "b-3", name: "Shopping", budgetAmount: 4000, spentAmount: 1800 },
  { id: "b-4", name: "Rent", budgetAmount: 10000, spentAmount: 10000 },
  { id: "b-5", name: "Entertainment", budgetAmount: 2000, spentAmount: 800 },
  { id: "b-6", name: "Utilities", budgetAmount: 2000, spentAmount: 1500 },
];

const defaultConsultants: Consultant[] = [
  {
    id: "ai-1",
    name: "PocketGuru AI",
    specialty: "Budget Planning & Financial Analysis",
    rating: 4.9,
    reviewCount: 12450,
    avatar: "",
    isAI: true,
    hourlyRate: 0,
    availability: "available",
    bio: "Your intelligent personal finance companion. I analyze your spending patterns, optimize budgets, and provide instant financial advice 24/7.",
    certifications: ["AI Financial Advisor", "Budget Optimization Specialist"],
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
];

export const defaultConsultantSessions: ChatSession[] = [
  {
    id: "conv-1",
    consultantId: "client-1",
    consultantName: "Tanvir Hassan",
    consultantAvatar: "",
    isAI: false,
    status: "active",
    lastMessage: "Thank you for the budget review! I'll follow the plan you suggested.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    messages: [
      {
        id: "m-c1-1",
        senderId: "client-1",
        senderName: "Tanvir Hassan",
        text: "Hi Dr. Farid, I have a question regarding my monthly housing expenses. They currently take up 45% of my salary.",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        isAI: false,
      },
      {
        id: "m-c1-2",
        senderId: "consultant",
        senderName: "Dr. Farid Hasan",
        text: "Hello Tanvir! Ideally, housing should stay under 30-35%. Let's review your discretionary spending and explore downsizing or reallocating your entertainment budget.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        isAI: false,
      },
      {
        id: "m-c1-3",
        senderId: "client-1",
        senderName: "Tanvir Hassan",
        text: "Thank you for the budget review! I'll follow the plan you suggested.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        isAI: false,
      },
    ],
  },
  {
    id: "conv-2",
    consultantId: "client-2",
    consultantName: "Mira Sen",
    consultantAvatar: "",
    isAI: false,
    status: "active",
    lastMessage: "Can we schedule a call to discuss investment options?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    messages: [
      {
        id: "m-c2-1",
        senderId: "client-2",
        senderName: "Mira Sen",
        text: "Good morning! Can we schedule a call to discuss investment options for high-yield savings?",
        timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
        isAI: false,
      },
    ],
  },
  {
    id: "conv-3",
    consultantId: "client-3",
    consultantName: "Karim Ahmed",
    consultantAvatar: "",
    isAI: false,
    status: "active",
    lastMessage: "I've prepared your debt repayment plan. Please review it.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    messages: [
      {
        id: "m-c3-1",
        senderId: "client-3",
        senderName: "Karim Ahmed",
        text: "Hello, looking forward to tackling my credit card balance.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        isAI: false,
      },
      {
        id: "m-c3-2",
        senderId: "consultant",
        senderName: "Dr. Farid Hasan",
        text: "I've prepared your debt repayment plan with the avalanche method. Please review it.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        isAI: false,
      },
    ],
  },
  {
    id: "conv-4",
    consultantId: "client-4",
    consultantName: "Nusrat Jahan",
    consultantAvatar: "",
    isAI: false,
    status: "active",
    lastMessage: "Your monthly financial report is ready.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    messages: [
      {
        id: "m-c4-1",
        senderId: "consultant",
        senderName: "Dr. Farid Hasan",
        text: "Your monthly financial report is ready. You hit 85% of your savings target this month!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
        isAI: false,
      },
    ],
  },
  {
    id: "conv-5",
    consultantId: "client-5",
    consultantName: "Sabina Akhter",
    consultantAvatar: "",
    isAI: false,
    status: "active",
    lastMessage: "Hi! I just signed up and would love some budget advice.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    messages: [
      {
        id: "m-c5-1",
        senderId: "client-5",
        senderName: "Sabina Akhter",
        text: "Hi! I just signed up and would love some budget advice for starters.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        isAI: false,
      },
    ],
  },
];

interface AppState {
  isLoggedIn: boolean;
  isDemoMode: boolean;
  hasSeenOnboarding: boolean;
  user: UserProfile;
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  budgetCategories: BudgetCategory[];
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  consultants: Consultant[];
  chatSessions: ChatSession[];
  pendingLoginRole: LoginRole;
  consultantOwnProfile: ConsultantOwnProfile;
  isAiThinking: boolean;
  isDbConnected: boolean;
}

interface AppContextType extends AppState {
  login: () => void;
  loginAs: (role: LoginRole) => void;
  logout: () => void;
  startDemoAccount: () => void;
  loginWithRealAccount: (user: Partial<UserProfile>) => Promise<void>;
  completeOnboarding: () => void;
  addTransaction: (t: Omit<Transaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addSavingsGoal: (g: Omit<SavingsGoal, "id">) => Promise<void>;
  addContribution: (goalId: string, amount: number) => Promise<void>;
  updateBudget: (categoryId: string, amount: number) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  switchRole: (role: "user" | "consultant" | "admin") => void;
  subscribe: (tier: SubscriptionTier) => Promise<void>;
  setSalary: (salary: number) => Promise<void>;
  sendMessage: (sessionId: string, text: string) => Promise<void>;
  startChatSession: (consultantId: string) => string;
  getRecommendedPlan: () => SubscriptionPlan;
  canAccessConsultant: (consultant: Consultant) => boolean;
  updateConsultantProfile: (updates: Partial<ConsultantOwnProfile>) => void;
  setPendingLoginRole: (role: LoginRole) => void;
  refreshFromDatabase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Load saved session or check demo
  const savedUserJson = typeof window !== "undefined" ? localStorage.getItem("pg_auth_user") : null;
  const initialSavedUser: UserProfile | null = savedUserJson ? JSON.parse(savedUserJson) : null;
  const isInitialDemo = typeof window !== "undefined" ? localStorage.getItem("pg_is_demo") === "true" : false;

  const [state, setState] = useState<AppState>(() => {
    if (initialSavedUser) {
      return {
        isLoggedIn: true,
        isDemoMode: isInitialDemo,
        hasSeenOnboarding: true,
        user: initialSavedUser,
        transactions: isInitialDemo ? demoTransactions : [],
        savingsGoals: isInitialDemo ? demoGoals : [],
        budgetCategories: isInitialDemo ? demoBudgetCategories : [],
        totalBalance: isInitialDemo ? 11700 : 0,
        totalIncome: isInitialDemo ? 17000 : 0,
        totalExpense: isInitialDemo ? 5300 : 0,
        consultants: defaultConsultants,
        chatSessions: defaultConsultantSessions,
        pendingLoginRole: initialSavedUser.role === "consultant" ? "consultant" : "user",
        isAiThinking: false,
        isDbConnected: false,
        consultantOwnProfile: {
          name: "",
          email: "",
          phone: "",
          avatar: "",
          specialty: "",
          bio: "",
          certifications: [],
          experience: 0,
          hourlyRate: 0,
          availability: "available",
          languages: [],
          education: "",
          isOnboarded: false,
        },
      };
    }

    return {
      isLoggedIn: false,
      isDemoMode: false,
      hasSeenOnboarding: false,
      user: {
        id: "guest",
        name: "Guest",
        email: "",
        notificationsEnabled: true,
        darkMode: false,
        role: "user",
        salary: 0,
        subscription: null,
      },
      transactions: [],
      savingsGoals: [],
      budgetCategories: [],
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      consultants: defaultConsultants,
      chatSessions: defaultConsultantSessions,
      pendingLoginRole: "user",
      isAiThinking: false,
      isDbConnected: false,
      consultantOwnProfile: {
        name: "",
        email: "",
        phone: "",
        avatar: "",
        specialty: "",
        bio: "",
        certifications: [],
        experience: 0,
        hourlyRate: 0,
        availability: "available",
        languages: [],
        education: "",
        isOnboarded: false,
      },
    };
  });

  const recalculate = useCallback((transactions: Transaction[]) => {
    const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
    return { totalIncome, totalExpense, totalBalance: totalIncome - totalExpense };
  }, []);

  // Fetch state from Supabase Database for active user
  const refreshFromDatabase = useCallback(async () => {
    const userId = state.user.id;
    if (!userId || userId === "guest") return;

    // In demo mode, preserve demo showcase data
    if (state.isDemoMode) {
      const totals = recalculate(demoTransactions);
      setState(s => ({
        ...s,
        isDbConnected: true,
        transactions: demoTransactions,
        savingsGoals: demoGoals,
        budgetCategories: demoBudgetCategories,
        ...totals,
      }));
      return;
    }

    try {
      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      // 2. Fetch User's Transactions (Empty for fresh user!)
      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      // 3. Fetch User's Savings Goals
      const { data: goalsData } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_id", userId)
        .order("deadline", { ascending: true });

      // 4. Fetch User's Budget Categories
      const { data: budgetData } = await supabase
        .from("budget_categories")
        .select("*")
        .eq("user_id", userId);

      // 5. Fetch Consultants
      const { data: consultantData } = await supabase
        .from("consultants")
        .select("*")
        .order("is_ai", { ascending: false });

      // 6. Fetch Chat Sessions & Messages
      const { data: sessionsData } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("user_id", userId);

      const parsedTransactions: Transaction[] = (txData || []).map(t => ({
        id: t.id,
        type: t.type,
        amount: Number(t.amount),
        category: t.category,
        date: t.date,
        notes: t.notes || "",
      }));

      const parsedGoals: SavingsGoal[] = (goalsData || []).map(g => ({
        id: g.id,
        name: g.name,
        targetAmount: Number(g.target_amount),
        currentAmount: Number(g.current_amount),
        deadline: g.deadline,
      }));

      const parsedBudgets: BudgetCategory[] = (budgetData || []).map(b => ({
        id: b.id,
        name: b.name,
        budgetAmount: Number(b.budget_amount),
        spentAmount: Number(b.spent_amount),
      }));

      const parsedConsultants: Consultant[] = (consultantData && consultantData.length > 0) ? consultantData.map(c => ({
        id: c.id,
        name: c.name,
        specialty: c.specialty,
        rating: Number(c.rating),
        reviewCount: c.review_count,
        avatar: c.avatar,
        isAI: c.is_ai,
        hourlyRate: Number(c.hourly_rate),
        availability: c.availability,
        bio: c.bio,
        certifications: Array.isArray(c.certifications) ? c.certifications : [],
        experience: c.experience,
      })) : defaultConsultants;

      let parsedSessions: ChatSession[] = [];
      if (sessionsData && sessionsData.length > 0) {
        parsedSessions = await Promise.all(sessionsData.map(async (s) => {
          const { data: msgs } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("session_id", s.id)
            .order("timestamp", { ascending: true });

          return {
            id: s.id,
            consultantId: s.consultant_id,
            consultantName: s.consultant_name,
            consultantAvatar: s.consultant_avatar || "",
            isAI: s.is_ai,
            status: s.status as "active" | "closed",
            lastMessage: s.last_message || "",
            lastMessageTime: s.last_message_time || s.created_at,
            messages: (msgs || []).map(m => ({
              id: m.id,
              senderId: m.sender_id,
              senderName: m.sender_name,
              text: m.text,
              timestamp: m.timestamp,
              isAI: m.is_ai,
            })),
          };
        }));
      } else {
        // Create an initial welcome session with PocketGuru AI
        const welcomeSessionId = "cs_" + userId;
        parsedSessions = [{
          id: welcomeSessionId,
          consultantId: "ai-1",
          consultantName: "PocketGuru AI",
          consultantAvatar: "",
          isAI: true,
          status: "active",
          lastMessage: "How can I help you manage your finances today?",
          lastMessageTime: new Date().toISOString(),
          messages: [{
            id: "m_welcome",
            senderId: "ai-1",
            senderName: "PocketGuru AI",
            text: `Hi ${state.user.name}! I'm PocketGuru AI, your personal financial advisor. I can help analyze your spending, build savings goals, and optimize your monthly budget. What's on your mind?`,
            timestamp: new Date().toISOString(),
            isAI: true,
          }],
        }];
      }

      const totals = recalculate(parsedTransactions);

      setState(s => ({
        ...s,
        isDbConnected: true,
        user: profileData ? {
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          avatar: profileData.avatar,
          notificationsEnabled: profileData.notifications_enabled,
          darkMode: profileData.dark_mode,
          role: profileData.role,
          salary: Number(profileData.salary),
          subscription: profileData.subscription as SubscriptionTier,
        } : s.user,
        transactions: parsedTransactions,
        savingsGoals: parsedGoals,
        budgetCategories: parsedBudgets,
        consultants: parsedConsultants,
        chatSessions: parsedSessions,
        ...totals,
      }));
    } catch (err) {
      console.warn("Could not sync with Supabase directly, keeping local state:", err);
    }
  }, [state.user.id, state.isDemoMode, state.user.name, recalculate]);

  // Realtime Sync Listener
  useEffect(() => {
    if (state.isLoggedIn && state.user.id && state.user.id !== "guest") {
      refreshFromDatabase();

      const channel = supabase
        .channel(`personal-finance-${state.user.id}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "transactions" }, () => {
          refreshFromDatabase();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "savings_goals" }, () => {
          refreshFromDatabase();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "budget_categories" }, () => {
          refreshFromDatabase();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "chat_messages" }, () => {
          refreshFromDatabase();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [state.isLoggedIn, state.user.id, refreshFromDatabase]);

  const login = () => setState(s => ({ ...s, isLoggedIn: true }));

  // Activate Demo Account with rich Alex Johnson dataset
  const startDemoAccount = () => {
    const demoUser: UserProfile = {
      id: "user-alex",
      name: "Alex Johnson (Demo)",
      email: "alex.demo@pocketguru.com",
      phone: "+880 1700-000000",
      notificationsEnabled: true,
      darkMode: false,
      role: "user",
      salary: 35000,
      subscription: "basic",
    };

    localStorage.setItem("pg_auth_user", JSON.stringify(demoUser));
    localStorage.setItem("pg_is_demo", "true");

    const totals = recalculate(demoTransactions);
    setState(s => ({
      ...s,
      isLoggedIn: true,
      isDemoMode: true,
      hasSeenOnboarding: true,
      user: demoUser,
      transactions: demoTransactions,
      savingsGoals: demoGoals,
      budgetCategories: demoBudgetCategories,
      chatSessions: [{
        id: "cs-demo",
        consultantId: "ai-1",
        consultantName: "PocketGuru AI",
        consultantAvatar: "",
        isAI: true,
        status: "active",
        lastMessage: "I've analyzed your demo spending data.",
        lastMessageTime: new Date().toISOString(),
        messages: [{
          id: "m-demo-1",
          senderId: "ai-1",
          senderName: "PocketGuru AI",
          text: "Hi Alex! This is the demo account. I've analyzed your sample budget and transactions. Feel free to ask me anything!",
          timestamp: new Date().toISOString(),
          isAI: true,
        }]
      }],
      ...totals,
    }));
  };

  // Login with Real Account (brand new clean user data)
  const loginWithRealAccount = async (profileUpdates: Partial<UserProfile>) => {
    const realUser: UserProfile = {
      id: profileUpdates.id || "usr_" + Date.now().toString(36),
      name: profileUpdates.name || "User",
      email: profileUpdates.email || "",
      phone: profileUpdates.phone || "",
      notificationsEnabled: true,
      darkMode: false,
      role: profileUpdates.role || "user",
      salary: profileUpdates.salary || 0,
      subscription: (profileUpdates.subscription as SubscriptionTier) || "starter",
    };

    localStorage.setItem("pg_auth_user", JSON.stringify(realUser));
    localStorage.setItem("pg_is_demo", "false");

    setState(s => ({
      ...s,
      isLoggedIn: true,
      isDemoMode: false,
      hasSeenOnboarding: true,
      user: realUser,
      transactions: [],
      savingsGoals: [],
      budgetCategories: [],
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      chatSessions: realUser.role === "consultant" ? defaultConsultantSessions : [],
    }));

    // Trigger Supabase sync for this user
    setTimeout(() => {
      refreshFromDatabase();
    }, 100);
  };

  const logout = () => {
    localStorage.removeItem("pg_auth_user");
    localStorage.removeItem("pg_is_demo");
    setState(s => ({
      ...s,
      isLoggedIn: false,
      isDemoMode: false,
      user: {
        id: "guest",
        name: "Guest",
        email: "",
        notificationsEnabled: true,
        darkMode: false,
        role: "user",
        salary: 0,
        subscription: null,
      },
      transactions: [],
      savingsGoals: [],
      budgetCategories: [],
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      chatSessions: [],
    }));
  };

  const completeOnboarding = () => setState(s => ({ ...s, hasSeenOnboarding: true }));

  const addTransaction = async (t: Omit<Transaction, "id">) => {
    const newId = "tx-" + Date.now();
    const newTx: Transaction = { ...t, id: newId };

    // Optimistic UI update
    setState(s => {
      const newT = [newTx, ...s.transactions];
      const totals = recalculate(newT);
      return { ...s, transactions: newT, ...totals };
    });

    if (!state.isDemoMode && state.user.id !== "guest") {
      try {
        await supabase.from("transactions").insert({
          id: newId,
          user_id: state.user.id,
          type: t.type,
          amount: t.amount,
          category: t.category,
          date: t.date,
          notes: t.notes || "",
        });
      } catch (err) {
        console.error("Failed to insert transaction into Supabase:", err);
      }
    }
  };

  const deleteTransaction = async (id: string) => {
    setState(s => {
      const newT = s.transactions.filter(t => t.id !== id);
      const totals = recalculate(newT);
      return { ...s, transactions: newT, ...totals };
    });

    if (!state.isDemoMode) {
      try {
        await supabase.from("transactions").delete().eq("id", id);
      } catch (err) {
        console.error("Failed to delete transaction from Supabase:", err);
      }
    }
  };

  const addSavingsGoal = async (g: Omit<SavingsGoal, "id">) => {
    const newId = "g-" + Date.now();
    const newGoal: SavingsGoal = { ...g, id: newId };

    setState(s => ({
      ...s,
      savingsGoals: [...s.savingsGoals, newGoal],
    }));

    if (!state.isDemoMode && state.user.id !== "guest") {
      try {
        await supabase.from("savings_goals").insert({
          id: newId,
          user_id: state.user.id,
          name: g.name,
          target_amount: g.targetAmount,
          current_amount: g.currentAmount,
          deadline: g.deadline,
        });
      } catch (err) {
        console.error("Failed to insert savings goal into Supabase:", err);
      }
    }
  };

  const addContribution = async (goalId: string, amount: number) => {
    let updatedGoal: SavingsGoal | undefined;
    setState(s => {
      const updated = s.savingsGoals.map(g => {
        if (g.id === goalId) {
          const res = { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) };
          updatedGoal = res;
          return res;
        }
        return g;
      });
      return { ...s, savingsGoals: updated };
    });

    if (!state.isDemoMode && updatedGoal) {
      try {
        await supabase
          .from("savings_goals")
          .update({ current_amount: (updatedGoal as SavingsGoal).currentAmount })
          .eq("id", goalId);
      } catch (err) {
        console.error("Failed to update goal contribution in Supabase:", err);
      }
    }
  };

  const updateBudget = async (categoryId: string, amount: number) => {
    setState(s => ({
      ...s,
      budgetCategories: s.budgetCategories.map(c =>
        c.id === categoryId ? { ...c, budgetAmount: amount } : c
      ),
    }));

    if (!state.isDemoMode) {
      try {
        await supabase
          .from("budget_categories")
          .update({ budget_amount: amount })
          .eq("id", categoryId);
      } catch (err) {
        console.error("Failed to update budget in Supabase:", err);
      }
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setState(s => {
      const updatedUser = { ...s.user, ...updates };
      localStorage.setItem("pg_auth_user", JSON.stringify(updatedUser));
      return { ...s, user: updatedUser };
    });

    if (!state.isDemoMode && state.user.id !== "guest") {
      try {
        const payload: Record<string, unknown> = {};
        if (updates.name !== undefined) payload.name = updates.name;
        if (updates.email !== undefined) payload.email = updates.email;
        if (updates.phone !== undefined) payload.phone = updates.phone;
        if (updates.salary !== undefined) payload.salary = updates.salary;
        if (updates.subscription !== undefined) payload.subscription = updates.subscription;
        if (updates.darkMode !== undefined) payload.dark_mode = updates.darkMode;
        if (updates.notificationsEnabled !== undefined) payload.notifications_enabled = updates.notificationsEnabled;

        await supabase.from("profiles").update(payload).eq("id", state.user.id);
      } catch (err) {
        console.error("Failed to update profile in Supabase:", err);
      }
    }
  };

  const switchRole = (role: "user" | "consultant" | "admin") => {
    if (role === "admin" && state.user.email?.toLowerCase() !== "abusayed102188@gmail.com") {
      console.warn("Unauthorized attempt to switch to admin role");
      return;
    }
    const updatedUser = { ...state.user, role };
    localStorage.setItem("pg_auth_user", JSON.stringify(updatedUser));
    setState(s => ({ ...s, user: updatedUser }));
  };

  const subscribe = async (tier: SubscriptionTier) => {
    await updateProfile({ subscription: tier });
  };

  const setSalary = async (salary: number) => {
    await updateProfile({ salary });
  };

  const getRecommendedPlan = (): SubscriptionPlan => {
    const salary = state.user.salary;
    const plan = subscriptionPlans.find(p => salary >= p.salaryMin && salary <= p.salaryMax);
    return plan || subscriptionPlans[0];
  };

  const canAccessConsultant = (consultant: Consultant): boolean => {
    const sub = state.user.subscription;
    if (!sub) return false;
    if (consultant.isAI) {
      return true;
    }
    return sub !== "starter";
  };

  const startChatSession = (consultantId: string): string => {
    const consultant = state.consultants.find(c => c.id === consultantId);
    if (!consultant) return "";

    const existing = state.chatSessions.find(s => s.consultantId === consultantId && s.status === "active");
    if (existing) return existing.id;

    const sessionId = "cs-" + Date.now();
    const newSession: ChatSession = {
      id: sessionId,
      consultantId,
      consultantName: consultant.name,
      consultantAvatar: consultant.avatar,
      isAI: consultant.isAI,
      messages: [{
        id: "m-" + Date.now(),
        senderId: consultantId,
        senderName: consultant.name,
        text: consultant.isAI
          ? `Hi ${state.user.name}! I'm PocketGuru AI, your personal finance advisor. How can I help you optimize your finances today?`
          : `Hello ${state.user.name}! I'm ${consultant.name}, a certified ${consultant.specialty} consultant. How can I assist you today?`,
        timestamp: new Date().toISOString(),
        isAI: consultant.isAI,
      }],
      status: "active",
      lastMessage: consultant.isAI ? "How can I help you optimize your finances today?" : `How can I assist you today?`,
      lastMessageTime: new Date().toISOString(),
    };

    setState(s => ({ ...s, chatSessions: [...s.chatSessions, newSession] }));

    if (!state.isDemoMode && state.user.id !== "guest") {
      supabase.from("chat_sessions").insert({
        id: sessionId,
        user_id: state.user.id,
        consultant_id: consultantId,
        consultant_name: consultant.name,
        consultant_avatar: consultant.avatar,
        is_ai: consultant.isAI,
        status: "active",
        last_message: newSession.lastMessage,
      }).catch(console.error);
    }

    return sessionId;
  };

  // Live Chat (AI or Consultant-Client)
  const sendMessage = async (sessionId: string, text: string) => {
    const isConsultantUser = state.user.role === "consultant";
    let targetSession = state.chatSessions.find(s => s.id === sessionId);

    if (!targetSession) {
      targetSession = defaultConsultantSessions.find(s => s.id === sessionId);
      if (targetSession) {
        setState(s => ({ ...s, chatSessions: [...s.chatSessions, targetSession!] }));
      }
    }

    // NON-AI (Consultant talking to client or user talking to human consultant)
    if (targetSession && !targetSession.isAI) {
      const senderId = isConsultantUser ? "consultant" : "user";
      const senderName = isConsultantUser
        ? (state.consultantOwnProfile.name || state.user.name || "Dr. Farid Hasan")
        : state.user.name;

      const myMsg: ChatMessage = {
        id: "m-" + Date.now(),
        senderId,
        senderName,
        text,
        timestamp: new Date().toISOString(),
        isAI: false,
      };

      setState(s => {
        const exists = s.chatSessions.some(session => session.id === sessionId);
        const baseSession = targetSession || {
          id: sessionId,
          consultantId: "client",
          consultantName: "Client",
          consultantAvatar: "",
          isAI: false,
          status: "active",
          lastMessage: text,
          lastMessageTime: myMsg.timestamp,
          messages: [],
        };

        const updatedSessions = exists
          ? s.chatSessions.map(session => {
              if (session.id !== sessionId) return session;
              return {
                ...session,
                messages: [...session.messages, myMsg],
                lastMessage: text,
                lastMessageTime: myMsg.timestamp,
              };
            })
          : [...s.chatSessions, { ...baseSession, messages: [...baseSession.messages, myMsg], lastMessage: text, lastMessageTime: myMsg.timestamp }];

        return { ...s, chatSessions: updatedSessions };
      });

      // Realistic reciprocal reply
      setTimeout(() => {
        const clientResponses = [
          "Thank you for the guidance! I'll update my budget and keep you posted.",
          "Got it, that clarifies the emergency fund allocation. I will adjust it right away.",
          "Understood! Can we schedule our follow-up check-in next week?",
          "Thanks! Following this plan will help me stay within my 30% savings goal.",
          "Great advice, thank you Dr. Farid!"
        ];
        const randomReply = clientResponses[Math.floor(Math.random() * clientResponses.length)];

        const replyMsg: ChatMessage = {
          id: "m-rep-" + Date.now(),
          senderId: isConsultantUser ? (targetSession?.consultantId || "client") : (targetSession?.consultantId || "consultant"),
          senderName: isConsultantUser ? (targetSession?.consultantName || "Client") : (targetSession?.consultantName || "Dr. Farid Hasan"),
          text: isConsultantUser ? randomReply : "Hello! Thanks for reaching out. I've noted your question and am reviewing your budget strategy now.",
          timestamp: new Date().toISOString(),
          isAI: false,
        };

        setState(s => ({
          ...s,
          chatSessions: s.chatSessions.map(session => {
            if (session.id !== sessionId) return session;
            return {
              ...session,
              messages: [...session.messages, replyMsg],
              lastMessage: replyMsg.text,
              lastMessageTime: replyMsg.timestamp,
            };
          }),
        }));
      }, 1000);

      return;
    }

    // AI Chat
    const userMsg: ChatMessage = {
      id: "m-" + Date.now(),
      senderId: "user",
      senderName: state.user.name,
      text,
      timestamp: new Date().toISOString(),
      isAI: false,
    };

    // Optimistically show user message
    setState(s => ({
      ...s,
      isAiThinking: targetSession?.isAI || false,
      chatSessions: s.chatSessions.map(session => {
        if (session.id !== sessionId) return session;
        return {
          ...session,
          messages: [...session.messages, userMsg],
          lastMessage: text,
          lastMessageTime: userMsg.timestamp,
        };
      })
    }));

    if (targetSession?.isAI) {
      try {
        const aiResponse = await sendAiChatMessage(sessionId, state.user.id, text);

        const aiReply: ChatMessage = {
          id: aiResponse.aiMessageId || "ai-" + Date.now(),
          senderId: targetSession.consultantId,
          senderName: targetSession.consultantName,
          text: aiResponse.message,
          timestamp: new Date().toISOString(),
          isAI: true,
        };

        setState(s => ({
          ...s,
          isAiThinking: false,
          chatSessions: s.chatSessions.map(session => {
            if (session.id !== sessionId) return session;
            return {
              ...session,
              messages: [...session.messages, aiReply],
              lastMessage: aiReply.text.substring(0, 80) + "...",
              lastMessageTime: aiReply.timestamp,
            };
          })
        }));
      } catch (err: any) {
        console.error("AI Error:", err);
        const fallbackReply: ChatMessage = {
          id: "err-" + Date.now(),
          senderId: targetSession.consultantId,
          senderName: targetSession.consultantName,
          text: `PocketGuru Advisor: ${err.message || 'Unable to connect to AI server. Please make sure the backend server is active.'}`,
          timestamp: new Date().toISOString(),
          isAI: true,
        };

        setState(s => ({
          ...s,
          isAiThinking: false,
          chatSessions: s.chatSessions.map(session => {
            if (session.id !== sessionId) return session;
            return {
              ...session,
              messages: [...session.messages, fallbackReply],
              lastMessage: fallbackReply.text,
              lastMessageTime: fallbackReply.timestamp,
            };
          })
        }));
      }
    }
  };

  const updateConsultantProfile = (updates: Partial<ConsultantOwnProfile>) => {
    setState(s => ({ ...s, consultantOwnProfile: { ...s.consultantOwnProfile, ...updates } }));
  };

  const setPendingLoginRole = (role: LoginRole) => {
    setState(s => ({ ...s, pendingLoginRole: role }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        loginAs: (role: LoginRole) => {
          setPendingLoginRole(role);
          switchRole(role);
          login();
        },
        logout,
        startDemoAccount,
        loginWithRealAccount,
        completeOnboarding,
        addTransaction,
        deleteTransaction,
        addSavingsGoal,
        addContribution,
        updateBudget,
        updateProfile,
        switchRole,
        subscribe,
        setSalary,
        sendMessage,
        startChatSession,
        getRecommendedPlan,
        canAccessConsultant,
        updateConsultantProfile,
        setPendingLoginRole,
        refreshFromDatabase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}