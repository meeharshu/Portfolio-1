'use client';

import { OrbitControls, Sparkles, Stars } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SkillKeyboard } from '@/objects/SkillKeyboard';
import type { SpatialSection } from '@/data/portfolio';

interface MainSceneProps {
  activeSection: SpatialSection;
  onSelect: (section: SpatialSection) => void;
  reducedMotion: boolean;
}

function CameraRig({ activeSection, reducedMotion }: Pick<MainSceneProps, 'activeSection' | 'reducedMotion'>) {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  useEffect(() => {
    const destination = activeSection === 'projects' ? new THREE.Vector3(0, 1.8, 5.4) : new THREE.Vector3(0, 0.5, 7.4);
    if (reducedMotion) {
      camera.position.copy(destination);
      return;
    }
    gsap.to(camera.position, { x: destination.x, y: destination.y, z: destination.z, duration: 1.25, ease: 'power3.inOut' });
    if (controls.current) gsap.to(controls.current.target, { x: 0, y: activeSection === 'about' ? -0.55 : 0, z: 0, duration: 1.25, ease: 'power3.inOut' });
  }, [activeSection, camera, reducedMotion]);

  return <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={5} maxDistance={10} minPolarAngle={Math.PI * 0.28} maxPolarAngle={Math.PI * 0.68} enableDamping dampingFactor={0.06} />;
}

function World({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 16;
      values[i * 3 + 1] = (Math.random() - 0.5) * 9;
      values[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  return (
    <>
      <color attach="background" args={['#070a12']} />
      <fog attach="fog" args={['#070a12', 7, 16]} />
      <ambientLight intensity={0.46} />
      <directionalLight position={[4, 6, 4]} intensity={2.3} color="#e9ece5" />
      <pointLight position={[-5, 1, 2]} intensity={16} distance={8} color="#9db8ff" />
      <pointLight position={[4, -2, -1]} intensity={12} distance={7} color="#d8ff73" />
      <Stars radius={45} depth={20} count={650} factor={1.3} saturation={0} fade speed={0.35} />
      <Sparkles count={70} scale={[10, 5, 7]} size={1.2} speed={0.16} color="#d8ff73" />
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} count={points.length / 3} array={points} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={0.018} color="#e9ece5" transparent opacity={0.5} />
      </points>
      <SkillKeyboard reducedMotion={reducedMotion} />
    </>
  );
}

export function MainScene({ activeSection, onSelect, reducedMotion }: MainSceneProps) {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.5, 7.4], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: false }}>
        <World reducedMotion={reducedMotion} />
        <CameraRig activeSection={activeSection} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
