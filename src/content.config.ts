import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const resourceItemSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  summary: z.string().min(1),
  category: z.string().min(1),
  title_en: z.string().min(1).optional(),
  summary_en: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  note: z.string().optional(),
});

const resources = defineCollection({
  loader: file('src/content/resources/resources.json', {
    parser: (text) => {
      const parsed = JSON.parse(text) as
        | { items?: unknown[] }
        | { resources?: { items?: unknown[] } };

      const rawItems =
        (typeof parsed === 'object' && parsed && 'resources' in parsed
          ? parsed.resources?.items
          : 'items' in parsed
            ? parsed.items
            : []) ?? [];

      return rawItems.map((item, index) => ({
        id: `resource-${index + 1}`,
        ...(item as Record<string, unknown>),
      }));
    },
  }),
  schema: resourceItemSchema,
});

export const collections = {
  resources,
};