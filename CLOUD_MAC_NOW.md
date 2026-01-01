# 在云 Mac 上操作 - 立即开始

## ✅ 你已经连接到云 Mac！

现在按照以下步骤操作：

## 📋 第一步：打开终端

在云 Mac 上：

1. **按 `Cmd + Space`** 打开 Spotlight 搜索
2. **输入 "Terminal"**
3. **按回车** 打开终端

或：
- 点击 Dock 中的 Launchpad
- 找到 "其他" → "终端"

## 📦 第二步：传输项目文件

### 方法一：使用 Git（推荐）

#### 在 Windows 上准备（新开一个 PowerShell 窗口）：

```powershell
cd "D:\Time Capsule"

# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Ready for iOS build"

# 如果还没有 GitHub 账号，可以：
# 1. 访问 https://github.com 注册免费账号
# 2. 创建新仓库
# 3. 按照提示推送代码

# 或使用现有仓库
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 在云 Mac 终端中：

```bash
# 进入用户目录
cd ~

# 克隆项目（替换为你的仓库地址）
git clone <your-github-repo-url>

# 如果仓库名称不是 Time-Capsule，修改目录名
# 进入项目目录
cd Time-Capsule
# 或 cd <your-repo-name>
```

### 方法二：使用云存储（如果不想用 Git）

#### 在 Windows 上：

1. **压缩项目文件夹**
   ```powershell
   cd "D:\Time Capsule"
   Compress-Archive -Path * -DestinationPath "Time-Capsule.zip" -Force
   ```

2. **上传到云存储**
   - Google Drive: https://drive.google.com
   - OneDrive: https://onedrive.live.com
   - 或任何你使用的云存储

#### 在云 Mac 上：

1. **打开浏览器（Safari）**
2. **登录云存储**
3. **下载 ZIP 文件**
4. **解压文件**
   ```bash
   cd ~
   unzip Time-Capsule.zip
   cd Time-Capsule
   ```

## 🔧 第三步：运行自动设置脚本

在云 Mac 终端中：

```bash
# 确保在项目目录
cd ~/Time-Capsule

# 给脚本添加执行权限
chmod +x scripts/setup-and-build.sh

# 运行设置脚本
./scripts/setup-and-build.sh
```

脚本会自动：
- ✅ 检查并安装 Homebrew
- ✅ 检查并安装 Node.js
- ✅ 检查并安装 Xcode 命令行工具
- ✅ 检查并安装 CocoaPods
- ✅ 安装项目依赖
- ✅ 构建项目
- ✅ 配置 iOS 平台

**注意**：如果 Xcode 命令行工具需要安装，脚本会提示你等待安装完成。

## 🎯 第四步：打开 Xcode

设置完成后：

```bash
# 打开 Xcode
npm run cap:open:ios
```

## ⚙️ 第五步：在 Xcode 中配置

### 1. 配置签名

1. **选择项目**（左侧蓝色图标 "App"）
2. **选择 "Signing & Capabilities" 标签页**
3. **配置**：
   - **Team**: 选择你的 Apple Developer 账号
   - **Bundle Identifier**: 修改为唯一值（如：`com.yourname.timecapsule`）
   - **Automatically manage signing**: 确保已勾选

### 2. 选择目标设备

在顶部工具栏：
- 点击设备选择器
- 选择 "Any iOS Device"（用于 Archive）
- 或选择连接的 iPhone（用于直接安装）

### 3. 构建 Archive

1. **Product → Archive**
2. **等待构建完成**（可能需要几分钟）
3. **构建完成后会打开 Organizer 窗口**

### 4. 导出 IPA

在 Organizer 窗口中：

1. **选择你的 Archive**
2. **点击 "Distribute App"**
3. **选择 "Ad Hoc"**（用于直接安装）
4. **选择证书和配置文件**
5. **导出到桌面或指定位置**

## 📥 第六步：下载 IPA 到 Windows

### 方法一：使用云存储

1. **在 Mac 上**：将 IPA 文件上传到云存储
2. **在 Windows 上**：下载 IPA 文件

### 方法二：使用 RDP 驱动器共享

如果配置了 RDP 驱动器共享，IPA 文件会自动出现在 Windows 的共享文件夹中。

## 📱 第七步：安装到 iPhone

### 使用 3uTools（推荐）

1. **下载 3uTools**: https://www.3u.com/
2. **连接 iPhone** 到 Windows 电脑
3. **打开 3uTools** → "应用" → "安装"
4. **选择 IPA 文件** → 安装

## ⚠️ 重要提示

### 必须登出！

使用完毕后：
- 点击左上角 **Apple 图标** → **Log Out**
- **不要直接关闭窗口**
- 未登出会继续计费

### 需要 Apple Developer 账号

如果没有账号：
- 访问：https://developer.apple.com/
- 注册个人开发者账号（$99/年）
- 或使用企业账号（$299/年）

## 🆘 遇到问题？

### 脚本执行失败

```bash
# 手动检查环境
node --version
npm --version
xcode-select -p
pod --version
```

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
- 在 Xcode 中更新 Provisioning Profile

## 📝 快速命令参考

```bash
# 设置环境
./scripts/setup-and-build.sh

# 构建项目
npm run build

# 同步到 iOS
npm run cap:sync

# 打开 Xcode
npm run cap:open:ios

# 安装 Pods
cd ios/App && pod install && cd ../..
```

---

**现在开始**：打开终端，按照上述步骤操作！

