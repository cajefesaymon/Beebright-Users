// src/components/ClassCard.jsx
export default function ClassCard({ subject, teacher, time, color }) {
  const colorMap = {
    blue: "bg-blue-50 border-blue-300",
    green: "bg-green-50 border-green-300",
    purple: "bg-purple-50 border-purple-300",
  };

  return (
    <div className={`p-4 border-2 rounded-xl ${colorMap[color]} flex justify-between items-center`}>
      <div>
        <h4 className="font-semibold text-lg">{subject}</h4>
        <p className="text-gray-600 text-sm">{teacher}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{time}</p>
        <button className="mt-1 bg-pink-500 hover:bg-pink-600 text-white text-sm px-3 py-1 rounded-lg transition">
          Join Now 🚀
        </button>
      </div>
    </div>
  );
}
