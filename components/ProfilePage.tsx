import React, { useState } from "react";
import { Mail, MapPin, Phone, Building, Calendar, Globe, Award, LogOut, Settings as SettingsIcon, User } from "lucide-react";
import SettingsPage from "./SettingsPage";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  const handleLogout = () => {
    // Demo logout functionality
    alert("Logging out...");
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 opacity-50 z-0"></div>
        
        <div className="relative z-10 mt-4 md:mt-0">
            <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-md"
            />
        </div>
        
        <div className="text-center md:text-left space-y-2 flex-1 relative z-10 pt-4 md:pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Manu Arora</h1>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium">Senior Operations Manager</p>
             </div>
             <button 
                onClick={() => setActiveTab('settings')}
                className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm text-sm"
             >
                Edit Profile
             </button>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 mt-4 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-neutral-400" />
                <span>Acet Labs</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>San Francisco, CA</span>
            </div>
             <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span>Joined Jan 2022</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-6">
            <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'profile' 
                    ? 'text-neutral-900 dark:text-white' 
                    : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
                }`}
            >
                <User className="w-4 h-4" />
                Overview
                {activeTab === 'profile' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 dark:bg-white rounded-t-full" />
                )}
            </button>
            <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'settings' 
                    ? 'text-neutral-900 dark:text-white' 
                    : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
                }`}
            >
                <SettingsIcon className="w-4 h-4" />
                Settings
                {activeTab === 'settings' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 dark:bg-white rounded-t-full" />
                )}
            </button>
        </div>
        <button 
            onClick={handleLogout}
            className="flex items-center gap-2 pb-3 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
            <LogOut className="w-4 h-4" />
            Logout
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'settings' ? (
        <SettingsPage />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-300">
            {/* Left Column: Contact & Stats */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                        Contact Information
                    </h2>
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 group">
                            <div className="p-2.5 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700 transition-colors">
                                <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-neutral-400 mb-0.5">Email Address</p>
                                <p className="text-sm font-medium truncate select-all">manu.arora@acetlabs.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 group">
                            <div className="p-2.5 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700 transition-colors">
                                <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-neutral-400 mb-0.5">Phone Number</p>
                                <p className="text-sm font-medium truncate">+1 (555) 000-0000</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 group">
                            <div className="p-2.5 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700 transition-colors">
                                <Globe className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-neutral-400 mb-0.5">Website</p>
                                <p className="text-sm font-medium truncate text-blue-600 dark:text-blue-400 cursor-pointer">acetlabs.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-neutral-900 dark:bg-neutral-800 p-6 rounded-2xl shadow-sm text-white space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Performance
                    </h2>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-3 rounded-xl bg-neutral-800 dark:bg-neutral-700">
                            <p className="text-xs text-neutral-400 mb-1">Projects</p>
                            <p className="text-2xl font-bold">24</p>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-800 dark:bg-neutral-700">
                            <p className="text-xs text-neutral-400 mb-1">Team Size</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-800 dark:bg-neutral-700 col-span-2">
                            <p className="text-xs text-neutral-400 mb-1">Efficiency Rate</p>
                            <p className="text-2xl font-bold text-green-400">98.5%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Bio & Skills */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 h-full">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">About Me</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300">
                        <p className="mb-4 leading-relaxed">
                            I am a dedicated Senior Operations Manager with over 8 years of experience in the technology sector, specializing in optimizing workflows and leading high-performing teams. My passion lies in bridging the gap between strategic vision and operational execution.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            At Acet Labs, I oversee daily operations, resource allocation, and project management standards. I believe in fostering a collaborative environment where innovation thrives. My background includes successfully scaling operations for two previous startups and implementing agile methodologies that improved delivery times by 40%.
                        </p>
                        <p className="leading-relaxed">
                            When I'm not optimizing processes, you can find me hiking the trails of the Bay Area or experimenting with new coffee brewing techniques.
                        </p>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-700">
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">Core Competencies</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Strategic Planning", "Team Leadership", "Process Optimization", "Agile Methodology", "Budget Management", "Cross-functional Collaboration", "Data Analysis", "Risk Management"].map((skill) => (
                                <span key={skill} className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 text-sm rounded-lg font-medium hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}