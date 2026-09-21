'use client';

import { Line, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { InteractiveObject } from '@/objects/InteractiveObject';
import { SkillKeyboard } from '@/objects/SkillKeyboard';
import type { SpatialSection } from '@/data/portfolio';

interface MainSceneProps {
  activeSection: SpatialSection;
  onSelect: (section: SpatialSection) => void;
  reducedMotion: boolean;
}

const sectionPositions: Record<'explore' | 'projects' | 'timeline' | 'about', [number, number, number]> = {
  explore: [-2.8, 0.1, 0],
  projects: [0, 0.6, -0.25],
  timeline: [2.8, 0.1, 0],
  about: [0, -1.7, 0.3],
};

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
      <gridHelper args={[16, 16, '#364039', '#1d241f']} position={[0, -2.45, 0]} rotation={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#111312" transparent opacity={0.7} />
      </mesh>
      <Line points={[[-5, 1.8, -3], [-2.6, 0.7, -3.8], [0, 1.4, -4.2], [2.8, 0.35, -3.6], [5, 1.5, -3]]} color="#758574" lineWidth={0.8} transparent opacity={0.22} />
      <Line points={[[-4.5, -0.4, -2.7], [-2.2, 0.3, -3.5], [0.5, -0.2, -4], [3.4, 0.55, -3.3], [4.8, -0.5, -2.7]]} color="#d8ff73" lineWidth={0.5} transparent opacity={0.16} />
    </>
  );
}

function SceneObjects({ activeSection, onSelect }: Pick<MainSceneProps, 'activeSection' | 'onSelect'>) {
  const objects = [
    { section: 'explore' as const, label: 'Explore the field', hint: '01 / ORIENT', color: '#8ac6ff' },
    { section: 'projects' as const, label: 'Project constellation', hint: '02 / WORK', color: '#d8ff73' },
    { section: 'timeline' as const, label: 'Follow the line', hint: '03 / TIME', color: '#ff8b67' },
    { section: 'about' as const, label: 'A little context', hint: '04 / ABOUT', color: '#d9a7ff' },
  ];

  return objects.map((object) => (
    <InteractiveObject key={object.section} {...object} position={sectionPositions[object.section]} active={activeSection === object.section} onSelect={() => onSelect(object.section)} />
  ));
}

export function MainScene({ activeSection, onSelect, reducedMotion }: MainSceneProps) {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.5, 7.4], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: false }}>
        <World reducedMotion={reducedMotion} />
        {activeSection !== 'home' && <SceneObjects activeSection={activeSection} onSelect={onSelect} />}
        <CameraRig activeSection={activeSection} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
