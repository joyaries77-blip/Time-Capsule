#!/bin/bash

# 完整的重新构建和导出 IPA 脚本
# 在云 Mac 终端中运行

set -e

echo "=== 重新构建和导出 IPA ==="
echo ""

cd ~/try

# 拉取最新代码
echo "[INFO] 拉取最新代码..."
git pull

# 检查并构建项目
echo "[INFO] 检查项目..."
if [ ! -d "dist" ]; then
    echo "[INFO] 构建项目..."
    npm run build
else
    echo "✅ 项目已构建"
fi

# 同步到 iOS
echo "[INFO] 同步到 iOS..."
npm run cap:sync

echo ""
echo "✅ 项目准备完成"
echo ""
echo "📋 下一步操作："
echo "1. 打开 Xcode: npm run cap:open:ios"
echo "2. 在 Xcode 中："
echo "   - 检查签名配置（Signing & Capabilities）"
echo "   - 选择 'Any iOS Device'"
echo "   - Product → Archive"
echo "3. Archive 完成后，运行导出脚本："
echo "   ./export-ipa.sh"
echo ""
echo "或直接运行导出（如果已有 Archive）："

# 检查是否有 Archive
ARCHIVE_PATH=$(ls -dt ~/Library/Developer/Xcode/Archives/*/App*.xcarchive 2>/dev/null | head -1)

if [ -n "$ARCHIVE_PATH" ]; then
    echo ""
    echo "✅ 找到现有 Archive: $ARCHIVE_PATH"
    echo ""
    read -p "是否立即导出 IPA？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "[INFO] 开始导出..."
        
        # 创建导出配置
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

        xcodebuild -exportArchive \
          -archivePath "$ARCHIVE_PATH" \
          -exportPath "$EXPORT_PATH" \
          -exportOptionsPlist /tmp/ExportOptions.plist

        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ IPA 导出成功！"
            echo ""
            echo "文件位置: $EXPORT_PATH"
            ls -lh "$EXPORT_PATH"/*.ipa
            echo ""
            echo "📋 下一步："
            echo "1. 在 Finder 中打开: open $EXPORT_PATH"
            echo "2. 上传 .ipa 文件到云存储"
            echo "3. 在 Windows 上下载并安装"
        else
            echo ""
            echo "❌ 导出失败"
            echo "请检查错误信息"
        fi
    fi
else
    echo ""
    echo "ℹ️  未找到 Archive"
    echo "请先在 Xcode 中创建 Archive"
fi

