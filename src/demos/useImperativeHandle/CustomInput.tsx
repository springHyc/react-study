import { forwardRef, useImperativeHandle, useRef } from "react";
import { theme } from "../../utils/theme";

// 定义暴露给父组件的方法接口
export type CustomInputHandle = {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
};

// 使用 forwardRef 包装组件，使其可以接收 ref
const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string }>(
  ({ placeholder = "请输入内容..." }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 使用 useImperativeHandle 自定义暴露给父组件的实例值
    useImperativeHandle(ref, () => ({
      // 聚焦输入框
      focus: () => {
        inputRef.current?.focus();
      },
      // 清空输入框
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      // 获取输入框的值
      getValue: () => {
        return inputRef.current?.value || "";
      },
      // 设置输入框的值
      setValue: (value: string) => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      },
    }));

    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        style={{
          padding: "8px 12px",
          fontSize: "16px",
          border: `1px solid ${theme.input.border}`,
          borderRadius: "4px",
          width: "300px",
          backgroundColor: theme.input.bg,
          color: theme.text.primary,
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.color.primary;
          e.target.style.outline = "none";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = theme.input.border;
        }}
      />
    );
  }
);

// 设置 displayName，方便在 React DevTools 中识别
CustomInput.displayName = "CustomInput";

export default CustomInput;
