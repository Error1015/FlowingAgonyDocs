# 附魔机制

这一页说明本模组的附魔是如何组织的：等级怎么算、稀有度意味着什么、哪些附魔互相排斥，以及不同版本之间的差异。理解了这些，[附魔图鉴](/enchantments/)里的每一项都能一眼看懂。

## 等级

每个附魔都有自己的**最高等级**，用罗马数字表示，范围从 Ⅰ 到 Ⅴ。

- 效果文本里用斜杠分隔的数字序列（如 `2/4/6`、`20%/25%/30%`、`5s/7.5s/10s`）**按等级顺序排列**：第一个数字对应等级 Ⅰ，第二个对应 Ⅱ，依此类推。
- 如果某个数字只有单独一个值（如 `250%`），说明它在所有等级下都相同。
- 图鉴中的等级滑块会把当前等级的数值高亮出来，避免数错位置。

::: tip 关于"点数"
模组中的伤害与生命值都以**点**为单位，1 点 = 半颗心。所以"造成 6 点伤害"等于三颗心。
:::

## 稀有度（刷新权重）

MC百科资料页给出的是**刷新权重**，数字越小越稀有：

| 权重 | 名称 | 含义 |
| --- | --- | --- |
| 1 | 非常稀有 | 极难在附魔台刷出，多依赖宝藏或交易 |
| 2 | 稀有 | 出现概率明显低于常规附魔 |
| 5 | 不常见 | 中等出现概率 |
| 10 | 常见 | 与常规附魔相当 |

图鉴与速查表中的稀有度徽章直接对应这张表。

## 适用物品

每个附魔限定于特定装备栏位。常见取值包括：

- **武器类**：剑、斧、弓、弩
- **防具类**：头盔、胸甲、护甲（任意防具）、靴子
- **工具类**：镐、工具、挖掘工具
- **有耐久物品**：任何带耐久条的物品

标注为「有耐久物品」的附魔（主要是[遗愿](/enchantments/#cat-last-wish)分类）可以附在任何会磨损的装备上，这使它们非常灵活。

## 宝藏附魔与诅咒

| 标记 | 含义 |
| --- | --- |
| **宝藏附魔** | 不会出现在附魔台，只能通过探索、钓鱼、交易或战利品获得 |
| **诅咒** | 纯粹的负面附魔，例如[陪葬者](/enchantments/#burial-object) |
| **无法通过交易获得** | 图书管理员村民不会出售该附魔 |
| **Backport 1.15.2 中已移除** | 该附魔只存在于较新的版本分支中 |

## 冲突附魔

冲突附魔无法同时存在于同一件装备上。本模组内部就存在几组互斥关系，最常见的是：

- [求生捷径](/enchantments/#survival-shortcut) ↔ [求生诡计](/enchantments/#survival-ruse) ↔ [必要之恶](/enchantments/#necessary-evil)
- [以眼还眼](/enchantments/#vengeance) ↔ [恶意感知](/enchantments/#perceived-malice)
- [灼烧恐惧症](/enchantments/#burning-phobia) ↔ [溺亡恐惧症](/enchantments/#drowning-phobia) ↔ [祈难人](/enchantments/#prayer-of-pain)
- [固执步伐](/enchantments/#stubborn-step) ↔ [轻浮步伐](/enchantments/#frivolous-step)
- [恨比天高](/enchantments/#too-resentful-to-die) ↔ [怨恨之灵](/enchantments/#resentful-soul)
- [原罪学者](/enchantments/#scholar-of-original-sin) ↔ [原罪侵蚀](/enchantments/#original-sin-erosion)

部分附魔也会与原版附魔冲突，例如：

- [电击疗法](/enchantments/#shock-therapy)、[纸脑](/enchantments/#paper-brain) 与 锋利 / 亡灵杀手 / 节肢杀手 冲突
- [疯诗人](/enchantments/#insane-poet) 与 力量 / 冲击 冲突
- [遗愿](/enchantments/#cat-last-wish) 分类的三个附魔都与 经验修补 冲突

::: warning 冲突是双向的
冲突附魔不能在铁砧上合并，也不会在同一件装备上由附魔台同时产生。规划 build 时建议先看[速查表](/enchantments/table/)，一页就能确认所有互斥关系。
:::

## 状态效果与「异样喜悦」

模组通过两类状态效果来承载附魔逻辑：

1. **有实际作用的效果**，例如 [仇恨诅咒](/effects/#cursed_hatred)、[极端憎恨](/effects/#extreme_hatred)、[亡灵诅咒](/effects/#curse_of_undead)。它们有独立的名称和描述，在游戏内可见。
2. **「无法辨识的效果」**，是模组内部用于记录附魔状态的隐藏效果，统一显示为同名效果，本身不造成任何伤害，只作为开关与计时器。

此外，[苦痛铸魂](/enchantments/#cat-agony-forged-soul)分类的附魔会累积一种叫**异样喜悦**的点数资源。它不在常规状态效果列表里，而是显示在经验值条上方的一条独立指示器。

完整说明见[状态效果](/effects/)页面。

## 配置文件

从 **1.0.9** 起，模组提供细化的配置：

- 每个附魔可分别设置**是否可交易**、**是否可以被发现**、**是否可以通过附魔台获取**、**是否为宝藏附魔**。
- 部分数值型配置采用**倍数**形式。例如把某个附魔的倍率设为 `0.5`，游戏内的实际数值就是原来的**一半**。

::: danger 1.0.9-fix 修复的问题
1.0.9 存在配置文件修改被覆盖的缺陷，已在 1.0.9-fix 中修复。使用 1.0.9 时请一并升级。
:::

## 版本差异

不同游戏版本下，少数附魔的行为并不一致：

| 附魔 | 差异 |
| --- | --- |
| [精挑细选](/enchantments/#carefully-identified) | 按 `>=1.18.2`、`=1.17.1`、`<=1.16.5` 分三段列出不同掉落表 |
| [恶意感知](/enchantments/#perceived-malice) | `<=1.17.1` 额外提供感知附近怪物的能力 |
| [梦里切瓜](/enchantments/#cutting-watermelon-dream) | 在 Backport 1.15.2 中被移除 |
| [巧手](/enchantments/#nimble-finger) | 在 Backport 1.15.2 中被移除 |

这些差异在图鉴中会以版本标签的形式单独呈现。

## 开发状态

- 主线为 **1.20.1 Forge**。
- **1.21.1 NeoForge** 分支正在缓慢推进，进度可在 [GitHub](https://github.com/Error1015/FlowingAgony-Reborn) 查看。
- 遇到 BUG 欢迎在 GitHub 提交 issue。
