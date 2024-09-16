import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import ConcentricGradientMaterial from './ConcentricGradientMaterial';
import { extend } from '@react-three/fiber';

interface CubeCircleProps {
  radius: number;
  numBoxes: number;
  position: any[];
  rotation: any[];
}

interface RotatingBoxProps {
  position: any[];
  opacity: number;
}

extend({ ConcentricGradientMaterial });

const RotatingBox = ({ position, opacity }: RotatingBoxProps) => {
  const boxRef = useRef();

  // Rotate the box on its local y-axis
  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.02;
      //   boxRef.current.rotation.y += 0.01;
      //   boxRef.current.rotation.z += 0.02;
    }
  });

  return (
    <Box ref={boxRef} position={position} args={[8, 8, 8]}>
      <concentricGradientMaterial attach='material' u_opacity={opacity} />
      {/* <meshStandardMaterial attach='material' color='lightgrey' wireframe /> */}
    </Box>
  );
};

const CubeCircle = ({
  radius,
  numBoxes,
  position,
  rotation,
}: CubeCircleProps) => {
  // Calculate the angle between each box
  const angleStep = (2 * Math.PI) / numBoxes;

  // Create an array of positions for the boxes
  const positions = new Array(numBoxes).fill(0).map((_, i) => {
    const angle = i * angleStep;
    return [
      radius * Math.cos(angle), // x position
      0, // y position (you can change this if you want to position them vertically)
      radius * Math.sin(angle), // z position
    ];
  });

  return (
    <group position={position} rotation={rotation}>
      {positions.map((position, index) => (
        <RotatingBox key={index} position={position} opacity={0.5} />
      ))}
    </group>
  );
};

export default CubeCircle;
