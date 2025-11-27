import { useRef, useState } from "react";
import CustomInput from "./CustomInput";
import type { CustomInputHandle } from "./CustomInput";
import { theme, getButtonStyle } from "../../utils/theme";

/**
 * useImperativeHandle 和 forwardRef 使用示例
 *
 * forwardRef: 允许组件接收 ref 并传递给子元素或暴露给父组件
 * useImperativeHandle: 自定义暴露给父组件的实例值，而不是直接暴露整个 DOM 节点
 */
const UseImperativeHandleDemo = () => {
  // 创建 ref 来引用子组件
  const inputRef = useRef<CustomInputHandle>(null);
  const [displayValue, setDisplayValue] = useState("");

  // 聚焦输入框
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // 清空输入框
  const handleClear = () => {
    inputRef.current?.clear();
    setDisplayValue("");
  };

  // 获取输入框的值
  const handleGetValue = () => {
    const value = inputRef.current?.getValue() || "";
    setDisplayValue(value);
    alert(`当前输入框的值是: ${value}`);
  };

  // 设置输入框的值
  const handleSetValue = () => {
    inputRef.current?.setValue("Hello React!");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: theme.bg.primary,
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <h2 style={{ color: theme.text.primary }}>
        useImperativeHandle 和 forwardRef 示例
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <CustomInput ref={inputRef} placeholder="请输入内容..." />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <button onClick={handleFocus} style={getButtonStyle("primary")}>
          聚焦输入框
        </button>

        <button onClick={handleClear} style={getButtonStyle("danger")}>
          清空输入框
        </button>

        <button onClick={handleGetValue} style={getButtonStyle("success")}>
          获取值
        </button>

        <button onClick={handleSetValue} style={getButtonStyle("warning")}>
          设置值
        </button>
      </div>

      {displayValue && (
        <div
          style={{
            padding: "10px",
            backgroundColor: theme.bg.tertiary,
            borderRadius: "4px",
            marginTop: "10px",
            color: theme.text.primary,
          }}
        >
          <strong>显示的值:</strong> {displayValue}
        </div>
      )}

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: theme.bg.secondary,
          borderRadius: "4px",
          fontSize: "14px",
          color: theme.text.primary,
        }}
      >
        <h3 style={{ marginTop: 0, color: theme.text.primary }}>说明：</h3>
        <ul style={{ lineHeight: "1.8", color: theme.text.secondary }}>
          <li>
            <strong>forwardRef</strong>: 允许组件接收 ref
            参数，并将其传递给子元素或通过 useImperativeHandle 暴露自定义方法
          </li>
          <li>
            <strong>useImperativeHandle</strong>:
            自定义暴露给父组件的实例值，而不是直接暴露整个 DOM
            节点，这样可以更好地封装组件内部实现
          </li>
          <li>
            在这个例子中，父组件可以通过 ref 调用子组件的 focus、clear、getValue
            和 setValue 方法，而不需要直接访问 DOM 节点
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UseImperativeHandleDemo;
