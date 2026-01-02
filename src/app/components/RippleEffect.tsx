import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function RippleEffect({ children, className = '' }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rippleCounterRef = useRef(0);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const createRipple = (e: React.TouchEvent | React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const newRipple: Ripple = {
      id: rippleCounterRef.current++,
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 3500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsLongPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      createRipple(e);
      setIsLongPressing(false);
    }, 500); // 500ms for long press
  };

  const handleTouchEnd = () => {
    setIsLongPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsLongPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      createRipple(e);
      setIsLongPressing(false);
    }, 500);
  };

  const handleMouseUp = () => {
    setIsLongPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsLongPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Long press indicator */}
      <AnimatePresence>
        {isLongPressing && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
      
      <AnimatePresence>
        {ripples.map(ripple => {
          // Calculate distance to screen edges for full coverage
          const maxSize = Math.max(
            Math.hypot(ripple.x, ripple.y),
            Math.hypot(window.innerWidth - ripple.x, ripple.y),
            Math.hypot(ripple.x, window.innerHeight - ripple.y),
            Math.hypot(window.innerWidth - ripple.x, window.innerHeight - ripple.y)
          ) * 3;

          return (
            <motion.div
              key={ripple.id}
              className="absolute pointer-events-none z-40"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
            >
              {/* Massive expanding ripple waves - reaching screen edges */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`mega-wave-${i}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
                  style={{ 
                    width: maxSize, 
                    height: maxSize,
                    borderColor: i % 3 === 0 
                      ? 'rgba(99, 102, 241, 0.4)' 
                      : i % 3 === 1 
                      ? 'rgba(168, 85, 247, 0.3)' 
                      : 'rgba(236, 72, 153, 0.25)'
                  }}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ 
                    duration: 3.5, 
                    ease: "easeOut", 
                    delay: i * 0.15 
                  }}
                />
              ))}

              {/* Massive glow wave spreading across screen */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  width: maxSize, 
                  height: maxSize,
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(236, 72, 153, 0.1) 60%, transparent 100%)',
                  filter: 'blur(40px)'
                }}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 3.5, ease: "easeOut" }}
              />

              {/* Secondary glow layer */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  width: maxSize * 0.7, 
                  height: maxSize * 0.7,
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.25) 40%, transparent 80%)',
                  filter: 'blur(60px)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              />

              {/* Energy pulse rings */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`pulse-ring-${i}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{ 
                    width: maxSize * 0.9, 
                    height: maxSize * 0.9,
                    borderColor: 'rgba(139, 92, 246, 0.2)'
                  }}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ 
                    duration: 3.5, 
                    ease: "easeOut", 
                    delay: i * 0.1 
                  }}
                />
              ))}
              
              {/* Main ripple */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-indigo-400/60"
                style={{ width: maxSize * 0.6, height: maxSize * 0.6 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
              />
              
              {/* Secondary ripple */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400/40"
                style={{ width: maxSize * 0.6, height: maxSize * 0.6 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.15 }}
              />
              
              {/* Tertiary ripple */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-400/30"
                style={{ width: maxSize * 0.6, height: maxSize * 0.6 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              />
              
              {/* Massive particle burst spreading to edges */}
              {[...Array(36)].map((_, i) => {
                const angle = (i / 36) * Math.PI * 2;
                const distance = maxSize * 0.4;
                return (
                  <motion.div
                    key={`mega-particle-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                    style={{
                      left: 0,
                      top: 0,
                      boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      scale: 1
                    }}
                    animate={{ 
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: 0.3
                    }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "easeOut",
                      delay: i * 0.015
                    }}
                  />
                );
              })}

              {/* Outer particle wave reaching far */}
              {[...Array(48)].map((_, i) => {
                const angle = (i / 48) * Math.PI * 2;
                const distance = maxSize * 0.35;
                return (
                  <motion.div
                    key={`outer-mega-particle-${i}`}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                    style={{
                      left: 0,
                      top: 0,
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0.8,
                      scale: 0
                    }}
                    animate={{ 
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: 1.2
                    }}
                    transition={{ 
                      duration: 3, 
                      ease: "easeOut",
                      delay: 0.3 + i * 0.01
                    }}
                  />
                );
              })}

              {/* Energy shockwave */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  width: maxSize * 0.8, 
                  height: maxSize * 0.8,
                  border: '6px solid rgba(99, 102, 241, 0.5)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              {/* Center explosion flash */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-white via-indigo-200 to-purple-200"
                style={{
                  filter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(99, 102, 241, 1), 0 0 120px rgba(168, 85, 247, 0.6)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Spiral particles */}
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const spiralDistance = (i / 24) * maxSize * 0.3;
                const spiralAngle = angle + (i / 24) * Math.PI * 4;
                return (
                  <motion.div
                    key={`spiral-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300"
                    style={{
                      left: 0,
                      top: 0,
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1
                    }}
                    animate={{ 
                      x: Math.cos(spiralAngle) * spiralDistance,
                      y: Math.sin(spiralAngle) * spiralDistance,
                      opacity: 0,
                      rotate: 360
                    }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "easeOut",
                      delay: i * 0.05
                    }}
                  />
                );
              })}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}