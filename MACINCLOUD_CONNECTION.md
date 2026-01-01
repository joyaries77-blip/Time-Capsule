# MacinCloud 连接指南

## 🔐 你的服务器信息

- **服务器地址**: LA095.macincloud.com
- **IP 地址**: 74.80.242.95
- **用户名**: user285049
- **密码**: kss66081hjv
- **端口**: 6000

## 🚀 连接步骤（Windows）

### 方法一：使用连接文件（最简单）

1. **下载连接文件**
   - 访问：https://www.macincloud.com/images/MacinCloud_LA095.zip
   - 下载并解压 ZIP 文件

2. **连接服务器**
   - 双击解压后的 `.rdp` 文件
   - 输入用户名：`user285049`
   - 输入密码：`kss66081hjv`
   - 点击连接

### 方法二：使用 Microsoft Remote Desktop

1. **安装 Remote Desktop**
   - 从 Microsoft Store 安装 "Remote Desktop"
   - 或访问：https://apps.microsoft.com/detail/9WZDNCRDTK3P

2. **添加连接**
   - 打开 Remote Desktop
   - 点击 "Add PC"
   - 输入：
     - **PC name**: `LA095.macincloud.com:6000`
     - 或 IP: `74.80.242.95:6000`
   - 点击 "Add"

3. **连接**
   - 双击添加的服务器
   - 输入用户名：`user285049`
   - 输入密码：`kss66081hjv`
   - 勾选 "Remember me"（可选）
   - 点击 "Connect"

### 方法三：使用浏览器（无需安装软件）

1. **访问用户门户**
   - 打开：https://portal.macincloud.com
   - 使用你的注册邮箱登录

2. **连接服务器**
   - 找到你的服务器（LA095）
   - 点击 "Action" 菜单
   - 选择 "Connect"
   - 在浏览器中打开远程桌面

## ⚠️ 重要提示

### 1. 防火墙设置
如果无法连接，检查防火墙：
- 确保端口 **6000** 已开放
- 可能需要允许 Remote Desktop 通过防火墙

### 2. 正确登出
**非常重要**：使用完毕后必须正确登出！
- 点击左上角 **Apple 图标** → **Log Out**
- 不要直接关闭窗口
- 未登出会继续计费

### 3. 登录时间计算
- 从登录到登出的时间会被计算
- 即使不操作，只要登录就会计费
- 建议使用完毕后立即登出

## 📋 连接后第一步

连接成功后，在远程 Mac 上：

1. **打开终端（Terminal）**
   - 按 `Cmd + Space` 搜索 "Terminal"
   - 或 Applications → Utilities → Terminal

2. **验证环境**
   ```bash
   # 检查系统信息
   sw_vers
   
   # 检查是否已安装 Xcode
   xcode-select -p
   ```

3. **准备传输项目**
   - 可以选择使用 Git、云存储或直接下载

## 🔗 用户门户

访问用户门户管理账户：
- **网址**: https://portal.macincloud.com
- **功能**:
  - 查看账单信息
  - 管理订阅
  - 浏览器连接服务器
  - 更新账户信息

## 📞 需要帮助？

- **知识库**: https://www.macincloud.com/knowledge-base/
- **支持门户**: 提交支持请求
- **响应时间**: 24 小时内

---

**下一步**: 连接成功后，按照 [CLOUD_MAC_GUIDE.md](./CLOUD_MAC_GUIDE.md) 继续设置环境。

