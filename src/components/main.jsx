import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import banner images - using require for public assets
const image1 = process.env.PUBLIC_URL + '/assets/image1.jpg';
const image2 = process.env.PUBLIC_URL + '/assets/image2.jpg';
const image3 = process.env.PUBLIC_URL + '/assets/image3.jpg';

const heroSlides = [
  {
    id: 1,
    image: image1,
    title: 'NEW SEASON ARRIVALS',
    subtitle: 'Discover the Latest Trends',
    description: 'Explore our curated collection of premium fashion items that define style and elegance.',
    cta: 'Shop Now',
    ctaLink: '/product',
    badge: 'TRENDING',
    badgeColor: '#ff6b6b'
  },
  {
    id: 2,
    image: image2,
    title: 'PREMIUM COLLECTION',
    subtitle: 'Luxury Meets Comfort',
    description: 'Experience unparalleled quality with our handpicked selection of premium clothing.',
    cta: 'Explore Collection',
    ctaLink: '/product',
    badge: 'PREMIUM',
    badgeColor: '#4ecdc4'
  },
  {
    id: 3,
    image: image3,
    title: 'SUMMER ESSENTIALS',
    subtitle: 'Stay Cool & Stylish',
    description: 'Beat the heat with our summer collection featuring breathable fabrics and trendy designs.',
    cta: 'Get Summer Ready',
    ctaLink: '/product',
    badge: 'HOT',
    badgeColor: '#ffa726'
  }
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <style>{`
        .hero-swiper {
          height: ${isMobile ? '70vh' : '85vh'};
          min-height: 500px;
        }
        
        .hero-slide {
          position: relative;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(135deg, 
              rgba(0,0,0,0.7) 0%, 
              rgba(0,0,0,0.5) 25%, 
              rgba(0,0,0,0.3) 50%, 
              rgba(0,0,0,0.6) 75%, 
              rgba(0,0,0,0.8) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.4) 0%,
              rgba(0,0,0,0.2) 40%,
              rgba(0,0,0,0.4) 80%,
              rgba(0,0,0,0.6) 100%
            ),
            radial-gradient(
              circle at 20% 80%, 
              rgba(0,0,0,0.3) 0%, 
              transparent 60%
            ),
            radial-gradient(
              circle at 80% 20%, 
              rgba(0,0,0,0.4) 0%, 
              transparent 60%
            );
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          padding: 0 2rem;
          color: white;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 0.75rem 2rem;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 1.5rem;
          animation: pulse 2s infinite;
          box-shadow: 
            0 6px 20px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.4),
            0 0 20px rgba(255,255,255,0.1);
          text-shadow: 
            0 2px 4px rgba(0,0,0,0.5),
            0 0 10px rgba(255,255,255,0.2);
        }
        
        .hero-title {
          font-size: ${isMobile ? '2.5rem' : '4rem'};
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 
            3px 3px 6px rgba(0,0,0,0.8),
            0 0 30px rgba(255,255,255,0.2),
            0 0 60px rgba(255,255,255,0.1);
          background: linear-gradient(45deg, #ffffff, #f1f5f9, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));
        }
        
        .hero-subtitle {
          font-size: ${isMobile ? '1.2rem' : '1.8rem'};
          font-weight: 300;
          margin-bottom: 1.5rem;
          opacity: 1;
          text-shadow: 
            2px 2px 4px rgba(0,0,0,0.8),
            0 0 20px rgba(255,255,255,0.15),
            0 0 40px rgba(255,255,255,0.1);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }
        
        .hero-description {
          font-size: ${isMobile ? '1rem' : '1.2rem'};
          margin-bottom: 2.5rem;
          opacity: 0.95;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 
            2px 2px 4px rgba(0,0,0,0.8),
            0 0 15px rgba(255,255,255,0.1),
            0 0 30px rgba(255,255,255,0.05);
        }
        
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          background: linear-gradient(45deg, #0ea5e9, #2563eb);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(14,165,233,0.3);
          position: relative;
          overflow: hidden;
        }
        
        .hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .hero-cta:hover::before {
          left: 100%;
        }
        
        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(14,165,233,0.4);
        }
        
        .hero-cta svg {
          transition: transform 0.3s ease;
        }
        
        .hero-cta:hover svg {
          transform: translateX(4px);
        }
        
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: #0ea5e9;
          transform: scale(1.2);
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.1);
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
        
                 .hero-content {
           opacity: 1;
           transition: opacity 0.5s ease;
         }
         
         .hero-badge {
           opacity: 0;
           transform: translateY(20px);
           transition: all 0.8s ease 0.2s;
         }
         
         .hero-title {
           opacity: 0;
           transform: translateY(30px);
           transition: all 0.8s ease 0.4s;
         }
         
         .hero-subtitle {
           opacity: 0;
           transform: translateY(30px);
           transition: all 0.8s ease 0.6s;
         }
         
         .hero-description {
           opacity: 0;
           transform: translateY(30px);
           transition: all 0.8s ease 0.8s;
         }
         
         .hero-cta {
           opacity: 0;
           transform: translateY(30px);
           transition: all 0.8s ease 1s;
         }
         
         .swiper-slide-active .hero-badge,
         .swiper-slide-active .hero-title,
         .swiper-slide-active .hero-subtitle,
         .swiper-slide-active .hero-description,
         .swiper-slide-active .hero-cta {
           opacity: 1;
           transform: translateY(0);
         }
        
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
          
          .hero-content {
            padding: 0 1rem;
          }
        }
      `}</style>
      
      <div className="hero-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={!isMobile}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
                     onSlideChange={handleSlideChange}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="hero-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-overlay"></div>
                                 <div className="hero-content">
                   <div
                     className="hero-badge"
                     style={{ backgroundColor: slide.badgeColor + '20', borderColor: slide.badgeColor }}
                   >
                     {slide.badge}
                   </div>
                   
                   <h1 className="hero-title">
                     {slide.title}
                   </h1>
                   
                   <h2 className="hero-subtitle">
                     {slide.subtitle}
                   </h2>
                   
                   <p className="hero-description">
                     {slide.description}
                   </p>
                   
                   <a
                     href={slide.ctaLink}
                     className="hero-cta"
                   >
                     {slide.cta}
                     <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                       <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </a>
                 </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Home;
