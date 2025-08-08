import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaCheckCircle,
    FaShieldAlt,
    FaArrowLeft,
    FaKey
} from 'react-icons/fa';
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    // Validate token on component mount
    if (token) {
      validateResetToken();
    } else {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const validateResetToken = () => {
    try {
      const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '[]');
      const validToken = resetTokens.find(rt => 
        rt.token === token && new Date(rt.expiry) > new Date()
      );
      
      if (validToken) {
        setIsValidToken(true);
        setUserEmail(validToken.email);
      } else {
        setError('This reset link has expired or is invalid. Please request a new password reset.');
      }
    } catch (error) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user password in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex(user => user.email === userEmail);
      
      if (userIndex !== -1) {
        registeredUsers[userIndex].password = formData.password;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        // Remove used token
        const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '[]');
        const updatedTokens = resetTokens.filter(rt => rt.token !== token);
        localStorage.setItem('resetTokens', JSON.stringify(updatedTokens));
        
        setIsSuccess(true);
      } else {
        setError('User not found. Please try again.');
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

  if (!isValidToken && !token) {
    return (
      <>
        <Navbar />
        <div className="reset-password-container">
          <div className="reset-password-content">
            <motion.div 
              className="reset-password-card error-state"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="error-icon">
                <FaShieldAlt />
              </div>
              <h2>Invalid Reset Link</h2>
              <p>{error}</p>
              <button onClick={handleBackToLogin} className="back-button">
                <FaArrowLeft />
                Back to Login
              </button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="reset-password-container">
        <div className="reset-password-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="reset-password-content">
          <motion.div 
            className="reset-password-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {!isSuccess ? (
              <>
                <div className="reset-password-header">
                  <motion.div 
                    className="reset-password-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                  >
                    <FaKey />
                  </motion.div>
                  <motion.h1 
                    className="reset-password-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Reset Your Password
                  </motion.h1>
                  <motion.p 
                    className="reset-password-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    Enter your new password below. Make sure it's secure and easy to remember.
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="reset-password-form">
                  <motion.div 
                    className={`form-group ${focusedField === 'password' ? 'focused' : ''} ${error ? 'error' : ''}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter new password"
                        className="form-input"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''} ${error ? 'error' : ''}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Confirm new password"
                        className="form-input"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </motion.div>

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

                  <motion.button
                    type="submit"
                    className={`reset-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    {isLoading ? (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                        <span>Updating Password...</span>
                      </div>
                    ) : (
                      <>
                        <FaKey />
                        Reset Password
                      </>
                    )}
                  </motion.button>
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
                <h2>Password Reset Successfully!</h2>
                <p>
                  Your password has been updated successfully. You can now log in with your new password.
                </p>
                <button
                  onClick={handleBackToLogin}
                  className="login-button"
                >
                  <FaArrowLeft />
                  Go to Login
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
