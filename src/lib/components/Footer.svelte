<script lang="ts">
	const year = new Date().getFullYear();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="footer">
	<div class="footer-content">
		<nav class="footer-columns" aria-label="Navigation pied de page">
			<div class="footer-column">
				<h3>Explorer</h3>
				<a href="/articles/">Articles</a>
				<a href="/livres/">Livres</a>
				<a href="/projets/">Projets</a>
			</div>

			<div class="footer-column">
				<h3>Découvrir</h3>
				<a href="/outils/">Outils</a>
				<a href="/vision/">Vision</a>
				<a href="/a-propos/">À propos</a>
			</div>

			<div class="footer-column">
				<h3>Suivre</h3>
				<a href="https://github.com/kdelfour" rel="noopener noreferrer" target="_blank">GitHub</a>
				<a href="https://linkedin.com/in/kevindelfour" rel="noopener noreferrer" target="_blank">LinkedIn</a>
			</div>
		</nav>

		<div class="footer-bottom">
			<span>&copy; {year} Kevin Delfour</span>
		</div>
	</div>
</footer>

<button class="back-to-top" onclick={scrollToTop} aria-label="Retour en haut" title="Retour en haut">
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<style>
	.footer {
		border-top: 1px solid var(--border);
		padding: calc(var(--gap) * 2) var(--gap);
		margin-top: calc(var(--gap) * 3);
	}

	.footer-content {
		max-width: var(--home-width);
		margin: 0 auto;
	}

	.footer-columns {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap);
		margin-bottom: calc(var(--gap) * 2);
	}

	.footer-column {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.footer-column h3 {
		font-family: var(--font-ui);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin: 0 0 4px 0;
	}

	.footer-column a {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
		text-decoration: none;
		transition: var(--transition);
	}

	.footer-column a:hover {
		color: var(--accent);
	}

	.footer-bottom {
		padding-top: var(--gap);
		border-top: 1px solid var(--border);
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--tertiary);
	}

	.back-to-top {
		position: fixed;
		bottom: 24px;
		right: 24px;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 50%;
		color: var(--secondary);
		cursor: pointer;
		backdrop-filter: blur(8px);
		transition: var(--transition);
		z-index: 30;
	}

	.back-to-top:hover {
		background: var(--accent-light);
		color: var(--accent);
		border-color: var(--accent-border);
		box-shadow: var(--accent-glow);
	}

	@media (max-width: 600px) {
		.footer-columns {
			grid-template-columns: 1fr;
		}
	}
</style>
