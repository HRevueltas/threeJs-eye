import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";



// Cursor
const cursor = {
    x: 0,
    y: 0
}



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
// Camera
camera.position.z = 3;
scene.add(camera);


// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = [
    new THREE.MeshBasicMaterial({ color: 'fuchsia' }),
    new THREE.MeshBasicMaterial({ color: 'blue' }),
    new THREE.MeshBasicMaterial({ color: 'green' }),
    new THREE.MeshBasicMaterial({ color: 'orange' }),
    new THREE.MeshBasicMaterial({ color: 'red' }),
    new THREE.MeshBasicMaterial({ color: 'pink' }),
]
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Canvas
const canvas = document.querySelector('.webgl');



// Resize event
window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Double click event
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})


// Controls
// const controls = new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(width, height);





// this indicates if the mouse is over the canvas
let isMouseOver = true;
const initialRotation = { x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z };
const initialPosition = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z };
window.addEventListener('mousemove', (event) => {

    // Update the cursor object with the mouse position
    isMouseOver = true;
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);

    // Update the mesh position based on cursor position
    gsap.to(mesh.position, {
        duration: 1,
        x: cursor.x * 5,
        y: cursor.y * 5,
        z: 0,
        // ease: "bounce" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "elastic" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "back" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "steps(600)" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "power4" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "power2" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "power1" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "power3" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "power5" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "power6.out" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "expo" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "expo" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "sine" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "linear" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "quint" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "quart" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "quad" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
        // ease: "cubic" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia

    });

    // Update the mesh rotation based on cursor position
    gsap.to(mesh.rotation, {
        duration: 1,
        x: cursor.y * 1.4,
        y: cursor.x * 1.4,

        ease: "back" // Opcional: puedes ajustar el tipo de suavizado según tu preferencia
    });
});

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mouseout', () => {
    isMouseOver = false;
    gsap.to(mesh.position, {
        duration: 1,
        x: initialPosition.x,
        y: initialPosition.y,
        z: initialPosition.z,
        ease: "expo"
    });

 gsap.to(mesh.rotation, {
        duration: 1,
        x: initialRotation.x,
        y: initialRotation.x,
        z: initialRotation.z,
        ease: "back"
    });
})





// Clock
const clock = new THREE.Clock();
// Animation loop
const tick = () => {
    // const elapsedTime = clock.getElapsedTime();


    // this will rotate the mesh if the mouse is over the canvas
    // if (isMouseOver) {
    //     mesh.rotation.y = cursor.x;
    //     mesh.rotation.x = cursor.y;
    // }



    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);
    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();
