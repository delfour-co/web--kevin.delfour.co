<script lang="ts">
	import { CONTACT } from '$lib/data/profile';

	const year = new Date().getFullYear();
</script>

<footer class="footer" data-pagefind-ignore>
	<div class="shell footer-inner">
		<nav class="footer-columns" aria-label="Navigation pied de page">
			<div class="footer-column">
				<h2>Parcours</h2>
				<a href="/leadership/">Leadership</a>
				<a href="/cv/">CV</a>
				<a href="/conferences/">Conférences</a>
				<a href="/communaute/">Communauté</a>
			</div>

			<div class="footer-column">
				<h2>Ressources</h2>
				<a href="/livres/">Livres</a>
				<a href="/outils/">Boîte à outils</a>
				<a href="/projets/">Projets</a>
				<a href="/search/">Rechercher</a>
			</div>

			<div class="footer-column">
				<h2>Me joindre</h2>
				<a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
				<a href={CONTACT.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a>
				<a href={CONTACT.github} rel="noopener noreferrer" target="_blank">GitHub</a>
			</div>
		</nav>

		<div class="footer-bottom">
			<span>&copy; {year} Kevin Delfour</span>
			<span>Lyon, France</span>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--border);
		background: var(--surface);
		margin-top: auto;
	}

	.footer-inner {
		padding-block: clamp(36px, 5vw, 52px) 28px;
	}

	.footer-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 32px;
		margin-bottom: 40px;
	}

	.footer-column {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: flex-start;
	}

	.footer-column h2 {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-label);
		color: var(--tertiary);
		margin: 0 0 4px;
	}

	.footer-column a {
		font-size: var(--text-sm);
		color: var(--secondary);
		word-break: break-word;
	}
	.footer-column a:hover {
		color: var(--accent);
	}

	.footer-bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
		font-size: var(--text-xs);
		color: var(--tertiary);
	}
</style>
