# React Compiler 示例

这个示例展示了 React Compiler 的自动优化功能，对比了 React 18 手动优化和 React 19 编译器自动优化的区别。

## 功能说明

### React 18 方式
- 需要手动使用 `useMemo` 来记忆化计算结果
- 需要手动使用 `useCallback` 来记忆化回调函数
- 需要使用 `memo` 来优化组件重新渲染
- 代码更复杂，需要手动管理依赖项

### React 19 方式（使用 React Compiler）
- 编译器自动记忆化计算结果
- 编译器自动优化回调函数的传递
- 编译器自动跳过不必要的组件重新渲染
- 代码更简洁，专注于业务逻辑

## 核心概念

React Compiler 是一个构建时工具，可以自动优化你的 React 应用：

1. **自动跳过不必要的重新渲染**：当父组件状态变化时，只有相关的子组件会重新渲染
2. **自动记忆化昂贵的计算**：在组件中进行的计算会被自动记忆化
3. **自动优化回调函数**：回调函数的传递会被自动优化，避免不必要的重新渲染

## 注意事项

- 在实际使用中，需要配置 React Compiler 才能生效
- 这个示例主要展示代码写法的区别
- 对于新代码，建议依赖编译器进行自动优化
- 对于现有代码，可以保留现有的 `useMemo`/`useCallback`，或进行仔细测试后再移除
- `useMemo` 和 `useCallback` 仍可作为"脱围机制"使用，用于精确控制记忆化

## 参考资源

- [React Compiler 官方文档](https://zh-hans.react.dev/learn/react-compiler/introduction)

