import { error } from '@sveltejs/kit';
import { getAllPosts, getPostBySlug } from '$lib/content';

export function entries() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		error(404, 'Article non trouvé');
	}

	const allPosts = getAllPosts();
	const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
	const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
	const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

	return {
		component: post.component,
		metadata: post.metadata,
		prevPost: prevPost ? { slug: prevPost.slug, title: prevPost.metadata.title } : null,
		nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.metadata.title } : null
	};
}
