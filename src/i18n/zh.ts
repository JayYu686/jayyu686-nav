export interface Messages {
  lang: string;
  pageTitle: string;
  pageDescription: string;
  ui: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    allCategory: string;
    quickJump: string;
    emptyText: string;
    backTopLabel: string;
    languageButtonLabel: string;
    languageButtonText: string;
    elevatorAriaLabel: string;
    siteCount: string;
    themeToggleLabel: string;
  };
  categoryNames: Record<string, string>;
}

export const zhMessages: Messages = {
  lang: 'zh-CN',
  pageTitle: 'JayYu 资源导航',
  pageDescription:
    '精选优质的高效工具、云平台基础设施、前沿学术资源及开发者必备站点，持续沉淀实用心得与避坑指南。',
  ui: {
    heroTitle: 'JayYu Nav',
    heroSubtitle:
      '精选优质的高效工具、云平台基础设施、前沿学术资源及开发者必备站点，持续沉淀实用心得与避坑指南。',
    searchPlaceholder: '输入名称或拼音全拼搜索...',
    allCategory: '全部',
    quickJump: '快速跳转',
    emptyText: '没有找到匹配的资源',
    backTopLabel: '返回顶部',
    languageButtonLabel: '切换到英文',
    languageButtonText: 'EN',
    elevatorAriaLabel: '分类快速导航',
    siteCount: '个站点',
    themeToggleLabel: '切换主题',
  },
  categoryNames: {
    'VPS / 云服务': 'VPS / 云服务',
    '域名 / DNS / 建站': '域名 / DNS / 建站',
    '学术资源': '学术资源',
    '程序员常用网站': '程序员常用网站',
    '有趣': '有趣',
    '实用工具': '实用工具',
    '娱乐': '娱乐',
    '资源': '资源',
  },
};
