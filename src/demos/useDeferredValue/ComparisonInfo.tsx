import {
  descriptionContainerStyle,
  descriptionTitleStyle,
  descriptionListStyle,
  codeBlockStyle,
  comparisonTableStyle,
  tableHeaderStyle,
  tableCellStyle,
} from "./styles";

/**
 * useDeferredValue 和 useTransition 对比说明组件
 */
export const ComparisonInfo = () => {
  return (
    <>
      {/* 说明区域 */}
      <div style={descriptionContainerStyle}>
        <h3 style={descriptionTitleStyle}>useDeferredValue 说明：</h3>
        <ul style={descriptionListStyle}>
          <li>
            <strong>useDeferredValue</strong>: React Hook，用于延迟一个值的更新
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>
                接受一个值作为参数，返回该值的延迟版本
              </li>
              <li>
                当原始值快速变化时，延迟值会"滞后"更新，让 React 优先处理紧急更新
              </li>
              <li>
                不需要手动调用函数，自动处理延迟逻辑
              </li>
            </ul>
          </li>
          <li>
            <strong>作用</strong>:
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>保持 UI 响应性：在值快速变化时，保持用户交互的流畅性</li>
              <li>
                自动延迟：不需要手动标记，React 会自动延迟更新
              </li>
              <li>
                适用于：当你有一个值需要延迟更新，但不想手动管理过渡状态时
              </li>
            </ul>
          </li>
          <li>
            <strong>应用场景</strong>:
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>大型列表渲染时，用户进行键盘输入，React 会放弃列表渲染，先处理键盘输入</li>
              <li>搜索过滤时保持输入框响应</li>
              <li>任何需要延迟一个值更新的场景</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* 对比说明 */}
      <div style={descriptionContainerStyle}>
        <h3 style={descriptionTitleStyle}>useDeferredValue vs useTransition 对比：</h3>
        <table style={comparisonTableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>特性</th>
              <th style={tableHeaderStyle}>useDeferredValue</th>
              <th style={tableHeaderStyle}>useTransition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}>
                <strong>使用方式</strong>
              </td>
              <td style={tableCellStyle}>
                自动延迟一个值的更新，不需要手动调用函数
              </td>
              <td style={tableCellStyle}>
                需要手动调用 startTransition 来标记非紧急更新
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>
                <strong>适用场景</strong>
              </td>
              <td style={tableCellStyle}>
                当你有一个值需要延迟更新时（如输入框的值用于生成列表）
              </td>
              <td style={tableCellStyle}>
                当你需要手动控制哪些状态更新是紧急的，哪些是非紧急的
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>
                <strong>状态管理</strong>
              </td>
              <td style={tableCellStyle}>
                基于一个值自动生成延迟版本，不需要额外的状态
              </td>
              <td style={tableCellStyle}>
                需要管理多个状态，并手动决定哪些放在 startTransition 中
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>
                <strong>pending 状态</strong>
              </td>
              <td style={tableCellStyle}>
                通过比较原始值和延迟值来判断是否正在延迟（input !== deferredInput）
              </td>
              <td style={tableCellStyle}>
                直接提供 isPending 状态，更直观
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>
                <strong>灵活性</strong>
              </td>
              <td style={tableCellStyle}>
                相对简单，适合单一值的延迟场景
              </td>
              <td style={tableCellStyle}>
                更灵活，可以精确控制哪些更新是紧急的，哪些是非紧急的
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>
                <strong>代码示例</strong>
              </td>
              <td style={tableCellStyle}>
                <pre style={{ margin: 0, fontSize: "11px", whiteSpace: "pre-wrap" }}>
{`const [input, setInput] = 
  useState('');
const deferredInput = 
  useDeferredValue(input);
const list = 
  generateList(deferredInput);`}
                </pre>
              </td>
              <td style={tableCellStyle}>
                <pre style={{ margin: 0, fontSize: "11px", whiteSpace: "pre-wrap" }}>
{`const [input, setInput] = 
  useState('');
const [list, setList] = 
  useState([]);
const [isPending, 
  startTransition] = 
  useTransition();

startTransition(() => {
  setList(generateList(input));
});`}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 官方用法示例 */}
      <div style={descriptionContainerStyle}>
        <h3 style={descriptionTitleStyle}>useDeferredValue 官方用法：</h3>
        <div style={codeBlockStyle}>
          <div style={{ marginBottom: "10px" }}>
            <strong>基本用法：</strong>
          </div>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {`import { useState, useDeferredValue } from 'react';

function App() {
  const [input, setInput] = useState('');
  // 延迟 input 值的更新
  const deferredInput = useDeferredValue(input);
  
  // 基于延迟后的值生成列表
  const list = generateList(deferredInput);
  
  // 判断是否正在延迟更新
  const isPending = input !== deferredInput;

  return (
    <>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      {isPending && <span>更新中...</span>}
      <List items={list} />
    </>
  );
}`}
          </pre>
        </div>

        <div style={{ ...codeBlockStyle, marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>与 useTransition 的对比：</strong>
          </div>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {`// useDeferredValue: 自动延迟一个值
const deferredInput = useDeferredValue(input);
const list = generateList(deferredInput);

// useTransition: 手动标记更新
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setList(generateList(input));
});`}
          </pre>
        </div>

        <div style={{ ...codeBlockStyle, marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>选择建议：</strong>
          </div>
          <ul style={descriptionListStyle}>
            <li>
              <strong>使用 useDeferredValue</strong>：当你有一个值需要延迟更新，且这个值会触发昂贵的计算或渲染时
            </li>
            <li>
              <strong>使用 useTransition</strong>：当你需要精确控制哪些状态更新是紧急的，哪些是非紧急的，或者需要更新多个状态时
            </li>
            <li>
              <strong>两者效果相似</strong>：在相同的场景下，两者都能保持 UI 响应性，但实现方式不同
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

