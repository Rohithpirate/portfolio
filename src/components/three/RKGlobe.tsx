import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

/* ──────────────────────────────────────────────────────────────────────────
   Texture builders
   - color map: deep night-sky with glowing "continents" + huge RK monogram
   - bump map: greyscale relief so the surface looks physically embossed
   - roughness map: matches bump so RK letters look glossier than land
   ────────────────────────────────────────────────────────────────────────── */

const seed = (n: number) => {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
};

/** Generates a soft "continent" blob path centered around a point */
const drawBlob = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseR: number,
  fill: string,
  jitter = 0.45,
  steps = 18
) => {
  ctx.fillStyle = fill;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = baseR * (1 + (seed(cx + cy + i) - 0.5) * jitter);
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
};

const buildGlobeMaps = () => {
  const w = 2048;
  const h = 1024;

  // ── Color map ───────────────────────────────────────────────
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = w;
  colorCanvas.height = h;
  const c = colorCanvas.getContext("2d")!;

  const bg = c.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#1e1b4b");
  bg.addColorStop(0.5, "#312e81");
  bg.addColorStop(1, "#0b1029");
  c.fillStyle = bg;
  c.fillRect(0, 0, w, h);

  // Faint latitude bands for depth
  for (let i = 0; i < h; i += 4) {
    c.fillStyle = `rgba(255,255,255,${0.015 + Math.sin(i * 0.04) * 0.01})`;
    c.fillRect(0, i, w, 1);
  }

  // Bump + roughness canvases mirror the color map structure
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = w;
  bumpCanvas.height = h;
  const b = bumpCanvas.getContext("2d")!;
  b.fillStyle = "#202028"; // mid-grey base = no displacement
  b.fillRect(0, 0, w, h);

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = w;
  roughCanvas.height = h;
  const r = roughCanvas.getContext("2d")!;
  r.fillStyle = "#888"; // mid roughness everywhere
  r.fillRect(0, 0, w, h);

  // Continent-like blobs
  for (let i = 0; i < 22; i++) {
    const cx = seed(i + 7) * w;
    const cy = 120 + seed(i + 13) * (h - 240);
    const baseR = 30 + seed(i + 19) * 80;

    // Color: vivid violet/pink continents
    const isPink = seed(i + 23) > 0.6;
    const fill = isPink ? "rgba(244, 114, 182, 0.85)" : "rgba(167, 139, 250, 0.85)";
    drawBlob(c, cx, cy, baseR, fill);

    // Add inner highlight
    drawBlob(c, cx + baseR * 0.25, cy - baseR * 0.25, baseR * 0.45, "rgba(255,255,255,0.18)", 0.5);

    // Bump: brighter = raised
    drawBlob(b, cx, cy, baseR, "rgba(255,255,255,0.55)");
    drawBlob(b, cx + baseR * 0.2, cy - baseR * 0.2, baseR * 0.5, "rgba(255,255,255,0.85)");

    // Roughness: continents matte, water glossier
    drawBlob(r, cx, cy, baseR, "rgba(255,255,255,0.9)");
  }

  // Speckled "city lights" stars
  for (let i = 0; i < 600; i++) {
    const x = seed(i + 101) * w;
    const y = seed(i + 211) * h;
    const rad = 0.6 + seed(i + 313) * 1.6;
    c.fillStyle = `rgba(253, 230, 138, ${0.3 + seed(i + 419) * 0.5})`;
    c.beginPath();
    c.arc(x, y, rad, 0, Math.PI * 2);
    c.fill();
  }

  // Equator + meridians (subtle)
  c.strokeStyle = "rgba(255,255,255,0.08)";
  c.lineWidth = 1.5;
  for (let i = 1; i < 8; i++) {
    const y = (h / 8) * i;
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(w, y);
    c.stroke();
  }
  for (let i = 1; i < 16; i++) {
    const x = (w / 16) * i;
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, h);
    c.stroke();
  }

  // ── RK monogram drawn 2× on opposite hemispheres ────────────
  const drawRK = (cx: number, cy: number) => {
    // Color: gradient-filled monogram with glow halo
    const halo = c.createRadialGradient(cx, cy, 20, cx, cy, 320);
    halo.addColorStop(0, "rgba(236, 72, 153, 0.55)");
    halo.addColorStop(0.6, "rgba(236, 72, 153, 0.15)");
    halo.addColorStop(1, "rgba(236, 72, 153, 0)");
    c.fillStyle = halo;
    c.beginPath();
    c.arc(cx, cy, 320, 0, Math.PI * 2);
    c.fill();

    c.font = "900 360px 'Inter', 'Helvetica', sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";

    const lg = c.createLinearGradient(cx - 200, cy - 200, cx + 200, cy + 200);
    lg.addColorStop(0, "#ffffff");
    lg.addColorStop(0.45, "#fde68a");
    lg.addColorStop(1, "#f472b6");

    c.lineWidth = 12;
    c.strokeStyle = "rgba(255,255,255,0.95)";
    c.strokeText("RK", cx, cy);
    c.fillStyle = lg;
    c.fillText("RK", cx, cy);

    // Bump: emboss the letters strongly so they pop in 3D
    b.font = "900 360px 'Inter', 'Helvetica', sans-serif";
    b.textAlign = "center";
    b.textBaseline = "middle";
    b.fillStyle = "rgba(255,255,255,1)";
    b.fillText("RK", cx, cy);
    b.lineWidth = 14;
    b.strokeStyle = "rgba(255,255,255,0.85)";
    b.strokeText("RK", cx, cy);

    // Roughness: letters very glossy
    r.font = "900 360px 'Inter', 'Helvetica', sans-serif";
    r.textAlign = "center";
    r.textBaseline = "middle";
    r.fillStyle = "rgba(0,0,0,1)";
    r.fillText("RK", cx, cy);
  };

  drawRK(w * 0.25, h * 0.5);
  drawRK(w * 0.75, h * 0.5);

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  colorTex.colorSpace = THREE.SRGBColorSpace;
  colorTex.anisotropy = 8;

  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  bumpTex.anisotropy = 4;

  const roughTex = new THREE.CanvasTexture(roughCanvas);
  roughTex.anisotropy = 4;

  return { colorTex, bumpTex, roughTex };
};

