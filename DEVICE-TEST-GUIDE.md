# 真机测试指南 - Time Capsule iOS

本指南将帮助您在云Mac上打包并在真机上测试 Time Capsule 应用。

## 📋 前置要求

1. **云Mac已连接**（通过SSH或Web控制台）
2. **Apple Developer 账号**（用于签名）
3. **iPhone/iPad 设备**（已连接或通过WiFi）
4. **USB 连接线**（如果使用有线连接）

## 🚀 快速开始（3步）

### 步骤 1: 在云Mac上设置项目

如果项目还未设置，执行：

```bash
cd ~
git clone https://github.com/joyaries77-blip/Time-Capsule.git
cd Time-Capsule
chmod +x complete-build-and-test.sh
./complete-build-and-test.sh
```

或手动执行：

```bash
cd ~/Time-Capsule
npm install
npm run build
npx cap sync ios
cd ios/App && pod install && cd ../..
npx cap open ios
```

### 步骤 2: 在 Xcode 中配置

#### 2.1 打开项目

```bash
npx cap open ios
```

**⚠️ 重要**: 必须打开 `ios/App/App.xcworkspace`，不要打开 `.xcodeproj`！

#### 2.2 配置签名和证书

1. 在 Xcode 左侧导航栏，点击最顶部的项目名称（**App**）
2. 在中间面板选择 **TARGETS** > **App**
3. 切换到 **Signing & Capabilities** 标签页
4. 勾选 **Automatically manage signing**
5. 在 **Team** 下拉菜单中选择您的 Apple Developer 团队
6. 确保 **Bundle Identifier** 是唯一的（例如：`com.timecapsule.app`）

#### 2.3 选择真机设备

1. 在 Xcode 顶部工具栏，点击设备选择器
2. 选择您连接的 iPhone/iPad
3. 如果设备未显示：
   - 确保设备已解锁
   - 在设备上信任此电脑（如果提示）
   - 检查 USB 连接或 WiFi 连接

### 步骤 3: 真机测试

#### 3.1 首次安装（需要信任开发者）

1. 在 Xcode 中点击 **Run** 按钮（▶️）或按 `Cmd + R`
2. 等待构建完成
3. 应用将自动安装到设备上
4. 在设备上：
   - 进入 **设置** > **通用** > **VPN与设备管理**
   - 找到您的开发者账号
   - 点击 **信任 [您的开发者账号]**
   - 确认信任

#### 3.2 运行应用

1. 在设备上找到 Time Capsule 应用图标
2. 点击打开应用
3. 开始测试功能

## 🔧 详细配置步骤

### 配置 Bundle Identifier

1. 在 Xcode 中选择项目
2. 选择 **TARGETS** > **App** > **General**
3. 修改 **Bundle Identifier** 为唯一值：
   - 例如：`com.yourname.timecapsule`
   - 或：`com.timecapsule.app.yourname`

### 配置版本号

1. 在 **General** 标签页中：
   - **Version**: `1.0.0`（应用版本）
   - **Build**: `1`（构建号，每次打包递增）

### 配置应用图标

1. 在 Xcode 中选择 **Assets.xcassets** > **AppIcon**
2. 将图标拖拽到对应的尺寸槽位
3. 或使用在线工具生成：https://www.appicon.co/

## 📱 真机测试方法

### 方法 1: USB 连接（推荐）

1. 使用 USB 线连接 iPhone 到云Mac
2. 在设备上信任此电脑（如果提示）
3. 在 Xcode 中选择设备
4. 点击 Run

### 方法 2: WiFi 连接

1. 确保设备和Mac在同一WiFi网络
2. 在 Xcode 中选择 **Window** > **Devices and Simulators**
3. 选择您的设备
4. 勾选 **Connect via network**
5. 断开 USB 后仍可通过 WiFi 连接

### 方法 3: TestFlight（用于远程测试）

1. 在 Xcode 中选择 **Product** > **Archive**
2. 等待归档完成
3. 在 Organizer 中选择 **Distribute App**
4. 选择 **App Store Connect**
5. 上传到 App Store Connect
6. 在 App Store Connect 中配置 TestFlight
7. 添加测试用户
8. 测试用户通过 TestFlight 应用安装

## 🐛 常见问题

### 问题 1: 设备未显示

**解决方案**：
- 确保设备已解锁
- 在设备上信任此电脑
- 检查 USB 连接
- 重启 Xcode

### 问题 2: 签名错误

**错误信息**：`No signing certificate found`

**解决方案**：
1. 检查是否已登录 Apple Developer 账号
2. 在 Xcode > Preferences > Accounts 中添加账号
3. 确保 Bundle Identifier 唯一
4. 清理项目：**Product** > **Clean Build Folder**

### 问题 3: 应用无法安装

**解决方案**：
1. 在设备上：**设置** > **通用** > **VPN与设备管理** > 信任开发者
2. 检查设备存储空间
3. 检查 Bundle Identifier 是否冲突

### 问题 4: 应用崩溃

**解决方案**：
1. 查看 Xcode 控制台的错误信息
2. 检查设备日志：**Window** > **Devices and Simulators** > **View Device Logs**
3. 确保所有依赖已正确安装

### 问题 5: 网络请求失败

**解决方案**：
1. 检查设备的网络连接
2. 检查 Info.plist 中的网络权限配置
3. 如果使用 HTTPS，确保证书有效

## 📊 测试清单

在真机上测试时，检查：

- [ ] 应用可以正常启动
- [ ] 所有主要功能正常工作
- [ ] 界面在不同设备尺寸上显示正常
- [ ] 没有崩溃或严重错误
- [ ] 网络请求正常
- [ ] 数据保存和读取正常
- [ ] 应用图标和启动画面正确显示
- [ ] 性能表现良好（无卡顿）

## 🔄 更新应用

当您修改代码后：

```bash
# 1. 在本地或云Mac上
cd ~/Time-Capsule
git pull origin main

# 2. 重新构建
npm run build
npx cap sync ios

# 3. 在 Xcode 中重新运行
# 或使用 Product > Clean Build Folder 然后 Run
```

## 📚 相关文档

- `CLOUD-MAC-BUILD-GUIDE.md` - 详细的打包指南
- `CLOUD-MAC-SETUP.md` - 云Mac设置指南
- `BUILD-STATUS.md` - 项目状态

## 💡 提示

1. **首次构建**可能需要较长时间（下载依赖）
2. **真机测试**需要 Apple Developer 账号（免费账号也可以）
3. **免费账号限制**：应用7天后过期，需要重新安装
4. **付费账号**：可以发布到 App Store 和 TestFlight

## ✅ 完成检查

真机测试完成后，确认：

- [x] 应用已成功安装到设备
- [x] 应用可以正常启动和运行
- [x] 主要功能测试通过
- [x] 没有严重错误或崩溃
- [x] 准备进行下一步（TestFlight 或 App Store 发布）

祝您测试顺利！🎉

