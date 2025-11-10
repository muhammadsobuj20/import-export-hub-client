import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import Banner from '../components/Banner';

const MainLayout = () => {
  return (
    <div className=''>
   <NavBar/>
  <Banner/>
      <main>
        <Outlet/>
      </main>
      <footer/>
        <Toaster/>
    </div>
  );
};

export default MainLayout;