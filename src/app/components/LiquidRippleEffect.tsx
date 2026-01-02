import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  type: 'tap' | 'drag';
  path?: { x: number; y: number; time: number }[];
}

interface LiquidRippleEffectProps {
  children: React.ReactNode;
  className?: string;
  onTapCountChange?: (count: number) => void;
}

export function LiquidRippleEffect({ children, className = '', onTapCountChange }: LiquidRippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleCounterRef = useRef(0);
  const dragPathRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const isDraggingRef = useRef(false);
  const lastTouchTimeRef = useRef(0);
  const tapCountRef = useRef(0);
  const tapTimesRef = useRef<number[]>([]);

  const createRipple = (x: number, y: number, type: 'tap' | 'drag' = 'tap', path?: { x: number; y: number; time: number }[]) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;

    const newRipple: Ripple = {
      id: rippleCounterRef.current++,
      x: relativeX,
      y: relativeY,
      type,
      path,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 4000);
  };

  // 轻点效果
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const now = Date.now();
    
    // 重置拖拽路径
    dragPathRef.current = [{ x: touch.clientX, y: touch.clientY, time: now }];
    isDraggingRef.current = false;
    lastTouchTimeRef.current = now;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const now = Date.now();
      
      // 记录拖拽路径
      dragPathRef.current.push({ x: touch.clientX, y: touch.clientY, time: now });
      isDraggingRef.current = true;
      
      // 在拖拽过程中创建连续的涟漪
      if (dragPathRef.current.length > 1) {
        const lastPoint = dragPathRef.current[dragPathRef.current.length - 2];
        const currentPoint = dragPathRef.current[dragPathRef.current.length - 1];
        const distance = Math.sqrt(
          Math.pow(currentPoint.x - lastPoint.x, 2) + 
          Math.pow(currentPoint.y - lastPoint.y, 2)
        );
        
        // 每移动一定距离创建一个涟漪
        if (distance > 30) {
          createRipple(touch.clientX, touch.clientY, 'drag', [...dragPathRef.current]);
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      const now = Date.now();
      const timeDiff = now - lastTouchTimeRef.current;
      
      if (!isDraggingRef.current && timeDiff < 300) {
        // 快速轻点
        createRipple(touch.clientX, touch.clientY, 'tap');
        
        // 记录点击时间
        tapTimesRef.current.push(now);
        // 只保留最近2秒内的点击
        tapTimesRef.current = tapTimesRef.current.filter(time => now - time < 2000);
        
        // 更新点击计数
        tapCountRef.current = tapTimesRef.current.length;
        
        // 如果点击5次及以上，触发回调
        if (tapCountRef.current >= 5 && onTapCountChange) {
          onTapCountChange(tapCountRef.current);
          // 重置计数
          tapCountRef.current = 0;
          tapTimesRef.current = [];
        }
      } else if (isDraggingRef.current && dragPathRef.current.length > 1) {
        // 拖拽结束，创建最终涟漪
        createRipple(touch.clientX, touch.clientY, 'drag', [...dragPathRef.current]);
      }
      
      dragPathRef.current = [];
      isDraggingRef.current = false;
    }
  };

  // 鼠标事件（桌面端）
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // 左键
      const now = Date.now();
      dragPathRef.current = [{ x: e.clientX, y: e.clientY, time: now }];
      isDraggingRef.current = false;
      lastTouchTimeRef.current = now;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // 左键按下
      const now = Date.now();
      dragPathRef.current.push({ x: e.clientX, y: e.clientY, time: now });
      isDraggingRef.current = true;
      
      if (dragPathRef.current.length > 1) {
        const lastPoint = dragPathRef.current[dragPathRef.current.length - 2];
        const currentPoint = dragPathRef.current[dragPathRef.current.length - 1];
        const distance = Math.sqrt(
          Math.pow(currentPoint.x - lastPoint.x, 2) + 
          Math.pow(currentPoint.y - lastPoint.y, 2)
        );
        
        if (distance > 30) {
          createRipple(e.clientX, e.clientY, 'drag', [...dragPathRef.current]);
        }
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) {
      const now = Date.now();
      const timeDiff = now - lastTouchTimeRef.current;
      
      if (!isDraggingRef.current && timeDiff < 300) {
        createRipple(e.clientX, e.clientY, 'tap');
        
        // 记录点击时间
        tapTimesRef.current.push(now);
        // 只保留最近2秒内的点击
        tapTimesRef.current = tapTimesRef.current.filter(time => now - time < 2000);
        
        // 更新点击计数
        tapCountRef.current = tapTimesRef.current.length;
        
        // 如果点击5次及以上，触发回调
        if (tapCountRef.current >= 5 && onTapCountChange) {
          onTapCountChange(tapCountRef.current);
          // 重置计数
          tapCountRef.current = 0;
          tapTimesRef.current = [];
        }
      } else if (isDraggingRef.current && dragPathRef.current.length > 1) {
        createRipple(e.clientX, e.clientY, 'drag', [...dragPathRef.current]);
      }
      
      dragPathRef.current = [];
      isDraggingRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ touchAction: 'none' }}
    >
      {children}
      
      <AnimatePresence>
        {ripples.map(ripple => {
          const maxSize = Math.max(
            Math.hypot(ripple.x, ripple.y),
            Math.hypot(window.innerWidth - ripple.x, ripple.y),
            Math.hypot(ripple.x, window.innerHeight - ripple.y),
            Math.hypot(window.innerWidth - ripple.x, window.innerHeight - ripple.y)
          ) * 2.5;

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
              transition={{ duration: 3.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* 液体波纹 - 多层同心圆 */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`liquid-wave-${i}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{ 
                    width: maxSize * (0.3 + i * 0.06), 
                    height: maxSize * (0.3 + i * 0.06),
                    borderColor: `rgba(99, 102, 241, ${0.6 - i * 0.05})`,
                    filter: 'blur(1px)',
                  }}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ 
                    scale: 1.2 + i * 0.1, 
                    opacity: 0,
                  }}
                  transition={{ 
                    duration: 3.5, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: i * 0.08 
                  }}
                />
              ))}

              {/* 液体表面波纹 - 更柔和的扩散 */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  width: maxSize, 
                  height: maxSize,
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.25) 20%, rgba(236, 72, 153, 0.15) 40%, transparent 70%)',
                  filter: 'blur(50px)',
                }}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 3.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* 液体内部光晕 */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  width: maxSize * 0.6, 
                  height: maxSize * 0.6,
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)',
                  filter: 'blur(40px)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              />

              {/* 拖拽路径涟漪 */}
              {ripple.type === 'drag' && ripple.path && ripple.path.length > 1 && (
                <>
                  {ripple.path.map((point, idx) => {
                    if (idx % 3 !== 0) return null; // 每3个点创建一个涟漪
                    return (
                      <motion.div
                        key={`path-ripple-${ripple.id}-${idx}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          left: point.x - (containerRef.current?.getBoundingClientRect().left || 0),
                          top: point.y - (containerRef.current?.getBoundingClientRect().top || 0),
                          width: maxSize * 0.3,
                          height: maxSize * 0.3,
                          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                          filter: 'blur(20px)',
                        }}
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ 
                          duration: 2, 
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: idx * 0.01 
                        }}
                      />
                    );
                  })}
                </>
              )}

              {/* 中心冲击波 */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  width: maxSize * 0.4, 
                  height: maxSize * 0.4,
                  border: '4px solid rgba(99, 102, 241, 0.6)',
                  filter: 'blur(2px)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* 中心闪光 */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-white via-indigo-200 to-purple-200"
                style={{
                  width: maxSize * 0.15,
                  height: maxSize * 0.15,
                  filter: 'blur(15px)',
                  boxShadow: '0 0 40px rgba(99, 102, 241, 0.8), 0 0 80px rgba(168, 85, 247, 0.5)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* 液体粒子 - 更密集的扩散 */}
              {[...Array(60)].map((_, i) => {
                const angle = (i / 60) * Math.PI * 2;
                const distance = maxSize * (0.2 + Math.random() * 0.4);
                return (
                  <motion.div
                    key={`liquid-particle-${ripple.id}-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: 0,
                      top: 0,
                      background: `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 50}, ${241 + Math.random() * 20}, 0.6)`,
                      boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0.8,
                      scale: 1
                    }}
                    animate={{ 
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: 0.2
                    }}
                    transition={{ 
                      duration: 2.5 + Math.random() * 1, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: Math.random() * 0.3
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

