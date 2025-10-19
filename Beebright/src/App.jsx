import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import EnrollmentForm from './pages/EnrollmentForm';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TutorDashboard from './pages/TutorDashboard';
import AdminDashboard from './pages/AdminDashboard';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'enroll', 'login'
  const [enrollmentType, setEnrollmentType] = useState(null); // 'student' or 'parent'

  // Handle enrollment button clicks from landing page
  const handleEnrollment = (type) => {
    setEnrollmentType(type);
    setCurrentPage('enroll');
  };

  // Handle "Already have account? Login" 
  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  // Handle back to landing
  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setEnrollmentType(null);
  };

  // If user is logged in, show appropriate dashboard
  if (user) {
    switch (user.role) {
      case 'student':
        return <StudentDashboard onLogout={logout} />;
      case 'parent':
        return <ParentDashboard onLogout={logout} />;
      case 'tutor':
        return <TutorDashboard onLogout={logout} />;
      case 'admin':
        return <AdminDashboard onLogout={logout} />;
      default:
        return <LandingPage onLogin={handleEnrollment} />;
    }
  }

  // Not logged in - show appropriate page
  switch (currentPage) {
    case 'enroll':
      return (
        <EnrollmentForm 
          onBack={handleBackToLanding}
          enrollmentType={enrollmentType}
        />
      );
    
    case 'login':
      return (
        <Login 
          onBack={handleBackToLanding}
        />
      );
    
    default:
      return (
        <LandingPage 
          onLogin={handleEnrollment}
          onGoToLogin={handleGoToLogin}
        />
      );
  }
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