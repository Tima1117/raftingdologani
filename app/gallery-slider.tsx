"use client";
import Image from "next/image";
import { gallery, type Lang } from "./data";

/* Infinite auto-scrolling photo strips (two rows, opposite directions),
   edge-masked, pause on hover, click opens the lightbox. Pure CSS motion. */
export function GallerySlider({ lang, onPhoto }: { lang: Lang; onPhoto: (src: string) => void }) {
  const rowA = gallery.slice(0, 9);
  const rowB = gallery.slice(9);
  const Row = ({ items, dir, dur }: { items: typeof gallery; dir: "l" | "r"; dur: number }) => (
    <div className={`slider-row ${dir}`} style={{ animationDuration: `${dur}s` }}>
      {[...items, ...items].map((g, i) => (
        <button key={`${g.src}-${i}`} className="slider-item" onClick={() => onPhoto(g.src)} aria-label={g.cap[lang]} tabIndex={i < items.length ? 0 : -1}>
          <Image src={g.src} alt={g.cap[lang]} width={g.w} height={g.h} sizes="(max-width: 760px) 60vw, 320px" loading="lazy" />
          <span className="slider-cap">{g.cap[lang]}</span>
        </button>
      ))}
    </div>
  );
  return (
    <div className="slider">
      <Row items={rowA} dir="l" dur={64} />
      <Row items={rowB} dir="r" dur={76} />
    </div>
  );
}
