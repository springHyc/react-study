// Demo 配置列表
import UseImperativeHandleDemo from "./useImperativeHandle";

export interface DemoItem {
  id: string;
  name: string;
  component: React.ComponentType;
  description?: string;
}

export const demoList: DemoItem[] = [
  {
    id: "useImperativeHandle",
    name: "useImperativeHandle",
    component: UseImperativeHandleDemo,
    description: "forwardRef 和 useImperativeHandle 的用法示例",
  },
  // 后续可以在这里添加更多 demo
];

