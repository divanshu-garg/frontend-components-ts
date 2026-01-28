// import type React from "react";
import logo from "../../assets/logo.png";
import LoginCard from "../LoginCard";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-2 sm:p-6">
      {/* 1. BRANDING SECTION (Above Card) */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <div className="flex items-center justify-center p-3">
            <img
              src={logo}
              alt="gigmedia logo"
              className="w-auto h-20 object-contain"
            />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          GigMedia App
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Empowering your digital workflow
        </p>
      </div>

      {/* 2. MAIN LOGIN CARD */}
      <LoginCard />

      {/* COPYRIGHT */}
      <div className="mt-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Gigmedia App. All rights reserved.
      </div>
    </div>
  );
};

export default LoginPage;
