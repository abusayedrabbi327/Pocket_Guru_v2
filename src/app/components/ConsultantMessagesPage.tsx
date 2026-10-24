import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { Search, MessageCircle, Check, CheckCheck, Clock } from "lucide-react";

const demoConversations = [
  {
    id: "conv-1",
    clientName: "Tanvir Hassan",
    clientAvatar: "T",
    plan: "Premium",
    lastMessage: "Thank you for the budget review! I'll follow the plan you suggested.",
    time: "10:45 AM",
    unread: 2,
    isOnline: true,
  },
  {
    id: "conv-2",
    clientName: "Mira Sen",
    clientAvatar: "M",
    plan: "Basic",
    lastMessage: "Can we schedule a call to discuss investment options?",
    time: "9:30 AM",
    unread: 1,
    isOnline: true,
  },
  {
    id: "conv-3",
    clientName: "Karim Ahmed",
    clientAvatar: "K",
    plan: "Elite",
    lastMessage: "You: I've prepared your debt repayment plan. Please review it.",
    time: "Yesterday",
    unread: 0,
    isOnline: false,
  },
  {
    id: "conv-4",
    clientName: "Nusrat Jahan",
    clientAvatar: "N",
    plan: "Premium",
    lastMessage: "You: Your monthly financial report is ready.",
    time: "Yesterday",
    unread: 0,
    isOnline: false,
  },
  {
    id: "conv-5",
    clientName: "Sabina Akhter",
    clientAvatar: "S",
    plan: "Starter",
    lastMessage: "Hi! I just signed up and would love some budget advice.",
    time: "2 days ago",
    unread: 1,
    isOnline: false,
  },
];

export function ConsultantMessagesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "unread">("all");

  const filtered = demoConversations.filter((c) => {
    if (tab === "unread" && c.unread === 0) return false;
    if (search && !c.clientName.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const totalUnread = demoConversations.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-14 px-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-inter font-bold text-black">
              Messages
            </h1>
            <p className="text-[12px] font-inter text-black/40 mt-0.5">
              {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mb-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[42px] bg-gray-50 rounded-xl pl-10 pr-4 text-[13px] font-inter outline-none border border-black/5"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4 flex gap-2">
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-1.5 rounded-full text-[12px] font-inter font-medium transition-all ${
            tab === "all"
              ? "bg-[#1E3A8A] text-white"
              : "bg-gray-100 text-black/40"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setTab("unread")}
          className={`px-4 py-1.5 rounded-full text-[12px] font-inter font-medium transition-all flex items-center gap-1.5 ${
            tab === "unread"
              ? "bg-[#1E3A8A] text-white"
              : "bg-gray-100 text-black/40"
          }`}
        >
          Unread
          {totalUnread > 0 && (
            <span
              className={`text-[9px] w-4 h-4 rounded-full flex items-center justify-center ${
                tab === "unread"
                  ? "bg-white/20 text-white"
                  : "bg-[#E6484E] text-white"
              }`}
            >
              {totalUnread}
            </span>
          )}
        </button>
      </div>

      {/* Conversations */}
      <div className="px-5 flex flex-col">
        {filtered.map((conv, i) => (
          <motion.button
            key={conv.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/chat/${conv.id}`)}
            className="flex items-center gap-3 py-3.5 border-b border-black/5 last:border-b-0 text-left active:bg-gray-50 transition-colors w-full cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                <span className="text-[16px] font-inter font-bold text-[#1E3A8A]">
                  {conv.clientAvatar}
                </span>
              </div>
              {conv.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#4CAF50] rounded-full border-2 border-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p
                  className={`text-[14px] font-inter truncate ${
                    conv.unread > 0
                      ? "font-bold text-black"
                      : "font-medium text-black/80"
                  }`}
                >
                  {conv.clientName}
                </p>
                <span
                  className={`text-[10px] font-inter shrink-0 ml-2 ${
                    conv.unread > 0
                      ? "text-[#1E3A8A] font-semibold"
                      : "text-black/30"
                  }`}
                >
                  {conv.time}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p
                  className={`text-[12px] font-inter truncate ${
                    conv.unread > 0 ? "text-black/60" : "text-black/35"
                  }`}
                >
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="ml-2 shrink-0 w-5 h-5 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white text-[9px] font-inter font-bold">
                    {conv.unread}
                  </span>
                )}
                {conv.unread === 0 &&
                  conv.lastMessage.startsWith("You:") && (
                    <CheckCheck
                      size={14}
                      className="text-[#4CAF50] shrink-0 ml-2"
                    />
                  )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-5">
          <MessageCircle size={32} className="text-black/10 mb-3" />
          <p className="text-[14px] font-inter font-bold text-black/30">
            No conversations
          </p>
          <p className="text-[12px] font-inter text-black/20 mt-1">
            {tab === "unread"
              ? "All caught up!"
              : "Start chatting with clients"}
          </p>
        </div>
      )}
    </div>
  );
}
