<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { CONTACT, CV_PDF, IDENTITY } from '$lib/data/profile';
</script>

<SEO
	title="Contact"
	description="Ouvert aux échanges sur des rôles de direction d'ingénierie : Engineering Manager, Head of Engineering, VP Engineering. Basé à Lyon."
	url="https://kevin.delfour.co/contact/"
	breadcrumbs={[{ label: 'Contact' }]}
/>

<div class="page">
	<div class="page-hero">
		<span class="kicker">Contact</span>
		<h1>Parlons de votre organisation</h1>
		<p class="lead">
			Je suis ouvert aux échanges sur des rôles de direction d’ingénierie — {IDENTITY.targetRoles}.
			Si vous construisez ou transformez une organisation technique, je serai curieux de comprendre
			votre contexte.
		</p>
	</div>

	<section class="section">
		<div class="channels">
			<a class="channel" href="mailto:{CONTACT.email}">
				<span class="channel-label">E-mail</span>
				<span class="channel-value">{CONTACT.email}</span>
				<span class="channel-note">Le canal le plus direct.</span>
			</a>
			<a class="channel" href={CONTACT.linkedin} rel="noopener noreferrer" target="_blank">
				<span class="channel-label">LinkedIn</span>
				<span class="channel-value">{CONTACT.linkedinLabel}</span>
				<span class="channel-note">Parcours détaillé et mise en relation.</span>
			</a>
			<a class="channel" href={CONTACT.github} rel="noopener noreferrer" target="_blank">
				<span class="channel-label">GitHub</span>
				<span class="channel-value">{CONTACT.githubLabel}</span>
				<span class="channel-note">Ce que je construis quand je code.</span>
			</a>
		</div>
	</section>

	<section class="section prose-max">
		<h2>Ce qui m’aide à vous répondre utilement</h2>
		<ul class="hints">
			<li>Le contexte : taille de l’équipe, stade de l’entreprise, ce qui coince aujourd’hui.</li>
			<li>Le périmètre du rôle et la personne à qui il rend compte.</li>
			<li>Le mode de travail : sur site, hybride, distant — et depuis où.</li>
		</ul>
		<p>Je réponds à tous les messages sérieux, y compris pour dire non.</p>
	</section>

	<section class="section">
		<div class="case-card">
			<h2>Autres raisons de m’écrire</h2>
			<ul class="reasons">
				<li>
					<strong>M’inviter à intervenir</strong> — les sujets sont sur la page
					<a href="/conferences/">Conférences</a>.
				</li>
				<li>
					<strong>Échanger entre pairs</strong> — je co-anime
					<a href="/communaute/">CTO de Lyon</a> et je mentore des Tech Leads et des CTO.
				</li>
				<li>
					<strong>Consulter mon parcours</strong> — la <a href="/cv/">version web</a> ou le
					<a href={CV_PDF} download>PDF en anglais</a>.
				</li>
			</ul>
		</div>
	</section>
</div>

<style>
	.channels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
	.channel {
		display: block;
		background: var(--surface);
		padding: 24px;
	}
	.channel:hover {
		background: var(--surface-hover);
		text-decoration: none;
	}
	.channel-label {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-label);
		color: var(--tertiary);
		margin-bottom: 10px;
	}
	.channel-value {
		display: block;
		font-family: var(--font-heading);
		font-weight: 600;
		color: var(--accent);
		word-break: break-word;
		margin-bottom: 6px;
	}
	.channel-note {
		display: block;
		font-size: var(--text-sm);
		color: var(--secondary);
	}

	.section h2 {
		font-size: var(--text-xl);
		margin-bottom: 16px;
	}

	.hints {
		margin: 0 0 20px;
		padding: 0;
		list-style: none;
	}
	.hints li {
		position: relative;
		padding-left: 22px;
		margin-bottom: 10px;
		color: var(--content);
		font-size: var(--text-sm);
	}
	.hints li::before {
		content: '';
		position: absolute;
		left: 4px;
		top: 0.62em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--accent);
	}

	.reasons {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.reasons li {
		padding: 12px 0;
		border-bottom: 1px solid var(--border);
		font-size: var(--text-sm);
		color: var(--secondary);
	}
	.reasons li:first-child {
		padding-top: 0;
	}
	.reasons li:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.reasons strong {
		color: var(--primary);
		font-weight: 600;
	}
</style>
