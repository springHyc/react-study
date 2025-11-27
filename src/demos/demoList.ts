// Demo 配置列表
import UseImperativeHandleDemo from "./useImperativeHandle";
import OptimizationHooksDemo from "./optimizationHooks";
import UseReducerDemo from "./useReducer";
import BasicHooksDemo from "./basicHooks";

export interface DemoItem {
  id: string;
  name: string;
  component: React.ComponentType;
  description?: string;
}

export const demoList: DemoItem[] = [
  {
    id: "basicHooks",
    name: "基础 Hooks",
    component: BasicHooksDemo,
    description: "useState、useEffect、useRef 的基础用法示例",
  },
  {
    id: "optimizationHooks",
    name: "性能优化 Hooks",
    component: OptimizationHooksDemo,
    description: "useCallback、memo、useMemo 的对比和使用示例",
  },
  {
    id: "useReducer",
    name: "useReducer",
    component: UseReducerDemo,
    description: "useReducer 订阅更新的使用示例",
  },
  {
    id: "useImperativeHandle",
    name: "useImperativeHandle",
    component: UseImperativeHandleDemo,
    description: "forwardRef 和 useImperativeHandle 的用法示例",
  },
];

