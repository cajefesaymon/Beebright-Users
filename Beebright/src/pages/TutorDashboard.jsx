// src/pages/TutorDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Home, Users, Calendar, FileText, Brain, ClipboardList } from 'lucide-react';
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
    { id: 'reports', icon: FileText, label: 'Reports', color: 'text-purple-500' }
  ];

  const myStudents = [
    { id: 1, name: "Alex Chen", grade: "Grade 5", avatar: "🧒", score: 85, attendance: 96 },
    { id: 2, name: "Emma Chen", grade: "Grade 3", avatar: "👧", score: 92, attendance: 98 },
    { id: 3, name: "Lucas Wong", grade: "Grade 5", avatar: "👦", score: 78, attendance: 88 },
    { id: 4, name: "Sophia Lee", grade: "Grade 4", avatar: "👧", score: 88, attendance: 94 },
    { id: 5, name: "Ethan Cruz", grade: "Grade 6", avatar: "👦", score: 91, attendance: 97 },
    { id: 6, name: "Mia Santos", grade: "Grade 4", avatar: "👧", score: 86, attendance: 95 }
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
        {activeTab === 'reports' && <Reports />}
      </div>
    </div>
  );
};

export default TutorDashboard;