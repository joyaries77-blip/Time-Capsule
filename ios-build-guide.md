# iOS 打包指南 - Time Capsule

本指南将帮助您在云 Mac 上使用 Xcode 打包和安装 Time Capsule iOS 应用。

## 前置要求

1. **云 Mac 环境**（已安装 Xcode）
2. **Apple Developer 账号**（用于签名和分发）
3. **Node.js 和 npm**（已安装）

## 步骤 1: 安装依赖

```bash
# 安装项目依赖
npm install

# 安装 Capacitor CLI（如果未全局安装）
npm install -g @capacitor/cli

# 安装 Capacitor iOS 平台
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap add ios
```

## 步骤 2: 生成图标文件

1. 打开浏览器访问 `public/icon-generator.html`
2. 下载生成的 `icon-192.png` 和 `icon-512.png`
3. 将文件放在 `public` 文件夹中

或者使用在线工具生成图标：
- 访问 https://www.favicon-generator.org/
- 上传一个 512x512 的图标
- 下载所有尺寸的图标

## 步骤 3: 构建 Web 应用

```bash
# 构建生产版本
npm run build
```

构建完成后，文件将输出到 `dist` 文件夹。

## 步骤 4: 同步到 iOS 项目

```bash
# 同步 Web 资源到 iOS 项目
npx cap sync ios
```

这将：
- 将 `dist` 文件夹的内容复制到 iOS 项目
- 更新 iOS 项目配置
- 安装必要的 iOS 依赖

## 步骤 5: 配置 Xcode 项目

### 5.1 打开 Xcode 项目

```bash
# 在 Xcode 中打开项目
npx cap open ios
```

或者手动打开：
```bash
open ios/App/App.xcworkspace
```

### 5.2 配置应用信息

1. 在 Xcode 中选择项目（左侧导航栏最顶部）
2. 选择 **TARGETS** > **App**
3. 在 **General** 标签页中：
   - **Display Name**: Time Capsule
   - **Bundle Identifier**: `com.timecapsule.app`（或您自己的标识符）
   - **Version**: 1.0.0
   - **Build**: 1

### 5.3 配置签名

1. 在 **Signing & Capabilities** 标签页中：
   - 选择您的 **Team**（需要 Apple Developer 账号）
   - 确保 **Automatically manage signing** 已勾选
   - Xcode 会自动生成 Provisioning Profile

### 5.4 配置图标

1. 在 **App Icons and Launch Screen** 中：
   - 准备以下尺寸的图标：
     - 20x20 (@2x, @3x)
     - 29x29 (@2x, @3x)
     - 40x40 (@2x, @3x)
     - 60x60 (@2x, @3x)
     - 76x76 (@1x, @2x)
     - 83.5x83.5 (@2x)
     - 1024x1024 (@1x)
   - 可以使用在线工具生成：https://www.appicon.co/
   - 将图标拖拽到 AppIcon 资源集中

## 步骤 6: 选择目标设备

1. 在 Xcode 顶部工具栏选择目标设备：
   - **模拟器**：选择 iPhone 15 Pro 等模拟器
   - **真机**：连接 iPhone 后选择您的设备

## 步骤 7: 构建和运行

### 在模拟器上运行

1. 选择模拟器（如 iPhone 15 Pro）
2. 点击 **Run** 按钮（▶️）或按 `Cmd + R`
3. 等待构建完成，应用将在模拟器中启动

### 在真机上运行

1. 连接 iPhone 到 Mac
2. 在 iPhone 上信任此电脑（如果提示）
3. 在 Xcode 中选择您的设备
4. 点击 **Run** 按钮
5. 在 iPhone 上：**设置** > **通用** > **VPN与设备管理** > 信任开发者

## 步骤 8: 打包为 IPA（用于分发）

### 8.1 Archive（归档）

1. 在 Xcode 菜单栏选择 **Product** > **Archive**
2. 等待归档完成
3. Organizer 窗口将自动打开

### 8.2 分发应用

在 Organizer 窗口中：

1. 选择刚创建的 Archive
2. 点击 **Distribute App**
3. 选择分发方式：
   - **App Store Connect**：上传到 App Store
   - **Ad Hoc**：通过 TestFlight 或直接安装
   - **Development**：开发测试
   - **Enterprise**：企业分发

4. 按照向导完成签名和导出

### 8.3 导出 IPA 文件

1. 选择导出位置
2. 等待导出完成
3. 您将获得一个 `.ipa` 文件

## 步骤 9: 安装到设备

### 方法 1: 通过 Xcode 安装

1. 连接设备
2. 在 Xcode 中选择设备
3. 点击 **Run**

### 方法 2: 通过 TestFlight

1. 上传到 App Store Connect
2. 在 TestFlight 中添加测试用户
3. 用户通过 TestFlight 应用安装

### 方法 3: 通过 Ad Hoc 分发

1. 导出 Ad Hoc 版本
2. 使用 Apple Configurator 2 或第三方工具安装
3. 或通过网页分发（需要 HTTPS）

## 常见问题

### 问题 1: 签名错误

**解决方案**：
- 确保已登录 Apple Developer 账号
- 检查 Bundle Identifier 是否唯一
- 清理项目：**Product** > **Clean Build Folder**

### 问题 2: 构建失败

**解决方案**：
```bash
# 清理并重新同步
npm run build
npx cap sync ios
```

### 问题 3: 图标不显示

**解决方案**：
- 确保所有图标尺寸都已添加
- 使用 `.png` 格式，不要使用 `.jpg`
- 重新构建项目

### 问题 4: 应用无法启动

**解决方案**：
- 检查控制台错误信息
- 确保 `dist` 文件夹内容已正确同步
- 运行 `npx cap sync ios` 重新同步

## 更新应用

当您修改了代码后：

```bash
# 1. 重新构建
npm run build

# 2. 同步到 iOS
npx cap sync ios

# 3. 在 Xcode 中重新运行
```

## 有用的命令

```bash
# 查看 Capacitor 版本
npx cap --version

# 查看已安装的平台
npx cap ls

# 更新 Capacitor
npm update @capacitor/core @capacitor/cli @capacitor/ios

# 清理 iOS 构建
cd ios
xcodebuild clean
cd ..
```

## 注意事项

1. **首次构建可能需要较长时间**（下载依赖）
2. **确保 Xcode 版本兼容**（建议 Xcode 14+）
3. **iOS 部署目标**：建议设置为 iOS 13.0 或更高
4. **内存要求**：Xcode 需要至少 8GB RAM

## 技术支持

如果遇到问题，请检查：
- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Xcode 文档](https://developer.apple.com/documentation/xcode)
- 项目 GitHub Issues

祝您打包顺利！🎉

