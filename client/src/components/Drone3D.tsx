import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Drone3DProps {
  dronePosition: number;
  showDrone: boolean;
}

export default function Drone3D({ dronePosition, showDrone }: Drone3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const droneGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current || !showDrone) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create drone group
    const droneGroup = new THREE.Group();
    droneGroupRef.current = droneGroup;
    scene.add(droneGroup);

    // Drone body (main fuselage)
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1, 4, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5016 }); // Forest green
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    droneGroup.add(body);

    // Drone arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5016 });

    // Create 4 arms
    const arms = [];
    const armPositions = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];

    armPositions.forEach((pos) => {
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(pos[0], pos[1], pos[2]);
      arm.rotation.z = Math.PI / 2;
      droneGroup.add(arm);
      arms.push(arm);
    });

    // Propellers
    const propellerGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32);
    const propellerMaterial = new THREE.MeshPhongMaterial({ color: 0x9acd32 }); // Lime green

    const propellerPositions = [
      [1.2, 0, 0],
      [-1.2, 0, 0],
      [0, 0, 1.2],
      [0, 0, -1.2],
    ];

    const propellers: THREE.Mesh[] = [];
    propellerPositions.forEach((pos) => {
      const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
      propeller.position.set(pos[0], pos[1], pos[2]);
      propeller.rotation.x = Math.PI / 2;
      droneGroup.add(propeller);
      propellers.push(propeller);
    });

    // Water spray particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 20;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 0.5; // x
      positions[i + 1] = -1.5 - Math.random() * 0.5; // y (below drone)
      positions[i + 2] = (Math.random() - 0.5) * 0.5; // z
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x87ceeb, // Sky blue
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    droneGroup.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate propellers
      propellers.forEach((propeller) => {
        propeller.rotation.x += 0.3;
      });

      // Rotate entire drone based on scroll
      droneGroup.rotation.y = (dronePosition / 100) * Math.PI * 2; // 360 degrees

      // Gentle bobbing motion
      droneGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [showDrone]);

  // Update drone rotation based on scroll
  useEffect(() => {
    if (droneGroupRef.current) {
      droneGroupRef.current.rotation.y = (dronePosition / 100) * Math.PI * 2;
    }
  }, [dronePosition]);

  if (!showDrone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
      style={{
        width: "120px",
        height: "120px",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
