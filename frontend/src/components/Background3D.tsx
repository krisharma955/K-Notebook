import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Orb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.08;
      // Slight floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 2]} />
      <meshStandardMaterial 
        color="#2b6cb0" 
        wireframe={true} 
        transparent 
        opacity={0.12} 
      />
    </mesh>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-antigravity-900">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#90cdf4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2b6cb0" />
        <Orb />
        <fog attach="fog" args={['#0a0a0a', 5, 12]} />
      </Canvas>
    </div>
  );
};
