# JayYu Nav

一个面向开发者和效率用户的导航网站，聚合常用工具、学习资源、娱乐站点与 AI 平台，支持快速检索、分类筛选和中英文切换。

## 核心功能

- 全局搜索：按名称与简介关键词快速筛选。
- 分类筛选：按类别过滤资源。
- 电梯导航：侧边栏快速跳转到分类区块。
- 返回顶部：长页面一键回顶。
- 主题切换：浅色/深色模式。
- 中英切换：中文 `/` 与英文 `/en/`。
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

- `title_en`
- `summary_en`
- `tags`
- `note`

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
