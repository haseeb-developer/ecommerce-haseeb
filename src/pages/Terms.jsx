import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
    FaShieldAlt, 
    FaUserShield, 
    FaLock, 
    FaHandshake, 
    FaGavel,
    FaFileContract,
    FaExclamationTriangle,
    FaCheckCircle,
    FaArrowLeft
} from 'react-icons/fa';

const Terms = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navbar />
            <div className="terms-container">
                <div className="terms-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
                
                <div className="terms-content">
                    <motion.div 
                        className="terms-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="terms-header">
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
                                className="terms-icon"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                            >
                                <FaFileContract />
                            </motion.div>
                            
                            <motion.h1 
                                className="terms-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Terms of Service
                            </motion.h1>
                            
                            <motion.p 
                                className="terms-subtitle"
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

                        <div className="terms-navigation">
                            <motion.div 
                                className="terms-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('acceptance')}
                            >
                                <FaCheckCircle />
                                <span>Acceptance</span>
                            </motion.div>
                            <motion.div 
                                className="terms-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('services')}
                            >
                                <FaHandshake />
                                <span>Services</span>
                            </motion.div>
                            <motion.div 
                                className="terms-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('user-accounts')}
                            >
                                <FaUserShield />
                                <span>User Accounts</span>
                            </motion.div>
                            <motion.div 
                                className="terms-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('intellectual-property')}
                            >
                                <FaShieldAlt />
                                <span>Intellectual Property</span>
                            </motion.div>
                            <motion.div 
                                className="terms-item"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToSection('limitations')}
                            >
                                <FaExclamationTriangle />
                                <span>Limitations</span>
                            </motion.div>
                        </div>

                        <div className="terms-body">
                            <motion.section 
                                id="acceptance"
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <h2>1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using FashionHub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                                <p>
                                    We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through a notice on our website. Your continued use of the Service after such modifications constitutes your acceptance of the updated terms.
                                </p>
                            </motion.section>

                            <motion.section 
                                id="services"
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <h2>2. Description of Services</h2>
                                <p>
                                    FashionHub provides an e-commerce platform for fashion and lifestyle products. Our services include:
                                </p>
                                <ul>
                                    <li>Online shopping for fashion items</li>
                                    <li>User account management</li>
                                    <li>Secure payment processing</li>
                                    <li>Customer support services</li>
                                    <li>Product reviews and ratings</li>
                                    <li>Order tracking and management</li>
                                </ul>
                                <p>
                                    We strive to provide accurate product information and maintain high-quality customer service standards.
                                </p>
                            </motion.section>

                            <motion.section 
                                id="user-accounts"
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <h2>3. User Accounts and Registration</h2>
                                <p>
                                    To access certain features of our Service, you must create an account. You agree to:
                                </p>
                                <ul>
                                    <li>Provide accurate, current, and complete information during registration</li>
                                    <li>Maintain and promptly update your account information</li>
                                    <li>Maintain the security of your password and account</li>
                                    <li>Accept responsibility for all activities under your account</li>
                                    <li>Notify us immediately of any unauthorized use of your account</li>
                                </ul>
                                <p>
                                    We reserve the right to terminate accounts that violate these terms or engage in fraudulent activities.
                                </p>
                            </motion.section>

                            <motion.section 
                                id="intellectual-property"
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <h2>4. Intellectual Property Rights</h2>
                                <p>
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of FashionHub and its licensors. The Service is protected by copyright, trademark, and other laws.
                                </p>
                                <p>
                                    Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                                </p>
                            </motion.section>

                            <motion.section 
                                id="limitations"
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                            >
                                <h2>5. Limitations of Liability</h2>
                                <p>
                                    In no event shall FashionHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                                </p>
                                <ul>
                                    <li>Your use or inability to use the Service</li>
                                    <li>Any unauthorized access to or use of our servers</li>
                                    <li>Any interruption or cessation of transmission to or from the Service</li>
                                    <li>Any bugs, viruses, or other harmful code that may be transmitted</li>
                                </ul>
                            </motion.section>

                            <motion.section 
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                            >
                                <h2>6. Governing Law</h2>
                                <p>
                                    These Terms shall be interpreted and governed by the laws of the jurisdiction in which FashionHub operates, without regard to its conflict of law provisions.
                                </p>
                            </motion.section>

                            <motion.section 
                                className="terms-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                            >
                                <h2>7. Contact Information</h2>
                                <p>
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <div className="contact-info">
                                    <p><strong>Email:</strong> haseeb@fashionhub.com</p>
                                    <p><strong>Phone:</strong> +1 (123) 123-4567</p>
                                    <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                                </div>
                            </motion.section>
                        </div>

                        <motion.div 
                            className="terms-footer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                        >
                            <Link to="/privacy" className="privacy-link">
                                <FaLock />
                                <span>Privacy Policy</span>
                            </Link>
                            <Link to="/register" className="register-link">
                                <FaCheckCircle />
                                <span>Back to Registration</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <style jsx>{`
                    .terms-container {
                        min-height: 100vh;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        position: relative;
                        overflow: hidden;
                        padding: 2rem 1rem;
                    }

                    .terms-background {
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

                    .terms-content {
                        position: relative;
                        z-index: 2;
                        width: 100%;
                        max-width: 1000px;
                        margin: 0 auto;
                    }

                    .terms-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        border-radius: 24px;
                        padding: 3rem 2.5rem;
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        position: relative;
                        overflow: hidden;
                    }

                    .terms-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                        border-radius: 24px 24px 0 0;
                    }

                    .terms-header {
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

                    .terms-icon {
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

                    .terms-title {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #1a202c;
                        margin-bottom: 0.5rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .terms-subtitle {
                        color: #718096;
                        font-size: 1rem;
                        line-height: 1.6;
                    }

                    .terms-navigation {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        margin-bottom: 3rem;
                        flex-wrap: wrap;
                    }

                    .terms-item {
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

                    .terms-item:hover {
                        background: white;
                        border-color: #667eea;
                        color: #667eea;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
                    }

                    .terms-body {
                        max-width: 860px;
                        margin: 0 auto;
                    }

                    .terms-section {
                        margin-bottom: 2.5rem;
                        padding: 2rem;
                        background: rgba(255, 255, 255, 0.5);
                        border-radius: 16px;
                        border: 1px solid #e2e8f0;
                    }

                    .terms-section h2 {
                        color: #1a202c;
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .terms-section p {
                        color: #4a5568;
                        line-height: 1.7;
                        margin-bottom: 1rem;
                        font-size: 1rem;
                    }

                    .terms-section ul {
                        margin: 1rem 0;
                        padding-left: 1.5rem;
                    }

                    .terms-section li {
                        color: #4a5568;
                        line-height: 1.6;
                        margin-bottom: 0.5rem;
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

                    .terms-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 3rem;
                        padding-top: 2rem;
                        border-top: 1px solid #e2e8f0;
                    }

                    .privacy-link, .register-link {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.75rem 1.5rem;
                        border-radius: 12px;
                        text-decoration: none;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }

                    .privacy-link {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }

                    .privacy-link:hover {
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
                        .terms-card {
                            padding: 2rem 1.5rem;
                        }

                        .terms-title {
                            font-size: 2rem;
                        }

                        .terms-navigation {
                            flex-direction: column;
                            align-items: center;
                        }

                        .terms-item {
                            width: 100%;
                            justify-content: center;
                        }

                        .terms-footer {
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

export default Terms;
