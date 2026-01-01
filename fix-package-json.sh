#!/bin/bash

# 修复 package.json 的 Git 合并冲突
# 在云 Mac 终端中运行

set -e

echo "=== 修复 package.json 合并冲突 ==="
echo ""

cd ~/try

# 检查是否有冲突
if grep -q "<<<<<<< " package.json; then
    echo "[INFO] 发现合并冲突，正在修复..."
    
    # 备份原文件
    cp package.json package.json.backup
    
    # 读取文件并移除冲突标记
    # 保留第一个版本（当前版本）
    awk '
    /^<<<<<<< / { in_conflict=1; next }
    /^=======/ { in_conflict=2; next }
    /^>>>>>>> / { in_conflict=0; next }
    in_conflict == 1 { print }
    in_conflict == 0 { print }
    in_conflict == 2 { next }
    ' package.json > package.json.tmp
    
    # 验证 JSON 格式
    if node -e "JSON.parse(require('fs').readFileSync('package.json.tmp', 'utf8'))" 2>/dev/null; then
        mv package.json.tmp package.json
        echo "✅ 冲突已修复"
    else
        echo "❌ JSON 验证失败，恢复备份"
        mv package.json.backup package.json
        exit 1
    fi
else
    echo "✅ 未发现合并冲突"
fi

# 验证 package.json
echo "[INFO] 验证 package.json..."
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "✅ package.json 格式正确"
else
    echo "❌ package.json 格式错误"
    exit 1
fi

echo ""
echo "✅ 修复完成！"
echo ""
echo "下一步："
echo "1. git add package.json"
echo "2. git commit -m 'Fix merge conflict in package.json'"
echo "3. npm run cap:open:ios"

