import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt, 
    FaUser, 
    FaPaperPlane,
    FaInstagram,
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaYoutube,
    FaWhatsapp,
    FaComments,
    FaRocket,
    FaCheckCircle
} from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [activeContact, setActiveContact] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      value: "hello@fashionhub.com",
      subtitle: "We'll respond within 24 hours",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 8am to 6pm",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      value: "123 Fashion Street, NY 10001",
      subtitle: "Come say hello at our office",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const socialLinks = [
    { icon: FaInstagram, name: "Instagram", url: "#", color: "#E4405F" },
    { icon: FaTwitter, name: "Twitter", url: "#", color: "#1DA1F2" },
    { icon: FaFacebook, name: "Facebook", url: "#", color: "#1877F2" },
    { icon: FaLinkedin, name: "LinkedIn", url: "#", color: "#0A66C2" },
    { icon: FaYoutube, name: "YouTube", url: "#", color: "#FF0000" },
    { icon: FaWhatsapp, name: "WhatsApp", url: "#", color: "#25D366" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialClick = (platform) => {
    console.log(`Opening ${platform}`);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="animated-shapes">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="shape"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.2 + Math.random() * 0.3,
                  scale: 0.6 + Math.random() * 0.4
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                  ],
                  rotate: [0, 360],
                  scale: [0.7, 1.3, 0.7]
                }}
                transition={{
                  duration: 18 + Math.random() * 12,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1]
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Let's Start a <span className="gradient-text">Conversation</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              We'd love to hear from you. Whether you have a question, feedback, 
              or just want to say hello, we're here to help and excited to connect with you.
            </motion.p>
          </motion.div>
        </div>
      </section>


      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <motion.div 
                  className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your full name"
                      className="form-input"
                      required
                    />
                    <div className="input-line"></div>
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.span 
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
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
                      placeholder="Your email address"
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
                  className={`form-group ${focusedField === 'subject' ? 'focused' : ''} ${errors.subject ? 'error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="input-wrapper">
                    <FaRocket className="input-icon" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Subject of your message"
                      className="form-input"
                      required
                    />
                    <div className="input-line"></div>
                  </div>
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.span 
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.subject}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  className={`form-group ${focusedField === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="textarea-wrapper">
                    <FaComments className="input-icon" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your message here..."
                      className="form-textarea"
                      rows={6}
                      required
                    />
                    <div className="input-line"></div>
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.span 
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.button
                  type="submit"
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {isLoading ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaCheckCircle />
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-hero {
          min-height: 60vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 4rem 0;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .animated-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        .contact-info-section {
          padding: 4rem 0;
          background: white;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .contact-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-gradient);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .contact-card.active::before {
          transform: scaleX(1);
        }

        .contact-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .contact-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
        }

        .contact-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
        }

        .contact-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .contact-subtitle {
          color: #718096;
          font-size: 0.9rem;
        }

        .main-contact-section {
          padding: 5rem 0;
          background: #f8fafc;
        }

        .contact-layout {
          display: grid;
          gap: 4rem;
          align-items: start;
        }

        .contact-form-container {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #718096;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          position: relative;
        }

        .input-wrapper, .textarea-wrapper {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 21px;
          color: #a0aec0;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          outline: none;
          resize: vertical;
        }

        .form-textarea {
          min-height: 120px;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group.focused .input-icon {
          color: #667eea;
        }

        .form-group.error .form-input,
        .form-group.error .form-textarea {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
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

        .error-message {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          display: block;
        }

        .submit-btn {
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

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
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

        .success-message {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          margin-top: 2rem;
        }

        .success-message svg {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .success-message h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .contact-details {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .details-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .details-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .details-header p {
          color: #718096;
        }

        .details-content {
          margin-bottom: 3rem;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .detail-item:hover {
          background: #edf2f7;
          transform: translateX(5px);
        }

        .detail-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .detail-text h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .detail-text p {
          color: #718096;
          line-height: 1.6;
        }

        .social-section {
          text-align: center;
        }

        .social-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .social-section p {
          color: #718096;
          margin-bottom: 2rem;
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .social-btn {
          width: 60px;
          height: 60px;
          border: none;
          border-radius: 50%;
          background: white;
          color: var(--social-color);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-btn:hover {
          background: var(--social-color);
          color: white;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .map-section {
          padding: 4rem 0;
          background: white;
        }

        .map-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .map-placeholder {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .map-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .map-placeholder h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .map-placeholder p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .view-map-btn {
          background: white;
          color: #667eea;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-map-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .contact-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .contact-form-container,
          .contact-details {
            padding: 2rem;
          }

          .social-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      
      <Footer />
    </>
  );
};

export default ContactPage;
