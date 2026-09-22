/* Scène 3D minimale du hero — sculpture abstraite (nœud torique + halo
   filaire), rendue uniquement si THREE (CDN épinglé, voir index.html) et
   WebGL sont disponibles. Repli : le visuel CSS statique déjà présent
   dans le DOM reste visible si cette couche ne se charge pas. */
(function () {
  'use strict';

  var container = document.querySelector('[data-hero-3d]');

  if (!container || typeof window.THREE === 'undefined') {
    return;
  }

  var canWebgl = (function () {
    try {
      var c = document.createElement('canvas');
      return Boolean(window.WebGLRenderingContext) &&
        (c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  })();

  if (!canWebgl) {
    container.setAttribute('data-hero-3d-fallback', 'true');
    return;
  }

  var THREE = window.THREE;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  var group = new THREE.Group();
  scene.add(group);

  var knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.5, 0.42, 128, 18),
    new THREE.MeshStandardMaterial({
      color: 0xff4d1f,
      metalness: 0.35,
      roughness: 0.32,
      flatShading: false
    })
  );
  group.add(knot);

  var halo = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3, 1),
    new THREE.MeshBasicMaterial({
      color: 0x100f0c,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    })
  );
  group.add(halo);

  var orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4d1f,
    transparent: true,
    opacity: 0.34,
    wireframe: true
  });

  var orbitA = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.026, 8, 72), orbitMaterial);
  orbitA.rotation.x = Math.PI * 0.18;
  group.add(orbitA);

  var orbitB = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.018, 8, 72), orbitMaterial.clone());
  orbitB.material.opacity = 0.18;
  orbitB.rotation.y = Math.PI * 0.55;
  group.add(orbitB);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  var key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(4, 5, 6);
  scene.add(key);

  var rim = new THREE.PointLight(0x100f0c, 0.6);
  rim.position.set(-5, -3, -4);
  scene.add(rim);

  var pointer = { x: 0, y: 0 };
  var visible = true;
  var rafId = null;

  function resize() {
    var rect = container.getBoundingClientRect();
    var size = Math.max(rect.width, 1);
    renderer.setSize(size, size);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  function renderFrame() {
    knot.rotation.y += 0.0035;
    knot.rotation.x += 0.0016;
    halo.rotation.y -= 0.0018;
    orbitA.rotation.z += 0.0022;
    orbitB.rotation.x -= 0.0012;

    group.rotation.y += (pointer.x * 0.3 - group.rotation.y) * 0.04;
    group.rotation.x += (pointer.y * 0.2 - group.rotation.x) * 0.04;

    renderer.render(scene, camera);
  }

  function loop() {
    if (!visible || document.hidden) {
      rafId = null;
      return;
    }
    renderFrame();
    rafId = window.requestAnimationFrame(loop);
  }

  function startLoop() {
    if (reduceMotion) {
      renderFrame();
      return;
    }
    if (rafId === null) {
      rafId = window.requestAnimationFrame(loop);
    }
  }

  function stopLoop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  if (!reduceMotion) {
    window.addEventListener('pointermove', function (event) {
      var rect = container.getBoundingClientRect();
      var relX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      var relY = (event.clientY - rect.top) / Math.max(rect.height, 1);
      pointer.x = Math.min(Math.max(relX - 0.5, -0.5), 0.5);
      pointer.y = Math.min(Math.max(relY - 0.5, -0.5), 0.5);
    }, { passive: true });
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopLoop();
    } else if (visible) {
      startLoop();
    }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible = entry.isIntersecting;
        if (visible) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    }, { threshold: 0.05 }).observe(container);
  }

  resize();
  container.classList.add('is-ready');
  if (container.parentElement) {
    container.parentElement.classList.add('has-3d');
  }
  startLoop();
})();
