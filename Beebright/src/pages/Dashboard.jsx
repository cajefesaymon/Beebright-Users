import React from "react";
import Layout from "../components/Layout";
import { Calendar, Trophy } from "lucide-react";

export default function Dashboard() {
  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
          👋 Hey there, <span className="text-pink-600">Student!</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Ready to learn something awesome today? 🚀
        </p>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <OverviewCard label="Total Classes" value="12" color="blue" />
        <OverviewCard label="Completed" value="8" color="green" />
        <OverviewCard label="Hours Studied" value="24" color="purple" />
        <OverviewCard label="Badges Earned" value="15" color="yellow" />
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-3 gap-6">
        {/* TODAY'S CLASSES */}
        <div className="col-span-2 bg-white rounded-2xl p-6 border-2 border-indigo-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Today's Classes</h3>
          </div>

          <div className="space-y-4">
            <ClassCard
              subject="Math"
              teacher="Ms. Johnson"
              time="2:00 PM"
              color="blue"
            />
            <ClassCard
              subject="Science"
              teacher="Mr. Smith"
              time="4:00 PM"
              color="green"
            />
            <ClassCard
              subject="English"
              teacher="Ms. Davis"
              time="6:00 PM"
              color="purple"
            />
          </div>
        </div>

        {/* BADGES */}
        <div className="bg-white border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={22} />
            <h3 className="text-lg font-bold text-gray-800">
              Your Awesome Badges!
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <BadgeCard name="Math Whiz" emoji="🧮" color="yellow" />
            <BadgeCard name="Science Star" emoji="🔬" color="green" />
            <BadgeCard name="Reading Pro" emoji="📖" color="purple" />
            <BadgeCard name="Perfect Attendance" emoji="🏅" color="orange" />
          </div>

          <button className="w-full bg-yellow-400 text-gray-800 font-semibold rounded-xl py-2 hover:bg-yellow-300 transition">
            View All
          </button>
        </div>
      </div>
    </Layout>
  );
}

/* OVERVIEW CARD */
function OverviewCard({ label, value, color }) {
  const colors = {
    blue: "from-blue-50 to-blue-100 text-blue-600",
    green: "from-green-50 to-green-100 text-green-600",
    purple: "from-purple-50 to-purple-100 text-purple-600",
    yellow: "from-yellow-50 to-yellow-100 text-yellow-600",
  };
  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} p-5 rounded-2xl shadow-sm border`}
    >
      <div className="text-4xl font-bold mb-2 text-gray-800">{value}</div>
      <p className="text-gray-700 font-medium">{label}</p>
    </div>
  );
}

/* CLASS CARD */
function ClassCard({ subject, teacher, time, color }) {
  const colors = {
    blue: "border-blue-300 bg-blue-50",
    green: "border-green-300 bg-green-50",
    purple: "border-purple-300 bg-purple-50",
  };
  return (
    <div
      className={`flex justify-between items-center border-2 ${colors[color]} rounded-xl p-4`}
    >
      <div>
        <p className="font-bold text-gray-800">{subject}</p>
        <p className="text-sm text-gray-600">{teacher}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-gray-800">{time}</p>
        <button className="bg-white border rounded-full px-3 py-1 text-sm font-semibold shadow-sm hover:bg-gray-50 transition">
          Join Now! 🚀
        </button>
      </div>
    </div>
  );
}

/* BADGE CARD */
function BadgeCard({ name, emoji }) {
  return (
    <div className="bg-yellow-50 rounded-xl shadow-sm flex flex-col items-center justify-center py-4">
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="text-sm font-semibold text-gray-700">{name}</p>
    </div>
  );
}
