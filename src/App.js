import React, { useEffect, useState } from "react";
import { LiquidMetal } from '@paper-design/shaders-react';

const SOCIAL_LINKS = [
  {
    name: "Apple Music",
    href: "https://music.apple.com/profile/yoleiyyo",
    brand: "appleMusic",
    brandClass: "brand-apple",
  },
  {
    name: "X",
    href: "https://x.com/leifiyo",
    brand: "x",
    brandClass: "brand-x",
  },
  {
    name: "GitHub",
    href: "https://github.com/leifiyoo",
    brand: "github",
    brandClass: "brand-github",
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com/add/yoleiyyo",
    brand: "snapchat",
    brandClass: "brand-snapchat",
  }
];

function BrandLogo({ brand, name }) {
  const common = { className: "social-logo-icon", "aria-hidden": "true", focusable: false };

  if (brand === "instagram") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (brand === "appleMusic") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path fill="currentColor" d="M15.9 4.2v9.8a3.4 3.4 0 1 1-1.8-3V7.3l-6.6 1.4v7.3a3.4 3.4 0 1 1-1.8-3V7.1c0-.8.5-1.4 1.2-1.6l7.9-1.7a1.3 1.3 0 0 1 1 .2c.3.2.5.6.5 1Z" />
      </svg>
    );
  }

  if (brand === "x") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path fill="currentColor" d="M18.8 4h-2.6l-3.8 4.8L8.5 4H4l6 8-6.4 8h2.6l4.2-5.2 4 5.2H19l-6.2-8L18.8 4Z" />
      </svg>
    );
  }

  if (brand === "github") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path fill="currentColor" d="M12 2.3a9.8 9.8 0 0 0-3.1 19.1c.5.1.6-.2.6-.5v-1.9c-2.5.5-3-1.1-3-1.1-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2-.2-4.1-1-4.1-4.5 0-1 .4-1.9 1.1-2.6-.1-.2-.5-1.2.1-2.5 0 0 .9-.3 2.8 1a9.4 9.4 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .6 1.3.2 2.3.1 2.5.7.7 1.1 1.6 1.1 2.6 0 3.5-2.1 4.3-4.1 4.5.4.3.8 1 .8 2v3c0 .3.1.6.6.5A9.8 9.8 0 0 0 12 2.3Z" />
      </svg>
    );
  }

  if (brand === "snapchat") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path fill="currentColor" d="M12 3.6c2.6 0 4.7 2 4.7 4.5v2.1c0 .5.3 1 .8 1.2.4.2.8.4 1.2.5.3.1.4.5.2.7-.3.3-.8.6-1.5.8-.2.1-.3.3-.2.5.3 1.1 1.1 2 2.3 2.4.2.1.3.3.2.5-.2.5-.8.8-1.5.9-.6.1-1.2.2-1.8.5-.5.2-.9.6-1.2 1.1-.1.2-.3.3-.5.3-.5 0-1-.2-1.4-.4a5 5 0 0 0-4.6 0c-.4.2-.9.4-1.4.4-.2 0-.4-.1-.5-.3a2.6 2.6 0 0 0-1.2-1.1c-.6-.3-1.2-.4-1.8-.5-.7-.1-1.3-.4-1.5-.9-.1-.2 0-.4.2-.5 1.2-.4 2-1.3 2.3-2.4.1-.2 0-.4-.2-.5-.7-.2-1.2-.5-1.5-.8-.2-.2-.1-.6.2-.7.4-.1.8-.3 1.2-.5.5-.2.8-.7.8-1.2V8.1c0-2.5 2.1-4.5 4.7-4.5Z" />
      </svg>
    );
  }

  return <span aria-hidden="true">{name.slice(0, 1)}</span>;
}

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

  const logoWidth = Math.min(windowWidth * 0.95, 1100);
  const logoHeight = logoWidth * 0.38;

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

      <main className="main-container" style={{ justifyContent: 'center', minHeight: '100vh', padding: '0' }}>
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

          </div>
        </header>


      </main>
    </div>
  );
}
