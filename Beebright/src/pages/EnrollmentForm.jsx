import React, { useState } from 'react';

const EnrollmentForm = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
    school: '',
    password: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    schedule: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

 const handleSubmit = async () => {
  setLoading(true);
  setError('');

  try {
    // Check all required fields including first and last name
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.grade || 
        !formData.school || !formData.password || !formData.contactEmail) {
      throw new Error('Please fill in all required fields');
    }

    // ADD password length validation (matches the backend and the UI hint)
    if (formData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      throw new Error('Please enter a valid email address');
    }

    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 25) {
      throw new Error('Please enter a valid age (5-25)');
    }

    const API_URL = 'http://localhost:5000/api/enroll';
    
    console.log('Submitting to:', API_URL); // Debug log
    console.log('Form data:', { ...formData, age: ageNum }); // Debug log
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        age: ageNum
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Enrollment failed');
    }

    setSuccess(true);
    if (onSuccess) onSuccess();

  } catch (err) {
    console.error('Enrollment error:', err);
    setError(err.message || 'Failed to submit enrollment. Please try again.');
  } finally {
    setLoading(false);
  }
};

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center border-4 border-green-400">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            Enrollment Submitted Successfully!
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for enrolling at BeeBright! We've received your application.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
            <p className="text-lg text-gray-700 mb-2">
              📧 <strong>Next Steps:</strong>
            </p>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li>✅ We'll review your application within 1-2 business days</li>
              <li>✅ Once approved, you can access your student dashboard</li>
            </ul>
          </div>
          <button
            onClick={onBack}
            className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-600 transform hover:scale-105 transition shadow-lg"
          >
            Return to Home 🏠
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-amber-200">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Student Enrollment
            </h1>
            <p className="text-lg text-gray-600">
              Join the BeeBright family and start your learning journey!
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                👤 Student Information
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Juan"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Dela Cruz"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="12"
                      min="5"
                      max="25"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Grade Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current School <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="ABC Elementary School"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📞 Contact Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    We'll send your login credentials to this email
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="09XX XXX XXXX"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Complete home address"
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📅 Preferences
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Preferred Schedule
                  </label>
                  <select
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select preferred time</option>
                    <option value="Weekday Mornings (8AM-12PM)">Weekday Mornings (8AM-12PM)</option>
                    <option value="Weekday Afternoons (1PM-5PM)">Weekday Afternoons (1PM-5PM)</option>
                    <option value="Weekday Evenings (5PM-8PM)">Weekday Evenings (5PM-8PM)</option>
                    <option value="Saturday Mornings">Saturday Mornings</option>
                    <option value="Saturday Afternoons">Saturday Afternoons</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requirements, learning goals, or questions..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>⏳</span> Submitting...
                  </span>
                ) : (
                  'Submit Enrollment 🚀'
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;