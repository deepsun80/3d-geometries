// ConcentricGradientShader.js
import * as THREE from 'three';

class ConcentricGradientMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_color1: { value: new THREE.Color('white') },
        u_color2: { value: new THREE.Color('yellow') },
        u_color3: { value: new THREE.Color('red') },
        u_color4: { value: new THREE.Color('blue') },
        u_color5: { value: new THREE.Color('lightgreen') },
        u_sections: { value: 1.25 },
        u_opacity: { value: 1.0 },
      },
      vertexShader: `
        varying vec3 vPosition;

        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform vec3 u_color3;
        uniform vec3 u_color4;
        uniform vec3 u_color5;
        uniform float u_sections;
        uniform float u_opacity;
        varying vec3 vPosition;

        void main() {
          vec3 absPos = abs(vPosition);
          float dist = 0.0;

          // Determine the face and calculate distance from center of that face
          if (absPos.x >= absPos.y && absPos.x >= absPos.z) {
            dist = max(abs(vPosition.y), abs(vPosition.z));
          } else if (absPos.y >= absPos.x && absPos.y >= absPos.z) {
            dist = max(abs(vPosition.x), abs(vPosition.z));
          } else {
            dist = max(abs(vPosition.x), abs(vPosition.y));
          }

          float segment = dist * u_sections;
          vec3 color = vec3(0.0);

          if (segment < 1.0) {
            color = u_color1;
          } else if (segment < 2.0) {
            color = mix(u_color1, u_color2, segment - 1.0);
          } else if (segment < 3.0) {
            color = mix(u_color2, u_color3, segment - 2.0);
          } else if (segment < 4.0) {
            color = mix(u_color3, u_color4, segment - 3.0);
          } else {
            color = mix(u_color4, u_color5, segment - 4.0);
          }

          gl_FragColor = vec4(color, u_opacity);
        }
      `,
      transparent: true,
    });
  }
}

export default ConcentricGradientMaterial;
