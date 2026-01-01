# 云 Mac 打包快速参考

## 🎯 在云 Mac 上打包 - 快速流程

### 📋 前提条件

- ✅ 已连接到云 Mac 服务器
- ✅ 已准备好项目文件
- ✅ 已注册 Apple Developer 账号

### 1️⃣ 传输项目到 Mac

**推荐：MacinCloud** (https://www.macincloud.com/)

```
1. 注册账号 → 选择套餐
2. 获取 Mac 连接信息
3. 使用 Remote Desktop 或 VNC 连接
```

### 2️⃣ 传输项目

**方法一：Git（推荐）**
```bash
# Windows 上
git init
git add .
git commit -m "Ready for build"
git remote add origin <your-repo>
git push

# Mac 上
git clone <your-repo>
cd Time-Capsule
```

**方法二：云存储**
- 上传到 Google Drive / OneDrive
- 在 Mac 上下载

### 3️⃣ 在 Mac 上设置环境

```bash
# 运行自动设置脚本
npm run setup:mac

# 或手动安装
brew install node
xcode-select --install
sudo gem install cocoapods
```

### 4️⃣ 构建和打包

```bash
# 自动构建（推荐）
npm run build:ios:auto

# 或手动步骤
npm install
npm run build
npm run cap:add:ios
npm run cap:sync
cd ios/App && pod install && cd ../..
npm run cap:open:ios
```

### 5️⃣ 在 Xcode 中完成

```
1. 配置签名（Signing & Capabilities）
   - 选择 Team
   - 修改 Bundle ID

2. Product → Archive

3. Distribute App → Ad Hoc

4. 导出 .ipa 文件
```

### 6️⃣ 安装到 iPhone

**Windows 上使用：**
- **3uTools** (推荐)
- **爱思助手**
- **iMazing**

或通过 **TestFlight** 分发

---

## 📋 必需条件

- [ ] Apple Developer 账号 ($99/年)
- [ ] 云 Mac 服务账号
- [ ] iPhone 设备（用于测试）

## 🔗 相关文档

- [详细指南](./CLOUD_MAC_GUIDE.md) - 完整步骤
- [iOS 打包指南](./IOS_BUILD_GUIDE.md) - Xcode 详细操作

## 💰 成本估算

- **MacinCloud**: $20-50/月
- **Apple Developer**: $99/年
- **总计**: 约 $339-459/年（首次）

## ⚡ 快速命令

```bash
# 设置环境
npm run setup:mac

# 自动构建
npm run build:ios:auto

# 打开 Xcode
npm run cap:open:ios
```

---

**提示**：首次设置可能需要 1-2 小时，之后每次打包只需 10-20 分钟。

---

## 📚 详细步骤

查看 [CLOUD_MAC_BUILD_STEPS.md](./CLOUD_MAC_BUILD_STEPS.md) 获取完整的打包步骤指南。

