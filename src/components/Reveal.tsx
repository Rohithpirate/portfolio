import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

interface RevealProps {
  children: ReactNode;
  /** Animation entrance direction */
  direction?: Direction;
  /** Delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Travel distance in pixels */
  distance?: number;
  className?: string;
  /** When true, replays each time the element enters the viewport */
  replay?: boolean;
  /** Viewport amount that must be visible to trigger (0-1) */
  amount?: number;
}

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  fade: {},
  scale: { scale: 0.9 },
};

/**
 * Lightweight scroll-reveal wrapper using framer-motion's whileInView.
 * Respects prefers-reduced-motion automatically.
 */
const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance,
  className,
  replay = false,
  amount = 0.2,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const o = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: distance && o.x ? Math.sign(o.x) * distance : o.x ?? 0,
      y: distance && o.y ? Math.sign(o.y) * distance : o.y ?? 0,
      scale: o.scale ?? 1,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !replay, amount }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;