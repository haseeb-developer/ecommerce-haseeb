import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../redux/action";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Cart.css";

const minusIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="5" y="9.25" width="10" height="1.5" rx="0.75" fill="#2563eb"/></svg>
);
const plusIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="9.25" y="5" width="1.5" height="10" rx="0.75" fill="#2563eb"/><rect x="5" y="9.25" width="10" height="1.5" rx="0.75" fill="#2563eb"/></svg>
);
const crossIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#e0e7ef"/><path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
);

const redCrossIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#fee2e2"/><path d="M6 6l6 6M12 6l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
);

const greenCheckIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#d1fae5"/><path d="M5 9.5l3 3 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const Cart = () => {
  const authState = useSelector((state) => state.handleAuth);
  const dispatch = useDispatch();
  
  // Use authenticated cart or temp cart based on login status
  const state = authState.isAuthenticated ? authState.cart : authState.tempCart;

  const EmptyCart = () => {
    return (
      <div className="empty-cart-container">
        <motion.div 
          className="empty-cart-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Cart Icon */}
          <motion.div 
            className="cart-icon-container"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "backOut",
              delay: 0.2
            }}
          >
            <motion.div 
              className="cart-icon"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0]
              }}
              transition={{ duration: 0.3 }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
                <motion.path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="empty-cart-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Your Cart is
            </motion.span>
            <motion.span
              className="empty-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {" "}Empty
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="empty-cart-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Looks like you haven't added anything to your cart yet.
            <br />
            Start shopping to discover amazing products!
          </motion.p>

          {/* Button */}
          <motion.div
            className="button-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <Link to="/" className="continue-shopping-btn">
              <motion.div
                className="btn-content"
                whileHover={{ 
                  scale: 1.02,
                  x: 3
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg 
                  className="arrow-icon"
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24"
                  fill="none"
                  initial={{ x: 0 }}
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path 
                    d="M19 12H5M12 19l-7-7 7-7" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <span>Continue Shopping</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="feature-cards"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <motion.div 
              className="feature-card"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)"
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)"
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7L10 17L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                </svg>
          </div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)"
              }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
        </div>
              <h3>Fast Delivery</h3>
              <p>Same day processing</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  };
 
  const addItem = (product) => {
    dispatch(updateCartQuantity(product.id, (product.qty || 1) + 1));
  };
  
  const removeItem = (product) => {
    if (product.qty > 1) {
      dispatch(updateCartQuantity(product.id, product.qty - 1));
    } else {
      dispatch(removeFromCart(product));
    }
  };

  const removeProduct = (product) => {
    dispatch(removeFromCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.row}>
            <div style={styles.leftCol}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>Item List</div>
                <div style={styles.cardBody}>
                  {state.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <div style={styles.itemRow}>
                        <motion.div
                          style={styles.imageBox}
                          whileHover={{ scale: 1.06, boxShadow: "0 4px 24px rgba(37,99,235,0.10)" }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              ...styles.image,
                              maxWidth: 90,
                              maxHeight: 70,
                              width: '100%',
                              height: 'auto',
                              objectFit: 'contain',
                              margin: '0 auto',
                              display: 'block',
                            }}
                          />
                        </motion.div>
                        <div style={styles.itemInfo}>
                          <div style={styles.itemTitle}>{item.title}</div>
                        </div>
                        <div style={styles.qtyCol}>
                          <div style={{ width: 180, minWidth: 180, maxWidth: 180, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <div style={{
                              ...styles.qtyBox,
                              width: '100%',
                              minWidth: 0,
                              maxWidth: '100%',
                              boxSizing: 'border-box',
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}>
                              <motion.button
                                style={styles.qtyBtn}
                                whileTap={{ scale: 0.92 }}
                                onClick={() => removeItem(item)}
                              >
                                {minusIcon}
                              </motion.button>
                              <span style={styles.qtyNum}>{item.qty}</span>
                              <motion.button
                                style={styles.qtyBtn}
                                whileTap={{ scale: 0.92 }}
                                onClick={() => addItem(item)}
                              >
                                {plusIcon}
                              </motion.button>
                              <motion.button
                                style={{
                                  border: '1.5px solid #ef4444',
                                  background: '#fff',
                                  color: '#ef4444',
                                  borderRadius: '0.6rem',
                                  padding: '0.35rem 0.6rem',
                                  marginLeft: 8,
                                  cursor: 'pointer',
                                  outline: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  transition: 'background 0.2s, border 0.2s',
                                }}
                                whileHover={{ scale: 1.12, background: '#fee2e2' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeProduct(item)}
                                title="Remove item"
                              >
                                <i className="fa fa-trash" style={{ fontSize: 18, color: '#ef4444' }}></i>
                              </motion.button>
                            </div>
                          </div>
                          <div
                            style={{
                              background: (item.inStock === false || item.stock === 0) ? '#fee2e2' : '#f0fdf4',
                              borderRadius: '0.6rem',
                              padding: '0.7em 1em',
                              boxShadow: '0 1px 4px rgba(37,99,235,0.04)',
                              fontFamily: "'Poppins', sans-serif",
                              border: '1.5px solid #e0e7ef',
                              width: 180,
                              minWidth: 0,
                              maxWidth: 180,
                              boxSizing: 'border-box',
                              marginTop: 8,
                              marginLeft: 'auto',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 10,
                            }}
                          >
                            <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.18rem', textAlign: 'center' }}>${item.price}</div>
                          </div>
                          {/* <div
                            style={{
                              background: (item.inStock === false || item.stock === 0) ? '#fee2e2' : '#d1fae5',
                              borderRadius: '0.6rem',
                              padding: '0.5em 1em',
                              width: 180,
                              minWidth: 0,
                              maxWidth: 180,
                              boxSizing: 'border-box',
                              margin: '8px  0 auto',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8,
                              fontFamily: "'Poppins', sans-serif",
                              border: '1.5px solid #e0e7ef',
                            }}
                          >
                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              {(item.inStock === false || item.stock === 0) ? redCrossIcon : greenCheckIcon}
                            </span>
                            <span style={{ color: (item.inStock === false || item.stock === 0) ? '#ef4444' : '#22c55e', fontWeight: 500, fontSize: '1.13rem', textAlign: 'center' }}>
                              {(item.inStock === false || item.stock === 0) ? 'Out of Stock' : 'In Stock'}
                            </span>
                          </div> */}
                        </div>
                      </div>
                      <hr style={styles.hr} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={styles.rightCol}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryHeader}>Order Summary</div>
                <div style={styles.summaryBody}>
                  <div style={styles.summaryRow}>
                    <span>Products ({totalItems})</span>
                    <span>${Math.round(subtotal)}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}>
                    <span>Total amount</span>
                    <span>${Math.round(subtotal + shipping)}</span>
                  </div>
                  <Link to="/checkout" style={styles.checkoutBtn}>
                    Go to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Cart</h1>
        <hr style={styles.pageHr} />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  pageContainer: {
    maxWidth: 1600,
    margin: "0 auto",
    padding: "2.5rem 1.5rem 1.5rem 1.5rem",
    width: "100%",
  },
  pageTitle: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: "2.2rem",
    marginBottom: 0,
    color: "#222",
    fontFamily: "'Poppins', sans-serif",
  },
  pageHr: {
    width: 60,
    border: 0,
    borderTop: "2px solid #0ea5e9",
    margin: "1rem auto 2rem auto",
  },
  section: {
    width: "100%",
    minHeight: "60vh",
    background: "none",
  },
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 1.5rem",
    width: "100%",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2.5rem",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  leftCol: {
    flex: 2,
    minWidth: 340,
    maxWidth: 900,
    width: "100%",
  },
  rightCol: {
    flex: 1,
    minWidth: 320,
    maxWidth: 400,
    width: "100%",
  },
  card: {
    background: "#fff",
    borderRadius: "1.2rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    padding: "2rem 2rem 1.5rem 2rem",
    marginBottom: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  cardHeader: {
    fontWeight: 600,
    fontSize: "1.3rem",
    marginBottom: "1.2rem",
    color: "#2563eb",
    fontFamily: "'Poppins', sans-serif",
  },
  cardBody: {
    width: "100%",
  },
  cartItem: {
    marginBottom: 0,
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    flexWrap: "wrap",
  },
  imageBox: {
    width: 110,
    height: 90,
    background: "#fff",
    border: "1.5px solid #e0e7ef",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(37,99,235,0.04)",
    transition: "box-shadow 0.2s, border 0.2s",
    padding: 10,
  },
  image: {
    width: "auto",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    borderRadius: "0.7rem",
    background: "#fff",
    display: "block",
    margin: "0 auto",
  },
  itemInfo: {
    flex: 2,
    minWidth: 120,
    fontFamily: "'Poppins', sans-serif",
  },
  itemTitle: {
    fontWeight: 500,
    fontSize: "1.08rem",
    color: "#222",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: 0,
    lineHeight: 1.3,
    maxWidth: 340,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  qtyCol: {
    flex: 1,
    minWidth: 180,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e0e7ef",
    borderRadius: "0.7rem",
    background: "#f8fafc",
    padding: "0.25rem 0.7rem",
    gap: 10,
    minWidth: 110,
    justifyContent: "center",
    marginBottom: 2,
  },
  qtyBtn: {
    background: "#f0f6ff",
    border: "1.5px solid #e0e7ef",
    borderRadius: "0.5rem",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 18,
    color: "#2563eb",
    transition: "background 0.2s, border 0.2s, color 0.2s, box-shadow 0.2s",
    outline: "none",
    boxShadow: "0 1px 4px rgba(37,99,235,0.04)",
  },
  qtyNum: {
    fontWeight: 500,
    fontSize: "1.1rem",
    color: "#222",
    minWidth: 28,
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  priceLine: {
    marginTop: 8,
    fontWeight: 400,
    fontSize: "1rem",
    color: "#2563eb",
    fontFamily: "'Poppins', sans-serif",
  },
  qtyX: {
    color: "#64748b",
    fontWeight: 400,
    fontSize: "1rem",
    marginRight: 2,
  },
  price: {
    color: "#2563eb",
    fontWeight: 500,
    fontSize: "1.08rem",
  },
  hr: {
    border: 0,
    borderTop: "1.5px solid #e5e7eb",
    margin: "1.2rem 0 0.7rem 0",
  },
  summaryCard: {
    background: "#fff",
    borderRadius: "1.2rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    padding: "2rem 2rem 1.5rem 2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  summaryHeader: {
    fontWeight: 600,
    fontSize: "1.3rem",
    marginBottom: "1.2rem",
    color: "#2563eb",
    fontFamily: "'Poppins', sans-serif",
  },
  summaryBody: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.08rem",
    color: "#222",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: 8,
  },
  summaryTotal: {
    fontWeight: 600,
    color: "#0ea5e9",
    fontSize: "1.18rem",
    marginTop: 10,
    marginBottom: 10,
  },
  checkoutBtn: {
    width: "100%",
    background: "#0ea5e9",
    color: "#fff",
    border: "none",
    borderRadius: "0.7rem",
    padding: "0.9rem 0",
    fontWeight: 500,
    fontSize: "1.08rem",
    marginTop: 18,
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 1px 6px rgba(14,165,233,0.07)",
    textAlign: "center",
    transition: "background 0.2s, box-shadow 0.2s",
    display: "block",
    textDecoration: "none",
  },
  priceBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "#f0f6ff",
    color: "#2563eb",
    borderRadius: "0.6rem",
    padding: "0.32em 1.1em 0.32em 0.7em",
    fontWeight: 500,
    fontSize: "1.13rem",
    marginTop: 8,
    marginBottom: 8,
    boxShadow: "0 1px 4px rgba(37,99,235,0.04)",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "0.01em",
    border: "1.5px solid #e0e7ef",
    gap: 8,
    transition: "box-shadow 0.2s, border 0.2s, background 0.2s, color 0.2s",
  },
  qtyXIcon: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: 6,
    verticalAlign: "middle",
  },
};

export default Cart;
