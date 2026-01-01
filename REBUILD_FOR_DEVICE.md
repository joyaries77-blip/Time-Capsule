# 重新打包安装包 - 真机测试流程

## 🎯 目标

重新构建应用并导出 IPA，用于 iPhone 真机测试。

## 📋 完整操作步骤

### 第一步：在云 Mac 上准备项目

```bash
cd ~/try

# 确保代码是最新的
git pull

# 构建项目
npm run build

# 同步到 iOS
npm run cap:sync
```

### 第二步：打开 Xcode

```bash
npm run cap:open:ios
```

### 第三步：在 Xcode 中配置

1. **选择项目**（左侧蓝色图标 "App"）

2. **检查签名配置**
   - 选择 "Signing & Capabilities" 标签页
   - 确认：
     - **Team**: 已选择你的 Apple ID
     - **Bundle Identifier**: 唯一标识（如：`com.yourname.timecapsule`）
     - **Automatically manage signing**: 已勾选 ✅

3. **选择目标设备**
   - 在 Xcode 顶部工具栏
   - 选择 "Any iOS Device (arm64)"（用于 Archive）

### 第四步：创建 Archive

1. **菜单栏**: Product → Archive
2. **等待构建完成**（可能需要几分钟）
3. **构建完成后会自动打开 Organizer 窗口**

### 第五步：导出 IPA

#### 方法一：使用命令行（推荐）

在终端中运行：

```bash
cd ~/try

# 查找最新的 Archive
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive | head -1)
echo "Archive: $ARCHIVE_PATH"

# 创建导出配置（Development 方式，用于真机测试）
cat > /tmp/ExportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>development</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>manageAppVersionAndBuildNumber</key>
    <false/>
</dict>
</plist>
EOF

# 导出 IPA
EXPORT_PATH="$HOME/Desktop/TimeCapsule-Export"
rm -rf "$EXPORT_PATH"
mkdir -p "$EXPORT_PATH"

echo "开始导出 IPA..."
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist

# 查看结果
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ IPA 导出成功！"
    echo ""
    ls -lh "$EXPORT_PATH"/*.ipa
    echo ""
    echo "文件位置: $EXPORT_PATH"
else
    echo ""
    echo "❌ 导出失败"
fi
```

#### 方法二：使用 Xcode GUI

在 Organizer 窗口中：
1. 选择你的 Archive
2. 点击 "Distribute App"
3. 选择 "Development"
4. 点击 "Next"
5. 选择 "Automatically manage signing"
6. 点击 "Next"
7. 选择导出位置（桌面）
8. 点击 "Export"

### 第六步：上传 IPA 到云存储

```bash
# 在 Finder 中打开导出文件夹
open ~/Desktop/TimeCapsule-Export
```

1. 找到 `.ipa` 文件
2. 上传到 Google Drive / OneDrive

### 第七步：在 Windows 上下载并安装

1. **下载 IPA** 从云存储
2. **使用 3uTools 或爱思助手安装**
   - 连接 iPhone
   - 安装 IPA 文件

### 第八步：在 iPhone 上信任开发者

1. **设置 → 通用 → VPN与设备管理**
2. **找到开发者账号**
3. **点击"信任"**

### 第九步：运行应用测试

1. 在 iPhone 上打开应用
2. 测试所有功能
3. 检查是否有问题

## 🔧 快速脚本

创建一键导出脚本：

```bash
cd ~/try

# 创建脚本
cat > export-for-device.sh << 'SCRIPT'
#!/bin/bash
set -e

cd ~/try

echo "=== 导出 IPA 用于真机测试 ==="
echo ""

# 构建项目
echo "[1/4] 构建项目..."
npm run build

# 同步到 iOS
echo "[2/4] 同步到 iOS..."
npm run cap:sync

# 查找 Archive
echo "[3/4] 查找 Archive..."
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive 2>/dev/null | head -1)

if [ -z "$ARCHIVE_PATH" ]; then
    echo "❌ 未找到 Archive"
    echo "请先在 Xcode 中创建 Archive："
    echo "1. npm run cap:open:ios"
    echo "2. Product → Archive"
    exit 1
fi

echo "✅ 找到 Archive: $ARCHIVE_PATH"

# 导出 IPA
echo "[4/4] 导出 IPA..."
cat > /tmp/ExportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>development</string>
    <key>signingStyle</key>
    <string>automatic</string>
</dict>
</plist>
EOF

EXPORT_PATH="$HOME/Desktop/TimeCapsule-Export"
rm -rf "$EXPORT_PATH"
mkdir -p "$EXPORT_PATH"

xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ IPA 导出成功！"
    echo ""
    ls -lh "$EXPORT_PATH"/*.ipa
    echo ""
    echo "📋 下一步："
    echo "1. 上传 IPA 到云存储"
    echo "2. 在 Windows 上下载"
    echo "3. 使用 3uTools 安装到 iPhone"
    echo "4. 在 iPhone 上信任开发者"
else
    echo ""
    echo "❌ 导出失败"
fi
SCRIPT

chmod +x export-for-device.sh
```

## 📋 完整操作清单

- [ ] 在云 Mac 上构建项目
- [ ] 同步到 iOS
- [ ] 在 Xcode 中检查签名配置
- [ ] 创建 Archive
- [ ] 导出 IPA
- [ ] 上传到云存储
- [ ] 在 Windows 上下载
- [ ] 安装到 iPhone
- [ ] 在 iPhone 上信任开发者
- [ ] 测试应用

## ⚠️ 重要提示

1. **签名配置**
   - 确保 Team 已选择
   - Bundle Identifier 必须唯一

2. **Archive 创建**
   - 必须选择 "Any iOS Device"
   - 不能选择模拟器

3. **真机测试**
   - 首次安装需要在 iPhone 上信任开发者
   - Personal Team 签名的应用有效期为 7 天

## 🚀 快速命令

```bash
# 一键操作（需要先创建 Archive）
cd ~/try
npm run build
npm run cap:sync
./export-for-device.sh
```

---

**提示**：如果遇到问题，检查 Xcode 中的签名配置和 Archive 是否正确创建。

