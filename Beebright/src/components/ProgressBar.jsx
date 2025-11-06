// src/components/ProgressBar.jsx
export default function ProgressBar({ completed, total }) {
  const percentage = (completed / total) * 100;
  return (
    <div>
      <p className="text-gray-600 text-sm mb-1">
        Today's Progress: {completed}/{total} classes
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-yellow-400 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
