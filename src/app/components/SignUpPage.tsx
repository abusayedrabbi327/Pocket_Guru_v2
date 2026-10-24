import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { registerDirect } from "../lib/api";
import { User, Briefcase, Loader2 } from "lucide-react";
import type { LoginRole } from "../context/AppContext";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";
import imgBg from "figma:asset/4b05136efbfab92012613114c8ab5f66f9a29250.png";

export function SignUpPage() {
  const navigate = useNavigate();
  const { setPendingLoginRole, loginWithRealAccount, updateConsultantProfile } = useAppContext();
  const [selectedRole, setSelectedRole] = useState<LoginRole>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const update = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSignUp = async () => {
    const destination = form.phone.trim() || form.email.trim();
    if (!destination) {
      setErrorMsg("Please enter a mobile number or email");
      return;
    }

    if (form.password && form.confirm && form.password !== form.confirm) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      setPendingLoginRole(selectedRole);
      const res = await registerDirect(
        form.name || "User",
        form.email,
        form.phone,
        form.password,
        selectedRole,
        35000
      );

      await loginWithRealAccount({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.user.role as any,
        salary: res.user.salary,
        subscription: res.user.subscription as any,
      });

      if (selectedRole === "consultant") {
        updateConsultantProfile({
          name: res.user.name || "Dr. Farid Hasan",
          email: res.user.email || "consultant@pocketguru.com",
          phone: res.user.phone,
        });
        navigate("/consultant-setup");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const userFields = [
    { key: "name", placeholder: "Full Name", type: "text" },
    { key: "email", placeholder: "Email", type: "email" },
    { key: "phone", placeholder: "Mobile Number", type: "tel" },
    { key: "password", placeholder: "Password", type: "password" },
    { key: "confirm", placeholder: "Confirm Password", type: "password" },
  ];

  const consultantFields = [
    { key: "name", placeholder: "Full Name", type: "text" },
    { key: "email", placeholder: "Professional Email", type: "email" },
    { key: "phone", placeholder: "Mobile Number", type: "tel" },
    { key: "password", placeholder: "Password", type: "password" },
    { key: "confirm", placeholder: "Confirm Password", type: "password" },
  ];

  const fields = selectedRole === "consultant" ? consultantFields : userFields;

  return (
    <div className="h-full relative overflow-hidden bg-black">
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

      <div className="relative z-10 h-full flex flex-col items-center pt-[12%] px-8 overflow-y-auto">
        {/* Logo */}
        <motion.div
          className="w-[80px] h-[80px] flex items-center justify-center shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <img
            src={imgLogo}
            alt="PocketGuru"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.h1
          className="text-white text-[28px] font-inter font-bold mt-3 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sign up
        </motion.h1>

        {/* Role Toggle */}
        <motion.div
          className="w-full mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-1.5 flex gap-1.5 shrink-0"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setSelectedRole("user")}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              selectedRole === "user"
                ? "bg-[#FFDD36] shadow-lg"
                : "bg-transparent"
            }`}
          >
            <User
              size={15}
              className={
                selectedRole === "user" ? "text-black" : "text-white/50"
              }
            />
            <span
              className={`text-[12px] font-inter font-semibold ${
                selectedRole === "user" ? "text-black" : "text-white/50"
              }`}
            >
              User Account
            </span>
          </button>
          <button
            onClick={() => setSelectedRole("consultant")}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              selectedRole === "consultant"
                ? "bg-[#FFDD36] shadow-lg"
                : "bg-transparent"
            }`}
          >
            <Briefcase
              size={15}
              className={
                selectedRole === "consultant" ? "text-black" : "text-white/50"
              }
            />
            <span
              className={`text-[12px] font-inter font-semibold ${
                selectedRole === "consultant" ? "text-black" : "text-white/50"
              }`}
            >
              Consultant Account
            </span>
          </button>
        </motion.div>

        {/* Role badge */}
        <motion.div
          className="mt-2 shrink-0"
          key={selectedRole}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-inter font-semibold ${
              selectedRole === "consultant"
                ? "bg-[#1E3A8A]/30 text-[#93C5FD] border border-[#1E3A8A]/40"
                : "bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30"
            }`}
          >
            {selectedRole === "consultant" ? (
              <>
                <Briefcase size={10} />
                Apply as a financial expert
              </>
            ) : (
              <>
                <User size={10} />
                Personal finance management
              </>
            )}
          </span>
        </motion.div>

        {/* Form */}
        <motion.div
          className="w-full mt-5 flex flex-col gap-2.5 shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {fields.map((field) => (
            <input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={(form as Record<string, string>)[field.key]}
              onChange={(e) => update(field.key, e.target.value)}
              className="w-full h-[46px] bg-[#FFDD36]/90 rounded-2xl px-5 text-black placeholder:text-black/40 font-inter font-medium text-[14px] outline-none"
            />
          ))}

          {selectedRole === "consultant" && (
            <motion.div
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/50 text-[10px] font-inter">
                After verification, you'll complete your professional profile setup with specialty, certifications, and availability.
              </p>
            </motion.div>
          )}

          {errorMsg && (
            <p className="text-red-400 text-[12px] font-inter text-center mt-1 bg-red-950/40 py-1 px-3 rounded-lg border border-red-800/40">
              {errorMsg}
            </p>
          )}

          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className={`mx-auto mt-3 h-[42px] px-8 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50 ${
              selectedRole === "consultant" ? "bg-[#1E3A8A]" : "bg-[#FFDD36]"
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className={`animate-spin ${selectedRole === "consultant" ? "text-white" : "text-black"}`} />
            ) : null}
            <span
              className={`font-inter font-semibold text-[14px] ${
                selectedRole === "consultant" ? "text-white" : "text-black"
              }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center mt-1 pb-6"
          >
            <span className="text-white/80 text-[13px] font-inter font-medium">
              Already Have Account?{" "}
            </span>
            <span className="text-white text-[13px] font-inter font-medium underline ml-1">
              Sign in
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
