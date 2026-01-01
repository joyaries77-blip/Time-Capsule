# 使用云 Mac 服务打包 iOS 应用指南

本指南将详细介绍如何使用云 Mac 服务在 Windows 上打包 iOS 应用。

## 🌐 推荐的云 Mac 服务

### 1. MacinCloud（推荐新手）
- **网址**：https://www.macincloud.com/
- **价格**：$20-50/月
- **优点**：界面友好，支持多种套餐，有技术支持
- **适合**：个人开发者、偶尔使用

### 2. MacStadium
- **网址**：https://www.macstadium.com/
- **价格**：$99+/月
- **优点**：性能好，专业级服务
- **适合**：专业开发者、团队

### 3. AWS EC2 Mac
- **网址**：https://aws.amazon.com/ec2/instance-types/mac/
- **价格**：按小时计费（约 $1.08/小时）
- **优点**：按需付费，灵活
- **适合**：偶尔使用，临时需求

### 4. 其他选择
- **Scaleway**：https://www.scaleway.com/
- **Mac Web**：https://www.macweb.com/
- **Flow**：https://www.flow.swiss/

## 📋 准备工作

### 1. 准备项目文件

在 Windows 上，确保项目已准备好：

```bash
# 在 Windows 上执行
cd "D:\Time Capsule"

# 确保已构建（可选，也可以在 Mac 上构建）
npm run build

# 创建项目压缩包（方便传输）
# 或者使用 Git 推送到 GitHub/GitLab
```

### 2. 准备 Apple Developer 账号

- 访问：https://developer.apple.com/
- 注册个人开发者账号（$99/年）
- 或使用企业账号（$299/年）

**注意**：没有 Apple Developer 账号无法在真机上安装应用。

## 🚀 使用 MacinCloud（详细步骤）

### 步骤 1：注册账号

1. 访问 https://www.macincloud.com/
2. 选择套餐（推荐 "Dedicated Server" 或 "Shared Server"）
3. 注册账号并付款

### 步骤 2：连接 Mac

1. **获取连接信息**
   - 登录 MacinCloud 控制台
   - 获取 Mac 的 IP 地址和连接信息

2. **使用远程桌面连接**
   - **Windows 上**：使用 Microsoft Remote Desktop
   - 下载：https://apps.microsoft.com/detail/9WZDNCRDTK3P
   - 或使用 VNC 客户端（如 RealVNC）

3. **连接 Mac**
   - 输入 Mac 的 IP 地址
   - 输入用户名和密码（MacinCloud 提供）

### 步骤 3：传输项目文件

#### 方法一：使用 Git（推荐）

```bash
# 在 Windows 上
# 1. 初始化 Git（如果还没有）
cd "D:\Time Capsule"
git init
git add .
git commit -m "Initial commit"

# 2. 推送到 GitHub/GitLab
git remote add origin <your-repo-url>
git push -u origin main

# 在 Mac 上
git clone <your-repo-url>
cd Time-Capsule
```

#### 方法二：使用云存储

1. **上传到 Google Drive / OneDrive / Dropbox**
2. 在 Mac 上下载

#### 方法三：使用 SCP/SFTP

```bash
# 在 Windows 上使用 PowerShell 或 WinSCP
# 上传项目文件夹到 Mac
```

### 步骤 4：在云 Mac 上设置环境

```bash
# 1. 安装 Homebrew（如果还没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安装 Node.js
brew install node

# 3. 安装 Xcode（从 App Store）
# 打开 App Store，搜索 "Xcode"，安装

# 4. 安装 Xcode 命令行工具
xcode-select --install

# 5. 安装 CocoaPods
sudo gem install cocoapods
```

### 步骤 5：构建和打包

```bash
# 1. 进入项目目录
cd ~/Time-Capsule  # 或你的项目路径

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build

# 4. 添加 iOS 平台
npm run cap:add:ios

# 5. 安装 CocoaPods 依赖
cd ios/App
pod install
cd ../..

# 6. 同步到 iOS
npm run cap:sync

# 7. 打开 Xcode
npm run cap:open:ios
```

### 步骤 6：在 Xcode 中配置和构建

1. **配置签名**
   - 打开 Xcode
   - 选择项目 → Signing & Capabilities
   - 选择你的 Team
   - 修改 Bundle Identifier

2. **选择目标设备**
   - 选择 "Any iOS Device" 或连接的 iPhone

3. **构建 Archive**
   - Product → Archive
   - 等待构建完成

4. **导出 IPA**
   - 在 Organizer 窗口
   - 选择 Archive → Distribute App
   - 选择 "Ad Hoc" 或 "Development"
   - 导出 .ipa 文件

### 步骤 7：下载 IPA 文件

1. 在 Mac 上找到导出的 .ipa 文件
2. 通过以下方式下载到 Windows：
   - 上传到云存储（Google Drive 等）
   - 使用 SCP/SFTP 下载
   - 通过邮件发送给自己

