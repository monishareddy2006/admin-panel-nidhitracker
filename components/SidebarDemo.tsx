import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { LayoutDashboard, Users, PieChart } from "lucide-react";
import { Link, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ManagerDashboard } from "./ManagerDashboard";
import WorkersPage from "./WorkersPage";
import ReportsPage from "./ReportsPage";
import ProfilePage from "./ProfilePage";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Workers",
      href: "/workers",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Reports",
      href: "/reports",
      icon: (
        <PieChart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Profile",
                href: "/profile",
                icon: (
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 overflow-hidden">
        <Routes>
            <Route 
                path="/" 
                element={<ManagerDashboard className="md:rounded-tl-2xl border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-700" />} 
            />
            <Route 
                path="/workers" 
                element={
                    <div className={cn("flex flex-col h-full w-full bg-gray-50 dark:bg-neutral-900 overflow-y-auto", "md:rounded-tl-2xl border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-700")}>
                        <WorkersPage />
                    </div>
                } 
            />
            <Route 
                path="/reports" 
                element={
                    <div className={cn("flex flex-col h-full w-full bg-gray-50 dark:bg-neutral-900 overflow-y-auto", "md:rounded-tl-2xl border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-700")}>
                        <ReportsPage />
                    </div>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <div className={cn("flex flex-col h-full w-full bg-gray-50 dark:bg-neutral-900 overflow-y-auto", "md:rounded-tl-2xl border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-700")}>
                        <ProfilePage />
                    </div>
                } 
            />
        </Routes>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};