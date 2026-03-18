import { defineCollection, z } from 'astro:content';

const resources = defineCollection({
  type: 'data',
  schema: z.object({
    items: z.array(
      z.object({
        title: z.string().min(1),
        url: z.string().url(),
        summary: z.string().min(1),
        category: z.string().min(1),
        subcategory: z.string().min(1).optional(),
        subcategory_en: z.string().min(1).optional(),
        title_en: z.string().min(1).optional(),
        summary_en: z.string().min(1).optional(),
        tags: z.array(z.string()).optional(),
        note: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  resources,
};
