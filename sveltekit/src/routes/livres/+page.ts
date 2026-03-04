import { getAllBooks } from '$lib/books';

export function load() {
	const books = getAllBooks();
	return {
		books: books.map((b) => ({
			slug: b.slug,
			title: b.data.title,
			subtitle: b.data.subtitle,
			description: b.data.description,
			cover: b.data.cover,
			chapterCount: b.chapters.length
		}))
	};
}
