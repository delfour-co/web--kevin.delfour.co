<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ProjectProgress from '$lib/components/ProjectProgress.svelte';
	import { getProjectStage } from '$lib/data/projects';

	const screenshots = [
		{ src: '/images/apps/notch/notch_001.png', alt: 'Écran d\'accueil Notch' },
		{ src: '/images/apps/notch/notch_002.png', alt: 'Configuration Enigma' },
		{ src: '/images/apps/notch/notch_003.png', alt: 'Visualiseur Enigma animé' },
		{ src: '/images/apps/notch/notch_004.png', alt: 'Chat chiffré SMS' },
		{ src: '/images/apps/notch/notch_005.png', alt: 'Échange de clés QR' },
		{ src: '/images/apps/notch/notch_006.png', alt: 'Mode Turing — cryptanalyse' },
		{ src: '/images/apps/notch/notch_007.png', alt: 'Thèmes et skins' },
		{ src: '/images/apps/notch/notch_008.png', alt: 'Quêtes et badges' }
	];

	let selectedImage: string | null = $state(null);
</script>

<SEO
	title="Notch"
	description="Messagerie SMS chiffrée par Enigma. Pas de serveur, pas d'internet. Juste des rotors et des SMS. En test fermé sur Google Play."
	url="https://kevin.delfour.co/projets/notch/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>Notch</span>
	</nav>

	<header class="app-header">
		<div class="app-identity">
			<img src="/images/apps/notch/icon.webp" alt="Icône Notch" class="app-icon" />
			<div>
				<span class="badge">Application mobile</span>
				<h1>Notch</h1>
				<p class="app-tagline">Messagerie SMS chiffrée par Enigma. Pas de serveur. Pas d'internet. Juste des rotors et des SMS.</p>
			</div>
		</div>
		<span class="status-pill">Test fermé · Google Play</span>
	</header>

	<div class="progress-section">
		<ProjectProgress stage={getProjectStage('notch')!} />
	</div>

	<img src="/images/apps/notch/presentation.webp" alt="Présentation Notch" class="hero-image" />

	<section class="app-section">
		<h2>Le concept</h2>
		<p>Les opérateurs allemands pendant la Seconde Guerre mondiale utilisaient la radio — un canal ouvert — pour transmettre des messages chiffrés par Enigma. Le SMS fonctionne exactement de la même manière : un canal "en clair" qui transporte du texte chiffré.</p>
		<p>Notch reproduit fidèlement le mécanisme de chiffrement de la machine Enigma et l'utilise pour échanger des messages par SMS. Le nom fait référence à l'encoche (<em>notch</em>) des rotors — le minuscule détail mécanique qui déclenche la rotation et rend tout le système possible.</p>
		<div class="disclaimer glass-card">
			<p><strong>Projet éducatif et ludique.</strong> Enigma a été cassée en 1940 par les équipes de Bletchley Park. Cette app n'est pas une solution de sécurité — c'est une façon interactive de comprendre comment fonctionnait l'un des systèmes cryptographiques les plus célèbres de l'histoire.</p>
		</div>
	</section>

	<section class="app-section">
		<h2>Comment ça fonctionne</h2>
		<div class="steps">
			<div class="step glass-card">
				<span class="step-number">1</span>
				<div>
					<h3>Rencontre en personne</h3>
					<p>Tu scannes un QR code avec ton contact pour partager une configuration Enigma : rotors, positions, plugboard.</p>
				</div>
			</div>
			<div class="step glass-card">
				<span class="step-number">2</span>
				<div>
					<h3>Tape ton message</h3>
					<p>L'app le chiffre avec Enigma et l'envoie par SMS. Le texte envoyé est illisible pour quiconque l'intercepte.</p>
				</div>
			</div>
			<div class="step glass-card">
				<span class="step-number">3</span>
				<div>
					<h3>Réception automatique</h3>
					<p>Ton contact reçoit le SMS, l'app le déchiffre et affiche le message en clair. Pas de serveur. Pas de compte. Pas d'internet.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="app-section">
		<h2>Caractéristiques</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Moteur Enigma fidèle</h3>
				<p>Classic M3 (3 rotors, 26 caractères) et Pro M4 (4 rotors, 95 caractères). Double stepping conforme à l'original.</p>
			</div>
			<div class="feature glass-card">
				<h3>Visualiseur animé</h3>
				<p>Le signal trace son chemin à travers les rotors en temps réel. Animation séquentielle avec glow.</p>
			</div>
			<div class="feature glass-card">
				<h3>Mode Turing</h3>
				<p>Cryptanalyse pédagogique : analyse de fréquences, crib-dragging, cassage pas à pas. Comprendre comment Bletchley Park a vaincu Enigma.</p>
			</div>
			<div class="feature glass-card">
				<h3>Rotation automatique des clés</h3>
				<p>Une méta-Enigma dérive de nouvelles configurations tous les 50 messages (Classic) ou 20 (Pro). Sans aucun échange.</p>
			</div>
			<div class="feature glass-card">
				<h3>745 tests</h3>
				<p>Tests unitaires et d'intégration. Vecteurs historiques, symétrie, double stepping, protocole SMS NTH:2.</p>
			</div>
			<div class="feature glass-card">
				<h3>Quêtes et badges</h3>
				<p>Dates historiques, événements saisonniers, badges militaires. Un système de quêtes qui rend hommage à l'histoire d'Enigma.</p>
			</div>
		</div>
	</section>

	<section class="app-section">
		<h2>Deux versions</h2>
		<div class="versions-grid">
			<div class="version glass-card">
				<h3>Classic <span class="version-price">Gratuit</span></h3>
				<p>Fidèle à l'Enigma M3 historique. 5 rotors, 3 slots, réflecteurs B/C originaux. Keyspace ~2⁶⁷. Visualiseur complet et mode Turing inclus.</p>
			</div>
			<div class="version glass-card version-pro">
				<h3>Pro <span class="version-price">4,99€</span></h3>
				<p>10 rotors dont 5 customs, 4 slots (Enigma M4), réflecteur custom, 95 caractères, rotation tous les 20 messages. Keyspace ~2⁹⁰+. Thèmes visuels exclusifs.</p>
			</div>
		</div>
	</section>

	<section class="app-section">
		<h2>Stack technique</h2>
		<div class="tech-pills">
			<span class="pill">Flutter</span>
			<span class="pill">Dart</span>
			<span class="pill">Kotlin</span>
			<span class="pill">SMS natif</span>
			<span class="pill">QR Code</span>
			<span class="pill">NFC</span>
			<span class="pill">PBKDF2</span>
			<span class="pill">Android</span>
		</div>
	</section>

	<section class="app-section">
		<h2>Captures d'écran</h2>
		<div class="screenshots-grid">
			{#each screenshots as screenshot}
				<button class="screenshot-thumb" onclick={() => selectedImage = screenshot.src}>
					<img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
				</button>
			{/each}
		</div>
	</section>

	<footer class="app-footer">
		<a href="/projets/" class="back-link">← Retour aux projets</a>
	</footer>
</div>

{#if selectedImage}
	<div class="lightbox" role="dialog" aria-label="Image agrandie" onclick={() => selectedImage = null} onkeydown={(e) => e.key === 'Escape' && (selectedImage = null)}>
		<button class="lightbox-close" onclick={() => selectedImage = null} aria-label="Fermer">✕</button>
		<img src={selectedImage} alt="Capture d'écran agrandie" />
	</div>
{/if}

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.breadcrumb a {
		color: var(--secondary);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.app-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--gap);
		margin-bottom: calc(var(--gap) * 2);
		flex-wrap: wrap;
	}

	.app-identity {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.app-icon {
		width: 80px;
		height: 80px;
		border-radius: 18px;
		flex-shrink: 0;
	}

	.app-identity h1 {
		margin: 4px 0 8px;
	}

	.app-tagline {
		color: var(--secondary);
		font-size: 1rem;
		max-width: 500px;
		line-height: 1.5;
	}

	.status-pill {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--accent3);
		border: 1px solid var(--accent3);
		padding: 4px 14px;
		border-radius: 9999px;
		white-space: nowrap;
	}

	.hero-image {
		width: 100%;
		border-radius: var(--radius);
		margin-bottom: calc(var(--gap) * 2);
		border: 1px solid var(--border);
	}

	.app-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.app-section h2 {
		font-size: 1.2rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.app-section p {
		color: var(--secondary);
		line-height: 1.6;
		margin-bottom: 12px;
	}

	.disclaimer {
		padding: calc(var(--gap) * 1.2);
		margin-top: var(--gap);
		border-left: 3px solid var(--accent2);
	}

	.disclaimer p {
		margin: 0;
		font-size: 0.9rem;
	}

	/* Steps */
	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	.step {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		padding: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.step-number {
		font-family: var(--font-ui);
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--accent);
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--accent);
		border-radius: 50%;
	}

	.step h3 {
		font-size: 0.95rem;
		margin: 0 0 4px;
		font-family: var(--font-ui);
	}

	.step p {
		font-size: 0.85rem;
		margin: 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--gap);
	}

	.feature {
		padding: calc(var(--gap) * 1.2);
	}

	.feature h3 {
		font-size: 0.95rem;
		margin: 0 0 6px;
		font-family: var(--font-ui);
	}

	.feature p {
		font-size: 0.85rem;
		margin: 0;
	}

	/* Versions */
	.versions-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
	}

	.version {
		padding: calc(var(--gap) * 1.5);
	}

	.version h3 {
		font-size: 1rem;
		margin: 0 0 8px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.version-price {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--accent);
		border: 1px solid var(--accent);
		padding: 2px 10px;
		border-radius: 9999px;
	}

	.version p {
		font-size: 0.85rem;
		margin: 0;
	}

	.version-pro {
		border-color: var(--accent2);
	}

	.version-pro .version-price {
		color: var(--accent2);
		border-color: var(--accent2);
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.screenshots-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: var(--gap);
	}

	.screenshot-thumb {
		background: none;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		transition: all 0.2s ease;
	}

	.screenshot-thumb:hover {
		border-color: var(--accent-border);
		box-shadow: var(--accent-glow);
	}

	.screenshot-thumb img {
		width: 100%;
		height: auto;
		display: block;
	}

	.app-footer {
		padding-top: calc(var(--gap) * 1.5);
		border-top: 1px solid var(--border);
	}

	.back-link {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--accent);
	}

	/* Lightbox */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gap);
		cursor: pointer;
	}

	.lightbox img {
		max-width: 90vw;
		max-height: 90vh;
		border-radius: var(--radius);
		cursor: default;
	}

	.lightbox-close {
		position: absolute;
		top: 20px;
		right: 20px;
		background: none;
		border: none;
		color: var(--primary);
		font-size: 1.5rem;
		cursor: pointer;
		padding: 8px;
	}

	.progress-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	@media (max-width: 640px) {
		.app-header {
			flex-direction: column;
		}

		.app-icon {
			width: 60px;
			height: 60px;
		}

		.versions-grid {
			grid-template-columns: 1fr;
		}

		.screenshots-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}
</style>
