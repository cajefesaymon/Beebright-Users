import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import logo from '../assets/beebrightlogo.jpg'; // adjust path if needed

const Sidebar = ({ user, menuItems, activeTab, setActiveTab, onLogout }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const safeUser = {
    avatar: user?.avatar || '👤',
    name: user?.name || 'User',
    role: user?.role || 'guest'
  };

  const safeMenuItems = menuItems || [];

  const handleConfirmLogout = () => {
    setShowConfirm(false);
    onLogout(); // Call your actual logout function
  };

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg border-r-2 border-neutral-100">
      {/* Logo & User Info */}
      <div className="p-6 border-b-2 border-neutral-100">
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="BeeBright" className="w-12 h-12 object-contain animate-float" />
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            BeeBright
          </span>
        </div>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{safeUser.avatar}</div>
            <div>
              <div className="font-bold text-neutral-900">{safeUser.name}</div>
              <div className="text-sm text-neutral-600 capitalize">{safeUser.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {safeMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 font-semibold'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <item.icon className={item.color} size={20} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
