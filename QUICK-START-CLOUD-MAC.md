# 云Mac快速启动指南

## 🚀 在云Mac上打开项目

### 方法 1: 使用 Capacitor 命令（推荐）

```bash
# 进入项目目录
cd "/path/to/Time Capsule"

# 在 Xcode 中打开项目
npx cap open ios
```

### 方法 2: 直接打开 Xcode 工作空间

```bash
# 进入项目目录
cd "/path/to/Time Capsule"

# 打开 Xcode 工作空间
open ios/App/App.xcworkspace
```

### 方法 3: 使用 Finder

1. 在 Finder 中导航到项目文件夹
2. 进入 `ios/App/` 文件夹
3. 双击 `App.xcworkspace` 文件

**⚠️ 重要**：必须打开 `.xcworkspace` 文件，不要打开 `.xcodeproj` 文件！

## 📋 打开后的步骤

1. **等待 Xcode 加载项目**（首次可能需要几分钟）
2. **配置签名**：
   - 选择项目（左侧导航栏顶部）
   - 选择 TARGETS > App
   - 切换到 Signing & Capabilities
   - 选择您的 Team
3. **选择目标设备**：
   - 在顶部工具栏选择模拟器或真机
4. **运行或打包**：
   - 点击 Run (▶️) 进行测试
   - 或选择 Product > Archive 进行打包

## 🔧 如果遇到问题

### 项目未找到
```bash
# 确认当前位置
pwd

# 列出文件
ls -la

# 检查 iOS 文件夹是否存在
ls -la ios/
```

### Xcode 未安装
```bash
# 检查 Xcode 版本
xcodebuild -version

# 如果未安装，需要安装 Xcode（通过 App Store 或开发者网站）
```

### 需要重新同步
```bash
# 重新构建和同步
npm run build
npx cap sync ios
npx cap open ios
```

## 📚 更多信息

- 详细打包指南：`CLOUD-MAC-BUILD-GUIDE.md`
- 项目状态：`BUILD-STATUS.md`

