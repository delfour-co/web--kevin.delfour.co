import { getAllBooks } from '$lib/books';
import { tools } from '$lib/data/tools';
import { visibleProjects } from '$lib/data/projects';

const SITE_URL = 'https://kevin.delfour.co';

export const prerender = true;

export function GET() {
	const books = getAllBooks();

	const staticPages = [
		{ path: '/', priority: '1.0' },
		{ path: '/leadership/', priority: '0.9' },
		{ path: '/cv/', priority: '0.9' },
		{ path: '/a-propos/', priority: '0.8' },
		{ path: '/livres/', priority: '0.8' },
		{ path: '/outils/', priority: '0.8' },
		{ path: '/conferences/', priority: '0.7' },
		{ path: '/communaute/', priority: '0.7' },
		{ path: '/projets/', priority: '0.6' },
		{ path: '/contact/', priority: '0.6' },
		{ path: '/search/', priority: '0.4' }
	];

	const urls: string[] = [];

	const push = (path: string, priority: string, changefreq = 'monthly') => {
		urls.push(`
	<url>
		<loc>${SITE_URL}${path}</loc>
		<priority>${priority}</priority>
		<changefreq>${changefreq}</changefreq>
	</url>`);
	};

	for (const page of staticPages) {
		push(page.path, page.priority, 'weekly');
	}

	// Les 21 outils — chacun est une page à part entière.
	for (const tool of tools) {
		push(tool.url, '0.7');
	}

	// Pages projet détaillées (les projets sans page ne sont pas des URLs du site).
	for (const project of visibleProjects) {
		if (project.hasPage) {
			push(`/projets/${project.slug}/`, '0.5');
		}
	}

	for (const book of books) {
		push(`/livres/${book.slug}/`, '0.7');
		for (const chapter of book.chapters) {
			push(`/livres/${book.slug}/${chapter.slug}/`, '0.6');
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
