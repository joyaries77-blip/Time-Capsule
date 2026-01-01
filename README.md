
# Time Capsule Interface Design

This is a code bundle for Time Capsule Interface Design. The original project is available at https://www.figma.com/design/IsVdJYxGWev04eTWfhPU2X/Time-Capsule-Interface-Design.

## ✨ 功能特性

- ⏰ **实时时间显示**：复古数字时钟，实时更新
- 📊 **时间进度**：月份和年份进度条，可视化时间流逝
- 🎨 **精美动画**：流畅的动画效果和渐变背景
- 📱 **锁屏桌面**：长按图标可设置为锁屏桌面
- 🔗 **快捷操作**：支持 PWA 和 iOS 原生快捷操作

## 🚀 快速开始

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问：http://localhost:5173

### 锁屏桌面功能

1. **PWA 方式**：
   - 长按桌面图标
   - 选择"设置为锁屏桌面"
   - 图片会自动下载到相册
   - 在相册中设置为锁屏

2. **iOS 原生应用**：
   - 按照 [IOS_SHORTCUTS_SETUP.md](./IOS_SHORTCUTS_SETUP.md) 配置
   - 长按图标即可看到快捷操作

### 📱 打包 iOS 应用

项目已配置 Capacitor，可以打包成 iOS 应用。

**重要**：iOS 打包需要在 macOS 系统上完成。

#### 在 Mac 上打包：

```bash
# 自动构建（推荐）
npm run build:ios:auto

# 或手动步骤
npm run build
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios
```

#### 在 Windows 上使用云 Mac 服务：

**快速开始**：查看 [CLOUD_MAC_QUICK.md](./CLOUD_MAC_QUICK.md)

**详细指南**：查看 [CLOUD_MAC_GUIDE.md](./CLOUD_MAC_GUIDE.md)

#### 其他方式：

1. 将项目传输到 Mac 电脑
2. 使用云 Mac 服务（MacinCloud、AWS EC2 Mac 等）
3. 使用 PWA 方式（无需打包，部署到 HTTPS 服务器）

**相关文档**：
- [云 Mac 快速指南](./CLOUD_MAC_QUICK.md) ⚡
- [云 Mac 详细指南](./CLOUD_MAC_GUIDE.md) 📚
- [iOS 打包指南](./IOS_BUILD_GUIDE.md) 🍎

## 📚 文档

- [iOS 打包详细指南](./IOS_BUILD_GUIDE.md) - 完整的 iOS 打包步骤
- [快速开始](./QUICK_START.md) - 快速打包指南
- [安装指南](./INSTALL_GUIDE.md) - PWA 安装方式
  