# Quick start

**MarbleGate's Exotic Enchantment: Flowing Agony: Reborn** is a remake and port of *MarbleGate's Exotic Enchantment: Flowing Agony*. Built around the enchantment system, it keeps the original's ideas while rewriting the implementation and adding new enchantments and status effects.

This site is the complete bilingual reference for the mod: all 59 enchantments, grouped into 11 categories, each with applicable items, maximum level, rarity weight, incompatible enchantments and the **full per-level values**.

## Requirements

| | |
| --- | --- |
| Game version | 1.20.1 / 1.19.2 |
| Mod loader | Forge |
| Dependency | [Kotlin for Forge](https://www.mcmod.cn/class/2890.html) |
| Environment | Client required · Server required |
| Licence | 3-Clause BSD License |

::: warning The dependency is not optional
Kotlin for Forge is the mod's only requirement, and it is mandatory. Without it the game crashes during loading.
:::

## Installation

1. **Install Forge.** Set up Forge for your target game version and launch the game once so the `mods` folder is created.
2. **Install the dependency.** Put the Kotlin for Forge jar into `mods`.
3. **Add the mod.** Put the Flowing Agony Reborn jar into `mods` alongside it.
4. **Do the same on the server.** If you run a server, both jars go on the client *and* the server.

```
.minecraft/
└── mods/
    ├── kotlinforforge-*.jar
    └── flowingagony_reborn-*.jar
```

## Reading enchantment effects in game

The mod's descriptions are deliberately literary — the name alone rarely tells you what an enchantment does. Two options:

- **Install [Enchantment Descriptions](https://www.mcmod.cn/class/1945.html)** to get a short tooltip when hovering an enchanted book in game.
- **Use this site.** The [enchantment index](</en/enchantments/>) lets you filter by category, rarity and level and shows the complete per-level values.

::: tip How the level selector works
Every enchantment card has a level control (Ⅰ–Ⅴ). Selecting a level emphasises the values that apply at that level and dims the others. **All numbers come straight from the source data — nothing on this site is inferred or recalculated.** The level control in the toolbar switches every card at once.
:::

## How to obtain these enchantments

| Route | Notes |
| --- | --- |
| Enchanting table | Most enchantments are obtainable here; lower weight means rarer |
| Villager trading | Anything marked **Not obtainable via trading** will never appear on a librarian |
| Loot chests | **Treasure enchantments** come only from exploration, fishing, trading or loot |
| Creative inventory | Since 1.0.4 the mod adds its own creative tab |
| Anvil / config | Since 1.0.9 each enchantment's tradeable, discoverable, table-obtainable and treasure flags can be configured individually |

## Next

- [Enchantment mechanics](</en/guide/mechanics/>) — levels, rarity, conflicts, configuration and version differences
- [Enchantment index](</en/enchantments/>) — full effects for all 59 enchantments
- [Quick reference](</en/enchantments/table/>) — every attribute and conflict on a single page
- [Status effects](</en/effects/>) — the buffs and debuffs this mod adds
- [Changelog](</en/changelog/>) — what changed in each release

---

## 中文版

本站为双语站点，中文版内容完全对应：

- [快速开始](</guide/>)
- [附魔图鉴](</enchantments/>)
- [速查表](</enchantments/table/>)
- [状态效果](</effects/>)
