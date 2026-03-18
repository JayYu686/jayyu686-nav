const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/content/resources/resources.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);
const items = data?.resources?.items;

if (!Array.isArray(items)) {
  throw new Error('Invalid resources.json structure: resources.items must be an array');
}

const labels = {
  'VPS / 云服务': {
    domestic: ['国内云平台', 'China Cloud Platforms'],
    global: ['海外云厂商', 'Global Cloud Providers'],
    budget: ['高性价比VPS', 'Budget VPS'],
    premium: ['精品线路VPS', 'Premium Route VPS'],
  },
  '域名 / DNS / 建站': {
    dns: ['DNS与安全', 'DNS & Security'],
    domain: ['域名注册', 'Domain Registration'],
    static: ['静态部署', 'Static Hosting'],
    paas: ['云平台建站', 'Cloud App Hosting'],
  },
  '学术资源': {
    search: ['论文检索', 'Paper Search'],
    db: ['学术数据库', 'Academic Databases'],
    preprint: ['预印本与开放科学', 'Preprints & Open Science'],
    writing: ['学术写作与排版', 'Academic Writing & Typesetting'],
    translate: ['学术翻译与OCR', 'Translation & OCR'],
    identity: ['引用与学术身份', 'Citation & Research Identity'],
    conf: ['会议追踪', 'Conference Tracking'],
    model: ['模型与复现', 'Models & Reproducibility'],
  },
  '程序员常用网站': {
    docs: ['开发文档', 'Developer Documentation'],
    repo: ['代码托管', 'Code Hosting'],
    community: ['技术社区', 'Tech Community'],
    ide: ['在线IDE', 'Online IDE'],
    learning: ['学习与刷题', 'Learning & Practice'],
    ai: ['AI开发资源', 'AI Development Resources'],
  },
  '论坛 / 社区': {
    tech: ['技术社区', 'Tech Communities'],
    social: ['社交社区', 'Social Communities'],
    gaming: ['游戏社区', 'Gaming Communities'],
    general: ['综合论坛', 'General Forums'],
    product: ['产品社区', 'Product Discovery'],
  },
  有趣: {
    interactive: ['互动实验', 'Interactive Experiments'],
    retro: ['怀旧与游戏', 'Retro & Games'],
    sound: ['声音与氛围', 'Sound & Atmosphere'],
    knowledge: ['知识图谱', 'Knowledge Atlas'],
    creative: ['创意灵感', 'Creative Inspiration'],
  },
  '实用工具': {
    dev: ['开发效率', 'Developer Productivity'],
    design: ['图像与设计', 'Image & Design'],
    docs: ['文档与办公', 'Documents & Office'],
    security: ['安全与网络', 'Security & Network'],
    workflow: ['自动化与工作流', 'Automation & Workflow'],
    map: ['可视化与地图', 'Visualization & Maps'],
    portal: ['工具导航', 'Tool Portals'],
  },
  娱乐: {
    video: ['视频社区', 'Video Communities'],
    film: ['影视动漫', 'Film & Anime'],
    music: ['音乐平台', 'Music Platforms'],
    games: ['游戏娱乐', 'Gaming Entertainment'],
    social: ['社交内容', 'Social Content'],
  },
  资源: {
    asset: ['设计素材', 'Design Assets'],
    download: ['下载与游戏资源', 'Downloads & Game Resources'],
    books: ['电子书与档案', 'Books & Archives'],
    dev: ['开发资源', 'Developer Resources'],
    discovery: ['软件发现', 'Software Discovery'],
    portal: ['资源导航', 'Resource Portals'],
  },
  AI: {
    chat: ['通用对话', 'General AI Chat'],
    media: ['图像与视频生成', 'Image & Video Generation'],
    audio: ['音频生成', 'Audio Generation'],
    platform: ['AI开发平台', 'AI Development Platforms'],
    eval: ['评测与研究', 'Evaluation & Research'],
    model: ['数据与模型平台', 'Data & Model Platforms'],
    coding: ['AI编程工具', 'AI Coding Tools'],
  },
};

