---
title: 结构布局
---

# 结构布局

用于组织演示文稿结构的布局 - 标题页、章节和结束页。

## cover - 标题页

**用于：** 演示文稿的第一张幻灯片

![封面布局示例](/images/layouts/cover.png)

```markdown
---
layout: cover
authors:
  - name: 你的名字
    institution: 你的大学
    email: you@example.edu
footerMiddle: 2025 年会议名称
---

# 你的演示标题
副标题或描述
```

**显示内容：**

- 居中的大标题
- 带有单位和邮箱的作者信息
- 带有作者、会议和页码的页脚

---

## default - 标准内容

**用于：** 大部分幻灯片（这是自动的！）

![默认布局示例](/images/layouts/default.png)

```markdown
---
title: 我的幻灯片标题
subtitle: 可选的副标题
---

# 主要内容

- 要点 1
- 要点 2

你可以添加文本、图片、代码、数学公式等。
```

**显示内容：**

- 可选的带有标题和副标题的页眉
- 中间的内容
- 底部的页脚

---

## intro - 章节介绍

**用于：** 开始报告的新部分

![章节介绍布局示例](/images/layouts/intro.png)

```markdown
---
layout: intro
---

# 第二部分：研究方法

让我们讨论我们的方法
```

**显示内容：**

- 大字号、居中的文本
- 无页眉（为标题留出更多空间）
- 底部的页脚

---

## section - 章节分隔符

**用于：** 演示中的重大转换

![章节布局示例](/images/layouts/section.png)

```markdown
---
layout: section
sectionMode: dark  # 或 'light'（可选，默认：dark）
---

# 研究结果
```

**显示内容：**

- 非常大的居中标题
- 无页眉
- 底部的页脚
- 完美的戏剧性章节分隔

**sectionMode 选项：**

| 值 | 描述 |
|-------|-------------|
| `dark` | 深色背景配浅色文字（默认） |
| `light` | 浅色背景配深色文字 |

**全局与单页配置：**

你可以在首页的 headmatter 中设置全局默认值：

```yaml
---
theme: scholarly
themeConfig:
  sectionMode: light  # 所有 section 默认使用浅色模式
---
```

然后在特定幻灯片上覆盖：

```yaml
---
layout: section
sectionMode: dark  # 覆盖全局设置
---

# 此章节使用深色模式
```

---

## center - 居中内容

**用于：** 简短信息或关键要点

![居中布局示例](/images/layouts/center.png)

```markdown
---
layout: center
---

# 核心结论

这是最重要的观点
```

**显示内容：**

- 所有内容水平和垂直居中
- 非常适合强调

---

## auto-center - 自动调整内容

**用于：** 需要自动调整字体大小的内容

![自动居中布局示例](/images/layouts/auto-center.png)

```markdown
---
layout: auto-center
title: 标题
subtitle: 副标题
---

## 自动居中内容

此布局会自动调整字体大小以适应内容。
```

**显示内容：**

- 根据内容长度自动调整字体大小
- 内容垂直居中
- 在居中块内保持文本左对齐

---

## end - 致谢页

**用于：** 带有联系信息的专业结束幻灯片

![致谢页布局示例](/images/layouts/end.png)

```markdown
---
layout: end
email: zhangsan@tsinghua.edu.cn
website: https://example.com/project
subtitle: 问题？
qrcode: https://example.com/qr.png
qrcodeLabel: 扫码获取论文
---

感谢您的聆听！
```

**属性：**
- `thankYou`：自定义感谢文本（默认："谢谢！"）
- `subtitle`：副标题文本
- `email`：联系邮箱
- `website`：项目/个人网站
- `qrcode`：二维码图片 URL
- `qrcodeLabel`：二维码标签
