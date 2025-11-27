import { useState, useCallback, useMemo, memo } from "react";
import {
  containerStyle,
  titleStyle,
  comparisonContainerStyle,
  cardStyle,
  cardTitleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  counterStyle,
  renderCountStyle,
  descriptionStyle,
  descriptionTitleStyle,
  listStyle,
} from "./styles";

// 用于跟踪渲染次数的组件
let renderCounts = {
  parent: 0,
  memoChild: 0,
  callbackChild: 0,
  memoizedChild: 0,
};

// 普通子组件（不使用 memo）
const NormalChild = ({ value, onClick }: { value: number; onClick: () => void }) => {
  renderCounts.callbackChild++;
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>普通子组件（无优化）</h3>
      <div style={renderCountStyle}>渲染次数: {renderCounts.callbackChild}</div>
      <div style={counterStyle}>值: {value}</div>
      <button onClick={onClick} style={getButtonStyleByType("primary")}>
        增加
      </button>
    </div>
  );
};

// 使用 memo 优化的子组件
const MemoizedChild = memo(({ value, onClick }: { value: number; onClick: () => void }) => {
  renderCounts.memoChild++;
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>使用 memo 优化</h3>
      <div style={renderCountStyle}>渲染次数: {renderCounts.memoChild}</div>
      <div style={counterStyle}>值: {value}</div>
      <button onClick={onClick} style={getButtonStyleByType("success")}>
        增加
      </button>
    </div>
  );
});

// 使用 useCallback + memo 优化的子组件
const CallbackMemoizedChild = memo(({ value, onClick }: { value: number; onClick: () => void }) => {
  renderCounts.memoizedChild++;
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>useCallback + memo</h3>
      <div style={renderCountStyle}>渲染次数: {renderCounts.memoizedChild}</div>
      <div style={counterStyle}>值: {value}</div>
      <button onClick={onClick} style={getButtonStyleByType("warning")}>
        增加
      </button>
    </div>
  );
});

/**
 * useCallback、memo、useMemo 对比示例
 *
 * useCallback: 缓存函数，避免每次渲染都创建新函数
 * memo: 缓存组件，只有当 props 改变时才重新渲染
 * useMemo: 缓存计算结果，只有当依赖项改变时才重新计算
 */
const OptimizationHooksDemo = () => {
  renderCounts.parent++;
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // 普通函数 - 每次渲染都会创建新函数（导致使用 memo 的子组件也会重新渲染）
  const handleIncrement1 = () => {
    setCount1((prev) => prev + 1);
  };

  // 普通函数 - 每次渲染都会创建新函数（即使子组件用了 memo，也会因为函数引用改变而重新渲染）
  const handleIncrement2 = () => {
    setCount2((prev) => prev + 1);
  };

  // 使用 useCallback 缓存的函数 - 空依赖数组，函数永远不会改变（配合 memo 使用效果最佳）
  const handleIncrement3 = useCallback(() => {
    setCount3((prev) => prev + 1);
  }, []); // 空依赖数组，函数永远不会改变

  // 使用 useMemo 缓存计算结果
  const expensiveValue = useMemo(() => {
    console.log("计算 expensiveValue...");
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }, [count1]); // 只有当 count1 改变时才重新计算

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useCallback、memo、useMemo 对比示例</h2>

      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>父组件</h3>
        <div style={renderCountStyle}>父组件渲染次数: {renderCounts.parent}</div>
        <div style={counterStyle}>otherState: {otherState}</div>
        <div style={counterStyle}>useMemo 计算结果: {expensiveValue}</div>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setOtherState((prev) => prev + 1)}
            style={getButtonStyleByType("danger")}
          >
            改变 otherState（触发父组件重新渲染）
          </button>
        </div>
      </div>

      <div style={comparisonContainerStyle}>
        {/* 普通子组件 - 每次父组件渲染都会重新渲染（无优化） */}
        <NormalChild value={count1} onClick={handleIncrement1} />

        {/* 使用 memo 优化 - 但 onClick 函数每次都是新的，所以还是会重新渲染（memo 失效） */}
        <MemoizedChild value={count2} onClick={handleIncrement2} />

        {/* 使用 useCallback + memo - 只有当 value 改变时才重新渲染（最佳优化） */}
        <CallbackMemoizedChild value={count3} onClick={handleIncrement3} />
      </div>

      <div style={descriptionStyle}>
        <h3 style={descriptionTitleStyle}>核心概念对比：</h3>
        <ul style={listStyle}>
          <li>
            <strong>useCallback</strong>: 缓存函数引用，避免每次渲染都创建新函数。
            当函数作为 props 传递给子组件时，配合 memo 使用可以避免不必要的子组件重新渲染。
          </li>
          <li>
            <strong>memo</strong>: 缓存组件，对 props 进行浅比较，只有当 props 改变时才重新渲染。
            但如果 props 中包含函数，且函数每次都是新的，memo 就失效了。
          </li>
          <li>
            <strong>useMemo</strong>: 缓存计算结果，只有当依赖项改变时才重新计算。
            用于优化昂贵的计算操作，避免每次渲染都重复计算。
          </li>
          <li>
            <strong>最佳实践</strong>: useCallback + memo 配合使用，可以最大化性能优化效果。
            当父组件重新渲染时，如果子组件的 props 没有改变（包括函数引用），子组件就不会重新渲染。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OptimizationHooksDemo;

