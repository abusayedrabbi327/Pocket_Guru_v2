import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Plus, TrendingUp, TrendingDown, Calendar, Tag } from "lucide-react";

function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString()}`;
}

export function TransactionsPage() {
  const navigate = useNavigate();
  const { transactions, totalIncome, totalExpense } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const months = ["January", "February", "March", "April", "May", "June"];

  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const incomeItems = filtered.filter((t) => t.type === "income");
  const expenseItems = filtered.filter((t) => t.type === "expense");

  return (
    <div className="h-full bg-slate-50 md:bg-transparent overflow-y-auto pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-2 md:py-6">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="pt-10 pb-4 md:hidden text-center">
          <h1 className="text-[26px] font-inter font-bold text-slate-800">
            Transactions Ledger
          </h1>
        </div>

      {/* Month selector + Add */}
      <div className="px-5 flex items-center gap-2">
        <div className="flex-1 bg-[#FFDD36] rounded-xl h-[42px] flex items-center px-4 gap-2">
          <Calendar size={18} className="text-black/70" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent flex-1 font-inter font-medium text-[14px] text-black outline-none appearance-none"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => navigate("/add-transaction")}
          className="bg-[#FFDD36] w-[42px] h-[42px] rounded-xl flex items-center justify-center active:scale-[0.95] transition-transform"
        >
          <Plus size={22} className="text-black" />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="px-5 mt-4 flex gap-2">
        {(["all", "income", "expense"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 h-[36px] rounded-lg font-inter font-medium text-[13px] transition-all ${
              filter === f
                ? f === "income"
                  ? "bg-[#4CAF50] text-white"
                  : f === "expense"
                  ? "bg-[#E6484E] text-white"
                  : "bg-[#1E3A8A] text-white"
                : "bg-black/5 text-black/50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Income Section */}
      {(filter === "all" || filter === "income") && incomeItems.length > 0 && (
        <div className="px-5 mt-5">
          <p className="text-[16px] font-inter font-bold text-center text-black mb-3">
            • Income •
          </p>
          <div className="flex flex-col gap-2">
            {incomeItems.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#4CAF50]/5 border border-[#4CAF50]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-black/60">
                    <Calendar size={14} />
                    <span className="text-[12px] font-inter">
                      {new Date(t.date).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-black/60">
                    <Tag size={14} />
                    <span className="text-[12px] font-inter">{t.category}</span>
                  </div>
                </div>
                <p className="text-[18px] font-inter font-bold text-[#4CAF50]">
                  {formatCurrency(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense Section */}
      {(filter === "all" || filter === "expense") && expenseItems.length > 0 && (
        <div className="px-5 mt-5">
          <p className="text-[16px] font-inter font-bold text-center text-black mb-3">
            • Expense •
          </p>
          <div className="flex flex-col gap-2">
            {expenseItems.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#E6484E]/5 border border-[#E6484E]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-black/60">
                    <Calendar size={14} />
                    <span className="text-[12px] font-inter">
                      {new Date(t.date).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-black/60">
                    <Tag size={14} />
                    <span className="text-[12px] font-inter">{t.category}</span>
                  </div>
                </div>
                <p className="text-[18px] font-inter font-bold text-[#E6484E]">
                  {formatCurrency(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total */}
      <div className="px-5 mt-6">
        <p className="text-[18px] font-inter font-bold text-black mb-2">Total</p>
        <div className="bg-[#E6484E] rounded-xl p-4 flex items-center justify-between">
          <p className="text-white text-[20px] font-inter font-bold">
            {totalIncome > totalExpense ? "+" : "-"}{formatCurrency(Math.abs(totalIncome - totalExpense))}
          </p>
          <p className="text-white/70 text-[12px] font-inter">Net Balance</p>
        </div>
      </div>
      </div>
    </div>
  );
}
