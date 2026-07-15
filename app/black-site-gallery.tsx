"use client";

import { useEffect, useState } from "react";

const galleryImages = Array.from({ length: 19 }, (_, index) => ({
  src: `/black-site-gallery/Screenshot%20${index + 1}.jpg`,
  alt: `Black Site gallery image ${index + 1}`,
}));

export function BlackSiteGallery() {
  const [current, setCurrent] = useState(0);

  const previous = () => setCurrent((index) => (index - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setCurrent((index) => (index + 1) % galleryImages.length);

  useEffect(() => {
    const timer = window.setTimeout(next, 5000);
    return () => window.clearTimeout(timer);
  }, [current]);

  return (
    <div className="blacksite-gallery" aria-label="Black Site gallery">
      <div className="blacksite-gallery-frame" aria-live="polite">
        <img src={galleryImages[current].src} alt={galleryImages[current].alt} />
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
            <img src={image.src} alt="" />
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
