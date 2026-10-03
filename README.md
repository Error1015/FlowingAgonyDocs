# 白门的奇异附魔：苦痛长河：重生 · 文档站

**MarbleGate's Exotic Enchantment: Flowing Agony: Reborn** 的双语资料站，基于 [VitePress](https://vitepress.dev) 构建。

- 简体中文（站点根目录）与 English（`/en/`）双语，语言切换器一键互跳
- 亮色 / 暗色主题，两套配色都经过单独设计（不是简单反色）
- 59 个附魔按 11 个分类整理，可搜索、可按分类 / 稀有度 / 等级筛选
- **等级高亮**：切换附魔等级时，效果文本中对应的数值会被高亮，其余变淡——所有数字均直接来自原始资料，站点不做任何推算
- 附魔速查表、状态效果、更新日志、模组信息页

## 本地运行

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器（默认 http://localhost:5173）
npm run build     # 构建到 docs/.vitepress/dist
npm run preview   # 本地预览构建结果
```

> 首次构建需要联网下载 Google Fonts 的字体 CSS（仅浏览器端加载，构建本身不依赖它）。
> 离线环境会自动回退到系统字体，不影响功能。

## 目录结构

```
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              # 站点配置：双语 locales、导航、侧边栏、搜索
│   │   ├── data/
│   │   │   └── dataset.json        # 由脚本生成的站点数据集（唯一数据源）
│   │   └── theme/
│   │       ├── index.ts            # 主题入口，注册全局组件
│   │       ├── data.ts             # 数据集类型与本地化辅助函数
│   │       ├── styles/
│   │       │   ├── vars.css        # 设计令牌（颜色 / 字体 / 明暗两套变量）
│   │       │   ├── base.css        # 全局排版与 VitePress 外壳覆写
│   │       │   └── components.css  # 组件样式
│   │       └── components/
│   │           ├── HomePage.vue          # 首页（Hero + 分类 + 上手步骤 + 链接）
│   │           ├── EnchantExplorer.vue   # 附魔图鉴：搜索 / 筛选 / 分组
│   │           ├── EnchantCard.vue       # 单张附魔卡
│   │           ├── EffectText.vue        # 等级感知的效果文本渲染器
│   │           ├── EnchantTable.vue      # 速查表
│   │           ├── StatusEffectList.vue  # 状态效果
│   │           ├── ChangelogList.vue     # 更新日志时间线
│   │           └── AboutPanel.vue        # 模组信息面板
│   ├── index.md                    # 中文首页
│   ├── guide/                      # 快速开始 / 附魔机制 / 常见问题
│   ├── enchantments/               # 附魔图鉴 + 速查表
│   ├── effects/                    # 状态效果
│   ├── changelog/                  # 更新日志
│   ├── about/                      # 关于本模组
│   ├── en/                         # 英文版镜像结构
│   └── public/logo.svg
└── scripts/                        # 数据流水线（不参与站点构建）
    ├── data.raw.json               # 手工整理的附魔基础数据（中文）
    ├── effects.raw.json            # 状态效果数据（中英）
    ├── changelog.raw.json          # 更新日志与「异样喜悦」机制（中英）
    ├── i18n/                       # 英文效果文本翻译切片
    ├── split-i18n.mjs              # 把 data.raw.json 切成翻译任务切片
    └── build-data.mjs              # 合并所有来源，生成 dataset.json
```

## 数据是怎么来的

| 字段 | 来源 |
| --- | --- |
| 附魔名称、分类、适用物品、最高等级、刷新权重、效果文字 | [MC百科附魔资料页](https://www.mcmod.cn/item/list/3872-5.html) |
| 英文名称、风味描述、状态效果名称与描述 | 模组源码语言文件 `en_us.json` / `zh_cn.json` |
| 英文效果文字 | 依据中文原文翻译，数字与格式逐字保留 |
| 更新日志 | [MC百科版本页](https://www.mcmod.cn/class/version/18692.html) 与 GitHub 仓库 |

## 更新数据

1. 编辑 `scripts/data.raw.json`（附魔主体）或 `scripts/effects.raw.json`、`scripts/changelog.raw.json`
2. 若新增了附魔且需要英文效果文本：
   ```bash
   npm run data:split     # 重新切分翻译切片到 scripts/i18n/in-*.json
   ```
   翻译后把结果写回 `scripts/i18n/out-*.json`（格式为 `[{ "id": "...", "enEffect": "..." }]`）
3. 重新生成数据集：
   ```bash
   npm run data:build
   ```
   脚本会校验每个附魔是否都有英文文本、ID 是否重复、冲突附魔引用是否可解析，并打印问题清单。

## 部署

默认 `base` 为 `/`，适合部署在域名根目录（Vercel / Netlify / Cloudflare Pages 等）。

若部署到子路径（例如 GitHub Pages 的 `https://<user>.github.io/<repo>/`），在 `docs/.vitepress/config.mts` 中设置：

```ts
export default defineConfig({
  base: '/<repo>/',
  // …
})
```

构建产物为纯静态文件，直接发布 `docs/.vitepress/dist` 即可。

## 开发辅助脚本

`scripts/dev/` 下的三个脚本只在本地排查排版时使用，不参与站点构建：

| 脚本 | 用途 |
| --- | --- |
| `serve-dist.mjs` | 用纯 Node 静态托管 `dist`，在 `vitepress preview` 不方便时兜底 |
| `screenshot.mjs` | 通过 CDP 驱动无头 Chrome 截图，支持亮/暗两种配色与整页捕获 |
| `probe.mjs` | 在已构建页面里执行一段 JS 并打印结果，用于定位布局问题 |

```bash
node scripts/dev/serve-dist.mjs docs/.vitepress/dist 4173
node scripts/dev/screenshot.mjs http://127.0.0.1:4173 shots "/=home" "/enchantments/=enchantments"
node scripts/dev/screenshot.mjs http://127.0.0.1:4173 shots --dark "/=home"
```

## 许可与致谢

- 模组源码以 **3-Clause BSD License** 开源，作者 [Error1015](https://github.com/Error1015/FlowingAgony-Reborn)，原作作者[白门 (MarbleGate)](https://www.mcmod.cn/author/24436.html)。
- 站点中的附魔资料整理自 [MC百科](https://www.mcmod.cn/)，其开放公共编辑内容遵循 **BY-NC-SA 3.0** 协议。
- 本站与模组作者无隶属关系，仅为社区资料整理。
