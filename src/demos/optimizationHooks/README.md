# useCallback、memo、useMemo 对比 Demo

这个 demo 展示了 React 中三个性能优化 Hook 的区别和使用场景。

## 核心概念

### useCallback
- **作用**: 缓存函数引用，避免每次渲染都创建新函数
- **使用场景**: 当函数作为 props 传递给子组件时，配合 memo 使用
- **语法**: `useCallback(fn, [deps])`

### memo
- **作用**: 缓存组件，对 props 进行浅比较，只有当 props 改变时才重新渲染
- **使用场景**: 优化子组件，避免不必要的重新渲染
- **语法**: `memo(Component)`

### useMemo
- **作用**: 缓存计算结果，只有当依赖项改变时才重新计算
- **使用场景**: 优化昂贵的计算操作
- **语法**: `useMemo(() => value, [deps])`

## 关键区别

1. **useCallback** 缓存的是**函数引用**
2. **memo** 缓存的是**组件渲染结果**
3. **useMemo** 缓存的是**计算结果**

## 最佳实践

- **useCallback + memo**: 配合使用可以最大化性能优化效果
- **useMemo**: 用于优化昂贵的计算，不要过度使用
- 只有当性能确实成为问题时才使用这些优化手段

