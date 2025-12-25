import { useRef } from "react";
import {
  containerStyle,
  titleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  comparisonContainerStyle,
} from "./styles";
import { UseDeferredValueExample } from "./UseDeferredValueExample";
import { UseTransitionComparisonExample } from "./UseTransitionComparisonExample";
import { ComparisonInfo } from "./ComparisonInfo";

/**
 * useDeferredValue 核心演示
 * 对比使用 useDeferredValue 和 useTransition 的区别
 */
const UseDeferredValueDemo = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useDeferredValue 示例和对比</h2>

      {/* 对比演示区域 */}
      <div style={comparisonContainerStyle}>
        {/* 使用 useDeferredValue 的版本 */}
        <UseDeferredValueExample />

        {/* 使用 useTransition 的对比版本 */}
        <UseTransitionComparisonExample />
      </div>

      {/* 详细说明 */}
      <ComparisonInfo />
    </div>
  );
};

export default UseDeferredValueDemo;

