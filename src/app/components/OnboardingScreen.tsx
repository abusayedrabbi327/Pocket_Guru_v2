import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Wallet, Target, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Wallet,
    title: "Track Expenses Easily",
    description:
      "Keep a clear record of every transaction. Categorize your spending and know exactly where your money goes.",
    image:
      "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBleHBlbnNlJTIwdHJhY2tpbmclMjBhcHAlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzcxNTgxMDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#E6484E",
  },
  {
    icon: Target,
    title: "Set Budgets & Goals",
    description:
      "Create monthly budgets and savings goals. Stay on track with visual progress indicators and smart alerts.",
    image:
      "https://images.unsplash.com/photo-1561837581-abd854e0ee22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwcGlnZ3klMjBiYW5rJTIwY29pbnN8ZW58MXx8fHwxNzcxNTgxMDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#4CAF50",
  },
  {
    icon: BarChart3,
    title: "Get Smart Insights",
    description:
      "Understand your spending patterns with beautiful charts and AI-powered insights to save more money.",
    image:
      "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXRpY3MlMjBjaGFydHMlMjBkYXRhfGVufDF8fHx8MTc3MTU4MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#1E3A8A",
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => onComplete();

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Skip button */}
      <div className="flex justify-end p-4 pt-14">
        <button onClick={skip} className="text-[14px] text-black/50 font-inter font-medium px-3 py-1">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex-1 flex flex-col items-center justify-center w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {/* Illustration */}
            <div className="w-[220px] h-[220px] rounded-[32px] overflow-hidden mb-8 shadow-lg">
              <ImageWithFallback
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: slides[current].color + "15" }}
            >
              {(() => {
                const Icon = slides[current].icon;
                return <Icon size={28} color={slides[current].color} />;
              })()}
            </div>

            {/* Title */}
            <h2 className="text-[24px] font-inter font-bold text-black text-center mb-3">
              {slides[current].title}
            </h2>

            {/* Description */}
            <p className="text-[15px] font-inter text-black/60 text-center leading-relaxed max-w-[300px]">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="px-8 pb-12 flex flex-col items-center gap-6">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#E6484E]" : "w-2 bg-black/15"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={next}
          className="w-full h-[52px] bg-[#1E3A8A] rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <span className="text-white font-inter font-semibold text-[16px]">
            {current === slides.length - 1 ? "Get Started" : "Next"}
          </span>
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}
