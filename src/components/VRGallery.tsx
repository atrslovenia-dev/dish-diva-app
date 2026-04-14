import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Environment } from "@react-three/drei";
import * as THREE from "three";

import akr0086 from "@/assets/gallery/AKR_0086.jpg";
import akr0137 from "@/assets/gallery/AKR_0137.jpg";
import akr0645 from "@/assets/gallery/AKR_0645.jpg";
import akr0613 from "@/assets/gallery/AKR_0613.jpg";
import akr0649 from "@/assets/gallery/AKR_0649.jpg";
import akr0637 from "@/assets/gallery/AKR_0637.jpg";
import akr0152 from "@/assets/gallery/AKR_0152.jpg";
import akr0010 from "@/assets/gallery/AKR_0010.jpg";

interface ArtPiece {
  src: string;
  title: string;
  artist: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
}

const artworks: ArtPiece[] = [
  // Back wall
  { src: akr0086, title: "Krožni svet", artist: "Klavdij Tutta", position: [-2.5, 1.6, -4.9], rotation: [0, 0, 0], scale: [1.8, 1.8] },
  { src: akr0137, title: "Solarni krog", artist: "Klavdij Tutta", position: [2.5, 1.6, -4.9], rotation: [0, 0, 0], scale: [1.8, 1.8] },
  // Left wall
  { src: akr0645, title: "Abstraktna modrina", artist: "Galerijska zbirka", position: [-4.9, 1.6, -2], rotation: [0, Math.PI / 2, 0], scale: [1.6, 1.2] },
  { src: akr0613, title: "Sinica", artist: "K. K. Lina", position: [-4.9, 1.6, 2], rotation: [0, Math.PI / 2, 0], scale: [1.4, 1.4] },
  // Right wall
  { src: akr0649, title: "Keramična ploskev", artist: "Galerijska zbirka", position: [4.9, 1.6, -2], rotation: [0, -Math.PI / 2, 0], scale: [1.4, 1.4] },
  { src: akr0637, title: "Morski spomin", artist: "Galerijska zbirka", position: [4.9, 1.6, 2], rotation: [0, -Math.PI / 2, 0], scale: [1.6, 1.2] },
  // Front wall (behind camera start)
  { src: akr0152, title: "Mestni utrip", artist: "Galerijska zbirka", position: [-2.5, 1.6, 4.9], rotation: [0, Math.PI, 0], scale: [1.6, 1.2] },
  { src: akr0010, title: "Modri horizont", artist: "Galerijska zbirka", position: [2.5, 1.6, 4.9], rotation: [0, Math.PI, 0], scale: [1.6, 1.2] },
];

function Painting({ art }: { art: ArtPiece }) {
  const texture = useLoader(THREE.TextureLoader, art.src);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<THREE.Group>(null);

  const frameW = art.scale[0] + 0.15;
  const frameH = art.scale[1] + 0.15;

  return (
    <group
      ref={frameRef}
      position={art.position}
      rotation={art.rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Frame */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[frameW, frameH, 0.04]} />
        <meshStandardMaterial color={hovered ? "#8B7355" : "#3a3028"} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Canvas */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={art.scale} />
        <meshStandardMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Label */}
      {hovered && (
        <group position={[0, -(art.scale[1] / 2 + 0.25), 0.05]}>
          <mesh>
            <planeGeometry args={[1.6, 0.3]} />
            <meshBasicMaterial color="#1a1a1a" transparent opacity={0.85} />
          </mesh>
          <Text
            position={[0, 0.04, 0.01]}
            fontSize={0.09}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {art.title}
          </Text>
          <Text
            position={[0, -0.08, 0.01]}
            fontSize={0.065}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {art.artist}
          </Text>
        </group>
      )}
    </group>
  );
}

function GalleryRoom() {
  const floorTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#2a2520";
    ctx.fillRect(0, 0, 512, 512);
    // Wood grain lines
    for (let i = 0; i < 512; i += 32) {
      ctx.strokeStyle = `rgba(60, 50, 40, ${0.3 + Math.random() * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i + (Math.random() - 0.5) * 8);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} roughness={0.6} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.9} />
      </mesh>
      {/* Walls */}
      {/* Back */}
      <mesh position={[0, 1.6, -5]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#faf8f5" roughness={0.85} />
      </mesh>
      {/* Front */}
      <mesh position={[0, 1.6, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#faf8f5" roughness={0.85} />
      </mesh>
      {/* Left */}
      <mesh position={[-5, 1.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#f5f2ee" roughness={0.85} />
      </mesh>
      {/* Right */}
      <mesh position={[5, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#f5f2ee" roughness={0.85} />
      </mesh>

      {/* Ceiling lights (track lighting effect) */}
      {artworks.map((art, i) => (
        <pointLight
          key={i}
          position={[art.position[0], 3, art.position[2] + (art.rotation[1] === 0 ? 0.8 : art.rotation[1] === Math.PI ? -0.8 : 0)]}
          intensity={0.8}
          distance={4}
          color="#fff5e6"
        />
      ))}

      {/* Ambient fill */}
      <ambientLight intensity={0.35} color="#ffeedd" />

      {/* Artworks */}
      {artworks.map((art, i) => (
        <Painting key={i} art={art} />
      ))}
    </group>
  );
}

function AutoRotate() {
  const controlsRef = useRef<any>(null);
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.4;
      controlsRef.current.update();
    }
  });
  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={1}
      maxDistance={4}
      minPolarAngle={Math.PI * 0.3}
      maxPolarAngle={Math.PI * 0.65}
      target={[0, 1.5, 0]}
      autoRotate
      autoRotateSpeed={0.4}
    />
  );
}

interface VRGalleryProps {
  className?: string;
}

const VRGallery = ({ className = "" }: VRGalleryProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1.6, 3.5], fov: 60 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <Suspense fallback={null}>
          <GalleryRoom />
          <AutoRotate />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VRGallery;
