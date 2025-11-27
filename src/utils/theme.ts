// 主题工具函数，用于在组件中获取主题相关的样式对象

export const theme = {
  // 背景色
  bg: {
    primary: "var(--bg-primary)",
    secondary: "var(--bg-secondary)",
    tertiary: "var(--bg-tertiary)",
    card: "var(--bg-card)",
  },
  // 文字颜色
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    tertiary: "var(--text-tertiary)",
  },
  // 边框颜色
  border: {
    default: "var(--border-color)",
    light: "var(--border-color-light)",
  },
  // 阴影
  shadow: {
    default: "var(--shadow)",
    hover: "var(--shadow-hover)",
  },
  // 主题色
  color: {
    primary: "var(--primary-color)",
    primaryHover: "var(--primary-hover)",
    success: "var(--success-color)",
    danger: "var(--danger-color)",
    warning: "var(--warning-color)",
  },
  // 输入框
  input: {
    bg: "var(--input-bg)",
    border: "var(--input-border)",
  },
};

// 获取带阴影的样式对象
export const getShadowStyle = (hover = false) => ({
  boxShadow: hover ? `0 4px 12px ${theme.shadow.hover}` : `0 2px 8px ${theme.shadow.default}`,
});

// 获取卡片样式
export const getCardStyle = () => ({
  backgroundColor: theme.bg.card,
  border: `1px solid ${theme.border.default}`,
  borderRadius: "8px",
  padding: "20px",
  transition: "all 0.3s ease",
});

// 获取按钮样式
export const getButtonStyle = (variant: "primary" | "success" | "danger" | "warning" = "primary") => {
  const colorMap = {
    primary: theme.color.primary,
    success: theme.color.success,
    danger: theme.color.danger,
    warning: theme.color.warning,
  };

  return {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: colorMap[variant],
    color: variant === "warning" ? "#000" : "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };
};

