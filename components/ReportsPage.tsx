import React, { useState } from "react";
import { Download, RefreshCcw, PieChart, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

// Mock Data for Spenders - Expanded and Sorted
const SPENDERS = [
  { id: 1, name: "Alice Smith", initials: "AS", amount: 1200, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  { id: 2, name: "John Doe", initials: "JD", amount: 950, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  { id: 3, name: "Mike Johnson", initials: "MJ", amount: 550, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  { id: 4, name: "Sarah Connor", initials: "SC", amount: 450, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  { id: 5, name: "Robert Fox", initials: "RF", amount: 320, color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300" },
  { id: 6, name: "Emily Davis", initials: "ED", amount: 210, color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
  { id: 7, name: "James Cameron", initials: "JC", amount: 150, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
].sort((a, b) => b.amount - a.amount);

// Mock Data for Charts
const REPORT_DATA = {
  overall: {
    monthly: [35, 55, 40, 70, 60, 85, 75],
    categories: [
      { label: "Fuel", val: 45, color: "bg-blue-500" },
      { label: "Food", val: 30, color: "bg-green-500" },
      { label: "Travel", val: 15, color: "bg-purple-500" },
      { label: "Office", val: 10, color: "bg-orange-500" }
    ]
  },
  1: { // Alice (High Travel)
    monthly: [20, 30, 25, 40, 35, 50, 45],
    categories: [
      { label: "Fuel", val: 20, color: "bg-blue-500" },
      { label: "Food", val: 10, color: "bg-green-500" },
      { label: "Travel", val: 60, color: "bg-purple-500" },
      { label: "Office", val: 10, color: "bg-orange-500" }
    ]
  },
  2: { // John (High Fuel)
    monthly: [25, 15, 35, 20, 45, 15, 40],
    categories: [
      { label: "Fuel", val: 60, color: "bg-blue-500" },
      { label: "Food", val: 20, color: "bg-green-500" },
      { label: "Travel", val: 5, color: "bg-purple-500" },
      { label: "Office", val: 15, color: "bg-orange-500" }
    ]
  },
  3: { // Mike (High Food)
    monthly: [5, 10, 8, 15, 12, 20, 18],
    categories: [
      { label: "Fuel", val: 10, color: "bg-blue-500" },
      { label: "Food", val: 70, color: "bg-green-500" },
      { label: "Travel", val: 10, color: "bg-purple-500" },
      { label: "Office", val: 10, color: "bg-orange-500" }
    ]
  }
};

export default function ReportsPage() {
  const [selectedId, setSelectedId] = useState<number | 'overall'>('overall');

  // Fallback to overall data if specific user data doesn't exist in map
  const currentData = REPORT_DATA[selectedId as keyof typeof REPORT_DATA] || REPORT_DATA.overall;
  const currentSpenderName = selectedId === 'overall' ? "Overall Organization" : SPENDERS.find(s => s.id === selectedId)?.name;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Financial Reports</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Viewing report for: <span className="font-semibold text-neutral-900 dark:text-white">{currentSpenderName}</span></p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-200 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm">
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Spending Chart */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <BarChart className="w-5 h-5 text-neutral-500" />
                Monthly Spending Trend
             </h2>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {currentData.monthly.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end group">
                    <div className="relative w-full h-full flex items-end">
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={cn(
                                "w-full rounded-t-md transition-all hover:opacity-80",
                                selectedId === 'overall' 
                                    ? "bg-neutral-900 dark:bg-neutral-200" 
                                    : "bg-blue-600 dark:bg-blue-500"
                            )}
                        ></motion.div>
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {h}%
                        </div>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">Week {i+1}</span>
                </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-neutral-500" />
                Expense by Category
             </h2>
          </div>
          <div className="space-y-6 my-auto">
            {currentData.categories.map((item) => (
                <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2 text-neutral-700 dark:text-neutral-300">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold">{item.val}%</span>
                    </div>
                    <div className="h-3 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.val}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`h-full ${item.color}`} 
                        ></motion.div>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Worker Comparison Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col md:flex-row gap-6">
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Top Spenders (Descending)</h2>
             <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">Select a user to view details</span>
         </div>
         <div className="space-y-2 flex-1 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700">
            {/* Reset / Overall Option */}
            <div 
                onClick={() => setSelectedId('overall')}
                className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border sticky top-0 z-10",
                    selectedId === 'overall'
                        ? "bg-neutral-50 dark:bg-neutral-700/50 border-neutral-300 dark:border-neutral-500 ring-1 ring-neutral-300 dark:ring-neutral-500"
                        : "bg-white dark:bg-neutral-800 border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300">
                        <RefreshCcw className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        Overall Report
                    </span>
                </div>
                {selectedId === 'overall' && <span className="text-xs font-semibold text-neutral-500">Active</span>}
            </div>

            {SPENDERS.map((spender, index) => (
                <div 
                    key={spender.id} 
                    onClick={() => setSelectedId(spender.id)}
                    className={cn(
                        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border",
                        selectedId === spender.id
                            ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 ring-1 ring-blue-200 dark:ring-blue-800"
                            : "bg-neutral-50 dark:bg-neutral-700/30 border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-neutral-400 w-4">{index + 1}</span>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", spender.color)}>
                            {spender.initials}
                        </div>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {spender.name}
                        </span>
                    </div>
                    <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">
                        ${spender.amount.toLocaleString()}
                    </span>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
