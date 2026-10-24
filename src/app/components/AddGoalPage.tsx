import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ChevronLeft, Calendar, DollarSign, Target } from "lucide-react";

export function AddGoalPage() {
  const navigate = useNavigate();
  const { addSavingsGoal, savingsGoals } = useAppContext();

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const totalCurrent = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);
  const percent = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  const handleSave = () => {
    if (!name || !targetAmount || !deadline) return;
    addSavingsGoal({
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline,
    });
    navigate(-1);
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[24px] font-inter font-bold text-[#E6484E] flex-1 text-center pr-9">
          Add Goal
        </h1>
      </div>

      {/* Progress visualization */}
      <div className="mx-5 mt-3 bg-white rounded-[16px] p-6 shadow-sm border border-[#E6484E]/10 flex flex-col items-center">
        <div className="relative w-[160px] h-[160px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="#f0f0f0" strokeWidth="6" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#E6484E"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${percent * 2.64} 264`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[28px] font-inter font-bold">৳{totalCurrent.toLocaleString()}</span>
            <span className="text-[11px] text-black/40 font-inter">BDT</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 mt-6 flex flex-col gap-4">
        {/* Goal Name */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[52px] flex items-center px-4 gap-3">
          <Target size={20} className="text-black/50" />
          <input
            type="text"
            placeholder="Goal Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none placeholder:text-black/40 text-black"
          />
        </div>

        {/* Deadline */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[52px] flex items-center px-4 gap-3">
          <Calendar size={20} className="text-black/50" />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Select Date"
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none text-black"
          />
        </div>

        {/* Amount */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[52px] flex items-center px-4 gap-3">
          <DollarSign size={20} className="text-black/50" />
          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none placeholder:text-black/40 text-black"
          />
          <span className="text-[12px] text-black/40 font-inter">BDT</span>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!name || !targetAmount || !deadline}
          className={`mt-4 h-[44px] rounded-xl font-inter font-semibold text-[14px] transition-all mx-auto px-10 active:scale-[0.98] ${
            name && targetAmount && deadline
              ? "bg-[#E6484E] text-white shadow-lg shadow-[#E6484E]/30"
              : "bg-black/10 text-black/30"
          }`}
        >
          Add as new Goal
        </button>
      </div>
    </div>
  );
}
