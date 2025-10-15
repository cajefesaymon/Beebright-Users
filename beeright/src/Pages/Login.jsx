import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  
  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/dashboard');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src="/logo.jpg" alt="BeeBright Logo" className="logo" />

        <div className="button-group">
          <button className="active">Login</button>
          <button>Register</button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          {/* ✅ This button now goes directly to dashboard */}
          <button type="submit" className="login-btn">
            Log In
          </button>

          <p className="signup-text">
            Don't have an account? <a href="#">Sign Up</a>
          </p>

          {/* Back to home */}
          <button
            type="button"
            className="login-btn "
            style={{ marginTop: '10px', backgroundColor: '#6b7280' }}
            onClick={handleBackToHome}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
