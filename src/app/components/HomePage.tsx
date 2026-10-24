import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { Plus, TrendingUp, TrendingDown, Target, Wallet, ArrowRight, MessageCircle, Bot, Sparkles } from "lucide-react";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const weeklyData = [
  { name: "Mon", expense: 800 },
  { name: "Tue", expense: 1200 },
  { name: "Wed", expense: 600 },
  { name: "Thu", expense: 4500 },
  { name: "Fri", expense: 900 },
  { name: "Sat", expense: 3500 },
  { name: "Sun", expense: 1800 },
];

function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString()}`;
}

export function HomePage() {
  const navigate = useNavigate();
  const { user, totalBalance, totalIncome, totalExpense, savingsGoals, budgetCategories, transactions, isDemoMode, logout } = useAppContext();

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const totalSavingsTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);
  const totalSavingsCurrent = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const savingsPercent = totalSavingsTarget > 0 ? Math.round((totalSavingsCurrent / totalSavingsTarget) * 100) : 0;

  const totalBudget = budgetCategories.reduce((s, c) => s + c.budgetAmount, 0);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spentAmount, 0);

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  return (
    <div className="h-full bg-slate-50 md:bg-transparent overflow-y-auto pb-28 md:pb-12">
      {/* Demo Account Indicator Banner */}
      {isDemoMode && (
        <div className="bg-[#FFDD36] px-4 md:px-8 py-2 flex items-center justify-between text-[11px] font-inter text-black font-medium shadow-sm">
          <div className="flex items-center gap-1.5">
            <span>⭐</span>
            <span className="font-semibold">Demo Mode Active (Alex Johnson dataset)</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/signup");
            }}
            className="bg-black text-white px-2.5 py-1 rounded-md font-semibold text-[10px] active:scale-95 transition-transform"
          >
            Create Real Account
          </button>
        </div>
      )}

      {/* Mobile Top Header (Hidden on Desktop) */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between md:hidden bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src={imgLogo} alt="PocketGuru" className="w-[44px] h-[44px] object-contain" />
          <div>
            <p className="text-[12px] text-black/50 font-inter">{greeting},</p>
            <p className="text-[17px] font-inter font-bold text-black">{user.name} 👋</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 bg-[#FFDD36]/20 rounded-xl flex items-center justify-center relative"
        >
          <div className="w-2 h-2 bg-[#E6484E] rounded-full absolute top-2.5 right-2.5" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      {/* Main Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ======================================================== */}
          {/* LEFT 2 COLUMNS: Financial Cards, Graph & Recent Ledger   */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <motion.div
              className="bg-gradient-to-br from-[#1E3A8A] via-[#1e3a8a] to-[#0F172A] rounded-[24px] p-6 shadow-xl text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-[13px] font-inter font-medium tracking-wide uppercase">
                  Total Liquid Balance
                </span>
                <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-full font-inter text-white/90">
                  {user.subscription ? user.subscription.toUpperCase() : "STANDARD"}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[38px] md:text-[44px] font-inter font-extrabold tracking-tight">
                  {formatCurrency(totalBalance)}
                </span>
                <span className="text-white/60 text-[14px] font-inter font-semibold">BDT</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[#4CAF50]/20 flex items-center justify-center">
                      <TrendingUp size={14} className="text-[#4CAF50]" />
                    </div>
                    <span className="text-white/70 text-[12px] font-inter">Total Income</span>
                  </div>
                  <p className="text-white text-[20px] font-inter font-bold">
                    {formatCurrency(totalIncome)}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[#E6484E]/20 flex items-center justify-center">
                      <TrendingDown size={14} className="text-[#E6484E]" />
                    </div>
                    <span className="text-white/70 text-[12px] font-inter">Total Expense</span>
                  </div>
                  <p className="text-white text-[20px] font-inter font-bold">
                    {formatCurrency(totalExpense)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Expense Graph */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-inter font-bold text-slate-800">Expense Trend</h3>
                  <p className="text-[12px] text-slate-400 font-inter">Weekly financial cash flow analysis</p>
                </div>
                <button
                  onClick={() => navigate("/analytics")}
                  className="text-[12px] text-[#1E3A8A] font-inter font-semibold hover:underline flex items-center gap-1"
                >
                  Full Analytics <ArrowRight size={13} />
                </button>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={{ stroke: "#cbd5e1" }} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis axisLine={{ stroke: "#cbd5e1" }} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="expense" stroke="#E6484E" strokeWidth={2.5} dot={{ fill: "#E6484E", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-inter font-bold text-slate-800">Recent Transactions</h3>
                  <p className="text-[12px] text-slate-400 font-inter">Synced in real-time with Supabase</p>
                </div>
                <button
                  onClick={() => navigate("/transactions")}
                  className="text-[12px] text-[#1E3A8A] font-inter font-semibold hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight size={13} />
                </button>
              </div>

              {recentTransactions.length === 0 ? (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] mb-2">
                    <Plus size={22} />
                  </div>
                  <p className="text-[15px] font-inter font-bold text-slate-800">No Transactions Yet</p>
                  <p className="text-[12px] font-inter text-slate-500 mt-1 max-w-[280px]">
                    Your account is connected. Record an income or expense to begin tracking.
                  </p>
                  <button
                    onClick={() => navigate("/add-transaction")}
                    className="mt-3 px-4 py-2 bg-[#FFDD36] text-black text-[13px] font-inter font-semibold rounded-xl flex items-center gap-1.5 active:scale-95 transition-transform shadow-sm"
                  >
                    <Plus size={15} /> Add First Transaction
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentTransactions.map((t) => (
                    <div key={t.id} className="py-3 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            t.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                          }`}
                        >
                          {t.type === "income" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        </div>
                        <div>
                          <p className="text-[14px] font-inter font-semibold text-slate-800">{t.category}</p>
                          <p className="text-[12px] text-slate-400 font-inter">{t.date} {t.notes ? `• ${t.notes}` : ''}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[15px] font-inter font-bold ${
                          t.type === "income" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Actions, AI Guru, Goals, Budget            */}
          {/* ======================================================== */}
          <div className="space-y-6">
            {/* Quick Action Grid */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200/80">
              <h3 className="text-[14px] font-inter font-bold text-slate-800 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Add Expense", icon: TrendingDown, color: "#E6484E", path: "/add-transaction?type=expense" },
                  { label: "Add Income", icon: TrendingUp, color: "#4CAF50", path: "/add-transaction?type=income" },
                  { label: "Set Goal", icon: Target, color: "#1E3A8A", path: "/add-goal" },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/60 flex flex-col items-center gap-2 transition-all active:scale-95"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: action.color + "15" }}
                    >
                      <action.icon size={20} color={action.color} />
                    </div>
                    <span className="text-[11px] font-inter font-semibold text-slate-700 text-center">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Advisor Spotlight Card */}
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[20px] p-5 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFDD36] flex items-center justify-center text-black shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-[15px] font-inter font-bold">PocketGuru AI Advisor</h4>
                  <p className="text-[11px] text-white/60 font-inter">Live OpenRouter Financial Intelligence</p>
                </div>
              </div>
              <p className="text-[12px] font-inter text-white/80 leading-relaxed mb-4">
                Ask about spending cuts, monthly budgeting, or tailored savings plans based on your income.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate("/chat/cs-1")}
                  className="w-full py-2.5 bg-[#FFDD36] hover:bg-[#ffe14d] text-black text-[13px] font-inter font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <Bot size={16} />
                  <span>Chat with PocketGuru AI</span>
                </button>
              </div>
            </div>

            {/* Savings Goals Preview */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-inter font-bold text-slate-800">Savings Target</h3>
                <button onClick={() => navigate("/activity")} className="text-[12px] text-[#1E3A8A] font-inter font-medium flex items-center gap-0.5">
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-[72px] h-[72px] shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="9" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#1E3A8A"
                      strokeWidth="9"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${savingsPercent * 2.64} 264`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15px] font-inter font-bold text-slate-800">{savingsPercent}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[20px] font-inter font-bold text-slate-900">
                    {formatCurrency(totalSavingsCurrent)}
                  </p>
                  <p className="text-[12px] text-slate-400 font-inter">
                    of {formatCurrency(totalSavingsTarget)} total goal
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Summary Card */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-inter font-bold text-slate-800">Monthly Budget</h3>
                <button onClick={() => navigate("/budget")} className="text-[12px] text-[#1E3A8A] font-inter font-medium flex items-center gap-0.5">
                  Details <ArrowRight size={12} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
                  <span className="text-[11px] font-inter text-slate-500 block">Spent</span>
                  <span className="text-[14px] font-inter font-bold text-rose-600 block mt-0.5">{formatCurrency(totalSpent)}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
                  <span className="text-[11px] font-inter text-slate-500 block">Budget</span>
                  <span className="text-[14px] font-inter font-bold text-slate-800 block mt-0.5">{formatCurrency(totalBudget)}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
                  <span className="text-[11px] font-inter text-slate-500 block">Remaining</span>
                  <span className="text-[14px] font-inter font-bold text-emerald-600 block mt-0.5">{formatCurrency(Math.max(0, totalBudget - totalSpent))}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}