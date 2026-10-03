# 常见问题

## 如何查看各个附魔的效果？

三种方式：

- 在游戏内安装 [附魔描述](https://www.mcmod.cn/class/1945.html)，把鼠标悬停在附魔书上即可看到简短说明。
- 查阅本站的[附魔图鉴](/enchantments/)，包含逐级数值的完整文字说明。
- 直接看[速查表](/enchantments/table/)，一页确认适用物品、最高等级、稀有度与冲突关系。

## 这个模组需要什么前置？

只需要 [Kotlin for Forge](https://www.mcmod.cn/class/2890.html)。它是**必需**的，缺少会导致游戏在加载阶段崩溃。

## 客户端的模组可以只装在服务端吗？

不可以。本模组的运行环境是「客户端需装，服务端需装」，两边都要装。

## 模组的更新状态如何？

- 主线为 **1.20.1 Forge**，也是本站记录数值所依据的版本。
- **1.21.1 NeoForge** 正在龟速更新中，进度可在 [GitHub](https://github.com/Error1015/FlowingAgony-Reborn) 查看。
- 其它版本如果遇到 BUG，同样可以在 GitHub 上提交 issue 反馈。

## 遇到 BUG 该怎么反馈？

前往 [GitHub 仓库](https://github.com/Error1015/FlowingAgony-Reborn/issues)提交 issue。为了能定位问题，建议附上：

1. 游戏版本与 Forge 版本
2. 模组版本号
3. 完整的崩溃日志或 latest.log
4. 复现步骤（做了什么、期望发生什么、实际发生了什么）

## 附魔说明里的 `2/4/6` 是什么意思？

这是**按等级排列**的数值：等级 Ⅰ 用第一个值，等级 Ⅱ 用第二个，依此类推。本站图鉴中的等级滑块会直接帮你把对应数值高亮出来。详见[附魔机制](/guide/mechanics/#等级)。

## 「点数」等于多少血？

1 点 = 半颗心。所以「造成 6 点伤害」就是三颗心。

## 「无法辨识的效果」是什么？

这是模组内部使用的一类隐藏状态效果，统一显示为同一个名字。它们不造成伤害，只是用来记录附魔的触发状态与计时。详见[状态效果](/effects/#marker-effects)。

## 「异样喜悦」在哪里看？

它是一项点数资源，显示在**经验值条上方**的独立指示器上，而不是常规的状态效果图标。没有点数时指示器会自动隐藏。说明见[关于本模组](/about/)。

## 数据是从哪里来的？

附魔的名称、分类、适用物品、最高等级、刷新权重与效果文字整理自 [MC百科资料页](https://www.mcmod.cn/item/list/3872-5.html)，并与模组源码中的语言文件（`en_us.json` / `zh_cn.json`）交叉核对。英文效果说明为对应翻译，数字与格式与原资料保持一致。

::: tip 发现错误？
本站内容以资料页为准。如果发现与游戏内表现不符，欢迎在 [GitHub](https://github.com/Error1015/FlowingAgony-Reborn) 提出。
:::

---

## Frequently asked questions (English)

- **Dependencies** — only Kotlin for Forge, and it is mandatory.
- **Client/server** — required on both sides.
- **Update status** — main line is 1.20.1 Forge; a 1.21.1 NeoForge branch is in slow progress.
- **Reading `2/4/6`** — values are ordered by level.
- **Points** — 1 point is half a heart.

Full English FAQ: [FAQ](</en/guide/faq/>)
