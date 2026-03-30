import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Explore.css";

const featureCards = [
  {
    icon: "O",
    title: "Job Discovery",
    description: "Apply for jobs that match your skills and career goals.",
    action: () => "/login",
    image: "/JobSearch.jpg",
    imageAlt: "Job discovery preview",
  },
  {
    icon: "[]",
    title: "Resume Builder",
    description: "Create a polished resume that is ready to share.",
    action: () => "https://resume-portal-final.vercel.app/",
    external: true,
    image: "/Resumephoto.jpeg",
    imageAlt: "Resume builder preview",
  },
  {
    icon: "::",
    title: "Placement Prep",
    description: "Use focused guides to prepare for placements step by step.",
    action: () => "/placement-guide",
    image: "/placeGuide.jpg",
    imageAlt: "Placement preparation preview",
  },
  {
    icon: "/\\",
    title: "Hackathons",
    description: "Find hackathons and jump into practical team challenges.",
    action: () => "/hackathons",
    image: "/hack1.jpg",
    imageAlt: "Hackathons preview",
  },
];

export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#explore-features") return;

    const section = document.getElementById("explore-features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const handleCardClick = (feature) => {
    const target = feature.action();

    if (feature.external) {
      window.location.href = target;
      return;
    }

    navigate(target);
  };

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="explore-copy">
          <span className="explore-tag">Career Growth Starts Here</span>
          <h1 className="explore-title">
            Build your future with confidence and clarity.
          </h1>
          <p className="explore-description">
            Discover the right next step faster with focused tools for job
            search, resume creation, placement preparation, and hackathon
            opportunities designed for students and early professionals.
          </p>
          <button
            onClick={() => navigate("/aboutus")}
            className="explore-secondary-btn"
          >
            Learn More
          </button>
        </div>

        <div id="explore-features" className="explore-feature-grid">
          {featureCards.map((feature) => (
            <button
              key={feature.title}
              type="button"
              className="explore-feature-card"
              onClick={() => handleCardClick(feature)}
            >
              <div className="explore-feature-top" />
              <div className="explore-feature-content">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.imageAlt || feature.title}
                    className="explore-feature-image"
                  />
                ) : null}
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
