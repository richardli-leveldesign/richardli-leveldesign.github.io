"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const galleryImages = [
  {
    type: "video" as const,
    src: "https://www.youtube.com/embed/7fnmoxMbTj8?enablejsapi=1&origin=https%3A%2F%2Frichardli-leveldesign.github.io&rel=0&vq=hd720",
    thumbnail: "https://img.youtube.com/vi/7fnmoxMbTj8/hqdefault.jpg",
    alt: "Black Site video",
  },
  ...Array.from({ length: 19 }, (_, index) => ({
    type: "image" as const,
    src: `/black-site-gallery/Screenshot%20${index + 1}.jpg`,
    thumbnail: `/black-site-gallery/Screenshot%20${index + 1}.jpg`,
    alt: `Black Site gallery image ${index + 1}`,
  })),
];

export function BlackSiteGallery() {
  const [current, setCurrent] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const previous = () => setCurrent((index) => (index - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setCurrent((index) => (index + 1) % galleryImages.length);

  useEffect(() => {
    if (galleryImages[current].type === "video") return;

    const timer = window.setTimeout(() => {
      setCurrent((index) => (index + 1) % galleryImages.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [current, videoPlaying]);

  useEffect(() => {
    setVideoPlaying(false);
    playerRef.current?.destroy?.();
    playerRef.current = null;

    if (galleryImages[current].type !== "video") return;

    const createPlayer = () => {
      if (!window.YT?.Player) return;
      playerRef.current = new window.YT.Player("blacksite-youtube-player", {
        events: {
          onReady: (event: any) => event.target.setPlaybackQuality?.("hd720"),
          onStateChange: (event: any) => {
            if (event.data === 1) setVideoPlaying(true);
            if (event.data === 2) setVideoPlaying(false);
            if (event.data === 0) {
              setVideoPlaying(false);
              setCurrent((index) => (index + 1) % galleryImages.length);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        createPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
    }

    return () => {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [current]);

  return (
    <div className="blacksite-gallery" aria-label="Black Site gallery">
      <div className="blacksite-gallery-frame" aria-live="polite">
        {galleryImages[current].type === "video" ? (
          <iframe id="blacksite-youtube-player" className="blacksite-gallery-video" src={galleryImages[current].src} title="Black Site video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : (
          <img src={galleryImages[current].src} alt={galleryImages[current].alt} />
        )}
        <button className="gallery-arrow gallery-arrow-left" type="button" onClick={previous} aria-label="Previous gallery image">←</button>
        <button className="gallery-arrow gallery-arrow-right" type="button" onClick={next} aria-label="Next gallery image">→</button>
      </div>
      <div className="blacksite-gallery-thumbnails" aria-label="Choose a gallery image">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            className={`gallery-thumbnail${index === current ? " is-active" : ""}`}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show gallery image ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
          >
            <img src={image.thumbnail} alt="" />
          </button>
        ))}
      </div>
      <div className="blacksite-gallery-meta">
        <span>{String(current + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span>
        <span>Auto play</span>
      </div>
    </div>
  );
}
