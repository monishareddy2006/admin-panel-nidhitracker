import React, { useState } from "react";
import { 
  Plus, X, Bell, DollarSign, Save, 
  User, Shield, Database, Globe, 
  HelpCircle, AlertCircle, Building, 
  ChevronRight, Lock, Smartphone, Download, Trash2, Mail
} from "lucide-react";
import { cn } from "../lib/utils";

type SettingsSection = 'edit' | 'organization' | 'notifications' | 'privacy' | 'storage' | 'language' | 'account' | 'help';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('edit');

  // --- State for Organization Settings (Preserved) ---
  const [categories, setCategories] = useState<string[]>(["Food", "Travel", "Fuel", "Office Supplies"]);
  const [newCategory, setNewCategory] = useState("");
  const [budget, setBudget] = useState("5000");
  const [isBudgetSaved, setIsBudgetSaved] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState(80);

  // --- Handlers for Organization Settings ---
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleSaveBudget = () => {
    setIsBudgetSaved(true);
    setTimeout(() => setIsBudgetSaved(false), 2000);
  };

  const menuItems = [
    { id: 'edit', label: 'Edit Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'storage', label: 'Data & Storage', icon: Database },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'account', label: 'Account Status', icon: AlertCircle },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 animate-in fade-in duration-500">
      
      {/* Settings Sidebar Navigation */}
      <nav className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden sticky top-6">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="font-bold text-neutral-900 dark:text-white">Settings</h2>
          </div>
          <div className="p-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SettingsSection)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-4 w-4", activeSection === item.id ? "text-neutral-900 dark:text-white" : "text-neutral-500")} />
                  {item.label}
                </div>
                {activeSection === item.id && <ChevronRight className="h-4 w-4 text-neutral-400" />}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        
        {/* EDIT PROFILE SECTION */}
        {activeSection === 'edit' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Edit Profile</h2>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6">
              <div className="flex items-center gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3540&q=80" 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-neutral-100 dark:border-neutral-700"
                />
                <div>
                  <button className="bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-neutral-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">First Name</label>
                  <input type="text" defaultValue="Manu" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Name</label>
                  <input type="text" defaultValue="Arora" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Job Title</label>
                <input type="text" defaultValue="Senior Operations Manager" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Bio</label>
                <textarea rows={4} defaultValue="I am a dedicated Senior Operations Manager with over 8 years of experience..." className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white resize-none" />
              </div>

              <div className="flex justify-end pt-4">
                <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ORGANIZATION SECTION (Existing Logic) */}
        {activeSection === 'organization' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Organization Settings</h2>

            {/* Categories Section */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Expense Categories</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                    <div key={cat} className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 px-3 py-1.5 rounded-full text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    <span>{cat}</span>
                    <button onClick={() => handleRemoveCategory(cat)} className="hover:text-red-500">
                        <X className="h-3 w-3" />
                    </button>
                    </div>
                ))}
                </div>
                <div className="flex gap-2">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    placeholder="New category name"
                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none dark:text-white"
                />
                <button onClick={handleAddCategory} className="bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90">
                    <Plus className="h-4 w-4" /> Add
                </button>
                </div>
            </div>

            {/* Monthly Budget Section */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Monthly Budget Limit</h2>
                <div className="flex items-end gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Total Limit (USD)</label>
                    <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-transparent text-lg font-semibold text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 outline-none"
                    />
                    </div>
                </div>
                <button onClick={handleSaveBudget} className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${isBudgetSaved ? "bg-green-600 text-white" : "bg-neutral-900 dark:bg-white text-white dark:text-black hover:opacity-90"}`}>
                    {isBudgetSaved ? "Saved!" : <><Save className="h-4 w-4" /> Save</>}
                </button>
                </div>
            </div>

            {/* Budget Alerts Section */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Budget Alerts</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Get notified when spending nears the limit.</p>
                    </div>
                    <div onClick={() => setAlertsEnabled(!alertsEnabled)} className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${alertsEnabled ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${alertsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </div>
                {alertsEnabled && (
                    <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Alert Threshold</span>
                            <span className="text-sm font-bold text-neutral-900 dark:text-white">{alertThreshold}%</span>
                        </div>
                        <input type="range" min="50" max="95" value={alertThreshold} onChange={(e) => setAlertThreshold(Number(e.target.value))} className="w-full h-2 bg-neutral-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white" />
                        <div className="flex items-start gap-3 mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
                            <Bell className="h-5 w-5 flex-shrink-0" />
                            <p>Alert triggers at ${(Number(budget) * alertThreshold / 100).toLocaleString()}.</p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS SECTION */}
        {activeSection === 'notifications' && (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Notifications</h2>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700">
                    {[
                        { title: "Email Notifications", desc: "Receive daily digests and weekly reports.", icon: Mail },
                        { title: "Push Notifications", desc: "Get real-time alerts on mobile devices.", icon: Smartphone },
                        { title: "Marketing Updates", desc: "Receive news about product updates.", icon: Globe }
                    ].map((item, idx) => (
                        <div key={idx} className="p-6 flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                                    <item.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900 dark:text-white">{item.title}</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                                </div>
                            </div>
                            <div className="w-11 h-6 bg-neutral-200 dark:bg-neutral-600 rounded-full relative cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* PRIVACY & SECURITY SECTION */}
        {activeSection === 'privacy' && (
             <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Privacy & Security</h2>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Change Password</h3>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Current Password</label>
                            <input type="password" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">New Password</label>
                                <input type="password" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirm Password</label>
                                <input type="password" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white" />
                            </div>
                        </div>
                        <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium text-sm">Update Password</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                             <Lock className="h-5 w-5 text-neutral-500" />
                             Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-neutral-500 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors dark:text-white">Enable 2FA</button>
                </div>
            </div>
        )}

        {/* DATA & STORAGE SECTION */}
        {activeSection === 'storage' && (
             <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Data & Storage</h2>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Storage Usage</h3>
                    <div className="mb-2 flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Used 4.2 GB</span>
                        <span className="text-neutral-900 dark:text-white font-medium">10 GB Total</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden mb-6">
                        <div className="h-full bg-neutral-900 dark:bg-neutral-100 w-[42%] rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                            <span className="block text-2xl font-bold text-neutral-900 dark:text-white">2.1 GB</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Reports</span>
                        </div>
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                            <span className="block text-2xl font-bold text-neutral-900 dark:text-white">1.8 GB</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Images</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-4">
                    <div className="flex items-center justify-between">
                         <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white">Export Data</h4>
                            <p className="text-sm text-neutral-500">Download a copy of your personal data.</p>
                         </div>
                         <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 dark:text-white">
                            <Download className="h-4 w-4" /> Download
                         </button>
                    </div>
                    <div className="h-px bg-neutral-100 dark:bg-neutral-700"></div>
                    <div className="flex items-center justify-between">
                         <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white">Clear Cache</h4>
                            <p className="text-sm text-neutral-500">Free up space on your device.</p>
                         </div>
                         <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 dark:text-white">
                            Clear
                         </button>
                    </div>
                </div>
            </div>
        )}

        {/* LANGUAGE SECTION */}
        {activeSection === 'language' && (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Language & Region</h2>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Display Language</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white">
                            <option>English (United States)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Time Zone</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:text-white">
                            <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                            <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                            <option>(GMT+00:00) London</option>
                            <option>(GMT+01:00) Paris</option>
                        </select>
                    </div>
                </div>
            </div>
        )}

        {/* ACCOUNT STATUS SECTION */}
        {activeSection === 'account' && (
             <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Account Status</h2>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Active</h3>
                        <p className="text-sm text-neutral-500">Your account is fully verified and active.</p>
                    </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-600/80 dark:text-red-400/70 mb-6">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-red-600 border border-red-200 dark:border-red-900/50 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            Deactivate Account
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Delete Account
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* HELP SECTION */}
        {activeSection === 'help' && (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Help & Support</h2>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {[
                            "How do I reset my password?",
                            "Where can I find my monthly reports?",
                            "How do I add a new worker?",
                            "Can I change the currency?"
                        ].map((q, i) => (
                            <div key={i} className="p-4 border border-neutral-100 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/30 cursor-pointer transition-colors flex justify-between items-center group">
                                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{q}</span>
                                <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Need more help?</h3>
                        <p className="text-sm text-neutral-500 mb-4">Our support team is available 24/7 to assist you.</p>
                        <button className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm">Contact Support</button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
