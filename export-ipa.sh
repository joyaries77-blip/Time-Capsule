#!/bin/bash

# 导出 IPA 文件的脚本
# 在云 Mac 终端中运行

set -e

echo "=== 导出 IPA 文件 ==="
echo ""

cd ~/try

# 查找最新的 Archive
echo "[INFO] 查找最新的 Archive..."
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive 2>/dev/null | head -1)

if [ -z "$ARCHIVE_PATH" ]; then
    echo "❌ 错误：未找到 Archive"
    echo "请先在 Xcode 中创建 Archive："
    echo "1. 选择 'Any iOS Device'"
    echo "2. Product → Archive"
    exit 1
fi

echo "✅ 找到 Archive: $ARCHIVE_PATH"
echo ""

# 创建导出选项文件
echo "[INFO] 创建导出配置..."
cat > /tmp/ExportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>development</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>teamID</key>
    <string></string>
</dict>
</plist>
EOF

# 导出 IPA
echo "[INFO] 开始导出 IPA..."
EXPORT_PATH="$HOME/Desktop/TimeCapsule-Export"

# 清理旧的导出目录
rm -rf "$EXPORT_PATH"

xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ IPA 文件导出成功！"
    echo ""
    echo "文件位置："
    ls -lh "$EXPORT_PATH"/*.ipa
    echo ""
    echo "📋 下一步："
    echo "1. 在 Finder 中打开: $EXPORT_PATH"
    echo "2. 找到 .ipa 文件"
    echo "3. 上传到云存储（Google Drive / OneDrive）"
    echo "4. 在 Windows 上下载"
    echo "5. 使用 3uTools 安装到 iPhone"
else
    echo ""
    echo "❌ 导出失败"
    echo "请检查错误信息"
fi

