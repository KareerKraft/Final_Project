import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/explore");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-6xl font-bold">
      KAREER KRAFT
    </div>
  );
}