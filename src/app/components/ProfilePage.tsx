import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import {
  User,
  Bell,
  Moon,
  LogOut,
  ChevronRight,
  Shield,
  HelpCircle,
  Star,
  Wallet,
  PieChart,
  MessageCircle,
  Crown,
} from "lucide-react";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile, logout, switchRole, isDemoMode } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-[28px] font-inter font-bold text-[#1E3A8A] text-center">
          Profile
        </h1>
      </div>

      {/* Profile card */}
      <div className="mx-5 mt-2 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[20px] p-5 flex items-center gap-4 shadow-lg">
        <div className="w-[60px] h-[60px] rounded-full bg-[#FFDD36] flex items-center justify-center shrink-0">
          <User size={28} className="text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white text-[17px] font-inter font-bold truncate">{user.name}</p>
            {isDemoMode ? (
              <span className="text-[9px] font-inter font-bold px-1.5 py-0.5 bg-[#FFDD36] text-black rounded">
                DEMO
              </span>
            ) : (
              <span className="text-[9px] font-inter font-bold px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">
                VERIFIED
              </span>
            )}
          </div>
          <p className="text-white/50 text-[12px] font-inter truncate">{user.email || user.phone || "No contact info"}</p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {user.subscription ? (
              <span className="text-[10px] font-inter font-semibold px-2 py-0.5 bg-[#4CAF50]/20 text-[#4CAF50] rounded-full capitalize">
                {user.subscription} Plan
              </span>
            ) : (
              <span className="text-[10px] font-inter font-semibold px-2 py-0.5 bg-white/10 text-white/50 rounded-full">
                Standard
              </span>
            )}
            <span className="text-[10px] font-inter font-semibold px-2 py-0.5 bg-[#FFDD36]/20 text-[#FFDD36] rounded-full capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Demo Switch Action */}
      {isDemoMode && (
        <div className="mx-5 mt-3 bg-[#FFDD36]/15 border border-[#FFDD36]/40 rounded-xl p-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-[12px] font-inter font-bold text-slate-800">Viewing Demo Mode</p>
            <p className="text-[10px] font-inter text-slate-500">Ready to track your own real finances?</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/signup");
            }}
            className="px-3 py-1.5 bg-[#1E3A8A] text-white text-[11px] font-inter font-semibold rounded-lg shrink-0 active:scale-95 transition-transform shadow-sm"
          >
            Start Real Account
          </button>
        </div>
      )}

      {/* Quick links */}
      <div className="px-5 mt-5 flex gap-3">
        {[
          { label: "Budget", icon: Wallet, path: "/budget" },
          { label: "Analytics", icon: PieChart, path: "/analytics" },
          { label: "Consult", icon: MessageCircle, path: "/consultants" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex-1 bg-[#FFDD36]/10 rounded-xl p-3 flex flex-col items-center gap-2 active:scale-[0.97] transition-transform"
          >
            <item.icon size={20} className="text-[#1E3A8A]" />
            <span className="text-[11px] font-inter font-medium text-black/60">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Subscription */}
      <div className="px-5 mt-5">
        <button
          onClick={() => navigate("/subscription")}
          className="w-full bg-gradient-to-r from-[#FFDD36]/20 to-[#FFDD36]/5 rounded-[16px] p-4 border border-[#FFDD36]/30 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFDD36]/30 flex items-center justify-center shrink-0">
            <Crown size={20} className="text-[#1E3A8A]" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-inter font-bold text-black">
              {user.subscription ? "Manage Subscription" : "Get Pro Access"}
            </p>
            <p className="text-[11px] font-inter text-black/40">
              {user.subscription
                ? `${user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} plan active`
                : "Unlock expert financial consultants"}
            </p>
          </div>
          <ChevronRight size={16} className="text-black/20" />
        </button>
      </div>

      {/* Admin Quick Access (Only for verified admin user) */}
      {user.role === "admin" && user.email?.toLowerCase() === "abusayed102188@gmail.com" && (
        <div className="px-5 mt-5">
          <p className="text-[14px] font-inter font-bold text-black/40 mb-3 uppercase tracking-wider">
            Administration
          </p>
          <div className="bg-white rounded-[16px] shadow-sm border border-black/5 overflow-hidden">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center justify-between px-4 py-3.5 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0F172A]/10 flex items-center justify-center">
                  <Shield size={18} className="text-[#0F172A]" />
                </div>
                <div className="text-left">
                  <span className="text-[14px] font-inter font-medium text-black block">
                    Open Admin Panel
                  </span>
                  <span className="text-[10px] font-inter text-black/30">
                    Manage users, consultants & analytics
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-black/20" />
            </button>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="px-5 mt-6">
        <p className="text-[14px] font-inter font-bold text-black/40 mb-3 uppercase tracking-wider">
          Settings
        </p>
        <div className="bg-white rounded-[16px] shadow-sm border border-black/5 overflow-hidden">
          {/* Notifications */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                <Bell size={18} className="text-[#4CAF50]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Notifications
              </span>
            </div>
            <button
              onClick={() =>
                updateProfile({
                  notificationsEnabled: !user.notificationsEnabled,
                })
              }
              className={`w-[44px] h-[24px] rounded-full transition-all p-0.5 ${
                user.notificationsEnabled ? "bg-[#4CAF50]" : "bg-black/15"
              }`}
            >
              <div
                className={`w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform ${
                  user.notificationsEnabled ? "translate-x-[20px]" : ""
                }`}
              />
            </button>
          </div>

          {/* Dark mode */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center">
                <Moon size={18} className="text-[#1E3A8A]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Dark Mode
              </span>
            </div>
            <button
              onClick={() => updateProfile({ darkMode: !user.darkMode })}
              className={`w-[44px] h-[24px] rounded-full transition-all p-0.5 ${
                user.darkMode ? "bg-[#1E3A8A]" : "bg-black/15"
              }`}
            >
              <div
                className={`w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform ${
                  user.darkMode ? "translate-x-[20px]" : ""
                }`}
              />
            </button>
          </div>

          {/* Privacy */}
          <button className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 w-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFDD36]/20 flex items-center justify-center">
                <Shield size={18} className="text-[#FFDD36]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Privacy & Security
              </span>
            </div>
            <ChevronRight size={18} className="text-black/20" />
          </button>

          {/* Help */}
          <button className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 w-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E6484E]/10 flex items-center justify-center">
                <HelpCircle size={18} className="text-[#E6484E]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Help & Support
              </span>
            </div>
            <ChevronRight size={18} className="text-black/20" />
          </button>

          {/* Rate */}
          <button className="flex items-center justify-between px-4 py-3.5 w-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFDD36]/20 flex items-center justify-center">
                <Star size={18} className="text-[#FFDD36]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Rate the App
              </span>
            </div>
            <ChevronRight size={18} className="text-black/20" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 mt-6">
        <button
          onClick={handleLogout}
          className="w-full h-[48px] bg-[#E6484E]/10 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <LogOut size={18} className="text-[#E6484E]" />
          <span className="text-[14px] font-inter font-semibold text-[#E6484E]">
            Logout
          </span>
        </button>
      </div>

      {/* App info */}
      <div className="flex flex-col items-center mt-6 pb-4">
        <img src={imgLogo} alt="PocketGuru" className="w-[40px] h-auto object-contain opacity-30" />
        <p className="text-[10px] text-black/20 font-inter mt-1">PocketGuru v2.0.0</p>
      </div>
    </div>
  );
}