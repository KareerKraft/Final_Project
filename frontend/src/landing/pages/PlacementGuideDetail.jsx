import { Link, useParams } from "react-router-dom";
import "../styles/ExploreExtras.css";
import { placementGuideMap } from "../data/placementGuideItems";
import { placementGuideContent } from "../data/placementGuideContent";

export default function PlacementGuideDetail() {
  const { slug } = useParams();
  const guide = placementGuideMap[slug];
  const guideContent = placementGuideContent[slug] || {};
  const items = Array.isArray(guideContent.resources)
    ? guideContent.resources
    : Array.isArray(guideContent.platforms)
      ? guideContent.platforms
      : [];
  const tips = Array.isArray(guideContent.tips) ? guideContent.tips : [];
  const statsLabel =
    items.length === 0
      ? "No resources added yet"
      : items.length === 1
        ? "1 resource available"
        : `${items.length} resources available`;

  if (!guide) {
    return (
      <main className="extras-page extras-page-placement-guide">
        <section className="extras-hero">
          <span className="extras-tag">Placement Preparation</span>
          <h1 className="extras-title">Guide page not found</h1>
          <p className="extras-description">
            This guide does not exist yet. Head back to the placement guide and
            choose one of the available tracks.
          </p>
          <Link className="placement-guide-back-link" to="/placement-guide">
            Back to Placement Guide
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="extras-page extras-page-placement-guide">
      <section className="extras-hero placement-guide-detail-hero">
        <span className="extras-tag">Placement Preparation</span>
        <h1 className="extras-title">{guide.title}</h1>
        <p className="extras-description">
          Placements are near so don't waste time! Add your go-to resources for this topic in one place, and access them whenever you need a quick refresher or some last-minute practice.
        </p>
        <div className="placement-guide-detail-meta">
          <span>{statsLabel}</span>
          <Link className="placement-guide-back-link" to="/placement-guide">
            Back to all guides
          </Link>
        </div>
      </section>

      {(items.length > 0 || tips.length > 0) && (
        <section className="extras-grid-section placement-guide-detail-section">
          <div className="placement-guide-detail-layout placement-guide-detail-layout-single">
            <div className="placement-guide-resource-panel">
              {items.length > 0 ? (
                <div className="placement-guide-resource-list">
                  {items.map((resource, index) => {
                    const title = resource.title || resource.name || `Resource ${index + 1}`;

                    return (
                      <article
                        key={`${guide.title}-${title}-${index}`}
                        className="placement-guide-resource-card"
                      >
                        <div className="placement-guide-resource-top">
                          <span className="placement-guide-resource-type">
                            {guideContent.type || "resource"}
                          </span>
                        </div>
                        <h3>{title}</h3>
                        {resource.provider ? (
                          <p className="placement-guide-provider">{resource.provider}</p>
                        ) : null}
                        {resource.description ? <p>{resource.description}</p> : null}
                        {resource.link ? (
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noreferrer"
                            className="placement-guide-open-link"
                          >
                            {slug === "exclusive-college-courses-offered"
                              ? "Open Exclusive Resource"
                              : "Visit Platform"}
                          </a>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : null}

              {tips.length > 0 ? (
                <div className="placement-guide-tips-block">
                  <h2>Quick tips</h2>
                  <div className="placement-guide-tips-list">
                    {tips.map((tip) => (
                      <div key={tip} className="placement-guide-tip-card">
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
