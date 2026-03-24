<p align="center">
	<img src="./public/icon-source.png" alt="Jay Yu logo" width="108" height="108" />
</p>

# Jay Yu の 资源导航站

一个面向开发者和效率用户的导航网站，聚合常用工具、学习资源、娱乐站点与 AI 平台，支持快速检索、分类筛选和中英文切换。

## 在线访问

- 主页：https://jayyu686.top/
- 英文页：https://jayyu686.top/en/

## 核心功能

- 全局搜索：按名称与简介关键词快速筛选。
- 状态可分享：分类、二级分类与搜索词会同步到 URL 查询参数，刷新后可恢复。
- 分类筛选：按类别过滤资源。
- 二级筛选：选中一级分类后按二级标签继续筛选。
- 电梯导航：侧边栏快速跳转到分类区块。
- 智能跳转：`全部`模式显示一级分类，单分类模式显示对应二级分类。
- 最近更新：自动收录最新新增的 16 个站点，并作为独立一级分类参与筛选。
- 返回顶部：长页面一键回顶。
- 主题切换：浅色/深色模式。
- 中英切换：中文 `/` 与英文 `/en/`。
- 最近访问：记录最近打开站点，支持一键清空与上限控制。
- 数据校验：Content Collections + Zod 校验资源字段。

## 技术栈

- Astro 6
- TypeScript
- Astro Content Collections
- 原生 CSS + 原生 JavaScript

## 本地开发

1. 安装依赖

```bash
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

3. 打开浏览器

默认地址为 `http://localhost:4321`。

## 目录结构（简版）

```text
.
├── public/
├── src/
│   ├── components/
│   │   ├── HomeContent.astro
│   │   ├── CategorySection.astro
│   │   └── Card.astro
│   ├── content/
│   │   └── resources/resources.json
│   ├── i18n/
│   │   ├── zh.ts
│   │   └── en.ts
│   ├── pages/
│   │   ├── index.astro
│   │   └── en/index.astro
│   └── content.config.ts
├── astro.config.mjs
└── package.json
```

## 数据维护说明

资源文件位于：`src/content/resources/resources.json`

当前结构：

```json
{
	"resources": {
		"items": [
			{
				"title": "站点名",
				"url": "https://example.com",
				"summary": "一句话简介",
				"category": "实用工具",
				"updatedAt": "2026-03-20T12:00:00Z",
				"subcategory": "开发效率",
				"subcategory_en": "Developer Productivity",
				"title_en": "Optional English Title",
				"summary_en": "Optional English Summary",
				"tags": ["可选"],
				"note": "可选备注"
			}
		]
	}
}
```

必填字段：

- `title`
- `url`（必须是合法 URL）
- `summary`
- `category`

可选字段：

- `subcategory`
- `subcategory_en`
- `title_en`
- `summary_en`
- `updatedAt`（ISO-8601 时间字符串且必须带时区，如 `2026-03-20T12:00:00Z` 或 `2026-03-20T20:00:00+08:00`，最近更新排序优先使用）
- `tags`
- `note`

### 二级分类维护约定

- 每个站点必须且仅有一个 `subcategory`（中文）与 `subcategory_en`（英文）。
- 每个一级分类应至少包含 2 个及以上二级分类，避免筛选退化为单桶。
- 新增站点时优先复用已有二级分类词汇，减少同义拆分。
- 可用脚本：`node scripts/assign-subcategories.cjs`（批量分配与校验）。

### 最近更新维护约定

- 最近更新列表固定展示 `16` 条，来源为 `resources.json` 中最新新增的条目（文件末尾视为最新）。
- 若条目包含合法 `updatedAt`，最近更新优先按 `updatedAt` 倒序；缺失或格式非法时回退为按文件新增顺序。
- 最近更新中的站点会同时保留在原有一级分类中，不会从原分类移除。
- 最近更新卡片的标签显示站点原始一级分类，不显示“最近更新”标签。
- 当继续新增站点时，最近更新按新增顺序滚动，仅保留最新 `16` 条。

### 功能更新（2026-03-20）

- 新增一级分类“最近更新 / Recent Updates”，默认收录最新 16 条新增站点。
- 最近更新中的站点保留原分类归属，分类筛选与电梯导航可正常联动。
- 最近更新卡片显示原始一级分类标签，避免信息歧义。

### 视觉与交互重构（2026-03-23）

- **材质升级**：废弃了性能开销大的 SVG 背景滤镜，采用静态 Procedural 生成的 2K/4K 白纸纹理图 (`Paper003_2K-JPG_Color.jpg`) 与法线贴图 (`Paper003_2K-PNG_Color.png`)，配合 CSS `mix-blend-mode`，实现极具物理反光质感的 3D 纸张效果。
- **深色模式优化**：重构深色模式对比度，改用更深邃的 `#0d1116` 背景底色，卡片与功能面板转为通透的轻白磨玻璃遮罩 (`rgba(255, 255, 255, 0.04)`)，提升了图层前后的景深感。
- **智能光效交互**：全局实现跟随鼠标的动态高亮探照灯效果。背景全局泛光变柔和（暗化），鼠标悬浮在卡片上时光环会自动增强；顶部 Hero 标题增加了基于 `background-clip: text` 的反光扫光特效。
- **物理弹簧动画**：卡片元素的 Hover 与 Active 加入了具有呼吸感的 Q 弹物理缓冲曲线 (`cubic-bezier(0.34, 1.56, 0.64, 1)`)，悬停增加了小图标的旋转位移动画。

