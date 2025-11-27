import { useState, useEffect, useRef } from "react";
import {
  containerStyle,
  titleStyle,
  cardStyle,
  cardTitleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  inputStyle,
  stateDisplayStyle,
  logContainerStyle,
  logItemStyle,
  descriptionStyle,
  descriptionTitleStyle,
  listStyle,
} from "./styles";

// 日志类型
interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
}

/**
 * useState、useEffect、useRef 基础示例
 *
 * useState: 用于管理组件状态
 * useEffect: 用于处理副作用（数据获取、订阅、手动 DOM 操作等）
 * useRef: 用于获取 DOM 引用或保存可变值
 */
const BasicHooksDemo = () => {
  // ========== useState 示例 ==========
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  // ========== useRef 示例 ==========
  // 1. 获取 DOM 引用
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<number>(0); // 2. 保存可变值（不触发重新渲染）

  // ========== useEffect 示例 ==========
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logIdRef = useRef(0);

  // 添加日志的辅助函数
  const addLog = (message: string) => {
    const newLog: LogEntry = {
      id: logIdRef.current++,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 20)); // 只保留最近 20 条
  };

  // useEffect 1: 组件挂载时执行（类似 componentDidMount）
  useEffect(() => {
    addLog("组件已挂载");
    return () => {
      addLog("组件即将卸载");
    };
  }, []); // 空依赖数组，只在挂载和卸载时执行

  // useEffect 2: 监听 count 变化
  useEffect(() => {
    addLog(`count 已更新为: ${count}`);
    // 更新 ref 的值（不会触发重新渲染）
    countRef.current = count;
  }, [count]); // 依赖 count，当 count 改变时执行

  // useEffect 3: 监听 name 变化
  useEffect(() => {
    if (name) {
      addLog(`name 已更新为: ${name}`);
    }
  }, [name]);

  // useEffect 4: 模拟在线状态变化
  useEffect(() => {
    addLog(`在线状态已${isOnline ? "开启" : "关闭"}`);
  }, [isOnline]);

  // useEffect 5: 清理函数示例 - 定时器
  useEffect(() => {
    if (isOnline) {
      addLog("开始定时器");
      const timer = setInterval(() => {
        addLog(`定时器触发 - 当前 count: ${countRef.current}`);
      }, 2000);

      // 清理函数：组件卸载或依赖项改变时执行
      return () => {
        addLog("清理定时器");
        clearInterval(timer);
      };
    }
  }, [isOnline]);

  // 聚焦输入框的函数
  const focusInput = () => {
    inputRef.current?.focus();
    addLog("通过 ref 聚焦输入框");
  };

  // 获取 ref 当前值
  const showRefValue = () => {
    alert(`countRef.current 的值是: ${countRef.current}\n（注意：这个值不会触发重新渲染）`);
    addLog(`读取 ref 值: ${countRef.current}`);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useState、useEffect、useRef 基础示例</h2>

      {/* useState 示例 */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>useState - 状态管理</h3>
        <div style={stateDisplayStyle}>
          <div>计数: {count}</div>
          <div>姓名: {name || "(未输入)"}</div>
          <div>在线状态: {isOnline ? "在线" : "离线"}</div>
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            style={getButtonStyleByType("primary")}
          >
            增加计数
          </button>
          <button
            onClick={() => setCount((prev) => prev - 1)}
            style={getButtonStyleByType("danger")}
          >
            减少计数
          </button>
          <button
            onClick={() => setCount(0)}
            style={getButtonStyleByType("warning")}
          >
            重置计数
          </button>
        </div>
        <div style={buttonContainerStyle}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入姓名"
            style={inputStyle}
          />
          <button
            onClick={() => setName("")}
            style={getButtonStyleByType("danger")}
          >
            清空
          </button>
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setIsOnline((prev) => !prev)}
            style={getButtonStyleByType(isOnline ? "danger" : "success")}
          >
            {isOnline ? "设为离线" : "设为在线"}
          </button>
        </div>
      </div>

      {/* useRef 示例 */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>useRef - DOM 引用和可变值</h3>
        <div style={stateDisplayStyle}>
          <div>useRef 的两个主要用途：</div>
          <div>1. 获取 DOM 元素引用</div>
          <div>2. 保存可变值（不触发重新渲染）</div>
        </div>
        <div style={buttonContainerStyle}>
          <input
            ref={inputRef}
            type="text"
            placeholder="这个输入框可以通过 ref 聚焦"
            style={inputStyle}
          />
          <button
            onClick={focusInput}
            style={getButtonStyleByType("primary")}
          >
            聚焦输入框
          </button>
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={showRefValue}
            style={getButtonStyleByType("success")}
          >
            显示 ref 当前值
          </button>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "10px" }}>
            提示：countRef.current 会随着 count 更新，但不会触发重新渲染
          </div>
        </div>
      </div>

      {/* useEffect 示例 */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>useEffect - 副作用处理</h3>
        <div style={stateDisplayStyle}>
          <div>useEffect 的执行日志：</div>
        </div>
        <div style={logContainerStyle}>
          {logs.length === 0 ? (
            <div style={logItemStyle}>暂无日志</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} style={logItemStyle}>
                [{log.timestamp}] {log.message}
              </div>
            ))
          )}
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setLogs([])}
            style={getButtonStyleByType("warning")}
          >
            清空日志
          </button>
        </div>
      </div>

      <div style={descriptionStyle}>
        <h3 style={descriptionTitleStyle}>核心概念：</h3>
        <ul style={listStyle}>
          <li>
            <strong>useState</strong>: 用于管理组件状态，状态改变会触发组件重新渲染。
            可以传递函数形式的更新器来基于前一个状态更新。
          </li>
          <li>
            <strong>useEffect</strong>: 用于处理副作用，如数据获取、订阅、手动 DOM 操作等。
            可以返回清理函数来清理副作用。依赖数组控制何时执行 effect。
          </li>
          <li>
            <strong>useRef</strong>: 返回一个可变的 ref 对象，有两个主要用途：
            (1) 获取 DOM 元素引用 (2) 保存可变值（改变不会触发重新渲染）
          </li>
          <li>
            <strong>依赖数组</strong>: useEffect 的第二个参数是依赖数组。
            空数组 [] 表示只在挂载和卸载时执行，有依赖项时会在依赖项改变时执行。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasicHooksDemo;

