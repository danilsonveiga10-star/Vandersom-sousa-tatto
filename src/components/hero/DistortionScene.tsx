"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uAmp;
  uniform float uImageAspect;
  uniform float uPlaneAspect;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  vec2 coverUv(vec2 uv) {
    vec2 ratio = vec2(
      min(uPlaneAspect / uImageAspect, 1.0),
      min(uImageAspect / uPlaneAspect, 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec2 uv = coverUv(vUv);

    float dist = distance(vUv, uMouse);
    float falloff = smoothstep(0.4, 0.0, dist);
    vec2 dir = normalize(vUv - uMouse + 1e-4);

    float n = noise(uv * 5.0 + uTime * 0.04);
    vec2 ambient = vec2(
      sin(uv.y * 8.0 + uTime * 0.25),
      cos(uv.x * 8.0 + uTime * 0.2)
    ) * 0.0022;

    vec2 ripple = dir * falloff * 0.05 * uAmp;
    vec2 offset = ripple + ambient * uAmp + (n - 0.5) * 0.012 * uAmp;

    float r = texture2D(uTexture, uv + offset * 1.5).r;
    float g = texture2D(uTexture, uv + offset).g;
    float b = texture2D(uTexture, uv + offset * 0.5).b;

    vec3 color = vec3(r, g, b);

    float vignette = smoothstep(1.05, 0.35, length(vUv - 0.5) * 1.15);
    color *= mix(0.55, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function DistortionScene({
  src,
  ampRef,
}: {
  src: string;
  ampRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport, size } = useThree();
  const [imageAspect, setImageAspect] = useState(16 / 9);

  const video = useMemo(() => {
    const v = document.createElement("video");
    v.src = src;
    v.loop = true;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    return v;
  }, [src]);

  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [video]);

  useEffect(() => {
    const onMeta = () => setImageAspect(video.videoWidth / video.videoHeight || 16 / 9);
    video.addEventListener("loadedmetadata", onMeta);
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    document.addEventListener("pointerdown", tryPlay, { once: true });
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      document.removeEventListener("pointerdown", tryPlay);
    };
  }, [video]);

  useEffect(() => {
    return () => {
      video.pause();
      texture.dispose();
    };
  }, [video, texture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uAmp: { value: 1.4 },
      uImageAspect: { value: imageAspect },
      uPlaneAspect: { value: size.width / size.height },
    }),
    [texture, imageAspect, size]
  );

  useEffect(() => {
    if (matRef.current) matRef.current.uniforms.uImageAspect.value = imageAspect;
  }, [imageAspect]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetMouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    mouse.current.lerp(targetMouse.current, 1 - Math.pow(0.001, delta));
    matRef.current.uniforms.uMouse.value.copy(mouse.current);
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uAmp.value = ampRef.current;
    matRef.current.uniforms.uPlaneAspect.value = size.width / size.height;
    if (texture.image && texture.image.readyState >= 2) texture.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
      />
    </mesh>
  );
}
