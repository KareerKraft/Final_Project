import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "../styles/ExploreExtras.css";

const hackathonHighlights = [
  "Live team challenges",
  "Idea pitching rounds",
  "Mentor-led problem solving",
  "Prizes, exposure, and growth",
];

const hackathonSteps = [
  "Discover themes & problem statements",
  "Form a team or join one",
  "Rapid prototype with MVP mindset",
  "Demo to judges and collect feedback",
  "Winning, networking, and next steps",
];

const prepTips = [
  "Clarify your motivation and build scope",
  "Practice pitching your idea in <2 min",
  "Learn tools (Git, Figma, Postman, etc.)",
  "Prepare a 1-page project plan",
  "Get familiar with APIs, templates, and libraries",
];

const hackathonBenefits = [
  "Apply academic learning in real product building",
  "Improve team communication and leadership",
  "Boost portfolio with tangible projects",
  "Get visibility with recruiters & mentors",
  "Develop resilience through rapid iteration",
];

export default function Hackathons() {
  const navigate = useNavigate();

  return (
    <main className="extras-page extras-page-hackathons">
      <section className="extras-hero">
        <span className="extras-tag extras-tag-hackathons">Hackathon Zone</span>
        <h1 className="extras-title">Let&apos;s Hack the Hackathons!</h1>
        <p className="extras-description">
          Dive into the ultimate coding adventure! Unleash your creativity, collaborate with brilliant minds, and turn wild ideas into reality. Whether you're a solo innovator or a team powerhouse, hackathons are your launchpad to tech stardom.
        </p>
        <div className="extras-cta-row">
          <button
            type="button"
            className="extras-cta-btn"
            onClick={() => navigate("/hackathons/apply")}
          >
            Apply for Hackathons
          </button>
          <button
            type="button"
            className="extras-secondary-btn"
            onClick={() => navigate("/hackathons/applied")}
          >
            Applied Hackathons
          </button>
        </div>
      </section>

      <section className="extras-image-gallery">
        <div className="extras-image-card">
          <img src="/hack2.jpeg" alt="Hackathon Team Collaboration" className="extras-image" />
          <div className="extras-image-overlay">
            <h3>Team Synergy Unleashed</h3>
            <p>Watch ideas collide and transform into groundbreaking solutions!</p>
          </div>
        </div>
        <div className="extras-image-card">
          <img src="/hack3.jpeg" alt="Hackathon Winning Moment" className="extras-image" />
          <div className="extras-image-overlay">
            <h3>Victory & Glory Await</h3>
            <p>From late-night coding to standing ovations—your moment to shine!</p>
          </div>
        </div>
      </section>

      <section className="extras-code-section">
        <div className="extras-section-card">
          <h2>How a Hackathon Works (Step-by-Step)</h2>
          <ol className="extras-step-list">
            {hackathonSteps.map((step, idx) => (
              <li key={step}>
                <strong>Step {idx + 1}:</strong> {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="extras-section-card">
          <h2>How to Prepare</h2>
          <ul className="extras-info-list">
            {prepTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="extras-section-card">
          <h2>Why it Helps Your Career</h2>
          <ul className="extras-info-list">
            {hackathonBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="extras-section-card extras-highlight-panel">
          <h2>Quick Hackathon Highlight</h2>
          <div className="extras-highlight-grid">
            {hackathonHighlights.map((item) => (
              <button
                key={item}
                type="button"
                className="extras-highlight-card"
                onClick={() => toast.success(`Get ready for ${item}!`)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
