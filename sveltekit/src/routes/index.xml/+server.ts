import { getAllPosts } from '$lib/content';

const SITE_URL = 'https://kevin.delfour.co';

export const prerender = true;

export function GET() {
	const posts = getAllPosts();

	const items = posts
		.slice(0, 50)
		.map(
			(post) => `
		<item>
			<title><![CDATA[${post.metadata.title}]]></title>
			<description><![CDATA[${post.metadata.description || ''}]]></description>
			<link>${SITE_URL}/articles/${post.slug}/</link>
			<guid isPermaLink="true">${SITE_URL}/articles/${post.slug}/</guid>
			<pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
			${post.metadata.categories?.map((c: string) => `<category>${c}</category>`).join('\n\t\t\t') || ''}
		</item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Kevin Delfour — CTO</title>
		<description>Des repères pour CTO et leaders tech. Pas des leçons.</description>
		<link>${SITE_URL}</link>
		<atom:link href="${SITE_URL}/index.xml" rel="self" type="application/rss+xml"/>
		<language>fr</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
