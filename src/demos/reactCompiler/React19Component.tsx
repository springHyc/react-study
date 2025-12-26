import { useState } from "react";
import { listStyle, listItemStyle } from "./styles";

/**
 * React 19 方式：编译器自动优化，无需手动使用 useMemo 和 useCallback
 * 
 * 注意：在实际使用中，需要配置 React Compiler 才能生效
 * 这里展示的是代码写法，编译器会自动进行以下优化：
 * 1. 自动记忆化 processedData 的计算
 * 2. 自动优化回调函数的传递
 * 3. 自动跳过不必要的重新渲染
 */
interface React19ComponentProps {
  data: number[];
  onItemClick: (item: number) => void;
}

function React19Component({ data, onItemClick }: React19ComponentProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // 编译器会自动记忆化这个计算结果
  const processedData = data.map((item) => item * 2);

  return (
    <ul style={listStyle}>
      {processedData.map((item) => (
        <li
          key={item}
          onClick={() => onItemClick(item)}
          onMouseEnter={() => setHoveredItem(item)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            ...listItemStyle,
            backgroundColor:
              hoveredItem === item
                ? "rgba(76, 175, 80, 0.2)"
                : listItemStyle.backgroundColor,
            transform: hoveredItem === item ? "translateX(5px)" : "translateX(0)",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default React19Component;

