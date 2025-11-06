// src/components/BadgeCard.jsx
export default function BadgeCard({ name, icon }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="font-medium text-gray-700">{name}</p>
    </div>
  );
}
