import { useEffect, useState } from "react";

interface TypewriterRolesProps {
  roles: string[];
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** ms to hold the full word before deleting */
  holdMs?: number;
  className?: string;
}

/**
 * Cycles through `roles`, typing and deleting one character at a time.
 * Pure frontend, deterministic timers, no extra deps.
 */
const TypewriterRoles = ({
  roles,
  typeSpeed = 80,
  deleteSpeed = 45,
  holdMs = 1400,
  className = "",
}: TypewriterRolesProps) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const current = roles[index % roles.length] ?? "";

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), holdMs);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % roles.length);
      setPhase("typing");
    }
  }, [text, phase, index, roles, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className={className}>
      <span className="gradient-text">{text}</span>
      <span
        aria-hidden
        className="inline-block w-[2px] h-[1em] align-[-0.15em] ml-1 bg-primary animate-pulse"
      />
    </span>
  );
};

export default TypewriterRoles;