import {
  forwardRef,
  useImperativeHandle,
  useState,
  useTransition,
} from "react";
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

export interface WithTransitionExampleHandle {
  reset: () => void;
}

/**
 * 使用 useTransition 的示例组件
 * 输入框响应流畅，不会卡顿
 */
export const WithTransitionExample = forwardRef<
  WithTransitionExampleHandle,
  {}
>((props, ref) => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // 使用 useTransition：输入框响应流畅
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value); // 紧急更新：立即响应

    startTransition(() => {
      setList(generateList(value)); // 非紧急更新：可以被打断
    });
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
      <h3 style={{ marginTop: 0, color: "#4CAF50" }}>
        使用 useTransition（推荐）✓
        {isPending && <span style={statusIndicatorStyle}>正在更新...</span>}
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
