import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group } from "three";
import { Float } from "@react-three/drei";

const PINS = [
  { lat: 12.9, lon: 79.1, label: "Vellore" },
  { lat: 13.08, lon: 80.27, label: "Chennai" },
  { lat: 1.35, lon: 103.8, label: "Singapore" },
  { lat: 37.77, lon: -122.42, label: "SF" },
  { lat: 51.5, lon: -0.12, label: "London" },
];

const toXYZ = (lat: number, lon: number, r = 1.5) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ] as const;
};

const Globe = () => {
  const ref = useRef<any>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[1.5, 48, 48]} />
          <meshStandardMaterial color="#3b0764" wireframe metalness={0.6} roughness={0.3} emissive="#a78bfa" emissiveIntensity={0.3} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.49, 32, 32]} />
          <meshStandardMaterial color="#1e0b3a" transparent opacity={0.4} />
        </mesh>
        {PINS.map((p, i) => {
          const [x, y, z] = toXYZ(p.lat, p.lon);
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color="#f0abfc" emissive="#f472b6" emissiveIntensity={2} toneMapped={false} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const Globe3D = () => (
  <div className="relative h-[320px] w-full">
    <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#c084fc" />
        <pointLight position={[-5, -3, 3]} intensity={0.7} color="#60a5fa" />
        <Globe />
      </Suspense>
    </Canvas>
  </div>
);

export default Globe3D;