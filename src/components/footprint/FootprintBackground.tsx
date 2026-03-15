"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { PerspectiveCamera, Points } from "three";

// 파티클 개수만 외부에서 바꿀 수 있게 열어둔 props다.
type ParticlesProps = {
  count?: number;
};

// 파티클이 머무는 기본 공간 범위다.
const PARTICLE_BOUNDS = {
  x: 6,
  y: 4,
  z: 8,
};

// 파티클 초기 배치 범위다.
const PARTICLE_SPAWN = {
  x: 8,
  y: 5,
  z: 10,
  yOffset: -0.25,
};

// 파티클이 움직이는 아주 작은 속도 범위다.
const PARTICLE_DRIFT = 0.002;

// 같은 index라도 salt를 다르게 주면 다른 난수처럼 쓸 수 있는 간단한 helper다.
const pseudoRandom = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

// count 수만큼 파티클의 시작 좌표를 만든다.
const createParticlePositions = (count: number) => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    positions[i3 + 0] = (pseudoRandom(i, 1) - 0.5) * PARTICLE_SPAWN.x;
    positions[i3 + 1] = (pseudoRandom(i, 2) + PARTICLE_SPAWN.yOffset) * PARTICLE_SPAWN.y;
    positions[i3 + 2] = (pseudoRandom(i, 3) - 0.5) * PARTICLE_SPAWN.z;
  }

  return positions;
};

// 각 파티클이 아주 천천히 떠다니게 할 속도 배열을 만든다.
const createParticleVelocities = (count: number) => {
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    velocities[i3 + 0] = (pseudoRandom(i, 4) - 0.5) * PARTICLE_DRIFT;
    velocities[i3 + 1] = (pseudoRandom(i, 5) - 0.5) * PARTICLE_DRIFT;
    velocities[i3 + 2] = (pseudoRandom(i, 6) - 0.5) * PARTICLE_DRIFT;
  }

  return velocities;
};

// 파티클이 정해둔 공간 밖으로 나가면 반대 방향으로 튕기게 만든다.
const reverseVelocityAtBounds = (positions: Float32Array, velocities: Float32Array, index: number) => {
  const i3 = index * 3;

  if (positions[i3 + 0] > PARTICLE_BOUNDS.x || positions[i3 + 0] < -PARTICLE_BOUNDS.x) {
    velocities[i3 + 0] *= -1;
  }

  if (positions[i3 + 1] > PARTICLE_BOUNDS.y || positions[i3 + 1] < -PARTICLE_BOUNDS.y) {
    velocities[i3 + 1] *= -1;
  }

  if (positions[i3 + 2] > PARTICLE_BOUNDS.z || positions[i3 + 2] < -PARTICLE_BOUNDS.z) {
    velocities[i3 + 2] *= -1;
  }
};

// 실제 배경에 떠 있는 입자 군집이다.
const Particles = ({ count = 140 }: ParticlesProps) => {
  // 파티클 시작 위치는 count가 바뀔 때만 다시 계산한다.
  const positions = useMemo(() => createParticlePositions(count), [count]);

  // 속도는 한 번만 만들고 프레임마다 재사용한다.
  const velocitiesRef = useRef<Float32Array | null>(null);

  if (velocitiesRef.current == null) {
    velocitiesRef.current = createParticleVelocities(count);
  }

  // three.js points 객체를 직접 업데이트하기 위한 ref다.
  const pointsRef = useRef<Points>(null);

  useFrame(() => {
    const points = pointsRef.current;
    if (!points) return;

    const positionsAttr = points.geometry.attributes.position;
    const arr = positionsAttr.array as Float32Array;
    const velocities = velocitiesRef.current;

    if (!velocities) return;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      arr[i3 + 0] += velocities[i3 + 0];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];
      reverseVelocityAtBounds(arr, velocities, i);
    }

    // position buffer가 바뀌었다는 사실을 three.js에 알려준다.
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      {/* 파티클 좌표를 geometry attribute로 연결한다. */}
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* 아주 작은 밝은 점으로 안개 같은 입자 질감을 만든다. */}
      <pointsMaterial
        color="#f4f4ff"
        size={0.04}
        sizeAttenuation
        opacity={0.55}
        transparent
      />
    </points>
  );
};

// 카메라가 아주 천천히 호흡하듯 움직이게 만드는 보조 컴포넌트다.
const FloatingCamera = () => {
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  useFrame((state) => {
    const camera = state.camera as PerspectiveCamera;
    if (!cameraRef.current) {
      cameraRef.current = camera;
    }

    const t = state.clock.getElapsedTime();

    // 위아래로 아주 약하게 움직여 정적인 배경이 너무 멈춰 보이지 않게 만든다.
    const baseY = Math.sin(t * 0.15) * 0.15;
    camera.position.x += (0 - camera.position.x) * 0.04;
    camera.position.y += (baseY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// 히어로 뒤에 깔리는 footprint 전용 WebGL 배경이다.
const FootprintBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* 전체 광량은 부드럽게, 포인트 라이트는 살짝 차가운 톤으로 준다. */}
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 2, 6]} intensity={0.7} color="#a5b4fc" />

        {/* 카메라와 파티클만으로 단순한 깊이감을 만든다. */}
        <FloatingCamera />
        <Particles />
      </Canvas>
    </div>
  );
};

export default FootprintBackground;
