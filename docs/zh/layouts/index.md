---
title: 布局
---

# 布局

布局定义了每张幻灯片上内容的排列方式。选择合适的布局来有效展示你的内容。

## 可用布局

### [基础布局](./basic.md)

大多数演示文稿的基本布局：

| 布局 | 用途 |
|------|------|
| `cover` | 标题页 |
| `default` | 标准内容 |
| `intro` | 章节介绍 |
| `section` | 章节分隔 |
| `center` | 居中内容 |
| `quote` | 引用 |
| `fact` | 关键数据 |
| `statement` | 重要陈述 |
| `two-cols` | 双栏内容 |
| `image-left` | 左图右文 |
| `image-right` | 左文右图 |

### [高级布局 (v2.0)](./advanced.md)

专为学术演示设计的新布局：

| 布局 | 用途 |
|------|------|
| `focus` | 突出关键问题 |
| `compare` | 并排对比 |
| `bullets` | 增强列表 |
| `figure` | 学术图片带标题 |
| `references` | 参考文献 |
| `end` | 致谢页 |

## 如何使用

在幻灯片的 frontmatter 中指定布局：

```markdown
---
layout: section
---

# 我的章节标题
```

如果不指定布局，将自动使用 `default`。
