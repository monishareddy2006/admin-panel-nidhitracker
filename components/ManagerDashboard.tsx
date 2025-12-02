import React, { useState } from "react";
import { cn } from "../lib/utils";
import { FileText, CheckCircle, Search, Bell, Users, DollarSign, X, Calendar, Image as ImageIcon, ExternalLink, ArrowUpRight, ArrowDownLeft, Filter, Download, CreditCard, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Mock Data for Dashboard Activities
const RECENT_ACTIVITIES = [
  { id: 1, name: "John Doe", initials: "JD", reportId: 1001, time: "2 hours ago", amount: 1210.00, status: "Pending", statusType: "pending" },
  { id: 2, name: "Alice Smith", initials: "AS", reportId: 1002, time: "5 hours ago", amount: 550.00, status: "Approved", statusType: "approved" },
  { id: 3, name: "Mike Johnson", initials: "MJ", reportId: 1003, time: "1 day ago", amount: 125.50, status: "Approved", statusType: "approved" },
  { id: 4, name: "Sarah Connor", initials: "SC", reportId: 1004, time: "2 days ago", amount: 890.00, status: "Approved", statusType: "approved" },
  { id: 5, name: "David Wilson", initials: "DW", reportId: 1005, time: "3 days ago", amount: 230.00, status: "Pending", statusType: "pending" },
  { id: 6, name: "Emily Davis", initials: "ED", reportId: 1006, time: "3 days ago", amount: 1200.00, status: "Rejected", statusType: "rejected" },
  { id: 7, name: "Robert Fox", initials: "RF", reportId: 1007, time: "4 days ago", amount: 450.50, status: "Approved", statusType: "approved" },
  { id: 8, name: "James Cameron", initials: "JC", reportId: 1008, time: "5 days ago", amount: 3200.00, status: "Pending", statusType: "pending" },
  { id: 9, name: "Lisa Wong", initials: "LW", reportId: 1009, time: "1 week ago", amount: 65.00, status: "Approved", statusType: "approved" },
  { id: 10, name: "Michael Brown", initials: "MB", reportId: 1010, time: "1 week ago", amount: 150.00, status: "Approved", statusType: "approved" },
];

export function ManagerDashboard({ className }: { className?: string }) {
  const [showBills, setShowBills] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showActiveWorkers, setShowActiveWorkers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewAll, setViewAll] = useState(false);

  const filteredActivities = RECENT_ACTIVITIES.filter(activity => 
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.reportId.toString().includes(searchQuery)
  );

  const displayedActivities = viewAll ? filteredActivities : filteredActivities.slice(0, 5);

  const getStatusBadgeClass = (type: string) => {
    switch (type) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900';
      case 'approved':
      default:
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900';
    }
  };

  const getAvatarClass = (type: string) => {
    switch (type) {
      case 'pending':
        return 'bg-[#FBF3D1] text-neutral-800 dark:bg-[#FBF3D1]/20 dark:text-[#FBF3D1]';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'approved':
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-neutral-300';
    }
  };

  return (
    <div className={cn("flex flex-col h-full w-full bg-gray-50 dark:bg-neutral-900 overflow-y-auto relative", className)}>
      {/* Navbar */}
      <nav className="sticky top-0 z-20 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manager Dashboard</h1>
        
        <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
                <input 
                    type="text" 
                    placeholder="Search workers..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border-none text-sm focus:ring-2 focus:ring-neutral-200 focus:outline-none transition-all placeholder:text-neutral-500 w-64"
                />
            </div>
            <Bell className="h-5 w-5 text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#FBF3D1] text-neutral-900 py-16 text-center px-4 mx-4 mt-6 rounded-3xl shadow-sm relative overflow-hidden flex-shrink-0">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-900">Welcome Back, Manager</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-neutral-700 font-medium">
            Manage bills, employees, and approvals with our secure, integrated workflow.
          </p>
        </div>
        {/* Abstract Shapes - Adapted for light background */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#E8E0C0] opacity-50 rounded-full blur-3xl"></div>
      </section>

      {/* Overview Highlights */}
      <section id="overview" className="py-8 px-6 grid md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full flex-shrink-0">
        <Card 
          title="Total Money Spend" 
          onClick={() => setShowTransactions(true)}
          description={
             <div className="flex flex-col gap-1 mt-1">
                 <span className="text-3xl font-bold text-neutral-900 dark:text-white">$48,250.00</span>
                 <span className="text-sm text-neutral-600 dark:text-neutral-400">Total approved expenses</span>
             </div>
          }
          className="bg-white dark:bg-neutral-800 border-transparent dark:border-neutral-700 cursor-pointer hover:ring-2 hover:ring-neutral-200 dark:hover:ring-neutral-700 transition-all"
          icon={<DollarSign className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />}
          iconBg="bg-[#FBF3D1] dark:bg-[#FBF3D1]/20"
        />
        <Card 
          title="No. of bills received" 
          onClick={() => setShowBills(true)}
          description={
             <div className="flex flex-col gap-1 mt-1">
                 <span className="text-3xl font-bold text-neutral-900 dark:text-white">142</span>
                 <span className="text-sm text-neutral-600 dark:text-neutral-400">Pending review this week</span>
             </div>
          }
          className="bg-white dark:bg-neutral-800 border-transparent dark:border-neutral-700 cursor-pointer hover:ring-2 hover:ring-neutral-200 dark:hover:ring-neutral-700 transition-all"
          icon={<CheckCircle className="w-6 h-6 text-green-700 dark:text-green-400" />}
          iconBg="bg-green-50 dark:bg-green-900/20"
        />
        <Card 
          title="No. of working active" 
          onClick={() => setShowActiveWorkers(true)}
          description={
             <div className="flex flex-col gap-1 mt-1">
                 <span className="text-3xl font-bold text-neutral-900 dark:text-white">18</span>
                 <span className="text-sm text-neutral-600 dark:text-neutral-400">Currently active on sites</span>
             </div>
          }
          className="bg-white dark:bg-neutral-800 border-transparent dark:border-neutral-700 cursor-pointer hover:ring-2 hover:ring-neutral-200 dark:hover:ring-neutral-700 transition-all"
          icon={<Users className="w-6 h-6 text-blue-700 dark:text-blue-400" />}
          iconBg="bg-blue-50 dark:bg-blue-900/20"
        />
      </section>

      {/* Recent Activity / Table Section */}
      <section className="px-6 pb-10 max-w-7xl mx-auto w-full flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 ml-1">Recent Activity</h3>
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
             {filteredActivities.length > 0 ? (
                 <AnimatePresence initial={false} mode="wait">
                     <motion.div
                        key={viewAll ? "all" : "limited"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                     >
                        {displayedActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-700 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarClass(activity.statusType)}`}>
                                    {activity.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-neutral-200">Expense Report #{activity.reportId}</p>
                                    <p className="text-xs text-gray-600 dark:text-neutral-400">Submitted by {activity.name} • {activity.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-neutral-400">${activity.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusBadgeClass(activity.statusType)}`}>
                                    {activity.status}
                                </span>
                            </div>
                        </div>
                        ))}
                     </motion.div>
                 </AnimatePresence>
             ) : (
                 <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
                     No recent activity found for "{searchQuery}"
                 </div>
             )}
             
             {filteredActivities.length > 5 && (
                 <div className="p-4 text-center border-t border-neutral-200 dark:border-neutral-700">
                    <button 
                        onClick={() => setViewAll(!viewAll)}
                        className="flex items-center justify-center gap-2 mx-auto text-sm font-medium text-neutral-900 hover:bg-[#FBF3D1] px-4 py-2 rounded-lg transition-colors dark:text-neutral-100 dark:hover:bg-neutral-700"
                    >
                        {viewAll ? (
                            <>Show Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>View All Activity <ChevronDown className="w-4 h-4" /></>
                        )}
                    </button>
                 </div>
             )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-950 text-gray-600 dark:text-neutral-400 text-center py-8 mt-auto border-t border-neutral-200 dark:border-neutral-800 flex-shrink-0">
        <p className="text-sm font-medium">© 2025 Manager Dashboard. All rights reserved.</p>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showBills && <BillsModal onClose={() => setShowBills(false)} />}
        {showTransactions && <TransactionsModal onClose={() => setShowTransactions(false)} />}
        {showActiveWorkers && <ActiveWorkersModal onClose={() => setShowActiveWorkers(false)} />}
      </AnimatePresence>
    </div>
  );
}

