import React from "react";
import { Card, Space } from "antd";
import { createStyles } from "antd-style";
import Component4 from "./Component4";

// 示例：证明 CSS-in-JS 库（antd-style）会生成独一无二的 CSS class 名
// 即使不同组件使用相同的样式类名（如 container），生成的 CSS class 名也是唯一的
// 这样可以实现样式封装，使样式只作用于各自的组件，不会互相影响

// 第一个组件：使用 container 样式类名
// 添加label属性，方便调试
const useStyles1 = createStyles(({ css }) => ({
  container: css`
    background-color: #e6f7ff;
    border: 2px solid #1890ff;
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
    label: container1;
  `,
  title: css`
    color: #1890ff;
    font-size: 16px;
    font-weight: bold;
  `,
}));

// 第二个组件：也使用 container 样式类名，但样式完全不同
// 如果需要在类名中看到可读的标识，可以使用 data-* 属性（见 Component2 的使用方式）
const useStyles2 = createStyles(({ css }) => ({
  container: css`
    background-color: #fff7e6;
    border: 2px solid #fa8c16;
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
  `,
  title: css`
    color: #fa8c16;
    font-size: 16px;
    font-weight: bold;
  `,
}));

// 第三个组件：同样使用 container 样式类名
// label 的实际用途和调试方法：
const useStyles3 = createStyles(
  ({ css }) => ({
    container: css`
      background-color: #f6ffed;
      border: 2px solid #52c41a;
      padding: 20px;
      border-radius: 8px;
      margin: 10px 0;
    `,
    title: css`
      color: #52c41a;
      font-size: 16px;
      font-weight: bold;
    `,
  }),
  {
    // label 的正确用法：作为 createStyles 的第二个参数
    // 这个 label 会被 emotion 内部使用，用于调试和性能分析
    // 调试方法：
    // 1. 打开浏览器控制台，输入：document.querySelector('[data-emotion]') 查看 emotion 缓存
    // 2. 在 React DevTools 中查看组件的样式信息（需要 emotion 插件）
    // 3. 在开发环境下，可以通过 window.__EMOTION_VERSION__ 检查 emotion 是否加载
    label: "Component3-Styles", // 建议使用有意义的名称，如：组件名-Styles
  }
);

// Component4 已提取到单独的文件中，以便单独应用 babel-plugin-antd-style 插件

// 组件1：蓝色主题
const Component1: React.FC = () => {
  const { styles } = useStyles1();
  return (
    <div className={styles.container}>
      <div className={styles.title}>组件 1 - 蓝色主题</div>
      <div>
        这个组件使用了 container 样式类名，但我们在label中添加了 container1
        的标识，这个标识会加载class name中去，便于我们寻找
      </div>
      <div>生成的 CSS class 名是唯一的，例如：acss-1ccv8ni-container1</div>
    </div>
  );
};

// 组件2：橙色主题（使用相同的 container 类名）
// 使用 data-* 属性来在类名中显示可读的标识（在开发者工具中可以看到）
// 注意：在生产环境上不会去掉这些属性
const Component2: React.FC = () => {
  const { styles } = useStyles2();
  return (
    <div
      className={styles.container}
      data-label="container2"
      data-component="Component2"
    >
      <div className={styles.title}>组件 2 - 橙色主题</div>
      <div>这个组件也使用了 container 样式类名</div>
      <div>生成的 CSS class 名是唯一的，例如：acss-7kr6hk</div>
      <div>我们在js中添加了data-*="container2"的属性，便于我们寻找</div>
      <div style={{ marginTop: "8px", fontSize: "12px", color: "#999" }}>
        提示：在开发者工具中查看，可以看到 data-label="container2" 属性
      </div>
    </div>
  );
};

