# 手动执行步骤（如果脚本不存在）

如果 `complete-build-and-test.sh` 脚本不存在，可以手动执行以下步骤：

## 在云Mac终端中执行

```bash
# 1. 进入项目目录（如果还没有）
cd ~/Time-Capsule

# 2. 拉取最新代码（获取脚本文件）
git pull origin main

# 3. 如果脚本存在，运行它
chmod +x complete-build-and-test.sh
./complete-build-and-test.sh

# 或者手动执行以下步骤：
```

## 手动执行步骤

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 同步到iOS
npx cap sync ios

# 4. 安装CocoaPods（如果需要）
cd ios/App
pod install
cd ../..

# 5. 打开Xcode
npx cap open ios
```

## 快速命令（一键执行）

```bash
cd ~/Time-Capsule && git pull origin main && npm install && npm run build && npx cap sync ios && cd ios/App && pod install && cd ../.. && npx cap open ios
```

