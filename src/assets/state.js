import * as THREE from 'three';

const state = {
  activeMesh: null,
  cameraPos: new THREE.Vector3(7, 7, 7),
  target: new THREE.Vector3(4, 0, 0),
  offset: new THREE.Vector3(0, 0, 0),
  shouldUpdate: false,
};

export default state;
