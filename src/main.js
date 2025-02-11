import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('#main_bg'); // Ensure this exists in HTML
const renderer = new THREE.WebGLRenderer({ canvas });

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const wireframeMat = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const wireLightMat = new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, wireLightMat);
scene.add(torusKnot);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5);
pointLight.intensity = 5

scene.add(pointLight)

function renderLoop() {
  requestAnimationFrame(renderLoop);
  torusKnot.rotateY(0.01)

  controls.update()
  renderer.render(scene, camera);
}

renderLoop();
