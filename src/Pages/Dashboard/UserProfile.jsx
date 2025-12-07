import React from "react";

const UserProfile = () => {
  return (
    <div className="rounded-2xl border border-gray-200  p-6 shadow-sm dark:border-gray-800 dark:bg-card-dark sm:p-8">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-display">
        User Profile
      </h3>
      <div className="flex items-start gap-6 sm:items-center">
        <div className="relative">
          <div
            className="h-24 w-24 rounded-full bg-slate-100 bg-cover bg-center ring-4 ring-white dark:ring-card-dark"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRHBywqFiHMlYvcZZcA20QiiTpuY9xK2Hw_TMw6js9Q6vcRjQy-A-pTxPiTpjKEQjKtB78jSflR8fJ8BH0PdiOaJYidGXAYNN18mErT-sWctvGUKo5RTPgiJstJizAwa625AfenszKmwdYsFtxW8LxFMFHMkVMIu9PKs_kFP25jX89CGGAXYwpb2j7kvJvdBKEizQCsSm14-pLChNbl8R1Gfl9gBeMM1Q4ZMiz2W27SkutNtGLbYBlmrLvBqP-VhLXaIum9Ic1WEo')",
            }}
          ></div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Alex Johnson
            </h2>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary dark:bg-primary/20">
              Admin
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">alex.johnson@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
