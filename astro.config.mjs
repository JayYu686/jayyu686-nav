// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://jayyu686.top',
	integrations: [sitemap()],
	i18n: {
		locales: ['zh', 'en'],
		defaultLocale: 'zh',
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
