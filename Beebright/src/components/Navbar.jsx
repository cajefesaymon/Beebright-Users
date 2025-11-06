export default function Navbar({ user, onNavigate, onLogout }) {
  return (
    <nav className="bg-white shadow-sm px-10 py-3 flex justify-between items-center">
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-2">
        <div className="bg-yellow-100 p-1.5 rounded-md">
          <span className="text-lg">🐝</span>
        </div>
        <h1 className="text-xl font-bold text-orange-500 tracking-tight">
          BeeBright
        </h1>
      </div>

      {/* CENTER: LINKS */}
      <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
        <a href="#features" className="hover:text-orange-500 transition">
          Features
        </a>
        <a href="#about" className="hover:text-orange-500 transition">
          About
        </a>
        <a href="#contact" className="hover:text-orange-500 transition">
          Contact
        </a>
      </div>

      {/* RIGHT: BUTTONS */}
      <div className="flex items-center gap-3">
        {user ? (
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => onNavigate("login")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium flex items-center gap-1 hover:bg-blue-600 transition"
            >
              🔒 Login
            </button>
            <button
              onClick={() => onNavigate("enroll")}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-1.5 rounded-md font-medium hover:from-orange-500 hover:to-orange-600 transition"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
