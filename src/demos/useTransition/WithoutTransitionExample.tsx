import { forwardRef, useImperativeHandle, useState } from "react";
import {
  comparisonBoxStyle,
  inputStyle,
  listContainerStyle,
  listItemStyle,
} from "./styles";

// 生成大量列表项（模拟耗时操作）
const generateList = (prefix: string, count: number = 10000): string[] => {
  return Array.from({ length: count }, (_, i) => `${prefix} - 项目 ${i + 1}`);
};

export interface WithoutTransitionExampleHandle {
  reset: () => void;
}

/**
 * 不使用 useTransition 的示例组件
 * 输入框会卡顿，因为列表更新会阻塞 UI
 */
export const WithoutTransitionExample = forwardRef<
  WithoutTransitionExampleHandle,
  {}
>((props, ref) => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);

  // 不使用 useTransition：输入框会卡顿
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setList(generateList(value)); // 直接更新，会阻塞 UI
  };

  // 暴露 reset 方法给父组件
  useImperativeHandle(ref, () => ({
    reset: () => {
      setInput("");
      setList([]);
    },
  }));

  return (
    <div style={comparisonBoxStyle}>
      <h3 style={{ marginTop: 0, color: "#f44336" }}>
        不使用 useTransition（对比）✗
      </h3>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="输入内容，观察响应速度..."
        style={inputStyle}
      />
      <div style={listContainerStyle}>
        <p style={{ margin: "10px 0", fontSize: "14px", color: "#666" }}>
          列表项数量: {list.length}
        </p>
        <div style={{ maxHeight: "400px", overflow: "auto" }}>
          {list.map((item, index) => (
            <div key={index} style={listItemStyle}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

