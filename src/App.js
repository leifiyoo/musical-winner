import React, { useEffect, useState } from "react";
import { LiquidMetal } from '@paper-design/shaders-react';

const SOCIAL_LINKS = [
  {
    name: "Apple Music",
    href: "https://music.apple.com/profile/yoleiyyo",
    description: "My current rotation and favorite tracks.",
    brandClass: "brand-apple",
  },
  {
    name: "X",
    href: "https://x.com/leifiyo",
    description: "Random thoughts and retweets.",
    brandClass: "brand-x",
  },
  {
    name: "GitHub",
    href: "https://github.com/leifiyoo",
    description: "Just my personal repositories.",
    brandClass: "brand-github",
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com/add/yoleiyyo",
    description: "Daily snaps and stories.",
    brandClass: "brand-snapchat",
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
  const [isLoaded, setIsLoaded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoWidth = Math.min(windowWidth * 0.85, 600);
  const logoHeight = logoWidth * 0.25;

  useEffect(() => {
    // Show content immediately, don't block FCP
    setIsLoaded(true);
  }, []);

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
    }, 1500); // Verzögerung für das "redirecting..." Overlay
  };

  return (
    <div className={`page-shell ${isLoaded ? "is-loaded" : ""}`}>
      {/* Initial Page Load Overlay */}
      { !isLoaded && (
        <div className={`initial-load-overlay`} aria-hidden="true">
          <span className="redirect-spinner"></span>
        </div>
      )}

      <div className={`page-transition-overlay ${isNavigating ? "is-navigating" : ""}`} aria-hidden="true">
        <div className="redirect-content">
          <span className="redirect-spinner"></span>
          <span className="redirect-text">redirecting...</span>
        </div>
      </div>
      <div className="ambient-layer" aria-hidden="true" />

      {/* Instagram Modal */}
      {showInsta && (
        <div className="modal-backdrop" onClick={() => setShowInsta(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Select Profile</h3>
            <button className="modal-close" aria-label="Close" onClick={() => setShowInsta(false)}>✕</button>
            <div className="modal-options">
              <a 
                href="https://instagram.com/leifiyo" 
                onClick={(e) => {
                  setShowInsta(false);
                  handleNavigate(e, "https://instagram.com/leifiyo");
                }}
                className="insta-option brand-insta-secondary"
                aria-label="Public Feed"
              >
                <span>Public Feed</span>
                <span className="insta-option-icon">↗</span>
              </a>
              <a 
                href="https://instagram.com/leifiyo.vip" 
                onClick={(e) => {
                  setShowInsta(false);
                  handleNavigate(e, "https://instagram.com/leifiyo.vip");
                }}
                className="insta-option brand-insta-secondary"
                aria-label="Private Feed"
              >
                <span>Private</span>
                <span className="insta-option-icon">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="main-container">
        <header className="hero-header reveal-base" data-reveal style={{ "--index": 0 }}>
          <div className="hero-header-inner">
            <div className="name-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0' }}>
              <div style={{ width: logoWidth, height: logoHeight, position: "relative" }}>
                <LiquidMetal
                  width={logoWidth}
                  height={logoHeight}
                  image="/leifiyoTEXT.png"
                  colorBack="#00000000"
                  colorTint="#ffffff"
                  shape={undefined}
                  repetition={2}
                  softness={0.1}
                  shiftRed={0.3}
                  shiftBlue={0.3}
                  distortion={0.07}
                  contour={0.4}
                  angle={70}
                  speed={1}
                  scale={1.3}
                  fit="contain"
                />
              </div>
            </div>
            <a className="hero-mail" href="mailto:hi@leifiyo.dev" style={{ marginTop: '0.5rem' }}>
              hi@leifiyo.dev
            </a>
          </div>
        </header>

        <section className="social-grid">
          <div 
            className="social-card brand-insta reveal-base"
            onClick={() => setShowInsta(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowInsta(true)}
            data-reveal
            style={{ "--index": 1 }}
          >
            <div className="social-card-inner">
              <div className="social-icon-wrapper">
                <h2 className="social-name">Instagram</h2>
              </div>
              <p className="social-copy">Photos & random moments. Tap to select profile.</p>
              <span className="social-cta">Open Profiles</span>
            </div>
          </div>

          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={social.name}
              className={`social-card brand-base ${social.brandClass} reveal-base`}
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
        </section>

        <footer className="footnote reveal-base" data-reveal style={{ "--index": SOCIAL_LINKS.length + 2 }}>
          <p>© {new Date().getFullYear()} leifiyo</p>
          <a href="https://leifiyo.dev" onClick={(e) => handleNavigate(e, "https://leifiyo.dev")} aria-label="Visit leifiyo.dev">
            leifiyo.dev
          </a>
        </footer>
      </main>
    </div>
  );
}
