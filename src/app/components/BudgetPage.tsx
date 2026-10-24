import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ChevronLeft, Edit3, AlertTriangle } from "lucide-react";

function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString()}`;
}

const categoryIcons: Record<string, string> = {
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Rent: "🏠",
  Entertainment: "🎬",
  Utilities: "⚡",
  Health: "💊",
  Education: "📚",
};

export function BudgetPage() {
  const navigate = useNavigate();
  const { budgetCategories, updateBudget } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const totalBudget = budgetCategories.reduce((s, c) => s + c.budgetAmount, 0);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spentAmount, 0);
  const overallPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const handleEditSave = (id: string) => {
    if (editValue) {
      updateBudget(id, parseFloat(editValue));
    }
    setEditingId(null);
  };

  return (
    <div className="h-full bg-slate-50 md:bg-transparent overflow-y-auto pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-2 md:py-6">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="pt-10 px-2 pb-3 flex items-center gap-3 md:hidden">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[24px] font-inter font-bold text-[#1E3A8A] flex-1 text-center pr-9">
            Budget
          </h1>
        </div>

      {/* Monthly progress */}
      <div className="mx-5 mt-3 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[20px] p-5">
        <p className="text-white/60 text-[13px] font-inter">February 2026</p>
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-white text-[28px] font-inter font-bold">
              {formatCurrency(totalSpent)}
            </p>
            <p className="text-white/50 text-[12px] font-inter">
              of {formatCurrency(totalBudget)} budget
            </p>
          </div>
          <div className="text-right">
            <p className="text-white text-[32px] font-inter font-bold">{overallPercent}%</p>
            <p className="text-white/50 text-[11px] font-inter">used</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              overallPercent > 90
                ? "bg-[#E6484E]"
                : overallPercent > 70
                ? "bg-[#FFDD36]"
                : "bg-[#4CAF50]"
            }`}
            style={{ width: `${Math.min(overallPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Category budgets */}
      <div className="px-5 mt-6">
        <p className="text-[16px] font-inter font-bold text-black mb-4">Category Budgets</p>
        <div className="flex flex-col gap-3">
          {budgetCategories.map((cat) => {
            const percent = cat.budgetAmount > 0
              ? Math.round((cat.spentAmount / cat.budgetAmount) * 100)
              : 0;
            const isNearLimit = percent >= 80;
            const isOverBudget = percent >= 100;

            return (
              <div
                key={cat.id}
                className={`bg-white rounded-[16px] p-4 shadow-sm border transition-all ${
                  isOverBudget
                    ? "border-[#E6484E]/40 bg-[#E6484E]/[0.03]"
                    : isNearLimit
                    ? "border-[#FFDD36]/60 bg-[#FFDD36]/[0.03]"
                    : "border-black/5"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">{categoryIcons[cat.name] || "📦"}</span>
                    <span className="text-[14px] font-inter font-semibold text-black">
                      {cat.name}
                    </span>
                    {isNearLimit && (
                      <AlertTriangle
                        size={14}
                        className={isOverBudget ? "text-[#E6484E]" : "text-[#FFDD36]"}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[14px] font-inter font-bold ${
                        isOverBudget
                          ? "text-[#E6484E]"
                          : isNearLimit
                          ? "text-[#E6484E]"
                          : "text-black"
                      }`}
                    >
                      {percent}%
                    </span>
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditValue(cat.budgetAmount.toString());
                      }}
                    >
                      <Edit3 size={14} className="text-black/30" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-black/5 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isOverBudget
                        ? "bg-[#E6484E]"
                        : isNearLimit
                        ? "bg-[#FFDD36]"
                        : "bg-[#4CAF50]"
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-black/40 font-inter">
                    Spent: {formatCurrency(cat.spentAmount)}
                  </span>
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-[80px] h-[28px] bg-[#FFDD36]/20 rounded-md px-2 text-[12px] font-inter font-medium outline-none text-black"
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSave(cat.id)}
                        className="h-[28px] px-2 bg-[#1E3A8A] rounded-md text-white text-[11px] font-inter font-medium"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-black/40 font-inter">
                      Budget: {formatCurrency(cat.budgetAmount)}
                    </span>
                  )}
                </div>

                {isNearLimit && !isOverBudget && (
                  <p className="text-[10px] text-[#E6484E] font-inter mt-2">
                    ⚠️ Nearing budget limit!
                  </p>
                )}
                {isOverBudget && (
                  <p className="text-[10px] text-[#E6484E] font-inter mt-2">
                    🚨 Budget exceeded!
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