### 步骤 8：安装到 iPhone

#### 方法一：使用 Apple Configurator 2（需要 Mac）

1. 在 Mac 上安装 Apple Configurator 2
2. 连接 iPhone
3. 拖拽 .ipa 文件到设备

#### 方法二：使用第三方工具（Windows）

1. **3uTools**（推荐）
   - 下载：https://www.3u.com/
   - 连接 iPhone
   - 使用 "应用" → "安装" 功能

2. **爱思助手**
   - 下载：https://www.i4.cn/
   - 连接 iPhone
   - 安装 .ipa 文件

3. **iMazing**
   - 下载：https://imazing.com/
   - 付费软件，功能强大

#### 方法三：通过 TestFlight（推荐）

1. 在 App Store Connect 创建应用
2. 上传构建版本
3. 添加测试用户
4. 用户通过 TestFlight App 安装

## 🔧 使用 AWS EC2 Mac（详细步骤）

### 步骤 1：创建 EC2 Mac 实例

1. **登录 AWS 控制台**
   - https://console.aws.amazon.com/

2. **启动 EC2 实例**
   - 选择 "mac1.metal" 实例类型
   - 选择 macOS 版本
   - 配置安全组（允许 SSH 和 VNC）

3. **获取连接信息**
   - 获取实例的 IP 地址
   - 下载密钥对（.pem 文件）

### 步骤 2：连接 Mac

```bash
# 在 Windows 上使用 PowerShell 或 WSL
# 1. 设置密钥权限（在 WSL 中）
chmod 400 your-key.pem

# 2. SSH 连接
ssh -i your-key.pem ec2-user@<instance-ip>

# 3. 设置 VNC（用于图形界面）
# 在 SSH 中执行：
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -on -restart -agent -privs -all
```

### 步骤 3：使用 VNC 客户端

1. **下载 VNC Viewer**
   - https://www.realvnc.com/en/connect/download/viewer/

2. **连接**
   - 地址：`<instance-ip>:5900`
   - 使用 ec2-user 账号登录

### 步骤 4：后续步骤

按照 "MacinCloud" 的步骤 4-8 执行。

## 💡 实用技巧

### 1. 优化传输速度

```bash
# 使用 Git LFS 处理大文件
git lfs install
git lfs track "*.zip"
git lfs track "*.dmg"
```

### 2. 自动化脚本

创建 `build-ios.sh`：

```bash
#!/bin/bash
set -e

echo "📦 构建 iOS 应用..."

# 安装依赖
npm install

# 构建
npm run build

# 同步到 iOS
npm run cap:sync

# 安装 Pods
cd ios/App
pod install
cd ../..

echo "✅ 构建完成！"
echo "运行 'npm run cap:open:ios' 打开 Xcode"
```

### 3. 使用 CI/CD

可以配置 GitHub Actions 自动构建：

```yaml
# .github/workflows/ios-build.yml
name: Build iOS

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run cap:add:ios
      - run: npm run cap:sync
```

## ⚠️ 常见问题

### 1. 连接速度慢

- 选择离你最近的服务器位置
- 使用有线网络
- 关闭不必要的应用

### 2. Xcode 安装慢

- 使用 App Store 下载（可能需要几小时）
- 或使用 Xcode 命令行工具（轻量级）

### 3. 签名错误

- 确保已登录 Apple Developer 账号
- 检查 Bundle Identifier 是否唯一
- 更新 Provisioning Profile

### 4. 无法安装到设备

- 注册设备的 UDID
- 使用 Ad Hoc 分发方式
- 或使用 TestFlight

## 📊 成本对比

| 服务 | 价格 | 适合场景 |
|------|------|----------|
| MacinCloud | $20-50/月 | 偶尔使用 |
| MacStadium | $99+/月 | 专业开发 |
| AWS EC2 Mac | $1.08/小时 | 临时需求 |
| 购买 Mac Mini | $599+ | 长期使用 |

## 🎯 推荐方案

### 方案一：偶尔打包（推荐 MacinCloud）

- 选择共享服务器套餐
- 按需使用，成本低
- 适合个人开发者

### 方案二：频繁使用（推荐购买 Mac Mini）

- 一次性投资
- 长期使用更划算
- 完全控制

### 方案三：团队使用（推荐 MacStadium）

- 专业级服务
- 性能稳定
- 技术支持好

## 📝 检查清单

在开始之前，确保：

- [ ] 已注册 Apple Developer 账号
- [ ] 已选择云 Mac 服务
- [ ] 已准备好项目文件
- [ ] 已了解基本成本
- [ ] 已准备好 iPhone 设备（用于测试）

## 🚀 开始打包

1. **选择云服务** → 注册账号
2. **连接 Mac** → 设置环境
3. **传输项目** → 构建应用
4. **在 Xcode 中打包** → 导出 IPA
5. **安装到 iPhone** → 测试应用

祝你打包顺利！🎉

