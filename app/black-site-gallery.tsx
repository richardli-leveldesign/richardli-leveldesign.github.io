"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type GalleryItem = {
  type: "video" | "image";
  src: string;
  thumbnail: string;
  alt: string;
};

const blackSiteGalleryItems: GalleryItem[] = [
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

const killTheMakersGalleryImageNames = [
  "RLi_TGP1_KilltheMakers_Screenshot_03.jpg",
  "RLi_TGP1_KilltheMakers_Screenshot_04.jpg",
  "RLi_TGP1_KilltheMakers_Screenshot_05.jpg",
  "RLi_TGP1_KilltheMakers_Screenshot_06.jpg",
  "RLi_TGP1_KilltheMakers_Screenshot_07.jpg",
  "RLi_TGP1_KilltheMakers_Screenshot_08.jpg",
  "RLi_TGP1_KilltheMakers_Screenshot_09.jpg",
  "HolcombW_TGP1_KilltheMakers_Screenshot_010.jpg",
  "HolcombW_TGP1_KilltheMakers_Screenshot_08.jpg",
  "HolcombW_TGP1_KilltheMakers_Screenshot_09.jpg",
];

const killTheMakersGalleryItems: GalleryItem[] = [
  {
    type: "video" as const,
    src: "/kill-the-makers-walkthrough.mp4",
    thumbnail: "/kill-the-makers-header-capsule.png",
    alt: "Kill the Makers walkthrough video",
  },
  ...killTheMakersGalleryImageNames.map((name, index) => ({
  type: "image" as const,
  src: `/kill-the-makers-gallery/${name}`,
  thumbnail: `/kill-the-makers-gallery/${name}`,
  alt: `Kill the Makers gallery image ${index + 1}`,
  })),
];

const hamsterballinGalleryImageNames = [
  "Hamsterballin 1-player racing.jpg",
  "Hamsterballin 2-player split screen.jpg",
  "Hamsterballin 4-player character select screen.jpg",
  "Hamsterballin 4-player split screen.jpg",
  "Hamsterballin Cabelway Entrance.jpg",
  "Hamsterballin Cableway Track 2.jpg",
  "Hamsterballin Character - Green Solidier.jpg",
  "Hamsterballin D20.jpg",
  "Hamsterballin Hidden Cabelway Entrance.jpg",
  "Hamsterballin Menu Screen.jpg",
  "Hamsterballin Pickup Balls.jpg",
  "Hamsterballin Podium Happy Dance.jpg",
  "Hamsterballin Shield.jpg",
  "Hamsterballin Speed Boost.jpg",
  "Hamsterballin Tack 03 Gatcha Dispenser.jpg",
  "Hamsterballin Track 03 Cabelway Shortcut.jpg",
  "Hamsterballin Track 1 Flythrough.jpg",
  "Hamsterballin Track 2.jpg",
  "Hamsterballin Wavey Road.jpg",
];

const hamsterballinGalleryItems: GalleryItem[] = hamsterballinGalleryImageNames.map((name, index) => ({
  type: "image" as const,
  src: `/hamsterballin-gallery/${encodeURIComponent(name)}`,
  thumbnail: `/hamsterballin-gallery/${encodeURIComponent(name)}`,
  alt: `Hamsterballin' gallery image ${index + 1}: ${name.replace(/^Hamsterballin\s*/, "").replace(/\.jpg$/, "")}`,
}));

export function BlackSiteGallery({ items = blackSiteGalleryItems }: { items?: GalleryItem[] }) {
  const galleryImages = items;
  const [current, setCurrent] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const previous = () => setCurrent((index) => (index - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setCurrent((index) => (index + 1) % galleryImages.length);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    return () => window.cancelAnimationFrame(frame);
  }, []);

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

    if (galleryImages[current].type !== "video" || galleryImages[current].src.startsWith("/")) return;

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
          galleryImages[current].src.startsWith("/") ? (
            <video className="blacksite-gallery-video" controls playsInline preload="metadata" onEnded={next}>
              <source src={galleryImages[current].src} type="video/mp4" />
              Your browser does not support the video player.
            </video>
          ) : (
            <iframe id="blacksite-youtube-player" className="blacksite-gallery-video" src={galleryImages[current].src} title="Black Site video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          )
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

export function KillTheMakersGallery() {
  return <BlackSiteGallery items={killTheMakersGalleryItems} />;
}

export function HamsterballinGallery() {
  return <BlackSiteGallery items={hamsterballinGalleryItems} />;
}
