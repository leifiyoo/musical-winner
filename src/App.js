import React, { useEffect } from "react";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@blatt",
    href: "https://instagram.com/blatt",
    description: "Fotos, Reels und kurze Studio-Updates.",
    tone: "blue",
    isWide: true,
  },
  {
    name: "TikTok",
    handle: "@blattmusic",
    href: "https://www.tiktok.com/@blattmusic",
    description: "Kurzclips aus dem Alltag und neue Hooks.",
    tone: "yellow",
    isWide: false,
  },
  {
    name: "YouTube",
    handle: "@blattmusic",
    href: "https://www.youtube.com/@blattmusic",
    description: "Videos, Sessions und komplette Releases.",
    tone: "red",
    isWide: false,
  },
  {
    name: "Spotify",
    handle: "Blatt",
    href: "https://open.spotify.com/",
    description: "Alle Tracks und aktuelle Playlists.",
    tone: "green",
    isWide: true,
  },
  {
    name: "SoundCloud",
    handle: "blatt-studio",
    href: "https://soundcloud.com/",
    description: "Skizzen, Demos und alternative Mixe.",
    tone: "blue",
    isWide: false,
  },
  {
    name: "X",
    handle: "@blattmusic",
    href: "https://x.com/blattmusic",
    description: "Kurze Gedanken, Termine und News.",
    tone: "yellow",
    isWide: false,
  },
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

  return (
    <div className="page-shell">
      <div className="ambient-layer" aria-hidden="true" />

      <main className="linktree-wrapper">
        <section className="hero-panel reveal-base" data-reveal style={{ "--index": 0 }}>
          <p className="hero-eyebrow">Social Hub</p>
          <h1 className="hero-title">blatt</h1>
          <p className="hero-copy">Alle wichtigen Links an einem Ort.</p>
          <a className="hero-mail" href="mailto:hello@blatt.music">
            hello@blatt.music
          </a>
        </section>

        <section className="social-grid" aria-label="Social media links">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={social.name}
              className={`social-card reveal-base tone-${social.tone} ${social.isWide ? "social-card-wide" : ""}`}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${social.name} ${social.handle}`}
              data-reveal
              style={{ "--index": index + 1 }}
            >
              <span className="social-tag">{social.name}</span>
              <p className="social-handle">{social.handle}</p>
              <p className="social-copy">{social.description}</p>
              <span className="social-cta">Link oeffnen</span>
            </a>
          ))}
        </section>

        <footer className="footnote reveal-base" data-reveal style={{ "--index": SOCIAL_LINKS.length + 1 }}>
          <p>Minimal und direkt. Alles auf einer Seite.</p>
          <a href="https://github.com/blatt" target="_blank" rel="noreferrer">
            github.com/blatt
          </a>
        </footer>
      </main>
    </div>
  );
}
