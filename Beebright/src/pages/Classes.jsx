import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the logged-in user from AuthContext
  const { user } = useAuth();
  
  // Debug: Log the user object to see its structure
  console.log('User from AuthContext:', user);
  
  // Try multiple possible ID field names
  const currentStudentId = user?._id || user?.id || user?._id?.$oid;
  
  console.log('Extracted Student ID:', currentStudentId);
  
  // Update this to match your backend URL
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (currentStudentId) {
      fetchClasses();
    } else {
      console.error('No student ID found. User object:', user);
      setError("Unable to load classes. Please logout and login again to refresh your session.");
      setLoading(false);
    }
  }, [currentStudentId]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE_URL}/api/schedules/${currentStudentId}`;
      console.log('Fetching from:', url);

      // Matches your route: router.get('/:studentId')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);
        throw new Error(`Expected JSON but got: ${contentType}`);
      }

      const data = await response.json();
      console.log('Fetched classes:', data);
      console.log('Number of classes:', data.length);
      if (data.length > 0) {
        console.log('First class data:', data[0]);
        console.log('Tutor data:', data[0].tutorId);
      }
      setClasses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    // Convert "11:00 AM" format to more readable format if needed
    return timeString;
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Classes</h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Classes</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Error loading classes</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchClasses}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-semibold mb-2">Troubleshooting:</p>
          <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
            <li>Check browser console (F12) for detailed errors</li>
            <li>Verify backend is running on port 5000</li>
            <li>Test: <a href={`${API_BASE_URL}/api/health`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{API_BASE_URL}/api/health</a></li>
            <li>Test schedules: <a href={`${API_BASE_URL}/api/schedules/${currentStudentId}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View API response</a></li>
          </ol>
        </div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Classes</h1>
        <div className="bg-gray-50 border border-gray-200 text-gray-600 px-4 py-8 rounded text-center">
          <p>You don't have any classes assigned yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {classItem.subject}
              </h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                {classItem.room}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatTime(classItem.time)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Tutor: {classItem.tutorId?.name || classItem.tutorId?.email || 'Not assigned'}</span>
              </div>
              
              {classItem.date && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(classItem.date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
}