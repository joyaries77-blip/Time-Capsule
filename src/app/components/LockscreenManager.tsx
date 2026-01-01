import { useEffect } from 'react';
import { useLockscreen } from '../hooks/useLockscreen';
import { generateLockscreenImage } from '../utils/generateLockscreenImage';
import { useTimeCalculations } from './TimeProgress';

export function LockscreenManager() {
  const { lockscreenState, setLockscreen, removeLockscreen } = useLockscreen();
  const { month, year } = useTimeCalculations();

  useEffect(() => {
    // 检查 URL 参数，处理快捷操作（PWA）
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');

    if (action === 'set-lockscreen') {
      handleSetLockscreen();
      // 清除 URL 参数
      window.history.replaceState({}, '', window.location.pathname);
    } else if (action === 'remove-lockscreen') {
      handleRemoveLockscreen();
      // 清除 URL 参数
      window.history.replaceState({}, '', window.location.pathname);
    }

    // 监听 iOS 原生快捷操作事件（Capacitor）
    const handleShortcutAction = (event: Event) => {
      const customEvent = event as CustomEvent;
      const action = customEvent.detail?.action;
      
      if (action === 'set-lockscreen') {
        handleSetLockscreen();
      } else if (action === 'remove-lockscreen') {
        handleRemoveLockscreen();
      }
    };

    window.addEventListener('shortcut-action', handleShortcutAction as EventListener);

    return () => {
      window.removeEventListener('shortcut-action', handleShortcutAction as EventListener);
    };
  }, []);

  const handleSetLockscreen = async () => {
    const now = new Date();
    const timeText = now.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const dateText = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    try {
      const imageDataUrl = await generateLockscreenImage(
        timeText,
        dateText,
        month.percentage,
        year.percentage
      );

      const success = await setLockscreen(imageDataUrl);
      
      if (success) {
        // 显示成功提示
        alert('锁屏图片已生成并下载！\n\n请在 iPhone 相册中找到该图片，然后：\n1. 打开图片\n2. 点击左下角分享按钮\n3. 选择"用作墙纸"\n4. 设置为锁屏');
      }
    } catch (error) {
      console.error('生成锁屏图片失败:', error);
      alert('生成锁屏图片失败，请重试');
    }
  };

  const handleRemoveLockscreen = () => {
    removeLockscreen();
    alert('已取消锁屏桌面设置');
  };

  // 这个组件不渲染任何 UI，只处理逻辑
  return null;
}

// 导出手动设置和取消的函数，供其他组件使用
export function useLockscreenActions() {
  const { lockscreenState, setLockscreen, removeLockscreen } = useLockscreen();
  const { month, year } = useTimeCalculations();

  const handleSetLockscreen = async () => {
    const now = new Date();
    const timeText = now.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const dateText = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    try {
      const imageDataUrl = await generateLockscreenImage(
        timeText,
        dateText,
        month.percentage,
        year.percentage
      );

      const success = await setLockscreen(imageDataUrl);
      
      if (success) {
        return { success: true, message: '锁屏图片已生成并下载！请在相册中设置为锁屏。' };
      }
      return { success: false, message: '设置失败，请重试' };
    } catch (error) {
      console.error('生成锁屏图片失败:', error);
      return { success: false, message: '生成锁屏图片失败，请重试' };
    }
  };

  const handleRemoveLockscreen = () => {
    removeLockscreen();
    return { success: true, message: '已取消锁屏桌面设置' };
  };

  return {
    lockscreenState,
    handleSetLockscreen,
    handleRemoveLockscreen,
  };
}

