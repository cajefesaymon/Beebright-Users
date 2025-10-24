  import React, { useState } from 'react';
  import { useAuth } from '../context/AuthContext';
  import Sidebar from '../components/Sidebar';
  import Card, { StatCard } from '../components/Card';
  import { Home, Users, DollarSign, Bell, Calendar, BookOpen, TrendingUp } from 'lucide-react';

  const ParentDashboard = ({ onLogout }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('home');

    const menuItems = [
      { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
      { id: 'children', icon: Users, label: 'My Children', color: 'text-blue-500' },
      { id: 'payments', icon: DollarSign, label: 'Payments', color: 'text-green-500' },
      { id: 'messages', icon: Bell, label: 'Messages', color: 'text-purple-500' }
    ];

    const children = [
      { 
        id: 1, 
        name: "Alex Chen", 
        grade: "Grade 5",
        section: "St. Francis",
        avatar: "🧒",
        attendance: 96,
        averageScore: 86,
        tasksCompleted: 18,
        totalTasks: 20,
        subjects: [
          { 
            name: "Math", 
            score: 85, 
            teacher: "Ms. Rodriguez", 
            trend: "up", 
            lastTest: 88,
            recentScores: [
              { date: "Oct 23", assignment: "Quiz - Chapter 5", score: 88, type: "quiz" },
              { date: "Oct 18", assignment: "Homework Set 12", score: 92, type: "homework" },
              { date: "Oct 15", assignment: "Mid-term Exam", score: 78, type: "exam" },
              { date: "Oct 10", assignment: "Problem Set 11", score: 85, type: "homework" }
            ]
          },
          { 
            name: "Science", 
            score: 92, 
            teacher: "Mr. Thompson", 
            trend: "up", 
            lastTest: 95,
            recentScores: [
              { date: "Oct 22", assignment: "Lab Report: Solar System", score: 95, type: "project" },
              { date: "Oct 19", assignment: "Quiz - Planets", score: 90, type: "quiz" },
              { date: "Oct 14", assignment: "Experiment Documentation", score: 94, type: "assignment" },
              { date: "Oct 8", assignment: "Chapter Test", score: 88, type: "exam" }
            ]
          },
          { 
            name: "English", 
            score: 78, 
            teacher: "Mrs. Garcia", 
            trend: "down", 
            lastTest: 75,
            recentScores: [
              { date: "Oct 20", assignment: "Essay - My Hero", score: 75, type: "assignment" },
              { date: "Oct 16", assignment: "Grammar Quiz", score: 82, type: "quiz" },
              { date: "Oct 12", assignment: "Reading Comprehension", score: 78, type: "quiz" },
              { date: "Oct 5", assignment: "Vocabulary Test", score: 76, type: "exam" }
            ]
          },
          { 
            name: "History", 
            score: 88, 
            teacher: "Mr. Santos", 
            trend: "up", 
            lastTest: 90,
            recentScores: [
              { date: "Oct 21", assignment: "Chapter 8 Test", score: 90, type: "exam" },
              { date: "Oct 17", assignment: "Historical Timeline Project", score: 92, type: "project" },
              { date: "Oct 11", assignment: "Quiz - Ancient Civilizations", score: 85, type: "quiz" },
              { date: "Oct 6", assignment: "Essay - World War II", score: 86, type: "assignment" }
            ]
          }
        ],
        attendanceRecords: [
          { date: "Oct 24", status: "present", day: "Friday" },
          { date: "Oct 23", status: "present", day: "Thursday" },
          { date: "Oct 22", status: "present", day: "Wednesday" },
          { date: "Oct 21", status: "present", day: "Tuesday" },
          { date: "Oct 20", status: "absent", day: "Monday", reason: "Sick" },
          { date: "Oct 17", status: "present", day: "Friday" },
          { date: "Oct 16", status: "present", day: "Thursday" },
          { date: "Oct 15", status: "present", day: "Wednesday" },
          { date: "Oct 14", status: "present", day: "Tuesday" },
          { date: "Oct 13", status: "present", day: "Monday" }
        ],
        recentActivities: [
          { date: "Oct 23", activity: "Math Quiz - Chapter 5", score: 88, type: "quiz" },
          { date: "Oct 22", activity: "Science Project Submitted", score: 95, type: "project" },
          { date: "Oct 20", activity: "English Essay", score: 75, type: "assignment" }
        ],
        upcomingEvents: [
          { date: "Oct 28", event: "Math Exam - Chapters 4-6", type: "exam" },
          { date: "Oct 30", event: "Science Fair Presentation", type: "event" },
          { date: "Nov 2", event: "Parent-Teacher Conference", type: "meeting" }
        ]
      },
      { 
        id: 2, 
        name: "Emma Chen", 
        grade: "Grade 3",
        section: "St. Mary",
        avatar: "👧",
        attendance: 98,
        averageScore: 91,
        tasksCompleted: 15,
        totalTasks: 16,
        subjects: [
          { 
            name: "Math", 
            score: 90, 
            teacher: "Ms. Lee", 
            trend: "up", 
            lastTest: 92,
            recentScores: [
              { date: "Oct 23", assignment: "Practice Test - Addition", score: 92, type: "quiz" },
              { date: "Oct 19", assignment: "Multiplication Tables", score: 95, type: "homework" },
              { date: "Oct 14", assignment: "Math Games Assessment", score: 88, type: "quiz" },
              { date: "Oct 9", assignment: "Unit 3 Test", score: 87, type: "exam" }
            ]
          },
          { 
            name: "Science", 
            score: 88, 
            teacher: "Mr. Brown", 
            trend: "up", 
            lastTest: 90,
            recentScores: [
              { date: "Oct 22", assignment: "Animals Habitat Quiz", score: 90, type: "quiz" },
              { date: "Oct 18", assignment: "Science Journal", score: 92, type: "assignment" },
              { date: "Oct 13", assignment: "Plants Project", score: 85, type: "project" },
              { date: "Oct 7", assignment: "Chapter Review", score: 86, type: "quiz" }
            ]
          },
          { 
            name: "English", 
            score: 94, 
            teacher: "Mrs. Davis", 
            trend: "up", 
            lastTest: 96,
            recentScores: [
              { date: "Oct 21", assignment: "Reading Comprehension", score: 96, type: "assignment" },
              { date: "Oct 17", assignment: "Spelling Test", score: 94, type: "quiz" },
              { date: "Oct 12", assignment: "Creative Writing", score: 93, type: "assignment" },
              { date: "Oct 6", assignment: "Grammar Worksheet", score: 92, type: "homework" }
            ]
          },
          { 
            name: "Arts", 
            score: 92, 
            teacher: "Ms. Wilson", 
            trend: "up", 
            lastTest: 94,
            recentScores: [
              { date: "Oct 19", assignment: "Nature Collage", score: 94, type: "project" },
              { date: "Oct 15", assignment: "Color Theory Quiz", score: 90, type: "quiz" },
              { date: "Oct 10", assignment: "Self Portrait", score: 93, type: "project" },
              { date: "Oct 4", assignment: "Art History", score: 91, type: "assignment" }
            ]
          }
        ],
        attendanceRecords: [
          { date: "Oct 24", status: "present", day: "Friday" },
          { date: "Oct 23", status: "present", day: "Thursday" },
          { date: "Oct 22", status: "present", day: "Wednesday" },
          { date: "Oct 21", status: "present", day: "Tuesday" },
          { date: "Oct 20", status: "present", day: "Monday" },
          { date: "Oct 17", status: "present", day: "Friday" },
          { date: "Oct 16", status: "present", day: "Thursday" },
          { date: "Oct 15", status: "present", day: "Wednesday" },
          { date: "Oct 14", status: "absent", day: "Tuesday", reason: "Doctor's appointment" },
          { date: "Oct 13", status: "present", day: "Monday" }
        ],
        recentActivities: [
          { date: "Oct 23", activity: "Math Practice Test", score: 92, type: "quiz" },
          { date: "Oct 21", activity: "Reading Comprehension", score: 96, type: "assignment" },
          { date: "Oct 19", activity: "Art Project: Nature Collage", score: 94, type: "project" }
        ],
        upcomingEvents: [
          { date: "Oct 27", event: "Spelling Bee Competition", type: "event" },
          { date: "Nov 1", event: "Math Unit Test", type: "exam" },
          { date: "Nov 5", event: "School Field Trip", type: "event" }
        ]
      }
    ];

    const payments = [
      { id: 1, date: "Oct 15, 2025", amount: "₱2,500", status: "Paid", method: "GCash", child: "Alex Chen", description: "Monthly Tuition" },
      { id: 2, date: "Oct 15, 2025", amount: "₱2,500", status: "Paid", method: "GCash", child: "Emma Chen", description: "Monthly Tuition" },
      { id: 3, date: "Oct 1, 2025", amount: "₱2,500", status: "Paid", method: "Bank Transfer", child: "Alex Chen", description: "Monthly Tuition" },
      { id: 4, date: "Nov 1, 2025", amount: "₱2,500", status: "Pending", method: "Pending", child: "Alex Chen", description: "Monthly Tuition" },
      { id: 5, date: "Nov 1, 2025", amount: "₱2,500", status: "Pending", method: "Pending", child: "Emma Chen", description: "Monthly Tuition" }
    ];

    const recentAnnouncements = [
      { id: 1, date: "Oct 23", title: "School Holiday Reminder", message: "School will be closed on November 1-2 for All Saints' Day", priority: "normal" },
      { id: 2, date: "Oct 20", title: "Parent-Teacher Conference", message: "Scheduled for November 2, 2025. Please confirm your attendance.", priority: "high" },
      { id: 3, date: "Oct 18", title: "Science Fair Next Week", message: "Don't forget to prepare your child's science project!", priority: "normal" }
    ];

    // Dashboard - Overview of all children
    const DashboardHome = () => (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome, {user.name}! 👋</h1>
          <p className="text-lg opacity-90">Here's a quick overview of your children's progress</p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard icon="👥" value={children.length} label="Enrolled Children" color="blue" />
          <StatCard icon="📚" value="97%" label="Avg Attendance" color="green" />
          <StatCard icon="⭐" value="88.5%" label="Avg Performance" color="purple" />
          <StatCard icon="💰" value="₱5,000" label="Pending Payments" color="orange" />
        </div>

        {/* Children Quick View */}
        <Card>
          <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Children Overview</h2>
          <div className="space-y-4">
            {children.map((child) => (
              <div key={child.id} className="border-2 border-neutral-200 rounded-xl p-5 hover:border-primary-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{child.avatar}</div>
                    <div>
                      <div className="font-bold text-xl text-neutral-900">{child.name}</div>
                      <div className="text-sm text-neutral-600">{child.grade} - {child.section}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">{child.averageScore}%</div>
                    <div className="text-xs text-neutral-500">Average Score</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-blue-600">{child.attendance}%</div>
                    <div className="text-xs text-neutral-600">Attendance</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-600">{child.tasksCompleted}/{child.totalTasks}</div>
                    <div className="text-xs text-neutral-600">Tasks Done</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-purple-600">{child.subjects.length}</div>
                    <div className="text-xs text-neutral-600">Subjects</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities Across All Children */}
        <Card>
          <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4 flex items-center gap-2">
            ⏰ Recent Activities
          </h2>
          <div className="space-y-3">
            {children.flatMap(child => 
              child.recentActivities.slice(0, 2).map((activity, idx) => (
                <div key={`${child.id}-${idx}`} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                      {child.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900">{child.name}</div>
                      <div className="text-sm text-neutral-600">{activity.activity}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary-600">{activity.score}%</div>
                    <div className="text-xs text-neutral-500">{activity.date}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4 flex items-center gap-2">
            <Calendar size={24} className="text-purple-500" />
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {children.flatMap(child => 
              child.upcomingEvents.slice(0, 2).map((event, idx) => (
                <div key={`${child.id}-${idx}`} className="flex items-center justify-between p-4 rounded-xl border-2 border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      event.type === 'exam' ? 'bg-red-100 text-red-600' :
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {event.type === 'exam' ? '📝' : event.type === 'meeting' ? '👥' : '🎉'}
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900">{event.event}</div>
                      <div className="text-sm text-neutral-600">{child.name} - {child.grade}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-neutral-700">{event.date}</div>
                    <div className="text-xs text-neutral-500 capitalize">{event.type}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    );

    // My Children - Detailed view for each child
    const MyChildren = () => {
      const [selectedChild, setSelectedChild] = useState(children[0]);
      const [selectedSubject, setSelectedSubject] = useState(null);
      const [viewMode, setViewMode] = useState('overview'); // 'overview', 'scores', 'attendance'

      return (
        <div className="space-y-6">
          {/* Child Selector */}
          <Card>
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Select Child</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    setSelectedChild(child);
                    setSelectedSubject(null);
                    setViewMode('overview');
                  }}
                  className={`p-4 rounded-xl border-2 transition ${
                    selectedChild.id === child.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{child.avatar}</div>
                    <div className="text-left">
                      <div className="font-bold text-neutral-900">{child.name}</div>
                      <div className="text-sm text-neutral-600">{child.grade} - {child.section}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* View Mode Tabs */}
          <Card>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  viewMode === 'overview'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setViewMode('scores')}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  viewMode === 'scores'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                📝 Scores & Grades
              </button>
              <button
                onClick={() => setViewMode('attendance')}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  viewMode === 'attendance'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                📅 Attendance
              </button>
            </div>
          </Card>

          {/* Overview Mode */}
          {viewMode === 'overview' && (
            <>
              {/* Selected Child Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <StatCard icon="📚" value={`${selectedChild.attendance}%`} label="Attendance Rate" color="blue" />
                <StatCard icon="⭐" value={`${selectedChild.averageScore}%`} label="Average Score" color="green" />
                <StatCard icon="✅" value={`${selectedChild.tasksCompleted}/${selectedChild.totalTasks}`} label="Completed Tasks" color="purple" />
              </div>

              {/* Subject Performance */}
              <Card>
                <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4 flex items-center gap-2">
                  <BookOpen size={24} className="text-primary-500" />
                  Subject Performance
                </h2>
                <div className="space-y-4">
                  {selectedChild.subjects.map((subject, idx) => (
                    <div key={idx} className="border-2 border-neutral-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-bold text-lg text-neutral-900">{subject.name}</div>
                          <div className="text-sm text-neutral-600">Teacher: {subject.teacher}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600">{subject.score}%</div>
                            <div className="text-xs text-neutral-500">Last Test: {subject.lastTest}%</div>
                          </div>
                          {subject.trend === 'up' ? (
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <TrendingUp size={14} /> Improving
                            </div>
                          ) : (
                            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                              ⚠️ Needs attention
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="bg-neutral-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full transition-all"
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activities */}
              <Card>
                <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Recent Activities</h2>
                <div className="space-y-3">
                  {selectedChild.recentActivities.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-neutral-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'project' ? 'bg-purple-100 text-purple-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {activity.type === 'quiz' ? '📝' : activity.type === 'project' ? '📊' : '📄'}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900">{activity.activity}</div>
                          <div className="text-sm text-neutral-600 capitalize">{activity.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">{activity.score}%</div>
                        <div className="text-xs text-neutral-500">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Events for Selected Child */}
              <Card>
                <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4 flex items-center gap-2">
                  <Calendar size={24} className="text-purple-500" />
                  Upcoming Events
                </h2>
                <div className="space-y-3">
                  {selectedChild.upcomingEvents.map((event, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border-2 border-neutral-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          event.type === 'exam' ? 'bg-red-100 text-red-600' :
                          event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {event.type === 'exam' ? '📝' : event.type === 'meeting' ? '👥' : '🎉'}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900">{event.event}</div>
                          <div className="text-sm text-neutral-600 capitalize">{event.type}</div>
                        </div>
                      </div>
                      <div className="font-bold text-neutral-700">{event.date}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Scores & Grades Mode */}
          {viewMode === 'scores' && (
            <Card>
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">
                Detailed Scores & Grades - {selectedChild.name}
              </h2>
              
              {/* Subject Selector */}
              <div className="grid md:grid-cols-4 gap-3 mb-6">
                {selectedChild.subjects.map((subject, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubject(subject)}
                    className={`p-4 rounded-xl border-2 transition ${
                      selectedSubject?.name === subject.name
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">{subject.score}%</div>
                      <div className="text-sm font-semibold text-neutral-900 mt-1">{subject.name}</div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedSubject ? (
                <div className="space-y-4">
                  {/* Subject Header */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">{selectedSubject.name}</h3>
                        <p className="text-neutral-600">Teacher: {selectedSubject.teacher}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-primary-600">{selectedSubject.score}%</div>
                        <div className="text-sm text-neutral-600">Overall Average</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Scores */}
                  <h3 className="font-bold text-xl text-neutral-900 mt-6">Recent Assignments & Tests</h3>
                  <div className="space-y-3">
                    {selectedSubject.recentScores.map((scoreItem, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-neutral-200">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            scoreItem.type === 'exam' ? 'bg-red-100 text-red-600' :
                            scoreItem.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                            scoreItem.type === 'project' ? 'bg-purple-100 text-purple-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {scoreItem.type === 'exam' ? '📝' : 
                            scoreItem.type === 'quiz' ? '❓' : 
                            scoreItem.type === 'project' ? '📊' : '📄'}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-900">{scoreItem.assignment}</div>
                            <div className="text-sm text-neutral-600">{scoreItem.date} • <span className="capitalize">{scoreItem.type}</span></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${
                            scoreItem.score >= 90 ? 'text-green-600' :
                            scoreItem.score >= 80 ? 'text-blue-600' :
                            scoreItem.score >= 70 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {scoreItem.score}%
                          </div>
                          <div className="text-xs text-neutral-500">
                            {scoreItem.score >= 90 ? 'Excellent' :
                            scoreItem.score >= 80 ? 'Good' :
                            scoreItem.score >= 70 ? 'Fair' : 'Needs Improvement'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  <div className="text-6xl mb-4">📚</div>
                  <p>Select a subject to view detailed scores</p>
                </div>
              )}
            </Card>
          )}

          {/* Attendance Mode */}
          {viewMode === 'attendance' && (
            <Card>
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">
                Attendance Records - {selectedChild.name}
              </h2>
              
              {/* Attendance Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="text-green-600 text-sm font-medium mb-1">Present Days</div>
                  <div className="text-3xl font-bold text-green-700">
                    {selectedChild.attendanceRecords.filter(r => r.status === 'present').length}
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                  <div className="text-red-600 text-sm font-medium mb-1">Absent Days</div>
                  <div className="text-3xl font-bold text-red-700">
                    {selectedChild.attendanceRecords.filter(r => r.status === 'absent').length}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="text-blue-600 text-sm font-medium mb-1">Attendance Rate</div>
                  <div className="text-3xl font-bold text-blue-700">{selectedChild.attendance}%</div>
                </div>
              </div>

              {/* Attendance Calendar */}
              <h3 className="font-bold text-xl text-neutral-900 mb-4">Recent Attendance</h3>
              <div className="space-y-2">
                {selectedChild.attendanceRecords.map((record, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                      record.status === 'present' 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        record.status === 'present' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {record.status === 'present' ? '✅' : '❌'}
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900">{record.date}</div>
                        <div className="text-sm text-neutral-600">{record.day}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-4 py-2 rounded-full font-semibold ${
                        record.status === 'present'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.status === 'present' ? 'Present' : 'Absent'}
                      </div>
                      {record.reason && (
                        <div className="text-xs text-neutral-600 mt-1">Reason: {record.reason}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      );
    };

    const Payments = () => (
      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">Payment History 💳</h2>
        <div className="space-y-3">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-neutral-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  payment.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  <DollarSign size={24} />
                </div>
                <div>
                  <div className="font-bold text-neutral-900">{payment.amount}</div>
                  <div className="text-sm text-neutral-600">{payment.child} - {payment.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  payment.status === 'Paid'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {payment.status}
                </div>
                <div className="text-xs text-neutral-500 mt-1">{payment.date}</div>
                <div className="text-xs text-neutral-500">{payment.method}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );

    const Messages = () => (
      <div className="space-y-6">
        <Card>
          <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">School Announcements 📢</h2>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className={`p-4 rounded-xl border-2 ${
                announcement.priority === 'high' 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-neutral-200 bg-neutral-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="font-bold text-neutral-900">{announcement.title}</div>
                  <div className="text-xs text-neutral-500">{announcement.date}</div>
                </div>
                <p className="text-sm text-neutral-700">{announcement.message}</p>
                {announcement.priority === 'high' && (
                  <div className="mt-2 inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                    ⚠️ Important
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );

    return (
      <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen">
        <Sidebar 
          user={user} 
          menuItems={menuItems} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
        />
        <div className="ml-64 p-8">
          {activeTab === 'home' && <DashboardHome />}
          {activeTab === 'children' && <MyChildren />}
          {activeTab === 'payments' && <Payments />}
          {activeTab === 'messages' && <Messages />}
        </div>
      </div>
    );
  };

  export default ParentDashboard;