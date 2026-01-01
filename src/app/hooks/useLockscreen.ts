import { useState, useEffect } from 'react';

export interface LockscreenState {
  isSet: boolean;
  imageUrl: string | null;
}

export function useLockscreen() {
  const [lockscreenState, setLockscreenState] = useState<LockscreenState>({
    isSet: false,
    imageUrl: null,
  });

  useEffect(() => {
    // 检查是否已设置锁屏桌面
    const saved = localStorage.getItem('lockscreen-set');
    const imageUrl = localStorage.getItem('lockscreen-image-url');
    
    if (saved === 'true' && imageUrl) {
      setLockscreenState({
        isSet: true,
        imageUrl,
      });
    }
  }, []);

  const setLockscreen = async (imageDataUrl: string) => {
    try {
      // 保存到 localStorage
      localStorage.setItem('lockscreen-set', 'true');
      localStorage.setItem('lockscreen-image-url', imageDataUrl);
      
      setLockscreenState({
        isSet: true,
        imageUrl: imageDataUrl,
      });

      // 尝试下载图片（用户可以在相册中设置为锁屏）
      const link = document.createElement('a');
      link.download = 'time-capsule-lockscreen.png';
      link.href = imageDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (error) {
      console.error('设置锁屏桌面失败:', error);
      return false;
    }
  };

  const removeLockscreen = () => {
    localStorage.removeItem('lockscreen-set');
    localStorage.removeItem('lockscreen-image-url');
    
    setLockscreenState({
      isSet: false,
      imageUrl: null,
    });
  };

  return {
    lockscreenState,
    setLockscreen,
    removeLockscreen,
  };
}

