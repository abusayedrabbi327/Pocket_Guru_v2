import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { sendOtp, verifyOtp } from "../lib/api";
import { Briefcase, Loader2, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";
import imgBg from "figma:asset/f62fd5700039ada9a47f33b07ed7f056022a434e.png";

export function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { switchRole, pendingLoginRole, updateConsultantProfile, consultantOwnProfile, loginWithRealAccount } = useAppContext();
  
  const stateData = (location.state as Record<string, any>) || {};
  const destination = stateData.destination || stateData.phone || stateData.email || "+880 1700-000000";
  const roleFromState = stateData.role || pendingLoginRole || "user";
  const nameFromState = stateData.name || "";
  const emailFromState = stateData.email || "";
  const phoneFromState = stateData.phone || "";
  const isConsultant = roleFromState === "consultant";

  const [otp, setOtp] = useState("");
  const [activeCode, setActiveCode] = useState<string>(stateData.otpCode || "123456");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendStatus, setResendStatus] = useState("");

  useEffect(() => {
    if (stateData.otpCode) {
      setActiveCode(stateData.otpCode);
    }
  }, [stateData.otpCode]);

  const handleVerify = async () => {
    if (!otp.trim()) {
      setErrorMsg("Please enter the 6-digit OTP code");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await verifyOtp(
        destination,
        otp.trim(),
        nameFromState,
        roleFromState,
        35000
      );

      // Successfully authenticated! Initialize real user account
      await loginWithRealAccount({
        id: res.user.id,
        name: res.user.name || nameFromState || "User",
        email: res.user.email || emailFromState,
        phone: res.user.phone || phoneFromState,
        role: (res.user.role as any) || roleFromState,
        salary: res.user.salary || 35000,
        subscription: (res.user.subscription as any) || "starter",
      });

      if (isConsultant) {
        switchRole("consultant");
        updateConsultantProfile({
          name: res.user.name || nameFromState || "Dr. Farid Hasan",
          email: res.user.email || emailFromState || "farid@pocketguru.com",
          phone: res.user.phone || phoneFromState || "+880 1700-000000",
        });

        if (consultantOwnProfile.isOnboarded) {
          navigate("/consultant-dashboard");
        } else {
          navigate("/consultant-setup");
        }
      } else {
        switchRole("user");
        navigate("/home");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid or expired OTP code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setErrorMsg("");
    setResendStatus("");
    try {
      const isPhone = !destination.includes("@");
      const res = await sendOtp(destination, isPhone ? "phone" : "email", nameFromState, roleFromState);
      if (res.code) {
        setActiveCode(res.code);
      }
      setResendStatus("New code sent!");
      setTimeout(() => setResendStatus(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Could not resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="h-full relative overflow-hidden bg-black flex flex-col">
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      {/* Back button */}
      <div className="relative z-20 pt-12 px-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center pt-4 px-6 overflow-y-auto pb-8">
        <motion.div
          className="w-[90px] h-[90px] flex items-center justify-center shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <img src={imgLogo} alt="PocketGuru" className="w-full h-full object-contain" />
        </motion.div>

        <motion.h1
          className="text-white text-[28px] font-inter font-bold mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Verification Code
        </motion.h1>

        <p className="text-white/60 text-[13px] font-inter text-center mt-1">
          Enter the 6-digit code sent to <br />
          <span className="text-[#FFDD36] font-semibold">{destination}</span>
        </p>

        {/* Live OTP Banner / Toast */}
        <motion.div
          className="w-full mt-4 bg-white/10 border border-[#FFDD36]/40 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-[#FFDD36] shrink-0" />
            <div>
              <p className="text-white text-[12px] font-inter font-semibold">
                Your Security OTP: <span className="text-[#FFDD36] tracking-[2px] font-mono text-[14px]">{activeCode}</span>
              </p>
              <p className="text-white/50 text-[10px] font-inter">
                Valid for 5 minutes • Tap below to autofill
              </p>
            </div>
          </div>
          <button
            onClick={() => setOtp(activeCode)}
            className="px-2.5 py-1 bg-[#FFDD36] rounded-lg text-black text-[11px] font-inter font-bold shrink-0 active:scale-95 transition-transform"
          >
            Auto-fill
          </button>
        </motion.div>

        {/* Role indicator */}
        {isConsultant && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-inter font-semibold bg-[#1E3A8A]/40 text-[#93C5FD] border border-[#1E3A8A]">
              <Briefcase size={11} />
              Consultant Verification
            </span>
          </div>
        )}

        <motion.div
          className="w-full mt-6 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder="• • • • • •"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            maxLength={6}
            className="w-full h-[52px] bg-[#FFDD36] rounded-2xl px-5 text-center text-black placeholder:text-black/30 font-inter font-bold text-[22px] tracking-[10px] outline-none shadow-md"
          />

          {errorMsg && (
            <p className="text-red-400 text-[12px] font-inter text-center bg-red-950/40 py-1.5 px-4 rounded-lg border border-red-800/40">
              {errorMsg}
            </p>
          )}

          {resendStatus && (
            <p className="text-[#4CAF50] text-[12px] font-inter text-center flex items-center gap-1">
              <CheckCircle2 size={13} />
              {resendStatus}
            </p>
          )}

          <div className="w-full flex items-center justify-between px-2 mt-1">
            <span className="text-white/40 text-[12px] font-inter">Didn't receive code?</span>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-[#FFDD36] text-[13px] font-inter font-medium underline flex items-center gap-1 disabled:opacity-50"
            >
              {isResending ? <RefreshCw size={12} className="animate-spin" /> : null}
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading || otp.length < 4}
            className={`mt-4 h-[44px] w-full max-w-[220px] rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-40 shadow-lg ${
              isConsultant ? "bg-[#1E3A8A]" : "bg-[#FFDD36]"
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className={`animate-spin ${isConsultant ? "text-white" : "text-black"}`} />
            ) : isConsultant ? (
              <Briefcase size={15} className="text-white" />
            ) : null}
            <span
              className={`font-inter font-semibold text-[15px] ${
                isConsultant ? "text-white" : "text-black"
              }`}
            >
              {isLoading ? "Verifying..." : isConsultant ? "Verify & Setup" : "Verify & Sign In"}
            </span>
          </button>

          <button
            onClick={() => {
              if (isConsultant) {
                switchRole("consultant");
                navigate("/consultant-dashboard");
              } else {
                switchRole("user");
                navigate("/home");
              }
            }}
            className="mt-2 text-white/60 hover:text-white text-[12px] font-inter underline"
          >
            Skip OTP & Continue Directly
          </button>
        </motion.div>
      </div>
    </div>
  );
}