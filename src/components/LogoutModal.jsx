import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="logout-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="logout-modal"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-icon">
              <FaExclamationTriangle />
            </div>
            <button className="close-button" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout? Your cart items will be cleared.</p>
          </div>

          <div className="modal-actions">
            <motion.button
              className="cancel-button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              No, Stay Logged In
            </motion.button>
            <motion.button
              className="confirm-button"
              onClick={onConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt />
              Yes, Logout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .logout-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 1rem;
        }

        .logout-modal {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .modal-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }

        .close-button {
          background: none;
          border: none;
          color: #a0aec0;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: #f7fafc;
          color: #4a5568;
        }

        .modal-content {
          text-align: center;
          margin-bottom: 2rem;
        }

        .modal-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
        }

        .modal-content p {
          color: #718096;
          line-height: 1.6;
          font-size: 1rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .cancel-button, .confirm-button {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cancel-button {
          background: #f7fafc;
          color: #4a5568;
          border: 2px solid #e2e8f0;
        }

        .cancel-button:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
        }

        .confirm-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
        }

        .confirm-button:hover {
          box-shadow: 0 8px 25px rgba(238, 90, 82, 0.4);
        }

        @media (max-width: 480px) {
          .logout-modal {
            padding: 1.5rem;
            margin: 1rem;
          }

          .modal-actions {
            flex-direction: column;
          }

          .cancel-button, .confirm-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default LogoutModal; 