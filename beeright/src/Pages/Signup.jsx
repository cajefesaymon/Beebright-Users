import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <img src="/logo.jpg" alt="BeeBright Logo" className="logo" />

        <div className="button-group">
          <button onClick={handleGoToLogin}>Login</button>
          <button className="active">Register</button>
        </div>

        <form className="signup-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>I am a</label>
            <select required>
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="tutor">Tutor</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign In
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <a href="#" onClick={handleGoToLogin}>
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

