"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import AvatarFallback from "./AvatarFallback";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uDispStrength;
  uniform float uHoverAmount;

  varying vec2 vUv;
  varying float vDisplacement;

  vec3 mod289v3(vec3 x){return x - floor(x * (1.0/289.0))*289.0;}
  vec4 mod289v4(vec4 x){return x - floor(x * (1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289v4(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289v3(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;

    vec2 mouseUv = uMouse + 0.5;
    float distToMouse = distance(uv, mouseUv);
    float mouseInfluence = exp(-distToMouse * 6.0) * uHoverAmount;

    float ambient = snoise(vec3(uv * 2.5, uTime * 0.25)) * 0.5;
    float disp = (ambient + mouseInfluence * 2.0) * uDispStrength;

    vDisplacement = disp;

    vec3 newPos = position + normal * disp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uHoverAmount;

  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    float aberration = vDisplacement * 0.015;

    float r = texture2D(uTex, vUv + vec2(aberration, 0.0)).r;
    float g = texture2D(uTex, vUv).g;
    float b = texture2D(uTex, vUv - vec2(aberration, 0.0)).b;
    float a = texture2D(uTex, vUv).a;

    vec3 color = vec3(r, g, b);

    vec3 accent = vec3(0.0, 0.83, 1.0);
    color = mix(color, color + accent * 0.1, uHoverAmount * abs(vDisplacement) * 5.0);

    float distFromCenter = distance(vUv, vec2(0.5));
    float alphaMask = smoothstep(0.50, 0.42, distFromCenter);
    alphaMask *= smoothstep(-0.02, 0.02, vDisplacement + 0.02);

    gl_FragColor = vec4(color, a * alphaMask);
  }
`;

interface AvatarBlobProps {
  src: string;
  alt: string;
  size: number;
}

function BlobMesh({ src }: { src: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const hoverTarget = useRef(0);

  const texture = useLoader(THREE.TextureLoader, src);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTime:         { value: 0 },
      uMouse:        { value: new THREE.Vector2(0, 0) },
      uTex:          { value: texture },
      uDispStrength: { value: 0.08 },
      uHoverAmount:  { value: 0 },
    }),
    [texture],
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uTime.value += delta;
    u.uMouse.value.x += (mouseTarget.current.x - u.uMouse.value.x) * 0.08;
    u.uMouse.value.y += (mouseTarget.current.y - u.uMouse.value.y) * 0.08;
    u.uHoverAmount.value += (hoverTarget.current - u.uHoverAmount.value) * 0.08;
  });

  return (
    <mesh
      onPointerMove={(e) => {
        if (e.uv) {
          mouseTarget.current.x = e.uv.x - 0.5;
          mouseTarget.current.y = e.uv.y - 0.5;
        }
      }}
      onPointerEnter={() => { hoverTarget.current = 1; }}
      onPointerLeave={() => { hoverTarget.current = 0; }}
    >
      <planeGeometry args={[3, 3, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function AvatarBlob({ src, alt, size }: AvatarBlobProps) {
  const reduced = usePrefersReducedMotion();
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  if (reduced || !webglOk) {
    return <AvatarFallback src={src} alt={alt} size={size} />;
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="relative"
      role="img"
      aria-label={alt}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 2], zoom: size / 3 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <BlobMesh src={src} />
      </Canvas>
    </div>
  );
}
