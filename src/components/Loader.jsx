import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-14 h-14 border-6 border-gray-300 border-t-pink-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
