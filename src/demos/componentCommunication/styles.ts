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

// 演示区域容器样式
export const demoSectionStyle = {
  marginBottom: "40px",
  padding: "20px",
  backgroundColor: theme.bg.secondary,
  borderRadius: "8px",
  border: `2px solid ${theme.border.default}`,
};

// 演示区域标题样式
export const demoSectionTitleStyle = {
  color: theme.text.primary,
  marginTop: 0,
  marginBottom: "20px",
  fontSize: "20px",
  fontWeight: "bold" as const,
};

// 演示区域描述样式
export const demoSectionDescStyle = {
  color: theme.text.secondary,
  marginBottom: "20px",
  fontSize: "14px",
  lineHeight: "1.6",
};

// 演示内容容器样式
export const demoContentStyle = {
  padding: "20px",
  backgroundColor: theme.bg.tertiary,
  borderRadius: "6px",
  border: `1px solid ${theme.border.light}`,
};

// 按钮样式（复用工具函数）
export const getButtonStyleByType = getButtonStyle;

// 输入框样式
export const inputStyle = {
  padding: "8px 12px",
  fontSize: "14px",
  border: `2px solid ${theme.border.default}`,
  borderRadius: "4px",
  backgroundColor: theme.input.bg,
  color: theme.text.primary,
  transition: "all 0.3s ease",
  boxSizing: "border-box" as const,
};

// 显示区域样式
export const displayAreaStyle = {
  marginTop: "15px",
  padding: "15px",
  backgroundColor: theme.bg.card,
  borderRadius: "6px",
  border: `1px solid ${theme.border.default}`,
  minHeight: "50px",
  color: theme.text.primary,
};

// 标签样式
export const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: theme.text.primary,
  fontSize: "14px",
  fontWeight: "500" as const,
};

