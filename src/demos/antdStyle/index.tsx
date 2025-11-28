import React from "react";
import { Row, Col } from "antd";
import { createStyles } from "antd-style";
import ScopeDemo from "./ScopeDemo";
import ScopeDemoDebug from "./ScopeDemoDebug";

const useStyles = createStyles(({ css }) => ({
  container: css`
    padding: 24px;
  `,
  leftCol: css`
    padding-right: 12px;
  `,
  rightCol: css`
    padding-left: 12px;
  `,
}));

// antd-style 特性试验 Demo
// 展示 ScopeDemo 和 ScopeDemoDebug 两个组件
const AntdStyleDemo: React.FC = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col span={12} className={styles.leftCol}>
          <ScopeDemo />
        </Col>
        <Col span={12} className={styles.rightCol}>
          <ScopeDemoDebug />
        </Col>
      </Row>
    </div>
  );
};

export default AntdStyleDemo;
