import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TextureLoader } from "three";

gsap.registerPlugin(SplitText, ScrollTrigger);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container__three").appendChild(renderer.domElement);

let forme = new THREE.Group();

let geometry = new THREE.TorusGeometry(10, 3, 100, 16);
let material = new THREE.MeshNormalMaterial({
  color: 0xff0000,
  wireframe: true,
  opacity: 1,
  transparent: true,
  wireframeLinecap: "round",
  wireframeLinejoin: "round",
  wireframeLinewidth: 5,
});

forme.add(new THREE.Mesh(geometry, material));

// Load .OBJ file

const objLoader = new OBJLoader();

objLoader.load("public/assets/laurel.obj", (obj) => {
  obj.scale.set(5, 5, 5);

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const textureLoader = new TextureLoader();
      const texture = textureLoader.load("public/assets/texture.png");
      child.material = new THREE.MeshBasicMaterial({ map: texture });
    }
  });

  camera.position.z = 100;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  let render = function () {
    requestAnimationFrame(render);
    for (let i = 0; i < obj.children.length; i++) {
      obj.children[i].rotation.y += 0.001;
    }

    controls.update();
    renderer.render(scene, camera);
  };

  render();

  scene.add(obj);
});

scene.add(forme);

camera.position.z = 100;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

let render = function () {
  requestAnimationFrame(render);
  forme.rotation.x += 0.01;
  forme.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
};

render();

let mySplitText = new SplitText(".split", {
  type: "chars",
});

let chars = mySplitText.chars;

gsap.from(chars, {
  yPercent: 130,
  opacity: 0,
  stagger: 0.05,
  ease: "back.out",
  duration: 1,
  scrollTrigger: {
    trigger: ".split",
    start: "top 80%",
  },
});

// Créer un effet de parallax entre les images avec Gsap et ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);

// Faire translate sur Y les img en créant du decalage entre les images
gsap.to(".img1", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".img1",
    scrub: true,
    start: "top bottom",
    end: "bottom top",
  },
});

// gsap.to(".img2", {
//   yPercent: -70,
//   ease: "none",
//   opacity: 1,
//   scrollTrigger: {
//     trigger: ".img2",
//     scrub: true,
//     start: "top bottom",
//     end: "bottom top",
//   },
// });

// Refaire la même animation mais avec en plus un fade passant de 0 à 1 au scroll
gsap.to(".img2", {
  yPercent: -70,
  ease: "none",
  scrollTrigger: {
    trigger: ".img2",
    scrub: true,
    start: "top bottom",
    end: "bottom top",
  },
});
