import React from "react";
import {
  Home,
  Bot,
  BookOpen,
  BarChart2,
  Award,
  Star,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/beebrightlogo.jpg";
import defaultAvatar from "../assets/student-avatar.png";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const avatarImg = user?.avatar || defaultAvatar;

  const iconColors = {
    Home: "text-blue-500",
    Bot: "text-purple-500",
    BookOpen: "text-green-500",
    BarChart2: "text-orange-500",
    Award: "text-yellow-500",
    User: "text-pink-500",
  };

  const navItems = [
    { icon: Home, title: "Overview", subtitle: "Your dashboard", path: "/dashboard" },
    { icon: Bot, title: "AI Tutor", subtitle: "Get instant help", badge: "NEW", path: "/ai-tutor" },
    { icon: BookOpen, title: "My Classes", subtitle: "View your classes", path: "/classes" },
    { icon: BarChart2, title: "My Progress", subtitle: "Track learning", path: "/progress" },
    { icon: Award, title: "My Badges", subtitle: "Achievements", path: "/badges" },
    { icon: User, title: "Profile", subtitle: "Change password", path: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-5 py-6 flex flex-col justify-between">
      <div>
        {/* 🐝 Logo */}
        <div
          className="flex items-center gap-3 mb-6 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={logoImg}
            alt="BeeBright"
            className="w-10 h-10 rounded-md shadow-sm object-cover"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-indigo-500">
            BeeBright
          </h1>
        </div>

        {/* 👤 Profile Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={avatarImg}
              alt="Student"
              className="w-12 h-12 rounded-md object-cover border border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Student"}
                </p>
                <Star size={14} className="text-yellow-400" />
              </div>
              <p className="text-[12px] text-gray-500 mt-1">
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "Student Profile"}
              </p>
            </div>
          </div>
        </div>

        {/* 📚 Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            const color = iconColors[item.icon.name] || "text-indigo-500";

            return (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-br from-indigo-50 to-pink-50 shadow-md"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isActive
                      ? `bg-white ring-2 ring-offset-2 ring-indigo-300 ${color}`
                      : `bg-gray-100 ${color} hover:scale-105`
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-indigo-700" : "text-gray-800"
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-md font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* 📊 Bottom Progress + Logout */}
      <div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500">Today's Progress</p>
            <p className="text-xs font-semibold text-gray-700">2/3 classes</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-yellow-400 rounded-full"
              style={{ width: "66%" }}
            />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-red-500 hover:text-red-600 font-medium transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
