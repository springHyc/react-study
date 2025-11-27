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

// 卡片样式
export const cardStyle = {
  padding: "20px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "8px",
  border: `1px solid ${theme.border.default}`,
  marginBottom: "20px",
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

// 输入框样式
export const inputStyle = {
  padding: "8px 12px",
  fontSize: "16px",
  border: `1px solid ${theme.input.border}`,
  borderRadius: "4px",
  width: "300px",
  backgroundColor: theme.input.bg,
  color: theme.text.primary,
  marginRight: "10px",
};

// 状态显示样式
export const stateDisplayStyle = {
  padding: "15px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "4px",
  marginBottom: "15px",
  fontSize: "14px",
  color: theme.text.primary,
  fontFamily: "monospace",
};

// 日志区域样式
export const logContainerStyle = {
  maxHeight: "200px",
  overflowY: "auto" as const,
  padding: "10px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "4px",
  fontSize: "12px",
  fontFamily: "monospace",
  color: theme.text.secondary,
};

// 日志项样式
export const logItemStyle = {
  marginBottom: "5px",
  padding: "5px",
  borderLeft: `3px solid ${theme.color.primary}`,
  paddingLeft: "10px",
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