const useGlobeMaps = () => useMemo(() => buildGlobeMaps(), []);

/* ──────────────────────────────────────────────────────────────────────────
   Components
   ────────────────────────────────────────────────────────────────────────── */

const Globe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const { colorTex, bumpTex, roughTex } = useGlobeMaps();

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.32;
    if (cloudRef.current) cloudRef.current.rotation.y += dt * 0.08; // subtle parallax
  });

  return (
    // Tilted like Earth's axis for character
    <group rotation={[0.35, 0, 0.18]}>
      <group ref={groupRef}>
        {/* Main globe — color + bump + roughness for true 3D relief */}
        <Sphere args={[1.5, 128, 128]}>
          <meshStandardMaterial
            map={colorTex}
            bumpMap={bumpTex}
            bumpScale={0.06}
            roughnessMap={roughTex}
            roughness={0.55}
            metalness={0.65}
            emissive="#4c1d95"
            emissiveIntensity={0.22}
          />
        </Sphere>

        {/* Subtle cloud / shimmer layer */}
        <Sphere ref={cloudRef} args={[1.515, 96, 96]}>
          <meshStandardMaterial
            color="#a78bfa"
            transparent
            opacity={0.08}
            roughness={1}
            metalness={0}
            depthWrite={false}
          />
        </Sphere>
      </group>

      {/* Inner glow shell */}
      <Sphere args={[1.58, 64, 64]}>
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>

      {/* Outer atmosphere fresnel — fakes a soft rim light */}
      <Sphere args={[1.78, 64, 64]}>
        <meshBasicMaterial
          color="#f472b6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
};

/** A single satellite that orbits the globe on a tilted ring */
const Satellite = ({
  radius,
  speed,
  size,
  color,
  tilt,
  phase,
}: {
  radius: number;
  speed: number;
  size: number;
  color: string;
  tilt: [number, number, number];
  phase: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius * 0.15, // small vertical wobble
      Math.sin(t) * radius
    );
    ref.current.rotation.y += 0.02;
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[size, 0]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.15}
            emissive={color}
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
};

const Orbits = () => (
  <>
    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
      <torusGeometry args={[2.15, 0.012, 16, 160]} />
      <meshBasicMaterial color="#c084fc" transparent opacity={0.55} />
    </mesh>
    <mesh rotation={[Math.PI / 1.6, 0.6, 0]}>
      <torusGeometry args={[2.45, 0.01, 16, 160]} />
      <meshBasicMaterial color="#f472b6" transparent opacity={0.45} />
    </mesh>
    <mesh rotation={[Math.PI / 3, -0.4, 0.3]}>
      <torusGeometry args={[2.75, 0.008, 16, 160]} />
      <meshBasicMaterial color="#fde68a" transparent opacity={0.35} />
    </mesh>
  </>
);

interface RKGlobeProps {
  interactive?: boolean;
}

const RKGlobe = ({ interactive = true }: RKGlobeProps) => {
  const isMobile = useIsMobile();
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 48 }}
      dpr={isMobile ? [1, 1.25] : [1, 2]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Lighting — key + fill + rim for a real 3D feel */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 4, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[0, 0, 4]} intensity={0.7} color="#f472b6" />
        {/* Rim back-light */}
        <directionalLight position={[-3, 2, -6]} intensity={0.9} color="#fde68a" />
        {!isMobile && <Environment preset="city" />}

        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
          <Globe />
          <Orbits />
          <Satellite radius={2.15} speed={0.5} size={0.09} color="#c084fc" tilt={[Math.PI / 2.2, 0, 0]} phase={0} />
          <Satellite radius={2.45} speed={-0.35} size={0.07} color="#f472b6" tilt={[Math.PI / 1.6, 0.6, 0]} phase={1.5} />
          <Satellite radius={2.75} speed={0.25} size={0.06} color="#fde68a" tilt={[Math.PI / 3, -0.4, 0.3]} phase={3} />
          {!isMobile && (
            <Satellite radius={2.45} speed={-0.35} size={0.05} color="#a78bfa" tilt={[Math.PI / 1.6, 0.6, 0]} phase={3.8} />
          )}
        </Float>

        {interactive && (
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        )}
      </Suspense>
    </Canvas>
  );
};

export default RKGlobe;