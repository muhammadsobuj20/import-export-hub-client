import React from "react";

const Marquee = () => {
  const logos = [
    "/ankor.svg",
    "/apple-11.svg",
    "/carlsberg-export-logo.svg",
    "/dell-2.svg",
    "/export-focus.svg",
    "/hp-2.svg",
    "/lg-company.svg",
    "/nvidia.svg",
    "/philips.svg",
    "/ptt-public-company-logo.svg",
    "/russian-export-today.svg",
    "/samsung-7.svg",
    "/sony-2.svg",
    "/the-export-partnership.svg",
    "/wood-export-company.svg",
    "/yuva-training-institute-of-import-export.svg",
  ];

  return (
     <div className="relative overflow-hidden bg-linear-to-r from-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 border-y border-purple-200 dark:border-gray-600 py-10">
    
      {/* Logo marquee */}
      <div className="flex gap-12 animate-marquee-horizontal">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`logo-${i}`}
            className="h-12 w-auto opacity-80 hover:opacity-100 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default Marquee;
