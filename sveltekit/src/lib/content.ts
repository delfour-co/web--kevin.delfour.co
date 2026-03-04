export interface PostMetadata {
	title: string;
	description: string;
	date: string;
	slug: string;
	categories: string[];
	tags: string[];
	featured: boolean;
	ShowToc: boolean;
	TocOpen?: boolean;
	author?: string;
	pillar?: string;
	pillars?: string[];
	audience?: string;
	audiences?: string[];
	series?: string;
	weight?: number;
	readingTime?: number;
	wordCount?: number;
}

export interface Post {
	slug: string;
	metadata: PostMetadata;
	component: any;
}

function computeReadingTime(content: string): { readingTime: number; wordCount: number } {
	// Strip frontmatter
	const stripped = content.replace(/^---[\s\S]*?---/, '');
	// Strip markdown syntax
	const clean = stripped
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]*`/g, '')
		.replace(/!\[.*?\]\(.*?\)/g, '')
		.replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
		.replace(/[#*_~>|-]/g, '')
		.trim();
	const words = clean.split(/\s+/).filter((w) => w.length > 0);
	const wordCount = words.length;
	const readingTime = Math.max(1, Math.ceil(wordCount / 230));
	return { readingTime, wordCount };
}

export function getAllPosts(): Post[] {
	const modules = import.meta.glob('/src/content/posts/*.md', { eager: true }) as Record<
		string,
		{ default: any; metadata: PostMetadata }
	>;

	const rawFiles = import.meta.glob('/src/content/posts/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const posts: Post[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const filename = path.split('/').pop()?.replace('.md', '') || '';
		const slug = module.metadata?.slug || filename;

		const rawContent = rawFiles[path] || '';
		const { readingTime, wordCount } = computeReadingTime(rawContent);

		posts.push({
			slug,
			metadata: {
				...module.metadata,
				readingTime,
				wordCount
			},
			component: module.default
		});
	}

	posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

	return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
	const posts = getAllPosts();
	return posts.find((p) => p.slug === slug);
}
