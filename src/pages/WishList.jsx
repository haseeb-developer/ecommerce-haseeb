import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { removeFromWishlist, addToCart } from '../redux/action';
import ProductCard from '../components/ProductCard';

const WishList = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.handleAuth);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const wishlistItems = authState.isAuthenticated ? authState.wishlist : authState.tempWishlist;

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist(productId));
        showNotificationMessage('Item removed from wishlist');
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        showNotificationMessage('Item added to cart');
    };

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <>
            <style>{`
                .wishlist-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    padding: 2rem 0;
                }

                .wishlist-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .wishlist-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .wishlist-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #374151;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }

                .wishlist-subtitle {
                    font-size: 1.1rem;
                    color: #6b7280;
                    margin-bottom: 2rem;
                }

                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 12px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    margin-bottom: 2rem;
                }

                .back-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                    color: white;
                }

                .wishlist-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .empty-wishlist {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .empty-icon {
                    font-size: 4rem;
                    color: #e5e7eb;
                    margin-bottom: 1rem;
                }

                .empty-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 1rem;
                }

                .empty-text {
                    color: #6b7280;
                    margin-bottom: 2rem;
                }

                .browse-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 12px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .browse-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                    color: white;
                }

                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
                    z-index: 1000;
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .wishlist-content {
                        padding: 0 1rem;
                    }

                    .wishlist-title {
                        font-size: 2rem;
                    }

                    .wishlist-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                }
            `}</style>

            <div className="wishlist-container">
                <div className="wishlist-content">
                    <Link to="/" className="back-button">
                        <FaArrowLeft />
                        Back to Home
                    </Link>

                    <div className="wishlist-header">
                        <h1 className="wishlist-title">
                            <FaHeart style={{ color: '#ef4444' }} />
                            My Wishlist
                        </h1>
                        <p className="wishlist-subtitle">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                        </p>
                    </div>

                    {wishlistItems.length === 0 ? (
                        <motion.div 
                            className="empty-wishlist"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="empty-icon">
                                <FaHeart />
                            </div>
                            <h2 className="empty-title">Your wishlist is empty</h2>
                            <p className="empty-text">
                                Start adding products to your wishlist to see them here
                            </p>
                            <Link to="/product" className="browse-button">
                                Browse Products
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="wishlist-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnimatePresence>
                                {wishlistItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <ProductCard
                                            image={item.image}
                                            name={item.name}
                                            price={item.price}
                                            productId={item.id}
                                            inStock={item.inStock !== false}
                                            onAddToCart={() => handleAddToCart(item)}
                                            showZoom={false}
                                        />
                                        <div style={{ 
                                            display: 'flex', 
                                            gap: '1rem', 
                                            marginTop: '1rem',
                                            justifyContent: 'center'
                                        }}>
                                            <motion.button
                                                onClick={() => handleAddToCart(item)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaShoppingCart />
                                                Add to Cart
                                            </motion.button>
                                            <motion.button
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaTrash />
                                                Remove
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        className="notification"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ duration: 0.3 }}
                    >
                        {notificationMessage}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WishList;
