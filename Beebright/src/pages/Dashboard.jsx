import React, { useState, useEffect } from "react";
import { Calendar, Trophy, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000";
  const currentStudentId = user?._id || user?.id || user?._id?.$oid;

  useEffect(() => {
    if (currentStudentId) {
      fetchClasses();
    } else {
      setLoading(false);
    }
  }, [currentStudentId]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/schedules/${currentStudentId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard classes:', data);
        setClasses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get today's classes
  const today = new Date();
  const todayClasses = classes.filter(cls => {
    if (!cls.date) return false;
    const classDate = new Date(cls.date);
    return classDate.toDateString() === today.toDateString();
  });

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
          👋 Hey there,{" "}
          <span className="text-pink-600">
            {user?.firstName || user?.name ? `${user.firstName || user.name}!` : "Student!"}
          </span>
        </h1>
        <p className="text-gray-500 mt-1 text-base">
          Ready to learn something awesome today? 🚀
        </p>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <OverviewCard label="Total Classes" value={classes.length.toString()} color="blue" />
        <OverviewCard label="Today's Classes" value={todayClasses.length.toString()} color="green" />
        <OverviewCard label="This Week" value={classes.filter(cls => {
          if (!cls.date) return false;
          const classDate = new Date(cls.date);
          const weekFromNow = new Date(today);
          weekFromNow.setDate(today.getDate() + 7);
          return classDate >= today && classDate <= weekFromNow;
        }).length.toString()} color="purple" />
        <OverviewCard label="Subjects" value={[...new Set(classes.map(c => c.subject))].length.toString()} color="yellow" />
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TODAY'S CLASSES */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">
              {todayClasses.length > 0 ? "Today's Classes" : "Your Classes"}
            </h3>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
          ) : (todayClasses.length > 0 ? todayClasses : classes.slice(0, 5)).length > 0 ? (
            <div className="space-y-4">
              {(todayClasses.length > 0 ? todayClasses : classes.slice(0, 5)).map((classItem, index) => (
                <ClassCard
                  key={classItem._id || index}
                  subject={classItem.subject}
                  teacher={classItem.tutorId?.name || classItem.tutorId?.email || 'Teacher TBA'}
                  time={classItem.time}
                  room={classItem.room}
                  date={classItem.date}
                  color={['blue', 'green', 'purple'][index % 3]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="mx-auto mb-3 text-gray-300" size={48} />
              <p className="font-medium">No classes scheduled yet</p>
              <p className="text-sm mt-1">Your classes will appear here once they're assigned</p>
            </div>
          )}
        </div>

        {/* BADGES */}
        <div className="bg-white border border-yellow-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={22} />
            <h3 className="text-lg font-bold text-gray-800">
              Your Awesome Badges!
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <BadgeCard name="Math Whiz" emoji="🧮" />
            <BadgeCard name="Science Star" emoji="🔬" />
            <BadgeCard name="Reading Pro" emoji="📖" />
            <BadgeCard name="Perfect Attendance" emoji="🏅" />
          </div>
          <button className="w-full bg-yellow-400 text-gray-800 font-semibold rounded-xl py-2 hover:bg-yellow-300 transition">
            View All
          </button>
        </div>
      </div>
    </>
  );
}

/* -----------------------------
   OVERVIEW CARD COMPONENT
------------------------------ */
function OverviewCard({ label, value, color }) {
  const colors = {
    blue: "from-blue-50 to-blue-100 text-blue-600",
    green: "from-green-50 to-green-100 text-green-600",
    purple: "from-purple-50 to-purple-100 text-purple-600",
    yellow: "from-yellow-50 to-yellow-100 text-yellow-600",
  };
  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} p-6 rounded-2xl shadow-sm border border-gray-100`}
    >
      <div className="text-4xl font-extrabold mb-2 text-gray-800">{value}</div>
      <p className="text-gray-700 font-medium">{label}</p>
    </div>
  );
}

/* -----------------------------
   CLASS CARD COMPONENT
------------------------------ */
function ClassCard({ subject, teacher, time, room, date, color }) {
  const colors = {
    blue: "border-blue-300 bg-blue-50",
    green: "border-green-300 bg-green-50",
    purple: "border-purple-300 bg-purple-50",
  };
  
  return (
    <div
      className={`flex justify-between items-center border ${colors[color]} rounded-xl p-4 transition hover:shadow-md`}
    >
      <div className="flex-1">
        <p className="font-bold text-gray-800">{subject}</p>
        <p className="text-sm text-gray-600">{teacher}</p>
        {room && (
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            📍 {room}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-gray-800 flex items-center gap-1">
            <Clock size={14} />
            {time}
          </p>
          {date && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          )}
        </div>
        <button className="bg-white border rounded-full px-3 py-1 text-sm font-semibold shadow-sm hover:bg-gray-50 transition">
          Join 🚀
        </button>
      </div>
    </div>
  );
}

/* -----------------------------
   BADGE CARD COMPONENT
------------------------------ */
function BadgeCard({ name, emoji }) {
  return (
    <div className="bg-yellow-50 border border-yellow-100 rounded-xl shadow-sm flex flex-col items-center justify-center py-4 hover:shadow-md transition">
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="text-sm font-semibold text-gray-700 text-center">{name}</p>
    </div>
  );
}