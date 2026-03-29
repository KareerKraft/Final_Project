import { useNavigate } from "react-router-dom";
import "../styles/ExploreExtras.css";
import { placementGuideItems } from "../data/placementGuideItems";

export default function PlacementGuide() {
  const navigate = useNavigate();

  const handleGuideClick = (slug) => {
    navigate(`/placement-guide/${slug}`);
  };

  return (
    <main className="extras-page extras-page-placement-guide">
      <section className="extras-hero">
        <span className="extras-tag">Placement Preparation</span>
        <h1 className="extras-title">Ace any Placements with KareerKraft</h1>
        <p className="extras-description">
          Build confidence for placements with guided preparation tracks,
          interview-focused practice, and revision-friendly resources.
        </p>
      </section>

      <section className="extras-grid-section">
        <div className="extras-grid placement-guide-grid">
          {placementGuideItems.map((item) => (
            <button
              key={item.slug}
              type="button"
              className="extras-card placement-guide-card"
              onClick={() => handleGuideClick(item.slug)}
            >
              <span className="extras-card-label">Preparation Track</span>
              <strong>{item.title}</strong>
              <p>Tap to explore this learning lane.</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
