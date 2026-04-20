import { useEffect, useRef } from "react";

/**
 * Metallic particle cursor trail. Spawns small gradient orbs that
 * follow the pointer and fade out. Disabled on touch devices.
 */
const CursorTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const container = containerRef.current;
    if (!container) return;

    let lastSpawn = 0;
    const SPAWN_MS = 22;
    const colors = [
      "hsl(260 85% 62%)",
      "hsl(320 85% 70%)",
      "hsl(200 90% 65%)",
      "hsl(280 90% 72%)",
    ];

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < SPAWN_MS) return;
      lastSpawn = now;

      const size = 8 + Math.random() * 14;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dx = (Math.random() - 0.5) * 60;
      const dy = 30 + Math.random() * 40;

      const p = document.createElement("span");
      p.className = "cursor-particle";
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${e.clientX - size / 2}px`;
      p.style.top = `${e.clientY - size / 2}px`;
      p.style.background = `radial-gradient(circle at 30% 30%, hsl(0 0% 100% / 0.9), ${color} 60%, transparent 80%)`;
      p.style.boxShadow = `0 0 12px ${color}`;
      p.style.opacity = "0.9";
      p.style.transform = "translate(0,0) scale(1)";
      p.style.transition = "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease-out";
      container.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
        p.style.opacity = "0";
      });

      window.setTimeout(() => p.remove(), 750);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={containerRef} aria-hidden className="pointer-events-none" />;
};

export default CursorTrail;