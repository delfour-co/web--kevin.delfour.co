import { error } from '@sveltejs/kit';
import { getAllBooks, getBookBySlug } from '$lib/books';

export function entries() {
	return getAllBooks().map((b) => ({ book: b.slug }));
}

export function load({ params }: { params: { book: string } }) {
	const book = getBookBySlug(params.book);

	if (!book) {
		error(404, 'Livre non trouvé');
	}

	return {
		book: {
			slug: book.slug,
			title: book.data.title,
			subtitle: book.data.subtitle,
			description: book.data.description,
			cover: book.data.cover
		},
		chapters: book.chapters.map((c) => ({
			slug: c.slug,
			title: c.metadata.title,
			readingTime: c.readingTime,
			chapterNumber: c.chapterNumber
		})),
		totalReadingTime: book.totalReadingTime
	};
}
