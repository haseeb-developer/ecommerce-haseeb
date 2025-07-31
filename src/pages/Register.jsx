import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaUserPlus, 
    FaGoogle, 
    FaFacebook, 
    FaTwitter,
    FaShieldAlt,
    FaCheckCircle
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/action';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.handleAuth);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

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

        // Calculate password strength
        if (name === 'password') {
            let strength = 0;
            if (value.length >= 8) strength += 1;
            if (/[a-z]/.test(value)) strength += 1;
            if (/[A-Z]/.test(value)) strength += 1;
            if (/[0-9]/.test(value)) strength += 1;
            if (/[^A-Za-z0-9]/.test(value)) strength += 1;
            setPasswordStrength(strength);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (passwordStrength < 3) {
            newErrors.password = 'Password is too weak';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Check if user already exists
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const existingUser = registeredUsers.find(u => u.email === formData.email);
            
            if (existingUser) {
                setErrors({ email: 'User with this email already exists. Please login instead.' });
                setIsLoading(false);
                return;
            }
            
            // Create new user with temp cart
            const newUser = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                cart: authState.tempCart || []
            };
            
            // Save to registered users
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            // Dispatch registration action
            dispatch(registerUser(newUser));
            
            // Navigate to login page
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialRegister = (provider) => {
        // Simulate social registration
        console.log(`Registering with ${provider}`);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 1) return '#e53e3e';
        if (passwordStrength <= 2) return '#dd6b20';
        if (passwordStrength <= 3) return '#d69e2e';
        if (passwordStrength <= 4) return '#38a169';
        return '#38a169';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return 'Very Weak';
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength <= 3) return 'Fair';
        if (passwordStrength <= 4) return 'Good';
        return 'Strong';
    };

    return (
        <>
            <Navbar />
            <div className="register-container">
                <div className="register-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                    </div>
                </div>
                
                <div className="register-content">
                    <motion.div 
                        className="register-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="register-header">
                            <motion.div 
                                className="register-icon"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                            >
                                <FaUserPlus />
                            </motion.div>
                            <motion.h1 
                                className="register-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Join FashionHub
                            </motion.h1>
                            <motion.p 
                                className="register-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                Create your account and start your fashion journey today
                            </motion.p>
                        </div>

                        <form onSubmit={handleSubmit} className="register-form">
                            <motion.div 
                                className={`form-group ${focusedField === 'fullName' ? 'focused' : ''} ${errors.fullName ? 'error' : ''}`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <div className="input-wrapper">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('fullName')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Enter your full name"
                                        className="form-input"
                                        required
                                    />
                                    <div className="input-line"></div>
                                </div>
                                <AnimatePresence>
                                    {errors.fullName && (
                                        <motion.span 
                                            className="error-message"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            {errors.fullName}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div 
                                className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
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
                                    <div className="input-line"></div>
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
                                transition={{ delay: 0.8, duration: 0.6 }}
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
                                        placeholder="Create a password"
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
                                    <div className="input-line"></div>
                                </div>
                                
                                {formData.password && (
                                    <motion.div 
                                        className="password-strength"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                    >
                                        <div className="strength-bar">
                                            <div 
                                                className="strength-fill"
                                                style={{ 
                                                    width: `${(passwordStrength / 5) * 100}%`,
                                                    backgroundColor: getPasswordStrengthColor()
                                                }}
                                            ></div>
                                        </div>
                                        <span 
                                            className="strength-text"
                                            style={{ color: getPasswordStrengthColor() }}
                                        >
                                            {getPasswordStrengthText()}
                                        </span>
                                    </motion.div>
                                )}
                                
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
                                className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''} ${errors.confirmPassword ? 'error' : ''}`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <div className="input-wrapper">
                                    <FaShieldAlt className="input-icon" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('confirmPassword')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Confirm your password"
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
                                    <div className="input-line"></div>
                                </div>
                                <AnimatePresence>
                                    {errors.confirmPassword && (
                                        <motion.span 
                                            className="error-message"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            {errors.confirmPassword}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div 
                                className="form-options"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                            >
                                <label className="terms-checkbox">
                                    <input type="checkbox" required />
                                    <span className="checkmark"></span>
                                    I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                                </label>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className={`register-button ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                            >
                                {isLoading ? (
                                    <div className="loading-spinner">
                                        <div className="spinner"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <>
                                        <FaUserPlus />
                                        Create Account
                                    </>
                                )}
                            </motion.button>

                            <motion.div 
                                className="divider"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                            >
                                <span>or sign up with</span>
                            </motion.div>

                            <motion.div 
                                className="social-register"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3, duration: 0.6 }}
                            >
                                <button
                                    type="button"
                                    className="social-button google"
                                    onClick={() => handleSocialRegister('Google')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaGoogle />
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="social-button facebook"
                                    onClick={() => handleSocialRegister('Facebook')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaFacebook />
                                    Facebook
                                </button>
                                <button
                                    type="button"
                                    className="social-button twitter"
                                    onClick={() => handleSocialRegister('Twitter')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaTwitter />
                                    Twitter
                                </button>
                            </motion.div>

                            <motion.div 
                                className="login-link"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.6 }}
                            >
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/login" className="link-highlight">
                                        Sign in here
                                    </Link>
                                </p>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

                <style jsx>{`
                    .register-container {
                        min-height: 100vh;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem 1rem;
                    }

                    .register-background {
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
                        animation: float 8s ease-in-out infinite;
                    }

                    .shape-1 {
                        width: 100px;
                        height: 100px;
                        top: 15%;
                        left: 5%;
                        animation-delay: 0s;
                    }

                    .shape-2 {
                        width: 140px;
                        height: 140px;
                        top: 70%;
                        right: 5%;
                        animation-delay: 2s;
                    }

                    .shape-3 {
                        width: 80px;
                        height: 80px;
                        bottom: 15%;
                        left: 15%;
                        animation-delay: 4s;
                    }

                    .shape-4 {
                        width: 120px;
                        height: 120px;
                        top: 5%;
                        right: 25%;
                        animation-delay: 1s;
                    }

                    .shape-5 {
                        width: 60px;
                        height: 60px;
                        top: 50%;
                        left: 50%;
                        animation-delay: 3s;
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-25px) rotate(180deg); }
                    }

                    .register-content {
                        position: relative;
                        z-index: 2;
                        width: 100%;
                        max-width: 900px;
                    }

                    .register-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        border-radius: 24px;
                        padding: 3rem 2.5rem;
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        position: relative;
                        overflow: hidden;
                    }

                    .register-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                        border-radius: 24px 24px 0 0;
                    }

                    .register-header {
                        text-align: center;
                        margin-bottom: 2.5rem;
                    }

                    .register-icon {
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

                    .register-title {
                        font-size: 2.2rem;
                        font-weight: 700;
                        color: #1a202c;
                        margin-bottom: 0.5rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .register-subtitle {
                        color: #718096;
                        font-size: 1rem;
                        line-height: 1.6;
                    }

                    .register-form {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }

                    .form-group {
                        position: relative;
                    }

                    .input-wrapper {
                        position: relative;
                        display: flex;
                        align-items: center;
                    }

                    .input-icon {
                        position: absolute;
                        left: 1rem;
                        color: #a0aec0;
                        font-size: 1.1rem;
                        transition: all 0.3s ease;
                        z-index: 2;
                    }

                    .form-input {
                        width: 100%;
                        padding: 1rem 1rem 1rem 3rem;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        font-size: 1rem;
                        background: rgba(255, 255, 255, 0.8);
                        transition: all 0.3s ease;
                        outline: none;
                    }

                    .form-input:focus {
                        border-color: #667eea;
                        background: white;
                        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                    }

                    .form-group.focused .input-icon {
                        color: #667eea;
                    }

                    .form-group.error .form-input {
                        border-color: #e53e3e;
                        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
                    }

                    .password-toggle {
                        position: absolute;
                        right: 1rem;
                        background: none;
                        border: none;
                        color: #a0aec0;
                        cursor: pointer;
                        font-size: 1.1rem;
                        transition: color 0.3s ease;
                        z-index: 2;
                    }

                    .password-toggle:hover {
                        color: #667eea;
                    }

                    .input-line {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: linear-gradient(90deg, #667eea, #764ba2);
                        transition: width 0.3s ease;
                    }

                    .form-group.focused .input-line {
                        width: 100%;
                    }

                    .password-strength {
                        margin-top: 0.5rem;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }

                    .strength-bar {
                        flex: 1;
                        height: 4px;
                        background: #e2e8f0;
                        border-radius: 2px;
                        overflow: hidden;
                    }

                    .strength-fill {
                        height: 100%;
                        transition: all 0.3s ease;
                    }

                    .strength-text {
                        font-size: 0.8rem;
                        font-weight: 600;
                        min-width: 60px;
                    }

                    .error-message {
                        color: #e53e3e;
                        font-size: 0.875rem;
                        margin-top: 0.5rem;
                        display: block;
                    }

                    .form-options {
                        margin: 1rem 0;
                    }

                    .terms-checkbox {
                        display: flex;
                        align-items: flex-start;
                        gap: 0.5rem;
                        cursor: pointer;
                        font-size: 0.9rem;
                        color: #4a5568;
                        line-height: 1.4;
                    }

                    .terms-checkbox input[type="checkbox"] {
                        display: none;
                    }

                    .checkmark {
                        width: 18px;
                        height: 18px;
                        border: 2px solid #cbd5e0;
                        border-radius: 4px;
                        position: relative;
                        transition: all 0.3s ease;
                        flex-shrink: 0;
                        margin-top: 0.1rem;
                    }

                    .terms-checkbox input[type="checkbox"]:checked + .checkmark {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-color: #667eea;
                    }

                    .terms-checkbox input[type="checkbox"]:checked + .checkmark::after {
                        content: '✓';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 0.7rem;
                        font-weight: bold;
                    }

                    .terms-link {
                        color: #667eea;
                        text-decoration: none;
                        font-weight: 600;
                        transition: color 0.3s ease;
                    }

                    .terms-link:hover {
                        color: #764ba2;
                    }

                    .register-button {
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

                    .register-button::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                        transition: left 0.5s;
                    }

                    .register-button:hover::before {
                        left: 100%;
                    }

                    .register-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                    }

                    .register-button:disabled {
                        opacity: 0.7;
                        cursor: not-allowed;
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

                    .social-register {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 1rem;
                        margin-bottom: 2rem;
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

                    .login-link {
                        text-align: center;
                    }

                    .login-link p {
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
                        .register-card {
                            padding: 2rem 1.5rem;
                        }

                        .register-title {
                            font-size: 1.8rem;
                        }

                        .social-register {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </div>
            <Footer />
        </>
    )
}

export default Register