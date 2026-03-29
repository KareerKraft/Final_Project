import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../styles/ExploreExtras.css";

function loadAppliedHackathons() {
  const data = localStorage.getItem("appliedHackathons");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default function HackathonApplied() {
  const [appliedList, setAppliedList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAppliedList(loadAppliedHackathons());
  }, []);

  function clearApplications() {
    localStorage.removeItem("appliedHackathons");
    setAppliedList([]);
    toast.success("Applied hackathons cleared.");
  }

  return (
    <main className="extras-page extras-page-hackathons">
      <section className="extras-hero">
        <span className="extras-tag extras-tag-hackathons">Applied Hackathons</span>
        <h1 className="extras-title">Your Submitted Hackathon Applications</h1>
        <p className="extras-description">
          Track the hackathons you have applied for and review details.
        </p>
      </section>

      <section className="extras-apply-content">
        <div className="extras-section-row">
          <button className="extras-cta-btn" onClick={() => navigate("/hackathons")}>Back to Hackathons</button>
          <button className="extras-secondary-btn" onClick={clearApplications}>Clear History</button>
        </div>

        {appliedList.length === 0 ? (
          <p className="extras-description">No hackathon applications found. Apply first to see them here.</p>
        ) : (
          <div className="extras-section-card">
            <ul className="extras-applied-list">
              {appliedList.map((app) => (
                <li key={app.id} className="extras-applied-item">
                  <h3>{app.hackathon}</h3>
                  <p>
                    <strong>{app.isGroup ? "Group" : "Single"} application</strong>
                    <br />
                    Submitted: {new Date(app.submittedAt).toLocaleString()}
                  </p>
                  <p>Team: {app.teamName}</p>
                  <p>Contact: {app.contactEmail}</p>
                  <p>Github: {app.githubLink || "—"}</p>
                  <p>Proposal: {app.uploadedFile}</p>
                  <p>Idea: {app.ideaSummary}</p>
                  <div className="extras-members-list">
                    <strong>Members:</strong>
                    <ul>
                      {app.groupMembers.map((member, idx) => (
                        <li key={`${member.email}-${idx}`}>
                          {member.name} • {member.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
