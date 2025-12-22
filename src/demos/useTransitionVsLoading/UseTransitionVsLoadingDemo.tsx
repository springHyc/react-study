import { useState, useTransition } from "react";
import { theme, getCardStyle } from "../../utils/theme";

/**
 * 模拟更新名称的方法
 * @param name 要更新的名称
 * @returns Promise<string | null> 如果有错误返回错误信息，否则返回 null
 */
const updateName = async (name: string): Promise<string | null> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 模拟成功的情况
  console.log("更新名称:", name);
  return null;
};

/**
 * 使用 useTransition 的实现
 * 特点：状态更新被标记为低优先级，不会阻塞高优先级的更新（如用户输入）
 */
const TransitionUpdate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      console.log("update name success");
      setError(null);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: theme.text.primary, marginTop: 0 }}>
        使用 useTransition
      </h3>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          border: `1px solid ${theme.border.default}`,
          borderRadius: "4px",
          width: "100%",
          maxWidth: "300px",
          marginBottom: "10px",
          display: "block",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: isPending
            ? theme.color.warning
            : theme.color.primary,
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isPending ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? "Updating..." : "Update"}
      </button>
      {error && (
        <p style={{ color: theme.color.danger, marginTop: "10px" }}>{error}</p>
      )}
      {isPending && (
        <p
          style={{
            color: theme.text.secondary,
            fontSize: "12px",
            marginTop: "10px",
          }}
        >
          ⚡ 状态：pending（低优先级更新中，不会阻塞输入）
        </p>
      )}
    </div>
  );
};

/**
 * 使用普通 loading 状态的实现
 * 特点：手动管理 loading 状态，所有状态更新都是同步的
 */
const NormalUpdate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      console.log("update name success");
      setError(null);
    } finally {
      // 确保无论成功还是失败都重置 loading 状态
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: theme.text.primary, marginTop: 0 }}>
        使用 loading 状态
      </h3>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          border: `1px solid ${theme.border.default}`,
          borderRadius: "4px",
          width: "100%",
          maxWidth: "300px",
          marginBottom: "10px",
          display: "block",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: loading ? theme.color.warning : theme.color.primary,
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Updating..." : "Update"}
      </button>
      {error && (
        <p style={{ color: theme.color.danger, marginTop: "10px" }}>{error}</p>
      )}
      {loading && (
        <p
          style={{
            color: theme.text.secondary,
            fontSize: "12px",
            marginTop: "10px",
          }}
        >
          ⏳ 状态：loading（同步更新，可能阻塞 UI）
        </p>
      )}
    </div>
  );
};

/**
 * useTransition vs loading 状态对比 Demo
 * 展示两种实现方式的区别和适用场景
 */
const UseTransitionVsLoadingDemo = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: theme.bg.primary,
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <h2 style={{ color: theme.text.primary, marginBottom: "30px" }}>
        useTransition vs loading 状态对比
      </h2>

      {/* 对比展示区域 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            ...getCardStyle(),
            border: `2px solid ${theme.color.primary}`,
          }}
        >
          <TransitionUpdate />
        </div>
        <div
          style={{
            ...getCardStyle(),
            border: `2px solid ${theme.color.warning}`,
          }}
        >
          <NormalUpdate />
        </div>
      </div>

      {/* 详细说明 */}
      <div
        style={{
          ...getCardStyle(),
          backgroundColor: theme.bg.secondary,
        }}
      >
        <h3 style={{ color: theme.text.primary, marginTop: 0 }}>
          主要区别说明
        </h3>
        <div style={{ color: theme.text.secondary, lineHeight: "1.8" }}>
          <h4 style={{ color: theme.text.primary }}>1. 状态管理方式</h4>
          <ul>
            <li>
              <strong>useTransition</strong>：由 React 自动管理 `isPending`
              状态，无需手动设置
            </li>
            <li>
              <strong>loading</strong>：需要手动使用 `useState`
              管理，并在适当的时候设置 `true/false`
            </li>
          </ul>

          <h4 style={{ color: theme.text.primary }}>2. 更新优先级</h4>
          <ul>
            <li>
              <strong>useTransition</strong>：`startTransition`
              中的状态更新被标记为
              <strong>低优先级</strong>
              ，不会阻塞高优先级的更新（如用户输入、点击等）
            </li>
            <li>
              <strong>loading</strong>：所有状态更新都是
              <strong>同步高优先级</strong>，可能会阻塞 UI 响应
            </li>
          </ul>

          <h4 style={{ color: theme.text.primary }}>3. 用户体验</h4>
          <ul>
            <li>
              <strong>useTransition</strong>
              ：在异步操作进行时，用户仍然可以流畅地输入和交互，UI 保持响应
            </li>
            <li>
              <strong>loading</strong>
              ：在异步操作进行时，虽然按钮被禁用，但如果有大量状态更新，可能会影响
              UI 的流畅性
            </li>
          </ul>

          <h4 style={{ color: theme.text.primary }}>4. 适用场景</h4>
          <ul>
            <li>
              <strong>useTransition</strong>
              ：适合非紧急的状态更新，如搜索、筛选、数据加载等，希望保持 UI
              响应性
            </li>
            <li>
              <strong>loading</strong>
              ：适合需要明确反馈的操作，如表单提交、关键操作等，需要明确的加载状态
            </li>
          </ul>

          <h4 style={{ color: theme.text.primary }}>5. 错误处理</h4>
          <ul>
            <li>
              <strong>useTransition</strong>：`isPending` 状态由 React
              自动管理，无需担心忘记重置
            </li>
            <li>
              <strong>loading</strong>：需要确保在错误情况下也重置 loading
              状态（使用 try-finally）
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseTransitionVsLoadingDemo;

