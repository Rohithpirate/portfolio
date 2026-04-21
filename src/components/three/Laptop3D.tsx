import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group } from "three";
import { Float } from "@react-three/drei";

const Laptop = () => {
  const group = useRef<any>(null);
  useFrame(({ mouse }) => {
    if (!group.current) return;
    const tx = mouse.x * 0.4;
    const ty = -mouse.y * 0.25;
    group.current.rotation.y += (tx - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (ty - group.current.rotation.x) * 0.05;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.3, 0]}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 0.15, 2]} />
          <meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Screen */}
        <group position={[0, 1, -0.95]} rotation={[-0.18, 0, 0]}>
          <mesh>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#0f0f23" metalness={0.95} roughness={0.2} />
          </mesh>
          {/* Glowing display */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial color="#a78bfa" emissive="#c084fc" emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
          {/* Code lines */}
          {[0.6, 0.3, 0, -0.3, -0.6].map((y, i) => (
            <mesh key={i} position={[-0.6 + (i % 2) * 0.3, y, 0.07]}>
              <planeGeometry args={[1.4 - (i % 3) * 0.3, 0.08]} />
              <meshBasicMaterial color={i % 2 ? "#f472b6" : "#60a5fa"} />
            </mesh>
          ))}
        </group>
        {/* Keyboard hint */}
        <mesh position={[0, 0.08, 0.2]}>
          <boxGeometry args={[2.6, 0.02, 1.2]} />
          <meshStandardMaterial color="#312e81" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
};

const Laptop3D = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 1.2, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#c084fc" />
        <pointLight position={[-5, -2, 5]} intensity={0.8} color="#60a5fa" />
        <pointLight position={[0, 3, 2]} intensity={0.6} color="#f472b6" />
        <Laptop />
      </Suspense>
    </Canvas>
  </div>
);

export default Laptop3D;