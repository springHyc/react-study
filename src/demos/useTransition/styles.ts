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

// 区域样式
export const sectionStyle = {
  marginBottom: "30px",
};

// 按钮容器样式
export const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginBottom: "30px",
  justifyContent: "center",
};

// 按钮样式（复用工具函数）
export const getButtonStyleByType = getButtonStyle;

// 输入框样式
export const inputStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  border: `2px solid ${theme.border.default}`,
  borderRadius: "6px",
  width: "100%",
  maxWidth: "400px",
  backgroundColor: theme.input.bg,
  color: theme.text.primary,
  transition: "all 0.3s ease",
  boxSizing: "border-box" as const,
};

// 列表容器样式
export const listContainerStyle = {
  marginTop: "15px",
  padding: "15px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "6px",
  border: `1px solid ${theme.border.default}`,
};

// 列表项样式
export const listItemStyle = {
  padding: "8px 12px",
  marginBottom: "4px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "4px",
  fontSize: "14px",
  color: theme.text.primary,
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

// 状态指示器样式
export const statusIndicatorStyle = {
  display: "inline-block",
  marginLeft: "10px",
  padding: "4px 12px",
  backgroundColor: "#FF9800",
  color: "white",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "normal" as const,
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
};

