import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";
import Dashboard from "./pages/Dashboard"; // ✅ student dashboard only

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

  // ✅ If logged in as student → show Dashboard
  if (user && user.role === "student") {
    return (
      <Dashboard
        onLogout={logout}
        studentName={user.name}
        studentData={user.data}
      />
    );
  }

  // 🧭 Not logged in → show main pages (NO duplicate navbar)
  return (
    <>
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
      <div className="font-sans bg-gray-50 min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;
