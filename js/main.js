// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep track of the mouse position, so we can make the eye move


const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);

})


// Keep the 3D objects on global variables so we can access them later
let object;
let object2;

// Set which object to render
let objToRender = 'eye';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the first eye
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    object.position.x = -150; // Adjust the position of the first eye
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Load the second eye
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object2 = gltf.scene;
    scene.add(object2);
    object2.position.x = 150; // Adjust the position of the second eye
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 25 : 500;

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) // Top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

// This adds controls to the camera, so we can rotate / zoom it with the mouse
let controls;
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Render the scene
function animate() {

  // Update the rotation of the first eye
  if (object && objToRender === "eye") {
    object.rotation.y = -3 + cursor.x / window.innerWidth * 3;
    object.rotation.x = -1.2 + cursor.y * 2.5 / window.innerHeight;
    // object.position.y = 1 + cursor.y / window.innerHeight * 200;
    //  object.position.x = 1 + cursor.x / window.innerWidth * 200;
  }
  // Update the rotation of the second eye
  if (object2 && objToRender === "eye") {
    object2.rotation.y = -3 + cursor.x / window.innerWidth * 3;
    object2.rotation.x = -1.2 + cursor.y * 2.5 / window.innerHeight;
    
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);

}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add mouse position listener, so we can make the eyes move
document.onmousemove = (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
}

// Start the 3D rendering
animate();
