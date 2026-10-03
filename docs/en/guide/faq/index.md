# FAQ

## How do I see what each enchantment does?

Three ways:

- Install [Enchantment Descriptions](https://www.mcmod.cn/class/1945.html) in game to get a short tooltip when hovering an enchanted book.
- Use the [enchantment index](</en/enchantments/>) on this site, which documents every per-level value.
- Use the [quick reference table](</en/enchantments/table/>) to check applicable items, maximum level, rarity and conflicts on one page.

## What does this mod depend on?

Only [Kotlin for Forge](https://www.mcmod.cn/class/2890.html). It is **mandatory** — the game crashes during loading without it.

## Can I install it server-side only?

No. The mod's environment is "client required, server required". Both sides need it.

## What is the update status?

- The main line is **1.20.1 Forge**, which is also the version this site's data is based on.
- A **1.21.1 NeoForge** branch is progressing slowly; track it on [GitHub](https://github.com/Error1015/FlowingAgony-Reborn).
- Bugs on other branches can be reported as GitHub issues too.

## How should I report a bug?

Open an issue on the [GitHub repository](https://github.com/Error1015/FlowingAgony-Reborn/issues). To make it diagnosable, include:

1. Game version and Forge version
2. Mod version
3. The full crash log or `latest.log`
4. Reproduction steps — what you did, what you expected, what actually happened

## What does `2/4/6` mean in an effect text?

Those values are **ordered by level**: the first applies at level Ⅰ, the second at Ⅱ, and so on. The level control on each card on this site highlights the relevant value for you. See [enchantment mechanics](</en/guide/mechanics/#levels>).

## How much health is one "point"?

One point is half a heart. "Deals 6 points of damage" therefore means three hearts.

## What is the "Unidentifiable Status Effect"?

A family of hidden internal status effects that all share one display name. They deal no damage; they only record enchantment trigger state and timers. See [status effects](</en/effects/#marker-effects>).

## Where do I find "Abnormal Joy"?

It is a point resource shown on a **separate indicator above the XP bar**, not as a normal status effect icon. The indicator hides itself when you have no points. See [about](</en/about/>).

## Where does this site's data come from?

Enchantment names, categories, applicable items, maximum levels, rarity weights and effect texts are compiled from the [MC百科 data pages](https://www.mcmod.cn/item/list/3872-5.html) and cross-checked against the mod's own language files (`en_us.json` / `zh_cn.json`). English effect texts are translations that preserve the original numbers and formatting exactly.

::: tip Found a mistake?
The data pages are the source of truth. If something disagrees with in-game behaviour, please raise it on [GitHub](https://github.com/Error1015/FlowingAgony-Reborn).
:::

---

## 中文版

- **前置** —— 只有 Kotlin for Forge，且为必需。
- **客户端 / 服务端** —— 两边都需要安装。
- **更新状态** —— 主线 1.20.1 Forge；1.21.1 NeoForge 分支缓慢推进中。
- **如何阅读 `2/4/6`** —— 数值按等级顺序排列。
- **点数** —— 1 点 = 半颗心。

完整中文常见问题：[常见问题](</guide/faq/>)
