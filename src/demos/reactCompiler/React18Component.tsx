import { useMemo, useCallback, memo, useState } from "react";
import { listStyle, listItemStyle } from "./styles";

/**
 * React 18 方式：需要手动使用 useMemo 和 useCallback 进行优化
 */
interface React18ComponentProps {
  data: number[];
  onItemClick: (item: number) => void;
}

const React18Component = memo(function React18Component({
  data,
  onItemClick,
}: React18ComponentProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // 使用 useMemo 记忆化处理后的数据
  const processedData = useMemo(() => {
    return data.map((item) => item * 2);
  }, [data]);

  // 使用 useCallback 记忆化回调函数
  const handleClick = useCallback(
    (item: number) => {
      onItemClick(item);
    },
    [onItemClick]
  );

  return (
    <ul style={listStyle}>
      {processedData.map((item) => (
        <li
          key={item}
          onClick={() => handleClick(item)}
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
});

export default React18Component;

