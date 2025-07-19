import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMediaQuery } from 'usehooks-ts';

extend({ MeshLineGeometry, MeshLineMaterial });

export const Keychain = () => {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
        <KeychainModel />
      </Physics>
      <Environment>
        <color attach="background" />
        <Lightformer
          intensity={2}
          color="#6482e4" // #6482e4
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={30}
          color="#6482e4"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="#6482e4"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="#6482e4"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
};

function KeychainModel({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    keychain = useRef();

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2
  };

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, keychain, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      [j1, j2, j3].forEach((joint) => {
        const vel = joint.current.linvel();
        const max = 20;
        joint.current.setLinvel({
          x: THREE.MathUtils.clamp(vel.x, -max, max),
          y: THREE.MathUtils.clamp(vel.y, -max, max),
          z: THREE.MathUtils.clamp(vel.z, -max, max)
        });
      });
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [keychain, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      keychain.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current) {
      // fix most of the jitter when over pulling the card
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      // calculate catmul curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      // tilt it back towards the screen
      ang.copy(keychain.current.angvel());
      rot.copy(keychain.current.rotation());
      keychain.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 1, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  const min375 = useMediaQuery('(min-width: 375px)');
  const min768 = useMediaQuery('(min-width: 768px)');
  const min1024 = useMediaQuery('(min-width: 1024px)');

  const modelSizeMap = {
    min375: [[5], [-0.05, -1.025, -0.05]],
    min768: [[4.5], [-0.05, -0.75, -0.05]],
    min1024: [[5], [-0.05, -1.025, -0.05]]
  };

  const scale = min1024
    ? modelSizeMap.min1024[0][0]
    : min768
      ? modelSizeMap.min768[0][0]
      : min375
        ? modelSizeMap.min375[0][0]
        : 4;

  const position = min1024
    ? modelSizeMap.min1024[1]
    : min768
      ? modelSizeMap.min768[1]
      : min375
        ? modelSizeMap.min375[1]
        : 0;

  return (
    <>
      <group position={[0, 4.15, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, 0, 2]}
          ref={keychain}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[1, 1.125, 0.01]} />
          <group
            scale={scale}
            position={position}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(keychain.current.translation())))
            )}
          >
            <FlowerModel />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#6482e4"
          lineWidth={0.3}
          repeat={[-3, 1]}
          depthTest={false}
          resolution={[width, height]}
        />
      </mesh>
    </>
  );
}

const FlowerModel = (props) => {
  const { nodes, materials } = useGLTF('/models/keychain.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve002.geometry}
        material={materials.metallic}
        position={[0.009, 0.238, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};
