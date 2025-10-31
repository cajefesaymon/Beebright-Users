import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Card, { StatCard } from '../components/Card';
import { Home, Users, Calendar, FileText, Clock, ChevronRight, Brain, X, Download, Share2, Mail, Plus } from 'lucide-react';

const TutorDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State for quick action modals
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showGradesModal, setShowGradesModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-primary-500' },
    { id: 'ai', icon: Brain, label: 'AI Assistant', color: 'text-purple-500', badge: 'NEW' },
    { id: 'classes', icon: Calendar, label: 'My Classes', color: 'text-blue-500' },
    { id: 'students', icon: Users, label: 'My Students', color: 'text-green-500' },
    { id: 'reports', icon: FileText, label: 'Reports', color: 'text-purple-500' }
  ];

  const todayClasses = [
    { id: 1, subject: "Mathematics", time: "10:00 AM", students: 8, grade: "Grade 5", room: "Room A" },
    { id: 2, subject: "Filipino", time: "2:00 PM", students: 6, grade: "Grade 4", room: "Room B" },
    { id: 3, subject: "English", time: "4:00 PM", students: 10, grade: "Grade 6", room: "Room A" }
  ];

  const myStudents = [
    { id: 1, name: "Alex Chen", grade: "Grade 5", avatar: "🧒", score: 85, attendance: 96, email: "alex.chen@email.com" },
    { id: 2, name: "Emma Chen", grade: "Grade 3", avatar: "👧", score: 92, attendance: 98, email: "emma.chen@email.com" },
    { id: 3, name: "Lucas Wong", grade: "Grade 5", avatar: "👦", score: 78, attendance: 88, email: "lucas.wong@email.com" },
    { id: 4, name: "Sophia Lee", grade: "Grade 4", avatar: "👧", score: 88, attendance: 94, email: "sophia.lee@email.com" },
    { id: 5, name: "Ethan Cruz", grade: "Grade 6", avatar: "👦", score: 91, attendance: 97, email: "ethan.cruz@email.com" },
    { id: 6, name: "Mia Santos", grade: "Grade 4", avatar: "👧", score: 86, attendance: 95, email: "mia.santos@email.com" }
  ];

  // Quick Actions Handlers
  const handleMarkAttendance = () => {
  setSelectedClass({ subject: "All Students" });
  setShowAttendanceModal(true);
};

  const handleEnterGrades = () => {
    setShowGradesModal(true);
  };

  const handleUploadMaterials = () => {
    setShowMaterialsModal(true);
  };

  const handleMessageParents = () => {
    setShowMessageModal(true);
  };

  // Attendance Modal Component
  const AttendanceModal = () => {
    const [attendance, setAttendance] = useState({});
    
    useEffect(() => {
      // Initialize attendance status for each student
      const initialAttendance = {};
      myStudents.forEach(student => {
        initialAttendance[student.id] = 'Present';
      });
      setAttendance(initialAttendance);
    }, []);

    const handleAttendanceChange = (studentId, status) => {
      setAttendance(prev => ({
        ...prev,
        [studentId]: status
      }));
    };

    const handleSubmitAttendance = () => {
      // In a real app, this would send data to your backend
      console.log('Attendance submitted:', attendance);
      alert(`Attendance marked for All Students!`);
      setShowAttendanceModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
                Mark Attendance - All Students
            </h2>
            <button onClick={() => setShowAttendanceModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            {myStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{student.avatar}</span>
                  <div>
                    <div className="font-semibold">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.grade}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['Present', 'Absent', 'Late'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleAttendanceChange(student.id, status)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        attendance[student.id] === status
                          ? status === 'Present' 
                            ? 'bg-green-500 text-white'
                            : status === 'Absent'
                            ? 'bg-red-500 text-white'
                            : 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmitAttendance}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Save Attendance
            </button>
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Grades Modal Component
  const GradesModal = () => {
    const [grades, setGrades] = useState({});
    const [assignmentType, setAssignmentType] = useState('Quiz');

    const handleGradeChange = (studentId, value) => {
      setGrades(prev => ({
        ...prev,
        [studentId]: value
      }));
    };

    const handleSubmitGrades = () => {
      console.log('Grades submitted:', grades);
      alert(`Grades for ${assignmentType} saved successfully!`);
      setShowGradesModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Enter Grades</h2>
            <button onClick={() => setShowGradesModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Type</label>
            <select
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Quiz</option>
              <option>Homework</option>
              <option>Test</option>
              <option>Project</option>
              <option>Participation</option>
            </select>
          </div>

          <div className="space-y-3">
            {myStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{student.avatar}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.grade}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Score"
                    value={grades[student.id] || ''}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    className="w-24 p-2 border rounded-lg text-center"
                  />
                  <span className="text-gray-500">/100</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmitGrades}
              className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
            >
              Save All Grades
            </button>
            <button
              onClick={() => setShowGradesModal(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Materials Modal Component
  const MaterialsModal = () => {
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({
      title: '',
      type: 'Document',
      file: null,
      description: ''
    });

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewMaterial(prev => ({
          ...prev,
          file,
          title: file.name
        }));
      }
    };

    const handleAddMaterial = (e) => {
      e.preventDefault();
      if (!newMaterial.title) return;

      const material = {
        id: Date.now(),
        ...newMaterial,
        date: new Date().toLocaleDateString(),
        size: newMaterial.file ? `${(newMaterial.file.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'
      };

      setMaterials(prev => [material, ...prev]);
      setNewMaterial({ title: '', type: 'Document', file: null, description: '' });
    };

    const handleShareMaterial = (material) => {
      // Simulate sharing functionality
      alert(`Sharing "${material.title}" with all students!`);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Upload Study Materials</h2>
            <button onClick={() => setShowMaterialsModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleAddMaterial} className="bg-gray-50 p-4 rounded-xl mb-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Title</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter material title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Document</option>
                  <option>Video</option>
                  <option>Worksheet</option>
                  <option>Presentation</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newMaterial.description}
                onChange={(e) => setNewMaterial(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Describe this material..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-600 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Add Material
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">Recent Materials ({materials.length})</h3>
            {materials.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No materials uploaded yet</p>
            ) : (
              materials.map(material => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {material.type === 'Video' ? '🎬' : 
                       material.type === 'Worksheet' ? '📝' : 
                       material.type === 'Presentation' ? '📊' : '📄'}
                    </div>
                    <div>
                      <div className="font-semibold">{material.title}</div>
                      <div className="text-sm text-gray-600">
                        {material.type} • {material.date} • {material.size}
                      </div>
                      {material.description && (
                        <div className="text-sm text-gray-500 mt-1">{material.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShareMaterial(material)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Share with students"
                    >
                      <Share2 size={18} />
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Message Parents Modal Component
  const MessageParentsModal = () => {
    const [message, setMessage] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [messageType, setMessageType] = useState('Progress Update');

    const toggleStudentSelection = (studentId) => {
      setSelectedStudents(prev =>
        prev.includes(studentId)
          ? prev.filter(id => id !== studentId)
          : [...prev, studentId]
      );
    };

    const selectAllStudents = () => {
      setSelectedStudents(myStudents.map(student => student.id));
    };

    const handleSendMessage = () => {
      if (selectedStudents.length === 0 || !message.trim()) {
        alert('Please select at least one student and write a message');
        return;
      }

      const selectedNames = myStudents
        .filter(student => selectedStudents.includes(student.id))
        .map(student => student.name)
        .join(', ');

      alert(`Message sent to parents of: ${selectedNames}`);
      setShowMessageModal(false);
      setMessage('');
      setSelectedStudents([]);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Message Parents</h2>
            <button onClick={() => setShowMessageModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option>Progress Update</option>
              <option>Behavior Note</option>
              <option>Assignment Reminder</option>
              <option>Meeting Request</option>
              <option>General Update</option>
            </select>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">Select Students</label>
              <button
                type="button"
                onClick={selectAllStudents}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Select All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {myStudents.map(student => (
                <div
                  key={student.id}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${
                    selectedStudents.includes(student.id)
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleStudentSelection(student.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => {}}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-xl">{student.avatar}</span>
                  <span className="font-medium text-sm">{student.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Write your message to parents..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSendMessage}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Send Messages
            </button>
            <button
              onClick={() => setShowMessageModal(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const aiFeatures = [
    {
      title: "Lesson Planning",
      description: "Create engaging lesson plans and activities",
      icon: "📝",
      color: "from-blue-500 to-cyan-500",
      prompt: "Help me create a lesson plan for teaching fractions"
    },
    {
      title: "Assessment Builder",
      description: "Generate quizzes and test questions",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      prompt: "Create a quiz for 5th grade math about decimals"
    },
    {
      title: "Student Support",
      description: "Get strategies for struggling students",
      icon: "👥",
      color: "from-green-500 to-teal-500",
      prompt: "What are effective strategies for students struggling with algebra?"
    },
    {
      title: "Parent Communication",
      description: "Draft progress reports and parent emails",
      icon: "💬",
      color: "from-orange-500 to-red-500",
      prompt: "Help me write a progress report for a student"
    }
  ];

  const recentConversations = [
    { question: "How can I make geometry more engaging?", time: "1 day ago" },
    { question: "Differentiated instruction strategies", time: "2 days ago" },
    { question: "Classroom management techniques", time: "3 days ago" }
  ];

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`I'd be happy to help with your teaching question about "${aiQuery}"! Here are some professional insights:

🎯 **Teaching Strategies:**
• Differentiated instruction approaches
• Hands-on learning activities
• Assessment techniques

📚 **Resource Recommendations:**
• Lesson materials and tools
• Professional development resources
• Classroom management tips

💡 **Best Practices:**
• Evidence-based teaching methods
• Student engagement techniques
• Progress monitoring approaches

Would you like me to elaborate on any specific aspect or provide more detailed resources?`);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickPrompt = (prompt) => {
    setAiQuery(prompt);
  };

  const TutorAI = () => (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl animate-pulse">🤖</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800">
            Your Teaching <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Assistant</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get expert help with lesson planning, student support, and teaching strategies. Powered by AI to enhance your teaching! ✨
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Features */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span> Teaching Assistant Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {aiFeatures.map((feature, idx) => (
                <div 
                  key={idx}
                  className={`bg-gradient-to-br ${feature.color} rounded-2xl p-4 text-white transform hover:scale-105 transition-all duration-200 cursor-pointer shadow-lg`}
                  onClick={() => handleQuickPrompt(feature.prompt)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{feature.icon}</span>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                  </div>
                  <p className="text-white/90 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Chat Interface */}
          <Card>
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">💬</span> Ask Your Teaching Assistant
            </h2>
            <form onSubmit={handleAiSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask about lesson planning, teaching strategies, classroom management, or any teaching-related topic... 🌟"
                  className="w-full h-32 p-4 border-4 border-purple-200 rounded-2xl resize-none focus:outline-none focus:border-purple-400 transition-colors text-lg"
                  disabled={isLoading}
                />
                <div className="absolute bottom-3 right-3 text-gray-400">
                  {aiQuery.length}/500
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !aiQuery.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Thinking...
                  </div>
                ) : (
                  'Get Teaching Help! 🎯'
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-4 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="font-bold text-gray-800">AI Teaching Assistant:</h3>
                </div>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {aiResponse}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="bg-white px-4 py-2 rounded-full font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 transition-colors">
                    👍 Helpful
                  </button>
                  <button className="bg-white px-4 py-2 rounded-full font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 transition-colors">
                    🔄 Regenerate
                  </button>
                  <button className="bg-white px-4 py-2 rounded-full font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 transition-colors">
                    📋 Copy
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar - Recent & Tips */}
        <div className="space-y-6">
          {/* Recent Conversations */}
          <Card>
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">🕒</span> Recent Conversations
            </h2>
            <div className="space-y-3">
              {recentConversations.map((conv, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => setAiQuery(conv.question)}
                >
                  <p className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                    {conv.question}
                  </p>
                  <p className="text-xs text-gray-500">{conv.time}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Teaching Tips */}
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-6 shadow-xl border-4 border-orange-200">
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">💫</span> Pro Teaching Tips
            </h2>
            <div className="space-y-3">
              {[
                "Use specific examples when asking about student challenges",
                "Request differentiated instruction strategies",
                "Ask for age-appropriate activity ideas",
                "Get help with assessment design"
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-lg">✨</span>
                  <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Resources */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 shadow-xl border-4 border-purple-200">
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">🌠</span> Teaching Resources
            </h2>
            <div className="text-gray-700 space-y-2">
              <p className="text-sm">
                <strong>Quick Tip:</strong> The AI can help you create rubrics, lesson plans, and parent communications!
              </p>
              <p className="text-sm">
                <strong>Try:</strong> "Create a rubric for science projects" or "Help me write a newsletter for parents"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TutorHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Hello, {user.name}! 👩‍🏫</h1>
        <p className="text-lg opacity-90">You have {todayClasses.length} classes scheduled today</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard icon="👥" value={myStudents.length.toString()} label="Total Students" color="blue" />
        <StatCard icon="📚" value={todayClasses.length.toString()} label="Classes Today" color="green" />
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
              <button 
                onClick={() => handleMarkAttendance(cls)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Mark Attendance"
              >
                <ChevronRight className="text-neutral-400" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => handleMarkAttendance(todayClasses[0])}
            className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 hover:shadow-md transition text-left hover:border-green-400"
          >
            <div className="text-3xl mb-2">📝</div>
            <div className="font-bold text-neutral-900">Mark Attendance</div>
            <div className="text-sm text-neutral-600">Record today's attendance</div>
          </button>
          <button 
            onClick={handleEnterGrades}
            className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-md transition text-left hover:border-blue-400"
          >
            <div className="text-3xl mb-2">📊</div>
            <div className="font-bold text-neutral-900">Enter Grades</div>
            <div className="text-sm text-neutral-600">Update student scores</div>
          </button>
          <button 
            onClick={handleUploadMaterials}
            className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-md transition text-left hover:border-purple-400"
          >
            <div className="text-3xl mb-2">📚</div>
            <div className="font-bold text-neutral-900">Upload Materials</div>
            <div className="text-sm text-neutral-600">Share study resources</div>
          </button>
          <button 
            onClick={handleMessageParents}
            className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 hover:shadow-md transition text-left hover:border-orange-400"
          >
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
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => {
                  setSelectedStudent(student);
                  setShowMessageModal(true);
                }}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
              >
                Message Parent
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const StudentRecords = () => {
    const STORAGE_KEY = 'beebright_records_v1';
    const [records, setRecords] = useState(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    });

    const [form, setForm] = useState({
      name: '',
      attendance: 'Present',
      quiz: '',
      exam: '',
      participation: '',
    });

    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }, [records]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const handleAdd = (e) => {
      e.preventDefault();
      if (!form.name || form.quiz === '' || form.exam === '' || form.participation === '') {
        alert('Please fill all fields');
        return;
      }
      const avg = (Number(form.quiz) + Number(form.exam) + Number(form.participation)) / 3;
      const newRec = {
        id: Date.now(),
        name: form.name,
        attendance: form.attendance,
        quiz: Number(form.quiz),
        exam: Number(form.exam),
        participation: Number(form.participation),
        average: Number(avg.toFixed(2)),
        date: new Date().toLocaleDateString(),
      };
      setRecords([newRec, ...records]);
      setForm({ name: '', attendance: 'Present', quiz: '', exam: '', participation: '' });
    };

    const suggestionsFor = (avg) => {
      if (avg < 50) return ['Start with basic drills', 'Watch intro video lessons', '1-on-1 tutoring'];
      if (avg < 70) return ['Practice quizzes', 'Targeted exercises', 'Short video reviews'];
      if (avg < 85) return ['Advanced practice', 'Timed mock tests'];
      return ['Keep up the good work!'];
    };

    const lowest = records.length ? records.reduce((a,b) => a.average < b.average ? a : b) : null;

    return (
      <Card>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Student Records</h2>

        <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-3 mb-6">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Student name" className="border rounded-lg p-2" />
          <select name="attendance" value={form.attendance} onChange={handleChange} className="border rounded-lg p-2">
            <option>Present</option>
            <option>Absent</option>
          </select>
          <input name="quiz" value={form.quiz} onChange={handleChange} type="number" placeholder="Quiz (0-100)" className="border rounded-lg p-2" />
          <input name="exam" value={form.exam} onChange={handleChange} type="number" placeholder="Exam (0-100)" className="border rounded-lg p-2" />
          <input name="participation" value={form.participation} onChange={handleChange} type="number" placeholder="Participation (0-100)" className="border rounded-lg p-2" />
          <div className="md:col-span-4">
            <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded-lg">Add Record</button>
          </div>
        </form>

        {records.length === 0 ? (
          <p className="text-gray-500">No records yet. Add a student record above.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-yellow-100 text-left">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Attendance</th>
                    <th className="border p-2">Quiz</th>
                    <th className="border p-2">Exam</th>
                    <th className="border p-2">Participation</th>
                    <th className="border p-2">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="border p-2">{r.name}</td>
                      <td className="border p-2">{r.date}</td>
                      <td className="border p-2">{r.attendance}</td>
                      <td className="border p-2">{r.quiz}</td>
                      <td className="border p-2">{r.exam}</td>
                      <td className="border p-2">{r.participation}</td>
                      <td className="border p-2 font-semibold text-yellow-700">{r.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <h3 className="font-bold mb-2">Lowest-performing student</h3>
                {lowest ? (
                  <>
                    <div className="mb-2">{lowest.name} — Avg: {lowest.average}</div>
                    <div className="text-sm text-gray-600 mb-2">Suggested materials:</div>
                    <ul className="list-disc pl-5">
                      {suggestionsFor(lowest.average).map((sug, i) => <li key={i}>{sug}</li>)}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500">No data</p>
                )}
              </div>

              <div className="p-4 border rounded-xl">
                <h3 className="font-bold mb-2">Quick actions</h3>
                <p className="text-sm text-gray-600">You can later connect this to an AI service to generate more detailed study plans.</p>
              </div>
            </div>
          </>
        )}
      </Card>
    );
  };

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
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 5 Math", time: "10:00 AM" })}>
                  <div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold hover:bg-blue-200 transition">Grade 5 Math</div>
                </button>
              </td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 5 Math", time: "10:00 AM" })}>
                  <div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold hover:bg-blue-200 transition">Grade 5 Math</div>
                </button>
              </td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 5 Math", time: "10:00 AM" })}>
                  <div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold hover:bg-blue-200 transition">Grade 5 Math</div>
                </button>
              </td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 5 Math", time: "10:00 AM" })}>
                  <div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold hover:bg-blue-200 transition">Grade 5 Math</div>
                </button>
              </td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 5 Math", time: "10:00 AM" })}>
                  <div className="bg-blue-100 text-blue-700 p-2 rounded text-sm font-semibold hover:bg-blue-200 transition">Grade 5 Math</div>
                </button>
              </td>
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="py-3 px-4 font-semibold text-neutral-600">2:00 PM</td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 4 Math", time: "2:00 PM" })}>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-sm font-semibold hover:bg-green-200 transition">Grade 4 Math</div>
                </button>
              </td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 4 Math", time: "2:00 PM" })}>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-sm font-semibold hover:bg-green-200 transition">Grade 4 Math</div>
                </button>
              </td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 4 Math", time: "2:00 PM" })}>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-sm font-semibold hover:bg-green-200 transition">Grade 4 Math</div>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-neutral-600">4:00 PM</td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 6 Math", time: "4:00 PM" })}>
                  <div className="bg-purple-100 text-purple-700 p-2 rounded text-sm font-semibold hover:bg-purple-200 transition">Grade 6 Math</div>
                </button>
              </td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">
                <button onClick={() => handleMarkAttendance({ subject: "Grade 6 Math", time: "4:00 PM" })}>
                  <div className="bg-purple-100 text-purple-700 p-2 rounded text-sm font-semibold hover:bg-purple-200 transition">Grade 6 Math</div>
                </button>
              </td>
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
        {activeTab === 'ai' && <TutorAI />}
        {activeTab === 'classes' && <Classes />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'reports' && <Reports />}
        
        {/* Modals */}
        {showAttendanceModal && <AttendanceModal />}
        {showGradesModal && <GradesModal />}
        {showMaterialsModal && <MaterialsModal />}
        {showMessageModal && <MessageParentsModal />}
      </div>
    </div>
  );
};

// di pa gumagana ang action buttons
export default TutorDashboard;