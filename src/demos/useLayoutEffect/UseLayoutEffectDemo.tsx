import {
  containerStyle,
  titleStyle,
  descriptionStyle,
  descriptionTitleStyle,
  listStyle,
} from "./styles";
import ExecutionTimingExample from "./ExecutionTimingExample";
import AvoidFlickerExample from "./AvoidFlickerExample";

/**
 * useLayoutEffect 使用示例
 *
 * useLayoutEffect 和 useEffect 的区别：
 * 1. 执行时机：useLayoutEffect 在 DOM 更新后、浏览器绘制前同步执行
 * 2. 执行顺序：useLayoutEffect 会阻塞浏览器绘制，直到执行完成
 * 3. 适用场景：需要同步读取 DOM 布局、避免闪烁、测量 DOM 尺寸等
 */
const UseLayoutEffectDemo = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useLayoutEffect 使用示例</h2>
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          color: "#856404",
        }}
      >
        <strong>💡 提示：</strong>
        打开浏览器控制台（F12）查看执行日志，可以清楚地看到 useEffect 和
        useLayoutEffect 的执行顺序
      </div>

      {/* 示例 1: 执行时机对比 */}
      <ExecutionTimingExample />

      {/* 示例 2: 避免闪烁 */}
      <AvoidFlickerExample />

      {/* 说明 */}
      <div style={descriptionStyle}>
        <h3 style={descriptionTitleStyle}>核心概念：</h3>
        <ul style={listStyle}>
          <li>
            <strong>执行时机</strong>：
            <ul style={listStyle}>
              <li>useEffect：在浏览器绘制后异步执行，不会阻塞浏览器绘制</li>
              <li>
                useLayoutEffect：在 DOM
                更新后、浏览器绘制前同步执行，会阻塞浏览器绘制
              </li>
            </ul>
          </li>
          <li>
            <strong>执行顺序</strong>：
            <ul style={listStyle}>
              <li>
                组件更新 → DOM 更新 → useLayoutEffect 执行 → 浏览器绘制 →
                useEffect 执行
              </li>
            </ul>
          </li>
          <li>
            <strong>适用场景</strong>：
            <ul style={listStyle}>
              <li>
                需要同步读取 DOM 布局信息（如 getBoundingClientRect、offsetWidth
                等）
              </li>
              <li>
                需要避免视觉闪烁的场景（如工具提示位置计算、动画初始化等）
              </li>
              <li>需要同步修改 DOM 的场景（如滚动位置、焦点管理等）</li>
            </ul>
          </li>
          <li>
            <strong>性能考虑</strong>：
            <ul style={listStyle}>
              <li>
                useLayoutEffect 会阻塞浏览器绘制，过度使用可能导致性能问题
              </li>
              <li>
                优先使用 useEffect，只有在需要同步执行时才使用 useLayoutEffect
              </li>
              <li>在 useLayoutEffect 中避免执行耗时操作</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UseLayoutEffectDemo;
