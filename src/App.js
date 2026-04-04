import React, { useEffect, useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "Apple Music",
    href: "https://music.apple.com/",
    description: "Latest releases, beats, and curated playlists.",
    isWide: true,
  },
  {
    name: "X",
    href: "https://x.com/leifiyo",
    description: "Quick thoughts, tech, and daily life.",
    isWide: false,
  },
  {
    name: "GitHub",
    href: "https://github.com/leifiyo",
    description: "Open source projects & experiments.",
    isWide: false,
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com/add/leifiyo",
    description: "Daily drops and behind the scenes.",
    isWide: true,
  }
];

function useRevealOnScroll() {
  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");

    if (!revealElements.length) {
      return undefined;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useRevealOnScroll();
  const [showInsta, setShowInsta] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Reset navigation state when coming back to the page via back button
    const handlePageShow = (e) => {
      if (e.persisted) {
        setIsNavigating(false);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleNavigate = (e, url) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      window.location.href = url;
    }, 450); // Matches the CSS transition duration
  };

  return (
    <div className="page-shell">
      <div className={`page-transition-overlay ${isNavigating ? "is-navigating" : ""}`} aria-hidden="true" />
      <div className="ambient-layer" aria-hidden="true" />

      <main className="bento-wrapper">
        <section className="hero-panel reveal-base" data-reveal style={{ "--index": 0 }}>
          <p className="hero-eyebrow">Profile</p>
          <h1 className="hero-title">leifiyo</h1>
          <p className="hero-copy">Minimalist developer, creator, and enthusiast.</p>
          <a className="hero-mail" href="mailto:hi@leifiyo.dev">
            hi@leifiyo.dev
          </a>
        </section>

        <div 
          className="social-card reveal-base social-card-wide"
          onClick={() => setShowInsta(!showInsta)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setShowInsta(!showInsta)}
          data-reveal
          style={{ "--index": 1 }}
        >
          <div className="social-card-inner">
            <div className="social-icon-wrapper">
              <h2 className="social-name">Instagram</h2>
            </div>
            <p className="social-copy">Visual journals. Choose how you want to connect.</p>
            
            {showInsta ? (
              <div className="insta-options" onClick={(e) => e.stopPropagation()}>
                <a 
                  href="https://instagram.com/leifiyo" 
                  onClick={(e) => handleNavigate(e, "https://instagram.com/leifiyo")}
                  className="insta-option"
                >
                  <span>Public Feed</span>
                  <span className="insta-option-icon">↗</span>
                </a>
                <a 
                  href="https://instagram.com/leifiyoprivate" 
                  onClick={(e) => handleNavigate(e, "https://instagram.com/leifiyoprivate")}
                  className="insta-option"
                >
                  <span>Private (Close Friends)</span>
                  <span className="insta-option-icon">↗</span>
                </a>
              </div>
            ) : (
              <span className="social-cta">Expand Options</span>
            )}
          </div>
        </div>

        {SOCIAL_LINKS.map((social, index) => (
          <a
            key={social.name}
            className={`social-card reveal-base ${social.isWide ? "social-card-wide" : ""}`}
            href={social.href}
            onClick={(e) => handleNavigate(e, social.href)}
            aria-label={`${social.name}`}
            data-reveal
            style={{ "--index": index + 2 }}
          >
            <div className="social-card-inner">
              <div className="social-icon-wrapper">
                <h2 className="social-name">{social.name}</h2>
              </div>
              <p className="social-copy">{social.description}</p>
              <span className="social-cta">Visit &#8594;</span>
            </div>
          </a>
        ))}

        <footer className="footnote reveal-base" data-reveal style={{ "--index": SOCIAL_LINKS.length + 2 }}>
          <p>© {new Date().getFullYear()} leifiyo</p>
          <a href="https://leifiyo.dev" onClick={(e) => handleNavigate(e, "https://leifiyo.dev")}>
            leifiyo.dev
          </a>
        </footer>
      </main>
    </div>
  );
}
