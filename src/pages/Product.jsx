import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/action";
import toast from "react-hot-toast";

import { Footer, Navbar } from "../components";

// Add CSS animations
const styles = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .product-image-container {
    animation: float 6s ease-in-out infinite;
  }
  
  .price-badge {
    animation: float 4s ease-in-out infinite;
  }
  
  .stock-indicator {
    animation: pulse 2s infinite;
  }
  
  .product-container {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .similar-products-container {
    animation: scaleIn 0.6s ease-out;
  }
  
  .responsive-button {
    position: relative;
    overflow: hidden;
  }
  
  .responsive-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  .responsive-button:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    .product-container {
      padding: 16px !important;
    }
    
    .product-image-container {
      margin-bottom: 24px;
    }
    
    .button-container {
      flex-direction: column !important;
    }
    
    .responsive-button {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .similar-products-container {
      padding: 0 16px;
    }
  }
  
  @media (max-width: 576px) {
    .product-title {
      font-size: 1.5rem !important;
    }
    
    .product-description {
      font-size: 0.95rem !important;
    }
    
    .product-image-container {
      padding: 16px !important;
    }
  }
  
  /* Enhanced shadows and depth */
  .enhanced-shadow {
    box-shadow: 
      0 1px 3px rgba(0,0,0,0.12),
      0 1px 2px rgba(0,0,0,0.24),
      0 4px 8px rgba(0,0,0,0.06);
  }
  
  .enhanced-shadow:hover {
    box-shadow: 
      0 3px 6px rgba(0,0,0,0.16),
      0 3px 6px rgba(0,0,0,0.23),
      0 8px 16px rgba(0,0,0,0.1);
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addProduct = (product) => {
    const inStock = product.stock !== undefined
      ? product.stock > 0
      : (product.rating?.count > 0 && product.id % 3 !== 0);
    const productWithStock = { ...product, inStock };
    console.log('Adding product to cart from Product page:', productWithStock);
    dispatch(addToCart(productWithStock));
    toast.success('PRODUCT ADDED!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#22c55e',
        color: '#fff',
        fontWeight: '600',
        fontSize: '14px',
        borderRadius: '8px',
        padding: '12px 20px',
      },
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        console.log('Fetching product with ID:', id);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      const data = await response.json();
        console.log('Product data received:', data);
      setProduct(data);
      setLoading(false);
        
        // Fetch similar products from the same category
        if (data.category) {
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
          if (response2.ok) {
      const data2 = await response2.json();
            
            // Filter out products without valid images and limit to 4
            const validProducts = data2
              .filter(item => item.image && item.image.trim() !== '')
              .slice(0, 4);
            
            setSimilarProducts(validProducts);
          }
        }
        setLoading2(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    // Check if product data exists
    if (!product || !product.id) {
      return (
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-12 text-center">
              <p>Product not found or loading...</p>
            </div>
          </div>
        </div>
      );
    }
    
    const inStock = product.stock !== undefined
      ? product.stock > 0
      : (product.rating?.count > 0 && product.id % 3 !== 0);
    return (
      <>
        <style>{styles}</style>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 py-3">
              <div className="product-image-container" style={{
                position: 'relative',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '24px',
                padding: '24px',
                border: '2px solid rgb(8, 228, 0)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                overflow: 'hidden'
              }}>
                {/* Decorative corner elements */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  borderRadius: '0 0 24px 0',
                  opacity: '0.1'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  borderRadius: '24px 0 0 0',
                  opacity: '0.1'
                }}></div>
                
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '16px',
                    border: '3px solid #f1f5f9',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    transition: 'all 0.3s ease',
                    filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.1))'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                    }
                  }}
              />
            </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 py-md-3">
              <div style={{ 
                paddingLeft: isMobile ? '24px' : '32px',
                paddingTop: isMobile ? '32px' : '0px',
              }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', 
                  color: '#3730a3', 
                  padding: '12px 20px', 
                  borderRadius: '25px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '24px',
                  border: '1px solid rgba(99,102,241,0.2)',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.1)'
                }}>
                  {product.category}
                </div>
                <h1 className="product-title" style={{ 
                  fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 4vw, 2.5rem)', 
                  fontWeight: '800', 
                  color: '#1e293b', 
                  marginBottom: '20px',
                  lineHeight: '1.2',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {product.title}
                </h1>
                
                {/* Price display in content area */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  padding: '5px 24px',
                  borderRadius: '9px',
                  fontSize: '24px',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '24px',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  ${product.price}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  marginBottom: '24px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  padding: '12px 20px',
                  borderRadius: '25px',
                  width: 'fit-content',
                  border: '1px solid rgba(245,158,11,0.2)',
                  boxShadow: '0 4px 12px rgba(245,158,11,0.1)'
                }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#f59e0b' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span style={{ color: '#92400e', fontWeight: '700', fontSize: '16px' }}>
                    {product.rating && product.rating.rate} / 5.0
                  </span>
                </div>
                <p className="product-description" style={{ 
                  fontSize: isMobile ? '1rem' : 'clamp(1rem, 2.5vw, 1.1rem)', 
                  color: '#64748b', 
                  lineHeight: '1.7',
                  marginBottom: '28px'
                }}>
                  {product.description}
                </p>
                <div style={{ 
                  marginBottom: '28px',
                  padding: '16px 24px',
                  borderRadius: '16px',
                  background: inStock ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  border: `2px solid ${inStock ? '#22c55e' : '#ef4444'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: 'fit-content',
                  boxShadow: `0 4px 16px ${inStock ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`
                }}>
                  <div className="stock-indicator" style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: inStock ? '#22c55e' : '#ef4444',
                    boxShadow: `0 0 0 4px ${inStock ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`
                  }}></div>
                  <span style={{ 
                    color: inStock ? '#166534' : '#991b1b', 
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                  
                  {/* Responsive button container */}
                  <div className="button-container" style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '16px', 
                    alignItems: 'stretch',
                    marginTop: '32px'
                  }}>
                <button
                      className="responsive-button"
                  onClick={() => addProduct(product)}
                  disabled={!inStock}
                  style={{
                        background: inStock ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' : '#e5e7eb',
                    color: inStock ? '#fff' : '#b6c3d1',
                    borderRadius: '50px',
                        padding: isMobile ? '16px 24px' : 'clamp(14px, 3vw, 18px) clamp(24px, 4vw, 32px)',
                        fontSize: isMobile ? '16px' : 'clamp(14px, 2.5vw, 16px)',
                        fontWeight: '700',
                    cursor: inStock ? 'pointer' : 'not-allowed',
                        boxShadow: inStock ? '0 8px 24px rgba(37,99,235,0.3)' : 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                        justifyContent: 'center',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                        minHeight: '56px',
                        width: '100%',
                        maxWidth: isMobile ? '100%' : 'auto',
                        border: inStock ? '2px solid rgba(255,255,255,0.2)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                        if (inStock && !isMobile) {
                          e.target.style.transform = 'translateY(-3px) scale(1.02)';
                          e.target.style.boxShadow = '0 12px 32px rgba(37,99,235,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                        if (inStock && !isMobile) {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 8px 24px rgba(37,99,235,0.3)';
                    }
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M12 12h.01" />
                  </svg>
                  Add to Cart
                </button>
                <Link 
                      className="responsive-button"
                  to="/cart" 
                  style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    color: '#2563eb',
                    border: '2px solid #2563eb',
                    borderRadius: '50px',
                        padding: isMobile ? '16px 24px' : 'clamp(14px, 3vw, 18px) clamp(24px, 4vw, 32px)',
                        fontSize: isMobile ? '16px' : 'clamp(14px, 2.5vw, 16px)',
                        fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                        justifyContent: 'center',
                    gap: '12px',
                        minHeight: '56px',
                        width: '100%',
                        maxWidth: isMobile ? '100%' : 'auto',
                        boxShadow: '0 4px 16px rgba(37,99,235,0.1)'
                  }}
                  onMouseEnter={(e) => {
                        if (!isMobile) {
                          e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)';
                    e.target.style.color = '#fff';
                          e.target.style.transform = 'translateY(-3px) scale(1.02)';
                          e.target.style.boxShadow = '0 12px 32px rgba(37,99,235,0.3)';
                        }
                  }}
                  onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
                    e.target.style.color = '#2563eb';
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 16px rgba(37,99,235,0.1)';
                        }
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Go to Cart
                </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4" style={{ padding: 0, margin: 0 }}>
          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '1rem' : '1.5rem', 
            justifyContent: 'flex-start', 
            alignItems: 'stretch', 
            flexWrap: isMobile ? 'wrap' : 'nowrap', 
            padding: 0, 
            margin: 0,
            overflowX: isMobile ? 'visible' : 'hidden'
          }}>
            {similarProducts.slice(0, 4).map((item) => {
              const inStock = item.stock !== undefined
                ? item.stock > 0
                : (item.rating?.count > 0 && item.id % 3 !== 0);
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    minWidth: isMobile ? '220px' : '280px',
                    maxWidth: isMobile ? '100%' : '280px',
                    margin: isMobile ? '0 0 1rem 0' : 0,
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={e => {
                    if (!isMobile) {
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseOut={e => {
                    if (!isMobile) {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '140px', 
                    marginBottom: '0.75rem',
                    background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderRadius: '12px',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {item.image && item.image.trim() !== '' ? (
                      <img
                        className="card-img-top"
                      src={item.image}
                      alt={item.title}
                      style={{ 
                        objectFit: 'contain', 
                          borderRadius: '8px', 
                        width: '100%',
                          height: '100%',
                          transition: 'all 0.2s ease',
                          maxWidth: '100%',
                          maxHeight: '100%'
                      }}
                      onError={(e) => {
                          console.log('Image failed to load:', item.image);
                        e.target.style.display = 'none';
                          const fallbackDiv = e.target.nextSibling;
                          if (fallbackDiv) {
                            fallbackDiv.style.display = 'flex';
                          }
                      }}
                    />
                    ) : null}
                    <div 
                      style={{ 
                        display: item.image && item.image.trim() !== '' ? 'none' : 'flex',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                        fontSize: '12px',
                        textAlign: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        border: '1px dashed #cbd5e1'
                      }}
                    >
                      {item.image && item.image.trim() !== '' ? 'Loading...' : 'No Image'}
                    </div>
                  </div>
                  
                  <div style={{ width: '100%', textAlign: 'left', marginBottom: '0.5rem' }}>
                    <h5 style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 600, 
                      margin: 0, 
                      color: '#1e293b', 
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.title}
                    </h5>
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    {inStock ? (
                      <span style={{ 
                        color: '#16a34a', 
                        fontWeight: 600, 
                        fontSize: '0.75rem',
                        background: '#dcfce7',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: '1px solid #bbf7d0'
                      }}>In Stock</span>
                    ) : (
                      <span style={{ 
                        color: '#dc2626', 
                        fontWeight: 600, 
                        fontSize: '0.75rem',
                        background: '#fee2e2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: '1px solid #fecaca'
                      }}>Out of Stock</span>
                    )}
                  </div>
                  
                  <div style={{ 
                    width: '100%', 
                    display: 'flex', 
                    gap: '0.5rem', 
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (inStock) {
                          addProduct(item);
                        }
                      }}
                      disabled={!inStock}
                      style={{
                        background: inStock ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' : '#e5e7eb',
                        color: inStock ? '#fff' : '#b6c3d1',
                        border: 'none',
                        borderRadius: '8px',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: inStock ? 'pointer' : 'not-allowed',
                        boxShadow: inStock ? '0 2px 8px rgba(37,99,235,0.2)' : 'none',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => {
                        if (inStock && !isMobile) {
                          e.target.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (inStock && !isMobile) {
                          e.target.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    
                    <Link
                      to={"/product/" + item.id}
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        color: '#2563eb',
                        border: '1px solid #2563eb',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        padding: '8px 12px',
                        flex: 1,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => {
                        if (!isMobile) {
                          e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)';
                        e.target.style.color = '#fff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
                        e.target.style.color = '#2563eb';
                        }
                      }}
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        {console.log('Current state - loading:', loading, 'product:', product)}
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-3 py-3">
          <div className="col-12 similar-products-container">
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '700',
              color: '#374151',
              textAlign: 'center',
              marginBottom: '1.5rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              You may also Like
            </h2>
            {isMobile ? (
              <div style={{ padding: '0 16px' }}>
                {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
              </div>
            ) : (
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
