import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Builds a CanvasTexture that wraps around the sphere:
 * - deep night-sky base with subtle gradient
 * - faint dotted "continent" pattern for a globe feel
 * - large "RK" monogram repeated at two anchor points so it's
 *   always visible somewhere as the globe spins
 */
const useRKGlobeTexture = () =>
  useMemo(() => {
    const w = 2048;
    const h = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    // Background gradient (deep purple → blue)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#1e1b4b");
    grad.addColorStop(0.5, "#312e81");
    grad.addColorStop(1, "#0f172a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dotted "continents" — randomized soft dots
    const seed = (n: number) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };
    ctx.fillStyle = "rgba(192, 132, 252, 0.35)";
    for (let i = 0; i < 1400; i++) {
      const x = seed(i + 1) * w;
      const y = seed(i + 7) * h;
      const r = 1 + seed(i + 13) * 2.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Highlight dots
    ctx.fillStyle = "rgba(244, 114, 182, 0.5)";
    for (let i = 0; i < 220; i++) {
      const x = seed(i + 101) * w;
      const y = seed(i + 211) * h;
      const r = 1.5 + seed(i + 313) * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Equator and meridian lines
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    for (let i = 1; i < 8; i++) {
      const y = (h / 8) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let i = 1; i < 16; i++) {
      const x = (w / 16) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // RK monogram — drawn twice on opposite sides so it's always visible
    const drawRK = (cx: number, cy: number) => {
      // soft glow disc behind the letters
      const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 260);
      glow.addColorStop(0, "rgba(236, 72, 153, 0.55)");
      glow.addColorStop(1, "rgba(236, 72, 153, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "bold 320px 'Inter', 'Helvetica', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // letter gradient
      const lg = ctx.createLinearGradient(cx - 160, cy - 160, cx + 160, cy + 160);
      lg.addColorStop(0, "#ffffff");
      lg.addColorStop(0.5, "#fde68a");
      lg.addColorStop(1, "#f472b6");

      // outline
      ctx.lineWidth = 8;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.strokeText("RK", cx, cy);

      // fill
      ctx.fillStyle = lg;
      ctx.fillText("RK", cx, cy);
    };

    drawRK(w * 0.25, h * 0.5);
    drawRK(w * 0.75, h * 0.5);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

const RotatingGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useRKGlobeTexture();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main globe with RK texture */}
      <Sphere args={[1.5, 96, 96]}>
        <meshStandardMaterial
          map={texture}
          metalness={0.55}
          roughness={0.35}
          emissive="#4c1d95"
          emissiveIntensity={0.18}
        />
      </Sphere>

      {/* Subtle outer atmosphere glow */}
      <Sphere args={[1.62, 64, 64]}>
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const Orbits = () => {
  return (
    <>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 128]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, 0.6, 0]}>
        <torusGeometry args={[2.4, 0.01, 16, 128]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.45} />
      </mesh>
    </>
  );
};

interface RKGlobeProps {
  interactive?: boolean;
}

const RKGlobe = ({ interactive = true }: RKGlobeProps) => {
  const isMobile = useIsMobile();
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={isMobile ? [1, 1.25] : [1, 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 3, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#a78bfa" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#f472b6" />
        {!isMobile && <Environment preset="city" />}

        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
          <RotatingGlobe />
          <Orbits />
        </Float>

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        )}
      </Suspense>
    </Canvas>
  );
};

export default RKGlobe;