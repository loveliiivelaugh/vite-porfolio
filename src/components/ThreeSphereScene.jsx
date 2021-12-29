import React, { createRef, forwardRef, Suspense, useEffect, useRef, useState } from 'react';
// import all hooks from react-router-dom
import { useLocation } from 'react-router-dom';
import { Canvas, extend, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useGLTF, Html, useAnimations, Environment, PerspectiveCamera, OrbitControls, useScroll, ScrollControls, Scroll, Stars } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import EarthDayMap from "../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../assets/textures/8k_earth_clouds.jpg";
// import { Physics } from 'use-cannon';


function Images() {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const group = useRef()

  // console.log("data", data, group.current.children[0])
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[1].material.zoom = 1 + data.range(0, 2 / 3) / 3
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1
    // group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3
    // group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3)
    // group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
  })

  return (
    <group ref={group}> {/* [x, y, z] */}
      <PictureBox id="top" position={[2, 0, 2]} scale={0.5} />
      <PictureBox id="stock-dashboard" position={[2, -5, 2]} scale={0.5} />
      <PictureBox id="binance" position={[2, -10, 2]} scale={0.5} />
      <PictureBox id="dex" position={[2, -15, 2]} scale={0.5} />
      <PictureBox id="left" position={[2, -20, 2]} scale={0.5} />
      {/* <PictureBox position={[-1.5, 0, 0]} /> */}
    </group>
  )
}

const PictureBox = ({id, position, scale}) => {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  // useFrame((state) => ref.current.scale.setScalar(hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 50 : 1))
  // Sets document.body.style.cursor: useCursor(flag, onPointerOver = 'pointer', onPointerOut = 'auto')
  // useCursor(hovered)
  const handleClick = path => {
    setClicked(!clicked);
    console.log(path, ref)
    window.location.href = `projects/${path}`;
    // router.push(`/${path}`)

  }

  console.log("hovered", hovered, "clicked", clicked)
  return (
    <mesh
      position={position}
      scale={scale}
      ref={ref}
      receiveShadow
      castShadow
      // onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
      onClick={(e) => handleClick(id)}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}>
      <boxGeometry args={[3, 4, 0.075]} />
      <meshStandardMaterial roughness={1} transparent opacity={0.6} color={clicked ? 'pink' : 'lightblue'} />
    </mesh>
  )
}


const Earth = props => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 8;
    cloudsRef.current.rotation.y = elapsedTime / 10;
  });

  return (
    <>
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  )
}

const ThreeSphereScene = () => {
  const state = {
    sections: 6,
    pages: 1,
    zoom: 75,
    ref: createRef(),
    top: createRef()
  }
  const scrollArea = useRef()
  const onScroll = (e) => console.log("scroll: ", e)
  // const onScroll = (e) => (state.top.current = e.target.scrollLeft)
  // useEffect(() => void onScroll({ target: (state.ref = scrollArea.current) }), [])
  
  return (
    <div style={{ height: '100vh', width: `${state.pages * 100}vw`, zIndex: -20 }} >
      <Canvas
        shadowMap
        camera={{ position: [2, 0, 4], filmOffset: 0 }}
        style={{ background: '#272727' }}
        class="scrollArea" ref={scrollArea} onScroll={onScroll}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <Suspense fallback={"Loadin..."}>
          <Earth />
        </Suspense>
        {/* <Suspense fallback={null}>
          <ScrollControls damping={4} pages={4}>
            <Scroll>
              <Images />
            </Scroll>
            <Scroll html>
              <h1 style={{ position: 'absolute', top: '60vh', left: '35vw', fontSize: '15vw' }}>We</h1>
              <h1 style={{ position: 'absolute', top: '120vh', left: '40vw' , fontSize: '15vw'}}>All</h1>
              <h1 style={{ position: 'absolute', top: '198.5vh', left: '35vw', fontSize: '15vw' }}>Live</h1>
              <h1 style={{ position: 'absolute', top: '250.5vh', left: '35vw', fontSize: '15vw' }}>Here</h1>
              <h1 style={{ position: 'absolute', top: '310.5vh', left: '35vw', fontSize: '15vw' }}>✊</h1>
            </Scroll>
          </ScrollControls> 
        </Suspense> */}
      </Canvas>
    </div>
  )
}

export default ThreeSphereScene
