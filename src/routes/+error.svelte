<script lang="ts">
	import { page } from '$app/state';

	const titles: Record<number, string> = {
		404: 'Page introuvable',
		403: 'Accès refusé',
		500: 'Erreur serveur'
	};

	const messages: Record<number, string> = {
		404: "Cette adresse ne correspond à aucune page du site. Elle a peut-être été déplacée lors d'une refonte.",
		403: "Cette page existe, mais elle n'est pas accessible.",
		500: 'Le serveur a rencontré une erreur inattendue.'
	};

	const title = $derived(titles[page.status] ?? 'Une erreur est survenue');
	const message = $derived(
		messages[page.status] ?? page.error?.message ?? "La page demandée n'a pas pu être affichée."
	);
</script>

<div class="page error-page">
	<span class="code" aria-hidden="true">{page.status}</span>
	<h1>{title}</h1>
	<p class="lead">{message}</p>

	<nav class="links" aria-label="Pages principales">
		<a href="/">Accueil</a>
		<a href="/leadership/">Leadership</a>
		<a href="/cv/">CV</a>
		<a href="/livres/">Livres</a>
		<a href="/outils/">Boîte à outils</a>
		<a href="/contact/">Contact</a>
	</nav>
</div>

<style>
	.error-page {
		max-width: 62ch;
		padding-block: clamp(56px, 10vw, 120px) var(--space-section);
	}

	.code {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: var(--tracking-label);
		color: var(--tertiary);
		margin-bottom: 16px;
	}

	h1 {
		font-size: var(--text-display);
		margin-bottom: 16px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 20px;
		margin-top: 36px;
		padding-top: 28px;
		border-top: 1px solid var(--border);
		font-size: var(--text-sm);
	}
</style>
