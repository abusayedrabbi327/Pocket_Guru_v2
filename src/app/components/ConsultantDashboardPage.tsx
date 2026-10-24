import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MessageCircle,
  Clock,
  Star,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

type DashTab = "overview" | "clients" | "schedule";

export function ConsultantDashboardPage() {
  const navigate = useNavigate();
  const { user, chatSessions, consultantOwnProfile } = useAppContext();
  const [activeTab, setActiveTab] = useState<DashTab>("overview");

  // Mock consultant stats
  const stats = {
    totalClients: 47,
    activeChats: chatSessions.filter((s) => s.status === "active").length,
    completedSessions: 234,
    rating: 4.8,
    thisMonthEarnings: 34500,
    pendingRequests: 3,
  };

  const pendingRequests = [
    {
      id: 1,
      name: "Tanvir H.",
      topic: "Budget Review",
      time: "10:30 AM",
      plan: "Premium",
    },
    {
      id: 2,
      name: "Mira S.",
      topic: "Investment Advice",
      time: "2:00 PM",
      plan: "Basic",
    },
    {
      id: 3,
      name: "Karim R.",
      topic: "Debt Strategy",
      time: "4:30 PM",
      plan: "Elite",
    },
  ];

  const schedule = [
    {
      id: 1,
      client: "Nusrat J.",
      time: "9:00 AM - 9:45 AM",
      topic: "Monthly Review",
      status: "completed",
    },
    {
      id: 2,
      client: "Rafi U.",
      time: "11:00 AM - 11:45 AM",
      topic: "Tax Planning",
      status: "completed",
    },
    {
      id: 3,
      client: "Tanvir H.",
      time: "2:00 PM - 2:45 PM",
      topic: "Budget Review",
      status: "upcoming",
    },
    {
      id: 4,
      client: "Mira S.",
      time: "4:00 PM - 4:45 PM",
      topic: "Investment",
      status: "upcoming",
    },
  ];

  const recentClients = [
    { id: 1, name: "Tanvir Hassan", sessions: 5, lastSession: "Today", satisfaction: 5 },
    { id: 2, name: "Mira Sen", sessions: 3, lastSession: "Yesterday", satisfaction: 4 },
    { id: 3, name: "Karim Ahmed", sessions: 8, lastSession: "2 days ago", satisfaction: 5 },
    { id: 4, name: "Nusrat Jahan", sessions: 12, lastSession: "3 days ago", satisfaction: 5 },
  ];

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] pt-14 px-5 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white/10 px-3 py-1 rounded-full">
            <span className="text-white/60 text-[11px] font-inter">
              Consultant Dashboard
            </span>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full">
            <span className="text-white/60 text-[11px] font-inter">
              {consultantOwnProfile.specialty || "Consultant"}
            </span>
          </div>
        </div>

        <p className="text-white/50 text-[13px] font-inter">Welcome back,</p>
        <h1 className="text-[24px] font-inter font-bold text-white">
          {consultantOwnProfile.name || user.name}
        </h1>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-[20px] font-inter font-bold">
              {stats.activeChats}
            </p>
            <p className="text-white/40 text-[10px] font-inter">Active</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-[20px] font-inter font-bold">
              {stats.pendingRequests}
            </p>
            <p className="text-white/40 text-[10px] font-inter">Pending</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-[#FFDD36] text-[20px] font-inter font-bold">
              {stats.rating}
            </p>
            <p className="text-white/40 text-[10px] font-inter">Rating</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mt-4 flex gap-2">
        {(
          [
            { key: "overview", label: "Overview" },
            { key: "clients", label: "Clients" },
            { key: "schedule", label: "Schedule" },
          ] as { key: DashTab; label: string }[]
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-[12px] font-inter font-medium transition-all ${
              activeTab === tab.key
                ? "bg-[#1E3A8A] text-white"
                : "bg-gray-100 text-black/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="px-5 mt-5">
          {/* Earnings */}
          <div className="bg-[#4CAF50]/5 rounded-[16px] p-4 border border-[#4CAF50]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-inter text-black/40">
                  This Month's Earnings
                </p>
                <p className="text-[28px] font-inter font-bold text-[#4CAF50]">
                  ৳{stats.thisMonthEarnings.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                <DollarSign size={24} className="text-[#4CAF50]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={14} className="text-[#4CAF50]" />
              <span className="text-[12px] font-inter text-[#4CAF50]">
                +18% from last month
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-50 rounded-xl p-3.5">
              <Users size={18} className="text-[#1E3A8A] mb-1.5" />
              <p className="text-[18px] font-inter font-bold text-black">
                {stats.totalClients}
              </p>
              <p className="text-[10px] font-inter text-black/40">
                Total Clients
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5">
              <CheckCircle size={18} className="text-[#4CAF50] mb-1.5" />
              <p className="text-[18px] font-inter font-bold text-black">
                {stats.completedSessions}
              </p>
              <p className="text-[10px] font-inter text-black/40">
                Sessions Done
              </p>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="mt-5">
            <p className="text-[14px] font-inter font-bold text-black mb-3">
              Pending Requests
            </p>
            <div className="flex flex-col gap-2">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl p-3.5 border border-black/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                        <span className="text-[12px] font-inter font-bold text-[#1E3A8A]">
                          {req.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-[13px] font-inter font-medium text-black">
                          {req.name}
                        </p>
                        <p className="text-[11px] font-inter text-black/40">
                          {req.topic} · {req.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-inter font-semibold px-2 py-0.5 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full">
                      {req.plan}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <button className="flex-1 py-1.5 bg-[#1E3A8A] rounded-lg text-white text-[11px] font-inter font-semibold flex items-center justify-center gap-1">
                      <CheckCircle size={12} /> Accept
                    </button>
                    <button className="flex-1 py-1.5 bg-[#E6484E]/10 rounded-lg text-[#E6484E] text-[11px] font-inter font-semibold flex items-center justify-center gap-1">
                      <XCircle size={12} /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Clients */}
      {activeTab === "clients" && (
        <div className="px-5 mt-5">
          <div className="flex flex-col gap-3">
            {recentClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-[16px] p-4 border border-black/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                    <span className="text-[14px] font-inter font-bold text-[#1E3A8A]">
                      {client.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-inter font-bold text-black">
                      {client.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-inter text-black/40">
                        {client.sessions} sessions
                      </span>
                      <span className="text-black/15 text-[10px]">|</span>
                      <span className="text-[11px] font-inter text-black/40">
                        Last: {client.lastSession}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: client.satisfaction }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className="text-[#FFDD36]"
                        fill="#FFDD36"
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/consultant-clients")}
                  className="w-full mt-3 py-2 bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 active:scale-95 transition-all rounded-lg text-[12px] font-inter font-medium text-[#1E3A8A]"
                >
                  View Client History & Budget
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule */}
      {activeTab === "schedule" && (
        <div className="px-5 mt-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-[#1E3A8A]" />
            <p className="text-[14px] font-inter font-bold text-black">
              Today's Schedule
            </p>
          </div>

          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-black/10" />

            <div className="flex flex-col gap-4">
              {schedule.map((item) => (
                <div key={item.id} className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[-18px] top-3 w-3 h-3 rounded-full border-2 border-white ${
                      item.status === "completed"
                        ? "bg-[#4CAF50]"
                        : "bg-[#1E3A8A]"
                    }`}
                  />

                  <div
                    className={`bg-white rounded-xl p-3.5 border ${
                      item.status === "completed"
                        ? "border-[#4CAF50]/20 bg-[#4CAF50]/5"
                        : "border-[#1E3A8A]/20 bg-[#1E3A8A]/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-inter font-bold text-black">
                        {item.client}
                      </p>
                      <span
                        className={`text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full ${
                          item.status === "completed"
                            ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                            : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-black/30" />
                      <span className="text-[11px] font-inter text-black/40">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] font-inter text-black/50 mt-1">
                      Topic: {item.topic}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-8" />
    </div>
  );
}