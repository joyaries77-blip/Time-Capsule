#!/bin/bash

# 使用 Ad Hoc 方式导出 IPA
# 注意：Personal Team 可能无法使用 Ad Hoc，需要付费账号

set -e

echo "=== 使用 Ad Hoc 方式导出 IPA ==="
echo "⚠️  注意：Personal Team 可能无法使用 Ad Hoc 方式"
echo ""

cd ~/try

# 查找最新的 Archive
echo "[INFO] 查找最新的 Archive..."
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive 2>/dev/null | head -1)

if [ -z "$ARCHIVE_PATH" ]; then
    echo "❌ 错误：未找到 Archive"
    echo "请先在 Xcode 中创建 Archive"
    exit 1
fi

echo "✅ 找到 Archive: $ARCHIVE_PATH"
echo ""

# 创建 Ad Hoc 导出配置
echo "[INFO] 创建 Ad Hoc 导出配置..."
cat > /tmp/ExportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>ad-hoc</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>manageAppVersionAndBuildNumber</key>
    <false/>
</dict>
</plist>
EOF

# 导出 IPA
echo "[INFO] 开始导出 IPA（Ad Hoc 方式）..."
EXPORT_PATH="$HOME/Desktop/TimeCapsule-Export"

# 清理旧的导出目录
rm -rf "$EXPORT_PATH"
mkdir -p "$EXPORT_PATH"

xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist 2>&1 | tee /tmp/export.log

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ IPA 文件导出成功（Ad Hoc）！"
    echo ""
    echo "文件位置："
    ls -lh "$EXPORT_PATH"/*.ipa
    echo ""
    echo "📋 安装步骤："
    echo "1. 上传 IPA 到云存储"
    echo "2. 在 Windows 上下载"
    echo "3. 使用 3uTools 或爱思助手安装"
    echo ""
    echo "⚠️  注意：Ad Hoc 方式安装后不需要信任开发者"
else
    echo ""
    echo "❌ 导出失败"
    echo ""
    echo "可能的原因："
    echo "1. Personal Team 无法使用 Ad Hoc 方式"
    echo "2. 需要付费 Apple Developer 账号"
    echo ""
    echo "解决方案："
    echo "1. 使用 Development 方式（需要注册设备 UDID）"
    echo "2. 或使用爱思助手安装（会自动处理签名）"
    echo ""
    echo "查看详细错误："
    cat /tmp/export.log | tail -20
    exit 1
fi

