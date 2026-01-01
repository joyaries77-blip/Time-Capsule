#!/bin/bash

# 导出 IPA 用于真机测试
# 在云 Mac 终端中运行

set -e

echo "=== 导出 IPA 用于真机测试 ==="
echo ""

cd ~/try

# 检查是否需要构建
if [ ! -d "dist" ] || [ "dist" -ot "src" ]; then
    echo "[1/5] 构建项目..."
    npm run build
else
    echo "[1/5] ✅ 项目已构建"
fi

# 同步到 iOS
echo "[2/5] 同步到 iOS..."
npm run cap:sync

# 查找 Archive
echo "[3/5] 查找 Archive..."
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive 2>/dev/null | head -1)

if [ -z "$ARCHIVE_PATH" ]; then
    echo ""
    echo "❌ 未找到 Archive"
    echo ""
    echo "请先在 Xcode 中创建 Archive："
    echo "1. 运行: npm run cap:open:ios"
    echo "2. 在 Xcode 中："
    echo "   - 选择 'Any iOS Device (arm64)'"
    echo "   - Product → Archive"
    echo "3. 等待构建完成"
    echo "4. 然后重新运行此脚本"
    exit 1
fi

echo "✅ 找到 Archive: $ARCHIVE_PATH"
echo ""

# 创建导出配置（Development 方式）
echo "[4/5] 创建导出配置..."
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
echo "[5/5] 导出 IPA..."
EXPORT_PATH="$HOME/Desktop/TimeCapsule-Export"
rm -rf "$EXPORT_PATH"
mkdir -p "$EXPORT_PATH"

xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist /tmp/ExportOptions.plist 2>&1 | tee /tmp/export.log

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ IPA 导出成功！"
    echo ""
    echo "文件信息："
    ls -lh "$EXPORT_PATH"/*.ipa
    echo ""
    echo "文件位置: $EXPORT_PATH"
    echo ""
    echo "📋 下一步操作："
    echo "1. 在 Finder 中打开: open $EXPORT_PATH"
    echo "2. 上传 .ipa 文件到云存储（Google Drive / OneDrive）"
    echo "3. 在 Windows 上下载 .ipa 文件"
    echo "4. 使用 3uTools 或爱思助手安装到 iPhone"
    echo "5. 在 iPhone 上：设置 → 通用 → VPN与设备管理 → 信任开发者"
    echo "6. 打开应用进行测试"
else
    echo ""
    echo "❌ 导出失败"
    echo ""
    echo "查看详细错误："
    tail -20 /tmp/export.log
    echo ""
    echo "常见问题："
    echo "1. 检查 Xcode 中的签名配置"
    echo "2. 确认 Team 已选择"
    echo "3. 确认 Bundle Identifier 唯一"
    exit 1
fi

