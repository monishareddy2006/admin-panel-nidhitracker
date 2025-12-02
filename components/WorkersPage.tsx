import React, { useState, useMemo } from "react";
import { UserPlus, Edit2, Trash2, ArrowLeft, BarChart2, Check, X, Clock, ChevronRight, AlertCircle, User, ImageIcon, ExternalLink, Calendar, Briefcase, Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type Event = {
  id: number;
  name: string;
  date: string;
  cost: number;
};

type WorkerStatus = "Active" | "On Leave" | "Pending" | "Rejected";

type Worker = {
  id: number;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  address?: string;
  spent: number;
  status: WorkerStatus;
  billsUploaded: number;
  events: Event[];
};

// Mock Data
const INITIAL_WORKERS_DATA: Worker[] = [
  { 
    id: 4, 
    name: "Sarah Connor", 
    role: "Apprentice", 
    email: "sarah.connor@example.com",
    phone: "+1 (555) 010-9988",
    address: "Los Angeles, CA",
    spent: 0, 
    status: "Pending",
    billsUploaded: 0,
    events: []
  },
  { 
    id: 5, 
    name: "James Cameron", 
    role: "Site Manager", 
    email: "james.c@example.com",
    phone: "+1 (555) 012-3456",
    address: "Malibu, CA",
    spent: 0, 
    status: "Pending",
    billsUploaded: 0,
    events: []
  },
  { 
    id: 1, 
    name: "John Doe", 
    role: "Field Technician", 
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Springfield",
    spent: 450, 
    status: "Active",
    billsUploaded: 3,
    events: [
      { id: 101, name: "Site Visit: Downtown", date: "Feb 10", cost: 120 },
      { id: 102, name: "Fuel Refill", date: "Feb 12", cost: 55 },
      { id: 103, name: "Tools Maintenance", date: "Feb 15", cost: 275 },
    ]
  },
  { 
    id: 2, 
    name: "Alice Smith", 
    role: "Logistics", 
    email: "alice.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Metropolis",
    spent: 1200, 
    status: "Active",
    billsUploaded: 5,
    events: [
      { id: 201, name: "Delivery Run #1", date: "Feb 05", cost: 300 },
      { id: 202, name: "Warehouse Supplies", date: "Feb 08", cost: 500 },
      { id: 203, name: "Vehicle Service", date: "Feb 20", cost: 400 },
    ]
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    role: "Driver", 
    email: "mike.j@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Ln, Smallville",
    spent: 200, 
    status: "On Leave",
    billsUploaded: 2,
    events: [
      { id: 301, name: "Fuel", date: "Jan 28", cost: 80 },
      { id: 302, name: "Parking Fees", date: "Jan 29", cost: 120 },
    ]
  },
];

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS_DATA);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleStatusChange = (id: number, newStatus: WorkerStatus) => {
    setWorkers(workers.map(w => w.id === id ? { ...w, status: newStatus } : w));
    // If we are currently viewing this worker, close the detail view to return to list
    if (selectedWorker?.id === id) {
        setSelectedWorker(null);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      setWorkers(workers.filter(w => w.id !== id));
      if (selectedWorker?.id === id) {
        setSelectedWorker(null);
      }
    }
  };

  const handleAddWorker = (data: { name: string, role: string, email: string, phone: string, address: string }) => {
    const newWorker: Worker = {
        id: Math.max(...workers.map(w => w.id), 0) + 1,
        name: data.name,
        role: data.role,
        email: data.email,
        phone: data.phone,
        address: data.address,
        spent: 0,
        status: "Active", // Manually added workers are Active by default
        billsUploaded: 0,
        events: []
    };
    setWorkers([newWorker, ...workers]);
    setShowAddModal(false);
  };

  const getStatusBadgeStyles = (status: WorkerStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300";
    }
  };

  // Filter workers for separate sections
  const pendingWorkers = workers.filter(w => w.status === 'Pending');
  const activeWorkers = workers.filter(w => w.status !== 'Pending');

  if (selectedWorker) {
    return (
      <WorkerDetailView 
        worker={selectedWorker} 
        onBack={() => setSelectedWorker(null)} 
        onUpdateStatus={handleStatusChange}
      />
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 flex flex-col relative">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Workers Management</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Manage your team and approve new requests</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Worker</span>
        </button>
      </div>

      {/* Main Directory Column */}
      <div className="w-full bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Employee Directory</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-300">
            <thead className="bg-neutral-100 dark:bg-neutral-700/50 text-neutral-900 dark:text-white font-semibold">
                <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Spent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {activeWorkers.map((worker) => (
                <tr 
                    key={worker.id} 
                    onClick={() => setSelectedWorker(worker)}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors cursor-pointer group"
                >
                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{worker.name}</td>
                    <td className="px-6 py-4">{worker.role}</td>
                    <td className="px-6 py-4">
                        <span className="font-medium text-neutral-900 dark:text-white">
                            ${worker.spent.toLocaleString()}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1.5 ${getStatusBadgeStyles(worker.status)}`}>
                        {worker.status}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                        <button className="p-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Edit">
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(worker.id); }}
                            className="p-1 hover:text-red-600 dark:hover:text-red-400 transition-colors" 
                            title="Delete"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
                {activeWorkers.length === 0 && (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-neutral-500 dark:text-neutral-400">
                            No active workers found.
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>

      {/* Pending Approvals Section (Below Directory) */}
      {pendingWorkers.length > 0 && (
        <div className="w-full space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-400">Pending Approvals</h3>
                    <p className="text-xs text-yellow-700 dark:text-yellow-500/80 mt-1">
                        You have {pendingWorkers.length} pending worker application{pendingWorkers.length > 1 ? 's' : ''} to review.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {pendingWorkers.map((worker) => (
                    <div key={worker.id} className="bg-white dark:bg-neutral-800 p-5 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900 dark:text-white">{worker.name}</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{worker.role}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleStatusChange(worker.id, 'Rejected')}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <X className="w-4 h-4" /> Reject
                            </button>
                            <button 
                                onClick={() => handleStatusChange(worker.id, 'Active')}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                <Check className="w-4 h-4" /> Accept
                            </button>
                        </div>
                        <button 
                            onClick={() => setSelectedWorker(worker)}
                            className="w-full text-center text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 mt-3 font-medium transition-colors"
                        >
                            Review details
                        </button>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Add Worker Modal */}
      <AnimatePresence>
        {showAddModal && <AddWorkerModal onClose={() => setShowAddModal(false)} onAdd={handleAddWorker} />}
      </AnimatePresence>
    </div>
  );
}

function WorkerDetailView({ 
    worker, 
    onBack,
    onUpdateStatus
}: { 
    worker: Worker; 
    onBack: () => void;
    onUpdateStatus: (id: number, status: WorkerStatus) => void;
}) {
  const [showBills, setShowBills] = useState(false);
  // Find max cost for graph scaling, default to 100 if no events
  const maxCost = Math.max(...worker.events.map(e => e.cost), 100);

  // Group events by month
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: Event[] } = {};
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    worker.events.forEach(event => {
      // split "Feb 10" -> "Feb"
      const monthShort = event.date.split(' ')[0];
      if (!groups[monthShort]) {
        groups[monthShort] = [];
      }
      groups[monthShort].push(event);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => monthOrder.indexOf(b) - monthOrder.indexOf(a)) // Descending order (Latest month first)
      .map(([month, events]) => ({
        month,
        events
      }));
  }, [worker.events]);

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in duration-300 relative flex flex-col min-h-full">
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
            <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
            >
            <ArrowLeft className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
            </button>
            <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{worker.name}</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{worker.role} • {worker.status}</p>
            </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">Contact Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                        <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-400">Email Address</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{worker.email || "N/A"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                        <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-400">Phone Number</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{worker.phone || "N/A"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                        <MapPin className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-400">Address</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{worker.address || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Graph Section */}
            <div className="md:col-span-2 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-neutral-500" />
                    Spending per Event
                </h2>
            </div>
            
            <div className="h-64 flex items-end gap-4 px-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700">
                {worker.events.map((event) => (
                    <div key={event.id} className="flex flex-col items-center gap-2 flex-1 min-w-[80px] group cursor-default">
                        <div className="relative w-full flex justify-center h-[200px] items-end">
                            {/* Tooltip */}
                            <div className="absolute bottom-[calc(100%+8px)] opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none mb-1">
                                ${event.cost}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"></div>
                            </div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(event.cost / maxCost) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-12 bg-blue-500/90 dark:bg-blue-600/90 rounded-t-md group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors"
                            ></motion.div>
                        </div>
                        <div className="text-center w-full">
                            <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 truncate w-full px-1" title={event.name}>{event.name}</p>
                            <p className="text-xs text-neutral-400">{event.date}</p>
                        </div>
                    </div>
                ))}
                {worker.events.length === 0 && (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 text-sm gap-2">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                            <BarChart2 className="h-6 w-6 opacity-30" />
                        </div>
                        No events recorded yet.
                    </div>
                )}
            </div>
            </div>

            {/* Stats / Details */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Total Spent</h3>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">${worker.spent.toLocaleString()}</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Total Events</h3>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">{worker.events.length}</p>
                </div>

                <div 
                    onClick={() => worker.billsUploaded > 0 && setShowBills(true)}
                    className={`bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 ${worker.billsUploaded > 0 ? 'cursor-pointer hover:ring-2 hover:ring-neutral-200 dark:hover:ring-neutral-700 transition-all' : ''}`}
                >
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">No. of bills uploaded</h3>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">{worker.billsUploaded}</p>
                    {worker.billsUploaded > 0 && <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium flex items-center gap-1">Click to view images <ChevronRight className="w-3 h-3" /></p>}
                </div>
            </div>
        </div>
        
        {/* Event List Table */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Recent Events Log</h3>
            </div>
            <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-300">
            <thead className="bg-neutral-50 dark:bg-neutral-700/30 text-neutral-900 dark:text-white">
                <tr>
                <th className="px-6 py-3 font-medium">Event Name</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Cost</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {groupedEvents.length > 0 ? (
                  groupedEvents.map((group) => (
                    <React.Fragment key={group.month}>
                      <tr className="bg-neutral-50/50 dark:bg-neutral-800/80">
                        <td colSpan={3} className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                          {group.month}
                        </td>
                      </tr>
                      {group.events.map((event) => (
                        <tr key={event.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/20">
                            <td className="px-6 py-3 font-medium text-neutral-800 dark:text-neutral-200">{event.name}</td>
                            <td className="px-6 py-3">{event.date}</td>
                            <td className="px-6 py-3 text-right font-medium text-neutral-900 dark:text-white">${event.cost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">No recent events found.</td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>

      {/* Sticky Bottom Action Bar for Pending Workers */}
      {worker.status === 'Pending' && (
        <div className="sticky bottom-0 -mx-6 -mb-6 md:-mx-8 md:-mb-8 mt-6 p-4 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 animate-in slide-in-from-bottom-4">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
                Reviewing application for <span className="font-semibold text-neutral-900 dark:text-white">{worker.name}</span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
                <button 
                    onClick={() => onUpdateStatus(worker.id, 'Rejected')} 
                    className="flex-1 sm:flex-none px-6 py-2.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                >
                    <X className="h-4 w-4" />
                    Reject
                </button>
                <button 
                    onClick={() => onUpdateStatus(worker.id, 'Active')} 
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                    <Check className="h-4 w-4" />
                    Accept Worker
                </button>
            </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
         {showBills && <WorkerBillsModal worker={worker} onClose={() => setShowBills(false)} />}
      </AnimatePresence>
    </div>
  );
}

function AddWorkerModal({ onClose, onAdd }: { onClose: () => void, onAdd: (data: { name: string, role: string, email: string, phone: string, address: string }) => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !role) return;
    onAdd({
        name: `${firstName} ${lastName}`,
        role: role,
        email: email,
        phone: phone,
        address: address
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
        className="relative bg-white dark:bg-neutral-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Add New Worker</h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">First Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white"
                        placeholder="e.g. Jane"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white"
                        placeholder="e.g. Doe"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white"
                        placeholder="jane.doe@example.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Role / Position <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                            type="text" 
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white"
                            placeholder="e.g. Field Technician"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Address</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                    <textarea 
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white resize-none"
                        placeholder="123 Worker Street, City, State"
                    />
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    Add Worker
                </button>
            </div>
        </form>
      </motion.div>
    </div>
  )
}

function WorkerBillsModal({ worker, onClose }: { worker: Worker; onClose: () => void }) {
  // Generate pseudo-random bills based on the worker's data to simulate fetching specific bills
  // In a real app, you would fetch bills by worker ID
  const bills = Array.from({ length: worker.billsUploaded || 4 }).map((_, i) => {
    // Deterministic mock data for demo consistency
    const categories = ['Fuel', 'Materials', 'Travel', 'Meals'];
    const category = categories[(worker.id + i) % categories.length];
    const amount = ((worker.id * 100) + (i * 25.5) + 10).toFixed(2);
    const date = `Feb ${10 + (i % 10)}, 2025`;
    const imageId = [
        '1554224155-8d04cb21cd6c', 
        '1554224154-260327c0d11e', 
        '1518186285589-2f7649de83e0', 
        '1580048914979-3c7817430560'
    ][i % 4];

    return {
        id: 5000 + i,
        category,
        amount,
        date,
        image: `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=400`
    };
  });

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
                <div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Uploaded Bills
                        </h2>
                        <p className="text-sm text-neutral-500">Receipts submitted by {worker.name}</p>
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
                                    alt={`Bill receipt`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="flex items-center gap-2 text-white text-sm font-medium bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-colors border border-white/40">
                                        <ExternalLink className="w-4 h-4" />
                                        View Full
                                        </button>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-neutral-900 dark:text-white shadow-sm">
                                    #{bill.id}
                                </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-semibold text-neutral-900 dark:text-white text-lg">${bill.amount}</p>
                                        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{bill.category}</p>
                                    </div>
                                </div>
                                <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-700 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {bill.date}
                                </div>
                                </div>
                        </div>
                    ))}
                    {bills.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-neutral-500">
                            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                                <ImageIcon className="w-8 h-8 opacity-40" />
                            </div>
                            <p>No bills uploaded by this worker.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    </div>
  )
}