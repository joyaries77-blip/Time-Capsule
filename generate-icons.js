// Node.js 脚本：使用 canvas 生成图标
// 需要先安装: npm install canvas

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawIcon(canvas, size) {
    const ctx = canvas.getContext('2d');
    const center = size / 2;
    
    // 背景渐变 - 紫色到粉红色（左侧紫色，右侧粉红色）
    const bgGradient = ctx.createLinearGradient(0, 0, size, 0);
    bgGradient.addColorStop(0, '#8B5CF6'); // 紫色
    bgGradient.addColorStop(1, '#EC4899'); // 粉红色
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, size, size);
    
    // 绘制时钟图标 - 半透明白色
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    // 外环（较粗）
    ctx.lineWidth = size * 0.04;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.38, 0, Math.PI * 2);
    ctx.stroke();
    
    // 内环（较细）
    ctx.lineWidth = size * 0.02;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.28, 0, Math.PI * 2);
    ctx.stroke();
    
    // 时针 - 指向1-2之间（约1:30位置）
    const hourAngle = (1.5 * 30 - 90) * Math.PI / 180;
    ctx.lineWidth = size * 0.035;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(
        center + Math.cos(hourAngle) * (size * 0.18),
        center + Math.sin(hourAngle) * (size * 0.18)
    );
    ctx.stroke();
    
    // 分针 - 指向9点位置
    const minuteAngle = (9 * 30 - 90) * Math.PI / 180;
    ctx.lineWidth = size * 0.025;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(
        center + Math.cos(minuteAngle) * (size * 0.25),
        center + Math.sin(minuteAngle) * (size * 0.25)
    );
    ctx.stroke();
    
    // 中心点
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(center, center, size * 0.025, 0, Math.PI * 2);
    ctx.fill();
}

function generateIcon(size, filename) {
    const canvas = createCanvas(size, size);
    drawIcon(canvas, size);
    
    const buffer = canvas.toBuffer('image/png');
    const publicDir = path.join(__dirname, 'public');
    
    // 确保 public 目录存在
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const filepath = path.join(publicDir, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ 已生成: ${filename} (${size}x${size})`);
}

// 生成图标
console.log('🎨 开始生成图标...\n');

generateIcon(192, 'icon-192.png');
generateIcon(512, 'icon-512.png');

console.log('\n✨ 图标生成完成！');
console.log('📁 图标文件已保存到 public/ 文件夹');

