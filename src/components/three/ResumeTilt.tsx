import { useRef, useState, ReactNode } from "react";

/**
 * CSS-3D tilt wrapper — lighter than a Canvas per card.
 * Tilts toward the cursor with a paper-curl shadow.
 */
const ResumeTilt = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          setT({ rx: -y * 14, ry: x * 18 });
        }}
        onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 25px 40px hsl(280 90% 40% / 0.35))",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResumeTilt;