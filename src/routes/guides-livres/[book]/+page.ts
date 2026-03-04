import { redirect } from '@sveltejs/kit';
import { getAllBooks } from '$lib/books';

export function entries() {
	return getAllBooks().map((b) => ({ book: b.slug }));
}

export function load({ params }: { params: { book: string } }) {
	redirect(301, `/livres/${params.book}/`);
}
