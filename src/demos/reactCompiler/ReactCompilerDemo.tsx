import { useState } from "react";
import {
  containerStyle,
  titleStyle,
  comparisonContainerStyle,
  comparisonBoxStyle,
  boxTitleStyle,
  listStyle,
  listItemStyle,
  descriptionContainerStyle,
  descriptionTitleStyle,
  descriptionListStyle,
  buttonStyle,
  codeBlockStyle,
  renderCountStyle,
} from "./styles";

// React 18 方式：需要手动使用 useMemo 和 useCallback
import React18Component from "./React18Component";

// React 19 方式：编译器自动优化，无需手动记忆化
import React19Component from "./React19Component";

/**
 * React Compiler 演示
 * 对比 React 18 手动优化和 React 19 编译器自动优化的区别
 */
const ReactCompilerDemo = () => {
  const [react18Data, setReact18Data] = useState<number[]>([1, 2, 3, 4, 5]);
  const [react19Data, setReact19Data] = useState<number[]>([1, 2, 3, 4, 5]);

  // 添加新数据
  const handleAddReact18 = () => {
    setReact18Data((prev) => [...prev, prev.length + 1]);
  };

  const handleAddReact19 = () => {
    setReact19Data((prev) => [...prev, prev.length + 1]);
  };

  // 重置数据
  const handleResetReact18 = () => {
    setReact18Data([1, 2, 3, 4, 5]);
  };

  const handleResetReact19 = () => {
    setReact19Data([1, 2, 3, 4, 5]);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>React Compiler 自动优化示例</h2>

      {/* 对比演示区域 */}
      <div style={comparisonContainerStyle}>
        {/* React 18 方式 */}
        <div style={comparisonBoxStyle}>
          <h3 style={boxTitleStyle}>
            React 18 方式
            <span style={renderCountStyle}>需要手动优化</span>
          </h3>
          <React18Component data={react18Data} onItemClick={(item) => console.log("React 18 clicked:", item)} />
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button onClick={handleAddReact18} style={buttonStyle}>
              添加数据
            </button>
            <button onClick={handleResetReact18} style={buttonStyle}>
              重置
            </button>
          </div>
          <div style={codeBlockStyle}>
            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>代码特点：</div>
            <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
              • 需要使用 useMemo 记忆化计算结果<br />
              • 需要使用 useCallback 记忆化回调函数<br />
              • 代码更复杂，需要手动管理依赖
            </div>
          </div>
        </div>

        {/* React 19 方式 */}
        <div style={comparisonBoxStyle}>
          <h3 style={boxTitleStyle}>
            React 19 方式
            <span style={renderCountStyle}>编译器自动优化</span>
          </h3>
          <React19Component data={react19Data} onItemClick={(item) => console.log("React 19 clicked:", item)} />
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button onClick={handleAddReact19} style={buttonStyle}>
              添加数据
            </button>
            <button onClick={handleResetReact19} style={buttonStyle}>
              重置
            </button>
          </div>
          <div style={codeBlockStyle}>
            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>代码特点：</div>
            <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
              • 无需手动使用 useMemo 和 useCallback<br />
              • 编译器自动进行记忆化优化<br />
              • 代码更简洁，专注于业务逻辑
            </div>
          </div>
        </div>
      </div>

      {/* 详细说明 */}
      <div style={descriptionContainerStyle}>
        <h3 style={descriptionTitleStyle}>React Compiler 说明</h3>
        <ul style={descriptionListStyle}>
          <li>
            <strong>React 编译器的作用：</strong>
            React 编译器是一个构建时工具，可以自动优化你的 React 应用，无需手动进行记忆化处理。
          </li>
          <li>
            <strong>自动优化内容：</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>自动跳过不必要的组件重新渲染</li>
              <li>自动记忆化昂贵的计算</li>
              <li>自动优化回调函数的传递</li>
            </ul>
          </li>
          <li>
            <strong>使用建议：</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>对于新代码，建议依赖编译器进行自动优化</li>
              <li>对于现有代码，可以保留现有的 useMemo/useCallback，或进行仔细测试后再移除</li>
              <li>useMemo 和 useCallback 仍可作为"脱围机制"使用，用于精确控制记忆化</li>
            </ul>
          </li>
          <li>
            <strong>注意事项：</strong>
            编译器主要优化更新性能（重新渲染），对于首次渲染的性能提升有限。如果计算非常昂贵且被多个组件使用，可能需要考虑在 React 外部实现记忆化。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReactCompilerDemo;

