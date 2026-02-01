import { useEffect, useState } from 'react';
import { useMotionValue } from 'framer-motion';

export const useCursor = () => {
  // Touch Detection
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Mouse Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Mouse Velocity & Direction
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  
  // Hover State
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    // Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;

      if (deltaTime > 0) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const speed = distance / deltaTime;

        setVelocity(speed);
        setDirection({ x: deltaX, y: deltaY });

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = currentTime;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Hover Handlers
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add Listeners
    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="button"], input[type="submit"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isTouchDevice, mouseX, mouseY]);

  return { isTouchDevice, mouseX, mouseY, velocity, direction, isHovering };
};