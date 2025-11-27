import { useReducer, useEffect, useRef, useState } from "react";
import {
  containerStyle,
  titleStyle,
  cardStyle,
  cardTitleStyle,
  buttonContainerStyle,
  getButtonStyleByType,
  stateDisplayStyle,
  subscriptionListStyle,
  subscriptionItemStyle,
  descriptionStyle,
  descriptionTitleStyle,
  listStyle,
} from "./styles";

// 定义状态类型
interface CounterState {
  count: number;
  step: number;
  history: number[];
}

// 定义 Action 类型
type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setStep"; payload: number }
  | { type: "addToHistory" };

// 订阅者类型
type Subscriber = (state: CounterState) => void;

// 创建带订阅功能的 reducer
class ReducerWithSubscription {
  private subscribers: Set<Subscriber> = new Set();
  private currentState: CounterState;

  constructor(initialState: CounterState) {
    this.currentState = initialState;
  }

  // 订阅状态变化
  subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    // 立即通知当前状态
    subscriber(this.currentState);
    // 返回取消订阅函数
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  // 通知所有订阅者
  private notify(state: CounterState) {
    this.currentState = state;
    this.subscribers.forEach((subscriber) => subscriber(state));
  }

  // Reducer 函数
  reducer = (state: CounterState, action: CounterAction): CounterState => {
    let newState: CounterState;

    switch (action.type) {
      case "increment":
        newState = {
          ...state,
          count: state.count + state.step,
        };
        break;
      case "decrement":
        newState = {
          ...state,
          count: state.count - state.step,
        };
        break;
      case "reset":
        newState = {
          ...state,
          count: 0,
          history: [],
        };
        break;
      case "setStep":
        newState = {
          ...state,
          step: action.payload,
        };
        break;
      case "addToHistory":
        newState = {
          ...state,
          history: [...state.history, state.count],
        };
        break;
      default:
        return state;
    }

    // 通知所有订阅者
    this.notify(newState);
    return newState;
  };
}

// 初始状态
const initialState: CounterState = {
  count: 0,
  step: 1,
  history: [],
};

/**
 * useReducer 订阅更新示例
 *
 * 这个示例展示了如何在使用 useReducer 时实现订阅模式，
 * 让多个组件可以订阅同一个状态的变化
 */
const UseReducerDemo = () => {
  // 创建带订阅功能的 reducer 实例
  const reducerInstanceRef = useRef(new ReducerWithSubscription(initialState));
  const [state, dispatch] = useReducer(
    reducerInstanceRef.current.reducer,
    initialState
  );

  // 订阅者 1: 显示当前状态
  const [subscriber1State, setSubscriber1State] = useState<CounterState>(state);
  useEffect(() => {
    const unsubscribe = reducerInstanceRef.current.subscribe((newState) => {
      setSubscriber1State(newState);
    });
    return unsubscribe;
  }, []);

  // 订阅者 2: 记录历史变化
  const [subscriber2State, setSubscriber2State] = useState<CounterState>(state);
  useEffect(() => {
    const unsubscribe = reducerInstanceRef.current.subscribe((newState) => {
      setSubscriber2State(newState);
    });
    return unsubscribe;
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>useReducer 订阅更新示例</h2>

      {/* 主控制器 */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>主控制器</h3>
        <div style={stateDisplayStyle}>
          {JSON.stringify(state, null, 2)}
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => dispatch({ type: "increment" })}
            style={getButtonStyleByType("primary")}
          >
            增加 (+{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "decrement" })}
            style={getButtonStyleByType("danger")}
          >
            减少 (-{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "reset" })}
            style={getButtonStyleByType("warning")}
          >
            重置
          </button>
          <button
            onClick={() => dispatch({ type: "addToHistory" })}
            style={getButtonStyleByType("success")}
          >
            记录到历史
          </button>
        </div>
        <div style={buttonContainerStyle}>
          <label style={{ color: "var(--text-primary)", marginRight: "10px" }}>
            步长:
          </label>
          <input
            type="number"
            value={state.step}
            onChange={(e) =>
              dispatch({ type: "setStep", payload: Number(e.target.value) })
            }
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              border: "1px solid var(--input-border)",
              width: "80px",
            }}
          />
        </div>
      </div>

      {/* 订阅者 1 */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>订阅者 1: 状态监听器</h3>
        <div style={stateDisplayStyle}>
          {JSON.stringify(subscriber1State, null, 2)}
        </div>
        <div style={subscriptionListStyle}>
          <div style={subscriptionItemStyle}>
            这个组件通过订阅模式监听状态变化，即使不直接使用 dispatch，
            也能实时获取最新的状态更新
          </div>
        </div>
      </div>

      {/* 订阅者 2 */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>订阅者 2: 历史记录器</h3>
        <div style={stateDisplayStyle}>
          当前计数: {subscriber2State.count}
        </div>
        <div style={subscriptionListStyle}>
          <div style={{ marginBottom: "10px", color: "var(--text-primary)" }}>
            历史记录:
          </div>
          {subscriber2State.history.length === 0 ? (
            <div style={subscriptionItemStyle}>暂无历史记录</div>
          ) : (
            subscriber2State.history.map((value, index) => (
              <div key={index} style={subscriptionItemStyle}>
                {index + 1}. {value}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={descriptionStyle}>
        <h3 style={descriptionTitleStyle}>核心概念：</h3>
        <ul style={listStyle}>
          <li>
            <strong>useReducer</strong>: 用于管理复杂的状态逻辑，比 useState 更适合处理多个子值的状态
          </li>
          <li>
            <strong>订阅模式</strong>: 通过订阅机制，多个组件可以监听同一个状态的变化
          </li>
          <li>
            <strong>使用场景</strong>: 当需要多个组件共享和响应同一个状态时，订阅模式非常有用
          </li>
          <li>
            <strong>优势</strong>: 解耦状态管理和组件，让状态变化可以被多个地方监听和响应
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerDemo;

