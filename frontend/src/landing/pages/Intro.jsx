import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../styles/intro.css";

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.set("#logo-group", { xPercent: 0, yPercent: 0 });

    const tl = gsap.timeline();

    tl.to("#hat", {
      rotation: 15,
      duration: 0.5,
      ease: "power1.inOut",
    })
      .add(() => typeText("brand-text", "KAREER KRAFT"))
      .to({}, { duration: 1.5 })
      .to(
        "#logo-group",
        {
          x: "-25vw",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "+=0.2"
      )
      .to(
        "#slogan-text",
        {
          opacity: 1,
          onStart: () =>
            typeText("slogan-text", "EXPLORE YOUR CAREER"),
        },
        "-=0.8"
      );

    // 🔥 Auto fade + redirect after 5 sec
    const timer = setTimeout(() => {
      gsap.to("#intro-container", {
        opacity: 0,
        duration: 1,
        onComplete: () => navigate("/explore"),
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  function typeText(elementId, text) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.innerHTML = "";

    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      el.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        delay: i * 0.08,
      });
    });
  }

  return (
    <div
      id="intro-container"
      onClick={() => navigate("/explore")} // ⚡ click to skip
    >
      <div id="logo-group">
        <div className="logo-stack">
          <img src="/hat.png" id="hat" alt="hat" />
          <img src="/KK_logo.png" id="kk-logo" alt="logo" />
        </div>
        <div id="brand-text" className="bold-text"></div>
      </div>

      <div id="slogan-container">
        <div id="slogan-text" className="bold-text"></div>
      </div>

      {/* Optional buttons (can keep or remove) */}
      <div className="intro-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/jobs")}>
          Apply for Jobs
        </button>
        <button onClick={() => navigate("/login")}>
          Create Resume
        </button>
      </div>
    </div>
  );
}

export default Intro;