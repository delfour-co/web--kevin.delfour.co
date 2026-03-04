<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-page">
	<h1>{page.status}</h1>
	<p class="error-message">
		{#if page.status === 404}
			Page non trouvée. Le contenu a peut-être été déplacé.
		{:else}
			Une erreur est survenue.
		{/if}
	</p>
	<a href="/" class="error-link">Retour à l'accueil</a>
</div>

<style>
	.error-page {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 4) var(--gap);
		text-align: center;
	}

	h1 {
		font-size: 4rem;
		color: var(--accent);
		margin: 0;
	}

	.error-message {
		font-size: 1.2rem;
		color: var(--secondary);
		margin: var(--gap) 0 calc(var(--gap) * 2);
	}

	.error-link {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--accent);
		text-decoration: none;
		padding: 10px 24px;
		border: 1px solid var(--accent);
		border-radius: 8px;
		transition: var(--transition);
	}

	.error-link:hover {
		background: var(--accent);
		color: white;
		text-decoration: none;
	}
</style>
