# 快速上传指南

## 🚀 快速开始（3步）

### 1. 准备连接信息

获取以下信息：
- 云Mac的IP地址或域名（例如：`192.168.1.100` 或 `mac.example.com`）
- 用户名（例如：`user` 或 `developer`）
- SSH端口（默认：22）

### 2. 测试连接

```bash
# Windows (Git Bash)
./test-connection.sh mac.example.com user

# macOS/Linux
chmod +x test-connection.sh
./test-connection.sh mac.example.com user
```

### 3. 上传项目

#### Windows (PowerShell)

```powershell
.\upload-to-cloud-mac.ps1 -Host "mac.example.com" -User "user"
```

#### Windows (Git Bash) / macOS / Linux

```bash
chmod +x upload-to-cloud-mac.sh
./upload-to-cloud-mac.sh mac.example.com user
```

## 📋 完整命令参考

### 测试连接

```bash
# 基本测试
ssh user@mac.example.com "echo '连接成功'"

# 检查 Xcode
ssh user@mac.example.com "xcodebuild -version"

# 检查 Node.js
ssh user@mac.example.com "node --version"
```

### 上传项目

```bash
# 使用脚本（推荐）
./upload-to-cloud-mac.sh mac.example.com user ~/Time-Capsule

# 使用 rsync（手动）
rsync -avz --progress \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  ./ user@mac.example.com:~/Time-Capsule/
```

### 连接到云Mac

```bash
ssh user@mac.example.com
```

### 在云Mac上打开项目

```bash
# 进入项目目录
cd ~/Time-Capsule

# 打开 Xcode
npx cap open ios
```

## 🔐 配置SSH密钥（免密码）

### 1. 生成密钥（如果还没有）

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### 2. 复制公钥到云Mac

```bash
ssh-copy-id user@mac.example.com
```

### 3. 测试免密码登录

```bash
ssh user@mac.example.com
```

## ⚡ 常用命令

```bash
# 查看上传进度
rsync -avz --progress ./ user@mac.example.com:~/Time-Capsule/

# 只上传特定文件夹
rsync -avz --progress ios/ user@mac.example.com:~/Time-Capsule/ios/

# 在云Mac上执行命令
ssh user@mac.example.com "cd ~/Time-Capsule && npm install"

# 同步后打开 Xcode
ssh user@mac.example.com "cd ~/Time-Capsule && npx cap sync ios && npx cap open ios"
```

## 📚 详细文档

- `UPLOAD-GUIDE.md` - 完整上传指南
- `CLOUD-MAC-BUILD-GUIDE.md` - 云Mac打包指南
- `QUICK-START-CLOUD-MAC.md` - 快速启动指南

