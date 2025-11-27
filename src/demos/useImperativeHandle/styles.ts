import { theme, getButtonStyle } from "../../utils/theme";

// 容器样式
export const containerStyle = {
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: theme.bg.primary,
  minHeight: "calc(100vh - 60px)",
};

// 标题样式
export const titleStyle = {
  color: theme.text.primary,
};

// 输入框容器样式
export const inputContainerStyle = {
  marginBottom: "20px",
};

// 按钮容器样式
export const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginBottom: "20px",
};

// 按钮样式（复用工具函数）
export const getButtonStyleByType = getButtonStyle;

// 显示值容器样式
export const displayValueStyle = {
  padding: "10px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "4px",
  marginTop: "10px",
  color: theme.text.primary,
};

// 说明区域样式
export const descriptionContainerStyle = {
  marginTop: "30px",
  padding: "15px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "4px",
  fontSize: "14px",
  color: theme.text.primary,
};

// 说明标题样式
export const descriptionTitleStyle = {
  marginTop: 0,
  color: theme.text.primary,
};

// 说明列表样式
export const descriptionListStyle = {
  lineHeight: "1.8",
  color: theme.text.secondary,
};

// 输入框基础样式
export const inputBaseStyle = {
  padding: "8px 12px",
  fontSize: "16px",
  border: `1px solid ${theme.input.border}`,
  borderRadius: "4px",
  width: "300px",
  backgroundColor: theme.input.bg,
  color: theme.text.primary,
  transition: "all 0.3s ease",
};
