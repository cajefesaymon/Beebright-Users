import React from "react";

export default function LandingPage({ onLogin, onGoToLogin }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">🐝 Welcome to BeeBright</h1>
      <p className="text-gray-700 mb-6">Learn. Grow. Shine. 🌟</p>

      <div className="space-x-4">
        <button
          onClick={() => onGoToLogin()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => onLogin("student")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
