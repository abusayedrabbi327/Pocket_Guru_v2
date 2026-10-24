import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ChevronLeft, Tag, Calendar, DollarSign, FileText } from "lucide-react";

const categories = {
  income: ["Salary", "Freelance", "Side Hustle", "Investment", "Gift", "Other"],
  expense: ["Food", "Transport", "Rent", "Shopping", "Entertainment", "Utilities", "Health", "Education", "Other"],
};

export function AddTransactionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addTransaction } = useAppContext();
  const initialType = (searchParams.get("type") as "income" | "expense") || "income";

  const [type, setType] = useState<"income" | "expense">(initialType);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!amount || !category) return;
    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date,
      notes,
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
          Add Transaction
        </h1>
      </div>

      {/* Type toggle */}
      <div className="mx-5 mt-3 bg-black/[0.02] rounded-xl p-1.5 flex shadow-sm border border-black/5">
        <button
          onClick={() => setType("income")}
          className={`flex-1 h-[40px] rounded-lg font-inter font-semibold text-[14px] transition-all ${
            type === "income"
              ? "bg-[#E6484E] text-white shadow-md"
              : "text-black/50"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setType("expense")}
          className={`flex-1 h-[40px] rounded-lg font-inter font-semibold text-[14px] transition-all ${
            type === "expense"
              ? "bg-[#E6484E] text-white shadow-md"
              : "text-black/50"
          }`}
        >
          Expense
        </button>
      </div>

      {/* Form */}
      <div className="px-5 mt-6 flex flex-col gap-4">
        {/* Category */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[52px] flex items-center px-4 gap-3">
          <Tag size={20} className="text-black/50" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none appearance-none text-black"
          >
            <option value="" disabled>
              Choose Category
            </option>
            {categories[type].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[52px] flex items-center px-4 gap-3">
          <Calendar size={20} className="text-black/50" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none text-black"
          />
        </div>

        {/* Amount */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[52px] flex items-center px-4 gap-3">
          <DollarSign size={20} className="text-black/50" />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none placeholder:text-black/40 text-black"
          />
          <span className="text-[12px] text-black/40 font-inter">BDT</span>
        </div>

        {/* Notes */}
        <div className="bg-[#FFDD36]/10 border border-[#FFDD36] rounded-xl h-[80px] flex items-start px-4 py-3 gap-3">
          <FileText size={20} className="text-black/50 mt-0.5" />
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex-1 bg-transparent font-inter font-medium text-[14px] outline-none placeholder:text-black/40 text-black resize-none"
          />
        </div>

        {/* Amount preview */}
        {amount && (
          <div
            className={`rounded-xl p-3 flex items-center justify-between ${
              type === "income" ? "bg-[#4CAF50]/10" : "bg-[#E6484E]/10"
            }`}
          >
            <span className="text-[13px] font-inter text-black/50">Preview:</span>
            <span
              className={`text-[20px] font-inter font-bold ${
                type === "income" ? "text-[#4CAF50]" : "text-[#E6484E]"
              }`}
            >
              {type === "income" ? "+" : "-"}৳{parseFloat(amount || "0").toLocaleString()} BDT
            </span>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!amount || !category}
          className={`mt-4 h-[48px] rounded-xl font-inter font-semibold text-[15px] transition-all active:scale-[0.98] ${
            amount && category
              ? "bg-[#E6484E] text-white shadow-lg shadow-[#E6484E]/30"
              : "bg-black/10 text-black/30"
          }`}
        >
          Save Transaction
        </button>
      </div>
    </div>
  );
}
