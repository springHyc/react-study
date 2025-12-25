import { useState, createContext, useContext } from "react";
import { theme } from "../../utils/theme";
import {
  containerStyle,
  titleStyle,
  demoSectionStyle,
  demoSectionTitleStyle,
  demoSectionDescStyle,
  demoContentStyle,
  inputStyle,
  displayAreaStyle,
  labelStyle,
  getButtonStyleByType,
} from "./styles";

/**
 * 组件通信 Demo
 * 演示 React 中 4 种常见的组件通信方式
 */

// ========== 1. 父传子通信 ==========
interface ChildProps {
  message: string;
  count: number;
}

// * 子组件：接收父组件传递的 props
const ChildComponent = ({ message, count }: ChildProps) => {
  return (
    <div style={displayAreaStyle}>
      <div>收到父组件消息：{message}</div>
      <div>收到父组件计数：{count}</div>
    </div>
  );
};

// 父组件：向子组件传递数据
const ParentToChildDemo = () => {
  const [message, setMessage] = useState("Hello from Parent!");
  const [count, setCount] = useState(0);

  return (
    <div style={demoContentStyle}>
      <label style={labelStyle}>
        父组件消息：
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, marginLeft: "10px", width: "200px" }}
        />
      </label>
      <div style={{ marginBottom: "15px" }}>
        <button
          style={getButtonStyleByType("primary")}
          onClick={() => setCount(count + 1)}
        >
          计数 +1 (当前: {count})
        </button>
      </div>
      {/* *子组件: 接收父组件传递的 props */}
      <ChildComponent message={message} count={count} />
    </div>
  );
};

// ========== 2. 子传父通信 ==========
interface ChildToParentProps {
  onMessageChange: (message: string) => void;
  onCountChange: (count: number) => void;
}

// 子组件：通过回调函数向父组件传递数据
const ChildToParentComponent = ({
  onMessageChange,
  onCountChange,
}: ChildToParentProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    onMessageChange(inputValue);
    setInputValue("");
  };

  const handleCountClick = () => {
    onCountChange(Math.floor(Math.random() * 100));
  };

  return (
    <div style={demoContentStyle}>
      <label style={labelStyle}>
        子组件输入：
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ ...inputStyle, marginLeft: "10px", width: "200px" }}
          placeholder="输入消息发送给父组件"
        />
        <button
          style={{ ...getButtonStyleByType("primary"), marginLeft: "10px" }}
          onClick={handleSubmit}
        >
          发送消息
        </button>
      </label>
      <div>
        <button
          style={getButtonStyleByType("success")}
          onClick={handleCountClick}
        >
          发送随机数字给父组件
        </button>
      </div>
    </div>
  );
};

// 父组件：接收子组件传递的数据
const ChildToParentDemo = () => {
  const [childMessage, setChildMessage] = useState("");
  const [childCount, setChildCount] = useState(0);

  return (
    <div>
      <ChildToParentComponent
        onMessageChange={setChildMessage}
        onCountChange={setChildCount}
      />
      <div style={displayAreaStyle}>
        <div>收到子组件消息：{childMessage || "暂无消息"}</div>
        <div>收到子组件数字：{childCount}</div>
      </div>
    </div>
  );
};

// ========== 3. 兄弟组件通信 ==========
// 兄弟组件 A
const SiblingA = ({ onSendToB }: { onSendToB: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSendToB(message);
    setMessage("");
  };

  return (
    <div style={demoContentStyle}>
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>兄弟组件 A</div>
      <label style={labelStyle}>
        发送消息给组件 B：
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, marginLeft: "10px", width: "200px" }}
          placeholder="输入消息"
        />
        <button
          style={{ ...getButtonStyleByType("primary"), marginLeft: "10px" }}
          onClick={handleSend}
        >
          发送
        </button>
      </label>
    </div>
  );
};

// 兄弟组件 B
const SiblingB = ({ message }: { message: string }) => {
  return (
    <div style={demoContentStyle}>
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>兄弟组件 B</div>
      <div style={displayAreaStyle}>
        收到来自组件 A 的消息：{message || "暂无消息"}
      </div>
    </div>
  );
};

// 父组件：管理兄弟组件之间的通信
const SiblingCommunicationDemo = () => {
  const [sharedMessage, setSharedMessage] = useState("");

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        <SiblingA onSendToB={setSharedMessage} />
        <SiblingB message={sharedMessage} />
      </div>
    </div>
  );
};

// ========== 4. 跨层通信（useContext） ==========
// 创建 Context
interface ContextValue {
  theme: string;
  user: string;
  updateTheme: (theme: string) => void;
  updateUser: (user: string) => void;
}

const AppContext = createContext<ContextValue | undefined>(undefined);

// 爷组件：提供 Context
const GrandparentComponent = () => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("Guest");

  const contextValue: ContextValue = {
    theme,
    user,
    updateTheme: setTheme,
    updateUser: setUser,
  };

  return (
    <AppContext.Provider value={contextValue as ContextValue}>
      {/* *爷组件: 提供 Context */}
      {/* React 18以及以前的用法 */}
      <div style={demoContentStyle}>
        <div style={{ marginBottom: "15px", fontWeight: "bold" }}>
          爷组件（Context Provider）
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={labelStyle}>
            主题：
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ ...inputStyle, marginLeft: "10px", width: "150px" }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>
            用户：
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ ...inputStyle, marginLeft: "10px", width: "150px" }}
            />
          </label>
        </div>
        <ParentComponent />
      </div>
    </AppContext.Provider>
  );
};

