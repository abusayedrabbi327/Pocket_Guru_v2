import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Clock,
  Shield,
  Award,
  Bot,
  Sparkles,
  Lock,
  Crown,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ConsultantProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { consultants, user, canAccessConsultant, startChatSession } =
    useAppContext();

  const consultant = consultants.find((c) => c.id === id);

  if (!consultant) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <p className="text-black/40 font-inter">Consultant not found</p>
      </div>
    );
  }

  const hasAccess = canAccessConsultant(consultant);

  const handleStartChat = () => {
    if (!user.subscription) {
      navigate("/subscription");
      return;
    }
    if (!hasAccess && !consultant.isAI) {
      navigate("/subscription");
      return;
    }
    const sessionId = startChatSession(consultant.id);
    if (sessionId) {
      navigate(`/chat/${sessionId}`);
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-[#4CAF50]";
      case "busy":
        return "text-[#FF9800]";
      default:
        return "text-black/30";
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Tanvir H.",
      rating: 5,
      text: "Excellent advice on budgeting! Helped me save 30% more each month.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Mira S.",
      rating: 5,
      text: "Very knowledgeable and patient. Explained everything clearly.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Karim R.",
      rating: 4,
      text: "Great session, practical tips that I could implement right away.",
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="relative">
        <div
          className={`h-[200px] ${
            consultant.isAI
              ? "bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#1E3A8A]"
              : "bg-gradient-to-br from-[#1E3A8A] to-[#0F172A]"
          } relative overflow-hidden`}
        >
          {consultant.isAI && (
            <>
              <div className="absolute top-[20px] right-[20px] w-[120px] h-[120px] rounded-full bg-[#FFDD36]/10 animate-pulse" />
              <div className="absolute bottom-[10px] left-[30px] w-[80px] h-[80px] rounded-full bg-[#FFDD36]/5" />
              <div className="absolute top-[60px] left-[50%] w-[60px] h-[60px] rounded-full bg-[#4CAF50]/10" />
            </>
          )}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-14 left-5 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        </div>

        {/* Avatar */}
        <div className="absolute bottom-0 translate-y-1/2 left-5">
          <div className="w-[90px] h-[90px] rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center">
            {consultant.isAI ? (
              <Sparkles size={36} className="text-[#FFDD36]" />
            ) : consultant.avatar ? (
              <ImageWithFallback
                src={consultant.avatar}
                alt={consultant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-[32px] font-inter font-bold">
                {consultant.name[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-14 px-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[22px] font-inter font-bold text-black">
                {consultant.name}
              </h2>
              {consultant.isAI && (
                <div className="bg-[#FFDD36]/20 px-2 py-0.5 rounded-full">
                  <span className="text-[10px] font-inter font-semibold text-[#1E3A8A]">
                    AI
                  </span>
                </div>
              )}
            </div>
            <p className="text-[14px] font-inter text-[#1E3A8A] font-medium mt-0.5">
              {consultant.specialty}
            </p>
          </div>
          {!consultant.isAI && (
            <div className="flex items-center gap-1">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  consultant.availability === "available"
                    ? "bg-[#4CAF50]"
                    : consultant.availability === "busy"
                    ? "bg-[#FF9800]"
                    : "bg-gray-400"
                }`}
              />
              <span
                className={`text-[12px] font-inter font-medium ${getAvailabilityColor(
                  consultant.availability
                )}`}
              >
                {consultant.availability === "available"
                  ? "Available"
                  : consultant.availability === "busy"
                  ? "In Session"
                  : "Offline"}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star size={14} className="text-[#FFDD36]" fill="#FFDD36" />
            </div>
            <p className="text-[18px] font-inter font-bold text-black">
              {consultant.rating}
            </p>
            <p className="text-[10px] font-inter text-black/40">Rating</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageCircle size={14} className="text-[#1E3A8A]" />
            </div>
            <p className="text-[18px] font-inter font-bold text-black">
              {consultant.reviewCount}
            </p>
            <p className="text-[10px] font-inter text-black/40">
              {consultant.isAI ? "Chats" : "Reviews"}
            </p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {consultant.isAI ? (
                <Clock size={14} className="text-[#4CAF50]" />
              ) : (
                <Award size={14} className="text-[#4CAF50]" />
              )}
            </div>
            <p className="text-[18px] font-inter font-bold text-black">
              {consultant.isAI ? "24/7" : `${consultant.experience}y`}
            </p>
            <p className="text-[10px] font-inter text-black/40">
              {consultant.isAI ? "Available" : "Experience"}
            </p>
          </div>
          {!consultant.isAI && (
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield size={14} className="text-[#E6484E]" />
              </div>
              <p className="text-[18px] font-inter font-bold text-black">
                ৳{consultant.hourlyRate}
              </p>
              <p className="text-[10px] font-inter text-black/40">/session</p>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mt-5">
          <p className="text-[14px] font-inter font-bold text-black mb-2">
            About
          </p>
          <p className="text-[13px] font-inter text-black/60 leading-relaxed">
            {consultant.bio}
          </p>
        </div>

        {/* Certifications */}
        <div className="mt-5">
          <p className="text-[14px] font-inter font-bold text-black mb-2">
            {consultant.isAI ? "Capabilities" : "Certifications"}
          </p>
          <div className="flex flex-wrap gap-2">
            {consultant.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#1E3A8A]/5 rounded-xl"
              >
                <CheckCircle2 size={14} className="text-[#1E3A8A]" />
                <span className="text-[12px] font-inter font-medium text-[#1E3A8A]">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What they help with */}
        {consultant.isAI && (
          <div className="mt-5">
            <p className="text-[14px] font-inter font-bold text-black mb-2">
              I Can Help With
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Analyzing your spending patterns",
                "Creating personalized budgets",
                "Savings goal optimization",
                "Expense reduction tips",
                "Financial health checkup",
                "Debt repayment strategies",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFDD36]" />
                  <span className="text-[13px] font-inter text-black/60">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-5">
          <p className="text-[14px] font-inter font-bold text-black mb-3">
            Recent Reviews
          </p>
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-xl p-3.5"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[13px] font-inter font-semibold text-black">
                    {review.name}
                  </p>
                  <span className="text-[11px] font-inter text-black/30">
                    {review.date}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className="text-[#FFDD36]"
                      fill="#FFDD36"
                    />
                  ))}
                </div>
                <p className="text-[12px] font-inter text-black/50">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 z-40">
        <motion.button
          onClick={handleStartChat}
          className={`w-full h-[52px] rounded-2xl flex items-center justify-center gap-2 shadow-lg ${
            consultant.isAI
              ? "bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]"
              : !user.subscription || !hasAccess
              ? "bg-gradient-to-r from-[#FFDD36] to-[#FFB800]"
              : consultant.availability === "offline"
              ? "bg-gray-300"
              : "bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]"
          }`}
          whileTap={{ scale: 0.97 }}
          disabled={
            !consultant.isAI &&
            consultant.availability === "offline" &&
            user.subscription !== null
          }
        >
          {consultant.isAI ? (
            <>
              <Bot size={20} className="text-[#FFDD36]" />
              <span className="text-white text-[15px] font-inter font-bold">
                Chat with AI Advisor
              </span>
            </>
          ) : !user.subscription ? (
            <>
              <Crown size={18} className="text-[#1E3A8A]" />
              <span className="text-[#1E3A8A] text-[15px] font-inter font-bold">
                Subscribe to Chat
              </span>
            </>
          ) : !hasAccess ? (
            <>
              <Lock size={18} className="text-[#1E3A8A]" />
              <span className="text-[#1E3A8A] text-[15px] font-inter font-bold">
                Upgrade Plan
              </span>
            </>
          ) : consultant.availability === "offline" ? (
            <span className="text-white/60 text-[15px] font-inter font-bold">
              Currently Offline
            </span>
          ) : (
            <>
              <MessageCircle size={18} className="text-white" />
              <span className="text-white text-[15px] font-inter font-bold">
                Start Consultation
              </span>
            </>
          )}
        </motion.button>
      </div>

      <div className="h-20" />
    </div>
  );
}
