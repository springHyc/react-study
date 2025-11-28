import React from "react";
import { Card, Space } from "antd";
import { createStyles } from "antd-style";

// 示例：证明 CSS-in-JS 库（antd-style）会生成独一无二的 CSS class 名
// 即使不同组件使用相同的样式类名（如 container），生成的 CSS class 名也是唯一的
// 这样可以实现样式封装，使样式只作用于各自的组件，不会互相影响

// 第一个组件：使用 container 样式类名
const useStyles1 = createStyles(({ css }) => ({
  container: css`
    background-color: #e6f7ff;
    border: 2px solid #1890ff;
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
  `,
  title: css`
    color: #1890ff;
    font-size: 16px;
    font-weight: bold;
  `,
}));

// 第二个组件：也使用 container 样式类名，但样式完全不同
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
const useStyles3 = createStyles(({ css }) => ({
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
}));

// 组件1：蓝色主题
const Component1: React.FC = () => {
  const { styles } = useStyles1();
  return (
    <div className={styles.container}>
      <div className={styles.title}>组件 1 - 蓝色主题</div>
      <div>这个组件使用了 container 样式类名</div>
      <div>生成的 CSS class 名是唯一的，例如：acss-1ftfulx</div>
    </div>
  );
};

// 组件2：橙色主题（使用相同的 container 类名）
const Component2: React.FC = () => {
  const { styles } = useStyles2();
  return (
    <div className={styles.container}>
      <div className={styles.title}>组件 2 - 橙色主题</div>
      <div>这个组件也使用了 container 样式类名</div>
      <div>生成的 CSS class 名是唯一的，例如：acss-7kr6hk</div>
    </div>
  );
};

// 组件3：绿色主题（使用相同的 container 类名）
const Component3: React.FC = () => {
  const { styles } = useStyles3();
  return (
    <div className={styles.container}>
      <div className={styles.title}>组件 3 - 绿色主题</div>
      <div>这个组件同样使用了 container 样式类名</div>
      <div>生成的 CSS class 名是唯一的，例如：acss-6fhl5b</div>
    </div>
  );
};

// 外部定义的普通 CSS 类名（用于对比）
// 注意：在浏览器开发者工具中查看，antd-style 生成的类名会是类似这样的格式：
// acss-xxxxxx（xxxxxx 是唯一的哈希值）
const ScopeDemo: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Card title="CSS-in-JS 样式封装示例" style={{ marginBottom: "24px" }}>
        <div style={{ marginBottom: "16px", color: "#666" }}>
          <p>
            <strong>说明：</strong>
          </p>
          <ul>
            <li>
              三个组件都使用了相同的样式类名 <code>container</code> 和{" "}
              <code>title</code>
            </li>
            <li>
              但 antd-style 会为每个组件生成唯一的 CSS class 名（包含哈希值）
            </li>
            <li>因此每个组件的样式是独立的，不会互相影响</li>
            <li>
              打开浏览器开发者工具，可以看到生成的类名类似：
              <code>acss-1ftfulx</code>
            </li>
          </ul>
        </div>
      </Card>

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Component1 />
        <Component2 />
        <Component3 />
      </Space>

      <Card title="对比：普通 CSS 类名" style={{ marginTop: "24px" }}>
        <div style={{ marginTop: "16px" }}>
          <p>
            如果使用普通的 CSS 类名（如 <code>className="container"</code>），
            所有使用相同类名的元素都会应用相同的样式，无法实现样式隔离。
          </p>
          <p>而 CSS-in-JS 通过生成唯一的类名，实现了真正的样式封装和隔离。</p>
        </div>
      </Card>
    </div>
  );
};

export default ScopeDemo;
