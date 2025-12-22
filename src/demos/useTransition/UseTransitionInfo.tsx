import {
  descriptionContainerStyle,
  descriptionTitleStyle,
  descriptionListStyle,
  codeBlockStyle,
} from "./styles";

/**
 * useTransition 说明文档组件
 * 用于展示详细的使用说明和代码示例
 */
export const UseTransitionInfo = () => {
  return (
    <>
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
    </>
  );
};
