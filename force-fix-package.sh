#!/bin/bash

# 强制修复 package.json - 移除所有冲突标记
# 在云 Mac 终端中运行

set -e

echo "=== 强制修复 package.json ==="
echo ""

cd ~/try

# 备份
cp package.json package.json.backup
echo "✅ 已备份 package.json"

# 使用 sed 移除所有冲突标记
echo "[INFO] 移除冲突标记..."
sed -i '' '/^<<<<<<< /,/^>>>>>>> /d' package.json 2>/dev/null || \
sed -i '/^<<<<<<< /,/^>>>>>>> /d' package.json 2>/dev/null || \
sed '/^<<<<<<< /,/^>>>>>>> /d' package.json > package.json.tmp && mv package.json.tmp package.json

# 也移除单独的标记行
sed -i '' '/^=======$/d' package.json 2>/dev/null || \
sed -i '/^=======$/d' package.json 2>/dev/null || \
sed '/^=======$/d' package.json > package.json.tmp && mv package.json.tmp package.json

# 验证 JSON
echo "[INFO] 验证 JSON 格式..."
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "✅ package.json 修复成功！"
    rm -f package.json.backup
    echo ""
    echo "现在可以运行："
    echo "  npm run build"
    echo "  npm run cap:sync"
    echo "  npm run cap:open:ios"
else
    echo "❌ 修复失败，恢复备份"
    mv package.json.backup package.json
    echo ""
    echo "请手动编辑 package.json："
    echo "  nano package.json"
    echo "  搜索并删除所有包含 <<<<<<< 的行"
    exit 1
fi

