import React from 'react';
import { LogOut } from 'lucide-react';

const Sidebar = ({ user, menuItems, activeTab, setActiveTab, onLogout }) => {
  // Safety check: Provide default values if user is undefined or missing properties
  const safeUser = {
    avatar: user?.avatar || '👤',
    name: user?.name || 'User',
    role: user?.role || 'guest'
  };

  // Safety check for menuItems
  const safeMenuItems = menuItems || [];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg border-r-2 border-neutral-100">
      {/* Logo & User Info */}
      <div className="p-6 border-b-2 border-neutral-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl animate-float">🐝</div>
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Bee Bright
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
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;