### 本次数据扩充（2026-03）

- 已新增以下站点，并严格映射到既有分类：
- `论坛 / 社区`：论坛、社区、BBS 与讨论平台。
- `有趣`：奇趣站点、实验内容与灵感站。
- `娱乐`：视频与流媒体相关站点。
- `程序员常用网站`：开发文档、代码平台、技术学习站点。
- `资源`：下载、索引、导航类资源站。
- `学术资源`：论文检索、翻译与学术工具。
- `实用工具`：效率工具与在线处理工具。
- 新增与改写条目已统一中文描述，符合中文页面语义。
- 本轮新增条目均补齐 `title_en` 字段，保证新数据可用于中英展示。
- 本轮继续新增 14 个学术资源站点（已去重）：
- `DOAJ`、`OpenAlex`、`Crossref Search`、`SpringerLink`、`ScienceDirect`、`JSTOR`、`SSRN`
- `CORE`、`bioRxiv`、`medRxiv`、`ACL Anthology`、`OpenReview`、`ORCID`、`Unpaywall`
- 本轮新增 10 个 AI 站点到 `AI / 图像与视频生成`：
- `nanobananafree.ai`、`imini.ai`、`muset.ai`、`trickle.so`、`Flowith.cc`
- `tapnow.ai`、`lovart.ai`、`Zenmux.ai`、`imastudio.com`、`flowith.io`
- 同时将已存在的 `OpenRouter` 条目调整到 `AI / 评测与研究`，并更新简介。
- 本轮新增 15 个高质量且与现有数据不重复的站点：
- `DNS Checker`、`crt.sh`、`CodeSandbox`、`AST Explorer`、`Bundlephobia`
- `quicktype`、`JSON Hero`、`ReqBin`、`Beeceptor`、`Webhook.site`
- `httpstatus`、`SecurityHeaders`、`Tabler Icons`、`Iconify Icon Sets`、`unDraw`
- 本轮新增 16 个不重复站点（并完成一级/二级分类落位）：
- `TinyWow`（实用工具 / 文档与办公）、`diagrams.net`（实用工具 / 图像与设计）
- `urlscan.io`、`GTmetrix`、`SSL Labs`（实用工具 / 安全与网络）
- `JSONFormatter.org`（实用工具 / 开发效率）、`Google Fonts`（资源 / 设计素材）
- `Name.com`（域名 / DNS / 建站 / 域名注册）、`deSEC`（域名 / DNS / 建站 / DNS与安全）
- `Neocities`（域名 / DNS / 建站 / 静态部署）
- `Fly.io`、`Coolify`、`Koyeb`（域名 / DNS / 建站 / 云平台建站）
- `Contabo`（VPS / 云服务 / 高性价比VPS）
- `Upstash`（程序员常用网站 / 开发文档）、`WebhookTest`（程序员常用网站 / 开发效率）
- 本轮 AI 分类继续扩充（按二级分类落位）：
- `AI编程工具`：`Cursor`、`Windsurf`、`Trae（国际版）`、`Trae（国内版）`、`Antigravity`、`GitHub Copilot`、`Cline`、`Continue`、`Tabnine`、`Augment Code`
- `评测与研究`：`LMSYS Chatbot Arena`、`Hugging Face Open LLM Leaderboard`、`HELM`、`OpenCompass 榜单`，并将 `OpenRouter` 调整到该分类
- `通用对话`：`Le Chat`、`Meta AI`、`腾讯元宝`、`Character.AI`、`Pi`
- `数据与模型平台`：`ModelScope 魔搭社区`、`Together AI`、`Fireworks AI`、`Civitai`
- 本次新增 10 个高质量开发者/效率/设计资源。

### 去重规则（执行策略）

- 规则 1：`title + category` 组合不得重复。
- 规则 2：URL 规范化后不得重复（忽略 `www.` 与尾部 `/`）。
- 规则 3：同域名冲突默认视为重复并跳过，除非明确属于不同功能页（例如主页与独立子路径服务页）。

### 导入后校验

- 资源总数：`310`
- `title + category` 重复数：`0`
- 规范化 URL 重复数：`0`
- 域名重复数：`4`（均为历史存量多功能页：`github.com`、`huggingface.co`、`modelscope.cn`）
- 中文标题缺失 `title_en`：`148`
- 学术资源条目数：`38`
- AI 资源条目数：`68`
- AI 图像与视频生成条目数：`14`
- AI 评测与研究条目数：`12`
- AI 编程工具条目数：`11`
- AI 数据与模型平台条目数：`6`
- AI 通用对话条目数：`20`
- 二级分类覆盖率：`100%`（每条资源均含 `subcategory` 与 `subcategory_en`）

## i18n 路由

- 中文首页：`/`
- 英文首页：`/en/`

项目在 `astro.config.mjs` 中启用了 i18n，默认语言为中文且默认语言不带前缀。

## 构建与预览

```bash
npm run build
npm run preview
```

## 部署

项目为静态站点，可部署到 Vercel、Netlify、Cloudflare Pages 或任意支持静态托管的平台。
