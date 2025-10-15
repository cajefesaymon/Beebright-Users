import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBackToHome = () => {
    navigate('/');
  };

  // ✅ Updated Login function (connects to backend)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert('✅ ' + data.message);
        navigate('/dashboard');
      } else {
        alert('❌ ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Server error or backend not running');
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src="/logo.jpg" alt="BeeBright Logo" className="logo" />

        <div className="button-group">
          <button className="active">Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <p className="signup-text">
            Don't have an account?{' '}
            <a href="#" onClick={() => navigate('/register')}>
              Sign Up
            </a>
          </p>

          <button
            type="button"
            className="login-btn"
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