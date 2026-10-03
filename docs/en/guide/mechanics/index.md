# Enchantment mechanics

This page explains how the mod organises its enchantments: how levels work, what rarity means, which enchantments exclude each other, and how versions differ. Once you know these rules, every entry in the [enchantment index](</en/enchantments/>) reads at a glance.

## Levels

Every enchantment has its own **maximum level**, written in Roman numerals from Ⅰ to Ⅴ.

- Slash-separated number sequences in an effect text (`2/4/6`, `20%/25%/30%`, `5s/7.5s/10s`) are ordered **by level**: the first value applies at level Ⅰ, the second at Ⅱ, and so on.
- A lone value (`250%`) applies at every level.
- The level control on each card highlights the values for the selected level so you never have to count positions.

::: tip About "points"
All damage and health values use **points**, where 1 point is half a heart. "Deals 6 points of damage" therefore means three hearts.
:::

## Rarity (weight)

The MC百科 data pages list a **weight**: the lower the number, the rarer the enchantment.

| Weight | Label | Meaning |
| --- | --- | --- |
| 1 | Very Rare | Almost never rolls at an enchanting table; usually treasure or trade only |
| 2 | Rare | Clearly less common than ordinary enchantments |
| 5 | Uncommon | Moderate appearance rate |
| 10 | Common | On par with vanilla enchantments |

The rarity badges in the index and the quick reference table map directly to this table.

## Applicable items

Each enchantment is restricted to certain equipment slots. The common values are:

- **Weapons** — sword, axe, bow, crossbow
- **Armour** — helmet, chestplate, armour (any piece), boots
- **Tools** — pickaxe, tool, mining tool
- **Durable items** — anything with a durability bar

Enchantments marked *Durable Item* — mostly the [Last Wish](</en/enchantments/#cat-last-wish>) category — can go on anything that wears down, which makes them unusually flexible.

## Treasure enchantments and curses

| Tag | Meaning |
| --- | --- |
| **Treasure enchantment** | Never appears at an enchanting table; only from exploration, fishing, trading or loot |
| **Curse** | Purely detrimental, e.g. [Burial Object](</en/enchantments/#burial-object>) |
| **Not obtainable via trading** | Librarian villagers will never sell it |
| **Removed in Backport 1.15.2** | Only present on the newer version branches |

## Incompatible enchantments

Incompatible enchantments cannot coexist on the same item. Several pairs and trios exist inside the mod itself:

- [Survival Shortcut](</en/enchantments/#survival-shortcut>) ↔ [Survival Ruse](</en/enchantments/#survival-ruse>) ↔ [Necessary Evil](</en/enchantments/#necessary-evil>)
- [Vengeance](</en/enchantments/#vengeance>) ↔ [Perceived Malice](</en/enchantments/#perceived-malice>)
- [Burning Phobia](</en/enchantments/#burning-phobia>) ↔ [Drowning Phobia](</en/enchantments/#drowning-phobia>) ↔ [Prayer of Pain](</en/enchantments/#prayer-of-pain>)
- [Stubborn Step](</en/enchantments/#stubborn-step>) ↔ [Frivolous Step](</en/enchantments/#frivolous-step>)
- [Too Resentful to Die](</en/enchantments/#too-resentful-to-die>) ↔ [Resentful Soul](</en/enchantments/#resentful-soul>)
- [Scholar of Original Sin](</en/enchantments/#scholar-of-original-sin>) ↔ [Original Sin Erosion](</en/enchantments/#original-sin-erosion>)

Some also clash with vanilla enchantments:

- [Shock Therapy](</en/enchantments/#shock-therapy>) and [Paper Brain](</en/enchantments/#paper-brain>) conflict with Sharpness, Smite and Bane of Arthropods
- [Insane Poet](</en/enchantments/#insane-poet>) conflicts with Power and Punch
- All three [Last Wish](</en/enchantments/#cat-last-wish>) enchantments conflict with Mending

::: warning Conflicts go both ways
Incompatible enchantments cannot be merged on an anvil, and an enchanting table will never roll both onto one item. Plan builds against the [quick reference table](</en/enchantments/table/>), which shows every exclusion on a single page.
:::

## Status effects and "Abnormal Joy"

The mod carries its enchantment logic through two kinds of status effect:

1. **Functional effects** such as [Cursed Hatred](</en/effects/#cursed_hatred>), [Extreme Hatred](</en/effects/#extreme_hatred>) and [Curse of Undead](</en/effects/#curse_of_undead>). These have real names and descriptions and are visible in game.
2. **"Unidentifiable Status Effect"** — hidden internal effects that record enchantment state. They all share one display name, deal no damage on their own, and act purely as switches and timers.

On top of that, the [Agony-Forged Soul](</en/enchantments/#cat-agony-forged-soul>) category accumulates a resource called **Abnormal Joy**. It is not a normal status effect; it appears as a separate indicator above the XP bar.

See the [status effects](</en/effects/>) page for the full list.

## Configuration

Since **1.0.9** the mod exposes granular configuration:

- Each enchantment can individually set **whether it can be traded**, **whether it can be discovered**, **whether it can be obtained from an enchanting table** and **whether it is a treasure enchantment**.
- Some numeric options are **multipliers**. Setting an enchantment's multiplier to `0.5` halves its effective value in game.

::: danger Fixed in 1.0.9-fix
1.0.9 overwrote edits to some configuration files. This is fixed in 1.0.9-fix — upgrade if you are on 1.0.9.
:::

## Version differences

A few enchantments behave differently across game versions:

| Enchantment | Difference |
| --- | --- |
| [Carefully Identified](</en/enchantments/#carefully-identified>) | Three separate drop tables for `>=1.18.2`, `=1.17.1` and `<=1.16.5` |
| [Perceived Malice](</en/enchantments/#perceived-malice>) | `<=1.17.1` additionally lets you sense nearby mobs |
| [Cutting Watermelon Dream](</en/enchantments/#cutting-watermelon-dream>) | Removed in Backport 1.15.2 |
| [Nimble Finger](</en/enchantments/#nimble-finger>) | Removed in Backport 1.15.2 |

The index renders these as explicit version labels inside the effect text.

## Development status

- The main line is **1.20.1 Forge**.
- A **1.21.1 NeoForge** branch is progressing slowly; track it on [GitHub](https://github.com/Error1015/FlowingAgony-Reborn).
- Bug reports are welcome as GitHub issues.
