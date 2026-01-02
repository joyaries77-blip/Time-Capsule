import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLockScreen } from '../hooks/useLockScreen';

export function LockScreenMenu() {
  const { isLockScreenEnabled, toggleLockScreen } = useLockScreen();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<number | null>(null);
  const isLongPressing = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleLongPress = (clientX: number, clientY: number) => {
      setMenuPosition({ x: clientX, y: clientY });
      setShowMenu(true);
      isLongPressing.current = true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // 左键
        startPosition.current = { x: e.clientX, y: e.clientY };
        longPressTimer.current = window.setTimeout(() => {
          handleLongPress(e.clientX, e.clientY);
        }, 800); // 800ms长按
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 如果鼠标移动超过10px，取消长按
      if (longPressTimer.current) {
        const distance = Math.sqrt(
          Math.pow(e.clientX - startPosition.current.x, 2) +
          Math.pow(e.clientY - startPosition.current.y, 2)
        );
        if (distance > 10) {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
        }
      }
    };

    const handleMouseUp = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      // 延迟关闭菜单，避免立即关闭
      setTimeout(() => {
        if (!isLongPressing.current) {
          setShowMenu(false);
        }
        isLongPressing.current = false;
      }, 100);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startPosition.current = { x: touch.clientX, y: touch.clientY };
      longPressTimer.current = window.setTimeout(() => {
        handleLongPress(touch.clientX, touch.clientY);
      }, 800);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // 如果触摸移动超过10px，取消长按
      if (longPressTimer.current && e.touches.length > 0) {
        const touch = e.touches[0];
        const distance = Math.sqrt(
          Math.pow(touch.clientX - startPosition.current.x, 2) +
          Math.pow(touch.clientY - startPosition.current.y, 2)
        );
        if (distance > 10) {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      setTimeout(() => {
        if (!isLongPressing.current) {
          setShowMenu(false);
        }
        isLongPressing.current = false;
      }, 100);
    };

    // 监听右键菜单（禁用）
    document.addEventListener('contextmenu', handleContextMenu);
    
    // 监听长按（鼠标）
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // 监听长按（触摸）
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
        isLongPressing.current = false;
      }
    };

    if (showMenu) {
      // 延迟添加事件监听，避免立即触发
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showMenu]);

  const handleToggleLockScreen = () => {
    toggleLockScreen();
    setShowMenu(false);
    isLongPressing.current = false;
  };

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          ref={menuRef}
          className="fixed z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[200px]"
          style={{
            left: `${Math.min(menuPosition.x, window.innerWidth - 220)}px`,
            top: `${Math.min(menuPosition.y, window.innerHeight - 100)}px`,
            transform: menuPosition.x > window.innerWidth - 220 
              ? 'translateX(-100%)' 
              : menuPosition.y > window.innerHeight - 100
              ? 'translateY(-100%)'
              : 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={handleToggleLockScreen}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-900 font-medium"
          >
            {isLockScreenEnabled ? '取消锁屏屏保' : '设置为锁屏屏保'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

