# Time Capsule - iOS 打包快速开始

## 快速安装步骤

### 1. 安装 Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap add ios
```

### 2. 生成图标

图标文件位置应该在 `public/` 文件夹：
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

如果文件不存在：
1. 打开 `public/icon-generator.html` 生成图标
2. 或使用在线工具生成所有尺寸的图标

### 3. 构建和同步

```bash
# 构建 Web 应用
npm run build

# 同步到 iOS 项目
npx cap sync ios
```

### 4. 打开 Xcode

```bash
npx cap open ios
```

### 5. 在 Xcode 中配置

1. **选择项目** > **TARGETS** > **App**
2. **Signing & Capabilities**：
   - 选择您的 Team
   - 确保自动签名已启用
3. **选择设备**（模拟器或真机）
4. **点击 Run** (▶️)

## 图标文件位置

图标文件应该放在以下位置：

```
public/
  ├── icon-192.png    (192x192 像素)
  ├── icon-512.png    (512x512 像素)
  └── icon-generator.html  (图标生成工具)
```

## iOS 项目位置

iOS 项目文件位于：

```
ios/
  └── App/
      ├── App.xcworkspace  (在 Xcode 中打开此文件)
      └── App.xcodeproj
```

## 完整文档

详细步骤请查看 [ios-build-guide.md](./ios-build-guide.md)

## 常用命令

```bash
# 构建并打开 Xcode
npm run ios:build

# 仅同步（不打开 Xcode）
npx cap sync ios

# 仅打开 Xcode
npx cap open ios
```

