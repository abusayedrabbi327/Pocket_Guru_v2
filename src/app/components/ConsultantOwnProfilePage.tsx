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
  Edit3,
  Award,
  Globe,
  GraduationCap,
  Clock,
  DollarSign,
  Settings,
  Eye,
  TrendingUp,
} from "lucide-react";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";

export function ConsultantOwnProfilePage() {
  const navigate = useNavigate();
  const { user, consultantOwnProfile, updateProfile, logout, switchRole } = useAppContext();

  const handleLogout = () => {
    switchRole("user");
    logout();
    navigate("/");
  };

  const handleSwitchToUser = () => {
    switchRole("user");
    navigate("/home");
  };

  const profile = consultantOwnProfile;

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] pt-14 px-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white/10 px-3 py-1 rounded-full">
            <span className="text-white/60 text-[11px] font-inter">
              Consultant Profile
            </span>
          </div>
          <button
            onClick={() => navigate("/consultant-setup")}
            className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center"
          >
            <Edit3 size={16} className="text-white" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-3 border-[#FFDD36]/40 shrink-0">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#FFDD36] flex items-center justify-center">
                <User size={28} className="text-black" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-white text-[18px] font-inter font-bold">
              {profile.name || user.name}
            </p>
            <p className="text-[#FFDD36] text-[12px] font-inter font-medium">
              {profile.specialty || "Financial Consultant"}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <Star size={11} className="text-[#FFDD36]" fill="#FFDD36" />
                <span className="text-white/60 text-[11px] font-inter">
                  4.8
                </span>
              </div>
              <span className="text-white/15">|</span>
              <div className="flex items-center gap-1">
                <Clock size={11} className="text-white/40" />
                <span className="text-white/60 text-[11px] font-inter">
                  {profile.experience}yr exp
                </span>
              </div>
              <span className="text-white/15">|</span>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                  profile.availability === "available"
                    ? "bg-[#4CAF50]/20"
                    : profile.availability === "busy"
                    ? "bg-[#F59E0B]/20"
                    : "bg-[#EF4444]/20"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    profile.availability === "available"
                      ? "bg-[#4CAF50]"
                      : profile.availability === "busy"
                      ? "bg-[#F59E0B]"
                      : "bg-[#EF4444]"
                  }`}
                />
                <span
                  className={`text-[9px] font-inter font-semibold capitalize ${
                    profile.availability === "available"
                      ? "text-[#4CAF50]"
                      : profile.availability === "busy"
                      ? "text-[#F59E0B]"
                      : "text-[#EF4444]"
                  }`}
                >
                  {profile.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-[18px] font-inter font-bold">47</p>
            <p className="text-white/30 text-[9px] font-inter">Clients</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-[18px] font-inter font-bold">234</p>
            <p className="text-white/30 text-[9px] font-inter">Sessions</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-[#4CAF50] text-[18px] font-inter font-bold">
              ৳{(profile.hourlyRate || 500).toLocaleString()}
            </p>
            <p className="text-white/30 text-[9px] font-inter">Rate/hr</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-5 mt-5">
        {/* Bio */}
        {profile.bio && (
          <div className="bg-gray-50 rounded-[16px] p-4 mb-4">
            <p className="text-[12px] font-inter font-bold text-black/40 mb-1.5">
              About Me
            </p>
            <p className="text-[13px] font-inter text-black/70 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <div className="bg-gray-50 rounded-[16px] p-4 mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Award size={14} className="text-[#1E3A8A]" />
              <p className="text-[12px] font-inter font-bold text-black/40">
                Certifications
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.certifications.map((cert) => (
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

        {/* Languages & Education row */}
        <div className="flex gap-3 mb-4">
          {profile.languages.length > 0 && (
            <div className="flex-1 bg-gray-50 rounded-[16px] p-3">
              <div className="flex items-center gap-1 mb-1.5">
                <Globe size={12} className="text-[#1E3A8A]" />
                <p className="text-[10px] font-inter font-bold text-black/40">
                  Languages
                </p>
              </div>
              <p className="text-[11px] font-inter text-black/60">
                {profile.languages.join(", ")}
              </p>
            </div>
          )}
          {profile.education && (
            <div className="flex-1 bg-gray-50 rounded-[16px] p-3">
              <div className="flex items-center gap-1 mb-1.5">
                <GraduationCap size={12} className="text-[#1E3A8A]" />
                <p className="text-[10px] font-inter font-bold text-black/40">
                  Education
                </p>
              </div>
              <p className="text-[11px] font-inter text-black/60">
                {profile.education}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Switch to User Mode */}
      <div className="px-5 mt-2">
        <button
          onClick={handleSwitchToUser}
          className="w-full bg-gradient-to-r from-[#FFDD36]/20 to-[#FFDD36]/5 rounded-[16px] p-4 border border-[#FFDD36]/30 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFDD36]/30 flex items-center justify-center shrink-0">
            <User size={20} className="text-[#1E3A8A]" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-inter font-bold text-black">
              Switch to User Mode
            </p>
            <p className="text-[11px] font-inter text-black/40">
              View the app as a regular user (demo)
            </p>
          </div>
          <ChevronRight size={16} className="text-black/20" />
        </button>
      </div>

      {/* Settings */}
      <div className="px-5 mt-5">
        <p className="text-[14px] font-inter font-bold text-black/40 mb-3 uppercase tracking-wider">
          Settings
        </p>
        <div className="bg-white rounded-[16px] shadow-sm border border-black/5 overflow-hidden">
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

          <button className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 w-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center">
                <Eye size={18} className="text-[#1E3A8A]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Profile Visibility
              </span>
            </div>
            <ChevronRight size={18} className="text-black/20" />
          </button>

          <button className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 w-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFDD36]/20 flex items-center justify-center">
                <DollarSign size={18} className="text-[#B8860B]" />
              </div>
              <span className="text-[14px] font-inter font-medium text-black">
                Payment Settings
              </span>
            </div>
            <ChevronRight size={18} className="text-black/20" />
          </button>

          <button className="flex items-center justify-between px-4 py-3.5 w-full">
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
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 mt-5">
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
        <img
          src={imgLogo}
          alt="PocketGuru"
          className="w-[40px] h-auto object-contain opacity-30"
        />
        <p className="text-[10px] text-black/20 font-inter mt-1">
          PocketGuru Consultant v2.0.0
        </p>
      </div>
    </div>
  );
}