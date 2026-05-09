import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
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
  id: string;
  src: string;
  title: string;
  artist: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
}

const artworks: ArtPiece[] = [
  { id: "a1", src: akr0086, title: "Krožni svet", artist: "Klavdij Tutta", position: [-2.5, 1.6, -4.9], rotation: [0, 0, 0], scale: [1.8, 1.8] },
  { id: "a2", src: akr0137, title: "Solarni krog", artist: "Klavdij Tutta", position: [2.5, 1.6, -4.9], rotation: [0, 0, 0], scale: [1.8, 1.8] },
  { id: "a3", src: akr0645, title: "Abstraktna modrina", artist: "Galerijska zbirka", position: [-4.9, 1.6, -2], rotation: [0, Math.PI / 2, 0], scale: [1.6, 1.2] },
  { id: "a4", src: akr0613, title: "Sinica", artist: "K. K. Lina", position: [-4.9, 1.6, 2], rotation: [0, Math.PI / 2, 0], scale: [1.4, 1.4] },
  { id: "a5", src: akr0649, title: "Keramična ploskev", artist: "Galerijska zbirka", position: [4.9, 1.6, -2], rotation: [0, -Math.PI / 2, 0], scale: [1.4, 1.4] },
  { id: "a6", src: akr0637, title: "Morski spomin", artist: "Galerijska zbirka", position: [4.9, 1.6, 2], rotation: [0, -Math.PI / 2, 0], scale: [1.6, 1.2] },
  { id: "a7", src: akr0152, title: "Mestni utrip", artist: "Galerijska zbirka", position: [-2.5, 1.6, 4.9], rotation: [0, Math.PI, 0], scale: [1.6, 1.2] },
  { id: "a8", src: akr0010, title: "Modri horizont", artist: "Galerijska zbirka", position: [2.5, 1.6, 4.9], rotation: [0, Math.PI, 0], scale: [1.6, 1.2] },
];

interface PaintingProps {
  art: ArtPiece;
  focused: boolean;
  anyFocused: boolean;
  onFocus: (id: string) => void;
}

function Painting({ art, focused, anyFocused, onFocus }: PaintingProps) {
  const texture = useLoader(THREE.TextureLoader, art.src);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  // Compute "approach viewer" target: move from wall toward room center along wall normal
  const basePos = useMemo(() => new THREE.Vector3(...art.position), [art.position]);
  const focusPos = useMemo(() => {
    // Wall normal points inward (opposite of position direction on its dominant axis)
    const normal = new THREE.Vector3(0, 0, 0);
    if (art.rotation[1] === 0) normal.set(0, 0, 1);            // back wall -> +z
    else if (art.rotation[1] === Math.PI) normal.set(0, 0, -1); // front -> -z
    else if (art.rotation[1] === Math.PI / 2) normal.set(1, 0, 0); // left -> +x
    else normal.set(-1, 0, 0);                                   // right -> -x
    // Approach toward center & slightly toward camera height
    return basePos.clone().add(normal.multiplyScalar(2.2)).setY(1.6);
  }, [art.rotation, basePos]);

  const baseQuat = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(...art.rotation)), [art.rotation]);
  const { camera } = useThree();
  const tmpObj = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = focused ? focusPos : basePos;
    groupRef.current.position.lerp(target, 0.08);

    const targetScale = focused ? 1.35 : 1;
    const s = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.1;
    groupRef.current.scale.setScalar(s);

    // When focused, rotate to face the camera (viewer); otherwise return to wall orientation
    let targetQuat = baseQuat;
    if (focused) {
      tmpObj.position.copy(groupRef.current.position);
      tmpObj.lookAt(camera.position);
      targetQuat = tmpObj.quaternion;
    }
    groupRef.current.quaternion.slerp(targetQuat, 0.1);
  });

  const frameW = art.scale[0] + 0.15;
  const frameH = art.scale[1] + 0.15;
  const dimmed = anyFocused && !focused;

  return (
    <group
      ref={groupRef}
      position={art.position}
      rotation={art.rotation}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onFocus(art.id); }}
    >
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[frameW, frameH, 0.04]} />
        <meshStandardMaterial color={hovered || focused ? "#8B7355" : "#3a3028"} roughness={0.4} metalness={0.3} transparent opacity={dimmed ? 0.35 : 1} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={art.scale} />
        <meshStandardMaterial map={texture} toneMapped={false} transparent opacity={dimmed ? 0.35 : 1} />
      </mesh>
      {(hovered || focused) && (
        <group position={[0, -(art.scale[1] / 2 + 0.25), 0.05]}>
          <mesh>
            <planeGeometry args={[2, 0.36]} />
            <meshBasicMaterial color="#1a1a1a" transparent opacity={0.88} />
          </mesh>
          <Text position={[0, 0.06, 0.01]} fontSize={0.1} color="#ffffff" anchorX="center" anchorY="middle">
            {art.title}
          </Text>
          <Text position={[0, -0.08, 0.01]} fontSize={0.07} color="#cccccc" anchorX="center" anchorY="middle">
            {art.artist}
          </Text>
        </group>
      )}
    </group>
  );
}

