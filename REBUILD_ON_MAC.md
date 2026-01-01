# 在云 Mac 上重新构建和导出 IPA

## 🎯 目标

重新在云 Mac 上操作，确保签名正确，解决安装失败问题。

## 📋 完整操作步骤

### 第一步：连接到云 Mac

1. **打开 RDP 连接**
   - 双击 `connect-macincloud.rdp`
   - 或运行：`mstsc /v:LA095.macincloud.com:6000`

2. **登录**
   - 用户名：`user285049`
   - 密码：`kss66081hjv`

### 第二步：打开终端

1. 按 `Cmd + Space`
2. 搜索 "Terminal"
3. 打开终端

### 第三步：进入项目目录

```bash
cd ~/try

# 拉取最新代码
git pull
```

### 第四步：检查 Xcode 项目配置

```bash
# 打开 Xcode
npm run cap:open:ios
```

**在 Xcode 中检查：**

1. **选择项目**（左侧蓝色图标 "App"）

2. **检查签名配置**
   - 选择 "Signing & Capabilities" 标签页
   - 确认 "Team" 已选择（你的 Apple ID）
   - 确认 "Bundle Identifier" 是唯一的（如：`com.yourname.timecapsule`）
   - 确认 "Automatically manage signing" 已勾选

3. **如果签名有问题**
   - 取消勾选 "Automatically manage signing"
   - 重新勾选
   - 等待 Xcode 自动配置

### 第五步：重新创建 Archive

1. **选择目标设备**
   - 在 Xcode 顶部工具栏
   - 选择 "Any iOS Device (arm64)"

2. **创建 Archive**
   - 菜单栏：Product → Archive
   - 等待构建完成（可能需要几分钟）

3. **构建完成后会打开 Organizer 窗口**

### 第六步：在 Organizer 中导出

**方法一：使用 GUI（如果可用）**

1. 在 Organizer 中选择你的 Archive
2. 点击 "Distribute App"
3. 选择 "Development"（开发版本）
4. 点击 "Next"
5. 选择 "Automatically manage signing"
6. 点击 "Next"
7. 选择导出位置（桌面）
8. 点击 "Export"

**方法二：使用命令行（推荐）**

如果 GUI 方式失败，使用命令行：

```bash
cd ~/try

# 查找最新的 Archive
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive | head -1)
echo "Archive: $ARCHIVE_PATH"

# 创建 Development 导出配置
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

echo "开始导出..."
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 导出成功！"
    echo "文件位置: $EXPORT_PATH"
    ls -lh "$EXPORT_PATH"/*.ipa
else
    echo ""
    echo "❌ 导出失败"
    echo "请检查错误信息"
fi
```

### 第七步：检查导出的 IPA

```bash
# 查看导出的文件
ls -lh ~/Desktop/TimeCapsule-Export/*.ipa

# 在 Finder 中打开
open ~/Desktop/TimeCapsule-Export
```

### 第八步：上传到云存储

1. **在 Finder 中**
   - 打开 Desktop → TimeCapsule-Export
   - 找到 .ipa 文件

2. **上传到云存储**
   - 右键点击 .ipa 文件
   - 选择 "分享" → 上传到 Google Drive / OneDrive
   - 或拖拽到浏览器中的云存储页面

### 第九步：在 Windows 上下载并安装

1. **下载 IPA**
   - 从云存储下载 .ipa 文件

2. **使用 3uTools 或爱思助手安装**
   - 连接 iPhone
   - 安装 IPA 文件

3. **在 iPhone 上信任开发者**
   - 设置 → 通用 → VPN与设备管理
   - 找到开发者账号并信任

## 🔧 故障排除

### 如果导出失败

**检查签名配置：**

```bash
# 在 Xcode 中检查
# 1. 选择项目
# 2. Signing & Capabilities
# 3. 确认 Team 已选择
# 4. 确认 Bundle Identifier 唯一
```

**清理并重新构建：**

```bash
cd ~/try

# 清理构建
npm run build

# 同步到 iOS
npm run cap:sync

# 重新打开 Xcode
npm run cap:open:ios
```

### 如果仍然失败

**检查 Archive 是否存在：**

```bash
# 列出所有 Archive
ls -la ~/Library/Developer/Xcode/Archives/

# 查看最新的 Archive
ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive | head -1
```

**查看详细错误：**

```bash
# 导出时查看详细日志
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist \
  -verbose 2>&1 | tee /tmp/export-verbose.log
```

## 📋 快速命令参考

```bash
# 进入项目
cd ~/try

# 拉取最新代码
git pull

# 打开 Xcode
npm run cap:open:ios

# 导出 IPA（在 Xcode 中创建 Archive 后）
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive | head -1)
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
xcodebuild -exportArchive -archivePath "$ARCHIVE_PATH" -exportPath ~/Desktop/TimeCapsule-Export -exportOptionsPlist /tmp/ExportOptions.plist
```

## ✅ 检查清单

- [ ] 已连接到云 Mac
- [ ] 已打开终端
- [ ] 已进入项目目录
- [ ] 已在 Xcode 中检查签名配置
- [ ] 已创建新的 Archive
- [ ] 已导出 IPA 文件
- [ ] 已上传到云存储
- [ ] 已在 Windows 上下载
- [ ] 已尝试安装到 iPhone

---

**提示**：如果仍然失败，请提供具体的错误信息，我会帮你进一步排查。

