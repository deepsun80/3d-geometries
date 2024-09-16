import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, -80], fov: 120, far: 1000 }}>
      <Suspense fallback={'Loading...'}>
        <color attach='background' args={['black']} />
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default App;
