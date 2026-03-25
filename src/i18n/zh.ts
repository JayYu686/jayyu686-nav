export interface Messages {
  lang: string;
  pageTitle: string;
  pageDescription: string;
  ui: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    recentVisits: string;
    clearRecentVisits: string;
    subcategoryFilterLabel: string;
    allSubcategoryLabel: string;
    allCategory: string;
    quickJump: string;
    emptyText: string;
    backTopLabel: string;
    languageButtonLabel: string;
    languageButtonText: string;
    elevatorAriaLabel: string;
    siteCount: string;
    themeToggleLabel: string;
    effectToggleLabel: string;
  };
  categoryNames: Record<string, string>;
}

export const zhMessages: Messages = {
  lang: 'zh-CN',
  pageTitle: 'Jay Yu の 资源导航站',
  pageDescription: '',
  ui: {
    heroTitle: 'Jay Yu の 资源导航站',
    heroSubtitle: '',
    searchPlaceholder: '输入名称或拼音全拼搜索...',
    recentVisits: '最近访问',
    clearRecentVisits: '清空最近访问',
    subcategoryFilterLabel: '二级筛选',
    allSubcategoryLabel: '全部二级',
    allCategory: '全部',
    quickJump: '快速跳转',
    emptyText: '没有找到匹配的资源',
    backTopLabel: '返回顶部',
    languageButtonLabel: '切换到英文',
    languageButtonText: 'EN',
    elevatorAriaLabel: '分类快速导航',
    siteCount: '个站点',
    themeToggleLabel: '切换主题',
    effectToggleLabel: '切换动效',
  },
  categoryNames: {
    '最近更新': '最近更新',
    'VPS / 云服务': 'VPS / 云服务',
    '域名 / DNS / 建站': '域名 / DNS / 建站',
    '学术资源': '学术资源',
    '论坛 / 社区': '论坛 / 社区',
    '程序员常用网站': '程序员常用网站',
    'AI': 'AI',
    '有趣': '有趣',
    '实用工具': '实用工具',
    '娱乐': '娱乐',
    '资源': '资源',
  },
};
