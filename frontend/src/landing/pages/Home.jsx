import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import ActionCircles from '../components/ActionCircles';
import '../styles/Home.css';

function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after 2.5 seconds (animation ends)
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Intro Animation */}
      <div className={`intro-animation ${showContent ? 'fade-out' : 'show'}`}>
        <div className="intro-content">
          <h1 className="intro-title">KAREER KRAFT</h1>
          <p className="intro-subtitle">Your Path to Success</p>
          <div className="intro-underline"></div>
        </div>
      </div>

      {/* Main Content - appears after animation */}
      <div className={`content-section ${showContent ? 'show' : ''}`}>
        {/* Carousel Section */}
        <div className="carousel-section">
          <Carousel />
        </div>

        {/* Action Circles */}
        <ActionCircles />

        {/* Footer Info */}
        <div className="footer-info">
          <p>Start your career journey today</p>
        </div>
      </div>
    </div>
  );
}

export default Home;