# useTransition Demo

这个 demo 展示了 React 中 `useTransition` 和 `startTransition` 的用法。

## 文件说明

- `UseTransitionDemo.tsx`: 演示 useTransition 和 startTransition 的使用示例
- `index.ts`: 导出文件
- `styles.ts`: 样式定义文件

## 核心概念

### useTransition

`useTransition` 是一个 React Hook，用于标记非紧急的状态更新。它返回一个数组 `[isPending, startTransition]`：

- **isPending**: 布尔值，表示是否有待处理的过渡更新
- **startTransition**: 函数，用于标记非紧急的状态更新

### startTransition

`startTransition` 是一个独立的函数（也可以从 `useTransition` 中获取），用于在非组件环境中标记非紧急更新。

## 作用

1. **保持 UI 响应性**：在大量状态更新时，保持用户交互的流畅性
2. **优先级控制**：将更新分为紧急（用户输入）和非紧急（列表渲染）
3. **避免阻塞**：非紧急更新可以被紧急更新打断，让用户输入始终优先

## 使用场景

- 大量列表渲染时保持输入框响应
- 搜索过滤时保持 UI 流畅
- 标签页切换时保持交互响应
- 任何需要区分紧急和非紧急更新的场景

## 官方正确用法

### 1. 使用 useTransition Hook（在组件内）

```tsx
import { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // 紧急更新：立即执行
    
    startTransition(() => {
      setList(generateList(value)); // 非紧急更新：可以被打断
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <span>更新中...</span>}
      <List items={list} />
    </>
  );
}
```

### 2. 使用独立的 startTransition（在组件外或事件处理器中）

```tsx
import { startTransition } from 'react';

// 在事件处理器外部使用
function handleClick() {
  startTransition(() => {
    // 非紧急更新
    setState(newValue);
  });
}

// 在异步操作中使用
fetchData().then(data => {
  startTransition(() => {
    setList(data);
  });
});
```

## 注意事项

1. **紧急更新**：用户输入、点击、悬停等交互应该立即响应，不要放在 `startTransition` 中
2. **非紧急更新**：列表渲染、搜索结果、标签页内容等可以延迟的更新，应该放在 `startTransition` 中
3. **isPending**：用于显示加载状态，提升用户体验
4. **不能用于控制**：`startTransition` 中的更新不能用于控制文本输入等需要同步的场景