function Card({ 
    title, 
    description, 
    className, 
    icon,
    iconBg = "bg-neutral-100",
    textClassName = "text-gray-800 dark:text-white",
    descClassName = "text-gray-600 dark:text-neutral-400",
    onClick
}: { 
    title: string; 
    description: string | React.ReactNode; 
    className?: string; 
    icon?: React.ReactNode;
    iconBg?: string;
    textClassName?: string;
    descClassName?: string;
    onClick?: () => void;
}) {
  return (
    <div 
        onClick={onClick}
        className={cn("p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border", className)}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon && <div className={cn("p-2 rounded-xl", iconBg)}>{icon}</div>}
        <h3 className={cn("text-xl font-bold", textClassName)}>{title}</h3>
      </div>
      <div className={cn("font-medium leading-relaxed", descClassName)}>{description}</div>
    </div>
  );
}

function BillsModal({ onClose }: { onClose: () => void }) {
    const bills = [
        { id: 1024, vendor: "Home Depot", category: "Materials", amount: 450.25, date: "Feb 15, 2025", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400" },
        { id: 1025, vendor: "Shell Station", category: "Fuel", amount: 85.00, date: "Feb 16, 2025", image: "https://images.unsplash.com/photo-1554224154-260327c0d11e?auto=format&fit=crop&q=80&w=400" },
        { id: 1026, vendor: "Staples", category: "Office", amount: 120.50, date: "Feb 17, 2025", image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=400" },
        { id: 1027, vendor: "Amazon", category: "Equipment", amount: 899.99, date: "Feb 17, 2025", image: "https://images.unsplash.com/photo-1580048914979-3c7817430560?auto=format&fit=crop&q=80&w=400" },
        { id: 1028, vendor: "Uber Trip", category: "Travel", amount: 45.20, date: "Feb 18, 2025", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400" },
        { id: 1029, vendor: "Local Deli", category: "Meals", amount: 32.15, date: "Feb 18, 2025", image: "https://images.unsplash.com/photo-1529338296736-47b068da87eb?auto=format&fit=crop&q=80&w=400" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose} 
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-neutral-900 w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10">
                    <div>
                         <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                             <ImageIcon className="w-5 h-5" />
                             Received Bills
                         </h2>
                         <p className="text-sm text-neutral-500">142 pending reviews this week</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/50 dark:bg-neutral-900/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bills.map(bill => (
                            <div key={bill.id} className="group relative bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
                                 <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 relative cursor-pointer">
                                    <img 
                                        src={bill.image} 
                                        alt={`Bill from ${bill.vendor}`} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <button className="flex items-center gap-2 text-white text-sm font-medium bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-colors border border-white/40">
                                            <ExternalLink className="w-4 h-4" />
                                            View
                                         </button>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-neutral-900 dark:text-white shadow-sm">
                                        #{bill.id}
                                    </div>
                                 </div>
                                 <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="font-semibold text-neutral-900 dark:text-white truncate text-lg">{bill.vendor}</p>
                                            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{bill.category}</p>
                                        </div>
                                        <span className="font-bold text-neutral-900 dark:text-white text-lg">${bill.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {bill.date}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                            Pending
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function TransactionsModal({ onClose }: { onClose: () => void }) {
  // Mock transaction data
  const transactions = [
    { id: 'TXN-1001', vendor: 'Heavy Machinery Co.', category: 'Equipment', date: 'Feb 20, 2025', amount: 12500.00, status: 'Completed', type: 'debit' },
    { id: 'TXN-1002', vendor: 'Metro Electric Utilities', category: 'Utilities', date: 'Feb 18, 2025', amount: 3450.25, status: 'Completed', type: 'debit' },
    { id: 'TXN-1003', vendor: 'Shell Fleet Services', category: 'Fuel', date: 'Feb 15, 2025', amount: 850.00, status: 'Completed', type: 'debit' },
    { id: 'TXN-1004', vendor: 'Office Supplies Inc.', category: 'Office', date: 'Feb 12, 2025', amount: 245.50, status: 'Completed', type: 'debit' },
    { id: 'TXN-1005', vendor: 'Tech Solutions Ltd', category: 'Software', date: 'Feb 01, 2025', amount: 1200.00, status: 'Recurring', type: 'debit' },
    { id: 'TXN-1006', vendor: 'Client Refund - #9022', category: 'Refund', date: 'Jan 28, 2025', amount: 350.00, status: 'Completed', type: 'credit' },
    { id: 'TXN-1007', vendor: 'Global Logistics', category: 'Travel', date: 'Jan 25, 2025', amount: 2100.00, status: 'Completed', type: 'debit' },
    { id: 'TXN-1008', vendor: 'Local Catering', category: 'Meals', date: 'Jan 22, 2025', amount: 450.75, status: 'Completed', type: 'debit' },
    { id: 'TXN-1009', vendor: 'BuildRight Contractors', category: 'Labor', date: 'Jan 20, 2025', amount: 8500.00, status: 'Completed', type: 'debit' },
  ];

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose} 
          />
          <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
          >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10">
                  <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-full bg-[#FBF3D1] dark:bg-[#FBF3D1]/20 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-neutral-800 dark:text-[#FBF3D1]" />
                       </div>
                       <div>
                           <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Transaction History</h2>
                           <p className="text-sm text-neutral-500">Total Spent: <span className="font-semibold text-neutral-900 dark:text-neutral-200">$48,250.00</span></p>
                       </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <button className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                          <Filter className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                          <Download className="w-5 h-5" />
                      </button>
                      <button 
                          onClick={onClose} 
                          className="ml-2 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                      >
                          <X className="w-5 h-5" />
                      </button>
                  </div>
              </div>
              
              {/* Table List */}
              <div className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-950">
                  <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-300">
                    <thead className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white sticky top-0 shadow-sm z-10">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Transaction Details</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {transactions.map((txn) => (
                        <tr key={txn.id} className="bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'}`}>
                                    {txn.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">{txn.vendor}</p>
                                    <p className="text-xs text-neutral-500">{txn.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
                                  {txn.category}
                              </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-400">{txn.date}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                txn.status === 'Completed' 
                                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                                    : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${txn.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                                {txn.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-right font-bold ${txn.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-neutral-900 dark:text-white'}`}>
                             {txn.type === 'credit' ? '+' : ''}${txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>
          </motion.div>
      </div>
  )
}

function ActiveWorkersModal({ onClose }: { onClose: () => void }) {
  const activeWorkers = [
    { id: 1, name: "John Doe", role: "Field Technician", checkIn: "07:55 AM", location: "Site A - Downtown", status: "Online" },
    { id: 2, name: "Alice Smith", role: "Logistics Manager", checkIn: "08:10 AM", location: "Warehouse", status: "Online" },
    { id: 3, name: "Robert Fox", role: "Electrician", checkIn: "08:00 AM", location: "Site B - Uptown", status: "Online" },
    { id: 4, name: "Emily Davis", role: "Safety Inspector", checkIn: "08:30 AM", location: "Site A - Downtown", status: "Online" },
    { id: 5, name: "Michael Brown", role: "Equipment Operator", checkIn: "07:45 AM", location: "Site C - Industrial Park", status: "Online" },
    { id: 6, name: "David Wilson", role: "Site Supervisor", checkIn: "07:30 AM", location: "Site B - Uptown", status: "Online" },
    { id: 7, name: "Sarah Connor", role: "Apprentice", checkIn: "08:05 AM", location: "Site A - Downtown", status: "Online" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white dark:bg-neutral-900 w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
               <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Active Workers</h2>
               <p className="text-sm text-neutral-500">Attendance Dashboard • {activeWorkers.length} Active</p>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {activeWorkers.map((worker) => (
               <div key={worker.id} className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col gap-3">
                 <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-sm font-bold text-neutral-600 dark:text-neutral-300">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{worker.name}</h3>
                        <p className="text-xs text-neutral-500">{worker.role}</p>
                      </div>
                   </div>
                   <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      {worker.status}
                   </span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2 mt-1">
                   <div className="bg-neutral-50 dark:bg-neutral-700/30 p-2 rounded-lg flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-400 font-medium uppercase">Check In</span>
                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">{worker.checkIn}</span>
                      </div>
                   </div>
                   <div className="bg-neutral-50 dark:bg-neutral-700/30 p-2 rounded-lg flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-400 font-medium uppercase">Location</span>
                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200 truncate max-w-[100px]" title={worker.location}>{worker.location}</span>
                      </div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}