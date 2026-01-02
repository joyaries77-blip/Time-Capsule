# SSH 连接问题排查

## 问题：Connection closed by 74.80.242.95 port 22

这个错误通常由以下原因引起：

## 🔍 排查步骤

### 1. 检查密码是否正确
- 密码：`kss66081hjv`
- 确保没有多余的空格或字符
- 密码输入时不会显示，这是正常的

### 2. 检查网络连接
```powershell
# 测试网络连接
ping LA095.macincloud.com
ping 74.80.242.95
```

### 3. 尝试不同的连接方式

#### 方法 1: 使用详细模式查看错误
```powershell
ssh -v user285049@LA095.macincloud.com
```

#### 方法 2: 跳过主机密钥检查
```powershell
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL user285049@LA095.macincloud.com
```

#### 方法 3: 指定端口（如果需要）
```powershell
ssh -p 22 user285049@LA095.macincloud.com
```

### 4. 检查SSH配置
```powershell
# 查看SSH版本
ssh -V

# 尝试使用IPv4
ssh -4 user285049@LA095.macincloud.com
```

## 🔧 解决方案

### 方案 1: 重新尝试连接
有时是临时网络问题，稍等片刻后重试：

```powershell
ssh user285049@LA095.macincloud.com
```

### 方案 2: 使用IP地址连接
```powershell
ssh user285049@74.80.242.95
```

### 方案 3: 检查MacinCloud服务状态
- 确认云Mac服务是否正常运行
- 检查是否有IP白名单限制
- 确认账户是否有效

### 方案 4: 使用RDP连接（备选）
如果SSH无法连接，可以尝试使用RDP：
- 下载并安装Microsoft Remote Desktop
- 使用提供的RDP连接信息

## 📝 连接信息确认

- **主机名**: LA095.macincloud.com
- **IP地址**: 74.80.242.95
- **用户名**: user285049
- **密码**: kss66081hjv
- **端口**: 22 (默认)

## 💡 提示

1. **密码输入技巧**：
   - 先复制密码：`kss66081hjv`
   - 在密码提示时，右键粘贴（PowerShell支持）
   - 或使用 `Shift+Insert` 粘贴

2. **如果多次失败**：
   - 等待几分钟后再试（避免被临时封禁）
   - 检查MacinCloud控制面板中的连接状态

3. **备选方案**：
   - 使用MacinCloud的Web控制台
   - 使用VNC连接（如果可用）

