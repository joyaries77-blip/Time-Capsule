import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLockScreen } from '../hooks/useLockScreen';
import { Settings } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallMenu() {
  const { isLockScreenEnabled, toggleLockScreen } = useLockScreen();
  const [showMenu, setShowMenu] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const longPressTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // 检查是否已安装为 PWA
    const checkIfInstalled = () => {
      // 检查是否在独立模式下运行（PWA 已安装）
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // 或者检查 navigator.standalone (iOS)
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      setIsInstalled(isStandalone || isIOSStandalone);
    };

    checkIfInstalled();

    // 监听 beforeinstallprompt 事件（PWA 安装提示）
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 监听 appinstalled 事件（PWA 已安装）
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    // 只在已安装时监听长按设置按钮
    if (!isInstalled) return;

    // 由于浏览器无法直接监听长按图标事件，我们提供一个设置按钮
    // 用户可以通过长按设置按钮来打开菜单（模拟长按图标的效果）
    const handleLongPress = () => {
      setShowMenu(true);
    };

    // 这里不添加事件监听，因为设置按钮会自己处理长按
    // 这个 useEffect 主要用于在安装状态变化时更新

    return () => {
      // 清理
    };
  }, [isInstalled]);

  const handleToggleLockScreen = () => {
    toggleLockScreen();
    setShowMenu(false);
  };

  const handleSettingsButtonMouseDown = () => {
    longPressTimerRef.current = window.setTimeout(() => {
      setShowMenu(true);
    }, 800); // 800ms 长按
  };

  const handleSettingsButtonMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleSettingsButtonTouchStart = () => {
    longPressTimerRef.current = window.setTimeout(() => {
      setShowMenu(true);
    }, 800);
  };

  const handleSettingsButtonTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // 如果未安装，不显示设置按钮
  if (!isInstalled) {
    return null;
  }

  return (
    <>
      {/* 设置按钮 - 长按触发菜单 */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white/90 transition-colors"
        onMouseDown={handleSettingsButtonMouseDown}
        onMouseUp={handleSettingsButtonMouseUp}
        onMouseLeave={handleSettingsButtonMouseUp}
        onTouchStart={handleSettingsButtonTouchStart}
        onTouchEnd={handleSettingsButtonTouchEnd}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="长按打开设置"
      >
        <Settings className="w-5 h-5 text-gray-700" />
      </motion.button>

      {/* 设置菜单 */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleToggleLockScreen}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-900 font-medium"
            >
              {isLockScreenEnabled ? '取消锁屏屏保' : '设置为锁屏屏保'}
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-600 text-sm mt-2"
            >
              关闭
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

