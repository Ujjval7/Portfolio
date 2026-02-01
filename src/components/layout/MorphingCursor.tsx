import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';

interface MorphingCursorProps {
  color?: string;
  size?: number;
}

export function MorphingCursor({ 
  color = '#8b5cf6',
  size = 40 
}: MorphingCursorProps) {
  const { isTouchDevice, mouseX, mouseY, velocity, direction, isHovering } = useCursor();

  // Spring animations
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Hide default cursor
  useEffect(() => {
  if (!isTouchDevice) {
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => void document.head.removeChild(style);
  }
}, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // Calculate morph values based on velocity
  const speed = Math.min(velocity / 10, 50);
  const scaleX = 1 + (speed / 100);
  const scaleY = 1 - (speed / 200);
  const rotation = (direction.x + direction.y) * 0.1;
  const skewX = direction.x * 0.05;
  const skewY = direction.y * 0.05;

  // Dynamic colors based on speed
  const getGradient = () => {
    if (velocity > 1000) return `linear-gradient(135deg, #ff006e, #8b5cf6)`;
    if (velocity > 500) return `linear-gradient(135deg, #8b5cf6, #06b6d4)`;
    return `linear-gradient(135deg, ${color}, ${color}dd)`;
  };

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>

      {/* Main Blob */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: size,
          height: size,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          rotate: rotation,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Inner Blob with Morph */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: getGradient(),
            boxShadow: `
              0 0 20px ${color}66,
              0 0 40px ${color}44,
              0 0 60px ${color}22,
              inset 0 0 20px ${color}88
            `,
            filter: 'url(#gooey)',
          }}
          animate={{
            scaleX: scaleX,
            scaleY: scaleY,
            skewX: skewX,
            skewY: skewY,
            rotateX: direction.y * 0.3,
            rotateY: direction.x * 0.3,
            rotateZ: rotation,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          {/* Highlight */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
              borderRadius: '50%',
              filter: 'blur(4px)',
              transform: 'translateZ(20px)',
            }}
          />
        </motion.div>

        {/* Outer Ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            border: `2px solid ${color}88`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) rotateX(60deg)',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotate: 360,
            scale: isHovering ? 1.2 : 1,
          }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
            scale: { type: 'spring', damping: 20 },
          }}
        />
      </motion.div>

      {/* Outer Glow */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: size * 2.5,
          height: size * 2.5,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${color}33, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', damping: 20 }}
      />

      {/* Center Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          width: 4,
          height: 4,
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />

      {/* Trail Blobs (only on fast movement) */}
      {velocity > 800 && (
        <>
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              x: cursorX,
              y: cursorY,
              width: size * 0.6,
              height: size * 0.6,
              background: `radial-gradient(circle, ${color}88, transparent)`,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9997,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(8px)',
            }}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6 }}
          />
        </>
      )}
    </>
  );
}