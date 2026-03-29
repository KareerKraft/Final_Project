import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../styles/Intro.css";

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.set("#logo-group", { xPercent: 0, yPercent: 0 });

    const tl = gsap.timeline();

    tl.add(() => typeWords("brand-text", ["KAREER", "KRAFT"]))
      .to({}, { duration: 1.5 })
      .to(
        "#logo-group",
        {
          x: "-15vw",
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

  function typeText(elementId, text, startDelay = 0) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const word = document.createElement("span");
    word.style.whiteSpace = "pre";
    el.appendChild(word);

    const letters = text.split("");
    letters.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      word.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        delay: startDelay + i * 0.08,
      });
    });

    return startDelay + letters.length * 0.08;
  }

  function typeWords(elementId, words) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.innerHTML = "";
    let delay = 0;

    words.forEach((w, index) => {
      if (index > 0) {
        const space = document.createElement("span");
        space.textContent = " ";
        space.style.opacity = "1";
        el.appendChild(space);
        delay += 0.2;
      }

      delay = typeText(elementId, w, delay);
    });
  }

  return (
    <div
      id="intro-container"
      onClick={() => navigate("/explore")} // ⚡ click to skip
    >
      <div id="logo-group">
        <img src="/logo.png" id="kk-logo" alt="logo" />
        <div id="brand-text" className="bold-text"></div>
      </div>

      <div id="slogan-container">
        <div id="slogan-text" className="bold-text"></div>
      </div>

      {/* Optional buttons (removed) */}
    </div>
  );
}

export default Intro;