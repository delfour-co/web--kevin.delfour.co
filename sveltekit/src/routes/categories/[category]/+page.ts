import { getAllPosts } from '$lib/content';

const validCategories = ['leadership', 'décision', 'craft', 'organisation', 'pratiques', 'parcours'];

export function entries() {
	return validCategories.map((category) => ({ category }));
}

export function load({ params }: { params: { category: string } }) {
	const posts = getAllPosts();
	const filtered = posts.filter((p) => p.metadata.categories?.includes(params.category));

	return {
		category: params.category,
		posts: filtered.map((p) => ({
			slug: p.slug,
			title: p.metadata.title,
			description: p.metadata.description,
			date: p.metadata.date,
			readingTime: p.metadata.readingTime || 0
		}))
	};
}