// 组件3：绿色主题（使用相同的 container 类名）
// 演示 label 的调试方法
const Component3: React.FC = () => {
  const { styles } = useStyles3();
  return (
    <div className={styles.container}>
      <div className={styles.title}>组件 3 - 绿色主题</div>
      <div>这个组件同样使用了 container 样式类名</div>
      <div>生成的 CSS class 名是唯一的，例如：acss-6fhl5b</div>
      <div>我们在createStyles中的第二个参数添加了label属性</div>
      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: "#666",
          padding: "8px",
          background: "#f0f0f0",
          borderRadius: "4px",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          label 调试说明：
        </div>
        <div>
          1. label 不会显示在类名上，但可以在 emotion 内部调试工具中看到
        </div>
        <div>2. 打开浏览器控制台，尝试以下命令查看 emotion 信息：</div>
        <div
          style={{
            marginLeft: "16px",
            fontFamily: "monospace",
            fontSize: "11px",
            marginTop: "4px",
          }}
        >
          • document.querySelector('[data-emotion]')
          <br />
          • window.__EMOTION_VERSION__
          <br />• 查看 &lt;style&gt; 标签的 data-emotion 属性
        </div>
        <div style={{ marginTop: "4px" }}>
          3. 在 React DevTools 中查看 label（React DevTools 已内置 Emotion
          支持）
          <div
            style={{
              marginLeft: "16px",
              marginTop: "8px",
              fontSize: "11px",
              lineHeight: "1.6",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              步骤一：检查是否已安装 React Developer Tools
            </div>
            <div
              style={{
                marginLeft: "8px",
                marginBottom: "8px",
                padding: "6px",
                background: "#fff",
                borderRadius: "4px",
              }}
            >
              <div>快速检查方法：</div>
              <div>
                ① 按{" "}
                <code
                  style={{
                    background: "#f0f0f0",
                    padding: "2px 4px",
                    borderRadius: "2px",
                  }}
                >
                  F12
                </code>{" "}
                打开开发者工具
              </div>
              <div>
                ② 查看开发者工具顶部是否有 <strong>"⚛️ Components"</strong> 或{" "}
                <strong>"⚛️ Profiler"</strong> 标签
              </div>
              <div>③ 如果有，说明已安装；如果没有，继续下面的安装步骤</div>
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginTop: "8px",
                marginBottom: "4px",
              }}
            >
              步骤二：安装 React Developer Tools（如果未安装...）
            </div>

            <div
              style={{
                fontWeight: "bold",
                marginTop: "12px",
                marginBottom: "4px",
              }}
            >
              步骤三：使用 React DevTools 查看 label
            </div>
            <div style={{ marginLeft: "8px" }}>
              <div>① 打开你的 React 应用页面</div>
              <div>
                ② 按{" "}
                <code
                  style={{
                    background: "#f0f0f0",
                    padding: "2px 4px",
                    borderRadius: "2px",
                  }}
                >
                  F12
                </code>{" "}
                打开开发者工具
              </div>
              <div>
                ③ 在开发者工具顶部找到 <strong>"⚛️ Components"</strong>{" "}
                标签（如果没有看到，点击右上角的{" "}
                <code
                  style={{
                    background: "#f0f0f0",
                    padding: "2px 4px",
                    borderRadius: "2px",
                  }}
                >
                  ⋮
                </code>{" "}
                菜单，选择"更多工具" → "React Developer Tools"）
              </div>
              <div>
                ④ 在左侧组件树中选择使用了{" "}
                <code
                  style={{
                    background: "#f0f0f0",
                    padding: "2px 4px",
                    borderRadius: "2px",
                  }}
                >
                  createStyles
                </code>{" "}
                的组件（如 Component3）
              </div>
              <div>
                ⑤ 在右侧面板中，向下滚动找到 <strong>"hooks"</strong> 或{" "}
                <strong>"rendered by"</strong> 部分
              </div>
              <div>
                ⑥ 如果 React DevTools 版本较新，可能会显示 Emotion
                相关的信息，包括 label
              </div>
              <div style={{ marginTop: "4px", color: "#fa8c16" }}>
                <strong>注意：</strong>如果看不到 label 信息，可能是 React
                DevTools 版本较旧，建议更新到最新版本
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "4px" }}>
          4. label
          的实际意义：帮助开发者在调试时快速识别样式来源，特别是在大型项目中
        </div>
      </div>
    </div>
  );
};

// 外部定义的普通 CSS 类名（用于对比）
// 注意：在浏览器开发者工具中查看，antd-style 生成的类名会是类似这样的格式：
// acss-xxxxxx（xxxxxx 是唯一的哈希值）
const ScopeDemoDebug: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Card
        title="CSS-in-JS 样式封装示例（方便调试）"
        style={{ marginBottom: "24px" }}
      >
        <div style={{ marginBottom: "16px", color: "#666" }}>
          <p>
            <strong>说明：</strong>
          </p>
          <ul>
            <li>
              三个组件都使用了相同的样式类名 <code>container</code> 和{" "}
              <code>title</code>
              ，左边有的特性，这也都有，但是由于变成了hash的形式，所以不便于调试的时候查找。
            </li>
            <li>那么我们怎么解决这个问题呢？</li>
          </ul>
        </div>
      </Card>

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Component1 />
        <Component2 />
        <Component3 />
        <Component4 />
      </Space>

      <Card title="普通 CSS 类名对比与调试建议" style={{ marginTop: "24px" }}>
        <div style={{ marginTop: "16px", color: "#555" }}>
          <div>
            <strong>推荐：</strong>
            开启 <code>babel-plugin-antd-style</code> 插件，可让生成的 class
            name 自动带有语义化标识，方便开发时排查样式来源（仅在{" "}
            <code>dev</code> 环境生效）。
          </div>
          <div style={{ margin: "8px 0 0 0" }}>
            <span style={{ color: "#1677ff" }}>vite 配置示例：</span>
            <pre>
              <code>
                {`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    ['babel-plugin-antd-style', { libraryName: 'antd-style' }],
                ],
            },
        }),
    ],
});
`}
              </code>
            </pre>
          </div>
          <div>
            <span style={{ color: "#fa8c16" }}>注意：</span>
            插件只在本地开发环境有效，线上环境不会附带 label
            信息。如果你需要线上环境也方便调试，可手动为{" "}
            <code>createStyles</code> 添加 <code>label</code> 属性：
            <pre>
              <code>
                {`const useStyles = createStyles(
  ({ css }) => ({
    container: css\` ...,label: 'Component3-Styles', \`,
  })
);`}
              </code>
            </pre>
          </div>
          <div>
            这样生成的类名类似于：<code>acss-xxxxxx-Component3-Styles</code>，
            便于定位样式来源。
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScopeDemoDebug;
