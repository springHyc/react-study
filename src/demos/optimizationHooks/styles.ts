import { theme, getButtonStyle } from "../../utils/theme";

// 容器样式
export const containerStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: theme.bg.primary,
  minHeight: "calc(100vh - 60px)",
};

// 标题样式
export const titleStyle = {
  color: theme.text.primary,
  marginBottom: "20px",
};

// 对比卡片容器样式
export const comparisonContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

// 卡片样式
export const cardStyle = {
  padding: "20px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "8px",
  border: `1px solid ${theme.border.default}`,
};

// 卡片标题样式
export const cardTitleStyle = {
  color: theme.text.primary,
  marginTop: 0,
  marginBottom: "15px",
  fontSize: "18px",
};

// 按钮样式
export const getButtonStyleByType = getButtonStyle;

// 按钮容器样式
export const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginBottom: "15px",
};

// 计数器显示样式
export const counterStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: theme.color.primary,
  marginBottom: "15px",
};

// 渲染次数显示样式
export const renderCountStyle = {
  fontSize: "14px",
  color: theme.text.secondary,
  marginBottom: "10px",
};

// 说明区域样式
export const descriptionStyle = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "8px",
  fontSize: "14px",
  lineHeight: "1.8",
  color: theme.text.primary,
};

// 说明标题样式
export const descriptionTitleStyle = {
  marginTop: 0,
  color: theme.text.primary,
  marginBottom: "15px",
};

// 列表样式
export const listStyle = {
  margin: 0,
  paddingLeft: "20px",
  color: theme.text.secondary,
};

