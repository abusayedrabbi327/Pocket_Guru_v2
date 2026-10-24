import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { BottomNav } from "./BottomNav";
import { useAppContext } from "../context/AppContext";
import {
  Home,
  ArrowLeftRight,
  PieChart,
  BarChart3,
  MessageCircle,
  Crown,
  Shield,
  User,
  LogOut,
  Plus,
  Sparkles,
  Briefcase,
  LayoutDashboard,
  Users,
  Calendar,
  Database,
  Bell,
} from "lucide-react";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";

// Routes that belong to the user flow (excluding shared routes like /chat/)
const userRoutes = [
  "/home",
  "/transactions",
  "/add-transaction",
  "/activity",
  "/add-goal",
  "/budget",
  "/analytics",
  "/profile",
  "/consultants",
  "/consultant/",
  "/subscription",
];

// Routes that belong to the consultant flow
const consultantRoutes = [
  "/consultant-dashboard",
  "/consultant-clients",
  "/consultant-messages",
  "/consultant-schedule",
  "/consultant-profile",
  "/consultant-setup",
];

function isConsultantRoute(pathname: string): boolean {
  return consultantRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
}

function isUserRoute(pathname: string): boolean {
  return userRoutes.some(
    (r) => pathname === r || pathname.startsWith(r)
  );
}

