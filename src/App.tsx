import { useState } from "react";
import { demoList, type DemoItem } from "./demos/demoList";
import {
  theme,
  getButtonStyle,
  getCardStyle,
  getShadowStyle,
} from "./utils/theme";
import "./App.css";

function App() {
  const [currentDemo, setCurrentDemo] = useState<DemoItem | null>(null);

  // 如果选中了某个 demo，显示 demo 页面
  if (currentDemo) {
    const DemoComponent = currentDemo.component;
    return (
      <div>
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: theme.bg.secondary,
            borderBottom: `1px solid ${theme.border.default}`,
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={() => setCurrentDemo(null)}
            style={getButtonStyle("primary")}
          >
            ← 返回列表
          </button>
          <h2 style={{ margin: 0, color: theme.text.primary }}>
            {currentDemo.name}
          </h2>
          {currentDemo.description && (
            <span style={{ color: theme.text.secondary, fontSize: "14px" }}>
              {currentDemo.description}
            </span>
          )}
        </div>
        <DemoComponent />
      </div>
    );
  }

  // 显示 demo 列表
  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: theme.bg.primary,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: theme.text.primary,
        }}
      >
        React Hooks Demo 集合
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {demoList.map((demo) => (
          <div
            key={demo.id}
            onClick={() => setCurrentDemo(demo)}
            style={{
              ...getCardStyle(),
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = getShadowStyle(true).boxShadow;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = getShadowStyle().boxShadow;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "10px",
                color: theme.color.primary,
              }}
            >
              {demo.name}
            </h3>
            {demo.description && (
              <p
                style={{
                  margin: 0,
                  color: theme.text.secondary,
                  fontSize: "14px",
                }}
              >
                {demo.description}
              </p>
            )}
          </div>
        ))}
      </div>
      {demoList.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: theme.text.tertiary,
            marginTop: "40px",
          }}
        >
          暂无 demo，请添加更多示例
        </div>
      )}
    </div>
  );
}

export default App;
