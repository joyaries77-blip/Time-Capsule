# 云Mac设置指南

本指南将帮助您在云Mac上快速设置和运行 Time Capsule 项目。

## 📋 云Mac连接信息

- **主机名**: LA095.macincloud.com
- **IP地址**: 74.80.242.95
- **用户名**: user285049
- **密码**: kss66081hjv

## 🚀 快速设置（3步）

### 步骤 1: 连接到云Mac

```bash
ssh user285049@LA095.macincloud.com
```

或使用IP地址：

```bash
ssh user285049@74.80.242.95
```

### 步骤 2: 克隆项目

```bash
# 进入主目录
cd ~

# 克隆项目
git clone https://github.com/joyaries77-blip/Time-Capsule.git

# 进入项目目录
cd Time-Capsule
```

### 步骤 3: 运行设置脚本

```bash
# 添加执行权限
chmod +x setup-on-cloud-mac.sh

# 运行设置脚本
./setup-on-cloud-mac.sh
```

脚本会自动：
- ✅ 安装 Node.js 依赖
- ✅ 构建 Web 应用
- ✅ 同步到 iOS 项目
- ✅ 安装 CocoaPods 依赖（如果需要）

## 📱 打开 Xcode 项目

设置完成后，打开 Xcode：

```bash
# 方法 1: 使用 Capacitor 命令（推荐）
npx cap open ios

# 方法 2: 手动打开
open ios/App/App.xcworkspace
```

**⚠️ 重要**: 必须打开 `.xcworkspace` 文件，不要打开 `.xcodeproj` 文件！

## 🔧 在 Xcode 中配置

### 1. 配置签名和证书

1. 在 Xcode 左侧导航栏，点击最顶部的项目名称（**App**）
2. 在中间面板选择 **TARGETS** > **App**
3. 切换到 **Signing & Capabilities** 标签页
4. 勾选 **Automatically manage signing**
5. 在 **Team** 下拉菜单中选择您的 Apple Developer 团队

### 2. 选择目标设备

在 Xcode 顶部工具栏选择：
- **模拟器**：iPhone 15 Pro、iPhone 14 等
- **真机**：连接 iPhone 后选择您的设备

### 3. 运行或打包

- **测试**: 点击 Run 按钮（▶️）或按 `Cmd + R`
- **打包**: 选择 Product > Archive

## 🔄 更新项目

当 GitHub 上有新更新时：

```bash
# 进入项目目录
cd ~/Time-Capsule

# 拉取最新代码
git pull origin main

# 重新构建和同步
npm run build
npx cap sync ios

# 打开 Xcode
npx cap open ios
```

## 📚 详细文档

- `CLOUD-MAC-BUILD-GUIDE.md` - 详细的打包和测试指南
- `QUICK-START-CLOUD-MAC.md` - 快速启动指南
- `BUILD-STATUS.md` - 项目状态

## ⚠️ 常见问题

### 问题 1: Git 克隆失败

**解决方案**：
```bash
# 检查网络连接
ping github.com

# 如果使用代理，配置 Git 代理
git config --global http.proxy http://proxy.example.com:8080
```

### 问题 2: npm install 失败

**解决方案**：
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题 3: CocoaPods 安装失败

**解决方案**：
```bash
# 更新 Ruby gems
sudo gem update --system

# 安装 CocoaPods
sudo gem install cocoapods

# 如果权限问题，使用用户安装
gem install --user-install cocoapods
```

### 问题 4: Xcode 无法打开项目

**解决方案**：
```bash
# 确保打开的是 .xcworkspace 文件
open ios/App/App.xcworkspace

# 检查 Xcode 版本
xcodebuild -version

# 重新同步
npx cap sync ios
```

## 💡 提示

1. **首次设置**可能需要 10-20 分钟（下载依赖）
2. **确保 Xcode 已安装**（Xcode 14+）
3. **需要 Apple Developer 账号**才能签名和分发
4. **使用 GitHub** 可以方便地同步代码更新

## ✅ 检查清单

设置完成后，确认：

- [x] 项目已从 GitHub 克隆
- [x] Node.js 依赖已安装
- [x] Web 应用已构建
- [x] iOS 项目已同步
- [x] CocoaPods 依赖已安装（如果有 Podfile）
- [x] Xcode 可以打开项目
- [x] 签名和证书已配置

祝您设置顺利！🎉