function GalleryRoom({ focusedId, setFocusedId }: { focusedId: string | null; setFocusedId: (id: string | null) => void }) {
  const floorTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#2a2520";
    ctx.fillRect(0, 0, 512, 512);
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} onClick={() => setFocusedId(null)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} roughness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.6, -5]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#faf8f5" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.6, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#faf8f5" roughness={0.85} />
      </mesh>
      <mesh position={[-5, 1.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#f5f2ee" roughness={0.85} />
      </mesh>
      <mesh position={[5, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#f5f2ee" roughness={0.85} />
      </mesh>

      {artworks.map((art) => (
        <pointLight
          key={`l-${art.id}`}
          position={[art.position[0], 3, art.position[2] + (art.rotation[1] === 0 ? 0.8 : art.rotation[1] === Math.PI ? -0.8 : 0)]}
          intensity={0.8}
          distance={4}
          color="#fff5e6"
        />
      ))}
      <ambientLight intensity={0.35} color="#ffeedd" />

      {artworks.map((art) => (
        <Painting
          key={art.id}
          art={art}
          focused={focusedId === art.id}
          anyFocused={focusedId !== null}
          onFocus={(id) => setFocusedId(focusedId === id ? null : id)}
        />
      ))}
    </group>
  );
}

function CameraRig({ focusedId }: { focusedId: string | null }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const targetLookAt = useRef(new THREE.Vector3(0, 1.5, 0));

  useFrame(() => {
    if (!controlsRef.current) return;
    if (focusedId) {
      controlsRef.current.autoRotate = false;
      const art = artworks.find((a) => a.id === focusedId);
      if (art) {
        targetLookAt.current.set(art.position[0] * 0.4, 1.6, art.position[2] * 0.4);
      }
    } else {
      controlsRef.current.autoRotate = true;
      targetLookAt.current.set(0, 1.5, 0);
    }
    controlsRef.current.target.lerp(targetLookAt.current, 0.08);
    controlsRef.current.update();
  });

  useEffect(() => {
    camera.position.set(0, 1.6, 3.5);
  }, [camera]);

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
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const focusedArt = artworks.find((a) => a.id === focusedId);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1.6, 3.5], fov: 60 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <Suspense fallback={null}>
          <GalleryRoom focusedId={focusedId} setFocusedId={setFocusedId} />
          <CameraRig focusedId={focusedId} />
        </Suspense>
      </Canvas>

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <div className="pointer-events-auto rounded-full bg-background/70 backdrop-blur-md border border-border px-4 py-2 text-xs text-foreground shadow-lg">
          {focusedArt ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold">{focusedArt.title}</span>
              <span className="opacity-60">— {focusedArt.artist}</span>
              <button
                onClick={() => setFocusedId(null)}
                className="ml-2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs hover:opacity-90 transition"
              >
                Vrni v galerijo
              </button>
            </div>
          ) : (
            <span className="opacity-80">Kliknite na sliko za bližnji ogled · Vlecite za rotacijo · Drsnik za zoom</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VRGallery;
