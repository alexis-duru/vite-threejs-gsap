// import "./public/assets/sass/style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#111111");
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container__three").appendChild(renderer.domElement);
let forme = new THREE.Group();

let geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
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
  stagger: 0.05,
  ease: "back.out",
  duration: 1,
  scrollTrigger: {
    trigger: ".split",
    start: "top 80%",
    // markers: true,
  },
});
