import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import { Float } from "@react-three/drei";

const Coin = () => {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 1.4;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.12, 48]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.18} emissive="#a16207" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
};

const MedalCoin = () => (
  <div className="absolute -top-6 -right-3 w-16 h-16 z-10 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#f0abfc" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#fbbf24" />
        <Coin />
      </Suspense>
    </Canvas>
  </div>
);

export default MedalCoin;