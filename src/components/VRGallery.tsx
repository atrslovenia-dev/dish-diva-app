import { Suspense, useRef, useState, useMemo, useEffect, createContext, useContext } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/gallery";

import akr0086 from "@/assets/gallery/AKR_0086.jpg";
import akr0137 from "@/assets/gallery/AKR_0137.jpg";
import akr0645 from "@/assets/gallery/AKR_0645.jpg";
import akr0613 from "@/assets/gallery/AKR_0613.jpg";
import akr0649 from "@/assets/gallery/AKR_0649.jpg";
import akr0637 from "@/assets/gallery/AKR_0637.jpg";
import akr0152 from "@/assets/gallery/AKR_0152.jpg";
import akr0010 from "@/assets/gallery/AKR_0010.jpg";

interface GalleryConfig {
  focusDistance: number;
  focusScale: number;
  fov: number;
  mobile: boolean;
}

const GalleryConfigContext = createContext<GalleryConfig>({
  focusDistance: 4.2,
  focusScale: 1.05,
  fov: 55,
  mobile: false,
});

function useGalleryConfig() {
  return useContext(GalleryConfigContext);
}


interface ArtPiece {
  id: string;
  src: string;
  title: string;
  artist: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
}

const featuredArtworks: ArtPiece[] = [
  { id: "a1", src: akr0086, title: "Krožni svet", artist: "Klavdij Tutta", position: [-3.34, 1.65, -4.25], rotation: [0, Math.PI / 2, 0], scale: [1.45, 1.45] },
  { id: "a2", src: akr0137, title: "Solarni krog", artist: "Klavdij Tutta", position: [-3.34, 1.65, -1.8], rotation: [0, Math.PI / 2, 0], scale: [1.45, 1.45] },
  { id: "a3", src: akr0645, title: "Abstraktna modrina", artist: "Galerijska zbirka", position: [-3.34, 1.65, 1.15], rotation: [0, Math.PI / 2, 0], scale: [1.45, 1.08] },
  { id: "a4", src: akr0613, title: "Sinica", artist: "K. K. Lina", position: [-3.34, 1.65, 4.15], rotation: [0, Math.PI / 2, 0], scale: [1.25, 1.25] },
  { id: "a5", src: akr0649, title: "Keramična ploskev", artist: "Galerijska zbirka", position: [3.34, 1.65, -4.15], rotation: [0, -Math.PI / 2, 0], scale: [1.25, 1.25] },
  { id: "a6", src: akr0637, title: "Morski spomin", artist: "Galerijska zbirka", position: [3.34, 1.65, -1.25], rotation: [0, -Math.PI / 2, 0], scale: [1.45, 1.08] },
  { id: "a7", src: akr0152, title: "Mestni utrip", artist: "Galerijska zbirka", position: [3.34, 1.65, 1.8], rotation: [0, -Math.PI / 2, 0], scale: [1.45, 1.08] },
  { id: "a8", src: akr0010, title: "Modri horizont", artist: "Galerijska zbirka", position: [3.34, 1.65, 4.25], rotation: [0, -Math.PI / 2, 0], scale: [1.45, 1.08] },
];

