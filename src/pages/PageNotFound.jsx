import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";
import "./PageNotFound.css";

const PageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code-section">
            <div className="error-code">
              <span className="digit" style={{ animationDelay: '0.1s' }}>4</span>
              <span className="digit" style={{ animationDelay: '0.2s' }}>0</span>
              <span className="digit" style={{ animationDelay: '0.3s' }}>4</span>
            </div>
            <div className="error-circle"></div>
          </div>
          
          <div className="error-message">
            <h1 className={`error-title ${isVisible ? 'fade-in' : ''}`}>
              Oops! Page Not Found
            </h1>
            <p className={`error-description ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>

          <div className="action-buttons">
            <Link to="/" className={`primary-button ${isVisible ? 'slide-up' : ''}`} style={{ animationDelay: '0.6s' }}>
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>
            
            <button className={`secondary-button ${isVisible ? 'slide-up' : ''}`} style={{ animationDelay: '0.7s' }} onClick={() => window.history.back()}>
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L9 6L15 12L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Go Back
            </button>
          </div>

          <div className="help-section">
            <p className="help-text">Need help? <Link to="/contact" className="help-link">Contact Support</Link></p>
          </div>
        </div>

        <div className="background-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
