import { useMemo } from "react";

/**
 * Underwater scene overlay — combines:
 *  1) Swimming fish school (foreground parallax)
 *  2) Floating jellyfish (midground parallax)
 *  3) Bubble streams (rising)
 *  4) Caustic light ripples (atmosphere)
 *  6) Parallax depth layers (foreground/midground/background)
 *  7) Neon koi matching purple/pink/cyan brand palette
 *
 * SVG-based, GPU-friendly, fixed-positioned, pointer-events-none.
 */

type FishProps = {
  delay: number;
  duration: number;
  top: string;
  scale: number;
  hue: string;
  glow: string;
  flip?: boolean;
  layer: "fg" | "mg" | "bg";
};

const NeonKoi = ({ delay, duration, top, scale, hue, glow, flip, layer }: FishProps) => {
  const opacity = layer === "fg" ? 0.95 : layer === "mg" ? 0.7 : 0.45;
  const blur = layer === "bg" ? 1.2 : layer === "mg" ? 0.4 : 0;
  return (
    <div
      className="absolute will-change-transform"
      style={{
        top,
        left: "-15%",
        animation: `swim-across ${duration}s linear ${delay}s infinite`,
        transform: `scale(${scale}) ${flip ? "scaleX(-1)" : ""}`,
        opacity,
        filter: `blur(${blur}px) drop-shadow(0 0 12px ${glow})`,
      }}
      aria-hidden
    >
      <div style={{ animation: "fish-wobble 1.2s ease-in-out infinite" }}>
        <svg width="90" height="44" viewBox="0 0 90 44" fill="none">
          <defs>
            <linearGradient id={`koi-${hue}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={hue} stopOpacity="1" />
              <stop offset="50%" stopColor={glow} stopOpacity="0.95" />
              <stop offset="100%" stopColor={hue} stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id={`koi-eye-${hue}`}>
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor={glow} />
            </radialGradient>
          </defs>
          {/* tail */}
          <path
            d="M5 22 L22 10 L22 34 Z"
            fill={`url(#koi-${hue})`}
            style={{ transformOrigin: "22px 22px", animation: "tail-flick 0.6s ease-in-out infinite" }}
          />
          {/* body */}
          <ellipse cx="50" cy="22" rx="28" ry="11" fill={`url(#koi-${hue})`} />
          {/* fin top */}
          <path d="M40 14 Q48 4 56 14 Z" fill={glow} opacity="0.85" />
          {/* fin bottom */}
          <path d="M40 30 Q48 40 56 30 Z" fill={glow} opacity="0.85" />
          {/* eye */}
          <circle cx="68" cy="20" r="2.5" fill={`url(#koi-eye-${hue})`} />
          <circle cx="68.5" cy="19.5" r="0.9" fill="#000" />
          {/* highlight stripe */}
          <path d="M30 22 Q50 16 72 22" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

const Jellyfish = ({ left, delay, duration, scale, hue }: { left: string; delay: number; duration: number; scale: number; hue: string }) => (
  <div
    className="absolute will-change-transform"
    style={{
      left,
      bottom: "-15%",
      animation: `jelly-rise ${duration}s ease-in-out ${delay}s infinite`,
      transform: `scale(${scale})`,
      filter: `drop-shadow(0 0 18px ${hue})`,
    }}
    aria-hidden
  >
    <div style={{ animation: "jelly-pulse 3s ease-in-out infinite" }}>
      <svg width="70" height="110" viewBox="0 0 70 110" fill="none">
        <defs>
          <radialGradient id={`jelly-${hue}`} cx="0.5" cy="0.4">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="60%" stopColor={hue} stopOpacity="0.55" />
            <stop offset="100%" stopColor={hue} stopOpacity="0.1" />
          </radialGradient>
        </defs>
        {/* dome */}
        <path d="M5 38 Q35 -5 65 38 Q60 50 35 50 Q10 50 5 38 Z" fill={`url(#jelly-${hue})`} />
        {/* inner glow */}
        <ellipse cx="35" cy="35" rx="18" ry="10" fill="#fff" opacity="0.25" />
        {/* tentacles */}
        {[14, 22, 30, 38, 46, 54].map((x, i) => (
          <path
            key={i}
            d={`M${x} 48 Q${x + (i % 2 ? 4 : -4)} 70 ${x} 90 Q${x + (i % 2 ? -3 : 3)} 100 ${x} 108`}
            stroke={hue}
            strokeOpacity="0.55"
            strokeWidth="1.5"
            fill="none"
            style={{ animation: `tentacle ${2 + i * 0.2}s ease-in-out infinite`, transformOrigin: `${x}px 48px` }}
          />
        ))}
      </svg>
    </div>
  </div>
);

const Bubble = ({ left, delay, duration, size }: { left: string; delay: number; duration: number; size: number }) => (
  <div
    className="absolute rounded-full will-change-transform"
    style={{
      left,
      bottom: "-5%",
      width: size,
      height: size,
      background: "radial-gradient(circle at 30% 30%, hsl(0 0% 100% / 0.9), hsl(200 90% 80% / 0.4) 60%, transparent 80%)",
      boxShadow: "inset 0 0 6px hsl(0 0% 100% / 0.6), 0 0 8px hsl(200 90% 75% / 0.35)",
      animation: `bubble-rise ${duration}s linear ${delay}s infinite`,
    }}
    aria-hidden
  />
);

const UnderwaterScene = () => {
  const fish = useMemo(
    () => [
      // Foreground neon koi (large, sharp)
      { top: "18%", duration: 28, delay: 0, scale: 1.1, hue: "hsl(280 90% 72%)", glow: "hsl(320 85% 70%)", layer: "fg" as const },
      { top: "62%", duration: 34, delay: 6, scale: 0.95, hue: "hsl(200 90% 65%)", glow: "hsl(260 85% 62%)", layer: "fg" as const, flip: true },
      // Midground
      { top: "35%", duration: 42, delay: 3, scale: 0.7, hue: "hsl(320 85% 70%)", glow: "hsl(280 90% 72%)", layer: "mg" as const },
      { top: "78%", duration: 48, delay: 12, scale: 0.6, hue: "hsl(260 85% 62%)", glow: "hsl(200 90% 65%)", layer: "mg" as const },
      // Background (small, blurred)
      { top: "8%", duration: 60, delay: 9, scale: 0.45, hue: "hsl(200 90% 65%)", glow: "hsl(280 90% 72%)", layer: "bg" as const, flip: true },
      { top: "50%", duration: 55, delay: 18, scale: 0.4, hue: "hsl(320 85% 70%)", glow: "hsl(260 85% 62%)", layer: "bg" as const },
      { top: "88%", duration: 52, delay: 22, scale: 0.5, hue: "hsl(280 90% 72%)", glow: "hsl(320 85% 70%)", layer: "bg" as const, flip: true },
    ],
    []
  );

  const jellies = useMemo(
    () => [
      { left: "8%", delay: 0, duration: 26, scale: 1, hue: "hsl(280 90% 72%)" },
      { left: "72%", delay: 8, duration: 32, scale: 0.85, hue: "hsl(320 85% 70%)" },
      { left: "45%", delay: 15, duration: 38, scale: 0.6, hue: "hsl(200 90% 65%)" },
    ],
    []
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: `${(i * 5.7) % 100}%`,
        delay: (i * 1.3) % 12,
        duration: 9 + (i % 5) * 2,
        size: 6 + ((i * 3) % 14),
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 -z-[5] overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Caustic light ripples */}
      <div className="caustics-layer" />
      <div className="caustics-layer caustics-layer--alt" />

      {/* Background fish */}
      {fish.filter((f) => f.layer === "bg").map((f, i) => <NeonKoi key={`bg-${i}`} {...f} />)}

      {/* Jellyfish (midground depth) */}
      {jellies.map((j, i) => <Jellyfish key={`j-${i}`} {...j} />)}

      {/* Midground fish */}
      {fish.filter((f) => f.layer === "mg").map((f, i) => <NeonKoi key={`mg-${i}`} {...f} />)}

      {/* Bubbles */}
      {bubbles.map((b, i) => <Bubble key={`b-${i}`} {...b} />)}

      {/* Foreground fish (sharpest, on top) */}
      {fish.filter((f) => f.layer === "fg").map((f, i) => <NeonKoi key={`fg-${i}`} {...f} />)}
    </div>
  );
};

export default UnderwaterScene;