function pick(category, key) {
  const pair = labels[category]?.[key];
  if (!pair) {
    throw new Error(`Missing label key "${key}" for category "${category}"`);
  }
  return { subcategory: pair[0], subcategory_en: pair[1] };
}

function has(text, re) {
  return re.test(text);
}

function classify(item) {
  const text = `${item.title || ''} ${item.url || ''}`.toLowerCase();
  const category = item.category;

  if (category === 'VPS / 云服务') {
    if (has(text, /(阿里云|aliyun|腾讯云|cloud\.tencent)/)) return pick(category, 'domestic');
    if (has(text, /(dmit)/)) return pick(category, 'premium');
    if (has(text, /(搬瓦工|bandwagon|racknerd|greencloud|丽萨主机|lisahost)/)) return pick(category, 'budget');
    return pick(category, 'global');
  }

  if (category === '域名 / DNS / 建站') {
    if (has(text, /(cloudflare)/)) return pick(category, 'dns');
    if (has(text, /(namecheap|namesilo|porkbun|spaceship)/)) return pick(category, 'domain');
    if (has(text, /(vercel|netlify)/)) return pick(category, 'static');
    return pick(category, 'paas');
  }

  if (category === '学术资源') {
    if (has(text, /(arxiv|biorxiv|medrxiv|ssrn)/)) return pick(category, 'preprint');
    if (has(text, /(scholar|semantic scholar|百度学术|必应学术|openalex|crossref|research papers)/)) return pick(category, 'search');
    if (has(text, /(pubmed|cnki|知网|wanfang|web of science|ieee|springer|sciencedirect|jstor|dblp|doaj|core|acl anthology)/)) return pick(category, 'db');
    if (has(text, /(researchgate|zotero|orcid|unpaywall)/)) return pick(category, 'identity');
    if (has(text, /(deepl|google 翻译|translate|mathpix|公式识别|simpletex)/)) return pick(category, 'translate');
    if (has(text, /(overleaf|paperyy)/)) return pick(category, 'writing');
    if (has(text, /(ccf|openreview)/)) return pick(category, 'conf');
    if (has(text, /(papers with code|hf-mirror|modelscope)/)) return pick(category, 'model');
    return pick(category, 'search');
  }

  if (category === '程序员常用网站') {
    if (has(text, /(mdn|devdocs|read the docs|caniuse)/)) return pick(category, 'docs');
    if (has(text, /(github)/)) return pick(category, 'repo');
    if (has(text, /(stack overflow|hacker news|juejin|稀土掘金)/)) return pick(category, 'community');
    if (has(text, /(stackblitz|codepen|jsfiddle)/)) return pick(category, 'ide');
    if (has(text, /(leetcode|roadmap)/)) return pick(category, 'learning');
    if (has(text, /(hugging face)/)) return pick(category, 'ai');
    return pick(category, 'docs');
  }

  if (category === '论坛 / 社区') {
    if (has(text, /(v2ex|nodeseek|linux\.do|deepflood|lobste\.rs|吾爱论坛|52pojie)/)) return pick(category, 'tech');
    if (has(text, /(nga|3dm|小黑盒)/)) return pick(category, 'gaming');
    if (has(text, /(微博|xiaohongshu|小红书|reddit|4chan|tieba|贴吧)/)) return pick(category, 'social');
    if (has(text, /(product hunt)/)) return pick(category, 'product');
    return pick(category, 'general');
  }

  if (category === '有趣') {
    if (has(text, /(yikm|小霸王|my90stv|my 90s tv)/)) return pick(category, 'retro');
    if (has(text, /(a soft murmur|radiooooo|driveandlisten|drive & listen)/)) return pick(category, 'sound');
    if (has(text, /(earth|地球|window-swap|window swap|pointer|uselessweb|sandspi|neal\.fun|web of nothing|小测)/)) return pick(category, 'interactive');
    if (has(text, /(musclewiki|冰山图谱|失传媒|shitjournal|rubbish-journal)/)) return pick(category, 'knowledge');
    return pick(category, 'creative');
  }

  if (category === '实用工具') {
    if (has(text, /(regex101|jsoncrack|cyberchef|crontab\.guru|tmux|devtoys|mermaid\.live|carbon\.now\.sh)/)) return pick(category, 'dev');
    if (has(text, /(tinypng|squoosh|remove\.bg|canva|figma|photopea|nodeimage)/)) return pick(category, 'design');
    if (has(text, /(ilovepdf|convertio|anytoweb|html转网页|image-to-latex|图片转latex|wondercv|简历)/)) return pick(category, 'docs');
    if (has(text, /(test\.ustc|password|uid\.ejfkdev|csdn\.zeroai\.chat|cobalt\.tools|vk-video-downloader)/)) return pick(category, 'security');
    if (has(text, /(n8n|zapier|linear\.app|raycast|gomusic|tunemymusic)/)) return pick(category, 'workflow');
    if (has(text, /(draw\.io|diagrams\.net|excalidraw|openstreetmap)/)) return pick(category, 'map');
    if (has(text, /(黑兔手记|ddgksf2013\.top)/)) return pick(category, 'portal');
    return pick(category, 'dev');
  }

  if (category === '娱乐') {
    if (has(text, /(spotify|soundcloud)/)) return pick(category, 'music');
    if (has(text, /(steam|epicgames|taptap|4399|gamersky|metacritic)/)) return pick(category, 'games');
    if (has(text, /(bilibili|youtube|twitch|vimeo|acfun|douban)/)) return pick(category, 'video');
    if (has(text, /(netflix|libvio|yhdmp|iqiyi|youku|v\.qq|腾讯视频|aidi\.tv|malimali|奈菲影视|网飞tv|btnull|vidhub)/)) return pick(category, 'film');
    return pick(category, 'social');
  }

  if (category === '资源') {
    if (has(text, /(unsplash|pexels|pixabay|iconfont|wallhaven|yande\.re|cgjoy|致美化)/)) return pick(category, 'asset');
    if (has(text, /(rarbg|夸克资源|qkyunso|webhd|switch618|gamer520|flingtrainer|nexusmods|xbgame|workflowy)/)) return pick(category, 'download');
    if (has(text, /(jiumodiary|电子书|archive\.org)/)) return pick(category, 'books');
    if (has(text, /(gitee|sourceforge|csdn|xiaolincoding|luogu)/)) return pick(category, 'dev');
    if (has(text, /(similarsites|alternativeto|g2)/)) return pick(category, 'discovery');
    return pick(category, 'portal');
  }

  if (category === 'AI') {
    if (has(text, /(suno)/)) return pick(category, 'audio');
    if (has(text, /(midjourney|stable video|viggle|nano banana)/)) return pick(category, 'media');
    if (has(text, /(openrouter|deepseek 开放平台|aistudio|google ai studio|httpie\.io\/ai|best ai gate)/)) return pick(category, 'platform');
    if (has(text, /(livebench|artificial analysis|大模型野榜|l yi|wolfram\|alpha|txyz|deepwiki|openclaw)/)) return pick(category, 'eval');
    if (has(text, /(kaggle|replicate)/)) return pick(category, 'model');
    if (has(text, /(zed)/)) return pick(category, 'coding');
    return pick(category, 'chat');
  }

  throw new Error(`Unsupported category: ${category}`);
}

for (const item of items) {
  const assigned = classify(item);
  item.subcategory = assigned.subcategory;
  item.subcategory_en = assigned.subcategory_en;
}

const missing = items.filter((item) => !item.subcategory || !item.subcategory_en);
if (missing.length > 0) {
  throw new Error(`Missing subcategory assignment for ${missing.length} items`);
}

const categoryStats = new Map();
for (const item of items) {
  if (!categoryStats.has(item.category)) {
    categoryStats.set(item.category, new Set());
  }
  categoryStats.get(item.category).add(item.subcategory);
}

const badCategories = [];
for (const [cat, set] of categoryStats.entries()) {
  if (set.size < 2) {
    badCategories.push(cat);
  }
}
if (badCategories.length > 0) {
  throw new Error(`Categories with less than 2 subcategories: ${badCategories.join(', ')}`);
}

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

console.log(`Assigned subcategories for ${items.length} items.`);
for (const [cat, set] of categoryStats.entries()) {
  console.log(`${cat}: ${set.size} subcategories`);
}
