import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Plus, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString()}`;
}

const articles = [
  {
    title: "How you can save money",
    description: "Money worries are for many people an important cause of stress and sleepless nights. How do you get out of financial trouble?",
    image: "https://images.unsplash.com/photo-1561837581-abd854e0ee22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwcGlnZ3klMjBiYW5rJTIwY29pbnN8ZW58MXx8fHwxNzcxNTgxMDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Simple ways to save money for the future",
    description: "Learn practical strategies that can help you build a strong financial foundation for your future goals.",
    image: "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBleHBlbnNlJTIwdHJhY2tpbmclMjBhcHAlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzcxNTgxMDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Simple Steps to Begin Saving Money",
    description: "Start your savings journey today with these easy-to-follow steps that anyone can implement.",
    image: "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXRpY3MlMjBjaGFydHMlMjBkYXRhfGVufDF8fHx8MTc3MTU4MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ActivityPage() {
  const navigate = useNavigate();
  const { savingsGoals } = useAppContext();

  const totalTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);
  const totalCurrent = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const percent = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-14 px-5 pb-2">
        <h1 className="text-[28px] font-inter font-bold text-[#E6484E] text-center">
          Activity
        </h1>
      </div>

      {/* Savings Goals Section */}
      <div className="mx-5 mt-3 bg-white rounded-[16px] p-5 shadow-sm border border-[#E6484E]/10">
        <p className="text-[16px] font-inter font-bold text-center mb-5">
          • Saving Goals •
        </p>

        {/* Big progress circle */}
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="relative w-[100px] h-[100px]">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#f0f0f0" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#E6484E"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${percent * 2.64} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[22px] font-inter font-bold">{percent}%</span>
            </div>
          </div>
          <div>
            <p className="text-[32px] font-inter font-bold">
              {formatCurrency(totalCurrent)}
            </p>
            <p className="text-[12px] text-black/40 font-inter">BDT</p>
          </div>
        </div>

        {/* Goals list */}
        <div className="flex flex-col gap-2">
          {savingsGoals.map((goal) => {
            const goalPercent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            return (
              <div
                key={goal.id}
                className="bg-[#FFDD36] rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-[16px] font-inter font-bold text-black">
                    {formatCurrency(goal.currentAmount)}
                  </p>
                  <p className="text-[11px] text-black/60 font-inter">{goalPercent}% complete</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-black/50 font-inter">{goal.name}</p>
                  <p className="text-[10px] text-black/40 font-inter">
                    Target: {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Goal */}
        <button
          onClick={() => navigate("/add-goal")}
          className="mt-3 ml-auto bg-[#FFDD36] rounded-xl h-[34px] px-4 flex items-center gap-1.5 active:scale-[0.97] transition-transform"
        >
          <Plus size={14} className="text-black" />
          <span className="text-[13px] font-inter font-medium text-black">Add Goal</span>
        </button>
      </div>

      {/* Financial Literacy Hub */}
      <div className="px-5 mt-6">
        <p className="text-[16px] font-inter font-bold text-center mb-4">
          • Financial Literacy Hub •
        </p>
        <div className="flex flex-col gap-3">
          {articles.map((article, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 shadow-sm border border-black/5 flex gap-3"
            >
              <div className="w-[65px] h-[65px] rounded-lg overflow-hidden shrink-0">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-inter font-bold text-black line-clamp-1">
                  {article.title}
                </p>
                <p className="text-[11px] text-black/40 font-inter mt-1 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
