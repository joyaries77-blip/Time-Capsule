# iOS 应用打包指南

本指南将帮助你将 Time Capsule 应用打包成可以在 iPhone 上安装的 iOS 应用。

## ⚠️ 重要提示

打包 iOS 应用需要以下环境：
- **macOS 系统**（Mac 电脑）
- **Xcode**（从 App Store 免费下载）
- **Apple Developer 账号**（用于真机测试和发布，个人账号 $99/年）

在 Windows 系统上无法直接打包 iOS 应用，但你可以：
1. 使用 Mac 电脑完成打包
2. 使用云 Mac 服务（如 MacStadium、MacinCloud）
3. 使用虚拟机（不推荐，性能较差）

## 📦 打包步骤

### 第一步：在 macOS 上准备环境

1. **安装 Xcode**
   ```bash
   # 从 App Store 搜索并安装 Xcode
   # 或者访问：https://developer.apple.com/xcode/
   ```

2. **安装 Xcode 命令行工具**
   ```bash
   xcode-select --install
   ```

3. **安装 CocoaPods**（iOS 依赖管理工具）
   ```bash
   sudo gem install cocoapods
   ```

### 第二步：在项目目录中初始化 iOS 平台

1. **确保项目已构建**
   ```bash
   npm run build
   ```

2. **添加 iOS 平台**
   ```bash
   npm run cap:add:ios
   ```
   这会在项目根目录创建 `ios` 文件夹。

3. **同步项目到 iOS**
   ```bash
   npm run cap:sync
   ```
   这会将构建好的 Web 应用复制到 iOS 项目中。

### 第三步：在 Xcode 中配置和构建

1. **打开 Xcode 项目**
   ```bash
   npm run cap:open:ios
   ```
   或者手动打开：`ios/App/App.xcworkspace`

2. **配置项目信息**
   - 在 Xcode 左侧选择 `App` 项目
   - 在 `Signing & Capabilities` 标签页：
     - 选择你的 **Team**（需要 Apple Developer 账号）
     - 修改 **Bundle Identifier**（例如：`com.yourname.timecapsule`）
     - 确保 **Automatically manage signing** 已勾选

3. **选择目标设备**
   - 在 Xcode 顶部工具栏选择目标设备：
     - 选择连接的 iPhone（真机测试）
     - 或选择模拟器（如 iPhone 15 Pro）

4. **构建并运行**
   - 点击 Xcode 左上角的 **运行按钮**（▶️）
   - 或按快捷键 `Cmd + R`

### 第四步：在真机上测试

1. **连接 iPhone**
   - 使用 USB 线连接 iPhone 到 Mac
   - 在 iPhone 上：设置 → 通用 → VPN与设备管理 → 信任此电脑

2. **在 Xcode 中选择你的 iPhone**
   - 在设备选择器中选择你的 iPhone

3. **运行应用**
   - 点击运行按钮
   - 首次安装可能需要在 iPhone 上：设置 → 通用 → VPN与设备管理 → 信任开发者

### 第五步：生成安装文件（IPA）

#### 方法一：通过 Xcode Archive（用于 App Store 或 TestFlight）

1. **选择 "Any iOS Device" 作为目标**
2. **Product → Archive**
3. **等待构建完成**
4. **在 Organizer 窗口中**：
   - 选择你的 Archive
   - 点击 **Distribute App**
   - 选择分发方式：
     - **App Store Connect**：上传到 App Store
     - **Ad Hoc**：生成 .ipa 文件，可安装到指定设备
     - **Development**：开发版本，只能安装到已注册的设备

#### 方法二：生成 Ad Hoc 版本（用于直接安装）

1. **Product → Archive**
2. **Distribute App → Ad Hoc**
3. **选择证书和配置文件**
4. **导出 .ipa 文件**
5. **安装到 iPhone**：
   - 使用 **Apple Configurator 2**（Mac App Store）
   - 或使用 **3uTools**、**爱思助手** 等工具
   - 或通过 **TestFlight** 分发

## 🚀 快速命令

```bash
# 构建并同步到 iOS
npm run build && npm run cap:sync

# 打开 Xcode
npm run cap:open:ios

# 一键构建并打开（推荐）
npm run cap:build:ios
```

## 📱 安装方式

### 方式一：通过 Xcode 直接安装（开发测试）

1. 连接 iPhone 到 Mac
2. 在 Xcode 中选择设备并运行
3. 应用会直接安装到 iPhone

### 方式二：通过 TestFlight（推荐用于测试）

1. 在 App Store Connect 创建应用
2. 上传构建版本
3. 添加测试用户
4. 用户通过 TestFlight App 安装

### 方式三：通过 Ad Hoc 分发

1. 注册测试设备的 UDID
2. 生成 Ad Hoc 配置文件
3. 导出 .ipa 文件
4. 使用工具安装到设备

### 方式四：通过 App Store（正式发布）

1. 完成 App Store Connect 配置
2. 提交审核
3. 审核通过后上架

## 🔧 常见问题

### 1. 签名错误

**问题**：`Code signing is required`

**解决**：
- 确保已登录 Apple Developer 账号
- 在 Xcode 中配置正确的 Team
- 检查 Bundle Identifier 是否唯一

### 2. 设备未注册

**问题**：无法安装到设备

**解决**：
- 在 Apple Developer 网站注册设备 UDID
- 更新 Provisioning Profile

### 3. 构建失败

**问题**：CocoaPods 相关错误

**解决**：
```bash
cd ios/App
pod install
cd ../..
npm run cap:sync
```

### 4. 应用无法运行

**问题**：白屏或错误

**解决**：
- 检查 `capacitor.config.ts` 中的 `webDir` 是否为 `dist`
- 确保已运行 `npm run build`
- 运行 `npm run cap:sync` 同步文件

## 📝 配置文件说明

### capacitor.config.ts

```typescript
{
  appId: 'com.timecapsule.app',  // 应用唯一标识
  appName: 'Time Capsule',        // 应用名称
  webDir: 'dist',                 // Web 构建输出目录
}
```

### 修改应用信息

- **应用名称**：修改 `appName`
- **Bundle ID**：修改 `appId`（在 Xcode 中也可以修改）
- **图标**：替换 `ios/App/App/Assets.xcassets/AppIcon.appiconset/` 中的图标

## 🎯 下一步

打包完成后，你可以：

1. **测试应用**：在真机上测试所有功能
2. **优化性能**：使用 Xcode Instruments 分析性能
3. **提交审核**：准备 App Store 上架
4. **持续更新**：每次更新代码后重新构建和同步

## 📚 相关资源

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Apple Developer 文档](https://developer.apple.com/documentation/)
- [Xcode 使用指南](https://developer.apple.com/xcode/)

---

**注意**：首次打包可能需要一些时间配置环境，但之后的过程会很快。祝你打包顺利！🎉

