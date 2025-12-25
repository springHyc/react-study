# useDeferredValue Demo

这个 demo 展示了 React 中 `useDeferredValue` 的用法，并与 `useTransition` 进行了对比。

## 文件说明

- `UseDeferredValueDemo.tsx`: 主演示组件，展示 useDeferredValue 和 useTransition 的对比
- `UseDeferredValueExample.tsx`: 使用 useDeferredValue 的示例组件
- `UseTransitionComparisonExample.tsx`: 使用 useTransition 的对比示例组件
- `ComparisonInfo.tsx`: 详细的对比说明组件
- `index.ts`: 导出文件
- `styles.ts`: 样式定义文件

## 核心概念

### useDeferredValue

`useDeferredValue` 是一个 React Hook，用于延迟一个值的更新。它接受一个值作为参数，返回该值的延迟版本。

- **自动延迟**：当原始值快速变化时，延迟值会"滞后"更新
- **保持响应性**：让 React 优先处理紧急更新（如用户输入）
- **无需手动调用**：不需要像 useTransition 那样手动调用函数

### 应用场景

**核心场景**：React 渲染一个大型列表时，一旦用户进行了键盘输入，React 会放弃该列表渲染，先处理键盘输入，然后再次开始在后台界面渲染。

## useDeferredValue vs useTransition

### 相同点

- 都能保持 UI 响应性
- 都适用于大量数据渲染时保持输入框响应
- 都能让紧急更新（用户输入）优先于非紧急更新（列表渲染）

### 不同点

| 特性 | useDeferredValue | useTransition |
|------|-----------------|---------------|
| **使用方式** | 自动延迟一个值的更新 | 需要手动调用 startTransition |
| **适用场景** | 单一值需要延迟更新 | 需要精确控制多个状态更新 |
| **状态管理** | 基于一个值自动生成延迟版本 | 需要管理多个状态 |
| **pending 状态** | 通过比较原始值和延迟值判断 | 直接提供 isPending |
| **灵活性** | 相对简单，适合单一值场景 | 更灵活，可精确控制 |

### 代码对比

**useDeferredValue:**
```tsx
const [input, setInput] = useState('');
const deferredInput = useDeferredValue(input);
const list = generateList(deferredInput);
```

**useTransition:**
```tsx
const [input, setInput] = useState('');
const [list, setList] = useState([]);
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setList(generateList(input));
});
```

## 选择建议

- **使用 useDeferredValue**：当你有一个值需要延迟更新，且这个值会触发昂贵的计算或渲染时
- **使用 useTransition**：当你需要精确控制哪些状态更新是紧急的，哪些是非紧急的，或者需要更新多个状态时

## 注意事项

1. **值的变化**：useDeferredValue 会延迟值的更新，所以原始值和延迟值可能不同步
2. **判断 pending**：可以通过比较 `input !== deferredInput` 来判断是否正在延迟更新
3. **适用场景**：最适合单一值需要延迟的场景，如果需要更复杂的控制，考虑使用 useTransition

