import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../styles/ExploreExtras.css";

const hackathonOptions = [
  "CareerSpark: Build to Hire",
  "AI Innovate 48h",
  "GreenTech Challenge",
  "FinDev Hack",
  "EduCoders Jam",
];

export default function HackathonApply() {
  const [hackathon, setHackathon] = useState(hackathonOptions[0]);
  const [teamName, setTeamName] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;
    setUploadFile(file);
    setFileName(file?.name || "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!teamName.trim()) {
      toast.error("Please provide a team name or your name.");
      return;
    }

    if (!uploadFile) {
      toast.error("Please upload a project proposal or CV file.");
      return;
    }

    toast.success(`Applied for ${hackathon} successfully! File: ${fileName}`);
    setTeamName("");
    setFileName("");
    setUploadFile(null);
  }

  return (
    <main className="extras-page extras-page-hackathons">
      <section className="extras-hero">
        <span className="extras-tag extras-tag-hackathons">Hackathon Apply</span>
        <h1 className="extras-title">Submit your hackathon application</h1>
        <p className="extras-description">
          Upload your team details, choose your preferred hackathon, and apply in
          just a few clicks.
        </p>
      </section>

      <section className="extras-apply-content">
        <form className="extras-apply-form" onSubmit={handleSubmit}>
          <label>
            Select Hackathon
            <select
              value={hackathon}
              onChange={(e) => setHackathon(e.target.value)}
              className="extras-input"
            >
              {hackathonOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Team / Participant Name
            <input
              className="extras-input"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Rocket, Jane Doe, etc."
            />
          </label>

          <label>
            Upload Proposal/Resume
            <input
              type="file"
              className="extras-input"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
          </label>

          {fileName && <p className="extras-upload-name">Uploaded: {fileName}</p>}

          <div className="extras-form-actions">
            <button type="submit" className="extras-cta-btn">
              Submit Application
            </button>
            <button
              type="button"
              className="extras-secondary-btn"
              onClick={() => navigate("/hackathons")}
            >
              Back to Hackathons
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
