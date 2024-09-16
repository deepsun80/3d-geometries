function Lights() {
  return (
    <group>
      <directionalLight position={[0, 0, -100]} intensity={1.5} />
      <ambientLight intensity={0.5} />
    </group>
  );
}

export default Lights;
