'use client';

import { Html, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { skills } from '@/data/portfolio';

interface SkillKeyboardProps {
  reducedMotion: boolean;
}

function Key({ label, accent, position, index, reducedMotion }: { label: string; accent: string; position: [number, number, number]; index: number; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const phase = useMemo(() => index * 0.7, [index]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = position[1] + (reducedMotion ? 0 : Math.sin(Date.now() * 0.001 + phase) * 0.025);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5, delta);
    const targetScale = hovered ? 1.08 : 1;
    group.current.scale.x = THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta);
    group.current.scale.y = THREE.MathUtils.damp(group.current.scale.y, targetScale, 6, delta);
    group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, targetScale, 6, delta);
  });

  return (
    <group ref={group} position={position} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}>
      <mesh castShadow>
        <boxGeometry args={[0.92, 0.16, 0.92]} />
        <meshStandardMaterial color={hovered ? accent : '#242b27'} emissive={accent} emissiveIntensity={hovered ? 0.24 : 0.03} roughness={0.34} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.62, 0.015, 0.62]} />
        <meshBasicMaterial color={accent} transparent opacity={hovered ? 0.9 : 0.45} />
      </mesh>
      {hovered && <Html center distanceFactor={7} position={[0, 0.65, 0]}><div className="pointer-events-none rounded border border-signal/40 bg-ink/90 px-3 py-2 text-center shadow-panel backdrop-blur-md"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">{label}</p><p className="mt-1 text-[9px] text-paper/55">skill node / hover to inspect</p></div></Html>}
    </group>
  );
}

export function SkillKeyboard({ reducedMotion }: SkillKeyboardProps) {
  const keys = [...skills, { name: 'GSAP', accent: '#ff8b67' }, { name: 'R3F', accent: '#d9a7ff' }, { name: 'SQL', accent: '#8ac6ff' }, { name: 'UI/UX', accent: '#f6d06f' }];
  return <group rotation={[-0.38, 0.32, -0.1]} position={[1.9, 0.05, -0.2]} scale={1.16}>
    <RoundedBox args={[4.9, 0.3, 3.65]} radius={0.22} smoothness={5} position={[0, -0.2, 0]}>
      <meshStandardMaterial color="#151a24" roughness={0.28} metalness={0.58} />
    </RoundedBox>
    <mesh position={[0, -0.03, 0]}>
      <boxGeometry args={[4.35, 0.08, 3.12]} />
      <meshBasicMaterial color="#273142" transparent opacity={0.8} />
    </mesh>
    {keys.map((skill, index) => { const column = index % 4; const row = Math.floor(index / 4); return <Key key={skill.name} label={skill.name} accent={skill.accent} index={index} reducedMotion={reducedMotion} position={[(column - 1.5) * 1.04, 0.08, (row - 1) * 1.02]} />; })}
  </group>;
}
