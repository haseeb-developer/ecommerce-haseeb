import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
    FaShieldAlt, 
    FaUserShield, 
    FaLock, 
    FaEye, 
    FaEyeSlash,
    FaDatabase,
    FaCookieBite,
    FaExclamationTriangle,
    FaCheckCircle,
    FaArrowLeft,
    FaFileAlt
} from 'react-icons/fa';

const Privacy = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navbar />
            <div className="privacy-container">
                <div className="privacy-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
                
                <div className="privacy-content">
                    <motion.div 
                        className="privacy-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="privacy-header">
                            <motion.div 
                                className="back-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/register" className="back-link">
                                    <FaArrowLeft />
                                    <span>Back to Registration</span>
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                className="privacy-icon"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                            >
                                <FaShieldAlt />
                            </motion.div>
                            
                            <motion.h1 
                                className="privacy-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Privacy Policy
                            </motion.h1>
                            
                            <motion.p 
                                className="privacy-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                Last updated: {new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </motion.p>
                        </div>

                        <div className="privacy-navigation">
                            <motion.div 
                                className="privacy-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('information-collection')}
                            >
                                <FaDatabase />
                                <span>Data Collection</span>
                            </motion.div>
                            <motion.div 
                                className="privacy-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('data-usage')}
                            >
                                <FaEye />
                                <span>Data Usage</span>
                            </motion.div>
                            <motion.div 
                                className="privacy-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('data-protection')}
                            >
                                <FaLock />
                                <span>Data Protection</span>
                            </motion.div>
                            <motion.div 
                                className="privacy-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('cookies')}
                            >
                                <FaCookieBite />
                                <span>Cookies</span>
                            </motion.div>
                            <motion.div 
                                className="privacy-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('your-rights')}
                            >
                                <FaUserShield />
                                <span>Your Rights</span>
                            </motion.div>
                        </div>

                        <div className="privacy-body">
                            <motion.section 
                                id="information-collection"
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <h2>1. Information We Collect</h2>
                                <p>
                                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                                </p>
                                
                                <h3>Personal Information</h3>
                                <ul>
                                    <li><strong>Account Information:</strong> Name, email address, phone number</li>
                                    <li><strong>Payment Information:</strong> Credit card details, billing address</li>
                                    <li><strong>Profile Information:</strong> Shipping addresses, preferences</li>
                                    <li><strong>Communication Data:</strong> Messages, feedback, support requests</li>
                                </ul>

                                <h3>Automatically Collected Information</h3>
                                <ul>
                                    <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                                    <li><strong>Usage Data:</strong> Pages visited, time spent, interactions</li>
                                    <li><strong>Location Data:</strong> General location based on IP address</li>
                                    <li><strong>Cookies:</strong> Small data files stored on your device</li>
                                </ul>
                            </motion.section>

                            <motion.section 
                                id="data-usage"
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <h2>2. How We Use Your Information</h2>
                                <p>
                                    We use the information we collect to provide, maintain, and improve our services:
                                </p>
                                
                                <div className="usage-grid">
                                    <div className="usage-item">
                                        <FaCheckCircle className="usage-icon" />
                                        <h4>Service Provision</h4>
                                        <p>Process orders, manage accounts, provide customer support</p>
                                    </div>
                                    <div className="usage-item">
                                        <FaCheckCircle className="usage-icon" />
                                        <h4>Communication</h4>
                                        <p>Send order updates, promotional offers, important notices</p>
                                    </div>
                                    <div className="usage-item">
                                        <FaCheckCircle className="usage-icon" />
                                        <h4>Security</h4>
                                        <p>Prevent fraud, protect against unauthorized access</p>
                                    </div>
                                    <div className="usage-item">
                                        <FaCheckCircle className="usage-icon" />
                                        <h4>Improvement</h4>
                                        <p>Analyze usage patterns, enhance user experience</p>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section 
                                id="data-protection"
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <h2>3. Data Protection & Security</h2>
                                <p>
                                    We implement industry-standard security measures to protect your personal information:
                                </p>
                                
                                <div className="security-features">
                                    <div className="security-item">
                                        <FaLock className="security-icon" />
                                        <div>
                                            <h4>Encryption</h4>
                                            <p>All data is encrypted using SSL/TLS protocols</p>
                                        </div>
                                    </div>
                                    <div className="security-item">
                                        <FaShieldAlt className="security-icon" />
                                        <div>
                                            <h4>Secure Storage</h4>
                                            <p>Data stored in secure, monitored facilities</p>
                                        </div>
                                    </div>
                                    <div className="security-item">
                                        <FaUserShield className="security-icon" />
                                        <div>
                                            <h4>Access Control</h4>
                                            <p>Limited access to personal data on need-to-know basis</p>
                                        </div>
                                    </div>
                                    <div className="security-item">
                                        <FaExclamationTriangle className="security-icon" />
                                        <div>
                                            <h4>Breach Response</h4>
                                            <p>Immediate notification if security breach occurs</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section 
                                id="cookies"
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <h2>4. Cookies and Tracking Technologies</h2>
                                <p>
                                    We use cookies and similar technologies to enhance your browsing experience:
                                </p>
                                
                                <div className="cookie-types">
                                    <div className="cookie-type">
                                        <h4>Essential Cookies</h4>
                                        <p>Required for basic site functionality and security</p>
                                    </div>
                                    <div className="cookie-type">
                                        <h4>Performance Cookies</h4>
                                        <p>Help us understand how visitors interact with our site</p>
                                    </div>
                                    <div className="cookie-type">
                                        <h4>Functional Cookies</h4>
                                        <p>Remember your preferences and settings</p>
                                    </div>
                                    <div className="cookie-type">
                                        <h4>Marketing Cookies</h4>
                                        <p>Used to deliver relevant advertisements</p>
                                    </div>
                                </div>
                                
                                <p>
                                    You can control cookie settings through your browser preferences. However, disabling certain cookies may affect site functionality.
                                </p>
                            </motion.section>

                            <motion.section 
                                id="your-rights"
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                            >
                                <h2>5. Your Privacy Rights</h2>
                                <p>
                                    You have the following rights regarding your personal information:
                                </p>
                                
                                <div className="rights-list">
                                    <div className="right-item">
                                        <FaCheckCircle className="right-icon" />
                                        <div>
                                            <h4>Access</h4>
                                            <p>Request a copy of your personal data</p>
                                        </div>
                                    </div>
                                    <div className="right-item">
                                        <FaCheckCircle className="right-icon" />
                                        <div>
                                            <h4>Correction</h4>
                                            <p>Update or correct inaccurate information</p>
                                        </div>
                                    </div>
                                    <div className="right-item">
                                        <FaCheckCircle className="right-icon" />
                                        <div>
                                            <h4>Deletion</h4>
                                            <p>Request deletion of your personal data</p>
                                        </div>
                                    </div>
                                    <div className="right-item">
                                        <FaCheckCircle className="right-icon" />
                                        <div>
                                            <h4>Portability</h4>
                                            <p>Receive your data in a portable format</p>
                                        </div>
                                    </div>
                                    <div className="right-item">
                                        <FaCheckCircle className="right-icon" />
                                        <div>
                                            <h4>Objection</h4>
                                            <p>Object to processing of your data</p>
                                        </div>
                                    </div>
                                    <div className="right-item">
                                        <FaCheckCircle className="right-icon" />
                                        <div>
                                            <h4>Withdrawal</h4>
                                            <p>Withdraw consent for data processing</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section 
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                            >
                                <h2>6. Data Sharing and Third Parties</h2>
                                <p>
                                    We do not sell your personal information. We may share data with:
                                </p>
                                <ul>
                                    <li><strong>Service Providers:</strong> Payment processors, shipping partners, analytics services</li>
                                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                    <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                                    <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                                </ul>
                            </motion.section>

                            <motion.section 
                                className="privacy-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                            >
                                <h2>7. Contact Us</h2>
                                <p>
                                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                                </p>
                                <div className="contact-info">
                                    <p><strong>Email:</strong> privacy@fashionhub.com</p>
                                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                    <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                                    <p><strong>Data Protection Officer:</strong> dpo@fashionhub.com</p>
                                </div>
                            </motion.section>
                        </div>

                        <motion.div 
                            className="privacy-footer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                        >
                            <Link to="/terms" className="terms-link">
                                <FaFileAlt />
                                <span>Terms of Service</span>
                            </Link>
                            <Link to="/register" className="register-link">
                                <FaCheckCircle />
                                <span>Back to Registration</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <style jsx>{`
                    .privacy-container {
                        min-height: 100vh;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        position: relative;
                        overflow: hidden;
                        padding: 2rem 1rem;
                    }

                    .privacy-background {
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

                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-25px) rotate(180deg); }
                    }

                    .privacy-content {
                        position: relative;
                        z-index: 2;
                        width: 100%;
                        max-width: 1000px;
                        margin: 0 auto;
                    }

                    .privacy-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        border-radius: 24px;
                        padding: 3rem 2.5rem;
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        position: relative;
                        overflow: hidden;
                    }

                    .privacy-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                        border-radius: 24px 24px 0 0;
                    }

                    .privacy-header {
                        text-align: center;
                        margin-bottom: 2.5rem;
                        position: relative;
                    }

                    .back-button {
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    .back-link {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: #667eea;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 0.9rem;
                        transition: color 0.3s ease;
                    }

                    .back-link:hover {
                        color: #764ba2;
                    }

                    .privacy-icon {
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

                    .privacy-title {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #1a202c;
                        margin-bottom: 0.5rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .privacy-subtitle {
                        color: #718096;
                        font-size: 1rem;
                        line-height: 1.6;
                    }

                    .privacy-navigation {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        margin-bottom: 3rem;
                        flex-wrap: wrap;
                    }

                    .privacy-item {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.75rem 1.5rem;
                        background: rgba(255, 255, 255, 0.8);
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 0.9rem;
                        font-weight: 600;
                        color: #4a5568;
                    }

                    .privacy-item:hover {
                        background: white;
                        border-color: #667eea;
                        color: #667eea;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
                    }

                    .privacy-body {
                        max-width: 800px;
                        margin: 0 auto;
                    }

                    .privacy-section {
                        margin-bottom: 2.5rem;
                        padding: 2rem;
                        background: rgba(255, 255, 255, 0.5);
                        border-radius: 16px;
                        border: 1px solid #e2e8f0;
                    }

                    .privacy-section h2 {
                        color: #1a202c;
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .privacy-section h3 {
                        color: #2d3748;
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin: 1.5rem 0 0.5rem 0;
                    }

                    .privacy-section h4 {
                        color: #2d3748;
                        font-size: 1rem;
                        font-weight: 600;
                        margin: 1rem 0 0.5rem 0;
                    }

                    .privacy-section p {
                        color: #4a5568;
                        line-height: 1.7;
                        margin-bottom: 1rem;
                        font-size: 1rem;
                    }

                    .privacy-section ul {
                        margin: 1rem 0;
                        padding-left: 1.5rem;
                    }

                    .privacy-section li {
                        color: #4a5568;
                        line-height: 1.6;
                        margin-bottom: 0.5rem;
                    }

                    .usage-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 1.5rem;
                        margin: 1.5rem 0;
                    }

                    .usage-item {
                        background: rgba(255, 255, 255, 0.8);
                        padding: 1.5rem;
                        border-radius: 12px;
                        border: 1px solid #e2e8f0;
                        text-align: center;
                    }

                    .usage-icon {
                        color: #38a169;
                        font-size: 2rem;
                        margin-bottom: 1rem;
                    }

                    .usage-item h4 {
                        color: #2d3748;
                        margin-bottom: 0.5rem;
                    }

                    .usage-item p {
                        color: #718096;
                        font-size: 0.9rem;
                        margin: 0;
                    }

                    .security-features {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 1.5rem;
                        margin: 1.5rem 0;
                    }

                    .security-item {
                        display: flex;
                        align-items: flex-start;
                        gap: 1rem;
                        background: rgba(255, 255, 255, 0.8);
                        padding: 1.5rem;
                        border-radius: 12px;
                        border: 1px solid #e2e8f0;
                    }

                    .security-icon {
                        color: #667eea;
                        font-size: 1.5rem;
                        margin-top: 0.25rem;
                    }

                    .security-item h4 {
                        color: #2d3748;
                        margin-bottom: 0.5rem;
                    }

                    .security-item p {
                        color: #718096;
                        font-size: 0.9rem;
                        margin: 0;
                    }

                    .cookie-types {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem;
                        margin: 1.5rem 0;
                    }

                    .cookie-type {
                        background: rgba(255, 255, 255, 0.8);
                        padding: 1.5rem;
                        border-radius: 12px;
                        border: 1px solid #e2e8f0;
                        text-align: center;
                    }

                    .cookie-type h4 {
                        color: #2d3748;
                        margin-bottom: 0.5rem;
                    }

                    .cookie-type p {
                        color: #718096;
                        font-size: 0.9rem;
                        margin: 0;
                    }

                    .rights-list {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 1rem;
                        margin: 1.5rem 0;
                    }

                    .right-item {
                        display: flex;
                        align-items: flex-start;
                        gap: 1rem;
                        background: rgba(255, 255, 255, 0.8);
                        padding: 1.5rem;
                        border-radius: 12px;
                        border: 1px solid #e2e8f0;
                    }

                    .right-icon {
                        color: #38a169;
                        font-size: 1.5rem;
                        margin-top: 0.25rem;
                    }

                    .right-item h4 {
                        color: #2d3748;
                        margin-bottom: 0.5rem;
                    }

                    .right-item p {
                        color: #718096;
                        font-size: 0.9rem;
                        margin: 0;
                    }

                    .contact-info {
                        background: rgba(102, 126, 234, 0.1);
                        padding: 1.5rem;
                        border-radius: 12px;
                        border-left: 4px solid #667eea;
                    }

                    .contact-info p {
                        margin-bottom: 0.5rem;
                    }

                    .privacy-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 3rem;
                        padding-top: 2rem;
                        border-top: 1px solid #e2e8f0;
                    }

                    .terms-link, .register-link {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.75rem 1.5rem;
                        border-radius: 12px;
                        text-decoration: none;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }

                    .terms-link {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }

                    .terms-link:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                    }

                    .register-link {
                        background: white;
                        color: #667eea;
                        border: 2px solid #667eea;
                    }

                    .register-link:hover {
                        background: #667eea;
                        color: white;
                        transform: translateY(-2px);
                    }

                    @media (max-width: 768px) {
                        .privacy-card {
                            padding: 2rem 1.5rem;
                        }

                        .privacy-title {
                            font-size: 2rem;
                        }

                        .privacy-navigation {
                            flex-direction: column;
                            align-items: center;
                        }

                        .privacy-item {
                            width: 100%;
                            justify-content: center;
                        }

                        .usage-grid, .security-features, .cookie-types, .rights-list {
                            grid-template-columns: 1fr;
                        }

                        .privacy-footer {
                            flex-direction: column;
                            gap: 1rem;
                        }

                        .back-button {
                            position: relative;
                            margin-bottom: 1rem;
                        }
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
};

export default Privacy;
