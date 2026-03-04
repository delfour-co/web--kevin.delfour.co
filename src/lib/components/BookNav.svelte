<script lang="ts">
	let { bookSlug, bookTitle, prevChapter, nextChapter, currentIndex, totalChapters } = $props<{
		bookSlug: string;
		bookTitle: string;
		prevChapter: { slug: string; title: string } | null;
		nextChapter: { slug: string; title: string } | null;
		currentIndex: number;
		totalChapters: number;
	}>();
</script>

<nav class="book-nav" aria-label="Navigation chapitres">
	<!-- Progress -->
	<div class="nav-progress">
		<div class="progress-bar">
			<div class="progress-fill" style="width: {(currentIndex / totalChapters) * 100}%"></div>
		</div>
		<span class="progress-text">Chapitre {currentIndex} / {totalChapters}</span>
	</div>

	<!-- Navigation buttons -->
	<div class="nav-row">
		{#if prevChapter}
			<a href="/livres/{bookSlug}/{prevChapter.slug}/" class="nav-btn nav-prev">
				<span class="nav-arrow" aria-hidden="true">←</span>
				<span class="nav-content">
					<span class="nav-label">Chapitre précédent</span>
					<span class="nav-title">{prevChapter.title}</span>
				</span>
			</a>
		{:else}
			<a href="/livres/{bookSlug}/" class="nav-btn nav-prev">
				<span class="nav-arrow" aria-hidden="true">←</span>
				<span class="nav-content">
					<span class="nav-label">Retour</span>
					<span class="nav-title">Table des matières</span>
				</span>
			</a>
		{/if}

		{#if nextChapter}
			<a href="/livres/{bookSlug}/{nextChapter.slug}/" class="nav-btn nav-next nav-btn--primary">
				<span class="nav-content">
					<span class="nav-label">Chapitre suivant</span>
					<span class="nav-title">{nextChapter.title}</span>
				</span>
				<span class="nav-arrow" aria-hidden="true">→</span>
			</a>
		{:else}
			<a href="/livres/{bookSlug}/" class="nav-btn nav-next nav-btn--finish">
				<span class="nav-content">
					<span class="nav-label">Fin du livre</span>
					<span class="nav-title">Retour à la table des matières</span>
				</span>
				<span class="nav-arrow" aria-hidden="true">✓</span>
			</a>
		{/if}
	</div>

	<a href="/livres/{bookSlug}/" class="back-toc">
		Voir la table des matières complète
	</a>
</nav>

<style>
	.book-nav {
		margin-top: calc(var(--gap) * 3);
		padding-top: calc(var(--gap) * 2);
		border-top: 1px solid var(--border);
	}

	/* Progress bar */
	.nav-progress {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.progress-bar {
		flex: 1;
		height: 4px;
		background: var(--border);
		border-radius: 2px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 2px;
		transition: width 0.3s ease;
	}

	.progress-text {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		white-space: nowrap;
	}

	/* Navigation buttons */
	.nav-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
		margin-bottom: var(--gap);
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
	}

	.nav-btn:hover {
		border-color: var(--accent);
		box-shadow: var(--shadow-sm);
		text-decoration: none;
	}

	.nav-btn--primary {
		background: var(--accent);
		border-color: var(--accent);
		color: white;
	}

	.nav-btn--primary:hover {
		opacity: 0.9;
		box-shadow: var(--shadow-md);
	}

	.nav-btn--finish {
		background: var(--accent-light);
		border-color: var(--accent);
	}

	.nav-next {
		text-align: right;
		justify-content: flex-end;
	}

	.nav-arrow {
		font-size: 1.2rem;
		flex-shrink: 0;
	}

	.nav-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.nav-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.nav-btn--primary .nav-label {
		color: rgba(255, 255, 255, 0.8);
	}

	.nav-title {
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.3;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.back-toc {
		display: block;
		text-align: center;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		text-decoration: none;
		padding: 8px;
	}

	.back-toc:hover {
		color: var(--accent);
	}

	@media (max-width: 640px) {
		.nav-row {
			grid-template-columns: 1fr;
		}

		.nav-next {
			text-align: left;
			justify-content: flex-start;
		}

		.nav-title {
			white-space: normal;
		}
	}
</style>
