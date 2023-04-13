import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';
const modelz = new URL('../assets/tesla_model_3.glb', import.meta.url);
const road = new URL('../assets/american_road_overpass_underpass_bridge.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(33, 23, -588);
orbit.update();

const gltfLoader = new GLTFLoader();
let car;
gltfLoader.load(modelz.href, function (gltf) {
    car = gltf.scene;
    car.position.z = 1100;
    car.position.y = 75;
    //model.scale.set(6,10,15);
    console.log(car.scale.x);
    console.log(car.scale.y);
    console.log(car.scale.z);
    scene.add(car);
});

gltfLoader.load(road.href, function (gltf) {
    const model = gltf.scene;
    scene.add(model);
});
const cubeTextureLoader = new THREE.CubeTextureLoader();


const ambientLight = new THREE.AmbientLight(0xffffffff);
scene.add(ambientLight);
/*
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);*/
//const gltfLoader = new GLTFLoader();

/*
renderer.outputEncoding = THREE.sRGBEncoding;  //briteness for hdr
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;
*/
/*const loader = new RGBELoader();
loader.load(hdrTextureURL,function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment= texture;
  
    gltfLoader.load('../img/scene.gltf', function(gltf){
      const model = gltf.scene;
      scene.add(model);
    });
});*/


//camera movement

window.addEventListener('keydown', function () {
            moveCamera(0, 75, 0);
            rotateCamera(0, 3, 0);   

});
window.addEventListener('mousein', function () {
    moveCamera(0, 75, -1100);
    rotateCamera(0, 0, 0);   

});
window.addEventListener('click', function () {
    moveCamera(-1460, 330, -129);
    rotateCamera(0, -1.5, 0);   

});
window.addEventListener('mouseover', function () {
    moveCamera(-36, 112, 1000);
    rotateCamera(0, 0, 0);   

});

function moveCamera(x, y, z) {
    gsap.to(camera.position, {
        x,
        y,
        z,
        duration: 2
    });
}

function rotateCamera(x, y, z) {
    gsap.to(camera.rotation, {
        x,
        y,
        z,
        duration: 2
    });
}




const carSpeed = 5;
let t = 1;
function animate() {
   
    requestAnimationFrame(animate);
    if (car.position.z > -1100 && t == 1) {
        car.position.z -= carSpeed;
    }
    else if ((car.position.x > (-1400)) && (t == 2)) {
        car.position.x -= carSpeed;
    }
    else if (car.position.z == -1100) {
        car.position.x = 1600;
        car.position.y = 370;
        car.position.z = 25;
        //car.rotation.x += 0.01;
        car.rotation.y = 1.57;
        t = 2;
        //car.rotation.z += 0.01;
    }
    else if (car.position.x == -1400) {
        car.position.x = 0;
        car.position.y = 75;
        car.position.z = 1100;
        car.rotation.y = 0;
        t=1;
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});