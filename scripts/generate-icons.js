import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'icon.svg');

// 确保 public 目录存在
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 创建简单的图标 SVG（如果没有）
if (!fs.existsSync(svgPath)) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#grad)"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="white" stroke-width="20" opacity="0.3"/>
  <circle cx="256" cy="256" r="140" fill="none" stroke="white" stroke-width="16" opacity="0.5"/>
  <line x1="256" y1="256" x2="256" y2="140" stroke="white" stroke-width="12" stroke-linecap="round"/>
  <line x1="256" y1="256" x2="320" y2="256" stroke="white" stroke-width="10" stroke-linecap="round"/>
  <circle cx="256" cy="256" r="8" fill="white"/>
</svg>`;
  fs.writeFileSync(svgPath, svgContent);
}

// 生成不同尺寸的图标
const sizes = [
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

async function generateIcons() {
  console.log('🎨 正在生成图标...');
  
  for (const { size, name } of sizes) {
    const outputPath = path.join(publicDir, name);
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✅ 生成 ${name} (${size}x${size})`);
  }
  
  console.log('✨ 图标生成完成！');
}

generateIcons().catch(console.error);

