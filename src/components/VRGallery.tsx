import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Sky } from "@react-three/drei";
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
  { id: "a1", src: akr0086, title: "Krožni svet", artist: "Klavdij Tutta", position: [-2.5, 1.7, -4.85], rotation: [0, 0, 0], scale: [1.6, 1.6] },
  { id: "a2", src: akr0137, title: "Solarni krog", artist: "Klavdij Tutta", position: [2.5, 1.7, -4.85], rotation: [0, 0, 0], scale: [1.6, 1.6] },
  { id: "a3", src: akr0645, title: "Abstraktna modrina", artist: "Galerijska zbirka", position: [-4.85, 1.7, -2], rotation: [0, Math.PI / 2, 0], scale: [1.5, 1.1] },
  { id: "a4", src: akr0613, title: "Sinica", artist: "K. K. Lina", position: [-4.85, 1.7, 2], rotation: [0, Math.PI / 2, 0], scale: [1.3, 1.3] },
  { id: "a5", src: akr0649, title: "Keramična ploskev", artist: "Galerijska zbirka", position: [4.85, 1.7, -2], rotation: [0, -Math.PI / 2, 0], scale: [1.3, 1.3] },
  { id: "a6", src: akr0637, title: "Morski spomin", artist: "Galerijska zbirka", position: [4.85, 1.7, 2], rotation: [0, -Math.PI / 2, 0], scale: [1.5, 1.1] },
  { id: "a7", src: akr0152, title: "Mestni utrip", artist: "Galerijska zbirka", position: [-2.5, 1.7, 4.85], rotation: [0, Math.PI, 0], scale: [1.5, 1.1] },
  { id: "a8", src: akr0010, title: "Modri horizont", artist: "Galerijska zbirka", position: [2.5, 1.7, 4.85], rotation: [0, Math.PI, 0], scale: [1.5, 1.1] },
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

  const basePos = useMemo(() => new THREE.Vector3(...art.position), [art.position]);
  const baseQuat = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(...art.rotation)), [art.rotation]);
  const { camera } = useThree();
  const tmpObj = useMemo(() => new THREE.Object3D(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const focusTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!groupRef.current) return;

    let target: THREE.Vector3;
    if (focused) {
      camera.getWorldDirection(tmpVec);
      focusTarget.copy(camera.position).add(tmpVec.multiplyScalar(1.1));
      focusTarget.y = camera.position.y - 0.05;
      target = focusTarget;
    } else {
      target = basePos;
    }
    groupRef.current.position.lerp(target, 0.1);

    const targetScale = focused ? 1.5 : 1;
    const s = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.1;
    groupRef.current.scale.setScalar(s);

    let targetQuat = baseQuat;
    if (focused) {
      tmpObj.position.copy(groupRef.current.position);
      tmpObj.lookAt(camera.position);
      targetQuat = tmpObj.quaternion;
    }
    groupRef.current.quaternion.slerp(targetQuat, 0.12);
  });

  const frameW = art.scale[0] + 0.12;
  const frameH = art.scale[1] + 0.12;
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
      {/* Černigoj-style black geometric frame */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[frameW, frameH, 0.04]} />
        <meshStandardMaterial color={hovered || focused ? "#8b1a1a" : "#0a0a0a"} roughness={0.5} metalness={0.2} transparent opacity={dimmed ? 0.25 : 1} />
      </mesh>
      {/* Red accent strip (constructivist) */}
      <mesh position={[frameW / 2 - 0.04, 0, -0.015]}>
        <boxGeometry args={[0.04, frameH, 0.045]} />
        <meshStandardMaterial color="#a01818" roughness={0.4} transparent opacity={dimmed ? 0.25 : 1} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={art.scale} />
        <meshStandardMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={dimmed ? 0.25 : 1}
          emissive={focused ? new THREE.Color("#ffffff") : new THREE.Color("#000000")}
          emissiveMap={focused ? texture : null}
          emissiveIntensity={focused ? 0.6 : 0}
        />
      </mesh>
      {focused && (
        <>
          <pointLight position={[0, 0, 0.6]} intensity={2.2} distance={2.5} color="#fff4dd" />
          <pointLight position={[0.6, 0.4, 0.4]} intensity={0.8} distance={2} color="#ffe9c2" />
          <pointLight position={[-0.6, 0.4, 0.4]} intensity={0.8} distance={2} color="#ffe9c2" />
        </>
      )}
      {(hovered || focused) && (
        <group position={[0, -(art.scale[1] / 2 + 0.25), 0.05]}>
          <mesh>
            <planeGeometry args={[2, 0.36]} />
            <meshBasicMaterial color="#0a0a0a" transparent opacity={0.92} />
          </mesh>
          <mesh position={[-0.95, 0, 0.005]}>
            <planeGeometry args={[0.06, 0.36]} />
            <meshBasicMaterial color="#a01818" />
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

// Plečnik-style classical column with capital and base, sitting flush on the floor
function PlecnikColumn({ position, height = 5.15 }: { position: [number, number, number]; height?: number }) {
  // Layout (bottom-up):
  //  base1: y 0.00 - 0.10 (0.10 tall)
  //  base2: y 0.10 - 0.26 (0.16 tall)
  //  shaft: y 0.26 - height-0.26 (height-0.52 tall)
  //  cap1:  y height-0.26 - height-0.10 (0.16 tall)
  //  cap2:  y height-0.10 - height (0.10 tall)
  const shaftH = height - 0.52;
  const shaftCenterY = 0.26 + shaftH / 2;
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#d8cfbf" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.55, 0.16, 0.55]} />
        <meshStandardMaterial color="#e8dfcc" roughness={0.8} />
      </mesh>
      <mesh position={[0, shaftCenterY, 0]}>
        <cylinderGeometry args={[0.18, 0.22, shaftH, 24]} />
        <meshStandardMaterial color="#f0e8d6" roughness={0.7} />
      </mesh>
      <mesh position={[0.18, shaftCenterY, 0]}>
        <boxGeometry args={[0.005, shaftH - 0.1, 0.04]} />
        <meshStandardMaterial color="#bcb09a" />
      </mesh>
      <mesh position={[-0.18, shaftCenterY, 0]}>
        <boxGeometry args={[0.005, shaftH - 0.1, 0.04]} />
        <meshStandardMaterial color="#bcb09a" />
      </mesh>
      <mesh position={[0, shaftCenterY, 0.18]}>
        <boxGeometry args={[0.04, shaftH - 0.1, 0.005]} />
        <meshStandardMaterial color="#bcb09a" />
      </mesh>
      <mesh position={[0, height - 0.18, 0]}>
        <cylinderGeometry args={[0.28, 0.18, 0.16, 16]} />
        <meshStandardMaterial color="#e8dfcc" roughness={0.8} />
      </mesh>
      <mesh position={[0, height - 0.05, 0]}>
        <boxGeometry args={[0.65, 0.1, 0.65]} />
        <meshStandardMaterial color="#d8cfbf" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Černigoj-style constructivist geometric mural panel
function ConstructivistPanel({ position, rotation, width = 2.2, height = 2.6 }: { position: [number, number, number]; rotation: [number, number, number]; width?: number; height?: number }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Background ivory */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#f4ede0" roughness={0.95} />
      </mesh>
      {/* Bold black diagonal */}
      <mesh position={[0, 0, 0.002]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[width * 1.4, 0.16]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      {/* Red rectangle */}
      <mesh position={[-width * 0.25, height * 0.22, 0.003]}>
        <planeGeometry args={[width * 0.32, height * 0.18]} />
        <meshBasicMaterial color="#a01818" />
      </mesh>
      {/* Black square */}
      <mesh position={[width * 0.28, -height * 0.18, 0.003]}>
        <planeGeometry args={[width * 0.22, width * 0.22]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      {/* Thin black vertical line */}
      <mesh position={[width * 0.05, 0, 0.004]}>
        <planeGeometry args={[0.025, height * 0.85]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      {/* Small ochre circle */}
      <mesh position={[-width * 0.32, -height * 0.28, 0.003]}>
        <circleGeometry args={[0.14, 32]} />
        <meshBasicMaterial color="#c9962b" />
      </mesh>
    </group>
  );
}

// Pergola beam across the open ceiling - daylight passes between
function PergolaBeam({ position, rotation = [0, 0, 0] as [number, number, number], length = 11 }: { position: [number, number, number]; rotation?: [number, number, number]; length?: number }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[length, 0.18, 0.22]} />
      <meshStandardMaterial color="#e0d6c2" roughness={0.85} />
    </mesh>
  );
}

function GalleryRoom({ focusedId, setFocusedId }: { focusedId: string | null; setFocusedId: (id: string | null) => void }) {
  // Stone tile floor with checkered Plečnik pattern (cream + terracotta diamonds)
  const floorTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#e8dcc4";
    ctx.fillRect(0, 0, 512, 512);
    const tile = 64;
    for (let i = 0; i < 512; i += tile) {
      for (let j = 0; j < 512; j += tile) {
        const isDark = ((i / tile) + (j / tile)) % 2 === 0;
        ctx.fillStyle = isDark ? "#b8895a" : "#ede0c6";
        ctx.fillRect(j, i, tile - 2, tile - 2);
      }
    }
    // Černigoj black accent line grid
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    for (let i = 0; i <= 512; i += tile) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    return tex;
  }, []);

  // Wall texture: cream stone with subtle ashlar lines
  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#efe6d2";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#d4c8ad";
    ctx.lineWidth = 1;
    for (let y = 0; y < 256; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
    for (let y = 0; y < 256; y += 64) {
      for (let x = 0; x < 256; x += 64) {
        const off = (y / 32) % 2 === 0 ? 0 : 32;
        ctx.beginPath();
        ctx.moveTo(x + off, y);
        ctx.lineTo(x + off, y + 32);
        ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 1.5);
    return tex;
  }, []);

  // Solid stone walls (no arches now — open courtyard concept, walls support pergola)
  const wallH = 5.2;

  // Plečnik column positions: only at the 4 corners + 1 midpoint per wall
  // (paintings sit at x=±2.5 on the front/back walls and z=±2 on side walls,
  // so columns must hug the walls and avoid those zones)
  const columns: [number, number, number][] = [
    [-4.7, 0, -4.7], [4.7, 0, -4.7], [-4.7, 0, 4.7], [4.7, 0, 4.7], // corners
    [0, 0, -4.7], [0, 0, 4.7], // midpoint of front/back walls (between paintings)
    [-4.7, 0, 0], [4.7, 0, 0], // midpoint of side walls (between paintings)
  ];

  // Pergola beams across the top — daylight streams through the gaps
  const beamsX: number[] = [-4, -2.5, -1, 0.5, 2, 3.5];
  const beamsZ: number[] = [-4, -2.5, -1, 0.5, 2, 3.5];

  return (
    <group>
      {/* Sky dome (visible above pergola) */}
      <Sky distance={450000} sunPosition={[5, 8, 3]} inclination={0.49} azimuth={0.25} turbidity={4} rayleigh={1.5} />

      {/* Sunlight from above — directional + warm */}
      <directionalLight position={[6, 12, 4]} intensity={1.6} color="#fff4d6" castShadow />
      <directionalLight position={[-4, 10, -2]} intensity={0.4} color="#cfe0ff" />
      <ambientLight intensity={0.55} color="#fff2dc" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} onClick={() => setFocusedId(null)} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} roughness={0.7} />
      </mesh>

      {/* Solid stone walls (no ceiling — courtyard) */}
      <mesh position={[0, wallH / 2, -5]} receiveShadow>
        <planeGeometry args={[10, wallH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, wallH / 2, 5]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[10, wallH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-5, wallH / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, wallH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[5, wallH / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, wallH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>

      {/* Plečnik cornice/frieze atop walls — black band with terracotta detail */}
      {[
        { p: [0, wallH - 0.1, -4.97] as [number, number, number], r: [0, 0, 0] as [number, number, number] },
        { p: [0, wallH - 0.1, 4.97] as [number, number, number], r: [0, Math.PI, 0] as [number, number, number] },
        { p: [-4.97, wallH - 0.1, 0] as [number, number, number], r: [0, Math.PI / 2, 0] as [number, number, number] },
        { p: [4.97, wallH - 0.1, 0] as [number, number, number], r: [0, -Math.PI / 2, 0] as [number, number, number] },
      ].map((b, i) => (
        <group key={`cornice-${i}`} position={b.p} rotation={b.r}>
          <mesh>
            <planeGeometry args={[10, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.16, 0.001]}>
            <planeGeometry args={[10, 0.06]} />
            <meshStandardMaterial color="#a01818" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Černigoj constructivist murals on walls between paintings */}
      <ConstructivistPanel position={[0, 1.7, -4.95]} rotation={[0, 0, 0]} />
      <ConstructivistPanel position={[0, 1.7, 4.95]} rotation={[0, Math.PI, 0]} />
      <ConstructivistPanel position={[-4.95, 1.7, 0]} rotation={[0, Math.PI / 2, 0]} />
      <ConstructivistPanel position={[4.95, 1.7, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Plečnik columns lining the perimeter */}
      {columns.map((p, i) => (
        <PlecnikColumn key={`col-${i}`} position={p} />
      ))}

      {/* Pergola beams (open ceiling — daylight streams through) */}
      {beamsX.map((x, i) => (
        <PergolaBeam key={`bx-${i}`} position={[x, 5.4, 0]} rotation={[0, Math.PI / 2, 0]} length={10} />
      ))}
      {beamsZ.map((z, i) => (
        <PergolaBeam key={`bz-${i}`} position={[0, 5.55, z]} length={10} />
      ))}

      {/* Top architrave on top of columns */}
      {[
        [0, 5.15, -4.5], [0, 5.15, 4.5],
      ].map((p, i) => (
        <mesh key={`arch-x-${i}`} position={p as [number, number, number]}>
          <boxGeometry args={[10, 0.22, 0.5]} />
          <meshStandardMaterial color="#e8dfcc" roughness={0.8} />
        </mesh>
      ))}
      {[
        [-4.5, 5.15, 0], [4.5, 5.15, 0],
      ].map((p, i) => (
        <mesh key={`arch-z-${i}`} position={p as [number, number, number]}>
          <boxGeometry args={[0.5, 0.22, 10]} />
          <meshStandardMaterial color="#e8dfcc" roughness={0.8} />
        </mesh>
      ))}

      {/* Soft spotlights to lift artwork legibility */}
      {artworks.map((art) => (
        <pointLight
          key={`l-${art.id}`}
          position={[art.position[0] * 0.85, 4.6, art.position[2] * 0.85]}
          intensity={0.6}
          distance={5}
          color="#fff5e6"
        />
      ))}

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
  const targetLookAt = useRef(new THREE.Vector3(0, 1.6, 0));

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
      targetLookAt.current.set(0, 1.6, 0);
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
      maxDistance={4.5}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.62}
      target={[0, 1.6, 0]}
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
        shadows
        camera={{ position: [0, 1.6, 3.5], fov: 60 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
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
            <span className="opacity-80">Plečnikov atrij · Černigojev konstruktivizem · Kliknite sliko za bližnji ogled</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VRGallery;
