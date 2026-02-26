import { useState, useEffect } from "react";
import "../styles/Carousel.css";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find Your Suitable Job",
      description: "Discover amazing opportunities tailored to your skills",
      icon: "💼",
    },
    {
      title: "Build Your Resume",
      description: "Create a professional resume in minutes",
      icon: "📄",
    },
    {
      title: "Get Hired Fast",
      description: "Connect with top employers worldwide",
      icon: "🎯",
    },
    {
      title: "Career Growth",
      description: "Develop your skills and advance your career",
      icon: "📈",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <div className="slide-icon">{slide.icon}</div>
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-description">{slide.description}</p>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;