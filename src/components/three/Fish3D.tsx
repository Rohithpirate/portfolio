import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Group, MathUtils } from "three";

type FishCfg = { color: string; emissive: string; speed: number; radius: number; offset: number; y: number; scale: number };

const Fish = ({ cfg }: { cfg: FishCfg }) => {
  const group = useRef<Group>(null);
  const tail = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * cfg.speed + cfg.offset;
    if (group.current) {
      group.current.position.x = Math.cos(t) * cfg.radius;
      group.current.position.z = Math.sin(t) * cfg.radius * 0.6;
      group.current.position.y = cfg.y + Math.sin(t * 2) * 0.2;
      group.current.rotation.y = -t + Math.PI / 2;
    }
    if (tail.current) tail.current.rotation.y = Math.sin(clock.getElapsedTime() * 8) * 0.5;
  });
  return (
    <group ref={group} scale={cfg.scale}>
      {/* body */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 12]} />
        <meshStandardMaterial color={cfg.color} emissive={cfg.emissive} emissiveIntensity={0.6} metalness={0.6} roughness={0.3} toneMapped={false} />
      </mesh>
      {/* head bulge */}
      <mesh position={[0.25, 0, 0]} scale={[1, 0.8, 0.8]}>
        <sphereGeometry args={[0.25, 12, 10]} />
        <meshStandardMaterial color={cfg.color} emissive={cfg.emissive} emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
      {/* tail */}
      <group ref={tail} position={[-0.4, 0, 0]}>
        <mesh rotation={[0, 0, 0]} position={[-0.15, 0, 0]}>
          <coneGeometry args={[0.25, 0.5, 4]} />
          <meshStandardMaterial color={cfg.emissive} emissive={cfg.emissive} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      </group>
      {/* eye */}
      <mesh position={[0.4, 0.08, 0.18]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const Fish3D = () => {
  const fish = useMemo<FishCfg[]>(
    () => [
      { color: "#c084fc", emissive: "#a855f7", speed: 0.3, radius: 4, offset: 0, y: 0.5, scale: 1 },
      { color: "#f472b6", emissive: "#ec4899", speed: 0.25, radius: 3.2, offset: 2, y: -0.6, scale: 0.85 },
      { color: "#60a5fa", emissive: "#3b82f6", speed: 0.35, radius: 4.5, offset: 4, y: 1.2, scale: 0.7 },
      { color: "#f0abfc", emissive: "#d946ef", speed: 0.22, radius: 2.8, offset: 1, y: -1.4, scale: 0.6 },
    ],
    []
  );
  return (
    <div className="fixed inset-0 -z-[4] pointer-events-none" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.25]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 5, 5]} intensity={1.2} color="#c084fc" />
          <pointLight position={[-5, -3, 0]} intensity={0.6} color="#60a5fa" />
          <fog attach="fog" args={["#1e0b3a", 5, 12]} />
          {fish.map((f, i) => <Fish key={i} cfg={f} />)}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Fish3D;