import { theme, getButtonStyle } from "../../utils/theme";

// 容器样式
export const containerStyle = {
  padding: "20px",
  maxWidth: "1400px",
  margin: "0 auto",
  backgroundColor: theme.bg.primary,
  minHeight: "calc(100vh - 60px)",
};

// 标题样式
export const titleStyle = {
  color: theme.text.primary,
  marginBottom: "30px",
};

// 对比容器样式
export const comparisonContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

// 对比盒子样式
export const comparisonBoxStyle = {
  padding: "20px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "8px",
  border: `2px solid ${theme.border.default}`,
};

// 盒子标题样式
export const boxTitleStyle = {
  marginTop: 0,
  marginBottom: "15px",
  color: theme.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// 渲染计数样式
export const renderCountStyle = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "#4CAF50",
  color: "white",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "normal" as const,
};

// 列表样式
export const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  maxHeight: "300px",
  overflowY: "auto" as const,
};

// 列表项样式
export const listItemStyle = {
  padding: "10px 15px",
  marginBottom: "8px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  color: theme.text.primary,
  transition: "all 0.2s ease",
  border: `1px solid ${theme.border.light}`,
};

// 按钮样式
export const buttonStyle = {
  ...getButtonStyle("primary"),
  fontSize: "14px",
  padding: "8px 16px",
};

// 说明区域样式
export const descriptionContainerStyle = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "6px",
  fontSize: "14px",
  color: theme.text.primary,
};

// 说明标题样式
export const descriptionTitleStyle = {
  marginTop: 0,
  marginBottom: "15px",
  color: theme.text.primary,
};

// 说明列表样式
export const descriptionListStyle = {
  lineHeight: "1.8",
  color: theme.text.secondary,
  margin: 0,
  paddingLeft: "20px",
};

// 代码块样式
export const codeBlockStyle = {
  padding: "15px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "4px",
  border: `1px solid ${theme.border.light}`,
  fontSize: "13px",
  fontFamily: "'Courier New', monospace",
  overflowX: "auto" as const,
  marginTop: "15px",
  color: theme.text.primary,
};

