import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = ({ token, onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  });

  useEffect(() => {
    // Validate token on mount
    validateToken();
  }, [token]);

  useEffect(() => {
    // Calculate password strength
    calculatePasswordStrength(formData.password);
  }, [formData.password]);

  const validateToken = async () => {
    // Backend API call:
    // try {
    //   const response = await fetch(`/api/auth/validate-reset-token/${token}`);
    //   if (!response.ok) setTokenValid(false);
    // } catch (err) {
    //   setTokenValid(false);
    // }
    
    // Mock validation - in real app, this would check token expiry
    setTokenValid(true);
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengths = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Very Weak', color: 'bg-red-500' },
      { score: 2, label: 'Weak', color: 'bg-orange-500' },
      { score: 3, label: 'Fair', color: 'bg-yellow-500' },
      { score: 4, label: 'Good', color: 'bg-blue-500' },
      { score: 5, label: 'Strong', color: 'bg-green-500' }
    ];

    setPasswordStrength(strengths[score]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Please choose a stronger password');
      return;
    }

    setIsLoading(true);

    try {
      // Backend API call:
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token: token,
      //     newPassword: formData.password
      //   })
      // });
      // if (!response.ok) throw new Error('Failed to reset password');

      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 3000);
      }, 1500);

    } catch (err) {
      setError('Failed to reset password. The link may have expired.');
      setIsLoading(false);
    }
  };

  // Invalid token view
  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-600" size={40} />
            </div>
            
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-3">
              Invalid or Expired Link
            </h2>
            
            <p className="text-neutral-600 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>

            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success view
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-3">
              Password Reset Successful!
            </h2>
            
            <p className="text-neutral-600 mb-6">
              Your password has been successfully reset. You can now login with your new password.
            </p>

            <button
              onClick={onSuccess || onBack}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition"
            >
              Go to Login
            </button>

            <p className="text-sm text-neutral-500 mt-4">
              Redirecting in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="font-display font-bold text-3xl text-neutral-900 mb-2">
              Reset Your Password
            </h1>
            <p className="text-neutral-600">
              Choose a strong password to secure your account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter new password"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= passwordStrength.score ? passwordStrength.color : 'bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-semibold ${
                    passwordStrength.score >= 4 ? 'text-green-600' : 
                    passwordStrength.score >= 3 ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="text-sm text-blue-900 font-semibold mb-2">Password Requirements:</div>
              <ul className="text-xs text-blue-800 space-y-1">
                <li className={formData.password.length >= 8 ? 'text-green-700' : ''}>
                  ✓ At least 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-700' : ''}>
                  ✓ Uppercase and lowercase letters
                </li>
                <li className={/\d/.test(formData.password) ? 'text-green-700' : ''}>
                  ✓ At least one number
                </li>
                <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-700' : ''}>
                  ✓ At least one special character
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading || passwordStrength.score < 3}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-neutral-500">
          🔒 Your password is encrypted and secure
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;