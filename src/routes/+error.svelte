<script lang="ts">
	import { page } from '$app/state';

	const messages404 = [
		"Programme introuvable. La grille n'a aucune trace de cette adresse.",
		"Ce secteur de la grille a été dérézé.",
		"Fin de ligne. Ce programme n'existe plus sur le réseau.",
		"Accès refusé par le MCP. Cette zone est hors carte.",
		"Tu viens de sortir de la grille. Demi-tour conseillé.",
		"Ce programme a été rappelé par l'utilisateur. Il n'est plus en ligne.",
		"Signal perdu. Le lightcycle a pris un mauvais virage."
	];

	const randomMessage = messages404[Math.floor(Math.random() * messages404.length)];
</script>

<div class="error-page">
	<!-- Grid background -->
	<div class="grid-bg" aria-hidden="true">
		<div class="grid-floor"></div>
		<div class="scan-line"></div>
	</div>

	<div class="error-content">
		<div class="error-code" aria-hidden="true">
			<span class="digit">{String(page.status)[0]}</span>
			<span class="digit digit--disc">
				<svg viewBox="0 0 120 120" class="identity-disc">
					<circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15" />
					<circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25" stroke-dasharray="4 4" />
					<circle cx="60" cy="60" r="43" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5" />
					<circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="2.5" />
				</svg>
				<span class="disc-digit">{String(page.status)[1]}</span>
			</span>
			<span class="digit">{String(page.status)[2]}</span>
		</div>

		{#if page.status === 404}
			<h1>End of Line</h1>
			<p class="error-message">{randomMessage}</p>
		{:else if page.status === 500}
			<h1>System Failure</h1>
			<p class="error-message">Le programme a rencontré une erreur critique. Le système tente une reconnexion.</p>
		{:else if page.status === 403}
			<h1>Access Denied</h1>
			<p class="error-message">Niveau d'autorisation insuffisant pour accéder à ce secteur de la grille.</p>
		{:else}
			<h1>Error {page.status}</h1>
			<p class="error-message">{page.error?.message || 'Anomalie détectée sur la grille.'}</p>
		{/if}

		<nav class="error-actions">
			<a href="/" class="btn-grid">
				<span class="btn-glow"></span>
				Retour à la grille
			</a>
			<a href="/articles/" class="btn-grid btn-grid--secondary">
				Lire les articles
			</a>
		</nav>

		<div class="error-suggestions">
			<p class="suggestions-label">Programmes disponibles :</p>
			<ul>
				<li><a href="/outils/">Outils</a></li>
				<li><a href="/livres/">Livres</a></li>
				<li><a href="/projets/">Projets</a></li>
				<li><a href="/a-propos/">À propos</a></li>
			</ul>
		</div>
	</div>
</div>

<style>
	.error-page {
		position: relative;
		min-height: calc(100vh - var(--header-height));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	/* Tron grid background */
	.grid-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.grid-floor {
		position: absolute;
		bottom: 0;
		left: -50%;
		width: 200%;
		height: 60%;
		background:
			linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
			linear-gradient(0deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
		background-size: 60px 60px;
		transform: perspective(500px) rotateX(60deg);
		transform-origin: bottom center;
		mask-image: linear-gradient(to top, rgba(0,0,0,0.4), transparent 80%);
		-webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.4), transparent 80%);
	}

	.scan-line {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
		animation: scan 4s ease-in-out infinite;
	}

	@keyframes scan {
		0%, 100% { top: 20%; opacity: 0; }
		10% { opacity: 1; }
		90% { opacity: 1; }
		50% { top: 80%; }
	}

	/* Content */
	.error-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	/* Error code with identity disc */
	.error-code {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-bottom: 24px;
	}

	.digit {
		font-family: var(--font-heading);
		font-size: 7rem;
		font-weight: 700;
		color: var(--accent);
		text-shadow: 0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2);
		line-height: 1;
	}

	.digit--disc {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 130px;
		height: 130px;
	}

	.identity-disc {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		color: var(--accent);
		filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.4));
		animation: disc-spin 10s linear infinite;
	}

	.disc-digit {
		position: relative;
		z-index: 1;
		font-family: var(--font-heading);
		font-size: 7rem;
		font-weight: 700;
		color: var(--accent);
		text-shadow: 0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2);
		line-height: 1;
	}

	@keyframes disc-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	h1 {
		font-size: 1.5rem;
		font-family: var(--font-ui);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--accent);
		margin: 0 0 12px;
		text-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
	}

	.error-message {
		font-size: 1rem;
		color: var(--secondary);
		margin: 0 0 calc(var(--gap) * 2.5);
		max-width: 440px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.6;
	}

	/* Tron-style buttons */
	.error-actions {
		display: flex;
		justify-content: center;
		gap: 16px;
		flex-wrap: wrap;
		margin-bottom: calc(var(--gap) * 3);
	}

	.btn-grid {
		position: relative;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--accent);
		text-decoration: none;
		padding: 12px 28px;
		border: 1px solid var(--accent);
		border-radius: 0;
		background: transparent;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.btn-grid:hover {
		background: var(--accent);
		color: #000;
		text-decoration: none;
		box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1);
	}

	.btn-grid--secondary {
		border-color: var(--border);
		color: var(--secondary);
	}

	.btn-grid--secondary:hover {
		border-color: var(--accent);
		background: rgba(6, 182, 212, 0.1);
		color: var(--accent);
	}

	/* Suggestions */
	.error-suggestions {
		border-top: 1px solid rgba(6, 182, 212, 0.15);
		padding-top: calc(var(--gap) * 1.5);
		max-width: 320px;
		margin: 0 auto;
	}

	.suggestions-label {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 12px;
	}

	.error-suggestions ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.error-suggestions a {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		text-decoration: none;
		transition: var(--transition);
		position: relative;
	}

	.error-suggestions a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--accent);
		transition: width 0.3s ease;
	}

	.error-suggestions a:hover {
		color: var(--accent);
	}

	.error-suggestions a:hover::after {
		width: 100%;
	}

	@media (max-width: 640px) {
		.digit {
			font-size: 4.5rem;
		}

		.digit--disc {
			width: 85px;
			height: 85px;
		}

		.disc-digit {
			font-size: 4.5rem;
		}

		.error-suggestions ul {
			flex-wrap: wrap;
			gap: 12px;
		}
	}
</style>
