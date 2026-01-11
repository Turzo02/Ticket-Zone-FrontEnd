import React from 'react';

const TicketCardSkeleton = () => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-(--bg-card) border border-(--border-card) animate-pulse h-full">
      
      {/* 1. Image Placeholder */}
      <div className="relative h-48 w-full bg-gray-300/50 dark:bg-gray-700/50">
        {/* Mimics the Title Badge at bottom */}
        <div className="absolute bottom-3 left-4 h-6 w-3/4 bg-gray-400/50 dark:bg-gray-600/50 rounded-md" />
      </div>

      {/* 2. Body Section */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        
        {/* Price Row */}
        <div className="flex justify-between items-end pb-3 border-b border-gray-200/20">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded-full" /> {/* 'Price' Label */}
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />   {/* Price Value */}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-3 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />  {/* 'Left' Label */}
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded-md" />   {/* Seat Count */}
          </div>
        </div>

        {/* Info Grid (Transport & Date) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 rounded-lg bg-gray-300/30 dark:bg-gray-700/30" />
          <div className="h-10 rounded-lg bg-gray-300/30 dark:bg-gray-700/30" />
        </div>

        {/* Perks Section */}
        <div className="mt-2">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-2.5" /> {/* 'Included Perks' Label */}
          <div className="flex flex-wrap gap-1.5">
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>

      {/* 3. Action Button */}
      <div className="p-5 pt-0 mt-auto">
        <div className="h-12 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default TicketCardSkeleton;
