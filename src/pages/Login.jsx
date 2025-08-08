import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaSignInAlt, 
    FaGoogle, 
    FaFacebook, 
    FaTwitter,
    FaShieldAlt
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/action';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => state.handleAuth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for button state
  const isFormValid = () => {
    return formData.email.length > 0 &&
           /\S+@\S+\.\S+/.test(formData.email) &&
           formData.password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if user exists in localStorage (from registration)
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        // Merge temp cart with user's saved cart
        const tempCart = authState.tempCart;
        const userWithCart = {
          ...user,
          cart: [...(user.cart || []), ...tempCart]
        };
        
        dispatch(loginUser(userWithCart));
        localStorage.setItem('currentUser', JSON.stringify(userWithCart));
        navigate('/');
      } else {
        setErrors({ email: 'Invalid email or password. Please register first.' });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="login-content">
          <motion.div 
            className="login-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="login-header">
              <motion.div 
                className="login-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                <FaShieldAlt />
              </motion.div>
              <motion.h1 
                className="login-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                className="login-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Sign in to your account to continue your shopping journey
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <motion.div 
                className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    className="form-input"
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.span 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className={`form-group ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'error' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
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
                    placeholder="Enter your password"
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
                <AnimatePresence>
                  {errors.password && (
                    <motion.span 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.password}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className="form-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                className={`login-button ${isLoading ? 'loading' : ''} ${!isFormValid() ? 'disabled' : ''}`}
                disabled={isLoading || !isFormValid()}
                whileHover={isFormValid() ? { scale: 1.02 } : {}}
                whileTap={isFormValid() ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {isLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In
                  </>
                )}
              </motion.button>

              <motion.div 
                className="divider"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <span>or continue with</span>
              </motion.div>

                             <motion.div 
                 className="social-login"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.1, duration: 0.6 }}
               >
                 <div className="coming-soon-text">
                   This feature will be add in next update
                 </div>
                 <div className="social-buttons-container">
                   <button
                     type="button"
                     className="social-button google"
                     onClick={() => handleSocialLogin('Google')}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <FaGoogle />
                     Google
                   </button>
                   <button
                     type="button"
                     className="social-button facebook"
                     onClick={() => handleSocialLogin('Facebook')}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <FaFacebook />
                     Facebook
                   </button>
                   <button
                     type="button"
                     className="social-button twitter"
                     onClick={() => handleSocialLogin('Twitter')}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <FaTwitter />
                     Twitter
                   </button>
                 </div>
               </motion.div>

              <motion.div 
                className="register-link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="link-highlight">
                    Create one now
                  </Link>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
          }

          .login-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }

          .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .shape {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
          }

          .shape-1 {
            width: 80px;
            height: 80px;
            top: 20%;
            left: 10%;
            animation-delay: 0s;
          }

          .shape-2 {
            width: 120px;
            height: 120px;
            top: 60%;
            right: 10%;
            animation-delay: 2s;
          }

          .shape-3 {
            width: 60px;
            height: 60px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
          }

          .shape-4 {
            width: 100px;
            height: 100px;
            top: 10%;
            right: 30%;
            animation-delay: 1s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          .login-content {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 900px;
          }

          .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 3rem 2.5rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
          }

          .login-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            border-radius: 24px 24px 0 0;
          }

          .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }

          .login-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          }

          .login-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .login-subtitle {
            color: #718096;
            font-size: 1rem;
            line-height: 1.6;
          }

          .login-form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            position: relative;
          }

          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .input-icon {
            position: absolute;
            left: 1rem;
            color: #667eea;
            font-size: 1rem;
            transition: all 0.3s ease;
            z-index: 2;
            background: rgba(102, 126, 234, 0.1);
            padding: 0.5rem;
            border-radius: 8px;
            border: 1px solid rgba(102, 126, 234, 0.2);
          }

          .form-input {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
            outline: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .form-input:hover {
            border-color: #cbd5e0;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
          }

          .form-input:focus {
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
          }

          .form-group.focused .input-icon {
            color: #667eea;
            background: rgba(102, 126, 234, 0.15);
            border-color: rgba(102, 126, 234, 0.3);
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
          }

          .form-group.error .form-input {
            border-color: #e53e3e;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
          }

          .form-group.error .form-input:hover {
            border-color: #e53e3e;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1), 0 6px 16px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
          }

          .password-toggle {
            position: absolute;
            right: 1rem;
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.2);
            color: #667eea;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
            z-index: 2;
            padding: 0.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .password-toggle:hover {
            color: #667eea;
            background: rgba(102, 126, 234, 0.15);
            border-color: rgba(102, 126, 234, 0.3);
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
          }



          .error-message {
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
          }

          .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
          }

          .remember-me {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.9rem;
            color: #4a5568;
          }

          .remember-me input[type="checkbox"] {
            display: none;
          }

          .checkmark {
            width: 18px;
            height: 18px;
            border: 2px solid #cbd5e0;
            border-radius: 4px;
            position: relative;
            transition: all 0.3s ease;
          }

          .remember-me input[type="checkbox"]:checked + .checkmark {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: #667eea;
          }

          .remember-me input[type="checkbox"]:checked + .checkmark::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 0.7rem;
            font-weight: bold;
          }

          .forgot-password {
            color: #667eea;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
          }

          .forgot-password:hover {
            color: #764ba2;
          }

          .login-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            position: relative;
            overflow: hidden;
          }

          .login-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }

          .login-button:hover::before {
            left: 100%;
          }

          .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }

          .login-button:disabled,
          .login-button.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2) !important;
          }

          .login-button:disabled:hover,
          .login-button.disabled:hover {
            transform: none !important;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2) !important;
          }

          .loading-spinner {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .divider {
            text-align: center;
            margin: 2rem 0;
            position: relative;
          }

          .divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: #e2e8f0;
          }

          .divider span {
            background: rgba(255, 255, 255, 0.95);
            padding: 0 1rem;
            color: #718096;
            font-size: 0.9rem;
          }

                     .social-login {
             display: flex;
             flex-direction: column;
             gap: 1rem;
             margin-bottom: 2rem;
             border: 2px solid #e2e8f0;
             border-radius: 12px;
             padding: 1.5rem;
             background: rgba(255, 255, 255, 0.5);
             backdrop-filter: blur(10px);
           }

           .coming-soon-text {
             text-align: center;
             color: #718096;
             font-size: 0.9rem;
             font-weight: 500;
             margin-bottom: 1rem;
             padding: 0.5rem;
             background: rgba(102, 126, 234, 0.1);
             border-radius: 8px;
             border: 1px solid rgba(102, 126, 234, 0.2);
           }

           .social-buttons-container {
             display: grid;
             grid-template-columns: 1fr 1fr 1fr;
             gap: 1rem;
           }

          .social-button {
            background: white;
            border: 2px solid #e2e8f0;
            padding: 0.8rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: #4a5568;
          }

          .social-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .social-button.google:hover {
            border-color: #ea4335;
            color: #ea4335;
          }

          .social-button.facebook:hover {
            border-color: #1877f2;
            color: #1877f2;
          }

          .social-button.twitter:hover {
            border-color: #1da1f2;
            color: #1da1f2;
          }

          .register-link {
            text-align: center;
          }

          .register-link p {
            color: #718096;
            font-size: 0.9rem;
          }

          .link-highlight {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .link-highlight:hover {
            color: #764ba2;
          }

          @media (max-width: 768px) {
            .login-card {
              padding: 2rem 1.5rem;
            }

            .login-title {
              font-size: 1.8rem;
            }

                         .social-login {
               padding: 1rem;
             }

             .social-buttons-container {
               grid-template-columns: 1fr;
             }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Login;
