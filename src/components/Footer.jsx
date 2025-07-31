import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
    FaGithub, 
    FaLinkedin, 
    FaTwitter, 
    FaInstagram, 
    FaHeart,
    FaCode,
    FaRocket,
    FaStar,
    FaArrowUp,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';
import { AnimatePresence } from "framer-motion";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">

        <div className="footer-content">
          <div className="container">
            <motion.div 
              className="developer-credits"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="credits-content">
                <div className="credits-text">
                  <motion.div 
                    className="developer-info"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <FaCode className="code-icon" />
                    <span className="developer-text">
                      Developed and coded by{" "}
                      <span className="developer-name">Haseeb Khan</span>
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    className="developer-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <motion.a 
                      href="https://github.com/haseeb-developer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="developer-link github"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </motion.a>
                    
                    <motion.a 
                      href="https://haseebkn.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="developer-link portfolio"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaStar />
                      <span>Portfolio</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>


          </div>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>

      <style jsx>{`
        .footer {
          position: relative;
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%);
          color: white;
          overflow: hidden;
        }


        .footer-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .footer-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }

        .footer-content {
          position: relative;
          z-index: 2;
        }

        .footer-main {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .logo-icon {
          color: #667eea;
          font-size: 2rem;
        }

        .brand-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-description {
          color: #a0aec0;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .footer-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: white;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links li a {
          color: #a0aec0;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-links li a:hover {
          color: #667eea;
          transform: translateX(5px);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #a0aec0;
          font-size: 0.95rem;
        }

        .contact-icon {
          color: #667eea;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .developer-credits {
          margin: 2rem 0;
        }

        .credits-content {
          text-align: center;
        }

        .credits-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .developer-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          color: #a0aec0;
        }

        .code-icon {
          color: #667eea;
          font-size: 1.3rem;
        }

        .heart-icon {
          color: #e53e3e;
          font-size: 1rem;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .developer-name {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .developer-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .developer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .developer-link.github {
          background: linear-gradient(135deg, #333 0%, #24292e 100%);
        }

        .developer-link.portfolio {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .developer-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .copyright-section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
        }

        .copyright-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright-content p {
          color: #a0aec0;
          font-size: 0.9rem;
        }

        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }

        .footer-bottom-links a {
          color: #a0aec0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #667eea;
        }

        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .scroll-to-top:hover {
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .credits-text {
            gap: 1rem;
          }

          .developer-info {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .developer-links {
            flex-direction: column;
            align-items: center;
          }

          .copyright-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
          }

          .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            padding: 3rem 0 1.5rem;
          }

          .developer-links {
            gap: 1rem;
          }

          .developer-link {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
