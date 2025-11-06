// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  Bot,
  BookOpen,
  BarChart2,
  Award,
  Star,
  LogOut,
} from "lucide-react";

/**
 * Sidebar designed to match provided screenshot:
 * - narrow column
 * - BeeBright logo + small student profile card
 * - nav items with small pastel icon bubbles and small descriptions
 * - Today's progress card at bottom
 * - logout in red
 *
 * Replace paths for logoImg and avatarImg with your assets.
 */

export default function Sidebar({ onLogout }) {
  const logoImg = "/assets/bee-logo.png"; // replace with your logo
  const avatarImg = "/assets/student-avatar.png"; // replace with your avatar

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-5 py-6 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={logoImg}
            alt="BeeBright"
            className="w-10 h-10 rounded-md shadow-sm object-cover"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-indigo-500">
            BeeBright
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={avatarImg}
              alt="Student"
              className="w-12 h-12 rounded-md object-cover border border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">Student</p>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" />
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mt-1">Student Profiled</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="space-y-3">
          <NavItem
            icon={<Home size={18} />}
            title="Overview"
            subtitle="Your learning dashboard"
            active
          />
          <NavItem
            icon={<Bot size={18} />}
            title="AI Tutor"
            subtitle="Get instant help"
            badge="NEW"
          />
          <NavItem
            icon={<BookOpen size={18} />}
            title="My Classes"
            subtitle="View your classes"
          />
          <NavItem
            icon={<BarChart2 size={18} />}
            title="My Progress"
            subtitle="Track your learning"
          />
          <NavItem
            icon={<Award size={18} />}
            title="My Badges"
            subtitle="Achievements earned"
          />
        </nav>
      </div>

      {/* Bottom area */}
      <div>
        {/* Today's Progress */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500">Today's Progress</p>
            <p className="text-xs font-semibold text-gray-700">2/3 classes</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "66%" }} />
          </div>
        </div>

        {/* Logout row */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 text-red-500 hover:text-red-600 font-medium"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* Small nav row component that closely matches the visual style in your screenshot */
function NavItem({ icon, title, subtitle, active = false, badge }) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${
        active
          ? "bg-gradient-to-br from-indigo-50 to-pink-50 shadow-sm"
          : "hover:bg-gray-50"
      }`}
    >
      {/* icon bubble */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          active ? "bg-white" : "bg-indigo-50"
        }`}
      >
        {icon}
      </div>

      {/* text */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${active ? "text-indigo-700" : "text-gray-800"}`}>
            {title}
          </span>
          {badge && (
            <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-md font-semibold">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
