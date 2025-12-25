import { useState, useDeferredValue } from "react";
import {
  comparisonBoxStyle,
  inputStyle,
  listContainerStyle,
  listItemStyle,
  statusIndicatorStyle,
} from "./styles";

// 生成大量列表项（模拟耗时操作）
const generateList = (prefix: string, count: number = 10000): string[] => {
  return Array.from({ length: count }, (_, i) => `${prefix} - 项目 ${i + 1}`);
};

/**
 * 使用 useDeferredValue 的示例组件
 * 输入框响应流畅，列表更新会被延迟
 */
export const UseDeferredValueExample = () => {
  const [input, setInput] = useState("");
  // 使用 useDeferredValue：自动延迟 input 值的更新
  const deferredInput = useDeferredValue(input);

  // 基于延迟后的值生成列表
  const list = generateList(deferredInput);

  // 输入框直接使用原始值，响应立即
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value); // 紧急更新：立即响应
    // 列表会基于 deferredInput 自动延迟更新
  };

  // 判断是否正在延迟更新（当前值与延迟值不同）
  const isPending = input !== deferredInput;

  return (
    <div style={comparisonBoxStyle}>
      <h3 style={{ marginTop: 0, color: "#4CAF50" }}>
        使用 useDeferredValue ✓
        {isPending && (
          <span style={{ ...statusIndicatorStyle, marginLeft: "10px" }}>
            延迟更新中...
          </span>
        )}
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
        <p style={{ margin: "5px 0", fontSize: "12px", color: "#999" }}>
          当前输入: "{input}" | 延迟值: "{deferredInput}"
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
};

