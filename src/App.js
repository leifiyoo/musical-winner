import React, { useEffect, useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "Apple Music",
    handle: "leifiyo",
    href: "https://music.apple.com/",
    description: "Latest releases, beats, and curated playlists.",
    tone: "red",
    isWide: true,
  },
  {
    name: "X",
    handle: "@leifiyo",
    href: "https://x.com/leifiyo",
    description: "Quick thoughts, tech, and daily life.",
    tone: "gray",
    isWide: false,
  },
  {
    name: "GitHub",
    handle: "leifiyo",
    href: "https://github.com/leifiyo",
    description: "Open source projects & experiments.",
    tone: "blue",
    isWide: false,
  },
  {
    name: "Snapchat",
    handle: "leifiyo",
    href: "https://snapchat.com/add/leifiyo",
    description: "Daily drops and behind the scenes.",
    tone: "yellow",
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

  return (
    <div className="page-shell">
      <div className="ambient-layer" aria-hidden="true" />

      <main className="linktree-wrapper">
        <section className="hero-panel reveal-base" data-reveal style={{ "--index": 0 }}>
          <p className="hero-eyebrow">Profile</p>
          <h1 className="hero-title">leifiyo</h1>
          <p className="hero-copy">Minimalist developer, creator, and enthusiast.</p>
          <a className="hero-mail" href="mailto:hi@leifiyo.dev">
            hi@leifiyo.dev
          </a>
        </section>

        <section className="social-grid" aria-label="Social media links">
          <div 
            className="social-card reveal-base tone-purple social-card-wide"
            onClick={() => setShowInsta(!showInsta)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowInsta(!showInsta)}
            data-reveal
            style={{ "--index": 1 }}
          >
            <div className="social-card-inner">
              <span className="social-tag">Instagram</span>
              <p className="social-handle">@leifiyo</p>
              <p className="social-copy">Visual journals. Choose how you want to connect.</p>
              
              {showInsta ? (
                <div className="insta-options" onClick={(e) => e.stopPropagation()}>
                  <a href="https://instagram.com/leifiyo" target="_blank" rel="noopener noreferrer" className="insta-option">
                    <span>Public Feed</span>
                    <span className="insta-option-icon">↗</span>
                  </a>
                  <a href="https://instagram.com/leifiyoprivate" target="_blank" rel="noopener noreferrer" className="insta-option">
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
              className={`social-card reveal-base tone-${social.tone} ${social.isWide ? "social-card-wide" : ""}`}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${social.name} ${social.handle}`}
              data-reveal
              style={{ "--index": index + 2 }}
            >
              <div className="social-card-inner">
                <span className="social-tag">{social.name}</span>
                <p className="social-handle">{social.handle}</p>
                <p className="social-copy">{social.description}</p>
                <span className="social-cta">View Profile</span>
              </div>
            </a>
          ))}
        </section>

        <footer className="footnote reveal-base" data-reveal style={{ "--index": SOCIAL_LINKS.length + 2 }}>
          <p>© {new Date().getFullYear()} leifiyo</p>
          <a href="https://leifiyo.dev" target="_blank" rel="noreferrer">
            leifiyo.dev
          </a>
        </footer>
      </main>
    </div>
  );
}
