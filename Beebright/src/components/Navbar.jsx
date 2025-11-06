// src/components/Navbar.jsx
export default function Navbar({ user, onNavigate, onLogout }) {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">🐝 BeeBright</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => onNavigate("login")}
              className="text-indigo-600 hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate("enroll")}
              className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              Enroll Now
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
