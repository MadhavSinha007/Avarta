import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext/index';
import './Login.css';

const Login = () => {
  const { userLoggedIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    // Password complexity validation
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }
    
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="login-page">
      {userLoggedIn && <Navigate to="/analyzer" replace={true} />}
      
      <div className="login-layout">
        {/* Right Side - Login Form Only */}
        <main className="login-main">
          <div className="login-container">
            {/* Logo Section */}
            <div className="logo-section">
              <img 
                src="/assets/logo.png" 
                alt="Company Logo" 
                className="company-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="logo-fallback" style={{display: 'none'}}>
                <span className="logo-text">Your Logo</span>
              </div>
            </div>
            
            {/* Welcome Section */}
            <div className="welcome-section">
              <h1 className="welcome-title">Let the Journey Begin!</h1>
              <p className="welcome-subtitle">
                Join us in our mission to create a green planet, one smart choice at a time.
              </p>
            </div>
            
            <form onSubmit={onSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label className="form-label">
                    Password
                  </label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    minLength="6"
                  />
                </div>
                <div className="password-requirement">
                  Password must be at least 6 characters long
                </div>
              </div>

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSigningIn}
                className={`login-button ${isSigningIn ? 'disabled' : ''}`}
              >
                {isSigningIn ? 'Signing In...' : 'Login'}
              </button>
            </form>
            
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">OR</div>
              <div className="divider-line"></div>
            </div>
            
            <button
              disabled={isSigningIn}
              onClick={onGoogleSignIn}
              className={`google-button ${isSigningIn ? 'disabled' : ''}`}
            >
              <svg className="google-icon" viewBox="0 0 48 48" fill="none">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
                  <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
                  <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
                  <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4056 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="google-button-text">
                {isSigningIn ? 'Signing In...' : 'Continue with Google'}
              </span>
            </button>
            
            <p className="signup-link">
              Don't have an account? {' '}
              <Link to="/register" className="signup-text">
                Sign Up For Free
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;