import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Star,
  MessageCircle,
  Filter,
  ChevronRight,
  X,
  Calendar,
  Clock,
  TrendingUp,
  DollarSign,
  PieChart,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  User,
  Phone,
  Mail,
  Plus,
  Video,
} from "lucide-react";

type FilterType = "all" | "active" | "new" | "completed";

export interface ClientBudgetCategory {
  category: string;
  target: number;
  actual: number;
  status: "on_track" | "warning" | "over";
}

export interface ClientAppointment {
  id: string;
  date: string;
  duration: string;
  type: "Video Session" | "Phone Session" | "Chat Session";
  topic: string;
  status: "completed" | "upcoming";
  summary: string;
  actionItems: string[];
}

export interface ClientProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: "Starter" | "Basic" | "Premium" | "Elite";
  sessions: number;
  lastSession: string;
  rating: number;
  topic: string;
  status: "active" | "new" | "completed";
  avatar: string;
  income: number;
  expenses: number;
  savingsRate: string;
  goal: string;
  budgetPlan: ClientBudgetCategory[];
  appointments: ClientAppointment[];
  upcomingAppointment?: {
    date: string;
    topic: string;
    type: string;
  } | null;
  notes: string;
}

const initialClients: ClientProfile[] = [
  {
    id: 1,
    name: "Tanvir Hassan",
    email: "tanvir.hassan@example.com",
    phone: "+880 1712-892341",
    plan: "Premium",
    sessions: 5,
    lastSession: "Today, 10:30 AM",
    rating: 5,
    topic: "Budget Review & Expense Optimization",
    status: "active",
    avatar: "T",
    income: 65000,
    expenses: 42000,
    savingsRate: "35%",
    goal: "Build 6-Month Emergency Cushion (৳390,000) & reduce rent burden",
    budgetPlan: [
      { category: "Housing & Rent", target: 20000, actual: 23500, status: "over" },
      { category: "Food & Groceries", target: 12000, actual: 11000, status: "on_track" },
      { category: "Transportation", target: 5000, actual: 4800, status: "on_track" },
      { category: "Emergency Savings", target: 18000, actual: 18000, status: "on_track" },
      { category: "Leisure & Dining Out", target: 5000, actual: 6700, status: "warning" },
      { category: "Utilities & Mobile", target: 5000, actual: 4000, status: "on_track" },
    ],
    appointments: [
      {
        id: "apt-1",
        date: "Today, 10:30 AM",
        duration: "45 mins",
        type: "Video Session",
        topic: "Monthly Budget & Rent Restructuring",
        status: "completed",
        summary: "Analyzed why housing spending exceeded 35% of income. Agreed to trim dining out by ৳2,000 and allocate towards high-yield emergency deposits.",
        actionItems: [
          "Set up automated ৳18,000 transfer on payday",
          "Track weekend dine-outs with PocketGuru tags",
          "Review lease renewal options in August"
        ],
      },
      {
        id: "apt-2",
        date: "Feb 10, 2026, 3:00 PM",
        duration: "30 mins",
        type: "Chat Session",
        topic: "Debt Avalanche & Credit Review",
        status: "completed",
        summary: "Evaluated outstanding consumer credit. Replaced minimum payment approach with focused debt payoff strategy.",
        actionItems: [
          "Pay off ৳15,000 high-APR card balance first",
          "Freeze non-essential credit card purchases"
        ],
      },
      {
        id: "apt-3",
        date: "Jan 18, 2026, 11:00 AM",
        duration: "60 mins",
        type: "Video Session",
        topic: "Initial Financial Health Check & Onboarding",
        status: "completed",
        summary: "Comprehensive baseline evaluation. Established 35% monthly savings benchmark.",
        actionItems: [
          "Link bank accounts to PocketGuru",
          "Categorize historical 90-day expenses"
        ],
      },
    ],
    upcomingAppointment: {
      date: "March 2, 2026, 10:30 AM",
      topic: "Q1 Savings Milestone Check-in & Tax Deductions",
      type: "Video Call",
    },
    notes: "Client has made rapid progress since January. Highly engaged, just needs gentle accountability on discretionary weekend leisure expenses.",
  },
  {
    id: 2,
    name: "Mira Sen",
    email: "mira.sen@example.com",
    phone: "+880 1819-334455",
    plan: "Basic",
    sessions: 3,
    lastSession: "Yesterday",
    rating: 4,
    topic: "Investment Strategy & Sanchayapatra",
    status: "active",
    avatar: "M",
    income: 85000,
    expenses: 52000,
    savingsRate: "38%",
    goal: "Portfolio Diversification & Government Bond Allocation",
    budgetPlan: [
      { category: "Housing & Rent", target: 25000, actual: 25000, status: "on_track" },
      { category: "Family & Living", target: 15000, actual: 16200, status: "warning" },
      { category: "Mutual Funds & Govt Bonds", target: 30000, actual: 30000, status: "on_track" },
      { category: "Healthcare & Insurance", target: 8000, actual: 7500, status: "on_track" },
      { category: "Leisure", target: 7000, actual: 5300, status: "on_track" },
    ],
    appointments: [
      {
        id: "apt-m1",
        date: "Yesterday, 2:00 PM",
        duration: "45 mins",
        type: "Phone Session",
        topic: "Investment Strategy & Risk Profiling",
        status: "completed",
        summary: "Evaluated government savings instruments (Sanchayapatra) vs mutual funds for a 3-5 year horizon.",
        actionItems: [
          "Open central bank securities account",
          "Investigate high dividend-yield funds"
        ],
      },
    ],
    upcomingAppointment: {
      date: "Feb 28, 2026, 2:00 PM",
      topic: "Government Bonds Execution & Verification",
      type: "Phone Call",
    },
    notes: "Stable income, conservative risk tolerance. Interested in guaranteed return instruments and sovereign bonds.",
  },
  {
    id: 3,
    name: "Karim Ahmed",
    email: "karim.ahmed@example.com",
    phone: "+880 1911-778899",
    plan: "Elite",
    sessions: 8,
    lastSession: "2 days ago",
    rating: 5,
    topic: "Debt Strategy & Real Estate Acquisition",
    status: "active",
    avatar: "K",
    income: 140000,
    expenses: 82000,
    savingsRate: "41%",
    goal: "Down payment for commercial property in Gulshan",
    budgetPlan: [
      { category: "Primary Residence", target: 35000, actual: 35000, status: "on_track" },
      { category: "Business Expenses", target: 25000, actual: 23000, status: "on_track" },
      { category: "Real Estate Sinking Fund", target: 50000, actual: 55000, status: "on_track" },
      { category: "Discretionary & Travel", target: 18000, actual: 16500, status: "on_track" },
      { category: "Emergency Reserves", target: 12000, actual: 12000, status: "on_track" },
    ],
    appointments: [
      {
        id: "apt-k1",
        date: "2 days ago",
        duration: "60 mins",
        type: "Video Session",
        topic: "Commercial Property Loan Feasibility",
        status: "completed",
        summary: "Reviewed debt-to-income and cash reserves required for commercial mortgage pre-approval.",
        actionItems: [
          "Obtain bank pre-approval certificate",
          "Keep liquid cash reserves at minimum ৳1,500,000"
        ],
      },
    ],
    upcomingAppointment: {
      date: "March 8, 2026, 4:00 PM",
      topic: "Bank Term Sheet Comparison",
      type: "Video Session",
    },
    notes: "High-net-worth business owner with strong cash flows. Priority is tax optimization and mortgage debt structure.",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1612-445566",
    plan: "Premium",
    sessions: 12,
    lastSession: "3 days ago",
    rating: 5,
    topic: "Tax Planning & Income Sheltering",
    status: "completed",
    avatar: "N",
    income: 95000,
    expenses: 58000,
    savingsRate: "39%",
    goal: "Annual NBR Tax Return Filing & Rebate Maximization",
    budgetPlan: [
      { category: "Living Costs", target: 30000, actual: 29000, status: "on_track" },
      { category: "Approved Rebate Investments", target: 25000, actual: 25000, status: "on_track" },
      { category: "Child Education Fund", target: 20000, actual: 20000, status: "on_track" },
      { category: "Discretionary", target: 12000, actual: 14000, status: "warning" },
    ],
    appointments: [
      {
        id: "apt-n1",
        date: "3 days ago",
        duration: "45 mins",
        type: "Video Session",
        topic: "Tax Rebate Calculation",
        status: "completed",
        summary: "Completed fiscal year tax rebate optimization. Saved ৳42,000 in payable income tax through verified investment proof.",
        actionItems: ["Submit tax challan receipt to employer HR"],
      },
    ],
    upcomingAppointment: null,
    notes: "Tax filing fully completed for the current fiscal cycle. Next scheduled review in September.",
  },
  {
    id: 5,
    name: "Rafi Uddin",
    email: "rafi.uddin@example.com",
    phone: "+880 1515-667788",
    plan: "Basic",
    sessions: 2,
    lastSession: "1 week ago",
    rating: 4,
    topic: "Savings Plan & Emergency Buffer",
    status: "completed",
    avatar: "R",
    income: 45000,
    expenses: 34000,
    savingsRate: "24%",
    goal: "Save ৳100,000 emergency fund",
    budgetPlan: [
      { category: "Rent & Utilities", target: 16000, actual: 16000, status: "on_track" },
      { category: "Groceries & Food", target: 12000, actual: 13000, status: "warning" },
      { category: "Emergency Fund", target: 10000, actual: 10000, status: "on_track" },
      { category: "Transport", target: 4000, actual: 3800, status: "on_track" },
    ],
    appointments: [
      {
        id: "apt-r1",
        date: "1 week ago",
        duration: "30 mins",
        type: "Phone Session",
        topic: "50/30/20 Budget Setup",
        status: "completed",
        summary: "Introduced 50/30/20 budget framework. Created dedicated emergency savings sub-account.",
        actionItems: [
          "Track all micro-transactions on mobile",
          "Limit outside meals to twice a week"
        ],
      },
    ],
    upcomingAppointment: null,
    notes: "Early career professional. Disciplined with basic budget rules.",
  },
  {
    id: 6,
    name: "Sabina Akhter",
    email: "sabina.akhter@example.com",
    phone: "+880 1711-223344",
    plan: "Starter",
    sessions: 0,
    lastSession: "New client",
    rating: 0,
    topic: "Budget Planning & First Financial Audit",
    status: "new",
    avatar: "S",
    income: 32000,
    expenses: 28000,
    savingsRate: "12%",
    goal: "Stop living paycheck to paycheck & start emergency savings",
    budgetPlan: [
      { category: "Rent & Shared Housing", target: 12000, actual: 12000, status: "on_track" },
      { category: "Food & Household", target: 10000, actual: 11500, status: "warning" },
      { category: "Transport", target: 3500, actual: 4000, status: "warning" },
      { category: "Savings Buffer", target: 4000, actual: 2000, status: "over" },
    ],
    appointments: [],
    upcomingAppointment: {
      date: "Tomorrow, 11:30 AM",
      topic: "Introductory Budget Consultation & Goal Setting",
      type: "Chat Session",
    },
    notes: "Newly joined client. Expressed keen interest in building a disciplined savings habit.",
  },
];

