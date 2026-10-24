import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";
import type { ConsultantOwnProfile } from "../context/AppContext";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  DollarSign,
  Eye,
  Check,
  Camera,
  Plus,
  Star,
  Clock,
  Award,
  Globe,
  GraduationCap,
} from "lucide-react";

const SPECIALTIES = [
  "Budget Planning",
  "Investment Strategy",
  "Tax Planning",
  "Debt Management",
  "Savings & Retirement",
  "Insurance Planning",
  "Real Estate Finance",
  "Student Finance",
];

const CERTIFICATIONS = [
  "CFP",
  "CFA",
  "CPA",
  "ChFC",
  "AFC",
  "CDFA",
  "FRM",
  "CAIA",
  "EA",
  "RICP",
  "CFA Level II",
  "CFA Level III",
];

const LANGUAGES = [
  "English",
  "Bengali",
  "Hindi",
  "Urdu",
  "Arabic",
  "Mandarin",
];

type Step = 0 | 1 | 2 | 3;

const stepMeta = [
  { icon: User, label: "Personal", title: "Personal Info" },
  { icon: Briefcase, label: "Expertise", title: "Your Expertise" },
  { icon: DollarSign, label: "Pricing", title: "Rate & Availability" },
  { icon: Eye, label: "Preview", title: "Profile Preview" },
];

