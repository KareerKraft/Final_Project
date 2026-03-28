import { toast } from "sonner";
import "../styles/ExploreExtras.css";

const guideItems = [
  "Appear Mock",
  "SQL Guide",
  "OS Guide",
  "DBMS Guide",
  "Practice DSA",
  "Practice Assignment",
  "Frequently Asked Interview Questions",
];

export default function PlacementGuide() {
  const handleGuideClick = (title) => {
    toast.info(`${title} section is coming soon.`);
  };

  return (
    <main className="extras-page">
      <section className="extras-hero">
        <span className="extras-tag">Placement Preparation</span>
        <h1 className="extras-title">Ace any interview with KareerKraft</h1>
        <p className="extras-description">
          Build confidence for placements with guided preparation tracks,
          interview-focused practice, and revision-friendly resources.
        </p>
      </section>

      <section className="extras-grid-section">
        <div className="extras-grid">
          {guideItems.map((item) => (
            <button
              key={item}
              type="button"
              className="extras-card"
              onClick={() => handleGuideClick(item)}
            >
              <span className="extras-card-label">Preparation Track</span>
              <strong>{item}</strong>
              <p>Tap to explore this learning lane.</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
