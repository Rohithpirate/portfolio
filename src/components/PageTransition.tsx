import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

/**
 * Liquid wipe page transition. Animates a metallic gradient overlay
 * that reveals the new page using a circular clip-path wipe.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {children}
        <motion.div
          aria-hidden
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{ clipPath: "circle(0% at 50% 50%)" }}
          exit={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(260 85% 62%), hsl(320 85% 70%), hsl(200 90% 65%), hsl(280 90% 72%), hsl(260 85% 62%))",
            mixBlendMode: "screen",
            opacity: 0.85,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;