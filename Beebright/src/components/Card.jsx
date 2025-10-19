import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export const StatCard = ({ icon, value, label, color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-blue-100 bg-blue-50',
    green: 'border-green-100 bg-green-50',
    purple: 'border-purple-100 bg-purple-50',
    orange: 'border-orange-100 bg-orange-50',
    pink: 'border-pink-100 bg-pink-50',
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${colorClasses[color]}`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-neutral-900 mb-1">{value}</div>
      <div className="text-neutral-600">{label}</div>
    </div>
  );
};

export default Card;