# JayYuの资源导航站

一个面向开发者和效率用户的导航网站，聚合常用工具、学习资源、娱乐站点与 AI 平台，支持快速检索、分类筛选和中英文切换。

## 在线访问

- 主页：https://jayyu686.top/
- 英文页：https://jayyu686.top/en/

## 核心功能

- 全局搜索：按名称与简介关键词快速筛选。
- 分类筛选：按类别过滤资源。
- 二级筛选：选中一级分类后按二级标签继续筛选。
- 电梯导航：侧边栏快速跳转到分类区块。
- 智能跳转：`全部`模式显示一级分类，单分类模式显示对应二级分类。
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
- `tags`
- `note`

### 二级分类维护约定

- 每个站点必须且仅有一个 `subcategory`（中文）与 `subcategory_en`（英文）。
- 每个一级分类应至少包含 2 个及以上二级分类，避免筛选退化为单桶。
- 新增站点时优先复用已有二级分类词汇，减少同义拆分。
- 可用脚本：`node scripts/assign-subcategories.cjs`（批量分配与校验）。

### 本次数据扩充（2026-03）

- 已按截图来源批量新增站点，并严格映射到既有分类：
- `论坛 / 社区`：论坛、社区、BBS 与讨论平台。
- `有趣`：奇趣站点、实验内容与灵感站。
- `娱乐`：视频与流媒体相关站点。
- `程序员常用网站`：开发文档、代码平台、技术学习站点。
- `资源`：下载、索引、导航类资源站。
- `学术资源`：论文检索、翻译与学术工具。
- `实用工具`：效率工具与在线处理工具。
- 新增与改写条目已统一中文描述，符合中文页面语义。
- 已补齐所有中文标题的 `title_en` 字段，确保中英双语标题完整。
- 本轮继续新增 14 个学术资源站点（已去重）：
- `DOAJ`、`OpenAlex`、`Crossref Search`、`SpringerLink`、`ScienceDirect`、`JSTOR`、`SSRN`
- `CORE`、`bioRxiv`、`medRxiv`、`ACL Anthology`、`OpenReview`、`ORCID`、`Unpaywall`

### 去重规则（执行策略）

- 规则 1：`title + category` 组合不得重复。
- 规则 2：URL 规范化后不得重复（忽略 `www.` 与尾部 `/`）。
- 规则 3：同域名冲突默认视为重复并跳过，除非明确属于不同功能页（例如主页与独立子路径服务页）。

### 导入后校验

- 资源总数：`246`
- `title + category` 重复数：`0`
- 规范化 URL 重复数：`0`
- 中文标题缺失 `title_en`：`0`
- 学术资源条目数：`38`
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
