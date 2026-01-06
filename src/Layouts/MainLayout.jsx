import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../Componants/Shared/Navbar/Navbar";
import Footer from "../Componants/Shared/Footer/Footer";

// import { ToastContainer } from "react-toastify";


const MainLayout = () => {
  const navigatation = useNavigation();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#fdf7e4] fixed top-0 z-100 text-gray-600 shadow-2xl w-full mx-auto">
        <Navbar></Navbar>
      </header>
      <main className="w-full mx-auto pt-17 flex-1">
        {navigatation?.state == "loading" ? (
          <p>Loading.....</p>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      <footer className="w-full mx-auto bg-[#fdf7e4]">
        <Footer></Footer>
      </footer>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default MainLayout;
