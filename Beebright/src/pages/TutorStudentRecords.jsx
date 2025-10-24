// src/pages/tutor/StudentRecords.jsx
import React, { useState } from 'react';
import Card from '../components/Card';
import { 
  CheckCircle, 
  ClipboardList, 
  Upload, 
  MessageCircle, 
  Search,
  Calendar,
  FileText,
  Send,
  Paperclip,
  Download,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const StudentRecords = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: "Alex Chen", grade: "Grade 5", avatar: "🧒", email: "alex.chen@email.com" },
    { id: 2, name: "Emma Chen", grade: "Grade 3", avatar: "👧", email: "emma.chen@email.com" },
    { id: 3, name: "Lucas Wong", grade: "Grade 5", avatar: "👦", email: "lucas.wong@email.com" },
    { id: 4, name: "Sophia Lee", grade: "Grade 4", avatar: "👧", email: "sophia.lee@email.com" },
    { id: 5, name: "Ethan Cruz", grade: "Grade 6", avatar: "👦", email: "ethan.cruz@email.com" },
    { id: 6, name: "Mia Santos", grade: "Grade 4", avatar: "👧", email: "mia.santos@email.com" }
  ];

  const tabs = [
    { id: 'attendance', label: 'Attendance', icon: CheckCircle },
    { id: 'grades', label: 'Grades & Assessments', icon: ClipboardList },
    { id: 'materials', label: 'Materials', icon: Upload },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
  ];

  // Attendance Component
  const AttendanceTab = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceRecords, setAttendanceRecords] = useState(
      students.map(s => ({ ...s, status: 'unmarked' }))
    );

    const markAttendance = (studentId, status) => {
      setAttendanceRecords(prev => 
        prev.map(record => 
          record.id === studentId ? { ...record, status } : record
        )
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-900">Mark Attendance</h3>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {attendanceRecords.map(student => (
            <div key={student.id} className="border-2 border-neutral-100 rounded-xl p-4 hover:border-neutral-200 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{student.avatar}</div>
                  <div>
                    <div className="font-bold text-neutral-900">{student.name}</div>
                    <div className="text-sm text-neutral-600">{student.grade}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAttendance(student.id, 'present')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      student.status === 'present'
                        ? 'bg-green-500 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-green-100'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => markAttendance(student.id, 'absent')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      student.status === 'absent'
                        ? 'bg-red-500 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-red-100'
                    }`}
                  >
                    Absent
                  </button>
                  <button
                    onClick={() => markAttendance(student.id, 'late')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      student.status === 'late'
                        ? 'bg-orange-500 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-orange-100'
                    }`}
                  >
                    Late
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition">
          Save Attendance for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </button>
      </div>
    );
  };

  // Grades Component - Now with assessment management
  const GradesTab = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [assessments, setAssessments] = useState([
      { 
        id: 1, 
        title: 'Fractions Quiz', 
        type: 'quiz', 
        date: '2024-10-20',
        maxScore: 100,
        grades: [
          { studentId: 1, score: 85, feedback: 'Good work!' },
          { studentId: 2, score: 92, feedback: 'Excellent!' },
          { studentId: 3, score: 78, feedback: 'Keep practicing' }
        ]
      },
      { 
        id: 2, 
        title: 'Class Discussion: Problem Solving', 
        type: 'discussion', 
        date: '2024-10-22',
        grades: [
          { studentId: 1, participation: 'Active', feedback: 'Great contributions!' },
          { studentId: 4, participation: 'Moderate', feedback: 'Good effort' }
        ]
      }
    ]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [newAssessment, setNewAssessment] = useState({
      title: '',
      type: 'quiz',
      date: new Date().toISOString().split('T')[0],
      maxScore: 100
    });

    const AssessmentList = () => (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-900">Assessments & Activities</h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 transition"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>

        <div className="space-y-3">
          {assessments.map(assessment => (
            <div
              key={assessment.id}
              onClick={() => setSelectedAssessment(assessment)}
              className="border-2 border-neutral-100 rounded-xl p-4 hover:border-primary-300 hover:bg-primary-50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    assessment.type === 'quiz' ? 'bg-blue-100' :
                    assessment.type === 'exam' ? 'bg-purple-100' :
                    assessment.type === 'homework' ? 'bg-green-100' :
                    'bg-orange-100'
                  }`}>
                    <ClipboardList className={`w-6 h-6 ${
                      assessment.type === 'quiz' ? 'text-blue-600' :
                      assessment.type === 'exam' ? 'text-purple-600' :
                      assessment.type === 'homework' ? 'text-green-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900">{assessment.title}</div>
                    <div className="text-sm text-neutral-600 capitalize">
                      {assessment.type} • {new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {assessment.maxScore && ` • ${assessment.maxScore} points`}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-neutral-600">
                  {assessment.grades?.length || 0} graded
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const CreateAssessmentForm = () => (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-900">Create Assessment</h3>
          <button
            onClick={() => setShowCreateForm(false)}
            className="text-neutral-600 hover:text-neutral-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={newAssessment.title}
              onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
              placeholder="e.g., Chapter 5 Quiz, Class Discussion..."
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Type
              </label>
              <select
                value={newAssessment.type}
                onChange={(e) => setNewAssessment({...newAssessment, type: e.target.value})}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
              >
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="homework">Homework</option>
                <option value="project">Project</option>
                <option value="discussion">Discussion</option>
                <option value="participation">Participation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newAssessment.date}
                onChange={(e) => setNewAssessment({...newAssessment, date: e.target.value})}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
              />
            </div>
          </div>

          {!['discussion', 'participation'].includes(newAssessment.type) && (
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Maximum Score (optional)
              </label>
              <input
                type="number"
                value={newAssessment.maxScore}
                onChange={(e) => setNewAssessment({...newAssessment, maxScore: e.target.value})}
                placeholder="100"
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => {
                setAssessments([...assessments, { ...newAssessment, id: Date.now(), grades: [] }]);
                setShowCreateForm(false);
                setNewAssessment({ title: '', type: 'quiz', date: new Date().toISOString().split('T')[0], maxScore: 100 });
              }}
              className="flex-1 bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition"
            >
              Create Assessment
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 border-2 border-neutral-200 rounded-xl font-semibold hover:bg-neutral-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );

    const GradeAssessment = ({ assessment }) => {
      const [grades, setGrades] = useState(
        students.map(s => {
          const existing = assessment.grades?.find(g => g.studentId === s.id);
          return {
            ...s,
            score: existing?.score || '',
            participation: existing?.participation || '',
            feedback: existing?.feedback || ''
          };
        })
      );

      const updateGrade = (studentId, field, value) => {
        setGrades(prev => 
          prev.map(grade => 
            grade.id === studentId ? { ...grade, [field]: value } : grade
          )
        );
      };

      const isScoreBased = !['discussion', 'participation'].includes(assessment.type);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="text-primary-600 hover:text-primary-700 font-semibold mb-2"
              >
                ← Back to assessments
              </button>
              <h3 className="font-bold text-lg text-neutral-900">{assessment.title}</h3>
              <p className="text-sm text-neutral-600 capitalize">
                {assessment.type} • {new Date(assessment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {grades.map(student => (
              <div key={student.id} className="border-2 border-neutral-100 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{student.avatar}</div>
                  <div>
                    <div className="font-bold text-neutral-900">{student.name}</div>
                    <div className="text-sm text-neutral-600">{student.grade}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-4">
                  {isScoreBased ? (
                    <div className="md:col-span-3">
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Score
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={student.score}
                          onChange={(e) => updateGrade(student.id, 'score', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
                        />
                        {assessment.maxScore && <span className="text-neutral-600">/ {assessment.maxScore}</span>}
                      </div>
                    </div>
                  ) : (
                    <div className="md:col-span-3">
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Participation
                      </label>
                      <select
                        value={student.participation}
                        onChange={(e) => updateGrade(student.id, 'participation', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
                      >
                        <option value="">Not graded</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Active">Active</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Minimal">Minimal</option>
                      </select>
                    </div>
                  )}

                  <div className="md:col-span-9">
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Feedback / Comments
                    </label>
                    <input
                      type="text"
                      value={student.feedback}
                      onChange={(e) => updateGrade(student.id, 'feedback', e.target.value)}
                      placeholder="Add feedback for student and parents..."
                      className="w-full px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition">
            Save Grades & Notify Parents
          </button>
        </div>
      );
    };

    return (
      <>
        {showCreateForm ? (
          <CreateAssessmentForm />
        ) : selectedAssessment ? (
          <GradeAssessment assessment={selectedAssessment} />
        ) : (
          <AssessmentList />
        )}
      </>
    );
  };

  // Materials Component
  const MaterialsTab = () => {
    const [materials, setMaterials] = useState([
      { id: 1, title: 'Fractions Worksheet', type: 'PDF', date: '2024-10-20', size: '2.3 MB', category: 'Worksheet' },
      { id: 2, title: 'Algebra Practice', type: 'PDF', date: '2024-10-18', size: '1.8 MB', category: 'Practice' },
      { id: 3, title: 'Math Quiz Answer Key', type: 'PDF', date: '2024-10-15', size: '890 KB', category: 'Answer Key' }
    ]);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-900">Learning Materials</h3>
          <div className="text-sm text-neutral-600">{materials.length} files uploaded</div>
        </div>

        {/* Upload Section */}
        <div className="border-4 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary-300 transition cursor-pointer">
          <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <p className="font-semibold text-neutral-900 mb-1">Upload Materials</p>
          <p className="text-sm text-neutral-600">Click to browse or drag and drop files here</p>
          <p className="text-xs text-neutral-500 mt-2">Supported: PDF, DOC, DOCX, PPT, PPTX, Images (Max 10MB)</p>
          <input type="file" className="hidden" />
        </div>

        {/* Materials List */}
        <div className="space-y-3">
          {materials.map(material => (
            <div key={material.id} className="border-2 border-neutral-100 rounded-xl p-4 flex items-center justify-between hover:border-neutral-200 transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900">{material.title}</div>
                  <div className="text-sm text-neutral-600">
                    {material.category} • {material.type} • {material.size} • {new Date(material.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Messages Component
  const MessagesTab = () => {
    const [messageText, setMessageText] = useState('');

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-900">Parent Messages</h3>
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search parents..."
              className="pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none"
            />
          </div>
        </div>

        {selectedStudent ? (
          // Message Thread
          <div>
            <button 
              onClick={() => setSelectedStudent(null)}
              className="text-primary-600 hover:text-primary-700 font-semibold mb-4"
            >
              ← Back to conversations
            </button>

            <Card>
              <div className="border-b-2 border-neutral-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedStudent.avatar}</div>
                  <div>
                    <div className="font-bold text-neutral-900">Parent of {selectedStudent.name}</div>
                    <div className="text-sm text-neutral-600">{selectedStudent.grade} • {selectedStudent.email}</div>
                  </div>
                </div>
              </div>

              {/* Message Thread */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="flex-1 bg-neutral-100 rounded-xl p-4">
                    <p className="text-neutral-800">Hello! I wanted to discuss my child's recent progress in math class.</p>
                    <p className="text-xs text-neutral-500 mt-2">Yesterday, 3:30 PM</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 max-w-md bg-primary-500 text-white rounded-xl p-4">
                    <p>Thank you for reaching out! Your child is doing great. Let me know if you'd like to schedule a meeting.</p>
                    <p className="text-xs text-primary-100 mt-2">Yesterday, 4:15 PM</p>
                  </div>
                </div>
              </div>

              {/* Reply Box */}
              <div className="border-t-2 border-neutral-100 pt-4">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-400 focus:outline-none resize-none"
                  rows="3"
                />
                <div className="flex items-center justify-between mt-3">
                  <button className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition">
                    <Paperclip className="w-5 h-5" />
                    Attach file
                  </button>
                  <button className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Conversation List
          <div className="space-y-3">
            {students.map(student => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="border-2 border-neutral-100 rounded-xl p-4 hover:border-primary-300 hover:bg-primary-50 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{student.avatar}</div>
                    <div>
                      <div className="font-bold text-neutral-900">Parent of {student.name}</div>
                      <div className="text-sm text-neutral-600">{student.grade} • {student.email}</div>
                    </div>
                  </div>
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-neutral-900">Student Records 📋</h1>
        <p className="text-neutral-600 mt-1">Manage attendance, grades, materials, and parent communication</p>
      </div>

      {/* Tabs */}
      <Card className="!p-0 overflow-hidden">
        <div className="flex border-b-2 border-neutral-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-600 border-b-4 border-primary-500'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'grades' && <GradesTab />}
          {activeTab === 'materials' && <MaterialsTab />}
          {activeTab === 'messages' && <MessagesTab />}
        </div>
      </Card>
    </div>
  );
};

export default StudentRecords;