// Smaller salon-style groups seen around the entrance in the reference film.
const salonArtworks: ArtPiece[] = galleryImages.filter((image) =>
  !featuredArtworks.some((art) => art.src === image.src)
).slice(4, 18).map((image, index) => {
  const left = index < 7;
  const local = index % 7;
  return {
    id: `salon-${index}`, src: image.src, title: image.title, artist: image.artist,
    position: [(left ? -2.95 : 1.62) + (local % 3) * 0.52, 1.05 + Math.floor(local / 3) * 0.64, -5.93] as [number, number, number],
    rotation: [0, 0, 0], scale: [0.42, 0.48],
  };
});
const artworks: ArtPiece[] = [...featuredArtworks, ...salonArtworks];

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
  const config = useGalleryConfig();

  const basePos = useMemo(() => new THREE.Vector3(...art.position), [art.position]);
  const baseQuat = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(...art.rotation)), [art.rotation]);
  const { camera } = useThree();
  const tmpObj = useMemo(() => new THREE.Object3D(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  const focusAnchor = useRef<THREE.Vector3 | null>(null);

  // When focus changes, snapshot a stable world-space anchor in front of the
  // viewer. The painting then stays there so the wheel can dolly in for detail.
  useEffect(() => {
    if (focused) {
      camera.getWorldDirection(tmpVec);
      const anchor = new THREE.Vector3()
        .copy(camera.position)
        .add(tmpVec.multiplyScalar(config.focusDistance));
      anchor.y = camera.position.y;
      focusAnchor.current = anchor;
    } else {
      focusAnchor.current = null;
    }
  }, [focused, camera, tmpVec, config.focusDistance]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const ease = 1 - Math.exp(-7 * Math.min(delta, 0.05));

    const target = focused && focusAnchor.current ? focusAnchor.current : basePos;
    groupRef.current.position.lerp(target, ease);

    const targetScale = focused ? config.focusScale : 1;
    const s = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * ease;
    groupRef.current.scale.setScalar(s);

    let targetQuat = baseQuat;
    if (focused) {
      tmpObj.position.copy(groupRef.current.position);
      tmpObj.lookAt(camera.position);
      targetQuat = tmpObj.quaternion;
    }
    groupRef.current.quaternion.slerp(targetQuat, ease);
  });


  const frameW = art.scale[0] + 0.065;
  const frameH = art.scale[1] + 0.065;
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
        <meshStandardMaterial color={hovered || focused ? "#a79066" : art.id.startsWith("salon") ? "#cfbd9c" : "#d6c8ad"} roughness={0.5} metalness={0.2} transparent opacity={dimmed ? 0.25 : 1} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={art.scale} />
        <meshStandardMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={dimmed ? 0.25 : 1}
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

// Real Lučka & Avgust gallery: white walls, white groin (cross) vaults,
// herringbone oak parquet, black track lights, blue sofa + yellow armchair,
// semicircular arched niche between rooms.

function Sofa({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const blue = "#2f4f86";
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.22, 0]} castShadow><boxGeometry args={[1.9, 0.26, 0.85]} /><meshStandardMaterial color={blue} roughness={0.95} /></mesh>
      <mesh position={[0, 0.55, -0.34]} castShadow><boxGeometry args={[1.9, 0.5, 0.18]} /><meshStandardMaterial color={blue} roughness={0.95} /></mesh>
      {[-0.88, 0.88].map((x) => (
        <mesh key={x} position={[x, 0.4, 0]} castShadow><boxGeometry args={[0.16, 0.36, 0.85]} /><meshStandardMaterial color={blue} roughness={0.95} /></mesh>
      ))}
      {[-0.45, 0.45].map((x) => (
        <mesh key={`c${x}`} position={[x, 0.38, 0.03]}><boxGeometry args={[0.84, 0.08, 0.72]} /><meshStandardMaterial color="#39598f" roughness={1} /></mesh>
      ))}
      {[[-0.85, 0.35], [0.85, 0.35], [-0.85, -0.35], [0.85, -0.35]].map(([x, z], i) => (
        <mesh key={`l${i}`} position={[x, 0.045, z]}><cylinderGeometry args={[0.025, 0.025, 0.09, 8]} /><meshStandardMaterial color="#2a1c10" /></mesh>
      ))}
    </group>
  );
}

function Armchair({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const y = "#e3b52c";
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.3, 0]} castShadow><boxGeometry args={[0.8, 0.22, 0.75]} /><meshStandardMaterial color={y} roughness={0.9} /></mesh>
      <mesh position={[0, 0.68, -0.3]} rotation={[-0.15, 0, 0]} castShadow><boxGeometry args={[0.8, 0.6, 0.14]} /><meshStandardMaterial color={y} roughness={0.9} /></mesh>
      {[-0.36, 0.36].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]}><boxGeometry args={[0.08, 0.2, 0.7]} /><meshStandardMaterial color={y} roughness={0.9} /></mesh>
      ))}
      {[[-0.34, 0.3], [0.34, 0.3], [-0.34, -0.3], [0.34, -0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]}><cylinderGeometry args={[0.02, 0.015, 0.2, 8]} /><meshStandardMaterial color="#6b4a2a" /></mesh>
      ))}
    </group>
  );
}

function TrackLight({ x }: { x: number }) {
  const heads = [-4.6, -2.3, 0, 2.3, 4.6];
  return (
    <group position={[x, 3.3, 0]}>
      <mesh><boxGeometry args={[0.04, 0.035, 10.8]} /><meshStandardMaterial color="#e7e2d8" roughness={0.55} metalness={0.2} /></mesh>
      {heads.map((z, i) => (
        <group key={i} position={[0, -0.1, z]} rotation={[z < 0 ? -0.45 : 0.45, 0, 0]}>
          <mesh><cylinderGeometry args={[0.05, 0.065, 0.18, 12]} /><meshStandardMaterial color="#eee9df" metalness={0.25} roughness={0.5} /></mesh>
          <mesh position={[0, -0.091, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[0.05, 12]} /><meshBasicMaterial color="#fff3d6" /></mesh>
        </group>
      ))}
    </group>
  );
}

function EndWall({ entrance }: { entrance: boolean }) {
  const halfOpening = 0.85;
  const archSpring = 1.98;
  const depth = 0.9;
  const { wall, reveal } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3.4, 0); shape.lineTo(3.4, 0);
    shape.lineTo(3.4, 2.9); shape.lineTo(-3.4, 2.9); shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-halfOpening, 0.015); hole.lineTo(-halfOpening, archSpring);
    hole.absarc(0, archSpring, halfOpening, Math.PI, 0, true);
    hole.lineTo(halfOpening, 0.015); hole.closePath();
    shape.holes.push(hole);
    const arch = new THREE.Shape();
    arch.moveTo(-halfOpening - 0.12, 0); arch.lineTo(-halfOpening - 0.12, archSpring);
    arch.absarc(0, archSpring, halfOpening + 0.12, Math.PI, 0, true);
    arch.lineTo(halfOpening + 0.12, 0); arch.lineTo(halfOpening, 0);
    arch.lineTo(halfOpening, archSpring);
    arch.absarc(0, archSpring, halfOpening, 0, Math.PI, false);
    arch.lineTo(-halfOpening, 0); arch.closePath();
    return { wall: new THREE.ShapeGeometry(shape, 64), reveal: new THREE.ExtrudeGeometry(arch, { depth, bevelEnabled: false, curveSegments: 48 }) };
  }, [halfOpening]);
  return (
    <group position={[0, 0, -6]}>
      <mesh geometry={wall}>
        <meshStandardMaterial color="#f6f3ec" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={reveal} position={[0, 0, -depth]}>
        <meshStandardMaterial color="#e5e2da" roughness={0.9} />
      </mesh>
      <group position={[0, 0, -depth - 1.6]}>
        <mesh position={[0, 1.6, -1.6]}><planeGeometry args={[3.4, 3.2]} /><meshStandardMaterial color="#f3efe6" roughness={0.95} /></mesh>
        {entrance && <mesh position={[0.6, 1.55, -1.58]}><planeGeometry args={[0.9, 1.5]} /><meshStandardMaterial color="#cfe3ea" emissive="#e8f2f2" emissiveIntensity={0.6} /></mesh>}
        {[-1.7, 1.7].map((x) => <mesh key={x} position={[x, 1.6, 0]} rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}><planeGeometry args={[3.2, 3.2]} /><meshStandardMaterial color="#efeae0" /></mesh>)}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}><planeGeometry args={[3.4, 3.2]} /><meshStandardMaterial color="#b99165" roughness={0.65} /></mesh>
        <mesh position={[0, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[3.4, 3.2]} /><meshStandardMaterial color="#f6f3ec" /></mesh>
        <pointLight position={[0, 2.6, 0]} intensity={5} distance={5} />
      </group>
    </group>
  );
}

