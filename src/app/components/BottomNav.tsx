import { useNavigate, useLocation } from "react-router";
import { useAppContext } from "../context/AppContext";
import {
  Home,
  ArrowLeftRight,
  Activity,
  User,
  MessageCircle,
  LayoutDashboard,
  Users,
  Calendar,
  PieChart,
} from "lucide-react";

const userTabs = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { path: "/budget", label: "Budget", icon: PieChart },
  { path: "/consultants", label: "Consult", icon: MessageCircle },
  { path: "/profile", label: "Profile", icon: User },
];

const consultantTabs = [
  { path: "/consultant-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/consultant-clients", label: "Clients", icon: Users },
  { path: "/consultant-messages", label: "Messages", icon: MessageCircle },
  { path: "/consultant-schedule", label: "Schedule", icon: Calendar },
  { path: "/consultant-profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppContext();

  const isConsultant = user.role === "consultant";
  const tabs = isConsultant ? consultantTabs : userTabs;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 md:hidden">
      <div
        className={`rounded-t-[20px] px-4 pt-3 pb-6 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.1)] ${
          isConsultant ? "bg-[#1E3A8A]" : "bg-[#FFDD36]"
        }`}
      >
        {tabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            location.pathname.startsWith(tab.path + "/");
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 min-w-[50px]"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive
                    ? isConsultant
                      ? "bg-white/15 scale-110"
                      : "bg-black/10 scale-110"
                    : ""
                }`}
              >
                <Icon
                  size={20}
                  className={
                    isActive
                      ? isConsultant
                        ? "text-white"
                        : "text-black"
                      : isConsultant
                      ? "text-white/40"
                      : "text-black/50"
                  }
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-[10px] font-inter ${
                  isActive
                    ? isConsultant
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                    : isConsultant
                    ? "text-white/40 font-medium"
                    : "text-black/50 font-medium"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}