import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ChevronLeft, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString()}`;
}

const COLORS = ["#E6484E", "#1E3A8A", "#4CAF50", "#FFDD36", "#9C27B0", "#FF9800"];

const monthlyTrend = [
  { name: "Sep", income: 14000, expense: 8000 },
  { name: "Oct", income: 15000, expense: 9500 },
  { name: "Nov", income: 16000, expense: 7000 },
  { name: "Dec", income: 18000, expense: 11000 },
  { name: "Jan", income: 15500, expense: 8500 },
  { name: "Feb", income: 17000, expense: 5300 },
];

const insights = [
  {
    text: "You spent 20% more on Food this month",
    type: "warning" as const,
    icon: TrendingUp,
  },
  {
    text: "You saved 15% more than last month",
    type: "success" as const,
    icon: TrendingUp,
  },
  {
    text: "Transport costs decreased by 10%",
    type: "success" as const,
    icon: TrendingDown,
  },
  {
    text: "Consider reducing Entertainment budget",
    type: "info" as const,
    icon: Lightbulb,
  },
];

export function AnalyticsPage() {
  const navigate = useNavigate();
  const { transactions, budgetCategories } = useAppContext();

  // Calculate expense by category
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[24px] font-inter font-bold text-[#1E3A8A] flex-1 text-center pr-9">
          Analytics
        </h1>
      </div>

      {/* Pie Chart */}
      <div className="mx-5 mt-3 bg-white rounded-[16px] p-5 shadow-sm border border-black/5">
        <p className="text-[14px] font-inter font-bold text-black mb-2">
          Expense Categories
        </p>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={3}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {pieData.map((entry, i) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-[11px] text-black/60 font-inter">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="mx-5 mt-4 bg-white rounded-[16px] p-5 shadow-sm border border-black/5">
        <p className="text-[14px] font-inter font-bold text-black mb-4">
          Monthly Trend
        </p>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#949494" }}
                axisLine={{ stroke: "#f0f0f0" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#949494" }}
                axisLine={{ stroke: "#f0f0f0" }}
              />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend
                wrapperStyle={{ fontSize: "11px" }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ fill: "#4CAF50", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#E6484E"
                strokeWidth={2}
                dot={{ fill: "#E6484E", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="px-5 mt-6">
        <p className="text-[16px] font-inter font-bold text-black mb-3">Smart Insights</p>
        <div className="flex flex-col gap-2">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            const bgColor =
              insight.type === "warning"
                ? "bg-[#E6484E]/5 border-[#E6484E]/20"
                : insight.type === "success"
                ? "bg-[#4CAF50]/5 border-[#4CAF50]/20"
                : "bg-[#1E3A8A]/5 border-[#1E3A8A]/20";
            const iconColor =
              insight.type === "warning"
                ? "text-[#E6484E]"
                : insight.type === "success"
                ? "text-[#4CAF50]"
                : "text-[#1E3A8A]";

            return (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border ${bgColor}`}
              >
                <Icon size={18} className={iconColor} />
                <p className="text-[13px] font-inter font-medium text-black/70 flex-1">
                  {insight.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
