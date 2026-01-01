# 在云 Mac 服务器上打包 iOS 应用 - 详细步骤

## 📋 准备工作清单

- [ ] 已连接到云 Mac 服务器（MacinCloud）
- [ ] 已准备好项目文件
- [ ] 已注册 Apple Developer 账号（$99/年）

## 🚀 第一步：连接到云 Mac

### 使用 RDP 连接

1. **打开 Remote Desktop**
   - 双击 `connect-macincloud.rdp` 文件
   - 或运行：`mstsc /v:LA095.macincloud.com:6000`

2. **登录**
   - 用户名：`user285049`
   - 密码：`kss66081hjv`

3. **确认连接成功**
   - 看到 macOS 桌面即表示连接成功

## 📦 第二步：传输项目文件

### 方法一：使用 Git（推荐）

#### 在 Windows 上准备：

```bash
# 在 Windows PowerShell 中执行
cd "D:\Time Capsule"

# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Ready for iOS build"

# 推送到 GitHub/GitLab
# 如果没有账号，可以创建免费账号
git remote add origin <your-repo-url>
git push -u origin main
```

#### 在云 Mac 上克隆：

1. **打开终端（Terminal）**
   - 按 `Cmd + Space`，搜索 "Terminal"
   - 或 Applications → Utilities → Terminal

2. **克隆项目**
   ```bash
   # 进入用户目录
   cd ~
   
   # 克隆项目（替换为你的仓库地址）
   git clone <your-repo-url>
   
   # 进入项目目录
   cd Time-Capsule
   ```

### 方法二：使用云存储

1. **在 Windows 上**：
   - 压缩项目文件夹为 ZIP
   - 上传到 Google Drive / OneDrive / Dropbox

2. **在云 Mac 上**：
   - 打开浏览器（Safari）
   - 登录云存储
   - 下载 ZIP 文件
   - 解压到 `~/Time-Capsule` 目录

### 方法三：使用 SCP（高级）

在 Windows PowerShell 中：

```powershell
# 压缩项目
Compress-Archive -Path "D:\Time Capsule\*" -DestinationPath "Time-Capsule.zip"

# 使用 SCP 传输（需要安装 OpenSSH）
scp Time-Capsule.zip user285049@LA095.macincloud.com:~/
```

## 🔧 第三步：设置 Mac 环境

### 在云 Mac 终端中执行：

```bash
# 1. 进入项目目录
cd ~/Time-Capsule

# 2. 运行自动设置脚本
npm run setup:mac

# 或手动安装：

# 安装 Homebrew（如果还没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node

# 验证安装
node --version
npm --version
```

### 安装 Xcode 和命令行工具

```bash
# 安装 Xcode 命令行工具（必需）
xcode-select --install

# 等待安装完成（可能需要几分钟）
# 如果提示已安装，可以跳过

# 验证安装
xcode-select -p
```

### 安装 CocoaPods

```bash
# 安装 CocoaPods（iOS 依赖管理）
sudo gem install cocoapods

# 验证安装
pod --version
```

## 📱 第四步：安装项目依赖

```bash
# 在项目目录中
cd ~/Time-Capsule

# 安装 Node.js 依赖
npm install

# 安装 React 和 React DOM（如果还没有）
npm install react@18.3.1 react-dom@18.3.1
```

## 🏗️ 第五步：构建项目

```bash
# 构建 Web 应用
npm run build

# 检查 dist 目录是否生成
ls -la dist/
```

## 📲 第六步：添加 iOS 平台

```bash
# 添加 iOS 平台（首次）
npm run cap:add:ios

# 同步到 iOS
npm run cap:sync

# 安装 CocoaPods 依赖
cd ios/App
pod install
cd ../..
```

## 🎨 第七步：配置 iOS 项目

### 打开 Xcode

```bash
# 打开 Xcode 项目
npm run cap:open:ios
```

### 在 Xcode 中配置

1. **选择项目**
   - 在左侧导航器中选择 `App` 项目（蓝色图标）

2. **配置签名（Signing & Capabilities）**
   - 选择 "Signing & Capabilities" 标签页
   - 在 "Team" 下拉菜单中选择你的 Apple Developer 账号
   - 如果没有账号，需要先注册：https://developer.apple.com/
   - 修改 "Bundle Identifier"（例如：`com.yourname.timecapsule`）
   - 确保 "Automatically manage signing" 已勾选

3. **配置应用信息**
   - 选择 "General" 标签页
   - 可以修改 "Display Name"（应用显示名称）
   - 检查 "Version" 和 "Build" 号

4. **配置快捷操作（可选）**
   - 按照 `IOS_SHORTCUTS_SETUP.md` 配置
   - 在 `Info.plist` 或 `AppDelegate.swift` 中添加快捷操作

## 🔨 第八步：构建应用

### 选择目标设备

