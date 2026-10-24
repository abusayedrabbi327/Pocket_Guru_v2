import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import {
  Search,
  Star,
  Bot,
  Crown,
  Filter,
  MessageCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Lock,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type FilterType = "all" | "ai" | "human";

export function ConsultantsPage() {
  const navigate = useNavigate();
  const { consultants, user, chatSessions } = useAppContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = consultants.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "ai" && c.isAI) ||
      (filter === "human" && !c.isAI);
    return matchesSearch && matchesFilter;
  });

  const aiConsultant = consultants.find((c) => c.isAI);
  const humanConsultants = filtered.filter((c) => !c.isAI);
  const hasSubscription = user.subscription !== null;

  const activeSessions = chatSessions.filter((s) => s.status === "active");

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#4CAF50]";
      case "busy":
        return "bg-[#FF9800]";
      default:
        return "bg-gray-400";
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "busy":
        return "In Session";
      default:
        return "Offline";
    }
  };

  return (
    <div className="h-full bg-slate-50 md:bg-transparent overflow-y-auto pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-2 md:py-6">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="pt-10 px-2 pb-2 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[26px] font-inter font-bold text-[#1E3A8A]">
                Advisors & Experts
              </h1>
              <p className="text-[13px] font-inter text-slate-500 mt-0.5">
              Expert financial guidance
            </p>
          </div>
          <button
            onClick={() => navigate("/subscription")}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
              hasSubscription
                ? "bg-[#4CAF50]/10"
                : "bg-[#FFDD36]/20"
            }`}
          >
            <Crown
              size={14}
              className={hasSubscription ? "text-[#4CAF50]" : "text-[#FFDD36]"}
            />
            <span
              className={`text-[11px] font-inter font-semibold ${
                hasSubscription ? "text-[#4CAF50]" : "text-black/60"
              }`}
            >
              {hasSubscription
                ? user.subscription!.charAt(0).toUpperCase() +
                  user.subscription!.slice(1)
                : "Subscribe"}
            </span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mt-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30"
          />
          <input
            type="text"
            placeholder="Search consultants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[44px] pl-10 pr-4 bg-gray-50 rounded-xl text-[14px] font-inter outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 border border-black/5"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-5 mt-3 flex gap-2">
        {(["all", "ai", "human"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-[12px] font-inter font-medium transition-all ${
              filter === f
                ? "bg-[#1E3A8A] text-white"
                : "bg-gray-100 text-black/50"
            }`}
          >
            {f === "all" ? "All" : f === "ai" ? "AI Advisor" : "Human Experts"}
          </button>
        ))}
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div className="px-5 mt-5">
          <p className="text-[14px] font-inter font-bold text-black/40 mb-2 uppercase tracking-wider">
            Active Chats
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
            {activeSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => navigate(`/chat/${session.id}`)}
                className="flex flex-col items-center gap-1.5 min-w-[70px] shrink-0"
              >
                <div className="relative">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center">
                    {session.isAI ? (
                      <Bot size={22} className="text-[#FFDD36]" />
                    ) : session.consultantAvatar ? (
                      <ImageWithFallback
                        src={session.consultantAvatar}
                        alt={session.consultantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-[18px] font-inter font-bold">
                        {session.consultantName[0]}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#4CAF50] rounded-full border-2 border-white" />
                </div>
                <span className="text-[10px] font-inter font-medium text-black/60 text-center w-full truncate">
                  {session.consultantName.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Consultant - Featured */}
      {(filter === "all" || filter === "ai") && aiConsultant && (
        <div className="px-5 mt-5">
          <p className="text-[14px] font-inter font-bold text-black/40 mb-2 uppercase tracking-wider">
            AI Advisor
          </p>
          <motion.button
            onClick={() => navigate(`/consultant/${aiConsultant.id}`)}
            className="w-full bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[20px] p-5 text-left relative overflow-hidden"
            whileTap={{ scale: 0.98 }}
          >
            {/* Decorative circles */}
            <div className="absolute top-[-30px] right-[-30px] w-[100px] h-[100px] rounded-full bg-[#FFDD36]/10" />
            <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full bg-[#FFDD36]/5" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-[56px] h-[56px] rounded-2xl bg-[#FFDD36]/20 flex items-center justify-center shrink-0">
                <Sparkles size={26} className="text-[#FFDD36]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white text-[18px] font-inter font-bold">
                    {aiConsultant.name}
                  </p>
                  <div className="bg-[#FFDD36]/20 px-2 py-0.5 rounded-full">
                    <span className="text-[10px] font-inter font-semibold text-[#FFDD36]">
                      AI
                    </span>
                  </div>
                </div>
                <p className="text-white/50 text-[12px] font-inter mt-0.5">
                  {aiConsultant.specialty}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#FFDD36]" fill="#FFDD36" />
                    <span className="text-white/70 text-[12px] font-inter">
                      {aiConsultant.rating}
                    </span>
                  </div>
                  <span className="text-white/30 text-[10px]">|</span>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={12} className="text-white/40" />
                    <span className="text-white/70 text-[12px] font-inter">
                      {aiConsultant.reviewCount.toLocaleString()} chats
                    </span>
                  </div>
                  <span className="text-white/30 text-[10px]">|</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-[#4CAF50]" />
                    <span className="text-[#4CAF50] text-[12px] font-inter font-medium">
                      24/7
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/30 mt-3" />
            </div>

            <div className="mt-4 bg-white/10 rounded-xl px-3 py-2.5 flex items-center justify-between relative z-10">
              <span className="text-white/70 text-[12px] font-inter">
                Instant budget analysis & advice
              </span>
              <span className="text-[#FFDD36] text-[12px] font-inter font-bold">
                FREE
              </span>
            </div>
          </motion.button>
        </div>
      )}

      {/* Human Consultants */}
      {(filter === "all" || filter === "human") && (
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[14px] font-inter font-bold text-black/40 uppercase tracking-wider">
              Certified Experts
            </p>
            <span className="text-[12px] font-inter text-black/30">
              {humanConsultants.length} available
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {humanConsultants.map((consultant, index) => (
              <motion.button
                key={consultant.id}
                onClick={() => navigate(`/consultant/${consultant.id}`)}
                className="w-full bg-white rounded-[16px] p-4 shadow-sm border border-black/5 text-left active:scale-[0.98] transition-transform"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="w-[50px] h-[50px] rounded-2xl overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={consultant.avatar}
                        alt={consultant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${getAvailabilityColor(
                        consultant.availability
                      )}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-inter font-bold text-black truncate">
                        {consultant.name}
                      </p>
                      {!hasSubscription && (
                        <Lock size={12} className="text-black/20 shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] font-inter text-[#1E3A8A] font-medium">
                      {consultant.specialty}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star
                          size={11}
                          className="text-[#FFDD36]"
                          fill="#FFDD36"
                        />
                        <span className="text-[11px] font-inter text-black/50">
                          {consultant.rating}
                        </span>
                      </div>
                      <span className="text-black/15 text-[10px]">|</span>
                      <span className="text-[11px] font-inter text-black/40">
                        {consultant.reviewCount} reviews
                      </span>
                      <span className="text-black/15 text-[10px]">|</span>
                      <span
                        className={`text-[11px] font-inter font-medium ${
                          consultant.availability === "available"
                            ? "text-[#4CAF50]"
                            : consultant.availability === "busy"
                            ? "text-[#FF9800]"
                            : "text-black/30"
                        }`}
                      >
                        {getAvailabilityText(consultant.availability)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <p className="text-[14px] font-inter font-bold text-[#1E3A8A]">
                      ৳{consultant.hourlyRate}
                    </p>
                    <span className="text-[10px] font-inter text-black/30">
                      /session
                    </span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {consultant.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-0.5 bg-[#1E3A8A]/5 rounded-md text-[10px] font-inter font-medium text-[#1E3A8A]"
                    >
                      {cert}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-black/5 rounded-md text-[10px] font-inter text-black/40">
                    {consultant.experience}y exp
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* No subscription banner */}
      {!hasSubscription && (
        <motion.div
          className="mx-5 mt-5 bg-gradient-to-r from-[#FFDD36]/20 to-[#FFDD36]/5 rounded-[16px] p-4 border border-[#FFDD36]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFDD36]/30 flex items-center justify-center shrink-0">
              <Crown size={20} className="text-[#1E3A8A]" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-inter font-bold text-black">
                Unlock Expert Advice
              </p>
              <p className="text-[12px] font-inter text-black/50 mt-0.5">
                Subscribe to consult with certified financial experts based on
                your salary range
              </p>
              <button
                onClick={() => navigate("/subscription")}
                className="mt-2 px-4 py-2 bg-[#1E3A8A] rounded-xl text-white text-[12px] font-inter font-semibold"
              >
                View Plans
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="h-8" />
      </div>
    </div>
  );
}
