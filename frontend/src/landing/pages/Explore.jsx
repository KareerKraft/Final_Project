import { useNavigate } from "react-router-dom";
import "../styles/Explore.css";

export default function Explore() {
  const navigate = useNavigate();

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="explore-copy">
          <span className="explore-tag">Career Growth Starts Here</span>
          <h1 className="explore-title">Build your future with confidence and clarity.</h1>
          <p className="explore-description">
            Discover jobs, create a polished resume, and move forward with tools
            designed for students and early professionals.
          </p>

          <div className="explore-actions">
            <button
              onClick={() => navigate("/role")}
              className="explore-primary-btn"
            >
              Explore Now
            </button>
            <button
              onClick={() => navigate("/aboutus")}
              className="explore-secondary-btn"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="explore-panel">
          <div className="explore-panel-card">
            <p className="explore-panel-label">What you can do</p>
            <h2>Everything you need in one place</h2>
            <div className="explore-feature-list">
              <div className="explore-feature-item">
                <strong>Smart job discovery</strong>
                <span>Browse matching opportunities faster.</span>
              </div>
              <div className="explore-feature-item">
                <strong>Resume building</strong>
                <span>Create a clean, professional profile.</span>
              </div>
              <div className="explore-feature-item">
                <strong>Easy next steps</strong>
                <span>Move from planning to applying smoothly.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-bottom-actions">
        <button
          className="explore-bottom-btn explore-bottom-btn-primary"
          onClick={() => navigate("/login")}
        >
          APPLY FOR JOBS
        </button>
        <button
          className="explore-bottom-btn explore-bottom-btn-secondary"
          onClick={() => {
            window.location.href = "https://resume-portal-final.vercel.app/";
          }}
        >
          CREATE RESUME
        </button>
        <button
          className="explore-bottom-btn explore-bottom-btn-outline"
          onClick={() => navigate("/placement-guide")}
        >
          PLACEMENT PREPARATION GUIDE
        </button>
        <button
          className="explore-bottom-btn explore-bottom-btn-dark"
          onClick={() => navigate("/hackathons")}
        >
          HACKATHONS
        </button>
      </section>
    </main>
  );
}
