// src/pages/StudentDashboard.jsx
import React, { useState } from 'react';
import { LogOut, Home, Brain, BookOpen, TrendingUp, Award, Calendar, ClipboardCheck, BarChart3 } from 'lucide-react';

// Card Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border-2 border-neutral-100 p-6 ${className}`}>
    {children}
  </div>
);

// Sidebar Component
const Sidebar = ({ activeTab, onTabChange, onLogout, student }) => {
  const safeStudent = {
    avatar: student?.avatar || '👨‍🎓',
    name: student?.name || 'Student',
    ...student
  };

  const studentMenuItems = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: Home,
      color: 'text-blue-500',
    },
    {
      id: 'ai',
      label: 'AI Tutor',
      icon: Brain,
      color: 'text-purple-500',
      badge: 'NEW'
    },
    {
      id: 'classes',
      label: 'My Classes',
      icon: BookOpen,
      color: 'text-green-500',
    },
    {
      id: 'grades',
      label: 'My Grades',
      icon: BarChart3,
      color: 'text-orange-500',
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: ClipboardCheck,
      color: 'text-cyan-500',
    },
    {
      id: 'badges',
      label: 'My Badges',
      icon: Award,
      color: 'text-yellow-500',
    }
  ];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg border-r-2 border-neutral-100 flex flex-col z-50">
      {/* Logo & Student Info */}
      <div className="p-6 border-b-2 border-neutral-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-2xl">
            🐝
          </div>
          <span className="font-display font-bold text-2xl text-neutral-900">
            BeeBright
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{safeStudent.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-neutral-900 truncate">{safeStudent.name}</div>
              <div className="text-sm text-neutral-600">Student</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {studentMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-600 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <item.icon size={20} className={item.color} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t-2 border-neutral-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-semibold"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Main StudentDashboard Component
const StudentDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const student = {
    name: "Alex Johnson",
    avatar: "👨‍🎓",
    grade: "Grade 5"
  };

  const stats = [
    { 
      icon: BookOpen, 
      label: 'Total Classes', 
      value: '12', 
      color: 'bg-blue-500', 
      trend: '3 active courses'
    },
    { 
      icon: Award, 
      label: 'Completed', 
      value: '8', 
      color: 'bg-green-500', 
      trend: '67% completion'
    },
    { 
      icon: BarChart3, 
      label: 'Average Grade', 
      value: '85%', 
      color: 'bg-purple-500', 
      trend: '+5% from last month'
    },
    { 
      icon: ClipboardCheck, 
      label: 'Attendance', 
      value: '94%', 
      color: 'bg-cyan-500', 
      trend: 'Excellent record'
    },
  ];

  const upcomingClasses = [
    { time: '2:00 PM', subject: 'Math', tutor: 'Ms. Johnson', topic: 'Fractions' },
    { time: '4:00 PM', subject: 'Science', tutor: 'Mr. Smith', topic: 'Solar System' },
    { time: '6:00 PM', subject: 'English', tutor: 'Ms. Davis', topic: 'Grammar' },
  ];

  const recentActivities = [
    { id: 1, action: 'Completed Math Quiz', time: '30 mins ago', icon: '📝', type: 'grade' },
    { id: 2, action: 'Attended Science Class', time: '1 hour ago', icon: '✅', type: 'attendance' },
    { id: 3, action: 'Earned "Math Whiz" Badge', time: '2 hours ago', icon: '🏆', type: 'badge' },
    { id: 4, action: 'Submitted English Essay', time: '3 hours ago', icon: '📄', type: 'assignment' }
  ];

  const gradesBySubject = [
    { subject: 'Math', grade: 'A', percentage: 92, color: 'bg-blue-500', trend: '+5%' },
    { subject: 'Science', grade: 'B+', percentage: 87, color: 'bg-green-500', trend: '+2%' },
    { subject: 'English', grade: 'A-', percentage: 90, color: 'bg-purple-500', trend: '+3%' },
    { subject: 'History', grade: 'B', percentage: 82, color: 'bg-orange-500', trend: '-1%' },
  ];

  const attendanceData = [
    { month: 'September', present: 20, absent: 2, percentage: 91 },
    { month: 'October', present: 22, absent: 0, percentage: 100 },
    { month: 'November', present: 19, absent: 1, percentage: 95 },
  ];

  const recentBadges = [
    { name: 'Math Whiz', icon: '🧮', color: 'bg-blue-400', date: 'Today' },
    { name: 'Science Star', icon: '🔬', color: 'bg-green-400', date: '2 days ago' },
    { name: 'Reading Pro', icon: '📖', color: 'bg-purple-400', date: '5 days ago' },
    { name: 'Quick Learner', icon: '⚡', color: 'bg-yellow-400', date: '1 week ago' },
  ];

  const aiFeatures = [
    {
      title: "Homework Helper",
      description: "Get step-by-step explanations",
      icon: "📝",
      color: "bg-blue-500",
      prompt: "Can you help me solve this math problem?"
    },
    {
      title: "Study Planner",
      description: "Create study schedules",
      icon: "🗓️",
      color: "bg-purple-500",
      prompt: "Help me create a study plan for my exams"
    },
    {
      title: "Concept Explainer",
      description: "Understand topics easily",
      icon: "💡",
      color: "bg-green-500",
      prompt: "Explain photosynthesis in simple terms"
    },
    {
      title: "Quiz Generator",
      description: "Test your knowledge",
      icon: "🎯",
      color: "bg-orange-500",
      prompt: "Create a quiz about world history"
    }
  ];

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setAiResponse(`I'd be happy to help with "${aiQuery}"!\n\nHere's a detailed explanation:\n\n1. **Key Concepts**: Let me break this down into simple steps\n2. **Examples**: Here are some practical applications\n3. **Practice**: Try these exercises to reinforce your understanding\n\nRemember, learning is a journey! 🚀 Would you like me to elaborate on any specific part?`);
      setIsLoading(false);
    }, 2000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl text-neutral-900">
          Welcome back, {student.name}! 👋
        </h1>
        <p className="text-neutral-600 mt-1">Here's your learning progress today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                <p className="text-xs text-neutral-500 mt-2">{stat.trend}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card>
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-4">Today's Classes 📅</h2>
          <div className="space-y-3">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="border-2 border-neutral-100 rounded-xl p-4 hover:border-primary-300 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 text-primary-600 font-bold px-3 py-2 rounded-lg text-sm">
                      {cls.time}
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900">{cls.subject}</div>
                      <div className="text-sm text-neutral-600">{cls.topic} • {cls.tutor}</div>
                    </div>
                  </div>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-4">Recent Activity 🔔</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-neutral-900 text-sm">{activity.action}</div>
                  <div className="text-xs text-neutral-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderGrades = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">My Grades 📊</h2>
      <div className="space-y-6">
        {gradesBySubject.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                  {item.grade}
                </div>
                <div>
                  <div className="font-bold text-neutral-900">{item.subject}</div>
                  <div className="text-sm text-neutral-600">Current Grade: {item.percentage}%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">{item.trend}</div>
              </div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div 
                className={`${item.color} h-full rounded-full transition-all`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
        <h3 className="font-bold text-neutral-900 mb-2">Overall Performance</h3>
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Overall Average:</span>
          <span className="text-3xl font-bold text-neutral-900">85%</span>
        </div>
      </div>
    </Card>
  );

  const renderAttendance = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">My Attendance 📋</h2>
      
      {/* Overall Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
          <div className="text-green-600 text-sm font-medium mb-1">Present</div>
          <div className="text-3xl font-bold text-green-700">61 days</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
          <div className="text-red-600 text-sm font-medium mb-1">Absent</div>
          <div className="text-3xl font-bold text-red-700">3 days</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="text-blue-600 text-sm font-medium mb-1">Overall</div>
          <div className="text-3xl font-bold text-blue-700">94%</div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold text-neutral-900 mb-4">Monthly Breakdown</h3>
        {attendanceData.map((month, index) => (
          <div key={index} className="border-2 border-neutral-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-neutral-900">{month.month}</div>
              <div className="text-2xl font-bold text-neutral-900">{month.percentage}%</div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="text-green-600">✅ Present: {month.present}</div>
              <div className="text-red-600">❌ Absent: {month.absent}</div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
              <div 
                className="bg-green-500 h-full rounded-full transition-all"
                style={{ width: `${month.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderBadges = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">My Badges 🏆</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recentBadges.map((badge, idx) => (
          <div 
            key={idx}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 text-center hover:scale-105 transition-transform"
          >
            <div className={`${badge.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl`}>
              {badge.icon}
            </div>
            <p className="font-bold text-neutral-900 text-sm">{badge.name}</p>
            <p className="text-xs text-neutral-600 mt-1">{badge.date}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-700">Total Badges Earned:</span>
          <span className="text-2xl font-bold text-neutral-900">15 🎉</span>
        </div>
      </div>
    </Card>
  );

  const renderAI = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-500" />
          <h2 className="font-display font-bold text-2xl text-neutral-900">AI Tutor Assistant</h2>
        </div>
        <p className="text-neutral-600 mb-6">Get instant help with homework, explanations, and study tips!</p>

        {/* Quick Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {aiFeatures.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => setAiQuery(feature.prompt)}
              className={`${feature.color} text-white p-4 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col items-center gap-2`}
            >
              <span className="text-3xl">{feature.icon}</span>
              <span className="text-sm font-semibold text-center">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Chat Interface */}
        <form onSubmit={handleAiSubmit} className="space-y-4">
          <textarea
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Ask me anything about your studies... 📚"
            className="w-full h-32 p-4 border-2 border-neutral-200 rounded-xl resize-none focus:outline-none focus:border-purple-400 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !aiQuery.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Thinking...' : 'Get AI Help! 🎯'}
          </button>
        </form>

        {/* AI Response */}
        {aiResponse && (
          <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-neutral-900">AI Tutor Response:</h3>
            </div>
            <div className="text-neutral-700 whitespace-pre-wrap">
              {aiResponse}
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  const renderClasses = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">My Classes 📚</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {['Math', 'Science', 'English', 'History'].map((subject, idx) => {
          const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
          const tutors = ['Ms. Johnson', 'Mr. Smith', 'Ms. Davis', 'Mr. Brown'];
          return (
            <div key={idx} className="border-2 border-neutral-100 rounded-xl p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg">{subject}</h3>
                  <p className="text-sm text-neutral-600">{tutors[idx]}</p>
                </div>
                <div className={`${colors[idx]} p-2 rounded-lg`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Progress:</span>
                  <span className="font-semibold text-neutral-900">{[85, 70, 92, 78][idx]}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className={`${colors[idx]} h-full rounded-full`}
                    style={{ width: `${[85, 70, 92, 78][idx]}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        student={student}
      />
      
      <div className="ml-64 p-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'ai' && renderAI()}
        {activeTab === 'classes' && renderClasses()}
        {activeTab === 'grades' && renderGrades()}
        {activeTab === 'attendance' && renderAttendance()}
        {activeTab === 'badges' && renderBadges()}
      </div>
    </div>
  );
};

export default StudentDashboard;