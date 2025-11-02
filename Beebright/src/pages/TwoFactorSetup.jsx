import React, { useState, useEffect } from 'react';
import { Shield, Copy, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';

const TwoFactorSetup = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1); // 1: Show QR, 2: Verify code, 3: Success
  const [qrCode, setQrCode] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initialize 2FA setup
    initialize2FA();
  }, []);

  const initialize2FA = async () => {
    try {
      // Backend API call:
      // const response = await fetch('/api/auth/2fa/setup', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      // setQrCode(data.qrCode);
      // setSecretKey(data.secret);
      // setBackupCodes(data.backupCodes);

      // Mock data
      setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/BeeBright:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=BeeBright');
      setSecretKey('JBSWY3DPEHPK3PXP');
      setBackupCodes([
        '1234-5678',
        '2345-6789',
        '3456-7890',
        '4567-8901',
        '5678-9012',
        '6789-0123',
        '7890-1234',
        '8901-2345'
      ]);
    } catch (err) {
      setError('Failed to initialize 2FA setup');
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
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
      // const response = await fetch('/api/auth/2fa/verify-setup', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ code })
      // });
      // if (!response.ok) throw new Error('Invalid code');

      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 1000);

    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setIsLoading(false);
      setVerificationCode(['', '', '', '', '', '']);
      document.getElementById('code-0')?.focus();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Step 3: Success
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
                2FA Enabled Successfully!
              </h2>
              <p className="text-neutral-600">
                Your account is now protected with two-factor authentication
              </p>
            </div>

            {/* Backup Codes */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-amber-600" size={20} />
                <div className="font-semibold text-amber-900">Save Your Backup Codes</div>
              </div>
              <p className="text-sm text-amber-800 mb-3">
                Store these codes in a safe place. You can use them to access your account if you lose your authenticator device.
              </p>
              <div className="grid grid-cols-2 gap-2 bg-white rounded-lg p-3 font-mono text-sm">
                {backupCodes.map((code, i) => (
                  <div key={i} className="text-neutral-700">{code}</div>
                ))}
              </div>
              <button
                onClick={() => copyToClipboard(backupCodes.join('\n'))}
                className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy All Codes'}
              </button>
            </div>

            <button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Verify Code
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔢</div>
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
                Enter Verification Code
              </h2>
              <p className="text-neutral-600">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700 flex items-start gap-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Code Input */}
            <div className="flex gap-2 justify-center mb-6">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
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
                'Verify & Enable 2FA'
              )}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-neutral-600 hover:text-neutral-800 font-semibold py-2"
            >
              ← Back to QR Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Show QR Code
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
              Enable Two-Factor Authentication
            </h2>
            <p className="text-neutral-600">
              Add an extra layer of security to your account
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <div className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Smartphone size={20} />
              Setup Instructions
            </div>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal ml-5">
              <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
              <li>Scan the QR code below with your app</li>
              <li>Enter the 6-digit code to verify</li>
            </ol>
          </div>

          {/* QR Code */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 mb-4">
            <div className="text-center">
              <img 
                src={qrCode} 
                alt="2FA QR Code" 
                className="mx-auto mb-4 rounded-lg"
              />
              <p className="text-sm text-neutral-600 mb-2">
                Can't scan? Enter this code manually:
              </p>
              <div className="flex items-center justify-center gap-2 bg-neutral-100 rounded-lg p-3">
                <code className="font-mono text-sm text-neutral-800">{secretKey}</code>
                <button
                  onClick={() => copyToClipboard(secretKey)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-2">✓ Copied to clipboard!</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => setStep(2)}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition mb-3"
          >
            I've Scanned the Code
          </button>

          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full text-neutral-600 hover:text-neutral-800 font-semibold py-2"
            >
              Skip for Now
            </button>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-neutral-500">
          🔒 2FA protects your account even if your password is compromised
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetup;