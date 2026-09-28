import { Suspense, useRef, useState, useMemo, useEffect, createContext, useContext } from "react";
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

const artworks: ArtPiece[] = [
  { id: "a1", src: akr0086, title: "Krožni svet", artist: "Klavdij Tutta", position: [-3.34, 1.65, -4.25], rotation: [0, Math.PI / 2, 0], scale: [1.45, 1.45] },
  { id: "a2", src: akr0137, title: "Solarni krog", artist: "Klavdij Tutta", position: [-3.34, 1.65, -1.8], rotation: [0, Math.PI / 2, 0], scale: [1.45, 1.45] },
  { id: "a3", src: akr0645, title: "Abstraktna modrina", artist: "Galerijska zbirka", position: [-3.34, 1.65, 1.15], rotation: [0, Math.PI / 2, 0], scale: [1.45, 1.08] },
  { id: "a4", src: akr0613, title: "Sinica", artist: "K. K. Lina", position: [-3.34, 1.65, 4.15], rotation: [0, Math.PI / 2, 0], scale: [1.25, 1.25] },
  { id: "a5", src: akr0649, title: "Keramična ploskev", artist: "Galerijska zbirka", position: [3.34, 1.65, -4.15], rotation: [0, -Math.PI / 2, 0], scale: [1.25, 1.25] },
  { id: "a6", src: akr0637, title: "Morski spomin", artist: "Galerijska zbirka", position: [3.34, 1.65, -1.25], rotation: [0, -Math.PI / 2, 0], scale: [1.45, 1.08] },
  { id: "a7", src: akr0152, title: "Mestni utrip", artist: "Galerijska zbirka", position: [3.34, 1.65, 1.8], rotation: [0, -Math.PI / 2, 0], scale: [1.45, 1.08] },
  { id: "a8", src: akr0010, title: "Modri horizont", artist: "Galerijska zbirka", position: [3.34, 1.65, 4.25], rotation: [0, -Math.PI / 2, 0], scale: [1.45, 1.08] },
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
  const config = useGalleryConfig();

  const basePos = useMemo(() => new THREE.Vector3(...art.position), [art.position]);
  const baseQuat = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(...art.rotation)), [art.rotation]);
  const { camera } = useThree();
  const tmpObj = useMemo(() => new THREE.Object3D(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const focusTarget = useMemo(() => new THREE.Vector3(), []);
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

  useFrame(() => {
    if (!groupRef.current) return;

    const target = focused && focusAnchor.current ? focusAnchor.current : basePos;
    groupRef.current.position.lerp(target, 0.1);

    const targetScale = focused ? config.focusScale : 1;
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

function TrackLight({ z }: { z: number }) {
  const heads = [-2.7, -1.35, 0, 1.35, 2.7];
  return (
    <group position={[0, 3.55, z]}>
      <mesh><boxGeometry args={[6.1, 0.04, 0.05]} /><meshStandardMaterial color="#141414" roughness={0.4} metalness={0.6} /></mesh>
      {heads.map((x, i) => (
        <group key={i} position={[x, -0.1, 0]} rotation={[z < 0 ? -0.6 : 0.6, 0, 0]}>
          <mesh><cylinderGeometry args={[0.05, 0.065, 0.18, 12]} /><meshStandardMaterial color="#141414" metalness={0.6} roughness={0.35} /></mesh>
          <mesh position={[0, -0.091, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[0.05, 12]} /><meshBasicMaterial color="#fff3d6" /></mesh>
        </group>
      ))}
    </group>
  );
}

function ArchNiche({ position, rotation = [0, 0, 0] as [number, number, number] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const w = 1.5, h = 2.3, r = w / 2;
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-r, 0); s.lineTo(-r, h); s.absarc(0, h, r, Math.PI, 0, true); s.lineTo(r, 0); s.lineTo(-r, 0);
    return s;
  }, []);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.004]}>
        <shapeGeometry args={[shape, 32]} />
        <meshStandardMaterial color="#cfc8bb" roughness={1} />
      </mesh>
      {/* soft depth shade at top of the arch */}
      <mesh position={[0, h, 0.006]}>
        <ringGeometry args={[r - 0.08, r, 32, 1, 0, Math.PI]} />
        <meshStandardMaterial color="#b9b2a5" roughness={1} />
      </mesh>
    </group>
  );
}

