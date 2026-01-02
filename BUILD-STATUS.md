# 打包状态 - Time Capsule iOS

## ✅ 已完成的工作

### 1. 依赖安装
- ✅ 已安装 `@capacitor/core`
- ✅ 已安装 `@capacitor/cli`
- ✅ 已安装 `@capacitor/ios`
- ✅ 已安装 `typescript`（Capacitor 配置需要）

### 2. 图标准备
- ✅ `public/icon-512.png` - 已准备
- ✅ `public/icon-192.png` - 已创建（临时使用 icon-512.png）

**注意**：如需更专业的图标，可以使用以下工具生成所有 iOS 尺寸：
- https://www.appicon.co/
- https://icon.kitchen/

### 3. 项目构建
- ✅ Web 应用已构建完成
- ✅ 构建输出位于 `dist/` 文件夹

### 4. iOS 平台
- ✅ iOS 平台已添加
- ✅ iOS 项目位于 `ios/` 文件夹
- ✅ Web 资源已同步到 iOS 项目

## 📁 项目结构

```
Time Capsule/
├── ios/                    # iOS 项目（已创建）
│   └── App/
│       └── App.xcworkspace # 在 Xcode 中打开此文件
├── dist/                   # 构建后的 Web 资源
├── public/                 # 公共资源
│   ├── icon-192.png       # PWA 图标
│   └── icon-512.png       # PWA 图标
├── capacitor.config.ts     # Capacitor 配置
├── package.json            # 项目配置
└── CLOUD-MAC-BUILD-GUIDE.md # 云Mac打包指南
```

## 🚀 下一步操作（在云Mac上）

### 快速开始

1. **上传项目到云Mac**
   - 将整个项目文件夹上传到云Mac

2. **打开 Xcode 项目**
   ```bash
   cd "/path/to/Time Capsule"
   npx cap open ios
   ```
   或手动打开：
   ```bash
   open ios/App/App.xcworkspace
   ```

3. **在 Xcode 中配置**
   - 配置签名和证书（Signing & Capabilities）
   - 选择目标设备
   - 点击 Run 测试，或 Product > Archive 打包

### 详细步骤

请查看 **CLOUD-MAC-BUILD-GUIDE.md** 获取完整的打包和测试指南。

### 快速打包脚本

在云Mac上，可以使用提供的脚本：

```bash
chmod +x build-for-ios.sh
./build-for-ios.sh
```

## 📋 检查清单

在云Mac上打包前，确认：

- [x] iOS 项目已创建（`ios/` 文件夹存在）
- [x] Web 应用已构建（`dist/` 文件夹存在）
- [x] 图标文件已准备
- [ ] 项目已上传到云Mac
- [ ] Xcode 已安装（14+）
- [ ] Apple Developer 账号已准备
- [ ] 在 Xcode 中配置了签名

## 🔄 更新应用流程

当您修改代码后，需要重新打包：

```bash
# 1. 重新构建 Web 应用
npm run build

# 2. 同步到 iOS 项目
npx cap sync ios

# 3. 在 Xcode 中重新归档和上传
```

## 📱 测试和发布

1. **本地测试**：在 Xcode 中选择模拟器或真机，点击 Run
2. **TestFlight 测试**：归档后上传到 App Store Connect，配置 TestFlight
3. **App Store 发布**：通过 App Store Connect 提交审核

详细步骤请参考 **CLOUD-MAC-BUILD-GUIDE.md**。

## ⚠️ 注意事项

1. **必须打开 `.xcworkspace`**，不要打开 `.xcodeproj`
2. **每次更新后**记得递增 Build 号
3. **首次构建**可能需要较长时间（下载依赖）
4. **需要 Apple Developer 账号**才能签名和分发

## 📚 相关文档

- `CLOUD-MAC-BUILD-GUIDE.md` - 详细的云Mac打包指南
- `ios-build-guide.md` - iOS 构建指南
- `ICONS-README.md` - 图标文件说明

## 🎉 状态

**项目已准备就绪，可以在云Mac上进行打包和测试！**

