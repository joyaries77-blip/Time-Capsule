# iOS 打包快速开始指南

## 📍 图标文件位置

图标文件应该放在 `public/` 文件夹：

```
public/
  ├── icon-192.png          ← PWA 图标 (192x192)
  ├── icon-512.png          ← PWA 图标 (512x512)
  ├── icon-generator.html   ← 图标生成工具
  └── ICONS-README.md       ← 图标说明文档
```

**当前状态**：图标文件不存在，需要生成。

**生成方法**：
1. 打开 `public/icon-generator.html` 在浏览器中生成
2. 或使用在线工具：https://www.appicon.co/

## 🚀 快速开始（3步）

### 步骤 1: 运行设置脚本

```bash
# 给脚本添加执行权限
chmod +x setup-ios.sh

# 运行设置脚本
./setup-ios.sh
```

或者手动执行：

```bash
# 安装依赖
npm install

# 安装 Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios

# 添加 iOS 平台
npx cap add ios
```

### 步骤 2: 构建和同步

```bash
# 构建 Web 应用
npm run build

# 同步到 iOS 项目
npx cap sync ios
```

### 步骤 3: 在 Xcode 中打开

```bash
# 打开 Xcode
npx cap open ios
```

或者使用一键命令：

```bash
npm run ios:build
```

## 📱 在 Xcode 中配置

1. **选择项目** > **TARGETS** > **App**
2. **Signing & Capabilities**：
   - 选择您的 **Team**（需要 Apple Developer 账号）
   - 勾选 **Automatically manage signing**
3. **选择设备**（模拟器或真机）
4. **点击 Run** (▶️)

## 📦 打包为 IPA

1. 在 Xcode 中：**Product** > **Archive**
2. 等待归档完成
3. 点击 **Distribute App**
4. 选择分发方式（App Store / Ad Hoc / Development）
5. 导出 IPA 文件

## 📚 详细文档

- **完整指南**：查看 [ios-build-guide.md](./ios-build-guide.md)
- **快速参考**：查看 [README-iOS.md](./README-iOS.md)
- **图标说明**：查看 [public/ICONS-README.md](./public/ICONS-README.md)

## ⚡ 常用命令

```bash
# 构建并打开 Xcode
npm run ios:build

# 仅同步（不打开 Xcode）
npx cap sync ios

# 仅打开 Xcode
npx cap open ios

# 查看 Capacitor 版本
npx cap --version
```

## 🔧 项目结构

```
Time Capsule/
├── public/                 # 静态资源（图标文件在这里）
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.json
├── src/                    # 源代码
├── dist/                   # 构建输出（自动生成）
├── ios/                    # iOS 项目（运行 npx cap add ios 后生成）
│   └── App/
│       └── App.xcworkspace # 在 Xcode 中打开此文件
├── capacitor.config.ts     # Capacitor 配置
├── package.json            # 项目配置
└── setup-ios.sh           # 快速设置脚本
```

## ⚠️ 注意事项

1. **图标文件**：打包前确保图标文件已准备好
2. **Apple Developer**：真机测试和分发需要 Apple Developer 账号
3. **Xcode 版本**：建议使用 Xcode 14 或更高版本
4. **首次构建**：可能需要较长时间下载依赖

## 🆘 遇到问题？

1. 查看 [ios-build-guide.md](./ios-build-guide.md) 中的"常见问题"部分
2. 检查控制台错误信息
3. 运行 `npx cap sync ios` 重新同步
4. 清理构建：在 Xcode 中选择 **Product** > **Clean Build Folder**

---

**祝您打包顺利！** 🎉

