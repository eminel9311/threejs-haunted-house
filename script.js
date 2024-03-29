window.onload = (e) => {
  /**
   * Base
   */
  // Debug
  const gui = new lil.GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();

  const doorColorTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/color.jpg"
  );
  const doorAlphaTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/alpha.jpg"
  );
  const doorAmbientOcclusionTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/ambientOcclusion.jpg"
  );
  const doorHeightTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/height.jpg"
  );
  const doorNormalTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/normal.jpg"
  );
  const doorMetalnessTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/metalness.jpg"
  );
  const doorRoughnessTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/door/roughness.jpg"
  );

  const bricksColorTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/bricks/color.jpg"
  );
  const bricksAmbientOcclusionTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/bricks/ambientOcclusion.jpg"
  );
  const bricksNormalTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/bricks/normal.jpg"
  );
  const bricksRoughnessTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/bricks/roughness.jpg"
  );

  const grassColorTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/grass/color.jpg"
  );
  const grassAmbientOcclusionTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/grass/ambientOcclusion.jpg"
  );
  const grassNormalTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/grass/normal.jpg"
  );
  const grassRoughnessTexture = textureLoader.load(
    "https://dev.ekyc.icvnpt.com/textures/grass/roughness.jpg"
  );

  grassColorTexture.repeat.set(8, 8);
  grassAmbientOcclusionTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  grassNormalTexture.wrapS = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

  grassColorTexture.wrapT = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
  grassNormalTexture.wrapT = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

  /**
   * House
   */
  // House container
  const house = new THREE.Group();
  scene.add(house);

  // Walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    })
  );
  walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
  );
  walls.position.y = 1.25;
  house.add(walls);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture,
    })
  );
  floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = 0;
  scene.add(floor);

  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4, 10),
    new THREE.MeshStandardMaterial({ color: "#b35f45" })
  );
  // Radius: bán kính của hình nón - 3.5 pixel
  // height: chiều cao của hình nón - 1
  // radialSegments : số cạnh của hình nón - 4
  // heightSegments : số hàng tính theo chiều cao của mái, làm giả các hàng ngói
  roof.rotation.y = Math.PI * 0.25;
  roof.position.y = 2.5 + 0.5;
  house.add(roof);

  // Door
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      metalnessMap: doorMetalnessTexture,
      roughnessMap: doorRoughnessTexture,
    })
  );
  door.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
  );
  door.position.y = 1;
  door.position.z = 2 + 0.01;
  house.add(door);

  // Bushes
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(0.8, 0.2, 2.2);

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.4, 0.1, 2.1);

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.4, 0.4, 0.4);
  bush3.position.set(-0.8, 0.1, 2.2);

  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush4.scale.set(0.15, 0.15, 0.15);
  bush4.position.set(-1, 0.05, 2.6);

  house.add(bush1, bush2, bush3, bush4);

  // Graves
  const graves = new THREE.Group();
  scene.add(graves);

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2; // Random góc độ
    const radius = 3 + Math.random() * 6; // Random bán kính
    const x = Math.cos(angle) * radius; // Get the x position using cosinus
    const z = Math.sin(angle) * radius; // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);

    // Position
    grave.position.set(x, 0.3, z);

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;

    // Add to the graves container
    graves.add(grave);
  }

  /**
   * Ghosts
   */
  const ghost1 = new THREE.PointLight("#a6a6a6", 2, 3);
  scene.add(ghost1);

  const ghost2 = new THREE.PointLight("#a6a6a6", 2, 3);
  scene.add(ghost2);

  const ghost3 = new THREE.PointLight("#a6a6a6", 2, 3);
  scene.add(ghost3);

  /**
   * Lights
   */
  // Ambient light
  const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
  gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
  scene.add(ambientLight);

  // Directional light
  const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
  moonLight.position.set(4, 5, -2);
  gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
  gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
  gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
  gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
  scene.add(moonLight);

  // Door light
  const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
  doorLight.position.set(0, 2.2, 2.7);
  house.add(doorLight);

  /**
   * Model
   */
  const loader = new THREE.GLTFLoader();
  
  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/tree/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(3, 1.2, -10);
      scene.add(root);
    }
  );


  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/trees/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(7, 0, 8);
      root.scale.set(0.005, 0.005, 0.005);
      scene.add(root);
    }
  );

  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/trees2/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(3, 0, 2);
      root.scale.set(0.003, 0.003, 0.003);
      scene.add(root);
    }
  );

  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/trees/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(-7, 0, 8);
      root.scale.set(0.005, 0.005, 0.005);
      scene.add(root);
    }
  );

  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/trees/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(7, 0, -8);
      root.scale.set(0.005, 0.005, 0.005);
      scene.add(root);
    }
  );

  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/trees/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(-7, 0, -8);
      root.scale.set(0.005, 0.005, 0.005);
      scene.add(root);
    }
  );

   loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/trees2/scene.gltf",
    (gltf) => {
      const root = gltf.scene;
      root.position.set(-2, 0, -8);
      root.scale.set(0.003, 0.003, 0.003);
      scene.add(root);
    }
  );

  loader.load(
    //model here
    "https://dev.ekyc.icvnpt.com/models/ghost_girl_animated/scene.gltf",
    loadAnimationZombie
  );

  function loadAnimationZombie(gltf) {
    const mesh = gltf.scene;
    mesh.position.set(-3, 0, 6);
    mesh.rotation.set(0, 3, 0);
    console.log('mesh', mesh)
    mesh.scale.set(0.8, 0.8, 0.8);
    scene.add(mesh);
    if (gltf.animations.length) {
      setupAnimationZombie(mesh, gltf);
    }
  }
  
  var mixer = null;
  function setupAnimationZombie(mesh, gltf) {
    mixer = new THREE.AnimationMixer(mesh);
    const clip = gltf.animations[0];
    const action = mixer.clipAction(clip);
    action.play();
  }
  /**
   * Fog
   */
  const fog = new THREE.Fog("#262837", 1, 15);
  scene.fog = fog;

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 4;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // Controls
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#262837");

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Loader model
    if(mixer) {
      const delta = clock.getDelta();
      mixer.update(delta*2);
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