const planColors: Record<string, string> = {
  Starter: "#94A3B8",
  Basic: "#1E3A8A",
  Premium: "#4CAF50",
  Elite: "#FFDD36",
};

export function ConsultantClientsPage() {
  const navigate = useNavigate();
  const { consultantOwnProfile } = useAppContext();
  const [clients, setClients] = useState<ClientProfile[]>(initialClients);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [modalTab, setModalTab] = useState<"budget" | "appointments" | "notes">("budget");
  const [newNoteText, setNewNoteText] = useState("");

  const filtered = clients.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const counts = {
    all: clients.length,
    active: clients.filter((c) => c.status === "active").length,
    new: clients.filter((c) => c.status === "new").length,
    completed: clients.filter((c) => c.status === "completed").length,
  };

  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedClient) return;
    const updatedNotes = selectedClient.notes
      ? `${selectedClient.notes}\n• [${new Date().toLocaleDateString()}]: ${newNoteText.trim()}`
      : `• [${new Date().toLocaleDateString()}]: ${newNoteText.trim()}`;

    setClients((prev) =>
      prev.map((c) => (c.id === selectedClient.id ? { ...c, notes: updatedNotes } : c))
    );
    setSelectedClient((prev) => prev ? { ...prev, notes: updatedNotes } : null);
    setNewNoteText("");
  };

  const openClientChat = (clientId: number) => {
    navigate(`/chat/conv-${clientId}`);
  };

  return (
    <div className="h-full bg-slate-50 md:bg-transparent overflow-y-auto pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-2 md:py-6">
        {/* Header */}
        <div className="pt-8 md:pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[26px] font-inter font-bold text-slate-900">
                My Clients
              </h1>
              <p className="text-[13px] font-inter text-slate-500 mt-0.5">
                {clients.length} active client profiles & budget tracking
              </p>
            </div>
            <div className="bg-[#1E3A8A]/10 text-[#1E3A8A] px-3.5 py-1.5 rounded-full text-[12px] font-inter font-semibold">
              {counts.active} Active Sessions
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search clients by name or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[46px] bg-white rounded-xl pl-11 pr-4 text-[14px] font-inter outline-none border border-slate-200 focus:border-[#1E3A8A] shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
          {(
            [
              { key: "all", label: "All Clients" },
              { key: "active", label: "Active" },
              { key: "new", label: "New Requests" },
              { key: "completed", label: "Completed" },
            ] as { key: FilterType; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-[12px] font-inter font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                filter === f.key
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === f.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Client list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedClient(client)}
              className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1E3A8A]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center shrink-0 text-white font-inter font-bold text-[16px] shadow-sm">
                  {client.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-inter font-bold text-slate-900 truncate group-hover:text-[#1E3A8A] transition-colors">
                      {client.name}
                    </p>
                    <span
                      className="text-[9px] font-inter font-bold px-2 py-0.5 rounded-full text-white shrink-0"
                      style={{
                        backgroundColor: planColors[client.plan] || "#94A3B8",
                      }}
                    >
                      {client.plan}
                    </span>
                  </div>

                  <p className="text-[12px] font-inter text-slate-500 truncate mt-0.5">
                    {client.topic}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[11px] font-inter text-slate-400">
                    <span>{client.sessions} sessions</span>
                    <span>•</span>
                    <span>৳{client.income.toLocaleString()}/mo</span>
                    <span>•</span>
                    <span className="text-[#4CAF50] font-semibold">{client.savingsRate} savings</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`text-[9px] font-inter font-semibold px-2 py-0.5 rounded-full capitalize ${
                      client.status === "active"
                        ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                        : client.status === "new"
                        ? "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {client.status}
                  </span>
                  {client.rating > 0 && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Star size={11} className="text-[#FFDD36]" fill="#FFDD36" />
                      <span className="text-[11px] font-inter font-semibold text-slate-600">
                        {client.rating}.0
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Row */}
              <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-inter text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> Last: {client.lastSession}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openClientChat(client.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#1E3A8A]/10 hover:bg-[#1E3A8A]/20 text-[#1E3A8A] rounded-lg text-[11px] font-inter font-semibold transition-colors active:scale-95"
                  >
                    <MessageCircle size={13} />
                    Message
                  </button>
                  <span className="text-[11px] font-inter text-slate-400 group-hover:text-slate-700 flex items-center">
                    Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 mt-4">
            <Search size={36} className="text-slate-300 mb-3" />
            <p className="text-[15px] font-inter font-bold text-slate-700">
              No clients found
            </p>
            <p className="text-[12px] font-inter text-slate-400 mt-1">
              Try adjusting your search query or filter selection
            </p>
          </div>
        )}
      </div>

      {/* FULL CLIENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] p-5 sm:p-6 text-white relative">
                <button
                  onClick={() => setSelectedClient(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFDD36] text-slate-900 font-inter font-bold text-[22px] flex items-center justify-center shadow-lg">
                    {selectedClient.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-[20px] font-inter font-bold text-white">
                        {selectedClient.name}
                      </h2>
                      <span
                        className="text-[10px] font-inter font-bold px-2 py-0.5 rounded-full text-white"
                        style={{
                          backgroundColor: planColors[selectedClient.plan] || "#94A3B8",
                        }}
                      >
                        {selectedClient.plan} Plan
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 text-[12px] font-inter mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {selectedClient.email}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {selectedClient.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Financial Snapshot */}
                <div className="grid grid-cols-3 gap-2.5 mt-5 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <div className="text-center">
                    <p className="text-white/60 text-[10px] font-inter uppercase tracking-wider">Monthly Income</p>
                    <p className="text-white text-[15px] font-inter font-bold mt-0.5">৳{selectedClient.income.toLocaleString()}</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <p className="text-white/60 text-[10px] font-inter uppercase tracking-wider">Monthly Expenses</p>
                    <p className="text-white text-[15px] font-inter font-bold mt-0.5">৳{selectedClient.expenses.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-[10px] font-inter uppercase tracking-wider">Savings Rate</p>
                    <p className="text-[#FFDD36] text-[15px] font-inter font-bold mt-0.5">{selectedClient.savingsRate}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs inside modal */}
              <div className="flex border-b border-slate-200 bg-slate-50 px-4">
                <button
                  onClick={() => setModalTab("budget")}
                  className={`py-3 px-4 text-[13px] font-inter font-semibold border-b-2 flex items-center gap-2 transition-all ${
                    modalTab === "budget"
                      ? "border-[#1E3A8A] text-[#1E3A8A]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <PieChart size={15} />
                  Discussed Budget Plan
                </button>
                <button
                  onClick={() => setModalTab("appointments")}
                  className={`py-3 px-4 text-[13px] font-inter font-semibold border-b-2 flex items-center gap-2 transition-all ${
                    modalTab === "appointments"
                      ? "border-[#1E3A8A] text-[#1E3A8A]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Calendar size={15} />
                  Previous Appointments ({selectedClient.appointments.length})
                </button>
                <button
                  onClick={() => setModalTab("notes")}
                  className={`py-3 px-4 text-[13px] font-inter font-semibold border-b-2 flex items-center gap-2 transition-all ${
                    modalTab === "notes"
                      ? "border-[#1E3A8A] text-[#1E3A8A]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FileText size={15} />
                  Consultant Notes
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
                {/* 1. DISCUSSED BUDGET PLAN */}
                {modalTab === "budget" && (
                  <div className="space-y-4">
                    {/* Primary Financial Goal */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FFDD36] flex items-center justify-center shrink-0 mt-0.5 text-slate-900">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <p className="text-[12px] font-inter font-bold text-amber-900 uppercase tracking-wider">
                          Agreed Primary Financial Goal
                        </p>
                        <p className="text-[13px] font-inter text-slate-800 mt-0.5 font-medium">
                          {selectedClient.goal}
                        </p>
                      </div>
                    </div>

                    {/* Category Breakdown Table / Cards */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[14px] font-inter font-bold text-slate-900">
                          Agreed Monthly Category Allocation
                        </h3>
                        <span className="text-[11px] font-inter text-slate-400">
                          Target vs Actual
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {selectedClient.budgetPlan.map((cat, idx) => {
                          const percentage = Math.min(Math.round((cat.actual / cat.target) * 100), 150);
                          const isOver = cat.actual > cat.target;
                          const diff = cat.actual - cat.target;

                          return (
                            <div
                              key={idx}
                              className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-200/70 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-inter font-bold text-slate-800">
                                  {cat.category}
                                </span>
                                <div className="text-right">
                                  <span className="text-[13px] font-inter font-bold text-slate-900">
                                    ৳{cat.actual.toLocaleString()}
                                  </span>
                                  <span className="text-[11px] font-inter text-slate-400 ml-1">
                                    / ৳{cat.target.toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    isOver
                                      ? "bg-[#E6484E]"
                                      : percentage >= 85
                                      ? "bg-[#FF9800]"
                                      : "bg-[#4CAF50]"
                                  }`}
                                  style={{ width: `${Math.min(percentage, 100)}%` }}
                                />
                              </div>

                              <div className="flex items-center justify-between mt-1.5 text-[11px] font-inter">
                                <span className="text-slate-500">
                                  {percentage}% of target allocation
                                </span>
                                {isOver ? (
                                  <span className="text-[#E6484E] font-semibold flex items-center gap-1">
                                    <AlertCircle size={11} /> +৳{diff.toLocaleString()} over budget
                                  </span>
                                ) : (
                                  <span className="text-[#4CAF50] font-semibold flex items-center gap-1">
                                    <CheckCircle2 size={11} /> ৳{Math.abs(diff).toLocaleString()} under budget
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PREVIOUS APPOINTMENTS & TIMELINE */}
                {modalTab === "appointments" && (
                  <div className="space-y-4">
                    {/* Upcoming Appointment If any */}
                    {selectedClient.upcomingAppointment && (
                      <div className="bg-[#1E3A8A]/10 border border-[#1E3A8A]/30 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">
                            <Clock size={18} />
                          </div>
                          <div>
                            <span className="text-[10px] font-inter font-bold text-[#1E3A8A] uppercase tracking-wider">
                              Next Upcoming Session
                            </span>
                            <p className="text-[14px] font-inter font-bold text-slate-900 mt-0.5">
                              {selectedClient.upcomingAppointment.topic}
                            </p>
                            <p className="text-[12px] font-inter text-slate-600 mt-0.5">
                              {selectedClient.upcomingAppointment.date} • {selectedClient.upcomingAppointment.type}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => openClientChat(selectedClient.id)}
                          className="px-3.5 py-1.5 bg-[#1E3A8A] text-white rounded-xl text-[11px] font-inter font-semibold shrink-0"
                        >
                          Join / Chat
                        </button>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="space-y-3">
                      <h3 className="text-[14px] font-inter font-bold text-slate-900">
                        Session History & Discussion Notes
                      </h3>

                      {selectedClient.appointments.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                          <Calendar size={28} className="text-slate-300 mx-auto mb-2" />
                          <p className="text-[13px] font-inter font-semibold text-slate-600">No previous sessions yet</p>
                          <p className="text-[11px] font-inter text-slate-400 mt-0.5">This client is newly registered. First session is scheduled above.</p>
                        </div>
                      ) : (
                        selectedClient.appointments.map((apt) => (
                          <div
                            key={apt.id}
                            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-inter font-semibold rounded-md">
                                  {apt.date}
                                </span>
                                <span className="text-[11px] font-inter text-slate-400">
                                  {apt.duration}
                                </span>
                                <span className="text-[10px] font-inter text-[#1E3A8A] font-semibold bg-[#1E3A8A]/10 px-2 py-0.5 rounded-full">
                                  {apt.type}
                                </span>
                              </div>
                              <span className="text-[10px] font-inter font-bold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={10} /> Completed
                              </span>
                            </div>

                            <p className="text-[14px] font-inter font-bold text-slate-900">
                              {apt.topic}
                            </p>

                            <p className="text-[12px] font-inter text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="font-semibold text-slate-800">Discussion Summary: </span>
                              {apt.summary}
                            </p>

                            {apt.actionItems.length > 0 && (
                              <div className="pt-1">
                                <p className="text-[11px] font-inter font-bold text-slate-700 mb-1">
                                  Action Items Agreed:
                                </p>
                                <div className="space-y-1">
                                  {apt.actionItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 text-[11px] font-inter text-slate-600">
                                      <CheckCircle2 size={12} className="text-[#1E3A8A] shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 3. CONSULTANT NOTES */}
                {modalTab === "notes" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[14px] font-inter font-bold text-slate-900 mb-2">
                        Private Observations & Client Log
                      </h3>
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[13px] font-inter text-slate-700 whitespace-pre-line leading-relaxed min-h-[120px]">
                        {selectedClient.notes || "No notes recorded yet."}
                      </div>
                    </div>

                    {/* Add note input */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
                      <p className="text-[12px] font-inter font-bold text-slate-800 mb-2">
                        Add New Consultation Note
                      </p>
                      <textarea
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Write observations from last session or follow-up recommendations..."
                        className="w-full h-20 p-2.5 text-[12px] font-inter border border-slate-200 rounded-xl outline-none focus:border-[#1E3A8A] resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleAddNote}
                          disabled={!newNoteText.trim()}
                          className="px-4 py-1.5 bg-[#1E3A8A] text-white text-[12px] font-inter font-semibold rounded-xl disabled:opacity-50 flex items-center gap-1.5 active:scale-95 transition-transform"
                        >
                          <Plus size={14} /> Save Note
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedClient(null)}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[13px] font-inter font-semibold hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const id = selectedClient.id;
                      setSelectedClient(null);
                      openClientChat(id);
                    }}
                    className="px-5 py-2.5 bg-[#1E3A8A] text-white rounded-xl text-[13px] font-inter font-semibold hover:bg-[#1E3A8A]/90 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <MessageCircle size={16} />
                    Message Client Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
