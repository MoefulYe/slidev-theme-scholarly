---
title: 引用
---

# 引用

主题内置了使用 BibTeX 文件的学术引用支持。引用会自动收集并生成参考文献。

## 配置

在 frontmatter 中配置引用设置：

```yaml
---
theme: scholarly
bibFile: references.bib  # BibTeX 文件路径（默认：references.bib）
bibStyle: apa            # 引用样式
bibShowNum: false        # 参考文献是否显示数字标记（如 [1]）
---
```

**支持的样式：**

- `apa`（默认）
- `harvard1`
- `vancouver`
- `ieee`
- `mla`
- `chicago-author-date`

## 基本用法

### 括号引用

使用 `@citekey` 进行括号引用：

```markdown
深度学习已经革新了人工智能 @lecun2015deep。
```

渲染为：深度学习已经革新了人工智能 (LeCun 等, 2015)。

### 叙述性引用

使用 `!@citekey` 进行叙述性（作者突出）引用：

```markdown
!@vaswani2017attention 提出了 Transformer 架构。
```

渲染为：Vaswani 等 (2017) 提出了 Transformer 架构。

### 多个引用

```markdown
最近的进展 @smith2023deep @wang2022attention 表明...
```

## Markdown 注脚

标准 Markdown 注脚开箱即用，不需要额外的主题语法：

```markdown
我们的紧凑模型在五个随机种子下依然稳定[^1]。

[^1]: 验证集准确率波动小于 0.3 个百分点。
```

在 Slidev 的交互视图中，主题会自动为注脚应用学术化样式：

- 桌面端悬停注脚标记即可预览内容
- 点击标记可固定浮窗
- 按 `Esc` 或点击外部即可关闭

你也可以通过 slide frontmatter 按页控制显示方式：

```markdown
---
footnoteDisplay: both
---
```

- `footnoteDisplay: both` 同时保留底部注脚和行内 hover / click 预览
- `footnoteDisplay: hover-only` 隐藏底部注脚，只保留行内预览
- `footnoteDisplay: notes-only` 保留底部注脚，并关闭 hover / click 浮窗

打印或导出时，注脚会回退为幻灯片底部的普通注脚列表。

## 参考文献

添加带有 `[[bibliography]]` 标记的参考文献幻灯片：

```markdown
---
layout: references
---

[[bibliography]]
```

参考文献会自动从幻灯片中使用的所有引用生成。

## 分页

对于较长的参考文献列表，使用分页：

```markdown
---
layout: references
perPage: 5
page: 1
---

[[bibliography]]

---
layout: references
perPage: 5
page: 2
title: "参考文献（续）"
---

[[bibliography]]
```

## BibTeX 文件示例

在项目根目录创建 `references.bib` 文件：

```bibtex
@article{lecun2015deep,
  title={Deep learning},
  author={LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey},
  journal={Nature},
  volume={521},
  pages={436--444},
  year={2015}
}

@inproceedings{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and others},
  booktitle={NeurIPS},
  year={2017}
}
```

## Cite 组件（手动）

`<Cite>` 组件是一个轻量的手动引用/注记组件（非 BibTeX）。BibTeX 引用请优先使用 `@citekey` / `!@citekey`。

### 作者-年份标记（传统写法）

```markdown
<Cite author="张三等" year="2024" />
```

渲染为：(张三等, 2024)

也可以附带引用上下文：

```markdown
<Cite author="张三等" year="2024">
引用上下文
</Cite>
```

### 数字标记

```markdown
<Cite :inline="true">
引用上下文
</Cite>
```

也可以固定 `id`：

```markdown
<Cite :inline="false" :id="1">
参考条目
</Cite>
```
