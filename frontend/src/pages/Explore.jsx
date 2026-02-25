import { useNavigate } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-black to-green-800 text-white flex flex-col items-center justify-center text-center">

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