'use client';

import { Html, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface InteractiveObjectProps {
  position: [number, number, number];
  color: string;
  label: string;
  hint: string;
  active?: boolean;
  onSelect: () => void;
}

export function InteractiveObject({ position, color, label, hint, active = false, onSelect }: InteractiveObjectProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetScale = active ? 1.18 : hovered ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.pow(0.001, delta));
    group.current.rotation.y += delta * (hovered ? 0.16 : 0.06);
    group.current.position.y = position[1] + Math.sin(Date.now() * 0.0008 + position[0]) * 0.06;
  });

  return (
    <group
      ref={group}
      position={position}
      onClick={(event) => { event.stopPropagation(); onSelect(); }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <pointLight color={color} intensity={hovered || active ? 1.7 : 0.5} distance={3.4} />
      <Line points={[[0, -0.68, 0], [0.46, -0.16, 0], [0.68, 0.55, 0], [0.1, 0.9, 0], [-0.55, 0.45, 0], [-0.46, -0.16, 0], [0, -0.68, 0]]} color={color} lineWidth={hovered || active ? 3 : 1.5} transparent opacity={active ? 1 : 0.72} />
      <Line points={[[-0.46, -0.16, 0], [0.46, -0.16, 0], [0.1, 0.9, 0], [-0.55, 0.45, 0], [0.68, 0.55, 0], [-0.46, -0.16, 0]]} color={color} lineWidth={hovered || active ? 2 : 1} transparent opacity={0.42} />
      <mesh position={[0, 0.08, 0.04]}>
        <circleGeometry args={[0.12, 20]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 1 : 0.85} />
      </mesh>
      <mesh position={[0, 0.08, -0.02]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[1.75, 1.75]} />
        <meshBasicMaterial color={color} transparent opacity={hovered || active ? 0.06 : 0.018} wireframe />
      </mesh>
      {(hovered || active) && (
        <Html center distanceFactor={7} position={[0, 1.15, 0]}>
          <div className="pointer-events-none w-44 -translate-y-1 rounded-sm border border-white/15 bg-ink/85 px-3 py-2 text-center shadow-panel backdrop-blur-md">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-signal">{hint}</p>
            <p className="mt-1 text-xs font-medium text-paper">{label}</p>
          </div>
        </Html>
      )}
    </group>
  );
}
