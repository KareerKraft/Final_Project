import { useState } from "react";
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
  {
    title: "Understand Problem Statements",
    explanation: "Choose problems that match your skills and passion. Look for themes like sustainability, AI, or social impact. Read carefully—focus on feasibility within 24-48 hours."
  },
  {
    title: "Learn Essential Tools",
    tools: [
      { name: "Git", desc: "Version control for team collaboration", help: "Track changes and merge code seamlessly" },
      { name: "Figma", desc: "UI/UX design tool", help: "Create wireframes and prototypes quickly" },
      { name: "Postman", desc: "API testing tool", help: "Test and debug API integrations" },
      { name: "VS Code", desc: "Code editor", help: "Write, debug, and manage code efficiently" },
    ],
    aiTools: "Use GitHub Copilot for code suggestions, ChatGPT for brainstorming, and Canva AI for quick designs to save time."
  },
  {
    title: "Prepare a 1-page Project Plan",
    explanation: "Outline your idea, tech stack, and timeline. Include user stories and success metrics to stay focused."
  },
  {
    title: "Practice Pitching",
    explanation: "Prepare a 2-minute pitch. Focus on problem, solution, and impact. Practice with friends for confidence."
  },
];

const hackathonConstraints = [
  "Time constraint: 24-48 hours to build a working product",
  "Limited resources: Work with free tools and APIs",
  "Team coordination: Managing different time zones and skills",
  "Sleep deprivation: Balancing energy and productivity",
  "Technical challenges: Debugging under pressure",
];

const hackathonBenefits = [
  "Apply academic learning in real product building",
  "Improve team communication and leadership",
  "Boost portfolio with tangible projects",
  "Get visibility with recruiters & mentors",
  "Develop resilience through rapid iteration",
];

const hackathonResources = [
  {
    name: "HackerEarth",
    url: "https://corporate.hackathon.com/articles/the-ultimate-guide-to-choosing-the-best-hackathon-website-2025-edition?utm_source=chatgpt.com",
    description: "Ultimate guide to choosing the best hackathon platform"
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/?utm_source=chatgpt.com",
    description: "Practice coding and improve your skills with challenges"
  },
];

export default function Hackathons() {
  const navigate = useNavigate();
  const [expandedPrep, setExpandedPrep] = useState({});
  const [expandedTools, setExpandedTools] = useState(false);

  const togglePrep = (index) => {
    setExpandedPrep(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleTools = () => {
    setExpandedTools(!expandedTools);
  };

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
          <div className="extras-step-slider">
            {hackathonSteps.map((step, idx) => (
              <div key={step} className="extras-slide-box" style={{ animationDelay: `${idx * 2}s` }}>
                <h3>Step {idx + 1}</h3>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="extras-section-card">
          <h2>How to Prepare</h2>
          <div className="extras-accordion">
            {prepTips.map((tip, idx) => (
              <div key={tip.title || tip}>
                {typeof tip === 'string' ? (
                  <p>{tip}</p>
                ) : (
                  <>
                    <div
                      className={`extras-accordion-item ${tip.title === "Learn Essential Tools" ? (expandedTools ? 'active' : '') : (expandedPrep[idx] ? 'active' : '')}`}
                      onClick={() => tip.title === "Learn Essential Tools" ? toggleTools() : togglePrep(idx)}
                    >
                      <span className="extras-accordion-title">{tip.title}</span>
                      <span className="extras-accordion-arrow">→</span>
                    </div>
                    {tip.title === "Learn Essential Tools" ? (
                      expandedTools && (
                        <div className="extras-accordion-content">
                          <ul className="extras-tools-list">
                            {tip.tools.map((tool) => (
                              <li key={tool.name}>
                                <strong>{tool.name}</strong> ({tool.desc}) - {tool.help}
                              </li>
                            ))}
                          </ul>
                          <p className="extras-ai-note"><em>AI Tools Tip:</em> {tip.aiTools}</p>
                        </div>
                      )
                    ) : (
                      expandedPrep[idx] && (
                        <div className="extras-accordion-content">
                          <p>{tip.explanation}</p>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="extras-section-card">
          <h2>Hackathon Constraints & Challenges</h2>
          <ul className="extras-info-list">
            {hackathonConstraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
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

        <div className="extras-section-card">
          <h2>Hackathon Guide & References</h2>
          <p style={{ color: '#b7ffce', marginBottom: '1rem' }}>Learn from industry experts and improve your skills with these curated resources:</p>
          <ul className="extras-resources-list">
            {hackathonResources.map((resource) => (
              <li 
                key={resource.name} 
                className="extras-resource-item"
                onClick={() => window.open(resource.url, '_blank')}
              >
                <strong className="extras-resource-title">{resource.name}</strong>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
