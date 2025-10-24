// src/pages/tutor/TutorHome.jsx
import React, { useState } from 'react';
import Card from "../components/Card";
import { TrendingUp, Users, Calendar, Award, Brain, Clock, MessageCircle, BookOpen, Target, TrendingDown } from 'lucide-react';

const TutorHome = ({ user, setActiveTab, setAiQuery }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const stats = [
    { icon: Users, label: 'Total Students', value: '24', color: 'bg-blue-500', trend: '+3 this month', clickable: false },
    { icon: Calendar, label: 'Classes Today', value: '5', color: 'bg-green-500', trend: '2 upcoming', clickable: false },
    { 
      icon: Award, 
      label: 'Top Student', 
      value: 'Emma Chen', 
      color: 'bg-purple-500', 
      trend: '92% — Top performer',
      clickable: true,
      studentType: 'top',
      suggestions: [
        { 
          icon: Target, 
          label: 'Set Advanced Goals', 
          description: 'Challenge with harder problems',
          action: () => {
            setAiQuery('Help me create advanced math challenges for Emma Chen who is performing at 92%');
            setActiveTab('ai');
          }
        },
        { 
          icon: Users, 
          label: 'Peer Mentoring', 
          description: 'Pair with struggling students',
          action: () => {
            setActiveTab('students');
          }
        },
        { 
          icon: Award, 
          label: 'Recognition Certificate', 
          description: 'Generate achievement award',
          action: () => {
            setAiQuery('Create a certificate of excellence for Emma Chen for outstanding math performance');
            setActiveTab('ai');
          }
        }
      ]
    },
    { 
      icon: TrendingDown, 
      label: 'Least Performing', 
      value: 'Lucas Wong', 
      color: 'bg-orange-500', 
      trend: '78% — Needs attention',
      clickable: true,
      studentType: 'needs-attention',
      suggestions: [
        { 
          icon: BookOpen, 
          label: 'Extra Practice Materials', 
          description: 'Create personalized worksheets',
          action: () => {
            setAiQuery('Create personalized practice materials for Lucas Wong who is struggling at 78%');
            setActiveTab('ai');
          }
        },
        { 
          icon: MessageCircle, 
          label: 'Contact Parents', 
          description: 'Schedule parent meeting',
          action: () => {
            setAiQuery('Draft a message to Lucas Wong\'s parents about his current performance and support plan');
            setActiveTab('ai');
          }
        },
        { 
          icon: Brain, 
          label: 'Learning Plan', 
          description: 'AI-powered improvement strategy',
          action: () => {
            setAiQuery('Create a detailed learning improvement plan for Lucas Wong who needs help with math fundamentals');
            setActiveTab('ai');
          }
        }
      ]
    }
  ];

  const recentActivities = [
    { id: 1, type: 'grade', student: 'Alex Chen', action: 'Submitted Math Quiz', time: '30 mins ago', icon: '📝' },
    { id: 2, type: 'attendance', student: 'Emma Chen', action: 'Marked present', time: '1 hour ago', icon: '✅' },
    { id: 3, type: 'message', student: 'Parent of Lucas Wong', action: 'Sent a message', time: '2 hours ago', icon: '💬' },
    { id: 4, type: 'grade', student: 'Sophia Lee', action: 'Graded assignment', time: '3 hours ago', icon: '📊' }
  ];

  const upcomingClasses = [
    { time: '10:00 AM', class: 'Grade 5 Math', students: 8, topic: 'Fractions' },
    { time: '2:00 PM', class: 'Grade 4 Math', students: 6, topic: 'Multiplication' },
    { time: '4:00 PM', class: 'Grade 6 Math', students: 10, topic: 'Algebra Basics' }
  ];

  const quickActions = [
    { 
      label: 'AI Assistant', 
      icon: Brain, 
      color: 'bg-purple-500', 
      action: () => {
        setAiQuery('Help me create a lesson plan for fractions');
        setActiveTab('ai');
      }
    },
    { label: 'Mark Attendance', icon: Users, color: 'bg-green-500', action: () => setActiveTab('records') },
    { label: 'Grade Assignments', icon: Award, color: 'bg-blue-500', action: () => setActiveTab('records') },
    { label: 'View Schedule', icon: Calendar, color: 'bg-orange-500', action: () => setActiveTab('classes') }
  ];

  const handleStatClick = (stat) => {
    console.log('Card clicked:', stat.label);
    console.log('Is clickable:', stat.clickable);
    console.log('Current selected:', selectedStudent);
    if (stat.clickable) {
      const newSelection = selectedStudent?.label === stat.label ? null : stat;
      console.log('New selection:', newSelection);
      setSelectedStudent(newSelection);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-neutral-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-neutral-600 mt-1">Here's what's happening with your classes today</p>
        </div>
      </div>

      {/* Stats Grid - 2x2 Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            onClick={() => handleStatClick(stat)}
            className={`${stat.clickable ? 'cursor-pointer' : ''}`}
          >
            <Card 
              className={`hover:shadow-lg transition ${stat.clickable ? 'hover:border-2 hover:border-primary-300' : ''} ${selectedStudent?.label === stat.label ? 'border-2 border-primary-400' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-neutral-500 mt-2">{stat.trend}</p>
                  {stat.clickable && (
                    <p className="text-xs text-primary-600 font-semibold mt-2">
                      {selectedStudent?.label === stat.label ? '↑ Hide suggestions' : '→ Click for suggestions'}
                    </p>
                  )}
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Suggestions Dropdown */}
              {stat.clickable && selectedStudent?.label === stat.label && stat.suggestions && (
                <div className="mt-4 pt-4 border-t-2 border-neutral-100 space-y-2">
                  <h3 className="font-bold text-sm text-neutral-700 mb-3">✨ Suggested Actions:</h3>
                  {stat.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        suggestion.action();
                        setSelectedStudent(null);
                      }}
                      className="w-full flex items-start gap-3 p-3 bg-neutral-50 hover:bg-primary-50 rounded-lg transition text-left group border border-transparent hover:border-primary-200"
                    >
                      <div className={`${stat.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                        <suggestion.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 text-sm">{suggestion.label}</div>
                        <div className="text-xs text-neutral-600 mt-0.5">{suggestion.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="font-display font-bold text-xl text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col items-center gap-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </Card>

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
                      <div className="font-bold text-neutral-900">{cls.class}</div>
                      <div className="text-sm text-neutral-600">{cls.topic}</div>
                    </div>
                  </div>
                  <div className="text-sm text-neutral-500">{cls.students} students</div>
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
                  <div className="font-semibold text-neutral-900 text-sm">{activity.student}</div>
                  <div className="text-sm text-neutral-600">{activity.action}</div>
                </div>
                <div className="text-xs text-neutral-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TutorHome;