export function MainLayout() {
  const { user, totalBalance, isDbConnected, isDemoMode, logout } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    // STRICT ADMIN GUARD: Only abusayed102188@gmail.com with admin role can access /admin
    if (path.startsWith("/admin") && (user.role !== "admin" || user.email?.toLowerCase() !== "abusayed102188@gmail.com")) {
      navigate(user.role === "consultant" ? "/consultant-dashboard" : "/home", { replace: true });
      return;
    }

    // If consultant is trying to access user routes, redirect to consultant dashboard
    if (user.role === "consultant" && isUserRoute(path) && !isConsultantRoute(path)) {
      navigate("/consultant-dashboard", { replace: true });
      return;
    }

    // If user is trying to access consultant routes, redirect to home
    if (user.role === "user" && isConsultantRoute(path)) {
      navigate("/home", { replace: true });
      return;
    }
  }, [location.pathname, user.role, navigate]);

  // Hide bottom nav on chat, transaction/goal forms, and consultant detail pages on mobile
  const hideBottomNav =
    location.pathname.startsWith("/chat/") ||
    location.pathname === "/add-transaction" ||
    location.pathname === "/add-goal" ||
    location.pathname.startsWith("/consultant/");

  const isConsultant = user.role === "consultant";

  const userNavLinks = [
    { path: "/home", label: "Dashboard", icon: Home },
    { path: "/transactions", label: "Transactions", icon: ArrowLeftRight },
    { path: "/budget", label: "Budget & Goals", icon: PieChart },
    { path: "/analytics", label: "Financial Analytics", icon: BarChart3 },
    { path: "/consultants", label: "AI Guru & Experts", icon: MessageCircle },
    { path: "/subscription", label: "Subscription Plans", icon: Crown },
    { path: "/profile", label: "My Profile", icon: User },
  ];

  const consultantNavLinks = [
    { path: "/consultant-dashboard", label: "Expert Dashboard", icon: LayoutDashboard },
    { path: "/consultant-clients", label: "My Clients", icon: Users },
    { path: "/consultant-messages", label: "Client Messages", icon: MessageCircle },
    { path: "/consultant-schedule", label: "Consultation Schedule", icon: Calendar },
    { path: "/consultant-profile", label: "Professional Profile", icon: User },
  ];

  const navLinks = isConsultant ? consultantNavLinks : userNavLinks;

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#0B0F19] text-slate-100 overflow-hidden">
      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR (Visible on md screens and up)           */}
      {/* ======================================================== */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0F172A] border-r border-white/10 shrink-0 select-none z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FFDD36] to-amber-200 p-1 flex items-center justify-center shadow-lg shadow-[#FFDD36]/10">
            <img src={imgLogo} alt="PocketGuru" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-inter font-bold text-[18px] text-white tracking-tight">PocketGuru</span>
              <span className="text-[9px] font-bold bg-[#FFDD36] text-black px-1.5 py-0.5 rounded font-inter">PRO</span>
            </div>
            <p className="text-[11px] text-white/50 font-inter">Fintech & AI Platform</p>
          </div>
        </div>

        {/* Quick Balance Preview Card */}
        <div className="mx-4 mt-5 p-4 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#172554] border border-blue-500/20 shadow-md">
          <span className="text-[11px] font-inter text-blue-200/70 uppercase tracking-wider block">Total Net Balance</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[22px] font-bold font-inter text-white">৳{totalBalance.toLocaleString()}</span>
            <span className="text-[11px] font-inter text-blue-300">BDT</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-inter text-blue-200/80 pt-2 border-t border-white/10">
            <span>Status:</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isDemoMode ? "Demo Mode" : isDbConnected ? "Supabase Live" : "Active"}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-1.5">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-2">
            {isConsultant ? "Expert Tools" : "Main Navigation"}
          </span>

          {navLinks.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/home" && item.path !== "/consultant-dashboard" && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-inter font-medium transition-all ${
                  isActive
                    ? "bg-[#FFDD36] text-black font-semibold shadow-md shadow-[#FFDD36]/20"
                    : "text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.99]"
                }`}
              >
                <Icon size={18} className={isActive ? "text-black" : "text-white/60"} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Panel Link - ONLY visible if user.role === 'admin' */}
          {user.role === "admin" && (
            <div className="pt-3 border-t border-white/10 mt-3">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1.5">
                Admin Privileges
              </span>
              <button
                onClick={() => navigate("/admin")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-inter font-medium transition-all ${
                  location.pathname === "/admin"
                    ? "bg-rose-500 text-white font-semibold shadow-md"
                    : "text-rose-300/80 hover:text-rose-200 hover:bg-rose-950/40"
                }`}
              >
                <Shield size={18} />
                <span>Admin Control Center</span>
              </button>
            </div>
          )}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-[#1E3A8A] flex items-center justify-center font-bold text-white text-[13px] shrink-0">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white truncate">{user.name}</p>
                <span className="inline-block text-[10px] text-[#FFDD36] font-medium capitalize">
                  {user.role} • {user.subscription || "Free"}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              title="Sign Out"
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT AREA                                        */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white text-slate-900 relative">
        {/* Desktop Top Header Bar (Hidden on Mobile) */}
        <header className="hidden md:flex h-16 border-b border-slate-200 bg-white px-8 items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-[18px] font-inter font-bold text-slate-800">
              {location.pathname === "/home" ? "Financial Dashboard" :
               location.pathname === "/transactions" ? "Transactions Ledger" :
               location.pathname === "/budget" ? "Budget & Savings Goals" :
               location.pathname === "/analytics" ? "Financial Analytics" :
               location.pathname === "/consultants" ? "AI Financial Advisor & Consultants" :
               location.pathname === "/subscription" ? "Membership & Tiers" :
               location.pathname === "/profile" ? "Account Settings" :
               location.pathname === "/admin" ? "Administrative Portal" : "PocketGuru"}
            </h2>
            {isDemoMode && (
              <span className="bg-amber-100 text-amber-800 text-[11px] font-inter font-semibold px-2.5 py-0.5 rounded-full border border-amber-300">
                Demo Showcase
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/add-transaction")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FFDD36] hover:bg-[#ffe14d] text-black font-inter font-semibold text-[13px] rounded-xl shadow-sm transition-all active:scale-95"
            >
              <Plus size={16} />
              <span>Add Transaction</span>
            </button>

            <button
              onClick={() => navigate("/chat/cs-1")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-inter font-semibold text-[13px] rounded-xl shadow-sm transition-all active:scale-95"
            >
              <Sparkles size={15} className="text-[#FFDD36]" />
              <span>Ask PocketGuru AI</span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1" />

            <div className="flex items-center gap-1.5 text-[11px] font-inter text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Database size={13} className="text-emerald-500" />
              <span>Supabase IPv4 Pooler</span>
            </div>
          </div>
        </header>

        {/* Route View Component */}
        <main className="flex-1 overflow-y-auto relative bg-slate-50/60">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation (Hidden on Desktop) */}
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
