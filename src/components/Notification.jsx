import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCheck } from 'react-icons/fa';

const Notification = ({ message, type = 'success', isVisible, onClose }) => {
    const getIcon = () => {
        switch (type) {
            case 'wishlist':
                return <FaHeart style={{ color: '#ef4444' }} />;
            case 'success':
                return <FaCheck style={{ color: '#22c55e' }} />;
            default:
                return <FaCheck style={{ color: '#22c55e' }} />;
        }
    };

    const getBackground = () => {
        switch (type) {
            case 'wishlist':
                return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            case 'success':
                return 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            default:
                return 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        background: getBackground(),
                        color: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        zIndex: 1000,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        minWidth: '250px'
                    }}
                    initial={{ opacity: 0, x: 300, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 300, scale: 0.8 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                >
                    {getIcon()}
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
