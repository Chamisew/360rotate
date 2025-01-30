import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreePanoramaViewer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        
        const textureLoader = new THREE.TextureLoader();
        const panoramaTexture = textureLoader.load('/images/flower.jpg'); // Replace with your image
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        const material = new THREE.MeshBasicMaterial({ map: panoramaTexture, side: THREE.BackSide });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

       
        camera.position.set(0, 0, 0.1);

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const handleMouseDown = () => (isDragging = true);
        const handleMouseUp = () => (isDragging = false);
        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;
                sphere.rotation.y += deltaX * 0.005; 
                sphere.rotation.x += deltaY * 0.005; 
            }
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const handleTouchStart = () => (isDragging = true);
        const handleTouchEnd = () => (isDragging = false);
        const handleTouchMove = (event) => {
            if (isDragging) {
                const touch = event.touches[0];
                const deltaX = touch.clientX - previousMousePosition.x;
                const deltaY = touch.clientY - previousMousePosition.y;
                sphere.rotation.y += deltaX * 0.005; 
                sphere.rotation.x += deltaY * 0.005; 
                previousMousePosition = { x: touch.clientX, y: touch.clientY };
            }
        };

        if (mountRef.current) {
            mountRef.current.addEventListener('mousedown', handleMouseDown);
            mountRef.current.addEventListener('mouseup', handleMouseUp);
            mountRef.current.addEventListener('mousemove', handleMouseMove);

            mountRef.current.addEventListener('touchstart', handleTouchStart);
            mountRef.current.addEventListener('touchend', handleTouchEnd);
            mountRef.current.addEventListener('touchmove', handleTouchMove);
        }

        
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
                mountRef.current.removeEventListener('mousedown', handleMouseDown);
                mountRef.current.removeEventListener('mouseup', handleMouseUp);
                mountRef.current.removeEventListener('mousemove', handleMouseMove);

                mountRef.current.removeEventListener('touchstart', handleTouchStart);
                mountRef.current.removeEventListener('touchend', handleTouchEnd);
                mountRef.current.removeEventListener('touchmove', handleTouchMove);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default ThreePanoramaViewer;