// Street entrance as seen in the film: a rectangular door beside one shop window.
function EntranceWall() {
  const door = { x0: -2.3, x1: -1.15, y0: 0, y1: 2.35 };
  const win = { x0: -0.3, x1: 2.5, y0: 0.6, y1: 2.35 };
  const depth = 0.6;
  const wall = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3.4, 0); shape.lineTo(3.4, 0); shape.lineTo(3.4, 2.9); shape.lineTo(-3.4, 2.9); shape.closePath();
    for (const r of [door, win]) {
      const h = new THREE.Path();
      h.moveTo(r.x0, Math.max(r.y0, 0.01)); h.lineTo(r.x1, Math.max(r.y0, 0.01)); h.lineTo(r.x1, r.y1); h.lineTo(r.x0, r.y1); h.closePath();
      shape.holes.push(h);
    }
    return new THREE.ShapeGeometry(shape);
  }, []);
  const reveal = (r: typeof door, key: string) => {
    const w = r.x1 - r.x0, h = r.y1 - r.y0, cx = (r.x0 + r.x1) / 2, cy = (r.y0 + r.y1) / 2;
    const m = <meshStandardMaterial color="#e5e2da" roughness={0.9} />;
    return <group key={key}>
      <mesh position={[r.x0, cy, -depth / 2]}><boxGeometry args={[0.01, h, depth]} />{m}</mesh>
      <mesh position={[r.x1, cy, -depth / 2]}><boxGeometry args={[0.01, h, depth]} />{m}</mesh>
      <mesh position={[cx, r.y1, -depth / 2]}><boxGeometry args={[w, 0.01, depth]} />{m}</mesh>
      {r.y0 > 0 && <mesh position={[cx, r.y0, -depth / 2]}><boxGeometry args={[w, 0.01, depth]} />{m}</mesh>}
    </group>;
  };
  const frame = "#2f2a26";
  return (
    <group position={[0, 0, 6]} rotation={[0, Math.PI, 0]}>
      <mesh geometry={wall}><meshStandardMaterial color="#f6f3ec" roughness={0.95} side={THREE.DoubleSide} /></mesh>
      {reveal(door, "d")}{reveal(win, "w")}
      {/* street daylight */}
      <mesh position={[0, 1.6, -depth - 0.6]}><planeGeometry args={[7, 3.4]} /><meshBasicMaterial color="#e9eef0" /></mesh>
      {/* door: dark frame, glass upper, wooden lower panel */}
      <group position={[(door.x0 + door.x1) / 2, 0, -depth + 0.06]}>
        <mesh position={[0, 0.45, 0]}><boxGeometry args={[1.1, 0.9, 0.05]} /><meshStandardMaterial color="#6b4a33" roughness={0.6} /></mesh>
        <mesh position={[0, 1.62, 0]}><planeGeometry args={[1.05, 1.44]} /><meshStandardMaterial color="#cfe0e4" transparent opacity={0.35} roughness={0.1} /></mesh>
        {[-0.55, 0.55].map((x) => <mesh key={x} position={[x, 1.175, 0]}><boxGeometry args={[0.06, 2.35, 0.07]} /><meshStandardMaterial color={frame} /></mesh>)}
        <mesh position={[0, 2.32, 0]}><boxGeometry args={[1.15, 0.06, 0.07]} /><meshStandardMaterial color={frame} /></mesh>
        <mesh position={[0.42, 1.05, 0.06]}><boxGeometry args={[0.03, 0.22, 0.03]} /><meshStandardMaterial color="#b9a06a" metalness={0.8} roughness={0.3} /></mesh>
      </group>
      {/* shop window: single pane with thin dark frame and display sill */}
      <group position={[(win.x0 + win.x1) / 2, 0, -depth + 0.06]}>
        <mesh position={[0, 1.475, 0]}><planeGeometry args={[2.75, 1.7]} /><meshStandardMaterial color="#cfe0e4" transparent opacity={0.3} roughness={0.1} /></mesh>
        {[-1.4, 1.4].map((x) => <mesh key={x} position={[x, 1.475, 0]}><boxGeometry args={[0.06, 1.75, 0.07]} /><meshStandardMaterial color={frame} /></mesh>)}
        {[0.62, 2.33].map((y) => <mesh key={y} position={[0, y, 0]}><boxGeometry args={[2.85, 0.06, 0.07]} /><meshStandardMaterial color={frame} /></mesh>)}
        <mesh position={[0, 0.6, depth / 2 - 0.06]}><boxGeometry args={[2.8, 0.04, depth]} /><meshStandardMaterial color="#e9e5dd" /></mesh>
      </group>
    </group>
  );
}

