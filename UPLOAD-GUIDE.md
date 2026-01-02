# 上传项目到云Mac指南

本指南将帮助您将 Time Capsule 项目上传到云Mac进行打包和测试。

## 📋 前置要求

1. **云Mac已配置SSH访问**
2. **本地已安装SSH客户端**（Windows: OpenSSH, Git Bash, WSL; macOS/Linux: 内置）
3. **云Mac的IP地址或域名**
4. **云Mac的用户名和密码/SSH密钥**

## 🚀 方法 1: 使用上传脚本（推荐）

### Windows (PowerShell/Git Bash)

```bash
# 1. 进入项目目录
cd "D:\Time Capsule"

# 2. 给脚本添加执行权限（Git Bash）
chmod +x upload-to-cloud-mac.sh

# 3. 运行上传脚本
./upload-to-cloud-mac.sh [云Mac地址] [用户名] [目标路径]

# 示例
./upload-to-cloud-mac.sh mac.example.com user ~/Time-Capsule
./upload-to-cloud-mac.sh 192.168.1.100 developer
```

### macOS/Linux

```bash
# 1. 进入项目目录
cd "/path/to/Time Capsule"

# 2. 添加执行权限
chmod +x upload-to-cloud-mac.sh

# 3. 运行上传脚本
./upload-to-cloud-mac.sh [云Mac地址] [用户名] [目标路径]
```

### 使用环境变量

```bash
# 设置环境变量
export CLOUD_MAC_HOST=mac.example.com
export CLOUD_MAC_USER=user

# 运行脚本
./upload-to-cloud-mac.sh
```

## 🔧 方法 2: 使用 rsync（手动）

### Windows (Git Bash/WSL)

```bash
# 进入项目目录
cd "D:\Time Capsule"

# 使用 rsync 上传
rsync -avz --progress \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  --exclude=.DS_Store \
  --exclude=*.log \
  --exclude=ios/App/Pods \
  --exclude=ios/App/Podfile.lock \
  --exclude=*.xcuserstate \
  --exclude=DerivedData \
  ./ user@mac.example.com:~/Time-Capsule/
```

### macOS/Linux

```bash
rsync -avz --progress \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  ./ user@mac.example.com:~/Time-Capsule/
```

## 📦 方法 3: 打包后上传（适合大文件或慢速网络）

### 步骤 1: 打包项目

#### Windows (PowerShell)

```powershell
# 进入项目目录
cd "D:\Time Capsule"

# 使用 7-Zip 或 WinRAR 打包
# 排除以下文件夹和文件:
# - node_modules
# - dist
# - .git
# - *.log
# - ios/App/Pods
# - DerivedData
# - .vscode
# - .idea
```

#### macOS/Linux

```bash
# 进入项目目录
cd "/path/to/Time Capsule"

# 创建压缩包
tar -czf time-capsule-project.tar.gz \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.git' \
  --exclude='*.log' \
  --exclude='ios/App/Pods' \
  --exclude='DerivedData' \
  --exclude='.vscode' \
  --exclude='.idea' \
  .
```

### 步骤 2: 上传压缩包

#### 使用 SCP

```bash
# Windows (Git Bash/WSL) 或 macOS/Linux
scp time-capsule-project.tar.gz user@mac.example.com:~/Time-Capsule/
```

#### 使用 SFTP 客户端

- **FileZilla** (Windows/macOS/Linux)
- **WinSCP** (Windows)
- **Cyberduck** (Windows/macOS)

### 步骤 3: 在云Mac上解压

```bash
# SSH 连接到云Mac
ssh user@mac.example.com

# 进入目标目录
cd ~/Time-Capsule

# 解压
tar -xzf time-capsule-project.tar.gz

# 清理压缩包
rm time-capsule-project.tar.gz
```

## 🔐 配置SSH密钥（免密码登录）

### 生成SSH密钥（如果还没有）

```bash
# 生成密钥对
ssh-keygen -t ed25519 -C "your_email@example.com"

# 或使用 RSA
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 复制公钥到云Mac

```bash
# 方法 1: 使用 ssh-copy-id
ssh-copy-id user@mac.example.com

# 方法 2: 手动复制
cat ~/.ssh/id_ed25519.pub | ssh user@mac.example.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 测试连接

```bash
ssh user@mac.example.com
```

## 📁 需要上传的文件和文件夹

### ✅ 必须上传

- `ios/` - iOS 项目文件夹
- `src/` - 源代码
- `public/` - 公共资源
- `package.json` - 项目配置
- `package-lock.json` - 依赖锁定文件
- `capacitor.config.ts` - Capacitor 配置
- `vite.config.ts` - Vite 配置
- `index.html` - 入口文件
- `postcss.config.mjs` - PostCSS 配置
- `tsconfig.json` - TypeScript 配置（如果有）
- 所有 `.md` 文档文件

### ❌ 不需要上传

- `node_modules/` - 可以在云Mac上重新安装
- `dist/` - 可以在云Mac上重新构建
- `.git/` - Git 仓库（如果不需要）
- `*.log` - 日志文件
- `ios/App/Pods/` - CocoaPods 依赖
- `ios/App/Podfile.lock` - CocoaPods 锁定文件
- `*.xcuserstate` - Xcode 用户状态
- `DerivedData/` - Xcode 构建数据
- `.vscode/`, `.idea/` - 编辑器配置
- `*.zip` - 压缩包文件

## 🚀 上传后的操作

### 1. 连接到云Mac

```bash
ssh user@mac.example.com
```

### 2. 进入项目目录

```bash
cd ~/Time-Capsule
```

### 3. 安装依赖（如果需要）

```bash
# 安装 Node.js 依赖
npm install

# 安装 CocoaPods 依赖（如果需要）
cd ios/App
pod install
cd ../..
```

### 4. 重新构建（如果需要）

```bash
# 构建 Web 应用
npm run build

# 同步到 iOS
npx cap sync ios
```

### 5. 打开 Xcode 项目

```bash
npx cap open ios
```

或手动打开：

```bash
open ios/App/App.xcworkspace
```

## 🔍 验证上传

在云Mac上检查项目结构：

```bash
# 检查关键文件
ls -la
ls -la ios/
ls -la ios/App/

# 检查 Xcode 工作空间
ls -la ios/App/App.xcworkspace

# 检查配置文件
cat capacitor.config.ts
cat package.json
```

## ⚠️ 常见问题

### 问题 1: 连接被拒绝

**解决方案**：
- 检查云Mac的SSH服务是否运行
- 检查防火墙设置
- 确认IP地址和端口正确

### 问题 2: 权限被拒绝

**解决方案**：
- 检查用户名和密码是否正确
- 配置SSH密钥免密码登录
- 检查目标目录的写入权限

### 问题 3: 上传速度慢

**解决方案**：
- 使用压缩包方式上传
- 排除不需要的文件（node_modules, dist等）
- 检查网络连接

### 问题 4: 文件路径包含空格

**解决方案**：
- 使用引号包裹路径：`"~/Time Capsule"`
- 或使用下划线：`~/Time_Capsule`

## 📚 相关文档

- `CLOUD-MAC-BUILD-GUIDE.md` - 云Mac打包指南
- `QUICK-START-CLOUD-MAC.md` - 快速启动指南
- `BUILD-STATUS.md` - 项目状态

## 💡 提示

1. **首次上传**可能需要较长时间，特别是包含 `node_modules` 时
2. **建议排除** `node_modules` 和 `dist`，在云Mac上重新安装和构建
3. **使用 rsync** 可以增量同步，只上传更改的文件
4. **配置SSH密钥** 可以免密码登录，提高效率

祝您上传顺利！🎉

