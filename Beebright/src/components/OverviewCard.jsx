// src/components/OverviewCard.jsx
export default function OverviewCard({ label, value, color }) {
  const bg = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
  }[color];

  return (
    <div className={`p-4 rounded-2xl shadow-sm ${bg} font-semibold`}>
      <div className="text-xl">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
