import React from "react";

const TicketDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-(--bg-soft-accent) py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 animate-pulse">
        
        {/* 1. Page Header Skeleton */}
        <div className="text-left py-6 mb-6 border-b border-gray-200/10 space-y-3">
          <div className="h-10 sm:h-14 w-3/4 md:w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-5 w-1/2 sm:w-1/3 bg-gray-300/50 dark:bg-gray-700/50 rounded-md" />
        </div>

        {/* 2. Hero Image Skeleton */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-8 bg-gray-300 dark:bg-gray-800">
          {/* Badge & Title Placeholder at bottom */}
          <div className="absolute bottom-6 left-6 right-6 space-y-4">
             <div className="h-6 w-24 bg-gray-400/50 dark:bg-gray-600/50 rounded-full" />
             <div className="h-8 sm:h-12 w-2/3 bg-gray-400/50 dark:bg-gray-600/50 rounded-lg" />
          </div>
        </div>

        {/* 3. Main Details Card Skeleton */}
        <div className="bg-(--bg-card) rounded-3xl border border-(--border-card) p-6 sm:p-10 shadow-lg">
          
          {/* Route Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" /> {/* From */}
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full" /> {/* Arrow */}
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" /> {/* To */}
            </div>
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-xl" /> {/* Transport Type */}
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/10">
             <div className="space-y-2 sm:border-r border-gray-200/10 sm:pr-6">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
                <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg" />
             </div>
             <div className="space-y-2 sm:pl-6">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />
             </div>
          </div>

          {/* Timing Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
             <div className="h-12 w-full sm:w-40 bg-gray-300 dark:bg-gray-700 rounded-xl" /> {/* Date */}
             <div className="h-12 w-full sm:w-32 bg-gray-300 dark:bg-gray-700 rounded-xl" /> {/* Time */}
             <div className="ml-auto h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />     {/* Countdown */}
          </div>

          {/* Perks Section */}
          <div className="mb-10">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-md mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="h-14 w-full bg-gray-300 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsSkeleton;
