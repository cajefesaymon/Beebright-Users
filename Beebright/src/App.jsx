import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const AppContent = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("landing");
  const [enrollmentType, setEnrollmentType] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== "enroll") setEnrollmentType(null);
  };

  const handleEnrollment = (type) => {
    setEnrollmentType(type);
    setCurrentPage("enroll");
  };

  // Logged in users → dashboards
  if (user) {
    switch (user.role) {
      case "student":
        return <StudentDashboard onLogout={logout} />;
      case "parent":
        return <ParentDashboard onLogout={logout} />;
      case "tutor":
        return <TutorDashboard onLogout={logout} />;
      case "admin":
        return <AdminDashboard onLogout={logout} />;
      default:
        return <LandingPage onLogin={handleEnrollment} />;
    }
  }

  // Not logged in → show navbar + main pages
  return (
    <>
      <Navbar
        user={user}
        onLogout={logout}
        onNavigate={handleNavigate}
      />

      {currentPage === "enroll" ? (
        <EnrollmentForm
          onBack={() => handleNavigate("landing")}
          enrollmentType={enrollmentType}
        />
      ) : currentPage === "login" ? (
        <Login onBack={() => handleNavigate("landing")} />
      ) : (
        <LandingPage
          onLogin={handleEnrollment}
          onGoToLogin={() => handleNavigate("login")}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="font-sans">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;
