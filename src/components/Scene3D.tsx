import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Torus, Icosahedron, Environment } from "@react-three/drei";
import { Suspense } from "react";

interface Scene3DProps {
  variant?: "hero" | "about" | "contact" | "minimal";
  interactive?: boolean;
}

const Scene3D = ({ variant = "hero", interactive = false }: Scene3DProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#c084fc" />
        <directionalLight position={[-5, -5, 5]} intensity={0.6} color="#60a5fa" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#f472b6" />
        <Environment preset="city" />

        {variant === "hero" && (
          <>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
              <Sphere args={[1.4, 64, 64]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                  color="#c084fc"
                  distort={0.6}
                  speed={3}
                  roughness={0.05}
                  metalness={1}
                  emissive="#7c3aed"
                  emissiveIntensity={0.15}
                />
              </Sphere>
            </Float>
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
              <Torus args={[0.6, 0.18, 32, 100]} position={[2.5, 1.2, -1]}>
                <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.2} />
              </Torus>
            </Float>
            <Float speed={1.8} rotationIntensity={1} floatIntensity={2}>
              <Icosahedron args={[0.5, 0]} position={[-2.5, -1, -1]}>
                <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.15} />
              </Icosahedron>
            </Float>
            <Float speed={1.2} rotationIntensity={2.5} floatIntensity={1}>
              <Torus args={[0.35, 0.12, 16, 60]} position={[-2, 1.8, 0]}>
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
              </Torus>
            </Float>
            <Float speed={1.6} rotationIntensity={1.5} floatIntensity={1.8}>
              <Icosahedron args={[0.35, 0]} position={[2, -1.8, 0.5]}>
                <meshStandardMaterial color="#34d399" metalness={0.7} roughness={0.2} />
              </Icosahedron>
            </Float>
          </>
        )}

        {variant === "about" && (
          <>
            <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
              <Icosahedron args={[1.3, 1]} position={[0, 0, 0]}>
                <MeshDistortMaterial color="#a78bfa" distort={0.55} speed={2.5} roughness={0.05} metalness={1} emissive="#6d28d9" emissiveIntensity={0.12} />
              </Icosahedron>
            </Float>
            <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
              <Sphere args={[0.5, 32, 32]} position={[2.2, 1, 0]}>
                <meshStandardMaterial color="#f472b6" metalness={0.8} roughness={0.1} />
              </Sphere>
            </Float>
            <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
              <Torus args={[0.45, 0.15, 24, 80]} position={[-2.2, -1, 0]}>
                <meshStandardMaterial color="#60a5fa" metalness={0.7} roughness={0.2} />
              </Torus>
            </Float>
          </>
        )}

        {variant === "contact" && (
          <>
            <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
              <Torus args={[1.2, 0.35, 32, 100]} position={[0, 0, 0]} rotation={[0.5, 0, 0]}>
                <MeshDistortMaterial color="#f0abfc" distort={0.5} speed={2.5} roughness={0.05} metalness={1} emissive="#a21caf" emissiveIntensity={0.12} />
              </Torus>
            </Float>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[0.4, 32, 32]} position={[2, 1.2, 0]}>
                <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
              </Sphere>
            </Float>
            <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5}>
              <Icosahedron args={[0.4, 0]} position={[-2, -1.2, 0]}>
                <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
              </Icosahedron>
            </Float>
          </>
        )}

        {variant === "minimal" && (
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Icosahedron args={[1, 0]} position={[0, 0, 0]}>
              <MeshDistortMaterial color="#c084fc" distort={0.55} speed={2.5} roughness={0.05} metalness={1} emissive="#7c3aed" emissiveIntensity={0.12} />
            </Icosahedron>
          </Float>
        )}

        {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />}
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;
