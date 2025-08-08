import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaEnvelope, 
    FaArrowLeft, 
    FaCheckCircle,
    FaShieldAlt,
    FaPaperPlane
} from 'react-icons/fa';
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if user exists in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = registeredUsers.find(user => user.email === email);
      
      if (userExists) {
        // Generate reset token
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const resetExpiry = new Date(Date.now() + 3600000); // 1 hour from now
        
        // Store reset token in localStorage (in real app, this would be in database)
        const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '[]');
        resetTokens.push({
          email,
          token: resetToken,
          expiry: resetExpiry.toISOString()
        });
        localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
        
        // Simulate sending email with reset link
        const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
        console.log(`Password reset link sent to ${email}`);
        console.log(`Reset link: ${resetLink}`);
        
        // In a real application, you would send this link via email
        // For demo purposes, we'll show it in the console and alert
        alert(`Reset link generated: ${resetLink}\n\nIn a real application, this would be sent to your email. For demo purposes, you can copy this link and open it in a new tab.`);
        
        setIsSubmitted(true);
      } else {
        setError('No account found with this email address. Please check your email or create a new account.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="forgot-password-container">
        <div className="forgot-password-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="forgot-password-content">
          <motion.div 
            className="forgot-password-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {!isSubmitted ? (
              <>
                <div className="forgot-password-header">
                  <motion.div 
                    className="forgot-password-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                  >
                    <FaShieldAlt />
                  </motion.div>
                  <motion.h1 
                    className="forgot-password-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Forgot Password?
                  </motion.h1>
                  <motion.p 
                    className="forgot-password-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    No worries! Enter your email address and we'll send you a link to reset your password.
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="forgot-password-form">
                  <motion.div 
                    className={`form-group ${focusedField ? 'focused' : ''} ${error ? 'error' : ''}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <div className="input-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(true)}
                        onBlur={() => setFocusedField(false)}
                        placeholder="Enter your email address"
                        className="form-input"
                        required
                      />
                    </div>
                    <AnimatePresence>
                      {error && (
                        <motion.span 
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {error}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className={`reset-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {isLoading ? (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                        <span>Sending Reset Link...</span>
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Reset Link
                      </>
                    )}
                  </motion.button>

                  <motion.div 
                    className="back-to-login"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="back-button"
                    >
                      <FaArrowLeft />
                      Back to Login
                    </button>
                  </motion.div>
                </form>
              </>
            ) : (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <h2>Check Your Email</h2>
                <p>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="instruction-text">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
                <div className="success-actions">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="resend-button"
                  >
                    Resend Email
                  </button>
                  <button
                    onClick={handleBackToLogin}
                    className="back-button"
                  >
                    <FaArrowLeft />
                    Back to Login
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