// 父组件：中间层，不直接使用 Context
const ParentComponent = () => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "6px",
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        父组件（中间层，不直接使用 Context）
      </div>
      <ContextChildComponent />
    </div>
  );
};

// 子组件：使用 Context 获取跨层数据
const ContextChildComponent = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Context 未提供</div>;
  }

  const { theme, user, updateTheme, updateUser } = context;

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "15px",
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "6px",
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        子组件（使用 useContext 获取数据）
      </div>
      <div style={displayAreaStyle}>
        <div>当前主题：{theme}</div>
        <div>当前用户：{user}</div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={labelStyle}>
            修改主题：
            <select
              value={theme}
              onChange={(e) => updateTheme(e.target.value)}
              style={{ ...inputStyle, marginLeft: "10px", width: "150px" }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            修改用户：
            <input
              type="text"
              value={user}
              onChange={(e) => updateUser(e.target.value)}
              style={{ ...inputStyle, marginLeft: "10px", width: "150px" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

// ========== 主组件 ==========
const ComponentCommunicationDemo = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>组件通信示例</h2>

      {/* 1. 父传子 */}
      <div style={demoSectionStyle}>
        <h3 style={demoSectionTitleStyle}>1. 父传子通信</h3>
        <p style={demoSectionDescStyle}>
          父组件通过 props 向子组件传递数据。子组件通过函数参数接收 props。
        </p>
        <ParentToChildDemo />
      </div>

      {/* 2. 子传父 */}
      <div style={demoSectionStyle}>
        <h3 style={demoSectionTitleStyle}>2. 子传父通信</h3>
        <p style={demoSectionDescStyle}>
          子组件通过回调函数（函数
          props）向父组件传递数据。父组件定义回调函数，子组件调用它。
        </p>
        <ChildToParentDemo />
      </div>

      {/* 3. 兄弟组件通信 */}
      <div style={demoSectionStyle}>
        <h3 style={demoSectionTitleStyle}>3. 兄弟组件通信</h3>
        <p style={demoSectionDescStyle}>
          兄弟组件通过共同的父组件进行通信。父组件维护共享状态，通过 props
          传递给两个子组件。
        </p>
        <SiblingCommunicationDemo />
      </div>

      {/* 4. 跨层通信（useContext） */}
      <div style={demoSectionStyle}>
        <h3 style={demoSectionTitleStyle}>4. 跨层通信（useContext）</h3>
        <p style={demoSectionDescStyle}>
          使用 React Context API 和 useContext Hook 实现跨层组件通信。爷组件提供
          Context，子组件直接使用，无需通过中间层传递 props。
        </p>
        <GrandparentComponent />
      </div>
      {/* React 19 新特性：use Hook */}
      <div style={demoSectionStyle}>
        <h3 style={demoSectionTitleStyle}>
          React 19: use Hook（替代 useContext）
        </h3>
        <p style={demoSectionDescStyle}>
          React 19 引入了两个重要的 Context 相关改进：
          <br />
          1. 新的 <code>use</code> Hook，可以替代 <code>useContext</code> 来读取
          Context 值。<code>use</code> Hook 更加灵活，还可以处理 Promise 和
          Context。
          <br />
          2. 可以直接使用 <code>&lt;SomeContext&gt;</code> 作为
          provider，不再需要使用 <code>&lt;SomeContext.Provider&gt;</code>。
        </p>
        <div style={demoContentStyle}>
          <div style={{ marginBottom: "15px" }}>
            <strong>代码示例：</strong>
          </div>
          <pre
            style={{
              padding: "15px",
              backgroundColor: theme.bg.tertiary,
              borderRadius: "6px",
              border: `1px solid ${theme.border.light}`,
              fontSize: "13px",
              fontFamily: "'Courier New', monospace",
              overflowX: "auto",
              color: theme.text.primary,
              lineHeight: "1.6",
            }}
          >
            {`// React 19 新特性：Context 相关改进

// ========== 1. Context Provider 的新语法 ==========
import { createContext } from 'react';

const ThemeContext = createContext('light');

// React 18 及以前：必须使用 .Provider
const App18 = () => {
  return (
    <ThemeContext.Provider value="dark">
      <ChildComponent />
    </ThemeContext.Provider>
  );
};

// React 19：可以直接使用 Context 作为 provider
const App19 = () => {
  return (
    <ThemeContext value="dark">
      <ChildComponent />
    </ThemeContext>
  );
};

// ========== 2. use Hook（替代 useContext） ==========
import { use } from 'react';

// React 18 及以前：使用 useContext
const Component18 = () => {
  const theme = useContext(ThemeContext);
  return <div>主题: {theme}</div>;
};

// React 19：使用 use Hook
const Component19 = () => {
  const theme = use(ThemeContext);
  return <div>主题: {theme}</div>;
};

// use Hook 的优势：
// 1. 可以在条件语句和循环中使用
// 2. 可以处理 Promise（用于数据获取）
// 3. 更灵活的 Context 读取方式

// 示例：条件使用
const ConditionalComponent = ({ shouldUseContext }: { shouldUseContext: boolean }) => {
  // React 18: 不能在条件语句中使用 useContext
  // const theme = shouldUseContext ? useContext(ThemeContext) : 'default';
  
  // React 19: 可以在条件语句中使用 use
  const theme = shouldUseContext ? use(ThemeContext) : 'default';
  return <div>主题: {theme}</div>;
};

// 示例：处理 Promise
const DataComponent = ({ dataPromise }: { dataPromise: Promise<string> }) => {
  // use Hook 可以自动处理 Promise，组件会暂停直到 Promise 解决
  const data = use(dataPromise);
  return <div>数据: {data}</div>;
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ComponentCommunicationDemo;
