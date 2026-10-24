import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Video,
  Phone,
  MessageCircle,
} from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [17, 18, 19, 20, 21, 22, 23];

type SessionType = "video" | "phone" | "chat";

interface ScheduleItem {
  id: number;
  client: string;
  clientAvatar: string;
  time: string;
  duration: string;
  topic: string;
  type: SessionType;
  status: "completed" | "upcoming" | "in-progress" | "cancelled";
}

const todaySchedule: ScheduleItem[] = [
  {
    id: 1,
    client: "Nusrat Jahan",
    clientAvatar: "N",
    time: "9:00 AM",
    duration: "45 min",
    topic: "Monthly Review",
    type: "video",
    status: "completed",
  },
  {
    id: 2,
    client: "Rafi Uddin",
    clientAvatar: "R",
    time: "11:00 AM",
    duration: "45 min",
    topic: "Tax Planning",
    type: "phone",
    status: "completed",
  },
  {
    id: 3,
    client: "Tanvir Hassan",
    clientAvatar: "T",
    time: "2:00 PM",
    duration: "45 min",
    topic: "Budget Review",
    type: "video",
    status: "in-progress",
  },
  {
    id: 4,
    client: "Mira Sen",
    clientAvatar: "M",
    time: "4:00 PM",
    duration: "30 min",
    topic: "Investment Strategy",
    type: "chat",
    status: "upcoming",
  },
  {
    id: 5,
    client: "Karim Ahmed",
    clientAvatar: "K",
    time: "5:30 PM",
    duration: "45 min",
    topic: "Debt Management",
    type: "video",
    status: "upcoming",
  },
];

const typeIcons = {
  video: Video,
  phone: Phone,
  chat: MessageCircle,
};

const statusConfig = {
  completed: {
    bg: "bg-[#4CAF50]/5",
    border: "border-[#4CAF50]/15",
    badge: "bg-[#4CAF50]/10 text-[#4CAF50]",
    dot: "bg-[#4CAF50]",
  },
  upcoming: {
    bg: "bg-[#1E3A8A]/5",
    border: "border-[#1E3A8A]/15",
    badge: "bg-[#1E3A8A]/10 text-[#1E3A8A]",
    dot: "bg-[#1E3A8A]",
  },
  "in-progress": {
    bg: "bg-[#FFDD36]/5",
    border: "border-[#FFDD36]/30",
    badge: "bg-[#FFDD36]/20 text-[#B8860B]",
    dot: "bg-[#FFDD36]",
  },
  cancelled: {
    bg: "bg-[#E6484E]/5",
    border: "border-[#E6484E]/15",
    badge: "bg-[#E6484E]/10 text-[#E6484E]",
    dot: "bg-[#E6484E]",
  },
};

export function ConsultantSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(20); // Today = Feb 20

  return (
    <div className="h-full bg-white overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-14 px-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-inter font-bold text-black">
              Schedule
            </h1>
            <p className="text-[12px] font-inter text-black/40 mt-0.5">
              February 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <ChevronLeft size={16} className="text-black/40" />
            </button>
            <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <ChevronRight size={16} className="text-black/40" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="px-5 mb-5">
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-[16px] p-4">
          <div className="flex items-center justify-between">
            {days.map((day, i) => {
              const date = dates[i];
              const isToday = date === 20;
              const isSelected = date === selectedDate;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="text-[10px] font-inter text-white/40">
                    {day}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#FFDD36]"
                        : isToday
                        ? "bg-white/10"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-[14px] font-inter font-bold ${
                        isSelected
                          ? "text-black"
                          : isToday
                          ? "text-white"
                          : "text-white/50"
                      }`}
                    >
                      {date}
                    </span>
                  </div>
                  {/* Session dots */}
                  {date === 20 && (
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-[#4CAF50]" />
                      <div className="w-1 h-1 rounded-full bg-[#FFDD36]" />
                      <div className="w-1 h-1 rounded-full bg-[#1E3A8A]" />
                    </div>
                  )}
                  {date === 21 && (
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                    </div>
                  )}
                  {date !== 20 && date !== 21 && <div className="h-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Today's summary */}
      <div className="px-5 mb-4 flex gap-3">
        <div className="flex-1 bg-[#4CAF50]/5 rounded-xl p-3 text-center border border-[#4CAF50]/10">
          <p className="text-[18px] font-inter font-bold text-[#4CAF50]">
            {todaySchedule.filter((s) => s.status === "completed").length}
          </p>
          <p className="text-[9px] font-inter text-black/30">Completed</p>
        </div>
        <div className="flex-1 bg-[#FFDD36]/10 rounded-xl p-3 text-center border border-[#FFDD36]/20">
          <p className="text-[18px] font-inter font-bold text-[#B8860B]">
            {
              todaySchedule.filter((s) => s.status === "in-progress")
                .length
            }
          </p>
          <p className="text-[9px] font-inter text-black/30">In Progress</p>
        </div>
        <div className="flex-1 bg-[#1E3A8A]/5 rounded-xl p-3 text-center border border-[#1E3A8A]/10">
          <p className="text-[18px] font-inter font-bold text-[#1E3A8A]">
            {todaySchedule.filter((s) => s.status === "upcoming").length}
          </p>
          <p className="text-[9px] font-inter text-black/30">Upcoming</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5">
        <p className="text-[13px] font-inter font-bold text-black/60 mb-3 flex items-center gap-2">
          <Calendar size={14} />
          {selectedDate === 20 ? "Today" : `Feb ${selectedDate}`}'s Sessions
        </p>

        <div className="relative pl-7">
          {/* Timeline line */}
          <div className="absolute left-[10px] top-3 bottom-3 w-px bg-black/8" />

          <div className="flex flex-col gap-3">
            {todaySchedule.map((item, i) => {
              const config = statusConfig[item.status];
              const TypeIcon = typeIcons[item.type];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[-20px] top-4 w-3 h-3 rounded-full border-2 border-white ${config.dot}`}
                  />

                  <div
                    className={`${config.bg} rounded-xl p-3.5 border ${config.border}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center shrink-0">
                          <span className="text-[12px] font-inter font-bold text-[#1E3A8A]">
                            {item.clientAvatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] font-inter font-bold text-black">
                            {item.client}
                          </p>
                          <p className="text-[10px] font-inter text-black/40">
                            {item.topic}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-inter font-semibold px-2 py-0.5 rounded-full ${config.badge}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock size={11} className="text-black/30" />
                          <span className="text-[11px] font-inter text-black/40">
                            {item.time} · {item.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TypeIcon size={11} className="text-black/30" />
                          <span className="text-[11px] font-inter text-black/40 capitalize">
                            {item.type}
                          </span>
                        </div>
                      </div>

                      {item.status === "upcoming" && (
                        <button className="px-3 py-1 bg-[#1E3A8A] rounded-lg text-white text-[10px] font-inter font-semibold">
                          Start
                        </button>
                      )}
                      {item.status === "in-progress" && (
                        <button className="px-3 py-1 bg-[#4CAF50] rounded-lg text-white text-[10px] font-inter font-semibold flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Live
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
