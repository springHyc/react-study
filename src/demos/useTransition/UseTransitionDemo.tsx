import { useState, useTransition } from "react";
import {
  containerStyle,
  titleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  inputStyle,
  listContainerStyle,
  listItemStyle,
  descriptionContainerStyle,
  descriptionTitleStyle,
  descriptionListStyle,
  comparisonContainerStyle,
  comparisonBoxStyle,
  statusIndicatorStyle,
  codeBlockStyle,
} from "./styles";

/**
 * useTransition 和 startTransition 使用示例
 *
 * useTransition: 用于标记非紧急的状态更新，让 React 知道这些更新可以被打断
 * startTransition: 用于在非 React 组件中（如事件处理器外部）标记非紧急更新
 *
 * 作用：
 * 1. 保持 UI 响应性：在大量状态更新时，保持用户交互的流畅性
 * 2. 优先级控制：将更新分为紧急（用户输入）和非紧急（列表渲染）
 * 3. 避免阻塞：非紧急更新可以被紧急更新打断
 */
const UseTransitionDemo = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // 不使用 useTransition 的版本（用于对比）
  const [inputWithoutTransition, setInputWithoutTransition] = useState("");
  const [listWithoutTransition, setListWithoutTransition] = useState<string[]>(
    []
  );

  // 生成大量列表项（模拟耗时操作）
  const generateList = (prefix: string, count: number = 10000): string[] => {
    return Array.from({ length: count }, (_, i) => `${prefix} - 项目 ${i + 1}`);
  };

  // 使用 useTransition 的版本
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value); // 紧急更新：用户输入需要立即响应

    // 非紧急更新：列表渲染可以延迟
    startTransition(() => {
      setList(generateList(value));
    });
  };

  // 不使用 useTransition 的版本（用于对比）
  const handleInputChangeWithoutTransition = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputWithoutTransition(value);
    // 直接更新，会阻塞 UI
    setListWithoutTransition(generateList(value));
  };

  // 手动触发 startTransition 示例
  const handleManualTransition = () => {
    const newValue = "手动触发";
    setInput(newValue);
    // 使用从 useTransition 返回的 startTransition 函数
    startTransition(() => {
      setList(generateList(newValue, 15000));
    });
  };

  // 重置列表
  const handleReset = () => {
    setInput("");
    setList([]);
    setInputWithoutTransition("");
    setListWithoutTransition([]);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useTransition 和 startTransition 示例</h2>

      {/* 对比演示区域 */}
      <div style={comparisonContainerStyle}>
        {/* 使用 useTransition 的版本 */}
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

        {/* 不使用 useTransition 的版本 */}
        <div style={comparisonBoxStyle}>
          <h3 style={{ marginTop: 0, color: "#f44336" }}>
            不使用 useTransition（对比）✗
          </h3>
          <input
            type="text"
            value={inputWithoutTransition}
            onChange={handleInputChangeWithoutTransition}
            placeholder="输入内容，观察响应速度..."
            style={inputStyle}
          />
          <div style={listContainerStyle}>
            <p style={{ margin: "10px 0", fontSize: "14px", color: "#666" }}>
              列表项数量: {listWithoutTransition.length}
            </p>
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              {listWithoutTransition.map((item, index) => (
                <div key={index} style={listItemStyle}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={buttonContainerStyle}>
        <button
          onClick={handleManualTransition}
          style={getButtonStyleByType("primary")}
        >
          手动触发 startTransition
        </button>
        <button onClick={handleReset} style={getButtonStyleByType("danger")}>
          重置
        </button>
      </div>

      {/* 说明区域 */}
      <div style={descriptionContainerStyle}>
        <h3 style={descriptionTitleStyle}>
          useTransition 和 startTransition 说明：
        </h3>
        <ul style={descriptionListStyle}>
          <li>
            <strong>useTransition</strong>: React Hook，返回一个数组
            <code>[isPending, startTransition]</code>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>
                <strong>isPending</strong>: 布尔值，表示是否有待处理的过渡更新
              </li>
              <li>
                <strong>startTransition</strong>: 函数，用于标记非紧急的状态更新
              </li>
            </ul>
          </li>
          <li>
            <strong>startTransition</strong>: 独立的函数（从 react
            导入），用于在非组件环境中标记非紧急更新
          </li>
          <li>
            <strong>作用</strong>:
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>保持 UI 响应性：在大量状态更新时，保持用户交互的流畅性</li>
              <li>
                优先级控制：将更新分为紧急（用户输入）和非紧急（列表渲染）
              </li>
              <li>
                避免阻塞：非紧急更新可以被紧急更新打断，让用户输入始终优先
              </li>
            </ul>
          </li>
          <li>
            <strong>使用场景</strong>:
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>大量列表渲染时保持输入框响应</li>
              <li>搜索过滤时保持 UI 流畅</li>
              <li>标签页切换时保持交互响应</li>
              <li>任何需要区分紧急和非紧急更新的场景</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* 官方用法示例 */}
      <div style={descriptionContainerStyle}>
        <h3 style={descriptionTitleStyle}>官方正确用法：</h3>
        <div style={codeBlockStyle}>
          <div style={{ marginBottom: "10px" }}>
            <strong>1. 使用 useTransition Hook（在组件内）：</strong>
          </div>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {`import { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // 紧急更新：立即执行
    
    startTransition(() => {
      setList(generateList(value)); // 非紧急更新：可以被打断
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <span>更新中...</span>}
      <List items={list} />
    </>
  );
}`}
          </pre>
        </div>

        <div style={{ ...codeBlockStyle, marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>
              2. 使用独立的 startTransition（在组件外或事件处理器中）：
            </strong>
          </div>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {`import { startTransition } from 'react';

// 在事件处理器外部使用
function handleClick() {
  startTransition(() => {
    // 非紧急更新
    setState(newValue);
  });
}

// 在异步操作中使用
fetchData().then(data => {
  startTransition(() => {
    setList(data);
  });
});`}
          </pre>
        </div>

        <div style={{ ...codeBlockStyle, marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>3. 注意事项：</strong>
          </div>
          <ul style={descriptionListStyle}>
            <li>
              <strong>紧急更新</strong>
              ：用户输入、点击、悬停等交互应该立即响应，不要放在 startTransition
              中
            </li>
            <li>
              <strong>非紧急更新</strong>
              ：列表渲染、搜索结果、标签页内容等可以延迟的更新，应该放在
              startTransition 中
            </li>
            <li>
              <strong>isPending</strong>：用于显示加载状态，提升用户体验
            </li>
            <li>
              <strong>不能用于控制</strong>：startTransition
              中的更新不能用于控制文本输入等需要同步的场景
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseTransitionDemo;
