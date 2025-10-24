import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // Notification state
  const [notification, setNotification] = useState({ message: '', type: 'info', visible: false });

  const showNotification = (message, type = 'info', duration = 3000) => {
    setNotification({ message, type, visible: true });
    if (duration > 0) {
      setTimeout(() => setNotification((n) => ({ ...n, visible: false })), duration);
    }
  };

  // expose auth + notification
  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    showNotification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* Simple toast notification UI */}
      {notification.visible && (
        <div
          aria-live="polite"
          className="fixed right-6 bottom-6 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg"
          style={{
            background:
              notification.type === 'success'
                ? 'linear-gradient(90deg,#16a34a,#059669)'
                : notification.type === 'error'
                ? 'linear-gradient(90deg,#dc2626,#b91c1c)'
                : 'linear-gradient(90deg,#374151,#111827)',
            color: 'white',
            minWidth: 260
          }}
        >
          <div className="flex-1 text-sm">
            <div className="font-semibold">{notification.message}</div>
          </div>
          <button
            onClick={() => setNotification((n) => ({ ...n, visible: false }))}
            className="ml-3 text-white opacity-90 hover:opacity-100"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;