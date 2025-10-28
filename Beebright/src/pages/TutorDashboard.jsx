// src/pages/TutorDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Home, Users, Calendar, FileText, Brain, ClipboardList, Bell } from 'lucide-react';
import TutorHome from './TutorHome';
import TutorAI from './TutorAI';
import StudentRecords from './TutorStudentRecords';

const TutorDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
    { id: 'ai', icon: Brain, label: 'AI Assistant', color: 'text-purple-500', badge: 'NEW' },
    { id: 'records', icon: ClipboardList, label: 'Student Records', color: 'text-yellow-500' },
    { id: 'classes', icon: Calendar, label: 'My Classes', color: 'text-blue-500' },
    { id: 'students', icon: Users, label: 'My Students', color: 'text-green-500' },
    { id: 'messages', icon: Bell, label: 'Messages', color: 'text-purple-500' },
    { id: 'reports', icon: FileText, label: 'Reports', color: 'text-orange-500' }
  ];

  const myStudents = [
    { id: 1, name: "Alex Chen", grade: "Grade 5", avatar: "🧒", score: 85, attendance: 96 },
    { id: 2, name: "Emma Chen", grade: "Grade 3", avatar: "👧", score: 92, attendance: 98 },
    { id: 3, name: "Lucas Wong", grade: "Grade 5", avatar: "👦", score: 78, attendance: 88 },
    { id: 4, name: "Sophia Lee", grade: "Grade 4", avatar: "👧", score: 88, attendance: 94 },
    { id: 5, name: "Ethan Cruz", grade: "Grade 6", avatar: "👦", score: 91, attendance: 97 },
    { id: 6, name: "Mia Santos", grade: "Grade 4", avatar: "👧", score: 86, attendance: 95 }
  ];

  const tutorMessages = [
    {
      id: 1,
      date: "Oct 24",
      title: "Question about Math Homework",
      message: "Hi Ms. Johnson, I'm having trouble understanding problem 5 on today's homework. Could you explain it during our next class?",
      priority: "normal",
      from: "Alex Chen",
      type: "question",
      status: "unread"
    },
    {
      id: 2,
      date: "Oct 24",
      title: "Parent Request for Conference",
      message: "Hello, I would like to schedule a meeting to discuss Emma's progress in Math. Are you available next week?",
      priority: "high",
      from: "Parent - Emma Chen",
      type: "meeting",
      status: "unread"
    },
    {
      id: 3,
      date: "Oct 23",
      title: "Science Project Extension Request",
      message: "Dear Teacher, May I have a 2-day extension for the Science project? I've been sick and couldn't work on it.",
      priority: "high",
      from: "Lucas Wong",
      type: "request",
      status: "read"
    },
    {
      id: 4,
      date: "Oct 23",
      title: "Thank You Note",
      message: "Thank you so much for the extra help session yesterday! I finally understand fractions now. You're the best teacher!",
      priority: "normal",
      from: "Sophia Lee",
      type: "feedback",
      status: "read"
    },
    {
      id: 5,
      date: "Oct 22",
      title: "Absence Notification",
      message: "Hi, Ethan will be absent tomorrow due to a doctor's appointment. Please send me the homework assignments.",
      priority: "normal",
      from: "Parent - Ethan Cruz",
      type: "notification",
      status: "read"
    },
    {
      id: 6,
      date: "Oct 21",
      title: "Study Group Request",
      message: "Can we form a study group for the upcoming Math exam? Several students are interested in extra practice sessions.",
      priority: "normal",
      from: "Mia Santos",
      type: "request",
      status: "read"
    },
    {
      id: 7,
      date: "Oct 20",
      title: "School Announcement",
      message: "Reminder: Parent-Teacher Conference Day is scheduled for November 2nd. Please prepare student progress reports.",
      priority: "high",
      from: "School Administration",
      type: "announcement",
      status: "read"
    }
  ];

  const Students = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">My Students 👥</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {myStudents.map((student) => (
          <div key={student.id} className="border-2 border-neutral-100 rounded-xl p-4 hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{student.avatar}</div>
              <div className="flex-1">
                <div className="font-bold text-neutral-900">{student.name}</div>
                <div className="text-sm text-neutral-600">{student.grade}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{student.score}%</div>
                <div className="text-xs text-neutral-600">Avg Score</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{student.attendance}%</div>
                <div className="text-xs text-neutral-600">Attendance</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const Classes = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">Weekly Schedule 📅</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Time</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Mon</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Tue</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Wed</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Thu</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Fri</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="py-3 px-4 font-semibold text-neutral-600">10:00 AM</td>
              <td className="py-3 px-4"><div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold">Grade 5 Math</div></td>
              <td className="py-3 px-4"><div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold">Grade 5 Math</div></td>
              <td className="py-3 px-4"><div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold">Grade 5 Math</div></td>
              <td className="py-3 px-4"><div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold">Grade 5 Math</div></td>
              <td className="py-3 px-4"><div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold">Grade 5 Math</div></td>
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="py-3 px-4 font-semibold text-neutral-600">2:00 PM</td>
              <td className="py-3 px-4"><div className="bg-green-100 text-green-700 p-2 rounded text-sm font-semibold">Grade 4 Math</div></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"><div className="bg-green-100 text-green-700 p-2 rounded text-sm font-semibold">Grade 4 Math</div></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"><div className="bg-green-100 text-green-700 p-2 rounded text-sm font-semibold">Grade 4 Math</div></td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-neutral-600">4:00 PM</td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"><div className="bg-purple-100 text-purple-700 p-2 rounded text-sm font-semibold">Grade 6 Math</div></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"><div className="bg-purple-100 text-purple-700 p-2 rounded text-sm font-semibold">Grade 6 Math</div></td>
              <td className="py-3 px-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );

  const Reports = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">Class Reports 📊</h2>
      <div className="text-center py-12 text-neutral-500">
        <div className="text-6xl mb-4">📈</div>
        <p>Generate and view detailed class performance reports</p>
        <button className="mt-4 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition">
          Generate Report
        </button>
      </div>
    </Card>
  );

  const Messages = () => {
    const [filter, setFilter] = useState('all'); // all, unread, students, parents

    const filteredMessages = tutorMessages.filter(msg => {
      if (filter === 'all') return true;
      if (filter === 'unread') return msg.status === 'unread';
      if (filter === 'students') return !msg.from.includes('Parent') && !msg.from.includes('Administration');
      if (filter === 'parents') return msg.from.includes('Parent');
      return true;
    });

    const unreadCount = tutorMessages.filter(m => m.status === 'unread').length;

    return (
      <div className="space-y-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-neutral-900">Messages & Notifications 📬</h2>
              <p className="text-sm text-neutral-600 mt-1">
                {unreadCount > 0 ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  filter === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  filter === 'unread'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </button>
              <button
                onClick={() => setFilter('students')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  filter === 'students'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setFilter('parents')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  filter === 'parents'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Parents
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 rounded-xl border-2 transition hover:shadow-md ${
                    message.status === 'unread'
                      ? 'border-primary-200 bg-primary-50'
                      : message.priority === 'high' 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {message.status === 'unread' && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                        )}
                        <div className="font-bold text-neutral-900">{message.title}</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-600 mb-2">
                        <span className="font-semibold">{message.from}</span>
                        <span>•</span>
                        <span className="capitalize">{message.type}</span>
                        <span>•</span>
                        <span>{message.date}</span>
                      </div>
                    </div>
                    {message.priority === 'high' && (
                      <div className="ml-4 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                        ⚠️ Important
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-neutral-700">{message.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-neutral-500">
                <div className="text-6xl mb-4">📭</div>
                <p>No messages in this category</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };

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
        {activeTab === 'home' && (
          <TutorHome 
            user={user} 
            setActiveTab={setActiveTab}
            setAiQuery={setAiQuery}
          />
        )}
        {activeTab === 'ai' && (
          <TutorAI 
            aiQuery={aiQuery}
            setAiQuery={setAiQuery}
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
          />
        )}
        {activeTab === 'records' && <StudentRecords />}
        {activeTab === 'classes' && <Classes />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'messages' && <Messages />}
        {activeTab === 'reports' && <Reports />}
      </div>
    </div>
  );
};

export default TutorDashboard;