import { useNavigate } from "react-router-dom";
import '../styles/Header.css';

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-black to-green-800 text-white flex flex-col items-center justify-center text-center">
      <header className="header">
        <div className="header-content">
          <button className="header-btn" onClick={() => navigate('/aboutus')}>ABOUT US</button>
          <button className="header-btn" onClick={() => navigate('/help')}>HELP</button>
        </div>
      </header>

      <h1 className="text-5xl font-bold mb-6">
        Build Your Career With Confidence
      </h1>

      <p className="max-w-xl mb-8 opacity-80">
        Apply for jobs seamlessly or build professional resumes.
        KareerKraft connects students and recruiters efficiently.
      </p>

      <button
        onClick={() => navigate("/role")}
        className="bg-white text-black px-8 py-3 rounded-full font-semibold"
      >
        Explore
      </button>

    </div>
  );
}