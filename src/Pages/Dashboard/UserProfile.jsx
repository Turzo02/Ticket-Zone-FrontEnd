import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import useAuth from "../../Hooks/useAuth";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import { Mail, ShieldCheck, UserCheck, CalendarDays } from "lucide-react";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: loggedInUser = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["UserProfile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-(--bg-card) rounded-3xl border border-(--border-card)">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 dark:bg-red-900/10 dark:border-red-900/30 font-bold text-center">
        Failed to load user profile.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* 1. Main Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-(--bg-card) border border-(--border-card) shadow-xl shadow-black/5">
        
        {/* Banner / Header Background */}
        <div className="h-32 sm:h-20 w-full bg-linear-to-r from-(--grad-start) to-(--grad-end) relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-8  sm:px-10">
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 gap-6 text-center sm:text-left">
            
            {/* Avatar with Ring */}
            <div className="relative group">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full p-1.5 bg-(--bg-card) shadow-xl">
                <div 
                  className="h-full w-full rounded-full bg-cover bg-center border border-(--border-card) bg-gray-200"
                  style={{ backgroundImage: `url('${loggedInUser.photoURL || user?.photoURL}')` }}
                ></div>
              </div>
              {/* Online Indicator */}
              <div className="absolute bottom-1 md:bottom-3 lg:bottom-4 right-2 w-5 h-5 bg-emerald-500 border-4 border-(--bg-card) rounded-full" title="Online"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 pb-2 space-y-1">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h2 className="text-3xl font-black text-(--text-main) tracking-tight">
                  {loggedInUser.name}
                </h2>
                
                {/* Role Badge */}
                <span className="
                  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                  bg-linear-to-r from-(--grad-start) to-(--grad-end) text-(--text-inv)
                  shadow-lg shadow-(--grad-start)/20
                ">
                  {loggedInUser.role}
                </span>
              </div>
              
              <p className="text-(--text-muted) font-medium flex items-center justify-center sm:justify-start gap-2">
                 <Mail size={16} className="text-(--grad-start)" />
                 {loggedInUser.email}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Stats / Info Grid (Using your new variables) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Account Status */}
        <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-card) flex items-center gap-4 hover:border-(--border-hover) transition-colors shadow-sm">
           <div className="p-3 rounded-xl bg-(--success-bg) text-(--success-text)">
              <UserCheck size={24} />
           </div>
           <div>
              <p className="text-xs font-bold uppercase text-(--text-muted) tracking-wider">Status</p>
              <p className="text-lg font-black text-(--text-main)">Active</p>
           </div>
        </div>

        {/* Member Since */}
        <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-card) flex items-center gap-4 hover:border-(--border-hover) transition-colors shadow-sm">
           <div className="p-3 rounded-xl bg-(--icon-bg) text-(--grad-start)">
              <CalendarDays size={24} />
           </div>
           <div>
              <p className="text-xs font-bold uppercase text-(--text-muted) tracking-wider">Joined</p>
              <p className="text-lg font-black text-(--text-main)">
                {user?.metadata?.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString() 
                  : "N/A"}
              </p>
           </div>
        </div>

        {/* Verification */}
        <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-card) flex items-center gap-4 hover:border-(--border-hover) transition-colors shadow-sm">
           <div className="p-3 rounded-xl bg-(--icon-bg) text-(--grad-end)">
              <ShieldCheck size={24} />
           </div>
           <div>
              <p className="text-xs font-bold uppercase text-(--text-muted) tracking-wider">Verified</p>
              <p className="text-lg font-black text-(--text-main)">
                Yes
              </p>
           </div>
        </div>

      </div>

    </div>
  );
};

export default UserProfile;
