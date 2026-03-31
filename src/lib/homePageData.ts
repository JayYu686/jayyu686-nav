import { getCollection } from 'astro:content';
import type { Messages } from '../i18n/zh';
import resourcesJson from '../content/resources/resources.json';

interface ResourceRecord {
  title: string;
  summary: string;
  url: string;
  category: string;
  sourceIndex?: number;
  updatedAt?: string;
  subcategory?: string;
  subcategory_en?: string;
  title_en?: string;
  summary_en?: string;
}

interface LocalizedResource extends ResourceRecord {
  title: string;
  summary: string;
  subcategory: string;
  searchableName: string;
  sourceCategoryLabel?: string;
}

export interface FilterCategory {
  value: string;
  label: string;
}

export interface GroupedResources {
  id: string;
  category: string;
  categoryLabel: string;
  countLabel: string;
  items: LocalizedResource[];
}

export interface HomePageData {
  categories: FilterCategory[];
  resourcesByCategory: GroupedResources[];
  recentCategoryValue: string;
}

export type SupportedLocale = 'zh' | 'en';

const RECENT_LIMIT = 16;
const RECENT_CATEGORY_BY_LOCALE: Record<SupportedLocale, string> = {
  zh: '最近更新',
  en: 'Recent Updates',
};

const DEFAULT_SUBCATEGORY_BY_LOCALE: Record<SupportedLocale, string> = {
  zh: '未分组',
  en: 'Uncategorized',
};

const CATEGORY_ORDER = [
  '实用工具',
  '程序员常用网站',
  '论坛 / 社区',
  '学术资源',
  'AI',
  '资源',
  '娱乐',
  '有趣',
  'VPS / 云服务',
  '域名 / DNS / 建站',
];

const ISO_8601_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

const resolveUpdatedTime = (value?: string) => {
  if (!value || !ISO_8601_WITH_OFFSET.test(value)) {
    return null;
  }

  const ts = Date.parse(value);
  return Number.isFinite(ts) ? ts : null;
};

const getFallbackItems = (): ResourceRecord[] => {
  const parsed = resourcesJson as { items?: ResourceRecord[]; resources?: { items?: ResourceRecord[] } };
  return (parsed.resources?.items ?? parsed.items ?? []) as ResourceRecord[];
};

const buildLocalizedItems = (rawItems: ResourceRecord[], locale: SupportedLocale): LocalizedResource[] => {
  const defaultSubcategory = DEFAULT_SUBCATEGORY_BY_LOCALE[locale];

  return rawItems.map((item) => {
    if (locale === 'en') {
      return {
        ...item,
        title: item.title_en || item.title,
        summary: item.summary_en || item.summary,
        subcategory: item.subcategory_en || item.subcategory || defaultSubcategory,
        searchableName: [
          item.title_en,
          item.title,
          item.summary_en,
          item.summary,
          item.subcategory_en,
          item.subcategory,
        ].filter(Boolean).join(' '),
      };
    }

    return {
      ...item,
      title: item.title,
      summary: item.summary,
      subcategory: item.subcategory || item.subcategory_en || defaultSubcategory,
      searchableName: [
        item.title,
        item.title_en,
        item.summary,
        item.summary_en,
        item.subcategory,
        item.subcategory_en,
      ].filter(Boolean).join(' '),
    };
  });
};

export const buildHomePageData = async (messages: Messages, locale: SupportedLocale): Promise<HomePageData> => {
  const entries = await getCollection('resources');
  const fallbackItems = getFallbackItems();

  const rawItems: ResourceRecord[] = entries.length > 0
    ? entries.map((entry) => entry.data as ResourceRecord)
    : fallbackItems;

  const localizedItems = buildLocalizedItems(rawItems, locale);
  const recentCategory = RECENT_CATEGORY_BY_LOCALE[locale];

  const categoryKeys: string[] = [...new Set(localizedItems.map((item) => item.category))].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    const ax = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bx = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    return ax - bx;
  });

  const recentItems = localizedItems
    .map((item, index) => ({
      item,
      sortIndex: typeof item.sourceIndex === 'number' ? item.sourceIndex : index,
      updatedTime: resolveUpdatedTime(item.updatedAt),
    }))
    .sort((a, b) => {
      if (a.updatedTime !== null && b.updatedTime !== null) {
        return b.updatedTime - a.updatedTime;
      }
      if (a.updatedTime !== null) {
        return -1;
      }
      if (b.updatedTime !== null) {
        return 1;
      }
      return b.sortIndex - a.sortIndex;
    })
    .slice(0, RECENT_LIMIT)
    .map((entry) => ({
      ...entry.item,
      category: recentCategory,
      sourceCategoryLabel: messages.categoryNames[entry.item.category] ?? entry.item.category,
    }));

  const categories: FilterCategory[] = [
    { value: messages.ui.allCategory, label: messages.ui.allCategory },
    { value: recentCategory, label: messages.categoryNames[recentCategory] ?? recentCategory },
    ...categoryKeys.map((key) => ({ value: key, label: messages.categoryNames[key] ?? key })),
  ];

  const resourcesByCategory: GroupedResources[] = [
    {
      id: 'cat-recent',
      category: recentCategory,
      categoryLabel: messages.categoryNames[recentCategory] ?? recentCategory,
      countLabel: `${recentItems.length} ${messages.ui.siteCount}`,
      items: recentItems,
    },
    ...categoryKeys.map((category, index) => {
      const items = localizedItems.filter((item) => item.category === category);
      return {
        id: `cat-${index + 1}`,
        category,
        categoryLabel: messages.categoryNames[category] ?? category,
        countLabel: `${items.length} ${messages.ui.siteCount}`,
        items,
      };
    }),
  ];

  return {
    categories,
    resourcesByCategory,
    recentCategoryValue: recentCategory,
  };
};
