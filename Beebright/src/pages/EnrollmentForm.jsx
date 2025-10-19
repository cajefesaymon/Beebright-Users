import React, { useState } from 'react';

const EnrollmentForm = ({ onBack, enrollmentType }) => {
  const [formData, setFormData] = useState({
    // Student Info
    studentName: '',
    age: '',
    grade: '',
    school: '',
    
    // Parent Info
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    
    // Address
    address: '',
    
    // Subjects
    subjects: [],
    
    // Preferred Schedule
    schedule: '',
    
    // Additional Notes
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const availableSubjects = [
    'Math', 'Science', 'English', 'Filipino', 
    'Social Studies', 'Computer', 'Reading'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that at least one subject is selected
    if (formData.subjects.length === 0) {
      alert('Please select at least one subject!');
      return;
    }
    
    // TODO: Send to backend API
    console.log('Enrollment submitted:', formData);
    
    // Show success message
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border-4 border-green-200 text-center">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Enrollment Submitted!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for enrolling at Bee Bright! We've received your application.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
            <p className="text-gray-700 font-semibold mb-2">📧 What's Next?</p>
            <p className="text-gray-600 mb-4">
              Our admin team will review your enrollment within 1-2 business days. 
              You'll receive an email with your login credentials once approved!
            </p>
            <div className="bg-white rounded-xl p-4 mt-4 border-2 border-blue-300">
              <p className="text-sm text-gray-600 mb-2">
                <strong>📨 Credentials will be sent to:</strong>
              </p>
              <p className="text-blue-600 font-semibold">{formData.parentEmail}</p>
            </div>
          </div>
          
          {/* ADDED: Already have account option */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-3">
              Already have an account from a previous enrollment?
            </p>
            <button
              onClick={() => window.location.href = '/login'} // or use your routing method
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition mb-3"
            >
              🔐 Login to Dashboard
            </button>
          </div>

          <button
            onClick={onBack}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Back to Home 🏠
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-200 mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 font-semibold mb-4 flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">📝</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                {enrollmentType === 'student' ? 'Student' : 'Parent'} Enrollment
              </h1>
              <p className="text-gray-600">Join the Bee Bright family! 🐝</p>
            </div>
          </div>
          
          {/* ADDED: Info banner about the process */}
          <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 mt-4">
            <p className="text-sm text-blue-900">
              💡 <strong>Note:</strong> After submitting, admin will review and create your account. 
              You'll receive login credentials via email once approved.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-blue-200">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">👦</span>
              Student Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Student's Full Name *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="5"
                  max="18"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Grade Level *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
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
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Current School *
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="ABC Elementary School"
                />
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-green-200">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">👨‍👩‍👧</span>
              Parent/Guardian Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Parent's Full Name *
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="Maria Dela Cruz"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="parent@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="09XX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Complete Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="123 Main St, City"
                />
              </div>
            </div>
          </div>

          {/* Subjects Selection */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-purple-200">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">📚</span>
              Subjects Needed *
            </h2>
            <p className="text-gray-600 mb-4">Select all subjects you need help with:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableSubjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => handleSubjectToggle(subject)}
                  className={`py-3 px-4 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    formData.subjects.includes(subject)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}
                >
                  {formData.subjects.includes(subject) && '✓ '}
                  {subject}
                </button>
              ))}
            </div>
            {/* ADDED: Validation message */}
            {formData.subjects.length === 0 && (
              <p className="text-red-600 text-sm mt-2">⚠️ Please select at least one subject</p>
            )}
          </div>

          {/* Schedule & Notes */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-orange-200">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">📅</span>
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Preferred Schedule
                </label>
                <select
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select preferred time</option>
                  <option value="Weekday Mornings">Weekday Mornings</option>
                  <option value="Weekday Afternoons">Weekday Afternoons</option>
                  <option value="Weekday Evenings">Weekday Evenings</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="Any special requests or concerns? (Optional)"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-8 text-center shadow-xl">
            <button
              type="submit"
              disabled={formData.subjects.length === 0}
              className="bg-white text-gray-900 px-12 py-4 rounded-2xl font-black text-xl hover:shadow-2xl transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Enrollment Form 🚀
            </button>
            <p className="text-white mt-4 text-sm">
              By submitting, you agree to our terms and conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;