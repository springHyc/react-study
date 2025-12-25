import { useState, useTransition } from "react";
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
 * 使用 useTransition 的对比示例组件
 * 用于与 useDeferredValue 进行对比
 */
export const UseTransitionComparisonExample = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // 使用 useTransition：需要手动调用 startTransition
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value); // 紧急更新：立即响应

    startTransition(() => {
      setList(generateList(value)); // 非紧急更新：可以被打断
    });
  };

  return (
    <div style={comparisonBoxStyle}>
      <h3 style={{ marginTop: 0, color: "#2196F3" }}>
        使用 useTransition（对比）✓
        {isPending && (
          <span style={{ ...statusIndicatorStyle, marginLeft: "10px" }}>
            更新中...
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
          当前输入: "{input}"
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

