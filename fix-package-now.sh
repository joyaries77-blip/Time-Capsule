#!/bin/bash

# 立即修复 package.json 冲突
# 使用远程版本覆盖本地冲突

set -e

echo "=== 修复 package.json 冲突 ==="
echo ""

cd ~/try

# 备份原文件
if [ -f "package.json" ]; then
    cp package.json package.json.backup
    echo "✅ 已备份 package.json"
fi

# 使用远程版本
echo "[INFO] 使用远程版本修复冲突..."
git checkout --theirs package.json 2>/dev/null || {
    # 如果 git checkout 失败，手动修复
    echo "[INFO] Git checkout 失败，尝试手动修复..."
    
    # 读取文件并移除冲突标记
    awk '
    /^<<<<<<< / { in_conflict=1; next }
    /^=======/ { in_conflict=2; next }
    /^>>>>>>> / { in_conflict=0; next }
    in_conflict == 1 { print }
    in_conflict == 0 { print }
    in_conflict == 2 { next }
    ' package.json > package.json.tmp
    
    mv package.json.tmp package.json
}

# 验证 JSON 格式
echo "[INFO] 验证 package.json..."
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "✅ package.json 格式正确"
    rm -f package.json.backup
else
    echo "❌ JSON 验证失败，恢复备份"
    mv package.json.backup package.json
    exit 1
fi

echo ""
echo "✅ 修复完成！"
echo ""
echo "现在可以运行："
echo "  npm run build"
echo "  npm run cap:sync"
echo "  npm run cap:open:ios"

