import { getAllPosts } from '$lib/content';
import { getAllBooks } from '$lib/books';

export function load() {
	const posts = getAllPosts();
	const books = getAllBooks();

	return {
		latestPosts: posts.slice(0, 6).map((p) => ({
			slug: p.slug,
			title: p.metadata.title,
			description: p.metadata.description,
			date: p.metadata.date,
			categories: p.metadata.categories,
			readingTime: p.metadata.readingTime || 0
		})),
		books: books.map((b) => ({
			slug: b.slug,
			title: b.data.title,
			subtitle: b.data.subtitle,
			cover: b.data.cover,
			chapterCount: b.chapters.length
		}))
	};
}