function GalleryRoom({ focusedId, setFocusedId }: { focusedId: string | null; setFocusedId: (id: string | null) => void }) {
  const roomWidth = 6.8;
  const roomLength = 12;
  const springY = 3.15;
  const bayDepth = 4;
  const vaultRise = 1.18;
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
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 72, 0.018, 6, false);
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

  // Herringbone oak parquet
  const floorTexture = useMemo(() => {
    const S = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = S; canvas.height = S;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#b98a57"; ctx.fillRect(0, 0, S, S);
    const L = 128, Wd = 32;
    const tones = ["#c49563", "#b8864f", "#cc9f6c", "#ad7c48", "#c08e5a", "#d1a674"];
    ctx.save(); ctx.translate(S / 2, S / 2); ctx.rotate(Math.PI / 4); ctx.translate(-S, -S);
    for (let row = -2; row < (S * 2) / Wd + 2; row++) {
      for (let col = -2; col < (S * 2) / L + 4; col++) {
        const x = col * L + (row % 2) * 0 , y = row * Wd;
        const drawPlank = (px: number, py: number, pw: number, ph: number) => {
          ctx.fillStyle = tones[Math.floor(Math.random() * tones.length)];
          ctx.fillRect(px, py, pw, ph);
          ctx.strokeStyle = "rgba(60,35,15,0.45)"; ctx.lineWidth = 1.2; ctx.strokeRect(px, py, pw, ph);
          for (let g = 0; g < 4; g++) {
            ctx.strokeStyle = `rgba(90,55,25,${0.06 + Math.random() * 0.08})`; ctx.lineWidth = 0.7;
            ctx.beginPath();
            if (pw > ph) { const gy = py + Math.random() * ph; ctx.moveTo(px, gy); ctx.lineTo(px + pw, gy + (Math.random() - 0.5) * 3); }
            else { const gx = px + Math.random() * pw; ctx.moveTo(gx, py); ctx.lineTo(gx + (Math.random() - 0.5) * 3, py + ph); }
            ctx.stroke();
          }
        };
        // herringbone: alternating horizontal/vertical planks offset per step
        const ox = x + row * Wd, oy = y - col * 0;
        if ((row + col) % 2 === 0) drawPlank(ox, oy, L, Wd); else drawPlank(ox, oy - L + Wd, Wd, L);
      }
    }
    ctx.restore();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.5, 2.5);
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const wallColor = "#f6f3ec";

  return (
    <group>
      <color attach="background" args={["#efe9dd"]} />
      <hemisphereLight args={["#fffaf0", "#b98a57", 0.75]} />
      <ambientLight intensity={0.35} color="#fff2dc" />
      <directionalLight position={[3, 8, 4]} intensity={0.5} color="#fff4de" />

      {/* Herringbone parquet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={() => setFocusedId(null)} receiveShadow>
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial map={floorTexture} roughness={0.55} />
      </mesh>

      {/* White plastered walls */}
      {[
        { p: [0, springY / 2, -6], r: 0, width: roomWidth },
        { p: [0, springY / 2, 6], r: Math.PI, width: roomWidth },
        { p: [-3.4, springY / 2, 0], r: Math.PI / 2, width: roomLength },
        { p: [3.4, springY / 2, 0], r: -Math.PI / 2, width: roomLength },
      ].map((w, i) => (
        <mesh key={`w${i}`} position={w.p as [number, number, number]} rotation={[0, w.r, 0]} receiveShadow>
          <planeGeometry args={[w.width, springY]} />
          <meshStandardMaterial color={wallColor} roughness={0.95} />
        </mesh>
      ))}

      {/* Semicircular end faces visible above the window and passage */}
      {[
        { p: [0, springY, -5.99], r: 0 },
        { p: [0, springY, 5.99], r: Math.PI },
      ].map((wall, i) => (
        <mesh key={`lunette-${i}`} geometry={endLunetteGeometry} position={wall.p as [number, number, number]} rotation={[0, wall.r, 0]}>
          <meshStandardMaterial color={wallColor} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Three shallow plaster bays reproduce the rhythm visible in the film. */}
      {vaultBays.map((bay, bayIndex) => (
        <group key={`vault-bay-${bayIndex}`}>
          <mesh geometry={bay.surface} receiveShadow>
            <meshStandardMaterial color="#f8f5ef" roughness={0.98} side={THREE.DoubleSide} />
          </mesh>
          {bay.ribs.map((geometry, ribIndex) => (
            <mesh key={`vault-rib-${bayIndex}-${ribIndex}`} geometry={geometry}>
              <meshStandardMaterial color="#ddd7cd" roughness={1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Wide recessed shop window at one end, as seen in the film. */}
      <group position={[0, 0, -5.96]}>
        <mesh position={[0, 1.35, 0.012]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshStandardMaterial color="#d8ddd9" roughness={0.25} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.35, 0.025]}>
          <ringGeometry args={[1.14, 1.25, 48, 1, 0, Math.PI]} />
          <meshStandardMaterial color="#ece7dd" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.18, 0.03]}><boxGeometry args={[2.62, 0.16, 0.1]} /><meshStandardMaterial color="#d8d0c2" /></mesh>
      </group>

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

      {/* Arched niche / passage between paintings */}
      <ArchNiche position={[0, 0, 5.98]} rotation={[0, Math.PI, 0]} />

      {/* Black track lights */}
      <TrackLight z={-3.8} />
      <TrackLight z={0} />
      <TrackLight z={3.8} />

      {/* Furniture as in the real gallery */}
      <Sofa position={[-1.35, 0, 0.45]} rotation={Math.PI} />
      <Armchair position={[2.55, 0, -3.9]} rotation={-Math.PI / 2 - 0.25} />
      {/* small ceramic plinth */}
      <group position={[2.55, 0, 3.65]}>
        <mesh position={[0, 0.35, 0]}><boxGeometry args={[0.45, 0.7, 0.45]} /><meshStandardMaterial color="#a5764a" roughness={0.7} /></mesh>
        <mesh position={[0, 0.85, 0]}><sphereGeometry args={[0.14, 20, 16]} /><meshStandardMaterial color="#2f5d6e" roughness={0.3} /></mesh>
      </group>

      {/* Gallery spots on artworks */}
      {artworks.map((art) => (
        <spotLight
          key={`l-${art.id}`}
          position={[art.position[0] * 0.5, 3.45, art.position[2] * 0.5]}
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
  const targetLookAt = useRef(new THREE.Vector3(0, 2.7, 0));
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
      targetLookAt.current.set(0, 2.7, 0);
    }
  }, [focusedId, camera, config.focusDistance]);

  useFrame(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.lerp(targetLookAt.current, 0.1);
    controlsRef.current.update();
  });

  useEffect(() => {
    camera.position.set(0, 1.9, config.mobile ? 4.2 : 3.6);
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
      target={[0, 2.7, 0]}
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
        : { focusDistance: 4.2, focusScale: 1.05, fov: 55, mobile: false },
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
          camera={{ position: [0, 1.9, config.mobile ? 4.2 : 3.6], fov: config.fov }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
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
                <button
                  onClick={() => setFocusedId(null)}
                  className="ml-1 rounded-full bg-primary text-primary-foreground px-4 py-1 sm:px-3 sm:py-0.5 text-sm sm:text-[11px] hover:opacity-90 transition shrink-0 min-h-[32px] sm:min-h-0"
                >
                  Nazaj
                </button>
              </>
            ) : (
              <span className="opacity-75 truncate">
                Vrtite z miško · zoom s kolescem · kliknite sliko za detajl
              </span>
            )}
          </div>
        </div>
      </div>
    </GalleryConfigContext.Provider>
  );
};


export default VRGallery;
