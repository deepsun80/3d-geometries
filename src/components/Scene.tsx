import {
  Grid,
  OrbitControls,
  Environment,
  Octahedron,
} from '@react-three/drei';
// import ConcentricGradientMaterial from './ConcentricGradientMaterial';
// import { extend } from '@react-three/fiber';

import Lights from './Lights';
import CubeCircle from './CubeCircle';

// extend({ ConcentricGradientMaterial });

function Scene() {
  return (
    <>
      <Lights />

      {/* Geometry */}
      {/* <mesh>
        <boxGeometry args={[50, 50, 50]} />
        <concentricGradientMaterial attach='material' />
      </mesh> */}
      <Octahedron args={[1, 0]} scale={[50, 50, 50]}>
        <meshStandardMaterial attach='material' color='lightgrey' />
      </Octahedron>

      {[...Array(32).keys()].map((el) => {
        return (
          <CubeCircle
            key={el}
            radius={30 + el * 10}
            numBoxes={20 + el * 8}
            position={[0, 50, 0]}
            rotation={[Math.PI / 32, 0, 0]}
          />
        );
      })}
      {[...Array(32).keys()].map((el) => {
        return (
          <CubeCircle
            key={el}
            radius={30 + el * 10}
            numBoxes={20 + el * 8}
            position={[0, -50, 0]}
            rotation={[-Math.PI / 32, 0, 0]}
          />
        );
      })}

      {/* Optional */}
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI - Math.PI / 2.3}
        minAzimuthAngle={Math.PI}
        maxAzimuthAngle={-Math.PI}
        minDistance={50}
        maxDistance={250}

        // minPolarAngle={Math.PI / 4}
        // maxPolarAngle={Math.PI / 2}
        // minAzimuthAngle={-Math.PI / 2}
        // maxAzimuthAngle={Math.PI / 2}
      />
      {/* <Environment preset='studio' /> */}
      <Grid
        sectionSize={3}
        sectionColor={'white'}
        sectionThickness={1}
        cellSize={1}
        cellColor={'#ececec'}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={100}
        fadeStrength={5}
      />
    </>
  );
}

export default Scene;
