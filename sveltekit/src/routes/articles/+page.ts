import { getAllPosts } from '$lib/content';

export function load() {
	const posts = getAllPosts();
	return {
		posts: posts.map((p) => ({
			slug: p.slug,
			title: p.metadata.title,
			description: p.metadata.description,
			date: p.metadata.date,
			categories: p.metadata.categories || [],
			readingTime: p.metadata.readingTime || 0
		}))
	};
}
