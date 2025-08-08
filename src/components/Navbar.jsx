import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    FaShoppingBag, 
    FaInfoCircle, 
    FaPhone, 
    FaSignInAlt, 
    FaUserPlus, 
    FaShoppingCart, 
    FaBars, 
    FaTimes,
    FaUser,
    FaCaretDown,
    FaSignOutAlt
} from 'react-icons/fa'
import LogoutModal from './LogoutModal'
import { logoutUser, loginUser } from '../redux/action'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector(state => state.handleCart)
    const authState = useSelector(state => state.handleAuth)
    const totalQty = authState.isAuthenticated 
        ? authState.cart.reduce((acc, item) => acc + (item.qty || 1), 0)
        : authState.tempCart.reduce((acc, item) => acc + (item.qty || 1), 0);
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navItems = [
        { path: '/product', label: 'Products', icon: FaShoppingBag },
        { path: '/about', label: 'About', icon: FaInfoCircle },
        { path: '/contact', label: 'Contact', icon: FaPhone }
    ];

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('currentUser'); // Clear the current user from localStorage
        setIsLogoutModalOpen(false);
        setIsUserDropdownOpen(false);
        navigate('/');
    };

    const handleUserClick = () => {
        if (authState.isAuthenticated) {
            setIsUserDropdownOpen(!isUserDropdownOpen);
        } else {
            navigate('/login');
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserDropdownOpen]);

    // Initialize auth state from localStorage
    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser && !authState.isAuthenticated) {
            try {
                const user = JSON.parse(currentUser);
                dispatch(loginUser(user));
            } catch (error) {
                // If there's an error parsing the user data, clear it
                localStorage.removeItem('currentUser');
            }
        }
    }, [dispatch, authState.isAuthenticated]);

    return (
        <>
            <style>{`
                .premium-navbar {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    padding: 1rem 0;
                }

                .navbar-container {
                    max-width: 1700px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .navbar-layout {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                .brand-section {
                    flex: 0 0 auto;
                }

                .nav-section {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                .action-section {
                    flex: 0 0 auto;
                }

                .brand-logo {
                    font-size: 1.8rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }

                .brand-logo:hover {
                    transform: scale(1.05);
                }

                .brand-icon {
                    font-size: 2rem;
                    color: #667eea;
                }

                .nav-menu {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-item {
                    position: relative;
                }

                .nav-link {
                    color: #374151;
                    font-weight: 600;
                    font-size: 1rem;
                    padding: 0.8rem 1.2rem;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
                    transition: left 0.5s;
                }

                .nav-link:hover::before {
                    left: 100%;
                }

                .nav-link:hover {
                    background: rgba(102, 126, 234, 0.1);
                    transform: translateY(-2px);
                    color: #667eea;
                }

                .nav-link.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .nav-icon {
                    font-size: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .nav-link:hover .nav-icon {
                    transform: scale(1.1);
                }

                .action-buttons {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .btn-premium {
                    padding: 0.7rem 1.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: none;
                    cursor: pointer;
                }

                .btn-login {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .btn-login:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                    color: white;
                }

                .btn-register {
                    background: white;
                    color: #374151;
                    border: 2px solid #e5e7eb;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }

                .btn-register:hover {
                    background: #374151;
                    color: white;
                    border-color: #374151;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(55, 65, 81, 0.2);
                }

                .cart-button {
                    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                    color: white;
                    padding: 0.7rem 1.2rem;
                    border-radius: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
                }

                .cart-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
                    color: white;
                }

                .cart-count {
                    background: white;
                    color: #ff6b6b;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    font-weight: 700;
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    animation: pulse 2s infinite;
                }

                .mobile-menu-btn {
                    background: none;
                    border: none;
                    padding: 0.5rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    display: none;
                    color: #374151;
                    font-size: 1.2rem;
                }

                .mobile-menu-btn:hover {
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                }

                .mobile-menu {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    margin-top: 1rem;
                    padding: 1.5rem;
                    border: 1px solid #e5e7eb;
                }

                .mobile-nav-menu {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .mobile-action-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    margin-top: 1rem;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                @media (max-width: 991px) {
                    .navbar-layout {
                        justify-content: space-between;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .nav-section {
                        display: none;
                    }
                    
                    .action-section {
                        display: none;
                    }
                }

                @media (max-width: 768px) {
                    .navbar-container {
                        padding: 0 1rem;
                    }
                    
                    .brand-logo {
                        font-size: 1.5rem;
                    }
                    
                    .brand-icon {
                        font-size: 1.5rem;
                    }
                }

                .user-dropdown-container {
                    position: relative;
                }

                .btn-user {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .btn-user:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                .user-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 0.5rem;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    z-index: 1000;
                    min-width: 150px;
                }

                .dropdown-item {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: none;
                    border: none;
                    color: #4a5568;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }

                .dropdown-item:hover {
                    background: #f7fafc;
                    color: #667eea;
                }

                .mobile-user-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }

                .mobile-user-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    background: rgba(102, 126, 234, 0.1);
                    border-radius: 12px;
                    color: #667eea;
                    font-weight: 600;
                }

                .btn-logout {
                    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .btn-logout:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(238, 90, 82, 0.4);
                }
            `}</style>

            <nav className="premium-navbar">
                <div className="navbar-container">
                    <div className="navbar-layout">
                        <motion.div
                            className="brand-section"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink className="brand-logo" to="/">
                                <FaShoppingBag className="brand-icon" />
                                FashionHub
                            </NavLink>
                        </motion.div>

                        <div className="nav-section d-none d-lg-flex">
                            <ul className="nav-menu">
                                {navItems.map((item, index) => (
                                    <motion.li 
                                        key={item.path}
                                        className="nav-item"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLink 
                                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                            to={item.path}
                                        >
                                            <item.icon className="nav-icon" />
                                            {item.label}
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="action-section d-none d-lg-flex">
                            <div className="action-buttons">
                                {!authState.isAuthenticated ? (
                                    <>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <NavLink to="/login" className="btn-premium btn-login">
                                                <FaSignInAlt />
                                                Login
                                            </NavLink>
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <NavLink to="/register" className="btn-premium btn-register">
                                                <FaUserPlus />
                                                Register
                                            </NavLink>
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div
                                        className="user-dropdown-container"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <button 
                                            className="btn-premium btn-user"
                                            onClick={handleUserClick}
                                        >
                                            <FaUser />
                                            {authState.user?.fullName || authState.user?.email}
                                            <FaCaretDown />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {isUserDropdownOpen && (
                                                <motion.div 
                                                    className="user-dropdown"
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <button 
                                                        className="dropdown-item"
                                                        onClick={() => setIsLogoutModalOpen(true)}
                                                    >
                                                        <FaSignOutAlt />
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="position-relative"
                                >
                                    <NavLink to="/cart" className="cart-button">
                                        <FaShoppingCart />
                                        Cart
                                        {totalQty > 0 && (
                                            <motion.div 
                                                className="cart-count"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            >
                                                {totalQty}
                                            </motion.div>
                                        )}
                                    </NavLink>
                                </motion.div>
                            </div>
                        </div>

                        <button 
                            className="mobile-menu-btn d-lg-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div 
                                className="mobile-menu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ul className="mobile-nav-menu">
                                    {navItems.map((item, index) => (
                                        <motion.li 
                                            key={item.path}
                                            className="nav-item"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <NavLink 
                                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                                to={item.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <item.icon className="nav-icon" />
                                                {item.label}
                                            </NavLink>
                                        </motion.li>
                                    ))}
                                </ul>
                                
                                <div className="mobile-action-buttons">
                                    {!authState.isAuthenticated ? (
                                        <>
                                            <NavLink to="/login" className="btn-premium btn-login">
                                                <FaSignInAlt />
                                                Login
                                            </NavLink>
                                            <NavLink to="/register" className="btn-premium btn-register">
                                                <FaUserPlus />
                                                Register
                                            </NavLink>
                                        </>
                                    ) : (
                                        <div className="mobile-user-section">
                                            <div className="mobile-user-info">
                                                <FaUser />
                                                <span>{authState.user?.fullName || authState.user?.email}</span>
                                            </div>
                                            <button 
                                                className="btn-premium btn-logout"
                                                onClick={() => setIsLogoutModalOpen(true)}
                                            >
                                                <FaSignOutAlt />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                    <NavLink to="/cart" className="cart-button">
                                        <FaShoppingCart />
                                        Cart ({totalQty})
                                    </NavLink>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            <LogoutModal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </>
    )
}

export default Navbar