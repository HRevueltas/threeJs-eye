import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
let { width, height } = sizes;

// camera 
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
camera.position.z = 192;
// scene.add(camera);

// Cursor
const cursor = {
    x: 0,
    y: 0
}

let eye;
let objToRender = 'eye';
const loader = new GLTFLoader();

let initialRotation;
let initialPosition;

// Load the first eye
loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        eye = gltf.scene;
        scene.add(eye);
        // eye.position.x = 10;
        // eye.rotation.y = 50;
        // eye.rotation.x = 50;


        // Define initialRotation and initialPosition here
        initialRotation = { x: eye.rotation.x, y: eye.rotation.y, z: eye.rotation.z };
        initialPosition = { x: eye.position.x, y: eye.position.y, z: eye.position.z };
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);

    if (eye) {
        gsap.to(eye.position, {
            duration: 1,
            x: cursor.x * 50,
            y: cursor.y * 50,
            z: 0,
            ease: "back"
        });

        gsap.to(eye.rotation, {
            duration: 1,
            x: -3 + cursor.x / window.innerWidth * 3,
            y: -1.2 + cursor.y * 2.5 / window.innerHeight,
            ease: "back"
        });
    }
});

window.addEventListener('mouseout', () => {
    if (eye) {
        gsap.to(eye.position, {
            duration: 1,
            x: initialPosition.x,
            y: initialPosition.y,
            z: initialPosition.z,
            ease: "expo"
        });

        gsap.to(eye.rotation, {
            duration: 1,
            x: initialRotation.x,
            y: initialRotation.x,
            z: initialRotation.z,
            ease: "back"
        });
    }
});

window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);

document.getElementById("container3D").appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500)
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {
    // Update OrbitControls
    // controls.update();
 
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();