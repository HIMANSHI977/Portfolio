import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas = document.querySelector('#bg');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const smallScreen = window.matchMedia('(max-width: 700px)').matches;

if (canvas && !reducedMotion) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 100);
  camera.position.z = 13;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !smallScreen, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, smallScreen ? 1.25 : 1.7));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const group = new THREE.Group();
  scene.add(group);

  const palette = [0x7775d9, 0x6fb8df, 0xc1b8ff, 0xdbeafe, 0x8b83d7];
  const material = (color, opacity = 0.78, metalness = 0.16, roughness = 0.34) => new THREE.MeshPhysicalMaterial({
    color, transparent: true, opacity, metalness, roughness, clearcoat: 0.35, clearcoatRoughness: 0.4,
    transmission: 0.08, thickness: 0.7
  });

  // Large, softly lit sculptural forms create a calm editorial 3D backdrop.
  const objects = [];
  const add = (geometry, color, position, scale, rotation, opacity = 0.76) => {
    const mesh = new THREE.Mesh(geometry, material(color, opacity));
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    mesh.userData.base = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z };
    mesh.userData.spin = (Math.random() - 0.5) * 0.0018;
    group.add(mesh);
    objects.push(mesh);
    return mesh;
  };

  add(new THREE.TorusKnotGeometry(1.28, 0.36, 100, 12, 2, 3), palette[1], [4.4, 1.5, -1.8], [1.15, 1.15, 1.15], [0.35, 0.1, 0.45], 0.42);
  add(new THREE.IcosahedronGeometry(1.55, 1), palette[0], [-5.1, -1.6, -2.7], [1.05, 1.18, 0.88], [0.4, 0.2, 0.2], 0.42);
  add(new THREE.TorusGeometry(1.45, 0.12, 14, 96), palette[2], [4.8, -3.4, -3.5], [1.3, 1.3, 1.3], [1.05, 0.3, 0.4], 0.44);
  add(new THREE.SphereGeometry(1.15, 32, 24), palette[3], [-4.7, 3.4, -4], [1.05, 1.2, 0.72], [0.2, 0.3, 0.1], 0.28);
  add(new THREE.OctahedronGeometry(0.82, 1), palette[4], [1.9, 4.1, -3.8], [1, 1.1, 0.8], [0.4, 0.2, 0.7], 0.32);

  // Fine floating particles add depth without making the page visually noisy.
  const count = smallScreen ? 260 : 520;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 23;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 9 - 2;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: 0x9ea9ff, size: 0.025, transparent: true, opacity: 0.52, sizeAttenuation: true });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xffffff, 2.1));
  const keyLight = new THREE.PointLight(0xc6c8ff, 45, 24);
  keyLight.position.set(4, 5, 7);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0x91d5f5, 32, 22);
  fillLight.position.set(-5, -2, 5);
  scene.add(fillLight);

  let targetX = 0, targetY = 0, pointerX = 0, pointerY = 0;
  if (!smallScreen) {
    window.addEventListener('pointermove', (event) => {
      targetX = (event.clientX / innerWidth - 0.5) * 0.7;
      targetY = (event.clientY / innerHeight - 0.5) * 0.45;
    }, { passive: true });
  }

  let frameId;
  const clock = new THREE.Clock();
  function animate() {
    frameId = requestAnimationFrame(animate);
    if (document.hidden) return;
    const t = clock.getElapsedTime();
    pointerX += (targetX - pointerX) * 0.025;
    pointerY += (targetY - pointerY) * 0.025;
    group.rotation.y = pointerX + Math.sin(t * 0.12) * 0.035;
    group.rotation.x = pointerY + Math.cos(t * 0.1) * 0.025;
    objects.forEach((mesh, index) => {
      mesh.rotation.y += mesh.userData.spin;
      mesh.position.y = mesh.userData.base.y + Math.sin(t * 0.34 + index * 1.8) * 0.14;
    });
    particles.rotation.y = t * 0.006;
    renderer.render(scene, camera);
  }
  animate();

  function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, smallScreen ? 1.25 : 1.7));
  }
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else animate();
  });
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frameId);
    renderer.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
  }, { once: true });
}