function GalleryRoom({ focusedId, setFocusedId }: { focusedId: string | null; setFocusedId: (id: string | null) => void }) {
  const roomWidth = 6.8;
  const roomLength = 12;
  const springY = 2.9;
  const bayDepth = 4;
  const vaultRise = 2.15;
  const bayCenters = [-4, 0, 4];

  // The film shows a long sequence of shallow cross-vaulted bays, not one
  // square canopy. Each bay is the inner envelope of perpendicular barrels.
  const vaultBays = useMemo(() => bayCenters.map((centerZ) => {
    const segmentsX = 44;
    const segmentsZ = 32;
    const halfW = roomWidth / 2;
    const halfD = bayDepth / 2;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let row = 0; row <= segmentsZ; row++) {
      const localZ = -halfD + (bayDepth * row) / segmentsZ;
      for (let col = 0; col <= segmentsX; col++) {
        const x = -halfW + (roomWidth * col) / segmentsX;
        const barrelAcrossRoom = springY + vaultRise * Math.sqrt(Math.max(0, 1 - (x / halfW) ** 2));
        const barrelAlongRoom = springY + vaultRise * Math.sqrt(Math.max(0, 1 - (localZ / halfD) ** 2));
        const y = Math.max(barrelAcrossRoom, barrelAlongRoom);
        positions.push(x, y, localZ + centerZ);
      }
    }
    for (let row = 0; row < segmentsZ; row++) {
      for (let col = 0; col < segmentsX; col++) {
        const a = row * (segmentsX + 1) + col;
        indices.push(a, a + segmentsX + 1, a + 1, a + 1, a + segmentsX + 1, a + segmentsX + 2);
      }
    }
    const surface = new THREE.BufferGeometry();
    surface.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    surface.setIndex(indices);
    surface.computeVertexNormals();

    const ribs = [1, -1].map((direction) => {
      const points = Array.from({ length: 41 }, (_, i) => {
        const x = -halfW + (roomWidth * i) / 40;
        const localZ = direction * (x / halfW) * halfD;
        const y = springY + vaultRise * Math.sqrt(Math.max(0, 1 - (x / halfW) ** 2)) - 0.018;
        return new THREE.Vector3(x, y, localZ + centerZ);
      });
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 72, 0.008, 6, false);
    });
    return { surface, ribs };
  }), []);

  const endLunetteGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const halfW = roomWidth / 2;
    shape.moveTo(-halfW, 0);
    for (let i = 0; i <= 48; i++) {
      const x = -halfW + (roomWidth * i) / 48;
      shape.lineTo(x, vaultRise * Math.sqrt(Math.max(0, 1 - (x / halfW) ** 2)));
    }
    shape.lineTo(-halfW, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const sideLunetteGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-bayDepth / 2, 0);
    for (let i = 0; i <= 64; i++) {
      const z = -bayDepth / 2 + bayDepth * i / 64;
      shape.lineTo(z, vaultRise * Math.sqrt(Math.max(0, 1 - (z / (bayDepth / 2)) ** 2)));
    }
    shape.lineTo(-bayDepth / 2, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  // Continuous tessellation: each lattice cell has one horizontal and one vertical plank.
  const floorTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const L = 128, W = 32;
    const tones = ["#b38a60", "#bd956d", "#c6a179", "#ae8256", "#c09a71"];
    ctx.fillStyle = tones[0]; ctx.fillRect(0, 0, 1024, 1024);
    const plank = (x: number, y: number, vertical: boolean, seed: number) => {
      const width = vertical ? W : L, height = vertical ? L : W;
      ctx.fillStyle = tones[Math.abs(seed) % tones.length];
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = "rgba(64,43,25,0.3)"; ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      ctx.strokeStyle = "rgba(80,50,30,0.09)";
      for (let grain = 4; grain < W; grain += 5) {
        ctx.beginPath();
        ctx.moveTo(x + (vertical ? grain : 2), y + (vertical ? 2 : grain));
        ctx.lineTo(x + (vertical ? grain + 1 : L - 2), y + (vertical ? L - 2 : grain + 1));
        ctx.stroke();
      }
    };
    for (let i = -10; i < 14; i++) for (let j = -36; j < 36; j++) {
      const x = i * L + j * W, y = i * L - j * W;
      plank(x, y, false, i * 17 + j * 7);
      plank(x + L, y, true, i * 13 + j * 3);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 3.5);
    texture.anisotropy = 8; texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  const wallColor = "#f6f3ec";

  return (
    <group>
      <color attach="background" args={["#efe9dd"]} />
      <Environment resolution={64}>
        <Lightformer intensity={0.7} position={[0, 2, -5.8]} scale={[3, 3, 1]} />
        <Lightformer intensity={0.35} position={[0, 0.1, 0]} rotation-x={-Math.PI / 2} scale={[7, 12, 1]} color="#f0e6d6" />
      </Environment>
      <hemisphereLight args={["#ffffff", "#e7dfd3", 0.9]} />
      <ambientLight intensity={0.45} color="#ffffff" />
      <directionalLight position={[0, 2.5, -5]} intensity={0.9} color="#ffffff" />
      {bayCenters.map((z) => <pointLight key={`bounce-${z}`} position={[0, 2.5, z]} intensity={3} distance={7} decay={2} color="#fffaf4" />)}

      {/* Herringbone parquet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={() => setFocusedId(null)} receiveShadow>
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial map={floorTexture ?? undefined} roughness={0.55} />
      </mesh>

      {/* White plastered walls */}
      {[
        { p: [-3.4, springY / 2, 0], r: Math.PI / 2, width: roomLength },
        { p: [3.4, springY / 2, 0], r: -Math.PI / 2, width: roomLength },
      ].map((w, i) => (
        <mesh key={`w${i}`} position={w.p as [number, number, number]} rotation={[0, w.r, 0]} receiveShadow>
          <planeGeometry args={[w.width, springY]} />
          <meshStandardMaterial color={wallColor} roughness={0.95} />
        </mesh>
      ))}
      <EndWall entrance />
      <EntranceWall />
      
      {/* Semicircular end faces visible above the window and passage */}
      {[
        { p: [0, springY, -5.99], r: 0 },
        { p: [0, springY, 5.99], r: Math.PI },
      ].map((wall, i) => (
        <mesh key={`lunette-${i}`} geometry={endLunetteGeometry} position={wall.p as [number, number, number]} rotation={[0, wall.r, 0]}>
          <meshStandardMaterial color={wallColor} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Solid plaster above each side wall closes the barrel lunettes. */}
      {bayCenters.flatMap((z, index) => [-1, 1].map((side) => (
        <mesh key={`side-lunette-${index}-${side}`} geometry={sideLunetteGeometry}
          position={[side * 3.4, springY, z]} rotation={[0, -side * Math.PI / 2, 0]}>
          <meshStandardMaterial color={wallColor} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
      )))}

      {/* Three shallow plaster bays reproduce the rhythm visible in the film. */}
      {vaultBays.map((bay, bayIndex) => (
        <group key={`vault-bay-${bayIndex}`}>
          <mesh geometry={bay.surface} receiveShadow>
            <meshStandardMaterial color="#faf9f5" roughness={0.98} side={THREE.DoubleSide} />
          </mesh>
          {bay.ribs.map((geometry, ribIndex) => (
            <mesh key={`vault-rib-${bayIndex}-${ribIndex}`} geometry={geometry}>
              <meshStandardMaterial color="#f3f0e9" roughness={1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Skirting board */}
      {[
        { p: [0, 0.05, -5.98], r: 0, width: roomWidth }, { p: [0, 0.05, 5.98], r: Math.PI, width: roomWidth },
        { p: [-3.38, 0.05, 0], r: Math.PI / 2, width: roomLength }, { p: [3.38, 0.05, 0], r: -Math.PI / 2, width: roomLength },
      ].map((b, i) => (
        <mesh key={`sk${i}`} position={b.p as [number, number, number]} rotation={[0, b.r, 0]}>
          <planeGeometry args={[b.width, 0.1]} />
          <meshStandardMaterial color="#e9e3d6" roughness={0.8} />
        </mesh>
      ))}

      {/* Black track lights */}
      <TrackLight x={-1.45} />
      <TrackLight x={1.45} />

      {/* Furniture as in the real gallery */}
      <Sofa position={[-1.35, 0, 0.45]} rotation={Math.PI} />
      <Armchair position={[2.55, 0, -3.9]} rotation={-Math.PI / 2 - 0.25} />
      {/* small ceramic plinth */}
      <group position={[2.55, 0, 3.65]}>
        <mesh position={[0, 0.35, 0]}><boxGeometry args={[0.45, 0.7, 0.45]} /><meshStandardMaterial color="#a5764a" roughness={0.7} /></mesh>
        <mesh position={[0, 0.85, 0]}><sphereGeometry args={[0.14, 20, 16]} /><meshStandardMaterial color="#2f5d6e" roughness={0.3} /></mesh>
      </group>

      {/* Gallery spots on artworks */}
      {featuredArtworks.map((art) => (
        <spotLight
          key={`l-${art.id}`}
          position={[art.position[0] * 0.6, 2.95, art.position[2]]}
          target-position={art.position}
          angle={0.45}
          penumbra={0.8}
          intensity={2.2}
          distance={9}
          color="#fff1d8"
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
  const targetLookAt = useRef(new THREE.Vector3(0, 1.8, -1.4));
  const config = useGalleryConfig();

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    if (perspective.fov !== undefined) {
      perspective.fov = config.fov;
      perspective.updateProjectionMatrix();
    }
  }, [camera, config.fov]);

  useEffect(() => {
    if (focusedId) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const anchor = new THREE.Vector3()
        .copy(camera.position)
        .add(dir.multiplyScalar(config.focusDistance));
      anchor.y = camera.position.y;
      targetLookAt.current.copy(anchor);
    } else {
      targetLookAt.current.set(0, 1.8, -1.4);
    }
  }, [focusedId, camera, config.focusDistance]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;
    controlsRef.current.target.lerp(targetLookAt.current, 1 - Math.exp(-7 * Math.min(delta, 0.05)));
    if (!focusedId) {
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -3.1, 3.1);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -5.6, 5.6);
      camera.position.y = THREE.MathUtils.clamp(camera.position.y, 1.15, 2.6);
    }
    controlsRef.current.update();
  });

  useEffect(() => {
    camera.position.set(config.mobile ? 1.35 : 1.8, 1.55, config.mobile ? 4.8 : 4.7);
  }, [camera, config.mobile]);


  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom
      enableRotate
      enablePan={false}
      minDistance={focusedId ? (config.mobile ? 1.4 : 1.0) : 1}
      maxDistance={focusedId ? (config.mobile ? 4.5 : 6) : 6}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.62}
      target={[0, 1.8, -1.4]}
      autoRotate={false}
      zoomSpeed={config.mobile ? 0.8 : 1.2}
    />
  );
}


interface VRGalleryProps {
  className?: string;
}

const VRGallery = ({ className = "" }: VRGalleryProps) => {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const focusedArt = artworks.find((a) => a.id === focusedId);

  const config = useMemo<GalleryConfig>(
    () =>
      mobile
        ? { focusDistance: 3.2, focusScale: 0.85, fov: 65, mobile: true }
        : { focusDistance: 4.2, focusScale: 1.05, fov: 64, mobile: false },
    [mobile]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pause rendering when canvas leaves viewport (big perf win)
  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <GalleryConfigContext.Provider value={config}>
      <div ref={containerRef} className={`relative w-full h-full ${className}`}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={visible ? "always" : "demand"}
          camera={{ position: [config.mobile ? 1.35 : 1.8, 1.55, config.mobile ? 4.8 : 4.7], fov: config.fov }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
        >
          <Suspense fallback={null}>
            <GalleryRoom focusedId={focusedId} setFocusedId={setFocusedId} />
            <CameraRig focusedId={focusedId} />
          </Suspense>
        </Canvas>

        {/* HUD — accessible info bar, sized per device so it never overlaps or gets too small */}
        <div className="pointer-events-none absolute left-4 right-4 bottom-4 sm:bottom-3 flex justify-center z-10">
          <div className="pointer-events-auto rounded-full bg-background/90 backdrop-blur-md border border-border px-4 py-2 sm:px-4 sm:py-1.5 text-sm sm:text-xs text-foreground shadow-md flex items-center gap-3 max-w-[95%]">
            {focusedArt ? (
              <>
                <span className="font-semibold truncate">{focusedArt.title}</span>
                <span className="opacity-60 truncate hidden sm:inline">— {focusedArt.artist}</span>
                <Button
                  onClick={() => setFocusedId(null)}
                  className="ml-1 rounded-full bg-primary text-primary-foreground px-4 py-1 sm:px-3 sm:py-0.5 text-sm sm:text-[11px] hover:opacity-90 transition shrink-0 min-h-[32px] sm:min-h-0"
                >
                  Nazaj
                </Button>
              </>
            ) : (
              <span className="opacity-75 truncate">Lučka & Avgust · Galerija 360°</span>
            )}
          </div>
        </div>
      </div>
    </GalleryConfigContext.Provider>
  );
};


export default VRGallery;
