import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card, { StatCard } from '../components/Card';
import { Home, Users as UsersIcon, DollarSign, BookOpen, Settings, Bell, Check, X, Mail, Phone, User, Shield, Edit2, Trash2, Plus, Calendar } from 'lucide-react';

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

  // Schedule State (simple sample data to render the schedule view)
  const [scheduleSlots, setScheduleSlots] = useState([
    { time: '9:00 AM', roomA: { student: 'Alex Chen', tutor: 'Ms. Garcia' }, roomB: null, roomC: null },
    { time: '11:00 AM', roomA: { student: 'Maria Santos', tutor: 'Mr. Rodriguez' }, roomB: null, roomC: null },
    { time: '2:00 PM', roomA: null, roomB: null, roomC: null },
    { time: '4:00 PM', roomA: { student: 'Mrs. Chen', tutor: 'Ms. Garcia' }, roomB: null, roomC: null }
  ]);

  // Create Schedule modal state & form
  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState(false);
  const [createScheduleForm, setCreateScheduleForm] = useState({
    tutorId: '',
    room: 'Room A',
    selectedStudentIds: [],
    subjectsTimes: [ { subject: '', time: '9:00 AM' } ]
  });

  const subjectOptions = Array.from(new Set(tutors.flatMap(t => t.expertise)));
  const timeOptions = ['9:00 AM','11:00 AM','2:00 PM','4:00 PM'];

  // open Create Schedule modal; optionally prefill room and time when called from an Assign button
  const openCreateSchedule = (room = 'Room A', time = '9:00 AM') => {
    setCreateScheduleForm({ tutorId: '', room: room || 'Room A', selectedStudentIds: [], subjectsTimes: [ { subject: '', time: time || '9:00 AM' } ] });
    setShowCreateScheduleModal(true);
  };

  const closeCreateSchedule = () => setShowCreateScheduleModal(false);

  const toggleStudentSelection = (id) => {
    setCreateScheduleForm(prev => ({
      ...prev,
      selectedStudentIds: prev.selectedStudentIds.includes(id)
        ? prev.selectedStudentIds.filter(sid => sid !== id)
        : [...prev.selectedStudentIds, id]
    }));
  };

  

  const updateSubjectRow = (index, field, value) => {
    setCreateScheduleForm(prev => ({
      ...prev,
      subjectsTimes: prev.subjectsTimes.map((row, i) => i === index ? { ...row, [field]: value } : row)
    }));
  };

  const handleCreateSchedule = () => {
    const { tutorId, room, selectedStudentIds, subjectsTimes } = createScheduleForm;
    if (!tutorId) return alert('Please select a tutor.');
    if (selectedStudentIds.length === 0) return alert('Please select at least one student.');

    const tutor = tutors.find(t => t.id === Number(tutorId));
    const studentNames = users.filter(u => selectedStudentIds.includes(u.id)).map(s => s.name);
    const roomKey = room.toLowerCase().replace(/\s+/g, ''); // 'Room A' -> 'rooma'
    // normalize to roomA/roomB/roomC
    const normalizedRoomKey = roomKey.replace('room', 'room').replace(' ', '');

    const updatedSlots = [...scheduleSlots];

    subjectsTimes.forEach(({ subject, time }) => {
      let slotIndex = updatedSlots.findIndex(s => s.time === time);
      if (slotIndex === -1) {
        // create new slot
        const newSlot = { time, roomA: null, roomB: null, roomC: null };
        updatedSlots.push(newSlot);
        slotIndex = updatedSlots.length - 1;
      }

      const targetKey = room.toLowerCase().replace(' ', ''); // 'rooma'
      const normalizedKey = targetKey === 'rooma' ? 'roomA' : targetKey === 'roomb' ? 'roomB' : 'roomC';

      updatedSlots[slotIndex] = {
        ...updatedSlots[slotIndex],
        [normalizedKey]: { student: studentNames.join(', '), tutor: tutor.name, subject }
      };
    });

    // ensure slots sorted by timeOptions order
    updatedSlots.sort((a,b) => timeOptions.indexOf(a.time) - timeOptions.indexOf(b.time));

    setScheduleSlots(updatedSlots);
    setShowCreateScheduleModal(false);
    // switch to Schedule tab so the user sees the newly created entry immediately
    setActiveTab('schedule');
  };

  // Clear a schedule entry for a given time and room (roomKey: 'roomA'|'roomB'|'roomC')
  const clearScheduleEntry = (time, roomKey) => {
    setScheduleSlots(prev => prev.map(slot => {
      if (slot.time !== time) return slot;
      return { ...slot, [roomKey]: null };
    }));
  };

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
  const [adminForm, setAdminForm] = useState({ name: '', email: '', phone: '', address: '' });
  const adminNameRef = useRef(null);
  const adminEmailRef = useRef(null);
  const adminPhoneRef = useRef(null);
  const adminAddressRef = useRef(null);
  // refs for User modal inputs
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userPhoneRef = useRef(null);
  const userRoleRef = useRef(null);
  // refs for Tutor modal inputs
  const tutorNameRef = useRef(null);
  const tutorEmailRef = useRef(null);
  const tutorPhoneRef = useRef(null);
  const tutorExpertiseRef = useRef(null);
  const [tutorForm, setTutorForm] = useState({ name: '', email: '', phone: '', expertise: '' });

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
    { id: 'enrollments', icon: BookOpen, label: 'Enrollments', color: 'text-orange-500', badge: enrollments.filter(e => e.status === 'pending').length },
    { id: 'users', icon: UsersIcon, label: 'Users', color: 'text-blue-500' },
    { id: 'admins', icon: Shield, label: 'Admins', color: 'text-red-500' },
    { id: 'schedule', icon: Calendar, label: 'Schedule', color: 'text-teal-500' },
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
    // read live values from refs to avoid controlled re-render issues while typing
    const current = {
      name: userNameRef.current?.value ?? userForm.name,
      email: userEmailRef.current?.value ?? userForm.email,
      phone: userPhoneRef.current?.value ?? userForm.phone,
  role: (userRoleRef.current?.value ?? userForm.role) || 'Student'
    };

    if (current.name && current.email) {
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...current } : u));
        setEditingUser(null);
      } else {
        setUsers([...users, { 
          id: Date.now(), 
          ...current, 
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
    setUserForm({ ...user, role: user.role || 'Student', phone: user.phone || '' });
    setShowUserModal(true);
  };

  // ADMIN HANDLERS
  const handleAddAdmin = () => {
    // read the latest values from inputs (refs) to avoid stale state if user hasn't blurred the field
    const current = {
      name: adminNameRef.current?.value ?? adminForm.name,
      email: adminEmailRef.current?.value ?? adminForm.email,
      phone: adminPhoneRef.current?.value ?? adminForm.phone,
      address: adminAddressRef.current?.value ?? adminForm.address,
    };

    if (current.name && current.email) {
      if (editingAdmin) {
        setAdmins(admins.map(a => a.id === editingAdmin.id ? { ...a, ...current } : a));
        setEditingAdmin(null);
      } else {
        const password = Math.random().toString(36).slice(-8).toUpperCase();
        setAdmins([...admins, { 
          id: Date.now(), 
          ...current, 
          joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        }]);
        alert(`✅ Admin Account Created!\n\nEmail: ${current.email}\nTemporary Password: ${password}\n\nPlease share these credentials securely.`);
      }
      setAdminForm({ name: '', email: '', phone: '', address: '' });
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
    // ensure adminForm always has the address key to avoid uncontrolled -> controlled warnings
    setAdminForm({ ...admin, address: admin.address || '' });
    setShowAdminModal(true);
  };

  // TUTOR HANDLERS
  const handleAddTutor = () => {
    // read current values from refs to avoid controlled input re-render issues
    const current = {
      name: tutorNameRef.current?.value ?? tutorForm.name,
      email: tutorEmailRef.current?.value ?? tutorForm.email,
      phone: tutorPhoneRef.current?.value ?? tutorForm.phone,
      expertise: tutorExpertiseRef.current?.value ?? tutorForm.expertise
    };

    if (current.name && current.email && current.expertise) {
      if (editingTutor) {
        setTutors(tutors.map(t => t.id === editingTutor.id ? { 
          ...t, 
          ...current, 
          expertise: current.expertise.split(',').map(e => e.trim()) 
        } : t));
        setEditingTutor(null);
      } else {
        setTutors([...tutors, { 
          id: Date.now(), 
          ...current, 
          expertise: current.expertise.split(',').map(e => e.trim()), 
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
    setTutorForm({ name: tutor.name || '', email: tutor.email || '', phone: tutor.phone || '', expertise: (tutor.expertise || []).join(', ') });
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
                ref={userNameRef}
                defaultValue={userForm.name}
                onBlur={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                ref={userEmailRef}
                defaultValue={userForm.email}
                onBlur={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                ref={userPhoneRef}
                defaultValue={userForm.phone}
                onBlur={(e) => setUserForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <select
                ref={userRoleRef}
                defaultValue={userForm.role}
                onBlur={(e) => setUserForm(prev => ({ ...prev, role: e.target.value }))}
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
              setAdminForm({ name: '', email: '', phone: '', address: '' });
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
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Address</th>
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
                <td className="py-3 px-4 text-neutral-600">{admin.address || '-'}</td>
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
                ref={adminNameRef}
                defaultValue={adminForm.name}
                onBlur={(e) => setAdminForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                ref={adminEmailRef}
                defaultValue={adminForm.email}
                onBlur={(e) => setAdminForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                ref={adminPhoneRef}
                defaultValue={adminForm.phone}
                onBlur={(e) => setAdminForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Address"
                ref={adminAddressRef}
                defaultValue={adminForm.address}
                onBlur={(e) => setAdminForm(prev => ({ ...prev, address: e.target.value }))}
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
                ref={tutorNameRef}
                defaultValue={tutorForm.name}
                onBlur={(e) => setTutorForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                ref={tutorEmailRef}
                defaultValue={tutorForm.email}
                onBlur={(e) => setTutorForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                ref={tutorPhoneRef}
                defaultValue={tutorForm.phone}
                onBlur={(e) => setTutorForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Expertise (comma-separated, e.g. Math, Science)"
                ref={tutorExpertiseRef}
                defaultValue={tutorForm.expertise}
                onBlur={(e) => setTutorForm(prev => ({ ...prev, expertise: e.target.value }))}
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

  const Schedule = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-neutral-900">Schedule 📅</h2>
          <button
            onClick={openCreateSchedule}
            className="bg-teal-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-teal-600 transition"
          >
            Create Schedule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="text-left py-3 px-4 font-semibold">Time</th>
                <th className="text-left py-3 px-4 font-semibold">Room A</th>
                <th className="text-left py-3 px-4 font-semibold">Room B</th>
                <th className="text-left py-3 px-4 font-semibold">Room C</th>
              </tr>
            </thead>
            <tbody>
              {scheduleSlots.map((slot, idx) => (
                <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4 font-semibold w-40">{slot.time}</td>
                  <td className="py-4 px-4">
                    {slot.roomA ? (
                      <div>
                        <div className="font-semibold">{slot.roomA.student}</div>
                        <div className="text-sm text-neutral-600">Tutor: {slot.roomA.tutor}</div>
                        <div className="flex gap-2 mt-2">
                          <button className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                          <button onClick={() => clearScheduleEntry(slot.time, 'roomA')} className="bg-pink-200 text-pink-700 px-3 py-1 rounded">Clear</button>
                        </div>
                      </div>
                      ) : (
                      <div>
                        <div className="text-neutral-500">— Unassigned —</div>
                        <div className="mt-2">
                          <button onClick={() => openCreateSchedule('Room A', slot.time)} className="bg-yellow-400 text-white px-3 py-1 rounded">Assign</button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {slot.roomB ? (
                      <div>
                        <div className="font-semibold">{slot.roomB.student}</div>
                        <div className="text-sm text-neutral-600">Tutor: {slot.roomB.tutor}</div>
                      </div>
                    ) : (
                      <div className="text-neutral-500">— Unassigned —<div className="mt-2"><button onClick={() => openCreateSchedule('Room B', slot.time)} className="bg-yellow-400 text-white px-3 py-1 rounded">Assign</button></div></div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {slot.roomC ? (
                      <div>
                        <div className="font-semibold">{slot.roomC.student}</div>
                        <div className="text-sm text-neutral-600">Tutor: {slot.roomC.tutor}</div>
                      </div>
                    ) : (
                      <div className="text-neutral-500">— Unassigned —<div className="mt-2"><button onClick={() => openCreateSchedule('Room C', slot.time)} className="bg-yellow-400 text-white px-3 py-1 rounded">Assign</button></div></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
        {showCreateScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Create Schedule</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Tutor</label>
                  <select
                    value={createScheduleForm.tutorId}
                    onChange={(e) => setCreateScheduleForm(prev => ({ ...prev, tutorId: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="">— Select Tutor —</option>
                    {tutors.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Room</label>
                  <select
                    value={createScheduleForm.room}
                    onChange={(e) => setCreateScheduleForm(prev => ({ ...prev, room: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
                  >
                    <option>Room A</option>
                    <option>Room B</option>
                    <option>Room C</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Students</label>
                <div className="border-2 border-neutral-200 rounded-xl p-4 max-h-40 overflow-auto">
                  {users.map(u => (
                    <label key={u.id} className="flex items-center gap-3 mb-2">
                      <input type="checkbox" checked={createScheduleForm.selectedStudentIds.includes(u.id)} onChange={() => toggleStudentSelection(u.id)} />
                      <span className="text-sm">{u.name} — {u.email}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Subject & Time</label>
                <div className="flex items-center gap-3">
                  <select value={createScheduleForm.subjectsTimes[0].subject} onChange={(e) => updateSubjectRow(0, 'subject', e.target.value)} className="flex-1 px-4 py-2 rounded-xl border-2 border-neutral-200">
                    <option value="">— Select Subject —</option>
                    {subjectOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
                  </select>
                  <select value={createScheduleForm.subjectsTimes[0].time} onChange={(e) => updateSubjectRow(0, 'time', e.target.value)} className="w-40 px-4 py-2 rounded-xl border-2 border-neutral-200">
                    {timeOptions.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleCreateSchedule} className="flex-1 bg-yellow-400 text-white py-3 rounded-xl font-bold">Create</button>
                <button onClick={closeCreateSchedule} className="flex-1 bg-neutral-200 text-neutral-700 py-3 rounded-xl font-bold">Cancel</button>
              </div>
            </div>
          </div>
        )}
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
        {activeTab === 'home' && <AdminHome />}
        {activeTab === 'enrollments' && <EnrollmentManagement />}
        {activeTab === 'users' && <Users />}
        {activeTab === 'admins' && <Admins />}
  {activeTab === 'schedule' && <Schedule />}
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
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-neutral-900">Rejected accounts</div>
                      <div className="text-sm text-neutral-600">View recently rejected user accounts and restore if necessary</div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 font-semibold text-sm">View</button>
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
