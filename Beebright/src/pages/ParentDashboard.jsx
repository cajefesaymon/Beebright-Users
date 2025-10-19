import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card, { StatCard } from '../components/Card';
import { Home, Users, DollarSign, Bell } from 'lucide-react';

const ParentDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedChild, setSelectedChild] = useState({
    id: 1,
    name: "Alex Chen",
    grade: "Grade 5",
    avatar: "🧒"
  });

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
    { id: 'children', icon: Users, label: 'My Children', color: 'text-blue-500' },
    { id: 'payments', icon: DollarSign, label: 'Payments', color: 'text-green-500' },
    { id: 'messages', icon: Bell, label: 'Messages', color: 'text-purple-500' }
  ];

  const children = [
    { id: 1, name: "Alex Chen", grade: "Grade 5", avatar: "🧒" },
    { id: 2, name: "Emma Chen", grade: "Grade 3", avatar: "👧" }
  ];

  const payments = [
    { id: 1, date: "Oct 15, 2025", amount: "₱2,500", status: "Paid", method: "GCash" },
    { id: 2, date: "Oct 1, 2025", amount: "₱2,500", status: "Paid", method: "Bank Transfer" },
    { id: 3, date: "Nov 1, 2025", amount: "₱2,500", status: "Pending", method: "Pending" }
  ];

  const progressData = [
    { subject: "Math", score: 85, trend: "up" },
    { subject: "Science", score: 92, trend: "up" },
    { subject: "English", score: 78, trend: "down" },
    { subject: "History", score: 88, trend: "up" }
  ];

  const ParentHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Welcome, {user.name}! 👋</h1>
        <p className="text-lg opacity-90">Here's how your children are doing</p>
      </div>

      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Select Child</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child)}
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
                  <div className="text-sm text-neutral-600">{child.grade}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard icon="📚" value="96%" label="Attendance Rate" color="blue" />
        <StatCard icon="⭐" value="86%" label="Average Score" color="green" />
        <StatCard icon="✅" value="18/20" label="Completed Tasks" color="purple" />
      </div>

      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Performance Overview</h2>
        <div className="space-y-4">
          {progressData.map((item, idx) => (
            <div key={idx} className="border-2 border-neutral-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-neutral-900">{item.subject}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary-600">{item.score}%</span>
                  {item.trend === 'up' ? (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">↑ Improving</div>
                  ) : (
                    <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold">Needs attention</div>
                  )}
                </div>
              </div>
              <div className="bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

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
                <div className="text-sm text-neutral-600">{payment.date}</div>
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
              <div className="text-xs text-neutral-500 mt-1">{payment.method}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const Messages = () => (
    <Card>
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Messages & Announcements 📧</h2>
      <div className="text-center py-12 text-neutral-500">
        <div className="text-6xl mb-4">📬</div>
        <p>No new messages</p>
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
        {activeTab === 'home' && <ParentHome />}
        {activeTab === 'children' && <ParentHome />}
        {activeTab === 'payments' && <Payments />}
        {activeTab === 'messages' && <Messages />}
      </div>
    </div>
  );
};

export default ParentDashboard;