# CSS-in-JS

## 1. antd-style

### 1.1 作用域 demo

```tsx
const useStyles = createStyles(({ css }) => ({
  container: css`
    padding: 24px;
  `,
}));

<div className={styles.container}>...</div>;
```

成的 CSS class 名是唯一的，例如：acss-7kr6hk 会转成 hash 的形式，prefix，emotion 样式前缀，默认值为 acss。

## 2. 嵌套样式会被捋平

```tsx
// 列表页面通用样式
export const useListStyles = createStyles(({ css }) => ({
  commonListContainer: css`
    .filterCard {
      margin-bottom: ${spacingLg}px;
      background: ${backgroundColor};

      .filterContainer {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .filterLeft {
          flex: 1;

          .ant-form {
            .ant-form-item {
              margin-bottom: ${spacingLg}px;
            }
          }
        }

        .filterRight {
          margin-left: ${spacingLg}px;
          white-space: nowrap;
        }
      }
    }

    .tableCard {
      background: ${backgroundColor};

      .ant-table-wrapper {
        .ant-table {
          .ant-table-thead {
            > tr > th {
              background: ${backgroundColorLight};
              font-weight: 500;
            }
          }

          .ant-table-tbody {
            > tr > td {
              .ant-btn-link {
                padding: 0 8px;

                &:first-child {
                  padding-left: 0;
                }
              }
            }
          }
        }
      }
    }
  `,
}));
```

这样写的样式，在浏览器 header style 中，不会生成唯一的 class name，嵌套的样式会被捋平。
