import { useState, useEffect } from 'react';

export function useLockScreen() {
  const [isLockScreenEnabled, setIsLockScreenEnabled] = useState(false);

  useEffect(() => {
    // 从本地存储读取设置
    const saved = localStorage.getItem('lockScreenEnabled');
    if (saved === 'true') {
      setIsLockScreenEnabled(true);
      enableLockScreen();
    }
  }, []);

  const enableLockScreen = () => {
    // 请求全屏API（如果支持）
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // 全屏失败时忽略
      });
    }
    
    // 阻止屏幕休眠（需要用户交互）
    if ('wakeLock' in navigator) {
      (navigator as any).wakeLock.request('screen').catch(() => {
        // Wake Lock失败时忽略
      });
    }
    
    // 设置本地存储
    localStorage.setItem('lockScreenEnabled', 'true');
    setIsLockScreenEnabled(true);
  };

  const disableLockScreen = () => {
    // 退出全屏
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {
        // 退出全屏失败时忽略
      });
    }
    
    // 释放Wake Lock
    if ('wakeLock' in navigator) {
      (navigator as any).wakeLock.release().catch(() => {
        // 释放失败时忽略
      });
    }
    
    // 清除本地存储
    localStorage.setItem('lockScreenEnabled', 'false');
    setIsLockScreenEnabled(false);
  };

  const toggleLockScreen = () => {
    if (isLockScreenEnabled) {
      disableLockScreen();
    } else {
      enableLockScreen();
    }
  };

  return {
    isLockScreenEnabled,
    enableLockScreen,
    disableLockScreen,
    toggleLockScreen,
  };
}

