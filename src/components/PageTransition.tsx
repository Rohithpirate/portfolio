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
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;