import React from "react";
import { Target, PackageCheck, Recycle } from "lucide-react";
import { Link } from "react-router";

const ExportImportMission = () => {
  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 px-6 py-12 bg-blue-50 dark:bg-gray-800">
      {/* Right side: Image */}
      <div className="md:w-1/3">
        <img
          src="/images/mission.jpg"
          alt="Company Mission"
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Left side: Text */}
      <div className="md:w-2/3 space-y-6">
        <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300">
          MISSION
        </h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          Our mission is to deliver world-class export and import services that
          connect Bangladesh to global markets, ensuring quality, transparency,
          and long-term partnerships with clients and suppliers worldwide.
        </p>

        {/* Mission points with icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-700 p-4 rounded-full">
              <Target size={36} className="text-blue-600 dark:text-blue-200" />
            </div>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Ensure Global Trade Standards
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-700 p-4 rounded-full">
              <PackageCheck
                size={36}
                className="text-blue-600 dark:text-blue-200"
              />
            </div>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Maintain Quality & Trust
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-700 p-4 rounded-full">
              <Recycle size={36} className="text-blue-600 dark:text-blue-200" />
            </div>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Promote Sustainable Trade
            </p>
          </div>
        </div>

        {/* Button */}
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

export default ExportImportMission;
