import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Crown,
  TrendingUp,
  Shield,
  UserCheck,
  UserX,
  Bot,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Star,
  DollarSign,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type AdminTab = "overview" | "users" | "consultants" | "subscriptions";

function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString()}`;
}

export function AdminPage() {
  const navigate = useNavigate();
  const { user, consultants, chatSessions } = useAppContext();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Mock admin data
  const adminStats = {
    totalUsers: 15482,
    activeUsers: 8934,
    totalConsultants: consultants.filter((c) => !c.isAI).length,
    activeSessions: chatSessions.filter((s) => s.status === "active").length,
    totalRevenue: 2450000,
    monthlyGrowth: 23.5,
    subscribers: {
      starter: 4200,
      basic: 6100,
      premium: 3800,
      elite: 1382,
    },
  };

  const recentUsers = [
    { id: 1, name: "Tanvir Hassan", email: "tanvir@mail.com", plan: "basic", status: "active", joinDate: "2026-02-18" },
    { id: 2, name: "Mira Sen", email: "mira@mail.com", plan: "premium", status: "active", joinDate: "2026-02-17" },
    { id: 3, name: "Karim Ahmed", email: "karim@mail.com", plan: "starter", status: "active", joinDate: "2026-02-16" },
    { id: 4, name: "Nusrat Jahan", email: "nusrat@mail.com", plan: "elite", status: "active", joinDate: "2026-02-15" },
    { id: 5, name: "Rafi Uddin", email: "rafi@mail.com", plan: null, status: "inactive", joinDate: "2026-02-14" },
  ];

  if (user.role !== "admin" || user.email?.toLowerCase() !== "abusayed102188@gmail.com") {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center px-5">
        <Shield size={48} className="text-[#E6484E]/30 mb-4" />
        <p className="text-[18px] font-inter font-bold text-black text-center">
          Admin Access Required
        </p>
        <p className="text-[13px] font-inter text-black/40 mt-1 text-center">
          Only the authorized system administrator (abusayed102188@gmail.com) can access this control panel
        </p>
        <button
          onClick={() => navigate(user.role === "consultant" ? "/consultant-dashboard" : "/home")}
          className="mt-4 px-6 py-2.5 bg-[#1E3A8A] rounded-xl text-white text-[13px] font-inter font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const tabs: { key: AdminTab; label: string; icon: typeof Users }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "users", label: "Users", icon: Users },
    { key: "consultants", label: "Experts", icon: UserCheck },
    { key: "subscriptions", label: "Plans", icon: Crown },
  ];

  const getPlanColor = (plan: string | null) => {
    switch (plan) {
      case "starter": return "#94A3B8";
      case "basic": return "#1E3A8A";
      case "premium": return "#4CAF50";
      case "elite": return "#FFDD36";
      default: return "#E6484E";
    }
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] pt-14 px-5 pb-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center relative">
              <Bell size={18} className="text-white/60" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#E6484E] rounded-full" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Settings size={18} className="text-white/60" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Shield size={24} className="text-[#FFDD36]" />
          <h1 className="text-[24px] font-inter font-bold text-white">
            Admin Panel
          </h1>
        </div>
        <p className="text-white/40 text-[13px] font-inter mt-1">
          Manage users, consultants & subscriptions
        </p>
      </div>

      {/* Admin Tabs */}
      <div className="px-5 mt-4 flex gap-1 bg-gray-100 mx-5 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 rounded-lg text-center transition-all flex flex-col items-center gap-0.5 ${
                activeTab === tab.key
                  ? "bg-white shadow-sm"
                  : ""
              }`}
            >
              <Icon
                size={16}
                className={
                  activeTab === tab.key ? "text-[#1E3A8A]" : "text-black/30"
                }
              />
              <span
                className={`text-[10px] font-inter font-medium ${
                  activeTab === tab.key ? "text-[#1E3A8A]" : "text-black/40"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="px-5 mt-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1E3A8A]/5 rounded-[16px] p-4">
              <Users size={20} className="text-[#1E3A8A] mb-2" />
              <p className="text-[22px] font-inter font-bold text-black">
                {adminStats.totalUsers.toLocaleString()}
              </p>
              <p className="text-[11px] font-inter text-black/40">Total Users</p>
            </div>
            <div className="bg-[#4CAF50]/5 rounded-[16px] p-4">
              <TrendingUp size={20} className="text-[#4CAF50] mb-2" />
              <p className="text-[22px] font-inter font-bold text-black">
                +{adminStats.monthlyGrowth}%
              </p>
              <p className="text-[11px] font-inter text-black/40">Monthly Growth</p>
            </div>
            <div className="bg-[#FFDD36]/10 rounded-[16px] p-4">
              <DollarSign size={20} className="text-[#1E3A8A] mb-2" />
              <p className="text-[22px] font-inter font-bold text-black">
                {formatCurrency(adminStats.totalRevenue)}
              </p>
              <p className="text-[11px] font-inter text-black/40">Revenue</p>
            </div>
            <div className="bg-[#E6484E]/5 rounded-[16px] p-4">
              <MessageCircle size={20} className="text-[#E6484E] mb-2" />
              <p className="text-[22px] font-inter font-bold text-black">
                {adminStats.activeSessions}
              </p>
              <p className="text-[11px] font-inter text-black/40">Active Chats</p>
            </div>
          </div>

          {/* Subscription Breakdown */}
          <div className="mt-5">
            <p className="text-[14px] font-inter font-bold text-black mb-3">
              Subscription Breakdown
            </p>
            <div className="bg-gray-50 rounded-[16px] p-4">
              {Object.entries(adminStats.subscribers).map(([plan, count]) => {
                const total = Object.values(adminStats.subscribers).reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={plan} className="mb-3 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-inter font-medium text-black capitalize">
                        {plan}
                      </span>
                      <span className="text-[12px] font-inter text-black/40">
                        {count.toLocaleString()} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: getPlanColor(plan) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-5">
            <p className="text-[14px] font-inter font-bold text-black mb-3">
              Recent Users
            </p>
            <div className="flex flex-col gap-2">
              {recentUsers.slice(0, 3).map((u) => (
                <div
                  key={u.id}
                  className="bg-white rounded-xl p-3 border border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                      <span className="text-[13px] font-inter font-bold text-[#1E3A8A]">
                        {u.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-[13px] font-inter font-medium text-black">
                        {u.name}
                      </p>
                      <p className="text-[10px] font-inter text-black/30">
                        {u.joinDate}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full capitalize"
                    style={{
                      backgroundColor: getPlanColor(u.plan) + "15",
                      color: getPlanColor(u.plan),
                    }}
                  >
                    {u.plan || "Free"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="px-5 mt-5">
          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
            />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full h-[40px] pl-9 pr-4 bg-gray-50 rounded-xl text-[13px] font-inter outline-none border border-black/5"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1.5 bg-[#1E3A8A] rounded-full text-[11px] font-inter font-medium text-white">
              All ({adminStats.totalUsers.toLocaleString()})
            </span>
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-[11px] font-inter font-medium text-black/40">
              Active ({adminStats.activeUsers.toLocaleString()})
            </span>
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-[11px] font-inter font-medium text-black/40">
              Inactive
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-[16px] p-4 border border-black/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                      <span className="text-[14px] font-inter font-bold text-[#1E3A8A]">
                        {u.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-[14px] font-inter font-bold text-black">
                        {u.name}
                      </p>
                      <p className="text-[11px] font-inter text-black/40">
                        {u.email}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-black/20" />
                </div>
                <div className="flex items-center gap-2 mt-2.5">
                  <span
                    className="text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full capitalize"
                    style={{
                      backgroundColor: getPlanColor(u.plan) + "15",
                      color: getPlanColor(u.plan),
                    }}
                  >
                    {u.plan || "Free"}
                  </span>
                  <span
                    className={`text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full ${
                      u.status === "active"
                        ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                        : "bg-[#E6484E]/10 text-[#E6484E]"
                    }`}
                  >
                    {u.status}
                  </span>
                  <span className="text-[10px] font-inter text-black/30">
                    Joined {u.joinDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consultants Tab */}
      {activeTab === "consultants" && (
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-inter font-bold text-black">
              Manage Consultants
            </p>
            <button className="px-3 py-1.5 bg-[#1E3A8A] rounded-lg text-white text-[11px] font-inter font-semibold">
              + Add New
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {consultants
              .filter((c) => !c.isAI)
              .map((consultant) => (
                <div
                  key={consultant.id}
                  className="bg-white rounded-[16px] p-4 border border-black/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <ImageWithFallback
                        src={consultant.avatar}
                        alt={consultant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-inter font-bold text-black">
                        {consultant.name}
                      </p>
                      <p className="text-[12px] font-inter text-[#1E3A8A]">
                        {consultant.specialty}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          <Star
                            size={10}
                            className="text-[#FFDD36]"
                            fill="#FFDD36"
                          />
                          <span className="text-[10px] font-inter text-black/40">
                            {consultant.rating}
                          </span>
                        </div>
                        <span className="text-[10px] font-inter text-black/30">
                          {consultant.reviewCount} reviews
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full ${
                          consultant.availability === "available"
                            ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                            : consultant.availability === "busy"
                            ? "bg-[#FF9800]/10 text-[#FF9800]"
                            : "bg-gray-100 text-black/30"
                        }`}
                      >
                        {consultant.availability}
                      </span>
                      <span className="text-[11px] font-inter font-bold text-[#1E3A8A]">
                        ৳{consultant.hourlyRate}/hr
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-1.5 bg-[#1E3A8A]/5 rounded-lg text-[11px] font-inter font-medium text-[#1E3A8A]">
                      View Profile
                    </button>
                    <button className="flex-1 py-1.5 bg-[#E6484E]/5 rounded-lg text-[11px] font-inter font-medium text-[#E6484E]">
                      Suspend
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div className="px-5 mt-5">
          <p className="text-[14px] font-inter font-bold text-black mb-3">
            Subscription Analytics
          </p>

          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[16px] p-4 mb-4">
            <p className="text-white/50 text-[12px] font-inter">
              Total MRR
            </p>
            <p className="text-white text-[28px] font-inter font-bold mt-1">
              {formatCurrency(adminStats.totalRevenue)}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-[#4CAF50]" />
              <span className="text-[#4CAF50] text-[12px] font-inter font-medium">
                +{adminStats.monthlyGrowth}% from last month
              </span>
            </div>
          </div>

          {Object.entries(adminStats.subscribers).map(([plan, count]) => {
            const planData = {
              starter: { price: 199, color: "#94A3B8" },
              basic: { price: 499, color: "#1E3A8A" },
              premium: { price: 999, color: "#4CAF50" },
              elite: { price: 1999, color: "#FFDD36" },
            }[plan]!;

            return (
              <div
                key={plan}
                className="bg-white rounded-[16px] p-4 border border-black/5 mb-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: planData.color + "15" }}
                    >
                      <Crown size={18} style={{ color: planData.color }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-inter font-bold text-black capitalize">
                        {plan}
                      </p>
                      <p className="text-[11px] font-inter text-black/40">
                        ৳{planData.price}/mo per user
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[16px] font-inter font-bold text-black">
                      {count.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-inter text-black/40">
                      subscribers
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-[12px] font-inter font-semibold text-[#4CAF50]">
                    Revenue: {formatCurrency(count * planData.price)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-8" />
    </div>
  );
}
