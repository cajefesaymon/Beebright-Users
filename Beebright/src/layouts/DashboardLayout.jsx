import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (persistent across pages) */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* Child route content will render here */}
      </main>
    </div>
  );
}
