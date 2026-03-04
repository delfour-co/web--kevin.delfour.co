import { books, type BookData } from '$lib/data/books';

interface ChapterMetadata {
	title: string;
	description?: string;
}

export interface Chapter {
	slug: string;
	filename: string;
	metadata: ChapterMetadata;
	component: any;
	readingTime: number;
	wordCount: number;
	chapterNumber: string;
}

export interface Book {
	slug: string;
	data: BookData;
	chapters: Chapter[];
	totalReadingTime: number;
}

function slugify(filename: string): string {
	return filename
		.replace('.md', '')
		.replace(/\s+/g, '-')
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

function extractChapterNumber(filename: string): string {
	const match = filename.match(/^([0-9.]+)-/);
	return match ? match[1] : '';
}

function computeReadingTime(content: string): { readingTime: number; wordCount: number } {
	const stripped = content.replace(/^---[\s\S]*?---/, '');
	const words = stripped.trim().split(/\s+/).filter((w) => w.length > 0);
	const wordCount = words.length;
	const readingTime = Math.max(1, Math.round(wordCount / 230));
	return { readingTime, wordCount };
}

export function getAllBooks(): Book[] {
	const modules = import.meta.glob('/src/content/livres/*/*.md', { eager: true }) as Record<
		string,
		{ default: any; metadata: ChapterMetadata }
	>;

	const rawModules = import.meta.glob('/src/content/livres/*/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const bookMap = new Map<string, Chapter[]>();

	for (const [path, module] of Object.entries(modules)) {
		const parts = path.split('/');
		const bookSlug = parts[parts.length - 2];
		const filename = parts[parts.length - 1];
		const chapterSlug = slugify(filename);
		const chapterNumber = extractChapterNumber(filename);

		const rawContent = rawModules[path] || '';
		const { readingTime, wordCount } = computeReadingTime(rawContent);

		if (!bookMap.has(bookSlug)) {
			bookMap.set(bookSlug, []);
		}

		bookMap.get(bookSlug)!.push({
			slug: chapterSlug,
			filename,
			metadata: module.metadata || { title: filename.replace('.md', '') },
			component: module.default,
			readingTime,
			wordCount,
			chapterNumber
		});
	}

	// Sort chapters by filename (zero-padded)
	for (const chapters of bookMap.values()) {
		chapters.sort((a, b) => a.filename.localeCompare(b.filename));
	}

	return books
		.map((bookData) => {
			const chapters = bookMap.get(bookData.slug) || [];
			const totalReadingTime = chapters.reduce((sum, c) => sum + c.readingTime, 0);
			return {
				slug: bookData.slug,
				data: bookData,
				chapters,
				totalReadingTime
			};
		})
		.filter((b) => b.chapters.length > 0);
}

export function getBookBySlug(slug: string): Book | undefined {
	return getAllBooks().find((b) => b.slug === slug);
}
