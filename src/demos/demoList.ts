// Demo 配置列表
import UseImperativeHandleDemo from "./useImperativeHandle";
import OptimizationHooksDemo from "./optimizationHooks";
import UseReducerDemo from "./useReducer";
import BasicHooksDemo from "./basicHooks";
import AntdStyleDemo from "./antdStyle";
import UseTransitionDemo from "./useTransition";
import UseTransitionVsLoadingDemo from "./useTransitionVsLoading";
import TestDemo from "./testdemo";
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
  {
    id: "antdStyle",
    name: "antd-style",
    component: AntdStyleDemo,
    description: "antd-style 特性试验示例",
  },
  {
    id: "useTransition",
    name: "useTransition",
    component: UseTransitionDemo,
    description:
      "useTransition 和 startTransition 的用法示例，用于优化大量状态更新时的 UI 响应性",
  },
  {
    id: "useTransitionVsLoading",
    name: "useTransition vs loading",
    component: UseTransitionVsLoadingDemo,
    description:
      "对比 useTransition 和普通 useState 设置 loading 状态的区别，展示两种实现方式的差异和适用场景",
  },
  {
    id: "testdemo",
    name: "testdemo",
    component: TestDemo,
    description: "测试用的 Demo",
  },
];
