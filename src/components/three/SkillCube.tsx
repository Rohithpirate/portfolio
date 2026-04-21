import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Mesh } from "three";
import { Edges, Float } from "@react-three/drei";

const FACES = [
  { label: "React", color: "#60a5fa" },
  { label: "Python", color: "#fbbf24" },
  { label: "SQL", color: "#34d399" },
  { label: "Excel", color: "#22c55e" },
  { label: "Power BI", color: "#f59e0b" },
  { label: "Figma", color: "#f472b6" },
];

const Cube = ({ hovered }: { hovered: boolean }) => {
  const ref = useRef<any>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const speed = hovered ? 1.6 : 0.4;
    ref.current.rotation.x += dt * speed * 0.6;
    ref.current.rotation.y += dt * speed;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.9} roughness={0.15} emissive="#6d28d9" emissiveIntensity={0.25} />
        <Edges color="#f0abfc" />
      </mesh>
    </Float>
  );
};

const SkillCube = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-[320px] w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#c084fc" />
          <pointLight position={[-5, -3, 3]} intensity={0.7} color="#60a5fa" />
          <Cube hovered={hovered} />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-muted-foreground">
        {FACES.map((f) => f.label).join(" · ")}
      </div>
    </div>
  );
};

export default SkillCube;