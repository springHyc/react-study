# useImperativeHandle Demo

这个 demo 展示了 React 中 `forwardRef` 和 `useImperativeHandle` 的用法。

## 文件说明

- `CustomInput.tsx`: 使用 `forwardRef` 和 `useImperativeHandle` 创建的自定义输入框组件
- `UseImperativeHandleDemo.tsx`: 演示如何使用自定义输入框组件
- `index.ts`: 导出文件

## 核心概念

### forwardRef

`forwardRef` 允许组件接收 `ref` 参数，并将其传递给子元素或通过 `useImperativeHandle` 暴露自定义方法。

### useImperativeHandle

`useImperativeHandle` 可以自定义暴露给父组件的实例值，而不是直接暴露整个 DOM 节点。这样可以更好地封装组件内部实现。

## 使用场景

- 需要父组件调用子组件的方法（如 focus、clear、validate 等）
- 需要封装组件内部实现，只暴露必要的接口
- 需要控制父组件对子组件 DOM 的访问权限

## 示例功能

在这个 demo 中，父组件可以通过 ref 调用子组件的以下方法：

- `focus()`: 聚焦输入框
- `clear()`: 清空输入框
- `getValue()`: 获取输入框的值
- `setValue(value)`: 设置输入框的值
