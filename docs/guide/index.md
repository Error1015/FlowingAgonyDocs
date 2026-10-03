# 快速开始

**白门的奇异附魔：苦痛长河：重生**（MarbleGate's Exotic Enchantment: Flowing Agony: Reborn）是《白门的奇异附魔：苦痛长河》的重制与移植版。它围绕附魔系统展开，在保留原作构思的前提下重写了实现，并加入了新的附魔与状态效果。

本站是这份模组的完整中文/英文资料站：59 个附魔按 11 个分类整理，逐条列出适用物品、最高等级、刷新权重、冲突附魔与**完整效果数值**。

## 环境要求

| 项目 | 要求 |
| --- | --- |
| 游戏版本 | 1.20.1 / 1.19.2 |
| 模组加载器 | Forge |
| 前置模组 | [Kotlin for Forge](https://www.mcmod.cn/class/2890.html) |
| 运行环境 | 客户端需装 · 服务端需装 |
| 开源协议 | 3-Clause BSD License |

::: warning 前置模组不能省
Kotlin for Forge 是本模组唯一但**必需**的前置。没有它，游戏会在加载阶段直接崩溃。
:::

## 安装

1. **安装 Forge。** 为对应的游戏版本装好 Forge 加载器，并至少启动一次游戏以生成 `mods` 目录。
2. **安装前置。** 把 Kotlin for Forge 的 jar 放进 `mods` 文件夹。
3. **放入本模组。** 把 Flowing Agony Reborn 的 jar 一并放进 `mods`。
4. **服务端同样处理。** 如果你开服务器，客户端与服务端都要安装这两个 jar。

```
.minecraft/
└── mods/
    ├── kotlinforforge-*.jar
    └── flowingagony_reborn-*.jar
```

## 在游戏内查看附魔说明

本模组的附魔描述写得相当"文学化"，光看名字很难判断实际效果。推荐两种方式：

- **安装 [附魔描述](https://www.mcmod.cn/class/1945.html)**：在游戏内把鼠标悬停在附魔书上即可看到简短说明。
- **查阅本站**：进入[附魔图鉴](/enchantments/)，用分类、稀有度与等级筛选，查看逐级数值的完整说明。

::: tip 等级滑块怎么用
图鉴里每张附魔卡都支持切换等级（Ⅰ–Ⅴ）。切换后，效果文本中对应的数值会被高亮，其余等级的数字变淡——**所有数字都来自原始资料，本站没有做任何推算**。工具栏顶部的等级选择器可以一次切换全部卡片。
:::

## 怎么获得这些附魔

| 途径 | 说明 |
| --- | --- |
| 附魔台 | 大多数附魔可通过附魔台获得，权重越低的附魔越难刷出 |
| 村民交易 | 标注「**无法通过交易获得**」的附魔不会出现在图书管理员处 |
| 战利品箱 | 「**宝藏附魔**」只能通过探索、钓鱼、交易或战利品获得 |
| 创造模式物品栏 | 1.0.4 起模组添加了专属的创造模式标签页 |
| 铁砧 / 配置文件 | 1.0.9 起可细分配置每个附魔的可交易、可发现、可附魔台获取与宝藏属性 |

## 下一步

- [附魔机制](/guide/mechanics/) —— 等级、稀有度、冲突、配置文件与版本差异
- [附魔图鉴](/enchantments/) —— 59 个附魔的完整效果
- [速查表](/enchantments/table/) —— 一页看完所有附魔的属性与冲突关系
- [状态效果](/effects/) —— 模组添加的增益与负面效果
- [更新日志](/changelog/) —— 各版本的改动记录

---

## Quick start (English)

This site is fully bilingual. The English edition covers the same content:

- [Quick start](</en/guide/>)
- [Enchantment index](</en/enchantments/>)
- [Quick reference table](</en/enchantments/table/>)
- [Status effects](</en/effects/>)
