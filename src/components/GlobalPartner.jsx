import React from "react";
import Marquee from "./Marquee";

const GlobalPartner = () => {
  return (
    <div className=" my-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-pink-600">
          Global <span className="text-purple-600">Partner</span>
        </h1>
        <p className=" my-3">Decades long relationships with global giants</p>
      </div>
      <Marquee/>
    </div>
  );
};

export default GlobalPartner;
