import { useNavigate } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-black to-green-800 text-white">
      <header className="p-4">
        <h2
          className="text-2xl font-bold cursor-pointer"
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
        >
          Explore features
        </h2>
      </header>

      <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
        <h1 className="text-5xl font-bold mb-6">
          Build Your Career With Confidence
        </h1>

        <p className="max-w-xl mb-8 opacity-80">
          Apply for jobs seamlessly or build professional resumes.
          KareerKraft connects students and recruiters efficiently.
        </p>

        <div id="features" className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/jobs")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Apply for Jobs
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Create Resume
          </button>

          <button
            onClick={() => navigate("/browse")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Browse Companies
          </button>
        </div>
      </div>
    </div>
  );
}