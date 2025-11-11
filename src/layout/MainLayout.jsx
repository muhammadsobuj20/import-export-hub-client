import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <NavBar />
      <Banner />
      <main>
        <Outlet />
      </main>
      <Footer/>
      <Toaster />
    </div>
  );
};

export default MainLayout;
