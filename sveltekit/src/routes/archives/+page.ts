import { getAllPosts } from '$lib/content';

export function load() {
	const posts = getAllPosts();
	return {
		posts: posts.map((p) => ({
			slug: p.slug,
			title: p.metadata.title,
			date: p.metadata.date
		}))
	};
}
