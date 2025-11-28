import React from "react";
import { createStyles } from "antd-style";

// Component4 的样式定义
// 这个组件使用了 babel-plugin-antd-style 插件，会在生成的 class name 中添加可读标识
// 注意：不要手动添加第二个参数，否则插件不会自动添加 __BABEL_FILE_NAME__
const useStyles4 = createStyles(() => ({
  container: {
    backgroundColor: "#fff1f0",
    border: "2px solid #ffccc7",
    padding: "20px",
    borderRadius: "8px",
    margin: "10px 0",
  },
  title: {
    color: "#a8071a",
    fontSize: "16px",
    fontWeight: "bold",
  },
}));

// 组件4：红色主题
// 这个组件使用了插件：babel-plugin-antd-style，这个插件会在生成的class name中添加标识，仅 dev 生效。
const Component4: React.FC = () => {
  const { styles } = useStyles4();
  return (
    <div className={styles.container}>
      <div className={styles.title}>组件 4 - 红色主题</div>
      <div>
        这个组件同样使用了 container
        样式类名，并且使用插件：babel-plugin-antd-style，这个插件会在生成的class
        name中添加标识，仅 dev 生效。
      </div>
      <div style={{ marginTop: "8px", fontSize: "12px", color: "#999" }}>
        提示：注意：不要在createStyles手动添加第二个参数，否则插件不会自动添加
        __BABEL_FILE_NAME__
      </div>
    </div>
  );
};

export default Component4;
