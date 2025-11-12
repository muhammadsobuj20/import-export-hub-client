import React from "react";
import { Globe2, Ship, Warehouse } from "lucide-react"; // lucide-react icons
import { Link } from "react-router";

const ExportImportVision = () => {
  return (
    <section className="flex flex-col md:flex-row container mx-auto items-center justify-center gap-8 px-6 py-12 bg-white dark:bg-gray-900">
      {/* Left side: Image */}
      <div className="md:w-1/3">
        <img
          src="/images/vision.jpg"
          alt="Company Vision"
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Right side: Text */}
      <div className="md:w-2/3 space-y-6">
        <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300">
          VISION
        </h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          Our vision is to become a global leader in international trade by
          expanding Bangladesh’s export potential, ensuring sustainable import
          channels, and empowering local industries to compete in the world
          market.
        </p>

        {/* Three icons + captions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center text-center">
            <div className="bg-pink-100 dark:bg-pink-800 p-4 rounded-full">
              <Globe2 size={36} className="text-pink-600 dark:text-pink-300" />
            </div>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Global Market Expansion
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-pink-100 dark:bg-pink-800 p-4 rounded-full">
              <Ship size={36} className="text-pink-600 dark:text-pink-300" />
            </div>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Strengthen Export Operations
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-pink-100 dark:bg-pink-800 p-4 rounded-full">
              <Warehouse
                size={36}
                className="text-pink-600 dark:text-pink-300"
              />
            </div>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Build Modern Import Hubs
            </p>
          </div>
        </div>

        {/* Know More button */}
        <button> 
          <Link to="/" className="mt-6 flex items-center gap-2 text-white 
        bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-600 duration-300 shadow-md px-6 py-2 rounded-full transition-all">
          Know More →
        </Link>
        </button>
      </div>
    </section>
  );
};

export default ExportImportVision;
