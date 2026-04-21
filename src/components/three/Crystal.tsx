import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import { Float, MeshTransmissionMaterial, Octahedron } from "@react-three/drei";

const CrystalMesh = () => {
  const ref = useRef<any>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.6;
      ref.current.rotation.x += dt * 0.3;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1}>
      <Octahedron ref={ref} args={[1, 0]}>
        <MeshTransmissionMaterial
          color="#f0abfc"
          thickness={1.2}
          roughness={0.05}
          transmission={1}
          ior={1.6}
          chromaticAberration={0.6}
          backside
        />
      </Octahedron>
    </Float>
  );
};

const Crystal = () => (
  <div className="absolute top-6 right-6 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none z-10">
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#c084fc" />
        <pointLight position={[-3, -2, 2]} intensity={1.2} color="#60a5fa" />
        <CrystalMesh />
      </Suspense>
    </Canvas>
  </div>
);

export default Crystal;