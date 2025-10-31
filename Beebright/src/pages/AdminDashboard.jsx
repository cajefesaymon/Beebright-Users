import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card, { StatCard } from '../components/Card';
import { Home, Users as UsersIcon, DollarSign, BookOpen, Settings, Bell, Check, X, Mail, Phone, User, Shield, Edit2, Trash2, Plus } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  
  // Enrollments State
  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      studentName: 'Lucas Wong',
      grade: 'Grade 5',
      parentName: 'Mr. Henry Wong',
      parentEmail: 'henry.wong@email.com',
      parentPhone: '09123456789',
      address: '123 Main St, Manila',
      subjects: ['Math', 'Science'],
      preferredSchedule: 'Mon-Wed-Fri, 4:00 PM',
      status: 'pending',
      dateSubmitted: 'Oct 18, 2025'
    },
    {
      id: 2,
      studentName: 'Sophia Lee',
      grade: 'Grade 4',
      parentName: 'Mrs. Sarah Lee',
      parentEmail: 'sarah.lee@email.com',
      parentPhone: '09187654321',
      address: '456 Oak Ave, Quezon City',
      subjects: ['English', 'Filipino'],
      preferredSchedule: 'Tue-Thu, 3:00 PM',
      status: 'pending',
      dateSubmitted: 'Oct 17, 2025'
    },
    {
      id: 3,
      studentName: 'Ethan Cruz',
      grade: 'Grade 6',
      parentName: 'Mr. Carlos Cruz',
      parentEmail: 'carlos.cruz@email.com',
      parentPhone: '09199876543',
      address: '789 Pine Rd, Makati',
      subjects: ['Math', 'English', 'Science'],
      preferredSchedule: 'Mon-Wed-Fri, 5:00 PM',
      status: 'approved',
      dateSubmitted: 'Oct 16, 2025'
    }
  ]);

  // Users State
  const [users, setUsers] = useState([
    { id: 1, name: "Alex Chen", email: "alex@student.com", role: "Student", phone: "09123456789", avatar: "🧒", joinDate: "Oct 1, 2025" },
    { id: 2, name: "Mrs. Chen", email: "parent@beebright.com", role: "Parent", phone: "09123456790", avatar: "👩", joinDate: "Sep 28, 2025" },
    { id: 3, name: "Maria Santos", email: "maria@student.com", role: "Student", phone: "09123456791", avatar: "🧒", joinDate: "Oct 10, 2025" }
  ]);

  // Admins State
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Admin", email: "john@admin.com", phone: "09111111111", joinDate: "Aug 1, 2025" },
    { id: 2, name: "Sarah Manager", email: "sarah@admin.com", phone: "09222222222", joinDate: "Sep 15, 2025" }
  ]);

  // Tutors State
  const [tutors, setTutors] = useState([
    { id: 1, name: "Ms. Garcia", email: "garcia@tutor.com", expertise: ["Math", "Science"], phone: "09187654321", joinDate: "Aug 15, 2025" },
    { id: 2, name: "Mr. Rodriguez", email: "rodriguez@tutor.com", expertise: ["English", "Filipino"], phone: "09187654322", joinDate: "Sep 1, 2025" },
    { id: 3, name: "Ms. Reyes", email: "reyes@tutor.com", expertise: ["Math", "English", "Science"], phone: "09187654323", joinDate: "Jul 20, 2025" }
  ]);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editingTutor, setEditingTutor] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [searchAdmin, setSearchAdmin] = useState('');
  const [searchTutor, setSearchTutor] = useState('');

  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Student', phone: '' });
  const [adminForm, setAdminForm] = useState({ name: '', email: '', phone: '' });
  const [tutorForm, setTutorForm] = useState({ name: '', email: '', phone: '', expertise: '' });

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
    { id: 'enrollments', icon: BookOpen, label: 'Enrollments', color: 'text-orange-500', badge: enrollments.filter(e => e.status === 'pending').length },
    { id: 'users', icon: UsersIcon, label: 'Users', color: 'text-blue-500' },
    { id: 'admins', icon: Shield, label: 'Admins', color: 'text-red-500' },
    { id: 'tutors', icon: BookOpen, label: 'Tutors', color: 'text-purple-500' },
    { id: 'announcements', icon: Bell, label: 'Announcements', color: 'text-green-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-neutral-500' }
  ];

  // ENROLLMENT HANDLERS
  const handleApprove = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowApprovalModal(true);
  };

  const confirmApproval = () => {
    const studentEmail = `${selectedEnrollment.studentName.toLowerCase().replace(/ /g, '.')}@student.beebright.com`;
    const parentEmail = selectedEnrollment.parentEmail;
    const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();

    setEnrollments(enrollments.map(e => 
      e.id === selectedEnrollment.id 
        ? { ...e, status: 'approved', studentEmail, generatedPassword } 
        : e
    ));

    alert(`✅ Enrollment Approved!\n\n📧 Credentials have been generated:\n\n👨‍🎓 Student Account:\nEmail: ${studentEmail}\nPassword: ${generatedPassword}\n\n👨‍👩‍👧 Parent Account:\nEmail: ${parentEmail}\nPassword: ${generatedPassword}\n\n📨 In production, these credentials would be sent via email.`);

    setShowApprovalModal(false);
    setSelectedEnrollment(null);
  };

  const handleReject = (enrollment) => {
    if (window.confirm(`Are you sure you want to reject the enrollment for ${enrollment.studentName}?`)) {
      setEnrollments(enrollments.map(e => 
        e.id === enrollment.id ? { ...e, status: 'rejected' } : e
      ));
      alert(`❌ Enrollment for ${enrollment.studentName} has been rejected.`);
    }
  };

  // USER HANDLERS
  const handleAddUser = () => {
    if (userForm.name && userForm.email) {
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
        setEditingUser(null);
      } else {
        setUsers([...users, { 
          id: Date.now(), 
          ...userForm, 
          avatar: '🧒',
          joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
        }]);
      }
      setUserForm({ name: '', email: '', role: 'Student', phone: '' });
      setShowUserModal(false);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm(user);
    setShowUserModal(true);
  };

  // ADMIN HANDLERS
  const handleAddAdmin = () => {
    if (adminForm.name && adminForm.email) {
      if (editingAdmin) {
        setAdmins(admins.map(a => a.id === editingAdmin.id ? { ...a, ...adminForm } : a));
        setEditingAdmin(null);
      } else {
        const password = Math.random().toString(36).slice(-8).toUpperCase();
        setAdmins([...admins, { 
          id: Date.now(), 
          ...adminForm, 
          joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        }]);
        alert(`✅ Admin Account Created!\n\nEmail: ${adminForm.email}\nTemporary Password: ${password}\n\nPlease share these credentials securely.`);
      }
      setAdminForm({ name: '', email: '', phone: '' });
      setShowAdminModal(false);
    }
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to delete this admin account?')) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setAdminForm(admin);
    setShowAdminModal(true);
  };

  // TUTOR HANDLERS
  const handleAddTutor = () => {
    if (tutorForm.name && tutorForm.email && tutorForm.expertise) {
      if (editingTutor) {
        setTutors(tutors.map(t => t.id === editingTutor.id ? { 
          ...t, 
          ...tutorForm, 
          expertise: tutorForm.expertise.split(',').map(e => e.trim()) 
        } : t));
        setEditingTutor(null);
      } else {
        setTutors([...tutors, { 
          id: Date.now(), 
          ...tutorForm, 
          expertise: tutorForm.expertise.split(',').map(e => e.trim()), 
          joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
        }]);
      }
      setTutorForm({ name: '', email: '', phone: '', expertise: '' });
      setShowTutorModal(false);
    }
  };

  const handleDeleteTutor = (id) => {
    if (window.confirm('Are you sure you want to delete this tutor?')) {
      setTutors(tutors.filter(t => t.id !== id));
    }
  };

  const handleEditTutor = (tutor) => {
    setEditingTutor(tutor);
    setTutorForm({ ...tutor, expertise: tutor.expertise.join(', ') });
    setShowTutorModal(true);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredAdmins = admins.filter(a => 
    a.name.toLowerCase().includes(searchAdmin.toLowerCase()) || 
    a.email.toLowerCase().includes(searchAdmin.toLowerCase())
  );
  
  const filteredTutors = tutors.filter(t => 
    t.name.toLowerCase().includes(searchTutor.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTutor.toLowerCase())
  );


  const pendingCount = enrollments.filter(e => e.status === 'pending').length;
  const approvedCount = enrollments.filter(e => e.status === 'approved').length;

  const AdminHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Admin Dashboard 👨‍💼</h1>
        <p className="text-lg opacity-90">Complete overview of Bee Bright operations</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard icon="👥" value={users.length} label="Total Users" color="blue" />
        <StatCard icon="🛡️" value={admins.length} label="Admin Accounts" color="purple" />
        <StatCard icon="👨‍🏫" value={tutors.length} label="Tutors" color="green" />
        <StatCard icon="📊" value={pendingCount} label="Pending Enrollments" color="orange" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-4 flex items-center gap-2">
            <BookOpen className="text-orange-500" />
            Recent Enrollments
            {pendingCount > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {enrollments.slice(0, 3).map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50">
                <div>
                  <div className="font-bold text-neutral-900">{enrollment.studentName}</div>
                  <div className="text-sm text-neutral-600">{enrollment.grade} • {enrollment.dateSubmitted}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  enrollment.status === 'approved' 
                    ? 'bg-green-100 text-green-700' 
                    : enrollment.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('enrollments')}
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            View All Enrollments
          </button>
        </Card>
      </div>
    </div>
  );

  const EnrollmentManagement = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-neutral-900 flex items-center gap-2">
            <BookOpen className="text-orange-500" />
            Enrollment Management
          </h2>
          <div className="flex gap-3">
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold">
              {pendingCount} Pending
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">
              {approvedCount} Approved
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div 
              key={enrollment.id} 
              className={`p-6 rounded-2xl border-2 ${
                enrollment.status === 'pending' 
                  ? 'bg-orange-50 border-orange-200' 
                  : enrollment.status === 'approved'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl text-neutral-900 mb-1">
                    {enrollment.studentName}
                  </h3>
                  <div className="text-sm text-neutral-600">
                    Submitted: {enrollment.dateSubmitted}
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                  enrollment.status === 'approved' 
                    ? 'bg-green-500 text-white' 
                    : enrollment.status === 'rejected'
                    ? 'bg-red-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}>
                  {enrollment.status.toUpperCase()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase mb-1">
                    Student Info
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm">{enrollment.grade}</span>
                    </div>
                    <div className="text-sm text-neutral-600">{enrollment.address}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase mb-1">
                    Parent Contact
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm font-semibold">{enrollment.parentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm">{enrollment.parentEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm">{enrollment.parentPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase mb-1">
                    Subjects Requested
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {enrollment.subjects.map((subject, idx) => (
                      <span 
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase mb-1">
                    Preferred Schedule
                  </div>
                  <div className="text-sm text-neutral-600">
                    {enrollment.preferredSchedule}
                  </div>
                </div>
              </div>

              {enrollment.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t-2 border-neutral-200">
                  <button
                    onClick={() => handleApprove(enrollment)}
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Approve & Create Account
                  </button>
                  <button
                    onClick={() => handleReject(enrollment)}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject
                  </button>
                </div>
              )}

              {enrollment.status === 'approved' && enrollment.studentEmail && (
                <div className="mt-4 p-4 bg-white rounded-xl border-2 border-green-300">
                  <div className="text-xs font-semibold text-green-700 uppercase mb-2">
                    ✅ Generated Credentials
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-semibold text-neutral-700">Student Email:</div>
                      <div className="text-neutral-600">{enrollment.studentEmail}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-700">Password:</div>
                      <div className="font-mono text-neutral-600">{enrollment.generatedPassword}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {showApprovalModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Confirm Enrollment Approval
            </h3>
            <p className="text-neutral-600 mb-6">
              You are about to approve the enrollment for <strong>{selectedEnrollment.studentName}</strong> and create student and parent accounts.
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">📧 Credentials will be generated for:</p>
                <ul className="space-y-1">
                  <li>• Student: {selectedEnrollment.studentName}</li>
                  <li>• Parent: {selectedEnrollment.parentName}</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={confirmApproval}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition"
              >
                Confirm Approval
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedEnrollment(null);
                }}
                className="flex-1 bg-neutral-200 text-neutral-700 py-3 rounded-xl font-bold hover:bg-neutral-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Users = () => (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">User Management 👥</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setUserForm({ name: '', email: '', role: 'Student', phone: '' });
            setShowUserModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none mb-6"
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Name</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Role</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Email</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Phone</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Join Date</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{user.avatar}</span>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 text-neutral-600">{user.email}</td>
                <td className="py-3 px-4 text-neutral-600">{user.phone}</td>
                <td className="py-3 px-4 text-neutral-600">{user.joinDate}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              >
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddUser}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition"
              >
                {editingUser ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
                className="flex-1 bg-neutral-200 text-neutral-700 py-3 rounded-xl font-bold hover:bg-neutral-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );

  const Admins = () => (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">Admin Management 🛡️</h2>
        <button
          onClick={() => {
            setEditingAdmin(null);
            setAdminForm({ name: '', email: '', phone: '' });
            setShowAdminModal(true);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Create Admin
        </button>
      </div>

      <input
        type="text"
        placeholder="Search admins..."
        value={searchAdmin}
        onChange={(e) => setSearchAdmin(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none mb-6"
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Name</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Email</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Phone</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Join Date</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 font-semibold text-neutral-900">{admin.name}</td>
                <td className="py-3 px-4 text-neutral-600">{admin.email}</td>
                <td className="py-3 px-4 text-neutral-600">{admin.phone}</td>
                <td className="py-3 px-4 text-neutral-600">{admin.joinDate}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEditAdmin(admin)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">{editingAdmin ? 'Edit Admin' : 'Create New Admin'}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={adminForm.name}
                onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={adminForm.email}
                onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={adminForm.phone}
                onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddAdmin}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition"
              >
                {editingAdmin ? 'Update' : 'Create'}
              </button>
              <button
                onClick={() => {
                  setShowAdminModal(false);
                  setEditingAdmin(null);
                }}
                className="flex-1 bg-neutral-200 text-neutral-700 py-3 rounded-xl font-bold hover:bg-neutral-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );

  const Tutors = () => (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">Tutor Management 👨‍🏫</h2>
        <button
          onClick={() => {
            setEditingTutor(null);
            setTutorForm({ name: '', email: '', phone: '', expertise: '' });
            setShowTutorModal(true);
          }}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add Tutor
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tutors..."
        value={searchTutor}
        onChange={(e) => setSearchTutor(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none mb-6"
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Name</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Email</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Expertise</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Phone</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTutors.map((tutor) => (
              <tr key={tutor.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 font-semibold text-neutral-900">{tutor.name}</td>
                <td className="py-3 px-4 text-neutral-600">{tutor.email}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {tutor.expertise.map((exp, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                        {exp}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-neutral-600">{tutor.phone}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEditTutor(tutor)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTutor(tutor.id)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTutorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">{editingTutor ? 'Edit Tutor' : 'Add New Tutor'}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={tutorForm.name}
                onChange={(e) => setTutorForm({ ...tutorForm, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={tutorForm.email}
                onChange={(e) => setTutorForm({ ...tutorForm, email: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={tutorForm.phone}
                onChange={(e) => setTutorForm({ ...tutorForm, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Expertise (comma-separated, e.g. Math, Science)"
                value={tutorForm.expertise}
                onChange={(e) => setTutorForm({ ...tutorForm, expertise: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddTutor}
                className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition"
              >
                {editingTutor ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => {
                  setShowTutorModal(false);
                  setEditingTutor(null);
                }}
                className="flex-1 bg-neutral-200 text-neutral-700 py-3 rounded-xl font-bold hover:bg-neutral-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
        {activeTab === 'home' && <AdminHome />}
        {activeTab === 'enrollments' && <EnrollmentManagement />}
        {activeTab === 'users' && <Users />}
        {activeTab === 'admins' && <Admins />}
        {activeTab === 'tutors' && <Tutors />}
        {activeTab === 'announcements' && (
          <Card>
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">Announcements 📢</h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-neutral-900 mb-4">Create New Announcement</h3>
              <input
                type="text"
                placeholder="Announcement title..."
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none mb-3"
              />
              <textarea
                placeholder="Announcement message..."
                rows="4"
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none mb-3"
              />
              <div className="flex gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Students</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Parents</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Tutors</span>
                </label>
              </div>
              <button className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-600 transition">
                Send Announcement
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-50 border-2 border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-neutral-900">Holiday Notice</div>
                  <div className="text-xs text-neutral-500">Oct 18, 2025</div>
                </div>
                <p className="text-sm text-neutral-600 mb-2">No classes on October 25-26 due to school holidays.</p>
                <div className="text-xs text-blue-600">Sent to: All users</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border-2 border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-neutral-900">New Schedule Available</div>
                  <div className="text-xs text-neutral-500">Oct 15, 2025</div>
                </div>
                <p className="text-sm text-neutral-600 mb-2">November schedules are now available. Please check your dashboard.</p>
                <div className="text-xs text-blue-600">Sent to: Students, Parents</div>
              </div>
            </div>
          </Card>
        )}
        {activeTab === 'settings' && (
          <Card>
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">System Settings ⚙️</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-neutral-900 mb-3">General Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-neutral-900">Tutorial Center Name</div>
                      <div className="text-sm text-neutral-600">Bee Bright Tutorial Center</div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-neutral-900">Email Notifications</div>
                      <div className="text-sm text-neutral-600">Enable email alerts for important events</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-neutral-900 mb-3">Security Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-neutral-900">Two-Factor Authentication</div>
                      <div className="text-sm text-neutral-600">Add extra security to admin accounts</div>
                    </div>
                    <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 transition text-sm">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-neutral-900">Change Password</div>
                      <div className="text-sm text-neutral-600">Last changed: Oct 1, 2025</div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">Change</button>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;