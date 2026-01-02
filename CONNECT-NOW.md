# 🔗 立即连接到云Mac

## 快速连接（复制粘贴即可）

### Windows PowerShell

```powershell
ssh user285049@LA095.macincloud.com
```

**密码**: `kss66081hjv`

### Windows Git Bash / macOS / Linux

```bash
ssh user285049@LA095.macincloud.com
```

**密码**: `kss66081hjv`

## 📋 连接后的完整步骤

连接成功后，在云Mac上执行以下命令：

```bash
# 1. 进入主目录
cd ~

# 2. 克隆项目
git clone https://github.com/joyaries77-blip/Time-Capsule.git

# 3. 进入项目目录
cd Time-Capsule

# 4. 运行设置脚本
chmod +x setup-on-cloud-mac.sh
./setup-on-cloud-mac.sh

# 5. 打开 Xcode 项目
npx cap open ios
```

## 🚀 一键执行（如果已配置SSH密钥）

```bash
ssh user285049@LA095.macincloud.com << 'ENDSSH'
cd ~
if [ ! -d "Time-Capsule" ]; then
    git clone https://github.com/joyaries77-blip/Time-Capsule.git
fi
cd Time-Capsule
chmod +x setup-on-cloud-mac.sh
./setup-on-cloud-mac.sh
npx cap open ios
ENDSSH
```

## 📱 在 Xcode 中配置

1. **配置签名**:
   - 选择项目 → TARGETS → App
   - Signing & Capabilities → 选择您的 Team

2. **选择设备**: 模拟器或真机

3. **运行或打包**:
   - Run (▶️) 进行测试
   - Product > Archive 进行打包

## 🔐 云Mac连接信息

- **主机名**: LA095.macincloud.com
- **IP地址**: 74.80.242.95
- **用户名**: user285049
- **密码**: kss66081hjv

## 💡 提示

- 首次连接可能需要确认主机密钥，输入 `yes`
- 如果连接失败，检查网络连接
- 设置过程可能需要 10-20 分钟（下载依赖）

## 📚 详细文档

- `CLOUD-MAC-SETUP.md` - 完整的设置指南
- `CLOUD-MAC-BUILD-GUIDE.md` - 打包指南
- `START-HERE.md` - 快速开始