export function ConsultantSetupPage() {
  const navigate = useNavigate();
  const { consultantOwnProfile, updateConsultantProfile, user } = useAppContext();
  const [step, setStep] = useState<Step>(0);

  const [localProfile, setLocalProfile] = useState<ConsultantOwnProfile>({
    name: consultantOwnProfile.name || user.name || "",
    email: consultantOwnProfile.email || user.email || "",
    phone: consultantOwnProfile.phone || "",
    avatar: "https://images.unsplash.com/photo-1621533463370-837f20c6c889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb25zdWx0YW50JTIwaGVhZHNob3QlMjBuZXV0cmFsJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE2MDU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specialty: "",
    bio: "",
    certifications: [],
    experience: 0,
    hourlyRate: 500,
    availability: "available",
    languages: ["English", "Bengali"],
    education: "",
    isOnboarded: false,
  });

  const [newCert, setNewCert] = useState("");

  const updateLocal = (updates: Partial<ConsultantOwnProfile>) => {
    setLocalProfile((p) => ({ ...p, ...updates }));
  };

  const toggleCert = (cert: string) => {
    const certs = localProfile.certifications;
    if (certs.includes(cert)) {
      updateLocal({ certifications: certs.filter((c) => c !== cert) });
    } else {
      updateLocal({ certifications: [...certs, cert] });
    }
  };

  const toggleLang = (lang: string) => {
    const langs = localProfile.languages;
    if (langs.includes(lang)) {
      updateLocal({ languages: langs.filter((l) => l !== lang) });
    } else {
      updateLocal({ languages: [...langs, lang] });
    }
  };

  const handleComplete = () => {
    updateConsultantProfile({ ...localProfile, isOnboarded: true });
    navigate("/consultant-dashboard");
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return localProfile.name.length > 0 && localProfile.email.length > 0;
      case 1:
        return localProfile.specialty.length > 0 && localProfile.bio.length > 10;
      case 2:
        return localProfile.hourlyRate > 0;
      default:
        return true;
    }
  };

  const next = () => {
    if (step < 3) setStep((step + 1) as Step);
  };
  const prev = () => {
    if (step > 0) setStep((step - 1) as Step);
  };

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] pt-14 px-5 pb-5 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          {step > 0 ? (
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <div className="flex-1 text-center">
            <p className="text-white/40 text-[10px] font-inter uppercase tracking-wider">
              Consultant Setup
            </p>
            <p className="text-white text-[16px] font-inter font-bold mt-0.5">
              {stepMeta[step].title}
            </p>
          </div>
          <div className="w-10 text-center">
            <span className="text-white/30 text-[12px] font-inter font-medium">
              {step + 1}/4
            </span>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2">
          {stepMeta.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isDone
                      ? "bg-[#4CAF50]"
                      : isActive
                      ? "bg-[#FFDD36]"
                      : "bg-white/10"
                  }`}
                >
                  {isDone ? (
                    <Check
                      size={14}
                      className="text-white"
                      strokeWidth={3}
                    />
                  ) : (
                    <Icon
                      size={14}
                      className={isActive ? "text-black" : "text-white/30"}
                    />
                  )}
                </div>
                <span
                  className={`text-[9px] font-inter ${
                    isActive
                      ? "text-white font-semibold"
                      : isDone
                      ? "text-[#4CAF50] font-medium"
                      : "text-white/20 font-medium"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#FFDD36] rounded-full"
            animate={{ width: `${((step + 1) / 4) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <AnimatePresence mode="wait">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-4"
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#1E3A8A]/10">
                    {localProfile.avatar ? (
                      <img
                        src={localProfile.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1E3A8A]/10 flex items-center justify-center">
                        <User size={32} className="text-[#1E3A8A]/30" />
                      </div>
                    )}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1E3A8A] rounded-full flex items-center justify-center border-2 border-white">
                    <Camera size={14} className="text-white" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={localProfile.name}
                  onChange={(e) => updateLocal({ name: e.target.value })}
                  placeholder="e.g. Dr. Farid Hasan"
                  className="w-full h-[48px] bg-gray-50 rounded-xl px-4 text-[14px] font-inter text-black outline-none border border-black/5 focus:border-[#1E3A8A]/30 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-1.5 block">
                  Professional Email
                </label>
                <input
                  type="email"
                  value={localProfile.email}
                  onChange={(e) => updateLocal({ email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full h-[48px] bg-gray-50 rounded-xl px-4 text-[14px] font-inter text-black outline-none border border-black/5 focus:border-[#1E3A8A]/30 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-1.5 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={localProfile.phone}
                  onChange={(e) => updateLocal({ phone: e.target.value })}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full h-[48px] bg-gray-50 rounded-xl px-4 text-[14px] font-inter text-black outline-none border border-black/5 focus:border-[#1E3A8A]/30 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-1.5 block">
                  Education
                </label>
                <input
                  type="text"
                  value={localProfile.education}
                  onChange={(e) => updateLocal({ education: e.target.value })}
                  placeholder="e.g. MBA, Finance - University of Dhaka"
                  className="w-full h-[48px] bg-gray-50 rounded-xl px-4 text-[14px] font-inter text-black outline-none border border-black/5 focus:border-[#1E3A8A]/30 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-1.5 block">
                  Years of Experience
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={localProfile.experience}
                    onChange={(e) =>
                      updateLocal({ experience: parseInt(e.target.value) })
                    }
                    className="flex-1 accent-[#1E3A8A]"
                  />
                  <span className="text-[16px] font-inter font-bold text-[#1E3A8A] w-8 text-center">
                    {localProfile.experience}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1: Expertise */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-5"
            >
              {/* Specialty */}
              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-2 block">
                  Primary Specialty
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => updateLocal({ specialty: spec })}
                      className={`px-3.5 py-2 rounded-xl text-[12px] font-inter font-medium transition-all ${
                        localProfile.specialty === spec
                          ? "bg-[#1E3A8A] text-white shadow-sm"
                          : "bg-gray-50 text-black/50 border border-black/5"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-2 block">
                  Certifications (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {CERTIFICATIONS.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => toggleCert(cert)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-inter font-medium transition-all flex items-center gap-1 ${
                        localProfile.certifications.includes(cert)
                          ? "bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/30"
                          : "bg-gray-50 text-black/40 border border-black/5"
                      }`}
                    >
                      {localProfile.certifications.includes(cert) && (
                        <Check size={10} strokeWidth={3} />
                      )}
                      {cert}
                    </button>
                  ))}
                </div>
                {/* Add custom cert */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="Add custom certification..."
                    className="flex-1 h-[36px] bg-gray-50 rounded-lg px-3 text-[12px] font-inter outline-none border border-black/5"
                  />
                  <button
                    onClick={() => {
                      if (newCert.trim()) {
                        toggleCert(newCert.trim());
                        setNewCert("");
                      }
                    }}
                    className="w-9 h-9 bg-[#1E3A8A] rounded-lg flex items-center justify-center"
                  >
                    <Plus size={14} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-2 block">
                  Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => toggleLang(lang)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-inter font-medium transition-all flex items-center gap-1 ${
                        localProfile.languages.includes(lang)
                          ? "bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/30"
                          : "bg-gray-50 text-black/40 border border-black/5"
                      }`}
                    >
                      {localProfile.languages.includes(lang) && (
                        <Check size={10} strokeWidth={3} />
                      )}
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-1.5 block">
                  Professional Bio
                </label>
                <textarea
                  value={localProfile.bio}
                  onChange={(e) => updateLocal({ bio: e.target.value })}
                  placeholder="Tell clients about your experience, approach, and what makes you unique..."
                  rows={4}
                  className="w-full bg-gray-50 rounded-xl p-4 text-[13px] font-inter text-black outline-none border border-black/5 focus:border-[#1E3A8A]/30 transition-colors resize-none"
                />
                <p className="text-[10px] font-inter text-black/30 mt-1">
                  {localProfile.bio.length}/300 characters
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Rate & Availability */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-5"
            >
              {/* Hourly Rate */}
              <div className="bg-gradient-to-br from-[#1E3A8A]/5 to-[#1E3A8A]/10 rounded-[16px] p-5 border border-[#1E3A8A]/10">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={18} className="text-[#1E3A8A]" />
                  <span className="text-[13px] font-inter font-bold text-black">
                    Hourly Rate
                  </span>
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-[36px] font-inter font-bold text-[#1E3A8A]">
                    ৳{localProfile.hourlyRate}
                  </span>
                  <span className="text-[13px] font-inter text-black/30 mb-2">
                    /hour
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={localProfile.hourlyRate}
                  onChange={(e) =>
                    updateLocal({ hourlyRate: parseInt(e.target.value) })
                  }
                  className="w-full accent-[#1E3A8A]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] font-inter text-black/30">
                    ৳100
                  </span>
                  <span className="text-[10px] font-inter text-black/30">
                    ৳3,000
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  {[300, 500, 800, 1000].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => updateLocal({ hourlyRate: rate })}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-inter font-medium transition-all ${
                        localProfile.hourlyRate === rate
                          ? "bg-[#1E3A8A] text-white"
                          : "bg-white text-black/40 border border-black/10"
                      }`}
                    >
                      ৳{rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="text-[11px] font-inter font-semibold text-black/40 uppercase tracking-wider mb-2 block">
                  Default Availability
                </label>
                <div className="flex flex-col gap-2">
                  {(
                    [
                      {
                        val: "available",
                        label: "Available",
                        desc: "Ready to take new clients",
                        color: "#4CAF50",
                      },
                      {
                        val: "busy",
                        label: "Busy",
                        desc: "Currently at capacity, scheduled only",
                        color: "#F59E0B",
                      },
                      {
                        val: "offline",
                        label: "Offline",
                        desc: "Not accepting clients right now",
                        color: "#EF4444",
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => updateLocal({ availability: opt.val })}
                      className={`p-3.5 rounded-xl flex items-center gap-3 border transition-all ${
                        localProfile.availability === opt.val
                          ? "border-[#1E3A8A]/30 bg-[#1E3A8A]/5"
                          : "border-black/5 bg-gray-50"
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: opt.color }}
                      />
                      <div className="flex-1 text-left">
                        <p className="text-[13px] font-inter font-medium text-black">
                          {opt.label}
                        </p>
                        <p className="text-[10px] font-inter text-black/40">
                          {opt.desc}
                        </p>
                      </div>
                      {localProfile.availability === opt.val && (
                        <Check size={16} className="text-[#1E3A8A]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Earnings */}
              <div className="bg-[#FFDD36]/10 rounded-[16px] p-4 border border-[#FFDD36]/30">
                <p className="text-[11px] font-inter font-semibold text-black/40">
                  Estimated Monthly Earnings
                </p>
                <p className="text-[24px] font-inter font-bold text-[#1E3A8A] mt-1">
                  ৳
                  {(localProfile.hourlyRate * 20).toLocaleString()} —{" "}
                  ৳{(localProfile.hourlyRate * 60).toLocaleString()}
                </p>
                <p className="text-[10px] font-inter text-black/30 mt-1">
                  Based on 20-60 sessions/month at ৳
                  {localProfile.hourlyRate}/hr
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-4"
            >
              {/* Profile Card Preview */}
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[20px] p-5 text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-3 border-[#FFDD36]/50">
                  {localProfile.avatar ? (
                    <img
                      src={localProfile.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <User size={28} className="text-white/30" />
                    </div>
                  )}
                </div>
                <p className="text-white text-[18px] font-inter font-bold mt-3">
                  {localProfile.name || "Your Name"}
                </p>
                <p className="text-[#FFDD36] text-[12px] font-inter font-medium mt-0.5">
                  {localProfile.specialty || "Specialty"}
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#FFDD36]" fill="#FFDD36" />
                    <span className="text-white/60 text-[11px] font-inter">
                      New
                    </span>
                  </div>
                  <span className="text-white/20">|</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-white/40" />
                    <span className="text-white/60 text-[11px] font-inter">
                      {localProfile.experience}yr exp
                    </span>
                  </div>
                  <span className="text-white/20">|</span>
                  <span className="text-[#4CAF50] text-[11px] font-inter font-semibold">
                    ৳{localProfile.hourlyRate}/hr
                  </span>
                </div>
              </div>

              {/* Details Preview */}
              <div className="bg-gray-50 rounded-[16px] p-4">
                <p className="text-[12px] font-inter font-bold text-black/60 mb-2">
                  About
                </p>
                <p className="text-[13px] font-inter text-black/70 leading-relaxed">
                  {localProfile.bio || "No bio added yet"}
                </p>
              </div>

              {/* Certifications */}
              {localProfile.certifications.length > 0 && (
                <div className="bg-gray-50 rounded-[16px] p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Award size={14} className="text-[#1E3A8A]" />
                    <p className="text-[12px] font-inter font-bold text-black/60">
                      Certifications
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {localProfile.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2.5 py-1 bg-[#4CAF50]/10 text-[#4CAF50] rounded-lg text-[10px] font-inter font-semibold"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages & Education */}
              <div className="flex gap-3">
                {localProfile.languages.length > 0 && (
                  <div className="flex-1 bg-gray-50 rounded-[16px] p-3">
                    <div className="flex items-center gap-1 mb-1.5">
                      <Globe size={12} className="text-[#1E3A8A]" />
                      <p className="text-[10px] font-inter font-bold text-black/40">
                        Languages
                      </p>
                    </div>
                    <p className="text-[11px] font-inter text-black/60">
                      {localProfile.languages.join(", ")}
                    </p>
                  </div>
                )}
                {localProfile.education && (
                  <div className="flex-1 bg-gray-50 rounded-[16px] p-3">
                    <div className="flex items-center gap-1 mb-1.5">
                      <GraduationCap size={12} className="text-[#1E3A8A]" />
                      <p className="text-[10px] font-inter font-bold text-black/40">
                        Education
                      </p>
                    </div>
                    <p className="text-[11px] font-inter text-black/60">
                      {localProfile.education}
                    </p>
                  </div>
                )}
              </div>

              {/* Availability Status */}
              <div className="bg-gray-50 rounded-[16px] p-4 flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    localProfile.availability === "available"
                      ? "bg-[#4CAF50]"
                      : localProfile.availability === "busy"
                      ? "bg-[#F59E0B]"
                      : "bg-[#EF4444]"
                  }`}
                />
                <div>
                  <p className="text-[12px] font-inter font-bold text-black/60 capitalize">
                    {localProfile.availability}
                  </p>
                  <p className="text-[10px] font-inter text-black/30">
                    This will be shown to potential clients
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-black/5 px-5 py-4 pb-8 z-50">
        {step < 3 ? (
          <button
            onClick={next}
            disabled={!canProceed()}
            className={`w-full h-[48px] rounded-xl flex items-center justify-center gap-2 transition-all ${
              canProceed()
                ? "bg-[#1E3A8A] active:scale-[0.98]"
                : "bg-black/10"
            }`}
          >
            <span
              className={`text-[14px] font-inter font-semibold ${
                canProceed() ? "text-white" : "text-black/30"
              }`}
            >
              Continue
            </span>
            {canProceed() && (
              <ArrowRight size={16} className="text-white" />
            )}
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full h-[48px] bg-[#4CAF50] rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Check size={18} className="text-white" strokeWidth={3} />
            <span className="text-white text-[14px] font-inter font-bold">
              Complete Profile & Go Live
            </span>
          </button>
        )}
      </div>
    </div>
  );
}