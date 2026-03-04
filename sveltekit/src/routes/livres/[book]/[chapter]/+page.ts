import { error } from '@sveltejs/kit';
import { getAllBooks, getBookBySlug } from '$lib/books';

export function entries() {
	const allBooks = getAllBooks();
	const entries: { book: string; chapter: string }[] = [];

	for (const book of allBooks) {
		for (const chapter of book.chapters) {
			entries.push({ book: book.slug, chapter: chapter.slug });
		}
	}

	return entries;
}

export function load({ params }: { params: { book: string; chapter: string } }) {
	const book = getBookBySlug(params.book);

	if (!book) {
		error(404, 'Livre non trouvé');
	}

	const chapterIndex = book.chapters.findIndex((c) => c.slug === params.chapter);

	if (chapterIndex === -1) {
		error(404, 'Chapitre non trouvé');
	}

	const chapter = book.chapters[chapterIndex];
	const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
	const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : null;

	return {
		book: {
			slug: book.slug,
			title: book.data.title
		},
		chapter: {
			title: chapter.metadata.title,
			component: chapter.component,
			readingTime: chapter.readingTime,
			chapterNumber: chapter.chapterNumber
		},
		prevChapter: prevChapter ? { slug: prevChapter.slug, title: prevChapter.metadata.title } : null,
		nextChapter: nextChapter ? { slug: nextChapter.slug, title: nextChapter.metadata.title } : null,
		currentIndex: chapterIndex + 1,
		totalChapters: book.chapters.length
	};
}
