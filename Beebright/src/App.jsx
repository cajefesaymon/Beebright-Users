import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";

// Dashboard layout + subpages
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AITutor from "./pages/AITutor";
import Profile from "./pages/Profile";
import Classes from "./pages/Classes";
import Progress from "./pages/Progress";
import Badges from "./pages/Badges";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Routes>
        {/* 🌐 Public routes */}
        {!user && (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/enroll" element={<EnrollmentForm />} />
            {/* Redirect any unknown route to / */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* 🧭 Protected routes (student dashboard) */}
        {user && user.role === "student" && (
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ai-tutor" element={<AITutor />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes" element={<Classes />} />
            <Route path="progress" element={<Progress />} />
            <Route path="badges" element={<Badges />} />
            {/* Redirect unknown paths to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
