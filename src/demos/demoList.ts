// Demo 配置列表
import UseImperativeHandleDemo from "./useImperativeHandle";
import OptimizationHooksDemo from "./optimizationHooks";
import UseReducerDemo from "./useReducer";
import BasicHooksDemo from "./basicHooks";
import AntdStyleDemo from "./antdStyle";
import UseTransitionDemo from "./useTransition";
import UseTransitionVsLoadingDemo from "./useTransitionVsLoading";
import UseDeferredValueDemo from "./useDeferredValue";
import TestDemo from "./testdemo";
import ComponentCommunicationDemo from "./componentCommunication";
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
    id: "useDeferredValue",
    name: "useDeferredValue",
    component: UseDeferredValueDemo,
    description:
      "useDeferredValue 的用法示例，用于延迟一个值的更新。应用场景：React 渲染一个大型列表时，一旦用户进行了键盘输入，React 会放弃该列表渲染，先处理键盘输入，然后再次开始在后台界面渲染。同时对比 useDeferredValue 和 useTransition 的区别",
  },
  {
    id: "testdemo",
    name: "testdemo",
    component: TestDemo,
    description: "测试用的 Demo",
  },
  {
    id: "componentCommunication",
    name: "组件通信",
    component: ComponentCommunicationDemo,
    description:
      "React 组件通信的 4 种方式：父传子（props）、子传父（回调函数）、兄弟组件通信（共同父组件）、跨层通信（useContext）",
  },
];
