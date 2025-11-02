import React, { useState } from 'react';
import { Shield, AlertCircle, ArrowLeft } from 'lucide-react';

const TwoFactorVerify = ({ email, onVerifySuccess, onBack }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBackupInput, setShowBackupInput] = useState(false);
  const [backupCode, setBackupCode] = useState('');

  const handleCodeChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`verify-code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`verify-code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Backend API call:
      // const response = await fetch('/api/auth/2fa/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     email,
      //     code 
      //   })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // onVerifySuccess(data.token, data.user);

      // Simulate verification (accept any 6-digit code for demo)
      setTimeout(() => {
        setIsLoading(false);
        onVerifySuccess();
      }, 1000);

    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setIsLoading(false);
      setVerificationCode(['', '', '', '', '', '']);
      document.getElementById('verify-code-0')?.focus();
    }
  };

  const handleBackupCodeSubmit = async (e) => {
    e.preventDefault();
    
    if (!backupCode.trim()) {
      setError('Please enter a backup code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Backend API call:
      // const response = await fetch('/api/auth/2fa/verify-backup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     email,
      //     backupCode 
      //   })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // onVerifySuccess(data.token, data.user);

      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        onVerifySuccess();
      }, 1000);

    } catch (err) {
      setError('Invalid backup code. Please try again.');
      setIsLoading(false);
      setBackupCode('');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = paste.split('');
    
    if (newCode.length === 6) {
      setVerificationCode(newCode);
      document.getElementById('verify-code-5')?.focus();
    }
  };

  // Backup code input view
  if (showBackupInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowBackupInput(false)}
            className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Authenticator Code</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔑</div>
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
                Use Backup Code
              </h2>
              <p className="text-neutral-600">
                Enter one of your saved backup codes
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700 flex items-start gap-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleBackupCodeSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Backup Code
                </label>
                <input
                  type="text"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value)}
                  placeholder="XXXX-XXXX"
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition text-center font-mono text-lg"
                  maxLength={9}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Verify Backup Code'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-500">
                Each backup code can only be used once
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main 2FA verification view
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </button>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary-600" size={40} />
            </div>
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
              Two-Factor Authentication
            </h2>
            <p className="text-neutral-600">
              Enter the 6-digit code from your authenticator app
            </p>
            {email && (
              <p className="text-sm text-neutral-500 mt-2">
                Logging in as: <strong>{email}</strong>
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700 flex items-start gap-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Code Input */}
          <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`verify-code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-neutral-300 rounded-xl focus:border-primary-500 focus:outline-none transition"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading || verificationCode.join('').length !== 6}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              'Verify & Login'
            )}
          </button>

          {/* Backup Code Option */}
          <div className="text-center">
            <button
              onClick={() => setShowBackupInput(true)}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              Lost your device? Use a backup code
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-neutral-500">
          🔒 Your code is valid for 30 seconds
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerify;