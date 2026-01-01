/**
 * 生成锁屏桌面图片
 */
export async function generateLockscreenImage(
  timeText: string,
  dateText: string,
  monthProgress: number,
  yearProgress: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('无法创建画布上下文'));
      return;
    }

    // 设置画布尺寸（iPhone 锁屏尺寸）
    const width = 1170; // iPhone 标准锁屏宽度
    const height = 2532; // iPhone 标准锁屏高度
    
    canvas.width = width;
    canvas.height = height;

    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#eef2ff'); // indigo-50
    gradient.addColorStop(0.5, '#faf5ff'); // purple-50
    gradient.addColorStop(1, '#fdf2f8'); // pink-50
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 添加装饰性圆形（模糊效果模拟）
    const addBlurCircle = (x: number, y: number, radius: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      circleGradient.addColorStop(0, color);
      circleGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = circleGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // 添加背景装饰
    addBlurCircle(width * 0.2, height * 0.2, 400, '#a5b4fc', 0.3);
    addBlurCircle(width * 0.8, height * 0.7, 400, '#c084fc', 0.3);
    addBlurCircle(width * 0.5, height * 0.5, 500, '#f9a8d4', 0.2);

    // 绘制主要内容
    const centerX = width / 2;
    const centerY = height / 2;

    // 时间文字
    ctx.save();
    ctx.font = 'bold 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeText, centerX, centerY - 200);
    ctx.restore();

    // 日期文字
    ctx.save();
    ctx.font = '48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#4b5563';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dateText, centerX, centerY - 100);
    ctx.restore();

    // 进度条背景
    const progressBarWidth = width * 0.7;
    const progressBarHeight = 20;
    const progressBarX = (width - progressBarWidth) / 2;
    const progressBarY = centerY + 100;

    // 月份进度
    ctx.save();
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
    
    // 月份进度填充
    const monthGradient = ctx.createLinearGradient(progressBarX, 0, progressBarX + progressBarWidth, 0);
    monthGradient.addColorStop(0, '#6366f1');
    monthGradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = monthGradient;
    ctx.fillRect(progressBarX, progressBarY, progressBarWidth * (monthProgress / 100), progressBarHeight);
    ctx.restore();

    // 年份进度
    const yearProgressBarY = progressBarY + 60;
    ctx.save();
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(progressBarX, yearProgressBarY, progressBarWidth, progressBarHeight);
    
    // 年份进度填充
    const yearGradient = ctx.createLinearGradient(progressBarX, 0, progressBarX + progressBarWidth, 0);
    yearGradient.addColorStop(0, '#8b5cf6');
    yearGradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = yearGradient;
    ctx.fillRect(progressBarX, yearProgressBarY, progressBarWidth * (yearProgress / 100), progressBarHeight);
    ctx.restore();

    // 应用名称
    ctx.save();
    ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Time Capsule', centerX, height - 150);
    ctx.restore();

    // 转换为 Data URL
    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      resolve(dataUrl);
    } catch (error) {
      reject(error);
    }
  });
}

