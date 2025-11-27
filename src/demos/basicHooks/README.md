# useState、useEffect、useRef 基础 Demo

这个 demo 展示了 React 中最基础的三个 Hooks 的用法。

## 核心概念

### useState
- **作用**: 用于管理组件状态
- **语法**: `const [state, setState] = useState(initialValue)`
- **特点**: 状态改变会触发组件重新渲染

### useEffect
- **作用**: 用于处理副作用（数据获取、订阅、手动 DOM 操作等）
- **语法**: `useEffect(() => { ... }, [deps])`
- **特点**: 
  - 可以返回清理函数
  - 依赖数组控制何时执行
  - 空数组 [] 表示只在挂载和卸载时执行

### useRef
- **作用**: 返回一个可变的 ref 对象
- **语法**: `const ref = useRef(initialValue)`
- **用途**:
  1. 获取 DOM 元素引用
  2. 保存可变值（改变不会触发重新渲染）

## 使用场景

- **useState**: 管理任何需要触发重新渲染的状态
- **useEffect**: 处理副作用，如 API 调用、订阅、定时器等
- **useRef**: 需要直接操作 DOM 或保存不触发渲染的值

## 注意事项

- useEffect 的依赖数组要正确设置，避免无限循环
- useRef 的值改变不会触发重新渲染
- useState 的更新函数可以是函数形式：`setState(prev => prev + 1)`

