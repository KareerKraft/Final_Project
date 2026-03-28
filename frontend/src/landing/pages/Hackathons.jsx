import { toast } from "sonner";
import "../styles/ExploreExtras.css";

const hackathonHighlights = [
  "Live team challenges",
  "Idea pitching rounds",
  "Mentor-led problem solving",
  "Prizes, exposure, and growth",
];

export default function Hackathons() {
  return (
    <main className="extras-page extras-page-hackathons">
      <section className="extras-hero">
        <span className="extras-tag extras-tag-hackathons">Hackathon Zone</span>
        <h1 className="extras-title">
          Let&apos;s Hack the Hackathons and win exciting prizes
        </h1>
        <p className="extras-description">
          Explore hackathon opportunities, sharpen your teamwork, and prepare to
          turn bold ideas into winning builds.
        </p>
      </section>

      <section className="extras-grid-section">
        <div className="extras-highlight-grid">
          {hackathonHighlights.map((item) => (
            <button
              key={item}
              type="button"
              className="extras-highlight-card"
              onClick={() => toast.info(`${item} details will be added soon.`)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
