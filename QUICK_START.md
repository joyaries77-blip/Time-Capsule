# 快速开始 - iOS 打包

## 🎯 在 Windows 上准备

你已经在 Windows 上完成了项目配置，现在需要：

### 选项 1：使用 Mac 电脑（推荐）

1. **将项目传输到 Mac**
   - 使用 Git、U盘或云存储
   - 确保所有文件都在

2. **在 Mac 上执行**：
   ```bash
   # 安装依赖
   npm install
   
   # 构建项目
   npm run build
   
   # 添加 iOS 平台
   npm run cap:add:ios
   
   # 打开 Xcode
   npm run cap:open:ios
   ```

3. **在 Xcode 中完成打包**（详见 `IOS_BUILD_GUIDE.md`）

### 选项 2：使用云 Mac 服务

- **MacStadium**：https://www.macstadium.com/
- **MacinCloud**：https://www.macincloud.com/
- **AWS EC2 Mac**：https://aws.amazon.com/ec2/instance-types/mac/

### 选项 3：使用 PWA（无需打包）

如果只是想安装到 iPhone，可以使用 PWA 方式：

1. **构建并部署到 HTTPS 服务器**
   ```bash
   npm run build
   ```

2. **部署 `dist` 目录到服务器**（如 Vercel、Netlify、GitHub Pages）

3. **在 iPhone Safari 中访问并"添加到主屏幕"**

## 📋 当前项目状态

✅ Capacitor 已安装和配置
✅ 构建脚本已配置
✅ iOS 配置文件已创建

## 🚀 下一步

1. **在 Mac 上**：按照 `IOS_BUILD_GUIDE.md` 完成打包
2. **或使用 PWA**：部署到 HTTPS 服务器后安装

## 📞 需要帮助？

查看详细指南：`IOS_BUILD_GUIDE.md`

