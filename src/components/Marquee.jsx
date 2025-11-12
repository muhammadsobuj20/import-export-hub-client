import React from "react";

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-linear-to-r from-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 border-y border-purple-200 dark:border-gray-600 py-10">
      <p className=" container mx-auto inline-block animate-marquee text-pink-800 dark:text-blue-200 font-semibold text-lg px-4">
        🌍 Welcome to Export-Import Hub | 🛳️ Global Trade | 🚀 Fast Shipping |
        💼 Best Deals | 🌏 Bangladesh Exporters Directory
      </p>
    </div>
  );
};

export default Marquee;
