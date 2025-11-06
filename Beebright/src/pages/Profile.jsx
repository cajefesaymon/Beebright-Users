// src/pages/Profile.jsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Replace this with your API call later
    if (oldPassword && newPassword) {
      setMessage("✅ Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } else {
      setMessage("⚠️ Please fill in all fields.");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-500 mb-8">
          Manage your personal information and change your password.
        </p>

        {/* User Info */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">👤 Student Info</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {user?.name || "John Doe"}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user?.email || "student@email.com"}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {user?.role || "Student"}
          </p>
        </div>

        {/* Change Password */}
        <form
          onSubmit={handlePasswordChange}
          className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 border shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🔒 Change Password
          </h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Update Password
            </button>
          </div>

          {message && (
            <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
          )}
        </form>
      </div>
    </Layout>
  );
}
