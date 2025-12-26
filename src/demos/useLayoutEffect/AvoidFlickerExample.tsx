import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  cardStyle,
  cardTitleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  stateDisplayStyle,
} from "./styles";

/** 延迟时间（毫秒）- 调大这个值可以让闪烁更明显 */
const DELAY_MS = 300;

/**
 * 示例 2: 避免闪烁 - 工具提示位置计算
 * 展示 useEffect 和 useLayoutEffect 在避免视觉闪烁方面的差异
 */
const AvoidFlickerExample = () => {
  const [showTooltip1, setShowTooltip1] = useState(false); // 用于 useEffect
  const [showTooltip2, setShowTooltip2] = useState(false); // 用于 useLayoutEffect
  const buttonRef1 = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);
  const tooltipRef1 = useRef<HTMLDivElement>(null);
  const tooltipRef2 = useRef<HTMLDivElement>(null);

  // 使用 useEffect 可能会导致闪烁
  // 工具提示先显示在默认位置，然后 useEffect 执行后移动到正确位置，用户会看到闪烁
  useEffect(() => {
    if (showTooltip1 && buttonRef1.current && tooltipRef1.current) {
      const button = buttonRef1.current;
      const tooltip = tooltipRef1.current;

      console.log(
        "🔴 [useEffect] 工具提示已渲染在屏幕中央，等待",
        DELAY_MS,
        "ms 后移动..."
      );

      // 🔴 使用 setTimeout 延迟位置计算，让浏览器有足够时间显示初始位置
      const timer = setTimeout(() => {
        const buttonRect = button.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        // 计算位置：工具提示显示在按钮下方居中
        let top = buttonRect.bottom + 10;
        let left = buttonRect.left + (buttonRect.width - tooltipRect.width) / 2;

        // 边界检查
        if (top + tooltipRect.height > window.innerHeight) {
          top = buttonRect.top - tooltipRect.height - 10;
        }
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
          left = window.innerWidth - tooltipRect.width - 10;
        }

        console.log("🔴 [useEffect] 现在移动到正确位置:", {
          top: top.toFixed(0),
          left: left.toFixed(0),
        });

        // 清除 transform 并设置正确的位置
        tooltip.style.transform = "none";
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      }, DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, [showTooltip1]);

  // 使用 useLayoutEffect 不会闪烁
  // 因为在浏览器绘制前就计算好位置，工具提示直接显示在正确位置
  useLayoutEffect(() => {
    if (showTooltip2 && buttonRef2.current && tooltipRef2.current) {
      const buttonRect = buttonRef2.current.getBoundingClientRect();
      const tooltipRect = tooltipRef2.current.getBoundingClientRect();

      // 计算位置：工具提示显示在按钮下方居中
      let top = buttonRect.bottom + 10;
      let left = buttonRect.left + (buttonRect.width - tooltipRect.width) / 2;

      // 边界检查
      if (top + tooltipRect.height > window.innerHeight) {
        top = buttonRect.top - tooltipRect.height - 10;
      }
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }

      console.log("🔵 [useLayoutEffect] 在绘制前直接设置正确位置:", {
        top: top.toFixed(0),
        left: left.toFixed(0),
      });

      // 清除 transform 并设置正确的位置（在浏览器绘制前完成）
      tooltipRef2.current.style.transform = "none";
      tooltipRef2.current.style.top = `${top}px`;
      tooltipRef2.current.style.left = `${left}px`;
    }
  }, [showTooltip2]);

  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>示例 2: 避免闪烁 - 工具提示位置计算</h3>
      <div style={stateDisplayStyle}>
        <div>点击按钮显示工具提示，观察工具提示出现时的表现：</div>
        <div style={{ marginTop: "10px" }}>
          <div>
            🔴 useEffect：工具提示先显示在<strong>屏幕中央</strong>
            ，等待 100ms 后跳到按钮下方（明显闪烁）
          </div>
          <div>
            🔵 useLayoutEffect：工具提示直接显示在按钮下方正确位置（无闪烁）
          </div>
        </div>
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
          提示：左侧添加了 {DELAY_MS}ms 延迟，你会<strong>非常明显</strong>
          地看到：
          <br />
          🔴 红色工具提示先在屏幕中央停留 {DELAY_MS}ms，然后跳到按钮下方
          <br />
          🔵 绿色工具提示直接出现在按钮下方（无闪烁）
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ff6b6b",
            }}
          >
            使用 useEffect（可能有闪烁）
          </div>
          <div style={buttonContainerStyle}>
            <button
              ref={buttonRef1}
              onClick={() => {
                console.log("--- 显示/隐藏工具提示（useEffect） ---");
                setShowTooltip1((prev) => !prev);
              }}
              style={getButtonStyleByType("primary")}
            >
              {showTooltip1 ? "隐藏工具提示" : "显示工具提示"}
            </button>
          </div>
          {showTooltip1 && (
            <div
              ref={tooltipRef1}
              style={{
                position: "fixed",
                // 🔴 初始位置在屏幕中央，这样跳动更明显
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#e74c3c", // 红色背景让初始状态更醒目
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                zIndex: 1000,
                pointerEvents: "none",
                boxShadow: "0 4px 20px rgba(231, 76, 60, 0.5)",
                transition: "none", // 禁用过渡动画，让跳动更明显
              }}
            >
              🔴 useEffect 工具提示
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#51cf66",
            }}
          >
            使用 useLayoutEffect（无闪烁）
          </div>
          <div style={buttonContainerStyle}>
            <button
              ref={buttonRef2}
              onClick={() => {
                console.log("--- 显示/隐藏工具提示（useLayoutEffect） ---");
                setShowTooltip2((prev) => !prev);
              }}
              style={getButtonStyleByType("success")}
            >
              {showTooltip2 ? "隐藏工具提示" : "显示工具提示"}
            </button>
          </div>
          {showTooltip2 && (
            <div
              ref={tooltipRef2}
              style={{
                position: "fixed",
                // 🔵 同样的初始位置在屏幕中央，但 useLayoutEffect 会在绘制前修改
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#27ae60", // 绿色背景
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                zIndex: 1000,
                pointerEvents: "none",
                boxShadow: "0 4px 20px rgba(39, 174, 96, 0.5)",
                transition: "none", // 禁用过渡动画
              }}
            >
              🔵 useLayoutEffect 工具提示
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvoidFlickerExample;
