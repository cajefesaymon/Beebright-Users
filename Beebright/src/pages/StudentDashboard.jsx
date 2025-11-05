import React, { useState } from 'react';
import logo from '../assets/beebrightlogo.jpg';
import { LogOut, Home, Brain, BookOpen, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Sidebar Component (Integrated)
const Sidebar = ({ activeTab, onTabChange, onLogout, student }) => {
  const safeStudent = {
    avatar: student?.avatar || '👨‍🎓',
    name: student?.name || 'Student',
    ...student
  };

  const studentMenuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      color: 'text-blue-500',
      description: 'Your learning dashboard'
    },
    {
      id: 'ai',
      label: 'AI Tutor',
      icon: Brain,
      color: 'text-purple-500',
      description: 'Get instant help',
      badge: 'NEW'
    },
    {
      id: 'classes',
      label: 'My Classes',
      icon: BookOpen,
      color: 'text-green-500',
      description: 'View your classes'
    },
    {
      id: 'progress',
      label: 'My Progress',
      icon: TrendingUp,
      color: 'text-orange-500',
      description: 'Track your learning'
    },
    {
      id: 'badges',
      label: 'My Badges',
      icon: Award,
      color: 'text-yellow-500',
      description: 'Achievements earned'
    }
  ];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg border-r-2 border-neutral-100 flex flex-col z-50">
      {/* Logo & Student Info */}
      <div className="p-6 border-b-2 border-neutral-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-yellow-400 flex items-center justify-center bg-white">
              <img
                  src={logo}
                  alt="BeeBright Logo"
                  className="w-full h-full object-cover"
              />
          </div>
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            BeeBright
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border-2 border-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{safeStudent.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-neutral-900 truncate text-lg">{safeStudent.name}</div>
              <div className="text-sm text-neutral-600 flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                Student Profile
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {studentMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl transition-all duration-200 group text-left ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200 shadow-lg transform scale-105'
                  : 'bg-white border-2 border-transparent hover:border-blue-100 hover:shadow-md hover:bg-blue-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeTab === item.id 
                  ? 'bg-white shadow-sm' 
                  : 'bg-gray-50 group-hover:bg-white'
              }`}>
                <item.icon 
                  className={`${item.color} ${
                    activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                  } transition-transform duration-200`} 
                  size={20} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${
                    activeTab === item.id ? 'text-blue-700' : 'text-gray-800'
                  }`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 group-hover:text-gray-600">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Student Stats & Logout */}
      <div className="p-4 border-t-2 border-neutral-100 space-y-4">
        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-xl border-2 border-yellow-200">
          <div className="text-xs text-gray-600 mb-1">Today's Progress</div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">2/3 classes</span>
            <div className="w-12 h-2 bg-yellow-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                style={{ width: '66%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 font-semibold border-2 border-transparent hover:border-red-200 hover:shadow-sm group"
        >
          <LogOut 
            size={20} 
            className="group-hover:scale-110 transition-transform duration-200" 
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Main StudentDashboard Component
const StudentDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // PASTE THE GEMINI FUNCTION HERE
  // StudentDashboard.jsx - Update the generateContentWithGemini function

// StudentDashboard.jsx - Update the generateContentWithGemini function

const generateContentWithGemini = async (prompt) => {
  const API_KEY = 'AIzaSyAc0zAAYFOotLS-3CW4bwffeWD224lHkl0';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected API response:', data);
      throw new Error('Unexpected response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Then update the handleAiSubmit function:
const handleAiSubmit = async (e) => {
  e.preventDefault();
  if (!aiQuery.trim()) return;
  
  setIsLoading(true);
  setAiResponse(''); // Clear previous response
  
  try {
    const response = await generateContentWithGemini(aiQuery);
    setAiResponse(response);
  } catch (error) {
    console.error('Error getting AI response:', error);
    setAiResponse(`I apologize, but I'm having trouble connecting right now. Please try again in a moment. Error: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

  const stats = [
    { 
      label: 'Total Classes', 
      value: '12', 
      icon: '📚', 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Completed', 
      value: '8', 
      icon: '✅', 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Hours Studied', 
      value: '24', 
      icon: '⏰', 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Badges Earned', 
      value: '15', 
      icon: '🏆', 
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
  ];

  const upcomingClasses = [
    { subject: 'Math', time: '2:00 PM', tutor: 'Ms. Johnson', color: 'bg-blue-100 border-blue-400' },
    { subject: 'Science', time: '4:00 PM', tutor: 'Mr. Smith', color: 'bg-green-100 border-green-400' },
    { subject: 'English', time: '6:00 PM', tutor: 'Ms. Davis', color: 'bg-purple-100 border-purple-400' },
  ];

  const recentBadges = [
    { name: 'Math Whiz', icon: '🧮', color: 'bg-blue-400' },
    { name: 'Science Star', icon: '🔬', color: 'bg-green-400' },
    { name: 'Reading Pro', icon: '📖', color: 'bg-purple-400' },
    { name: 'Quick Learner', icon: '⚡', color: 'bg-yellow-400' },
  ];

  const aiFeatures = [
    {
      title: "Homework Helper",
      description: "Get step-by-step explanations for any subject",
      icon: "📝",
      color: "from-blue-500 to-cyan-500",
      prompt: "Can you help me solve this math problem?"
    },
    {
      title: "Study Planner",
      description: "Create personalized study schedules",
      icon: "🗓️",
      color: "from-purple-500 to-pink-500",
      prompt: "Help me create a study plan for my exams"
    },
    {
      title: "Concept Explainer",
      description: "Understand complex topics easily",
      icon: "💡",
      color: "from-green-500 to-teal-500",
      prompt: "Explain photosynthesis in simple terms"
    },
    {
      title: "Quiz Generator",
      description: "Test your knowledge with custom quizzes",
      icon: "🎯",
      color: "from-orange-500 to-red-500",
      prompt: "Create a quiz about world history"
    }
  ];

  const recentConversations = [
    { question: "How do I solve quadratic equations?", time: "2 hours ago" },
    { question: "Explain the water cycle", time: "1 day ago" },
    { question: "Help me with French vocabulary", time: "2 days ago" }
  ];

  

  const handleQuickPrompt = (prompt) => {
    setAiQuery(prompt);
  };

  // ----------------- PAGES / SECTIONS -----------------

  // ORIGINAL Overview content (keeps everything you had)
  const renderOverview = () => (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl animate-bounce">👋</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800">
            Hey there, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {user?.firstName || 'Student'}!
            </span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 ml-16">Ready to learn something awesome today? 🚀</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className={`${stat.bgColor} rounded-3xl p-6 border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-5xl">{stat.icon}</span>
              <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center transform -rotate-12`}>
                <span className="text-white text-xl font-bold transform rotate-12">{stat.value}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-700">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">📅</span>
            <h2 className="text-2xl font-black text-gray-800">Today's Classes</h2>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((cls, idx) => (
              <div 
                key={idx}
                className={`${cls.color} rounded-2xl p-4 border-4 transform hover:scale-105 transition-transform`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{cls.subject}</h3>
                    <p className="text-gray-600 font-semibold">{cls.tutor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-800">{cls.time}</p>
                    <button className="mt-2 bg-white px-4 py-2 rounded-full font-bold text-sm hover:shadow-lg transition">
                      Join Now! 🎯
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Badges */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-gray-800">Your Awesome Badges!</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recentBadges.map((badge, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 border-4 border-white shadow-lg text-center transform hover:scale-110 hover:rotate-3 transition-all"
              >
                <div className={`${badge.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl shadow-lg`}>
                  {badge.icon}
                </div>
                <p className="font-bold text-gray-800 text-sm">{badge.name}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition">
            View All Badges 🎉
          </button>
        </div>
      </div>

      {/* Progress Section (small) */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">📈</span>
          <h2 className="text-2xl font-black text-gray-800">Your Learning Progress</h2>
        </div>
        <div className="space-y-4">
          {['Math', 'Science', 'English'].map((subject, idx) => {
            const progress = [85, 70, 92][idx];
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'][idx];
            return (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-700 text-lg">{subject}</span>
                  <span className="font-black text-gray-800 text-lg">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-gray-300">
                  <div 
                    className={`${colors} h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  >
                    <span className="text-white text-xs font-bold">⭐</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  // Standalone Progress page (only this section)
  const renderProgressOnly = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl animate-pulse">📈</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800">
            My Learning Progress
          </h1>
        </div>
        <p className="text-gray-600">Detailed view of your subject progress.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
        {['Math', 'Science', 'English'].map((subject, idx) => {
          const progress = [85, 70, 92][idx];
          const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'][idx];
          return (
            <div key={subject} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-700 text-lg">{subject}</span>
                <span className="font-black text-gray-800 text-lg">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-gray-300 overflow-hidden">
                <div 
                  className={`${colors} h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-white text-xs font-bold">⭐</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Standalone Badges page (only this section)
  const renderBadgesOnly = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl">🏆</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800">My Badges</h1>
        </div>
        <p className="text-gray-600">All your achievements & earned badges.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {recentBadges.map((badge, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">
                {badge.icon}
              </div>
              <p className="font-bold text-gray-800">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // AI page (kept simple as before)
  const renderAIPage = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl animate-pulse">🤖</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800">
            Your Personal <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Tutor</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get instant help with homework, explanations, and study tips. Powered by advanced AI to make learning fun! ✨
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
        <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
          <span className="text-3xl">💬</span> Ask Me Anything!
        </h2>
        <form onSubmit={handleAiSubmit} className="space-y-4">
          <textarea
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Ask about math, science, history, or anything you're learning... 🌟"
            className="w-full h-32 p-4 border-4 border-purple-200 rounded-2xl resize-none focus:outline-none focus:border-purple-400 transition-colors text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !aiQuery.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Thinking...' : 'Get AI Help! 🎯'}
          </button>
        </form>

        {aiResponse && (
          <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-4 border-green-200">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {aiResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render main content depending on active tab.
  const renderContent = () => {
    switch (activeTab) {
      case 'progress':
        return renderProgressOnly();
      case 'badges':
        return renderBadgesOnly();
      case 'ai':
        return renderAIPage();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        student={{
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Student',
          avatar: "👨‍🎓"
        }}
      />
      
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
