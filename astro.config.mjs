// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ['zh', 'en'],
		defaultLocale: 'zh',
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
