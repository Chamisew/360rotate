import React, { useEffect, useRef } from 'react';

const PanoramaViewer = () => {
    const panoramaRef = useRef(null);

    useEffect(() => {
       
        window.pannellum.viewer(panoramaRef.current, {
            type: 'equirectangular',
            panorama: '/images/flower.jpg', 
            autoLoad: true,
            showControls: true,
            hotSpots: [
                {
                    pitch: -10,
                    yaw: 180,
                    type: 'info',
                    text: 'This is a sample hotspot.',
                },
            ],
        });
    }, []);

    return (
        <div
            ref={panoramaRef}
            style={{ width: '100%', height: '100vh' }}
        ></div>
    );
};

export default PanoramaViewer;