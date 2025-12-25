import { useState, useEffect, useLayoutEffect } from "react";
import {
  cardStyle,
  cardTitleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  stateDisplayStyle,
} from "./styles";

/**
 * 示例 1: 执行时机对比
 * 展示 useEffect 和 useLayoutEffect 的执行时机差异
 */
const ExecutionTimingExample = () => {
  const [count, setCount] = useState(0); // 使用同一个 state，让两个 effect 同时触发

  // 渲染时也打印，方便观察执行顺序
  console.log("⚪ [组件render] count =", count);

  // useLayoutEffect 在 DOM 更新后、浏览器绘制前执行（同步）
  useLayoutEffect(() => {
    const message = `[useLayoutEffect] count 已更新为: ${count} (浏览器绘制前执行)`;
    console.log("🔵", message);
    console.log("   执行时机：DOM 更新后 → useLayoutEffect 执行 → 浏览器绘制");
  }, [count]);

  // useEffect 在浏览器绘制后执行（异步）
  useEffect(() => {
    const message = `[useEffect] count 已更新为: ${count} (浏览器绘制后执行)`;
    console.log("🟢", message);
    console.log("   执行时机：浏览器绘制后 → useEffect 执行");
  }, [count]);

  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>示例 1: 执行时机对比</h3>
      <div style={stateDisplayStyle}>
        <div>点击按钮，观察控制台输出的执行顺序：</div>
        <div style={{ marginTop: "10px" }}>
          <div>执行顺序应该是：</div>
          <div>1. ⚪ 组件 render</div>
          <div>2. 🔵 useLayoutEffect（浏览器绘制前执行）</div>
          <div>3. 🟢 useEffect（浏览器绘制后执行）</div>
        </div>
        <div
          style={{ marginTop: "15px", fontSize: "16px", fontWeight: "bold" }}
        >
          当前 count: {count}
        </div>
      </div>
      <div style={buttonContainerStyle}>
        <button
          onClick={() => {
            console.log("========================================");
            console.log("--- 用户点击按钮，count 即将更新 ---");
            setCount((prev) => prev + 1);
          }}
          style={getButtonStyleByType("primary")}
        >
          增加 count（同时触发两个 effect）
        </button>
        <button
          onClick={() => {
            console.log("========================================");
            console.log("--- 重置 count ---");
            setCount(0);
          }}
          style={getButtonStyleByType("warning")}
        >
          重置
        </button>
      </div>
    </div>
  );
};

export default ExecutionTimingExample;
