import { getAllPosts } from '$lib/content';
import { getAllBooks } from '$lib/books';

const SITE_URL = 'https://kevin.delfour.co';

export const prerender = true;

export function GET() {
	const posts = getAllPosts();
	const books = getAllBooks();

	const staticPages = [
		{ path: '/', priority: '1.0' },
		{ path: '/articles/', priority: '0.9' },
		{ path: '/livres/', priority: '0.8' },
		{ path: '/outils/', priority: '0.8' },
		{ path: '/projets/', priority: '0.7' },
		{ path: '/vision/', priority: '0.7' },
		{ path: '/a-propos/', priority: '0.7' },
		{ path: '/contact/', priority: '0.6' },
		{ path: '/archives/', priority: '0.5' },
		{ path: '/benevolat/', priority: '0.5' },
		{ path: '/search/', priority: '0.4' }
	];

	const categories = ['leadership', 'décision', 'craft', 'organisation', 'pratiques', 'parcours'];

	const urls: string[] = [];

	// Static pages
	for (const page of staticPages) {
		urls.push(`
	<url>
		<loc>${SITE_URL}${page.path}</loc>
		<priority>${page.priority}</priority>
		<changefreq>weekly</changefreq>
	</url>`);
	}

	// Articles
	for (const post of posts) {
		urls.push(`
	<url>
		<loc>${SITE_URL}/articles/${post.slug}/</loc>
		<lastmod>${new Date(post.metadata.date).toISOString().split('T')[0]}</lastmod>
		<priority>0.6</priority>
		<changefreq>monthly</changefreq>
	</url>`);
	}

	// Categories
	for (const cat of categories) {
		urls.push(`
	<url>
		<loc>${SITE_URL}/categories/${cat}/</loc>
		<priority>0.5</priority>
		<changefreq>weekly</changefreq>
	</url>`);
	}

	// Books and chapters
	for (const book of books) {
		urls.push(`
	<url>
		<loc>${SITE_URL}/livres/${book.slug}/</loc>
		<priority>0.7</priority>
		<changefreq>monthly</changefreq>
	</url>`);

		for (const chapter of book.chapters) {
			urls.push(`
	<url>
		<loc>${SITE_URL}/livres/${book.slug}/${chapter.slug}/</loc>
		<priority>0.6</priority>
		<changefreq>monthly</changefreq>
	</url>`);
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
