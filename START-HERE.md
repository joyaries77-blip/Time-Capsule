# 🚀 开始使用 - Time Capsule iOS 打包

## ✅ 已完成的工作

1. ✅ iOS 平台已添加
2. ✅ 图标文件已准备
3. ✅ 项目已构建
4. ✅ 代码已推送到 GitHub: https://github.com/joyaries77-blip/Time-Capsule

## 📱 在云Mac上设置项目（3步）

### 步骤 1: 连接到云Mac

```bash
ssh user285049@LA095.macincloud.com
```

或使用IP地址：

```bash
ssh user285049@74.80.242.95
```

**密码**: kss66081hjv

### 步骤 2: 克隆项目

```bash
cd ~
git clone https://github.com/joyaries77-blip/Time-Capsule.git
cd Time-Capsule
```

### 步骤 3: 运行设置脚本

```bash
chmod +x setup-on-cloud-mac.sh
./setup-on-cloud-mac.sh
```

脚本会自动：
- 安装 Node.js 依赖
- 构建 Web 应用
- 同步到 iOS 项目
- 安装 CocoaPods 依赖

## 🎯 打开 Xcode 项目

设置完成后：

```bash
npx cap open ios
```

或手动打开：

```bash
open ios/App/App.xcworkspace
```

**⚠️ 重要**: 必须打开 `.xcworkspace` 文件！

## 📋 在 Xcode 中配置

1. **配置签名**:
   - 选择项目 → TARGETS → App
   - Signing & Capabilities → 选择您的 Team

2. **选择设备**: 模拟器或真机

3. **运行或打包**:
   - Run (▶️) 进行测试
   - Product > Archive 进行打包

## 📚 详细文档

- **`CLOUD-MAC-SETUP.md`** - 完整的云Mac设置指南 ⭐
- **`CLOUD-MAC-BUILD-GUIDE.md`** - 详细的打包和测试指南
- **`QUICK-START-CLOUD-MAC.md`** - 快速启动指南
- **`BUILD-STATUS.md`** - 项目状态

## 🔗 重要链接

- **GitHub 仓库**: https://github.com/joyaries77-blip/Time-Capsule
- **云Mac信息**:
  - 主机: LA095.macincloud.com
  - IP: 74.80.242.95
  - 用户: user285049

## 💡 快速命令参考

```bash
# 连接到云Mac
ssh user285049@LA095.macincloud.com

# 克隆项目
git clone https://github.com/joyaries77-blip/Time-Capsule.git

# 设置项目
cd Time-Capsule && ./setup-on-cloud-mac.sh

# 打开 Xcode
npx cap open ios
```

## 🎉 开始打包！

现在您可以：
1. 连接到云Mac
2. 克隆项目
3. 运行设置脚本
4. 在 Xcode 中打包和测试

祝您打包顺利！🚀

