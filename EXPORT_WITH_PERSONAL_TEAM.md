# 使用 Personal Team 导出 IPA

## 🔴 问题

Personal Team 无法使用 Ad Hoc、App Store 等分发方式，只能使用 Development 方式。

## ✅ 解决方案

### 方法一：使用命令行导出（推荐）

在云 Mac 终端中运行：

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

echo "开始导出 IPA（Development 方式）..."
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
    echo "文件位置: $EXPORT_PATH"
else
    echo ""
    echo "❌ 导出失败"
fi
```

### 方法二：在 Xcode Organizer 中使用 Development

1. **在 Organizer 窗口中**
   - 选择你的 Archive
   - 点击 "Distribute App"

2. **选择分发方式**
   - 选择 "Development"（开发版本）
   - 点击 "Next"

3. **选择签名方式**
   - 选择 "Automatically manage signing"
   - 点击 "Next"

4. **选择导出位置**
   - 选择桌面或指定位置
   - 点击 "Export"

### 方法三：使用已创建的脚本

```bash
cd ~/try

# 拉取最新脚本
git pull

# 运行导出脚本
chmod +x export-for-device.sh
./export-for-device.sh
```

## ⚠️ 重要提示

1. **Personal Team 限制**
   - 只能使用 Development 方式
   - 无法使用 Ad Hoc、App Store 等
   - 应用有效期为 7 天

2. **Development 方式**
   - 用于开发测试
   - 可以安装到已注册的设备
   - 不需要付费 Apple Developer 账号

## 📋 快速操作

在云 Mac 终端中运行：

```bash
cd ~/try

# 查找 Archive
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive | head -1)

# 导出 IPA（Development 方式）
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

xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath ~/Desktop/TimeCapsule-Export \
  -exportOptionsPlist /tmp/ExportOptions.plist
```

## 🎯 下一步

导出成功后：
1. 在 Finder 中打开 `~/Desktop/TimeCapsule-Export`
2. 找到 `.ipa` 文件
3. 上传到云存储
4. 在 Windows 上下载并安装到 iPhone

---

**提示**：使用命令行导出可以绕过 Xcode GUI 的限制。

