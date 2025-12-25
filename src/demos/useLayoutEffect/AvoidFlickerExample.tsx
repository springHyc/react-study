import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  cardStyle,
  cardTitleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  stateDisplayStyle,
} from "./styles";

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
  // 工具提示先显示在默认位置 (0, 0)，然后 useEffect 执行后移动到正确位置，用户会看到闪烁
  useEffect(() => {
    if (showTooltip1 && buttonRef1.current && tooltipRef1.current) {
      const buttonRect = buttonRef1.current.getBoundingClientRect();
      const tooltipRect = tooltipRef1.current.getBoundingClientRect();

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

      console.log("🟢 [useEffect] 计算工具提示位置:", {
        top: top.toFixed(0),
        left: left.toFixed(0),
      });
      console.log(
        "   注意：此时浏览器已经绘制完成，工具提示会先显示在 (0,0)，然后跳到正确位置（闪烁）"
      );

      // 直接修改 DOM，避免触发额外的渲染
      tooltipRef1.current.style.top = `${top}px`;
      tooltipRef1.current.style.left = `${left}px`;
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

      console.log("🔵 [useLayoutEffect] 计算工具提示位置:", {
        top: top.toFixed(0),
        left: left.toFixed(0),
      });
      console.log(
        "   注意：此时浏览器还未绘制，工具提示直接显示在正确位置（无闪烁）"
      );

      // 直接修改 DOM，避免触发额外的渲染
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
            🟢 useEffect：工具提示先显示在左上角
            (0,0)，然后跳到按钮下方（会看到闪烁）
          </div>
          <div>
            🔵 useLayoutEffect：工具提示直接显示在按钮下方正确位置（无闪烁）
          </div>
        </div>
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
          提示：快速点击按钮显示/隐藏工具提示，仔细观察左侧工具提示是否有位置跳动
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
                top: "0px", // 初始位置在左上角，effect 会修改为正确位置
                left: "0px",
                backgroundColor: "#333",
                color: "white",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "14px",
                zIndex: 1000,
                pointerEvents: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              这是工具提示内容
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
                top: "0px", // 初始位置在左上角，effect 会修改为正确位置
                left: "0px",
                backgroundColor: "#333",
                color: "white",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "14px",
                zIndex: 1000,
                pointerEvents: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              这是工具提示内容
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvoidFlickerExample;

