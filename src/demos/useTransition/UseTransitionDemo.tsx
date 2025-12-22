import { useRef } from "react";
import {
  containerStyle,
  titleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  comparisonContainerStyle,
} from "./styles";
import { UseTransitionInfo } from "./UseTransitionInfo";
import { WithTransitionExample } from "./WithTransitionExample";
import type { WithTransitionExampleHandle } from "./WithTransitionExample";
import { WithoutTransitionExample } from "./WithoutTransitionExample";
import type { WithoutTransitionExampleHandle } from "./WithoutTransitionExample";

/**
 * useTransition 核心演示
 * 对比使用 useTransition 和不使用的区别
 */
const UseTransitionDemo = () => {
  const withTransitionRef = useRef<WithTransitionExampleHandle>(null);
  const withoutTransitionRef = useRef<WithoutTransitionExampleHandle>(null);

  // 重置两个组件
  const handleReset = () => {
    withTransitionRef.current?.reset();
    withoutTransitionRef.current?.reset();
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useTransition 和 startTransition 示例</h2>

      {/* 对比演示区域 */}
      <div style={comparisonContainerStyle}>
        {/* 使用 useTransition 的版本 */}
        <WithTransitionExample ref={withTransitionRef} />

        {/* 不使用 useTransition 的版本 */}
        <WithoutTransitionExample ref={withoutTransitionRef} />
      </div>

      {/* 重置按钮 */}
      <div style={buttonContainerStyle}>
        <button onClick={handleReset} style={getButtonStyleByType("danger")}>
          重置
        </button>
      </div>

      {/* 详细说明（可选展示） */}
      <UseTransitionInfo />
    </div>
  );
};

export default UseTransitionDemo;
