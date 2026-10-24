import { useNavigate } from "react-router";
import { motion } from "motion/react";
import imgLogo from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";
import imgBg from "figma:asset/762217278e01ce4a4ea2659d383fab83e8c536de.png";
import { Mail, Phone, Briefcase } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export function WelcomePage() {
  const navigate = useNavigate();
  const { startDemoAccount } = useAppContext();

  return (
    <div className="h-full relative overflow-hidden bg-black">
      {/* Background image */}
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center pt-[25%] px-6 pb-10">
        {/* Logo */}
        <motion.img
          src={imgLogo}
          alt="PocketGuru"
          className="w-[280px] h-auto object-contain"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Tagline */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white text-[20px] font-inter font-semibold leading-relaxed">
            Track your spending
          </p>
          <p className="text-white text-[20px] font-inter font-semibold">
            habits hassle-free
          </p>
        </motion.div>

        <div className="flex-1" />

        {/* Buttons */}
        <motion.div
          className="w-full flex flex-col gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => navigate("/signup")}
            className="w-full h-[48px] bg-[#FFDD36] rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <Phone size={18} className="text-black" />
            <span className="font-inter font-semibold text-[15px] text-black">
              Sign up with phone number
            </span>
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full h-[48px] bg-[#FFDD36] rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <Mail size={18} className="text-black" />
            <span className="font-inter font-semibold text-[15px] text-black">
              Sign up with mail
            </span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="mt-1 flex items-center justify-center"
          >
            <span className="text-white/80 text-[13px] font-inter font-medium">
              Already Have Account?{" "}
            </span>
            <span className="text-[#FFDD36] text-[13px] font-inter font-semibold underline ml-1">
              Sign In
            </span>
          </button>

          {/* Explicit Demo Account Button */}
          <button
            onClick={() => {
              startDemoAccount();
              navigate("/home");
            }}
            className="w-full h-[46px] mt-1 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-white font-inter text-[14px] font-medium"
          >
            <span className="text-[#FFDD36]">★</span>
            <span>Explore Demo Account (Alex Johnson)</span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="mt-1 flex items-center justify-center gap-1.5"
          >
            <Briefcase size={12} className="text-white/50" />
            <span className="text-white/50 text-[11px] font-inter font-medium">
              Are you a consultant?{" "}
            </span>
            <span className="text-white/70 text-[11px] font-inter font-medium underline">
              Join here
            </span>
          </button>
        </motion.div>

        <p className="text-white/40 text-[10px] font-inter mt-6">
          All rights reserved. Copyright © POCKETGURU.INC
        </p>
      </div>
    </div>
  );
}