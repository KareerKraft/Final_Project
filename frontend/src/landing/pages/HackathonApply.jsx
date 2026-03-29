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
  const [applicationType, setApplicationType] = useState("single");
  const [teamName, setTeamName] = useState("");
  const [participants, setParticipants] = useState([
    { name: "", email: "", phone: "" },
  ]);
  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;
    setUploadFile(file);
    setFileName(file?.name || "");
  }

  function validateParticipants() {
    return participants.every((p) => p.name.trim() && p.email.trim() && p.phone.trim());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!teamName.trim()) {
      toast.error("Please provide a team name or your name.");
      return;
    }

    if (!validateParticipants()) {
      toast.error("Please fill name, email, and phone for all participants.");
      return;
    }

    if (!uploadFile) {
      toast.error("Please upload a project proposal or CV file.");
      return;
    }

    const summary = applicationType === "group" ? `${participants.length} participants` : "single participant";
    toast.success(`Applied for ${hackathon} successfully! ${summary}. File: ${fileName}`);

    setTeamName("");
    setParticipants([{ name: "", email: "", phone: "" }]);
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
            Application Type
            <select
              value={applicationType}
              onChange={(e) => {
                const value = e.target.value;
                setApplicationType(value);
                if (value === "single") {
                  setParticipants([{ name: "", email: "", phone: "" }]);
                }
              }}
              className="extras-input"
            >
              <option value="single">Single Participant Hackathon</option>
              <option value="group">Group/Team Hackathon</option>
            </select>
          </label>

          <label>
            {applicationType === "group" ? "Team Name" : "Participant Name"}
            <input
              className="extras-input"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder={applicationType === "group" ? "Team rock stars" : "Your full name"}
              required
            />
          </label>


          <div className="extras-participant-section">
            <h3>{applicationType === "group" ? "Participants" : "Participant Details"}</h3>
            {participants.map((participant, index) => (
              <div key={`participant-${index}`} className="extras-participant-card">
                <h4>Participant {index + 1}</h4>
                <label>
                  Name
                  <input
                    className="extras-input"
                    value={participant.name}
                    onChange={(e) => {
                      const next = [...participants];
                      next[index].name = e.target.value;
                      setParticipants(next);
                    }}
                    placeholder="Full name"
                    required
                  />
                </label>

                <label>
                  Gmail ID
                  <input
                    type="email"
                    className="extras-input"
                    value={participant.email}
                    onChange={(e) => {
                      const next = [...participants];
                      next[index].email = e.target.value;
                      setParticipants(next);
                    }}
                    placeholder="name@gmail.com"
                    required
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    type="tel"
                    className="extras-input"
                    value={participant.phone}
                    onChange={(e) => {
                      const next = [...participants];
                      next[index].phone = e.target.value;
                      setParticipants(next);
                    }}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </label>
              </div>
            ))}
            {applicationType === "group" && participants.length < 6 && (
              <button
                type="button"
                className="extras-cta-btn"
                onClick={() => setParticipants([...participants, { name: "", email: "", phone: "" }])}
              >
                Add Participant
              </button>
            )}
            {applicationType === "group" && participants.length >= 6 && (
              <p className="extras-note">Maximum of 6 participants reached.</p>
            )}
          </div>

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
