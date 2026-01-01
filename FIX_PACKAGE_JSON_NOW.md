# 立即修复 package.json - 详细步骤

## 🔴 问题

package.json 仍然有冲突标记，导致 npm 无法解析。

## ✅ 解决方案

### 方法一：使用 Python 脚本（最简单）

在云 Mac 终端中执行：

```bash
cd ~/try

# 使用 Python 移除所有冲突标记
python3 << 'PYTHON'
import re
import json

# 读取文件
with open('package.json', 'r', encoding='utf-8') as f:
    content = f.read()

# 移除所有冲突标记
content = re.sub(r'<<<<<<< .*\n', '', content)
content = re.sub(r'=======\n', '', content)
content = re.sub(r'>>>>>>> .*\n', '', content)

# 验证 JSON
try:
    json.loads(content)
    # 写入文件
    with open('package.json', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ package.json 修复成功！")
except json.JSONDecodeError as e:
    print(f"❌ JSON 验证失败: {e}")
    print("请手动编辑文件")
PYTHON

# 验证修复
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" && echo "✅ 验证成功" || echo "❌ 仍有问题"
```

### 方法二：手动使用 nano 编辑

```bash
cd ~/try

# 打开编辑器
nano package.json
```

在 nano 中：

1. **搜索冲突标记**：
   - 按 `Ctrl + W`
   - 输入 `<<<<<<<`
   - 按 `Enter`

2. **删除冲突标记**：
   - 找到 `<<<<<<< Updated upstream` 这一行，删除整行
   - 找到 `=======` 这一行，删除整行
   - 找到 `>>>>>>>` 开头的行，删除整行
   - 保留正确的代码（通常是第一个版本）

3. **保存并退出**：
   - 按 `Ctrl + O` 保存
   - 按 `Enter` 确认文件名
   - 按 `Ctrl + X` 退出

4. **验证**：
```bash
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" && echo "✅ 修复成功" || echo "❌ 仍有问题"
```

### 方法三：使用 sed 命令

```bash
cd ~/try

# 备份
cp package.json package.json.backup

# 移除冲突标记
sed -i '' '/^<<<<<<< /d' package.json
sed -i '' '/^=======$/d' package.json
sed -i '' '/^>>>>>>> /d' package.json

# 验证
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" && echo "✅ 修复成功" || echo "❌ 仍有问题"
```

### 方法四：从远程重新获取

```bash
cd ~/try

# 备份
cp package.json package.json.backup

# 从远程获取干净版本
git fetch origin
git checkout origin/main -- package.json

# 验证
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" && echo "✅ 修复成功" || echo "❌ 仍有问题"
```

## 🎯 推荐操作

**立即执行（复制粘贴）：**

```bash
cd ~/try && python3 << 'PYTHON'
import re
import json
with open('package.json', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'<<<<<<< .*\n', '', content)
content = re.sub(r'=======\n', '', content)
content = re.sub(r'>>>>>>> .*\n', '', content)
try:
    json.loads(content)
    with open('package.json', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ package.json 修复成功！")
except json.JSONDecodeError as e:
    print(f"❌ JSON 验证失败: {e}")
PYTHON
```

然后验证：

```bash
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" && echo "✅ 验证成功，可以继续了" || echo "❌ 仍有问题，请使用 nano 手动编辑"
```

## 📋 修复后继续

修复成功后：

```bash
npm run build
npm run cap:sync
npm run cap:open:ios
```

