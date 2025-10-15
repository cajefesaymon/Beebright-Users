import React from "react";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";

export default function App() {
  const location = useLocation();
  const showTopNav = location.pathname === "/"; // only show on home

  return (
    <>
      {showTopNav && <TopNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#F9C80E] border-b-4 border-[#F6AE2D] text-[#1A1A1A] shadow-[0_6px_16px_rgba(0,0,0,.08)]">
      <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/logo.jpg"
            alt="BeeBright Logo"
            className="w-10 h-10 rounded-full object-contain aspect-square bg-white shadow-[0_6px_16px_rgba(0,0,0,.07)] overflow-hidden ring-2 ring-[#1A1A1A]"
          />
          <span className="font-extrabold text-lg tracking-wide">BeeBright Tutorial Center</span>
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Services</NavLink>
          <a href="#why" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Why Us</a>
          <a href="#testimonials" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Testimonials</a>
          <a href="#contact" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Contact</a>

          {/* Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border-2 border-[#1A1A1A] rounded-xl bg-[#FFFDF4] font-semibold shadow-[0_6px_16px_rgba(0,0,0,.07)] hover:bg-[#F6AE2D] hover:text-white transition"
          >
            Login / Register
          </button>
        </nav>

        {/* Mobile login shortcut */}
        <button
          onClick={() => navigate("/login")}
          className="md:hidden px-3 py-2 rounded-lg bg-[#FFFDF4] border border-[#1A1A1A] font-semibold shadow-[0_6px_16px_rgba(0,0,0,.07)]"
          aria-label="Login"
        >
          Login
        </button>
      </div>
    </header>
  );
}
