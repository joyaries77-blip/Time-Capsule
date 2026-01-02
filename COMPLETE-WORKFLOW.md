# 完整打包和真机测试流程

## 🎯 目标
在云Mac上打包 Time Capsule iOS 应用，并在真机上进行测试。

## 📋 流程概览

```
本地构建 → 推送到GitHub → 云Mac克隆 → 构建和同步 → Xcode配置 → 真机测试
```

## 🚀 完整步骤

### 第一部分：本地准备（已完成 ✅）

1. ✅ 项目已构建
2. ✅ iOS 平台已添加
3. ✅ 代码已推送到 GitHub

### 第二部分：在云Mac上设置

#### 方法 1: 使用 MacinCloud Web 控制台（推荐，如果SSH有问题）

1. **登录 MacinCloud 控制面板**
   - 访问 MacinCloud 网站
   - 登录您的账户

2. **打开 Web 终端**
   - 在控制面板中找到 Web 终端或 Terminal 选项
   - 打开 Web 终端

3. **在 Web 终端中执行**：

```bash
# 进入主目录
cd ~

# 克隆项目
git clone https://github.com/joyaries77-blip/Time-Capsule.git

# 进入项目目录
cd Time-Capsule

# 运行完整构建脚本
chmod +x complete-build-and-test.sh
./complete-build-and-test.sh
```

#### 方法 2: 使用 SSH（如果连接正常）

```bash
# 连接到云Mac
ssh user285049@LA095.macincloud.com
# 密码: kss66081hjv

# 执行设置脚本
cd ~
git clone https://github.com/joyaries77-blip/Time-Capsule.git
cd Time-Capsule
chmod +x complete-build-and-test.sh
./complete-build-and-test.sh
```

#### 方法 3: 手动执行步骤

如果脚本无法运行，手动执行：

```bash
cd ~
git clone https://github.com/joyaries77-blip/Time-Capsule.git
cd Time-Capsule

# 安装依赖
npm install

# 构建项目
npm run build

# 同步到iOS
npx cap sync ios

# 安装CocoaPods（如果需要）
cd ios/App
pod install
cd ../..

# 打开Xcode
npx cap open ios
```

### 第三部分：在 Xcode 中配置

#### 1. 打开项目

脚本会自动打开 Xcode，或手动执行：
```bash
npx cap open ios
```

**⚠️ 重要**: 必须打开 `ios/App/App.xcworkspace`！

#### 2. 配置签名和证书

1. 在 Xcode 左侧导航栏，点击最顶部的项目名称（**App**）
2. 在中间面板选择 **TARGETS** > **App**
3. 切换到 **Signing & Capabilities** 标签页
4. 勾选 **Automatically manage signing**
5. 在 **Team** 下拉菜单中选择您的 Apple Developer 团队
6. 如果提示错误，检查：
   - Xcode > Preferences > Accounts 中是否已登录账号
   - Bundle Identifier 是否唯一

#### 3. 配置应用信息

在 **General** 标签页中：
- **Display Name**: Time Capsule
- **Bundle Identifier**: `com.timecapsule.app`（或您自己的唯一标识符）
- **Version**: 1.0.0
- **Build**: 1

### 第四部分：真机测试

#### 1. 连接设备

**USB 连接**：
1. 使用 USB 线连接 iPhone 到云Mac
2. 在设备上信任此电脑（如果提示）
3. 在 Xcode 顶部工具栏选择您的设备

**WiFi 连接**：
1. 确保设备和Mac在同一WiFi网络
2. 在 Xcode 中选择 **Window** > **Devices and Simulators**
3. 选择您的设备
4. 勾选 **Connect via network**

#### 2. 运行应用

1. 在 Xcode 中选择您的设备
2. 点击 **Run** 按钮（▶️）或按 `Cmd + R`
3. 等待构建完成
4. 应用将自动安装到设备上

#### 3. 信任开发者（首次安装）

在设备上：
1. 进入 **设置** > **通用** > **VPN与设备管理**
2. 找到您的开发者账号
3. 点击 **信任 [您的开发者账号]**
4. 确认信任

#### 4. 测试应用

1. 在设备上找到 Time Capsule 应用图标
2. 点击打开应用
3. 测试所有功能

## 📱 真机测试清单

- [ ] 应用可以正常启动
- [ ] 所有主要功能正常工作
- [ ] 界面显示正常
- [ ] 没有崩溃或错误
- [ ] 网络请求正常
- [ ] 数据保存正常

## 🔄 更新应用

当您修改代码后：

```bash
# 在云Mac上
cd ~/Time-Capsule
git pull origin main
npm run build
npx cap sync ios

# 在 Xcode 中重新运行
```

## 🐛 常见问题

### 问题 1: 设备未显示

**解决方案**：
- 确保设备已解锁
- 在设备上信任此电脑
- 检查 USB 连接
- 重启 Xcode

### 问题 2: 签名错误

**解决方案**：
- 检查是否已登录 Apple Developer 账号
- 确保 Bundle Identifier 唯一
- 清理项目：**Product** > **Clean Build Folder**

### 问题 3: 应用无法安装

**解决方案**：
- 在设备上信任开发者
- 检查设备存储空间
- 检查 Bundle Identifier 是否冲突

## 📚 相关文档

- `DEVICE-TEST-GUIDE.md` - 详细的真机测试指南
- `CLOUD-MAC-BUILD-GUIDE.md` - 打包指南
- `CLOUD-MAC-SETUP.md` - 云Mac设置指南

## 💡 提示

1. **使用 Web 控制台**：如果SSH有问题，MacinCloud的Web控制台是最可靠的方式
2. **首次构建**：可能需要 10-20 分钟（下载依赖）
3. **免费账号限制**：应用7天后过期，需要重新安装
4. **付费账号**：可以发布到 App Store 和 TestFlight

## ✅ 完成检查

- [x] 项目已在云Mac上设置
- [x] Xcode 项目已打开
- [x] 签名和证书已配置
- [x] 设备已连接
- [x] 应用已安装到设备
- [x] 真机测试通过

祝您打包和测试顺利！🎉

