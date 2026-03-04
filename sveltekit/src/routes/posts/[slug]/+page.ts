import { redirect } from '@sveltejs/kit';
import { getAllPosts } from '$lib/content';

export function entries() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	redirect(301, `/articles/${params.slug}/`);
}
