import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext, subscriptionPlans } from "../context/AppContext";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Crown,
  Sparkles,
  Bot,
  MessageCircle,
  Star,
  Zap,
  Shield,
} from "lucide-react";

export function SubscriptionPage() {
  const navigate = useNavigate();
  const { user, subscribe, setSalary, getRecommendedPlan } = useAppContext();
  const [salaryInput, setSalaryInput] = useState(user.salary.toString());
  const [showSalaryInput, setShowSalaryInput] = useState(!user.subscription);
  const [selectedTier, setSelectedTier] = useState(
    user.subscription || getRecommendedPlan().tier
  );

  const recommended = getRecommendedPlan();

  const handleSalarySubmit = () => {
    const salary = parseInt(salaryInput) || 0;
    setSalary(salary);
    setShowSalaryInput(false);
    // Auto-select recommended plan
    const plan = subscriptionPlans.find(
      (p) => salary >= p.salaryMin && salary <= p.salaryMax
    );
    if (plan) setSelectedTier(plan.tier);
  };

  const handleSubscribe = () => {
    subscribe(selectedTier);
    navigate(-1);
  };

  const tierIcons: Record<string, typeof Crown> = {
    starter: Zap,
    basic: Shield,
    premium: Star,
    elite: Crown,
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] pt-14 pb-8 px-5 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full bg-[#FFDD36]/10" />
        <div className="absolute bottom-[-20px] left-[20px] w-[80px] h-[80px] rounded-full bg-[#FFDD36]/5" />

        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 relative z-10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={24} className="text-[#FFDD36]" />
            <h1 className="text-[28px] font-inter font-bold text-white">
              Pro Plans
            </h1>
          </div>
          <p className="text-white/50 text-[14px] font-inter">
            Unlock expert financial advice tailored to your salary
          </p>
        </div>

        {/* Current plan badge */}
        {user.subscription && (
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 flex items-center justify-between relative z-10">
            <div>
              <p className="text-white/60 text-[11px] font-inter">
                Current Plan
              </p>
              <p className="text-white text-[18px] font-inter font-bold capitalize">
                {user.subscription}
              </p>
            </div>
            <div className="bg-[#4CAF50] px-3 py-1 rounded-full">
              <span className="text-white text-[11px] font-inter font-semibold">
                Active
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Salary input section */}
      {showSalaryInput && (
        <motion.div
          className="mx-5 mt-5 bg-[#FFDD36]/10 rounded-[16px] p-5 border border-[#FFDD36]/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-[#1E3A8A]" />
            <p className="text-[15px] font-inter font-bold text-black">
              Get Your Recommended Plan
            </p>
          </div>
          <p className="text-[12px] font-inter text-black/50 mb-3">
            Enter your monthly salary and we'll recommend the best plan for you
          </p>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-inter text-black/30">
                ৳
              </span>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="Monthly salary"
                className="w-full h-[44px] pl-7 pr-4 bg-white rounded-xl text-[14px] font-inter outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 border border-black/10"
              />
            </div>
            <button
              onClick={handleSalarySubmit}
              className="px-5 h-[44px] bg-[#1E3A8A] rounded-xl text-white text-[13px] font-inter font-semibold"
            >
              Find Plan
            </button>
          </div>
        </motion.div>
      )}

      {/* Update salary link if already set */}
      {!showSalaryInput && (
        <div className="px-5 mt-4 flex items-center justify-between">
          <p className="text-[12px] font-inter text-black/40">
            Salary: ৳{user.salary.toLocaleString()}/month
          </p>
          <button
            onClick={() => setShowSalaryInput(true)}
            className="text-[12px] font-inter font-medium text-[#1E3A8A]"
          >
            Update
          </button>
        </div>
      )}

      {/* Plans */}
      <div className="px-5 mt-4">
        <p className="text-[14px] font-inter font-bold text-black/40 mb-3 uppercase tracking-wider">
          Choose Your Plan
        </p>

        <div className="flex flex-col gap-3">
          {subscriptionPlans.map((plan, index) => {
            const isSelected = selectedTier === plan.tier;
            const isRecommended = recommended.tier === plan.tier;
            const isCurrent = user.subscription === plan.tier;
            const TierIcon = tierIcons[plan.tier] || Crown;

            return (
              <motion.button
                key={plan.tier}
                onClick={() => setSelectedTier(plan.tier)}
                className={`w-full rounded-[16px] p-4 text-left transition-all border-2 ${
                  isSelected
                    ? "border-[#1E3A8A] bg-[#1E3A8A]/5 shadow-md"
                    : "border-black/5 bg-white"
                } ${isRecommended ? "relative" : ""}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {isRecommended && !isCurrent && (
                  <div className="absolute -top-2.5 right-4 bg-[#E6484E] px-2.5 py-0.5 rounded-full">
                    <span className="text-white text-[10px] font-inter font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-2.5 right-4 bg-[#4CAF50] px-2.5 py-0.5 rounded-full">
                    <span className="text-white text-[10px] font-inter font-bold">
                      CURRENT
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: plan.color + "15" }}
                    >
                      <TierIcon size={20} style={{ color: plan.color }} />
                    </div>
                    <div>
                      <p className="text-[16px] font-inter font-bold text-black">
                        {plan.name}
                      </p>
                      <p className="text-[11px] font-inter text-black/40">
                        {plan.salaryRange}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[20px] font-inter font-bold text-[#1E3A8A]">
                      ৳{plan.price}
                    </p>
                    <p className="text-[10px] font-inter text-black/30">
                      /month
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-3 flex flex-col gap-1.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check
                        size={14}
                        className={
                          isSelected ? "text-[#1E3A8A]" : "text-[#4CAF50]"
                        }
                      />
                      <span className="text-[12px] font-inter text-black/60">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chat limits */}
                <div className="mt-3 flex gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/5 rounded-lg">
                    <Bot size={12} className="text-[#1E3A8A]" />
                    <span className="text-[10px] font-inter font-medium text-black/50">
                      AI:{" "}
                      {plan.aiChats === "unlimited"
                        ? "Unlimited"
                        : `${plan.aiChats}/mo`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/5 rounded-lg">
                    <MessageCircle size={12} className="text-[#4CAF50]" />
                    <span className="text-[10px] font-inter font-medium text-black/50">
                      Human:{" "}
                      {plan.humanSessions === "unlimited"
                        ? "Unlimited"
                        : plan.humanSessions === 0
                        ? "None"
                        : `${plan.humanSessions}/mo`}
                    </span>
                  </div>
                </div>

                {/* Selection indicator */}
                <div className="absolute top-4 right-4">
                  {!isRecommended && !isCurrent && (
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-[#1E3A8A] bg-[#1E3A8A]"
                          : "border-black/15"
                      }`}
                    >
                      {isSelected && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Subscribe CTA */}
      <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 z-40">
        <motion.button
          onClick={handleSubscribe}
          className="w-full h-[52px] bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          whileTap={{ scale: 0.97 }}
        >
          <Crown size={18} className="text-[#FFDD36]" />
          <span className="text-white text-[15px] font-inter font-bold">
            {user.subscription === selectedTier
              ? "Current Plan"
              : user.subscription
              ? "Switch Plan"
              : "Subscribe Now"}
          </span>
          <span className="text-white/50 text-[13px] font-inter ml-1">
            ৳{subscriptionPlans.find((p) => p.tier === selectedTier)?.price}/mo
          </span>
        </motion.button>
      </div>

      <div className="h-8" />
    </div>
  );
}
