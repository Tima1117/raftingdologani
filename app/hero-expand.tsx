"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  words: [string, string];
  eyebrow: string;
  headline: ReactNode;
  sub: string;
  rating: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  hint: string;
};

/* Scroll-expansion hero (idea: scroll-expansion-hero from 21st.dev), rewritten on honest
   scroll: no wheel/touch interception, the section is 230vh with a sticky stage and the
   video frame grows from a card to the full viewport as the page scrolls. */
export function ExpandHero({ words, eyebrow, headline, sub, rating, primary, secondary, hint }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const u = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.5 });
  const fixed = useMotionValue(1);
  const p = reduce ? fixed : spring;

  const mobile = vp.w < 760;
  const w0 = mobile ? Math.min(vp.w * 0.74, 300) : Math.min(vp.w * 0.44, 680);
  const h0 = mobile ? w0 * 1.3 : w0 * 0.58;

  const width = useTransform(p, [0, 1], [w0, vp.w]);
  const height = useTransform(p, [0, 1], [h0, vp.h]);
  const radius = useTransform(p, [0, 0.85], [26, 0]);
  const shift = useTransform(p, [0, 0.7], [0, mobile ? vp.w * 0.65 : vp.w * 0.42]);
  const shiftNeg = useTransform(shift, v => -v);
  const titleOp = useTransform(p, [0.4, 0.8], [1, 0]);
  const bgOp = useTransform(p, [0, 0.85], [1, 0]);
  const hintOp = useTransform(p, [0, 0.25], [1, 0]);
  const contentOp = useTransform(p, [0.8, 1], [0, 1]);
  const contentY = useTransform(p, [0.8, 1], [28, 0]);
  const contentEvents = useTransform(contentOp, v => (v > 0.5 ? "auto" : "none"));
  const shade = useTransform(p, [0.4, 1], [0.1, 0.62]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const rotY = useTransform([sx, p], ([x, pr]) => (x as number) * (1 - (pr as number)) * 7);
  const rotX = useTransform([sy, p], ([y, pr]) => -(y as number) * (1 - (pr as number)) * 7);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <section ref={ref} className="xhero" aria-label="Rafting Tour in Dologani">
      <div className="xhero-stage">
        <motion.div className="xhero-bg" style={{ opacity: bgOp }} aria-hidden>
          <div className="xhero-ridge xhero-ridge-a" />
          <div className="xhero-ridge xhero-ridge-b" />
          <div className="xhero-mist" />
        </motion.div>

        <motion.div className="xhero-frame" style={{ width, height, borderRadius: radius, rotateX: rotX, rotateY: rotY }}>
          <video className="xhero-video" src="/video/hero.mp4" poster="/video/hero-poster.jpg" autoPlay muted loop playsInline />
          <motion.div className="xhero-shade" style={{ opacity: shade }} />
        </motion.div>

        <motion.div className="xhero-title" style={{ opacity: titleOp }} aria-hidden>
          <motion.span style={{ x: shiftNeg }}>{words[0]}</motion.span>
          <motion.span style={{ x: shift }}>{words[1]}</motion.span>
        </motion.div>

        <motion.div className="xhero-content" style={{ opacity: contentOp, y: contentY, pointerEvents: contentEvents }}>
          <p className="eyebrow light">{eyebrow}</p>
          <h1 className="xhero-h1">{headline}</h1>
          <p className="xhero-sub">{sub}</p>
          <p className="xhero-rating"><span>★★★★★</span>{rating}</p>
          <div className="xhero-actions">
            <a className="btn btn-amber" href={primary.href}>{primary.label}</a>
            <a className="btn btn-ghost" href={secondary.href} target="_blank" rel="noopener noreferrer">{secondary.label}</a>
          </div>
        </motion.div>

        <motion.div className="xhero-hint" style={{ opacity: hintOp }} aria-hidden>
          <span>{hint}</span>
          <motion.span className="xhero-hint-dot" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>↓</motion.span>
        </motion.div>
      </div>
    </section>
  );
}
