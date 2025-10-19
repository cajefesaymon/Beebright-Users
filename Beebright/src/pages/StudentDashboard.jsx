import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const StudentDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      label: 'Total Classes', 
      value: '12', 
      icon: '📚', 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Completed', 
      value: '8', 
      icon: '✅', 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Hours Studied', 
      value: '24', 
      icon: '⏰', 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Badges Earned', 
      value: '15', 
      icon: '🏆', 
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
  ];

  const upcomingClasses = [
    { subject: 'Math', time: '2:00 PM', tutor: 'Ms. Johnson', color: 'bg-blue-100 border-blue-400' },
    { subject: 'Science', time: '4:00 PM', tutor: 'Mr. Smith', color: 'bg-green-100 border-green-400' },
    { subject: 'English', time: '6:00 PM', tutor: 'Ms. Davis', color: 'bg-purple-100 border-purple-400' },
  ];

  const recentBadges = [
    { name: 'Math Whiz', icon: '🧮', color: 'bg-blue-400' },
    { name: 'Science Star', icon: '🔬', color: 'bg-green-400' },
    { name: 'Reading Pro', icon: '📖', color: 'bg-purple-400' },
    { name: 'Quick Learner', icon: '⚡', color: 'bg-yellow-400' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar 
        role="student" 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />
      
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl animate-bounce">👋</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800">
              Hey there, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Student!</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 ml-16">Ready to learn something awesome today? 🚀</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className={`${stat.bgColor} rounded-3xl p-6 border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-5xl">{stat.icon}</span>
                <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center transform -rotate-12`}>
                  <span className="text-white text-xl font-bold transform rotate-12">{stat.value}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-700">{stat.label}</h3>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📅</span>
              <h2 className="text-2xl font-black text-gray-800">Today's Classes</h2>
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((cls, idx) => (
                <div 
                  key={idx}
                  className={`${cls.color} rounded-2xl p-4 border-4 transform hover:scale-105 transition-transform`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{cls.subject}</h3>
                      <p className="text-gray-600 font-semibold">{cls.tutor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-800">{cls.time}</p>
                      <button className="mt-2 bg-white px-4 py-2 rounded-full font-bold text-sm hover:shadow-lg transition">
                        Join Now! 🎯
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Badges */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🏆</span>
              <h2 className="text-2xl font-black text-gray-800">Your Awesome Badges!</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {recentBadges.map((badge, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 border-4 border-white shadow-lg text-center transform hover:scale-110 hover:rotate-3 transition-all"
                >
                  <div className={`${badge.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl shadow-lg`}>
                    {badge.icon}
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{badge.name}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition">
              View All Badges 🎉
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">📈</span>
            <h2 className="text-2xl font-black text-gray-800">Your Learning Progress</h2>
          </div>
          <div className="space-y-4">
            {['Math', 'Science', 'English'].map((subject, idx) => {
              const progress = [85, 70, 92][idx];
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'][idx];
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-700 text-lg">{subject}</span>
                    <span className="font-black text-gray-800 text-lg">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-gray-300">
                    <div 
                      className={`${colors} h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    >
                      <span className="text-white text-xs font-bold">⭐</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;