1. **在 Xcode 顶部工具栏**
   - 点击设备选择器（显示 "Any iOS Device" 或设备名称）
   - 选择：
     - **连接的 iPhone**（真机测试）
     - **模拟器**（如 iPhone 15 Pro，用于测试）

### 构建并运行

1. **点击运行按钮**（▶️）或按 `Cmd + R`
2. **等待构建完成**
   - 首次构建可能需要几分钟
   - 如果选择真机，需要在 iPhone 上信任开发者

### 创建 Archive（用于分发）

1. **选择 "Any iOS Device"** 作为目标
2. **Product → Archive**
3. **等待构建完成**
   - 构建完成后会打开 Organizer 窗口

## 📦 第九步：导出 IPA 文件

### 在 Organizer 窗口中：

1. **选择你的 Archive**
2. **点击 "Distribute App"**
3. **选择分发方式**：
   - **Development**：开发版本，只能安装到已注册的设备
   - **Ad Hoc**：生成 .ipa 文件，可安装到指定设备
   - **App Store Connect**：上传到 App Store

### 推荐：Ad Hoc 方式

1. **选择 "Ad Hoc"**
2. **选择证书和配置文件**
   - 如果已配置，会自动选择
3. **导出选项**
   - 选择保存位置
   - 点击 "Export"
4. **等待导出完成**
   - 会生成 `.ipa` 文件

## 📥 第十步：下载 IPA 文件到 Windows

### 方法一：使用云存储

1. **在 Mac 上**：
   - 将 `.ipa` 文件上传到 Google Drive / OneDrive
2. **在 Windows 上**：
   - 下载 `.ipa` 文件

### 方法二：使用 SCP

在 Windows PowerShell 中：

```powershell
# 从 Mac 下载 IPA 文件
scp user285049@LA095.macincloud.com:~/Time-Capsule/ios/App/TimeCapsule.ipa ./
```

### 方法三：使用共享文件夹

如果配置了 RDP 驱动器共享：
- IPA 文件会自动出现在 Windows 的共享文件夹中

## 📱 第十一步：安装到 iPhone

### 使用 3uTools（推荐）

1. **下载 3uTools**
   - 访问：https://www.3u.com/
   - 下载并安装

2. **连接 iPhone**
   - 使用 USB 线连接 iPhone 到 Windows 电脑
   - 在 iPhone 上信任电脑

3. **安装应用**
   - 打开 3uTools
   - 点击 "应用" → "安装"
   - 选择 `.ipa` 文件
   - 点击 "安装"

### 使用爱思助手

1. **下载爱思助手**
   - 访问：https://www.i4.cn/
   - 下载并安装

2. **安装应用**
   - 连接 iPhone
   - 选择 `.ipa` 文件安装

### 使用 TestFlight（推荐用于测试）

1. **在 App Store Connect 创建应用**
   - 访问：https://appstoreconnect.apple.com/
   - 创建新应用

2. **上传构建版本**
   - 在 Xcode 中选择 "App Store Connect"
   - 上传构建版本

3. **添加测试用户**
   - 在 TestFlight 中添加测试用户

4. **用户安装**
   - 测试用户通过 TestFlight App 安装

## ⚠️ 重要提示

### 1. 正确登出

**使用完毕后必须登出！**
- 点击左上角 **Apple 图标** → **Log Out**
- 不要直接关闭窗口
- 未登出会继续计费

### 2. 保存工作

- 定期提交代码到 Git
- 保存 IPA 文件到安全位置
- 记录配置信息

### 3. 成本控制

- 使用完毕后立即登出
- 避免长时间保持连接
- 考虑使用按需付费套餐

## 🔍 故障排除

### 构建失败

```bash
# 清理并重新构建
cd ios/App
pod deintegrate
pod install
cd ../..
npm run cap:sync
```

### 签名错误

- 确保已登录 Apple Developer 账号
- 检查 Bundle Identifier 是否唯一
- 更新 Provisioning Profile

### 无法安装到设备

- 注册设备的 UDID
- 使用 Ad Hoc 分发方式
- 或使用 TestFlight

## 📝 快速命令参考

```bash
# 设置环境
npm run setup:mac

# 构建项目
npm run build

# 自动构建 iOS
npm run build:ios:auto

# 打开 Xcode
npm run cap:open:ios

# 同步到 iOS
npm run cap:sync
```

## ✅ 完成检查清单

- [ ] 已连接到云 Mac
- [ ] 已传输项目文件
- [ ] 已设置开发环境
- [ ] 已安装项目依赖
- [ ] 已构建项目
- [ ] 已添加 iOS 平台
- [ ] 已在 Xcode 中配置
- [ ] 已构建 Archive
- [ ] 已导出 IPA 文件
- [ ] 已下载到 Windows
- [ ] 已安装到 iPhone
- [ ] 已登出云 Mac

---

**提示**：首次打包可能需要 1-2 小时，之后会更快。祝你打包顺利！🎉

