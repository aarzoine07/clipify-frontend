"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // if you don’t have a cn util, replace cn(...) with template strings

type CalendarEvent = {
  id: string;
  date: string; // ISO date string
  status: "scheduled" | "posted" | "failed";
};

interface MiniCalendarProps {
  events?: CalendarEvent[];
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MiniCalendar({ events = [] }: MiniCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // First day of month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Array for grid cells
  const daysArray = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
  });

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(currentYear, currentMonth)
  );

  const handlePrev = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
  };

  const handleNext = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
  };

  return (
    <div className="p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrev}
          className="px-2 py-1 text-sm rounded hover:bg-gray-700"
        >
          ←
        </button>
        <h2 className="text-sm font-medium">
          {monthName} {currentYear}
        </h2>
        <button
          onClick={handleNext}
          className="px-2 py-1 text-sm rounded hover:bg-gray-700"
        >
          →
        </button>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 text-xs text-center font-medium mb-1">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div role="grid" className="grid grid-cols-7 text-xs">
        {daysArray.map((day, i) => (
          <div
            key={i}
            role="gridcell"
            tabIndex={day ? 0 : -1}
            aria-label={day ? `${day} ${monthName}` : "empty"}
            className={cn(
              "h-7 flex items-center justify-center rounded cursor-pointer",
              day
                ? "hover:bg-gray-700 focus:outline focus:ring-1 focus:ring-accent"
                : "opacity-0"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          Scheduled
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Posted
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Failed
        </div>
      </div>
    </div>
  );
}
