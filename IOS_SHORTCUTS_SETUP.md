# iOS 快捷操作配置指南

本指南说明如何在 iOS 原生应用中配置长按图标快捷操作。

## 📱 功能说明

长按应用图标时，会显示两个快捷操作：
- **设置为锁屏桌面**：生成并下载锁屏图片
- **取消锁屏桌面**：取消锁屏桌面设置

## 🔧 配置步骤

### 方法一：在 Xcode 中配置（推荐）

#### 步骤 1：打开 iOS 项目

```bash
npm run cap:open:ios
```

#### 步骤 2：在 Info.plist 中添加配置

1. 在 Xcode 左侧项目导航器中，找到 `App` → `Info.plist`
2. 右键点击 `Info.plist` → "Open As" → "Source Code"
3. 在 `</dict>` 标签前添加以下内容：

```xml
<key>UIApplicationShortcutItems</key>
<array>
    <dict>
        <key>UIApplicationShortcutItemType</key>
        <string>com.timecapsule.app.setLockscreen</string>
        <key>UIApplicationShortcutItemTitle</key>
        <string>设置为锁屏桌面</string>
        <key>UIApplicationShortcutItemSubtitle</key>
        <string>将时间胶囊设置为锁屏</string>
        <key>UIApplicationShortcutItemIconType</key>
        <string>UIApplicationShortcutIconTypeAdd</string>
    </dict>
    <dict>
        <key>UIApplicationShortcutItemType</key>
        <string>com.timecapsule.app.removeLockscreen</string>
        <key>UIApplicationShortcutItemTitle</key>
        <string>取消锁屏桌面</string>
        <key>UIApplicationShortcutItemSubtitle</key>
        <string>取消锁屏桌面设置</string>
        <key>UIApplicationShortcutItemIconType</key>
        <string>UIApplicationShortcutIconTypeRemove</string>
    </dict>
</array>
```

#### 步骤 3：在 AppDelegate 中处理快捷操作

1. 找到 `App/AppDelegate.swift` 文件
2. 添加以下代码：

```swift
// 在 application(_:didFinishLaunchingWithOptions:) 方法中添加
func setupShortcutItems() {
    let setLockscreenItem = UIApplicationShortcutItem(
        type: "com.timecapsule.app.setLockscreen",
        localizedTitle: "设置为锁屏桌面",
        localizedSubtitle: "将时间胶囊设置为锁屏",
        icon: UIApplicationShortcutIcon(type: .add),
        userInfo: nil
    )
    
    let removeLockscreenItem = UIApplicationShortcutItem(
        type: "com.timecapsule.app.removeLockscreen",
        localizedTitle: "取消锁屏桌面",
        localizedSubtitle: "取消锁屏桌面设置",
        icon: UIApplicationShortcutIcon(type: .remove),
        userInfo: nil
    )
    
    UIApplication.shared.shortcutItems = [setLockscreenItem, removeLockscreenItem]
}

// 在 application(_:didFinishLaunchingWithOptions:) 中调用
setupShortcutItems()

// 添加处理快捷操作的方法
func application(_ application: UIApplication, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
    
    guard let window = window else {
        completionHandler(false)
        return
    }
    
    guard let bridge = window.rootViewController as? CAPBridgeViewController else {
        completionHandler(false)
        return
    }
    
    switch shortcutItem.type {
    case "com.timecapsule.app.setLockscreen":
        bridge.webView?.evaluateJavaScript("""
            window.dispatchEvent(new CustomEvent('shortcut-action', { 
                detail: { action: 'set-lockscreen' } 
            }));
        """, completionHandler: nil)
        completionHandler(true)
        
    case "com.timecapsule.app.removeLockscreen":
        bridge.webView?.evaluateJavaScript("""
            window.dispatchEvent(new CustomEvent('shortcut-action', { 
                detail: { action: 'remove-lockscreen' } 
            }));
        """, completionHandler: nil)
        completionHandler(true)
        
    default:
        completionHandler(false)
    }
}
```

### 方法二：使用代码动态配置（更灵活）

在 `AppDelegate.swift` 中完全使用代码配置，参考 `ios/AppDelegate.swift.shortcuts` 文件。

## 📝 在 Web 层接收快捷操作

应用已经配置好接收快捷操作事件。在 `LockscreenManager.tsx` 中会自动处理。

如果需要手动监听，可以添加：

```typescript
useEffect(() => {
  const handleShortcut = (event: CustomEvent) => {
    const action = event.detail?.action;
    if (action === 'set-lockscreen') {
      handleSetLockscreen();
    } else if (action === 'remove-lockscreen') {
      handleRemoveLockscreen();
    }
  };

  window.addEventListener('shortcut-action', handleShortcut as EventListener);
  
  return () => {
    window.removeEventListener('shortcut-action', handleShortcut as EventListener);
  };
}, []);
```

## 🎨 自定义图标

可以使用自定义图标：

```swift
// 使用系统图标
icon: UIApplicationShortcutIcon(type: .add)

// 使用自定义图标（需要先添加到 Assets.xcassets）
icon: UIApplicationShortcutIcon(templateImageName: "lockscreen-icon")
```

## ✅ 测试

1. 构建并运行应用
2. 长按应用图标
3. 应该看到两个快捷操作选项
4. 点击快捷操作，应用会打开并执行相应功能

## 🔍 故障排除

### 快捷操作不显示

1. 确保在 `Info.plist` 或代码中正确配置
2. 确保应用已安装到设备（不是模拟器）
3. 重新构建并安装应用

### 点击快捷操作无反应

1. 检查 `AppDelegate.swift` 中的处理代码
2. 检查 Web 层是否正确监听事件
3. 查看 Xcode 控制台日志

## 📚 参考文档

- [Apple 官方文档 - UIApplicationShortcutItem](https://developer.apple.com/documentation/uikit/uiapplicationshortcutitem)
- [Capacitor 文档](https://capacitorjs.com/docs)

---

配置完成后，用户长按应用图标即可看到快捷操作菜单！

