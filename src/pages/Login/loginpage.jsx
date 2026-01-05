import React, { useState } from "react";
import "./loginpage.css";
import { login, auth, googleprovider } from "../../firebaseconfig/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed");
    }
  };

  return (
    <>
    <div className="login-container">
      
      <div className="glow glow-top"></div>
      <div className="glow glow-bottom"></div>
      <div className="login-card">
        
        <div className="login-header">
          
          <h2>Welcome Back</h2>
          <p>Continue your learning journey with Atlasify</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        <div className="divider">
          
          <span>Or continue with</span>
        </div>
        <div className="social-login">
        <button onClick={handleGoogleLogin} className="social-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          ></img>
          Google
        </button>
        <button className="social-btn">
          
          <img
            src="https://www.svgrepo.com/show/475654/github-color.svg"
            className="invert"
            alt="GitHub"
          ></img>
          GitHub
        </button>
      </div>
        <p className="signup-text">
       
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
      </div>
    </>
  );
};

export default LoginPage;
