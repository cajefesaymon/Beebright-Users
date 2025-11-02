import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TwoFactorSetup from './pages/TwoFactorSetup';
import TwoFactorVerify from './pages/TwoFactorVerify';
import EnrollmentForm from './pages/EnrollmentForm';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TutorDashboard from './pages/TutorDashboard';
import AdminDashboard from './pages/AdminDashboard';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing'); 
  // Pages: 'landing', 'enroll', 'login', 'forgot-password', 'reset-password', '2fa-setup', '2fa-verify'
  const [enrollmentType, setEnrollmentType] = useState(null);
  const [resetToken, setResetToken] = useState(null);
  const [pendingUser, setPendingUser] = useState(null); // User data pending 2FA verification

  // Handle enrollment button clicks from landing page
  const handleEnrollment = (type) => {
    setEnrollmentType(type);
    setCurrentPage('enroll');
  };

  // Handle "Already have account? Login" 
  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    setCurrentPage('forgot-password');
  };

  // Handle back to landing
  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setEnrollmentType(null);
  };

  // Handle back to login
  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  // Handle reset password (when user clicks email link)
  const handleResetPassword = (token) => {
    setResetToken(token);
    setCurrentPage('reset-password');
  };

  // Handle successful password reset
  const handleResetSuccess = () => {
    setCurrentPage('login');
    setResetToken(null);
  };

  // Handle 2FA setup (optional during first login or from settings)
  const handle2FASetup = () => {
    setCurrentPage('2fa-setup');
  };

  // Handle 2FA setup completion
  const handle2FASetupComplete = () => {
    setCurrentPage('login');
  };

  // Handle 2FA verification during login
  const handle2FAVerify = (userData) => {
    setPendingUser(userData);
    setCurrentPage('2fa-verify');
  };

  // Handle successful 2FA verification
  const handle2FAVerifySuccess = () => {
    if (pendingUser) {
      // Complete the login after 2FA verification
      // In real app, you'd get a final token from backend
      setCurrentPage('login');
      setPendingUser(null);
    }
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
          onForgotPassword={handleForgotPassword}
        />
      );
    
    case 'forgot-password':
      return (
        <ForgotPassword 
          onBack={handleBackToLogin}
        />
      );
    
    case 'reset-password':
      return (
        <ResetPassword 
          token={resetToken}
          onSuccess={handleResetSuccess}
          onBack={handleBackToLogin}
        />
      );
    
    case '2fa-setup':
      return (
        <TwoFactorSetup 
          onComplete={handle2FASetupComplete}
          onCancel={handleBackToLogin}
        />
      );
    
    case '2fa-verify':
      return (
        <TwoFactorVerify 
          email={pendingUser?.email}
          onVerifySuccess={handle2FAVerifySuccess}
          onBack={handleBackToLogin}
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