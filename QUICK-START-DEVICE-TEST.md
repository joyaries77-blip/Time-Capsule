# 🚀 快速开始 - 打包和真机测试

## 📋 3步完成打包和真机测试

### 步骤 1: 在云Mac上设置项目

**使用 MacinCloud Web 控制台**（推荐，如果SSH有问题）：

1. 登录 MacinCloud 控制面板
2. 打开 Web 终端
3. 执行以下命令：

```bash
cd ~
git clone https://github.com/joyaries77-blip/Time-Capsule.git
cd Time-Capsule
chmod +x complete-build-and-test.sh
./complete-build-and-test.sh
```

**或使用 SSH**（如果连接正常）：

```bash
ssh user285049@LA095.macincloud.com
# 密码: kss66081hjv

cd ~
git clone https://github.com/joyaries77-blip/Time-Capsule.git
cd Time-Capsule
chmod +x complete-build-and-test.sh
./complete-build-and-test.sh
```

### 步骤 2: 在 Xcode 中配置

1. **打开项目**（脚本会自动打开，或手动执行）：
   ```bash
   npx cap open ios
   ```

2. **配置签名**：
   - 选择项目 → TARGETS → App
   - Signing & Capabilities → 选择您的 Team

3. **选择设备**：
   - 连接 iPhone 到云Mac（USB或WiFi）
   - 在 Xcode 顶部选择您的设备

### 步骤 3: 真机测试

1. **运行应用**：
   - 点击 Run 按钮（▶️）或按 `Cmd + R`

2. **信任开发者**（首次安装）：
   - 在设备上：**设置** > **通用** > **VPN与设备管理** > 信任开发者

3. **测试应用**：
   - 在设备上打开应用
   - 测试所有功能

## 📚 详细文档

- **`COMPLETE-WORKFLOW.md`** - 完整流程指南 ⭐
- **`DEVICE-TEST-GUIDE.md`** - 真机测试详细指南
- **`CLOUD-MAC-SETUP.md`** - 云Mac设置指南

## 🔗 重要链接

- **GitHub 仓库**: https://github.com/joyaries77-blip/Time-Capsule
- **云Mac信息**:
  - 主机: LA095.macincloud.com
  - IP: 74.80.242.95
  - 用户: user285049

## 💡 提示

1. **使用 Web 控制台**：如果SSH有问题，这是最可靠的方式
2. **首次构建**：可能需要 10-20 分钟
3. **免费账号**：应用7天后过期，需要重新安装

## ✅ 检查清单

- [ ] 项目已在云Mac上克隆
- [ ] 构建脚本已执行
- [ ] Xcode 项目已打开
- [ ] 签名和证书已配置
- [ ] 设备已连接
- [ ] 应用已安装到设备
- [ ] 真机测试通过

现在开始打包和测试！🎉

