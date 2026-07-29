import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { remarkEscapeSvelte } from './src/lib/remark-escape-svelte.js';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-light', 'github-dark'],
	langs: [
		'javascript', 'typescript', 'python', 'rust', 'bash', 'shell',
		'json', 'yaml', 'html', 'css', 'sql', 'go', 'java',
		'dockerfile', 'markdown', 'diff', 'graphql', 'toml', 'xml'
	]
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx'],
			smartypants: false,
			remarkPlugins: [remarkEscapeSvelte],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: 'wrap' }]
			],
			highlight: {
				highlighter: (code, lang) => {
					const validLang = highlighter.getLoadedLanguages().includes(lang || '') ? lang : 'text';
					const html = highlighter.codeToHtml(code, {
						lang: validLang || 'text',
						themes: {
							light: 'github-light',
							dark: 'github-dark'
						}
					});
					return `{@html \`${html.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}`;
				}
			}
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// GitHub Pages sert 404.html pour toute URL inconnue : c'est ce qui
			// permet à +error.svelte de s'afficher au lieu de la page par défaut.
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
