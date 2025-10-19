import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card, { StatCard } from '../components/Card';
import { Home, Users, Calendar, FileText, Clock, ChevronRight } from 'lucide-react';

const TutorDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
    { id: 'classes', icon: Calendar, label: 'My Classes', color: 'text-blue-500' },
    { id: 'students', icon: Users, label: 'My Students', color: 'text-green-500' },
    { id: 'reports', icon: FileText, label: 'Reports', color: 'text-purple-500' }
  ];

  const todayClasses = [
    { id: 1, subject: "Mathematics", time: "10:00 AM", students: 8, grade: "Grade 5", room: "Room A" },
    { id: 2, subject: "Mathematics", time: "2:00 PM", students: 6, grade: "Grade 4", room: "Room B" },
    { id: 3, subject: "Mathematics", time: "4:00 PM", students: 10, grade: "Grade 6", room: "Room A" }
  ];

  const myStudents = [
    { id: 1, name: "Alex Chen", grade: "Grade 5", avatar: "🧒", score: 85, attendance: 96 },
    { id: 2, name: "Emma Chen", grade: "Grade 3", avatar: "👧", score: 92, attendance: 98 },
    { id: 3, name: "Lucas Wong", grade: "Grade 5", avatar: "👦", score: 78, attendance: 88 },
    { id: 4, name: "Sophia Lee", grade: "Grade 4", avatar: "👧", score: 88, attendance: 94 },
    { id: 5, name: "Ethan Cruz", grade: "Grade 6", avatar: "👦", score: 91, attendance: 97 },
    { id: 6, name: "Mia Santos", grade: "Grade 4", avatar: "👧", score: 86, attendance: 95 }
  ];

  const TutorHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Hello, {user.name}! 👩‍🏫</h1>
        <p className="text-lg opacity-90">You have 3 classes scheduled today</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard icon="👥" value="24" label="Total Students" color="blue" />
        <StatCard icon="📚" value="3" label="Classes Today" color="green" />
        <StatCard icon="📊" value="87%" label="Avg Performance" color="purple" />
      </div>

      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4 flex items-center gap-2">
          <Clock className="text-primary-500" />
          Today's Schedule
        </h2>
        <div className="space-y-3">
          {todayClasses.map((cls) => (
            <div key={cls.id} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100 hover:shadow-md transition">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                {cls.subject[0]}
              </div>
              <div className="flex-1">
                <div className="font-bold text-neutral-900">{cls.subject} - {cls.grade}</div>
                <div className="text-sm text-neutral-600">{cls.students} students • {cls.room}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary-600">{cls.time}</div>
                <div className="text-xs text-neutral-500">Today</div>
              </div>
              <ChevronRight className="text-neutral-400" />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 hover:shadow-md transition text-left">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-bold text-neutral-900">Mark Attendance</div>
            <div className="text-sm text-neutral-600">Record today's attendance</div>
          </button>
          <button className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-md transition text-left">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-bold text-neutral-900">Enter Grades</div>
            <div className="text-sm text-neutral-600">Update student scores</div>
          </button>
          <button className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-md transition text-left">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-bold text-neutral-900">Upload Materials</div>
            <div className="text-sm text-neutral-600">Share study resources</div>
          </button>
          <button className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 hover:shadow-md transition text-left">
            <div className="text-3xl mb-2">💬</div>
            <div className="font-bold text-neutral-900">Message Parents</div>
            <div className="text-sm text-neutral-600">Send updates & feedback</div>
          </button>
        </div>
      </Card>
    </div>
  );

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
        {activeTab === 'home' && <TutorHome />}
        {activeTab === 'classes' && <Classes />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'reports' && <Reports />}
      </div>
    </div>
  );
};

export default TutorDashboard;