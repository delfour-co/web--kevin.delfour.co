<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import {
		IDENTITY,
		CONTACT,
		CV_PDF,
		SNAPSHOT,
		EXPERIENCE,
		SKILLS,
		COMMUNITY,
		SPEAKING_TOPICS
	} from '$lib/data/profile';
</script>

<SEO
	title="CV"
	description="Parcours de Kevin Delfour, Engineering Leader : 17 ans d'expérience, organisations jusqu'à 30 ingénieurs, 30+ recrutements, agence d'ingénierie de 0 à 12 consultants."
	url="https://kevin.delfour.co/cv/"
	breadcrumbs={[{ label: 'CV' }]}
/>

<div class="page">
	<div class="page-hero cv-hero">
		<span class="kicker">Curriculum vitæ</span>
		<h1>{IDENTITY.name}</h1>
		<p class="role">{IDENTITY.targetRoles}</p>
		<p class="lead">
			Engineering Leader, dix-sept ans d’expérience à construire des logiciels, des équipes
			d’ingénierie et des organisations techniques. J’ai dirigé des équipes du démarrage au passage
			à l’échelle, recruté plus de trente ingénieurs, piloté des organisations allant jusqu’à une
			trentaine de personnes, et construit des cadres de carrière, des processus et des stratégies
			techniques — en restant profondément hands-on.
		</p>
		<div class="btn-row no-print">
			<a class="btn btn--primary" href="mailto:{CONTACT.email}">Me contacter</a>
			<a class="btn btn--secondary" href={CV_PDF} download>Télécharger le CV (PDF, anglais)</a>
		</div>
		<ul class="contact-line">
			<li>{IDENTITY.location}</li>
			<li><a href="mailto:{CONTACT.email}">{CONTACT.email}</a></li>
			<li>
				<a href={CONTACT.linkedin} rel="noopener noreferrer" target="_blank">
					{CONTACT.linkedinLabel}
				</a>
			</li>
			<li>
				<a href={CONTACT.github} rel="noopener noreferrer" target="_blank">
					{CONTACT.githubLabel}
				</a>
			</li>
		</ul>
	</div>

	<section class="section">
		<div class="section-head"><h2>En bref</h2></div>
		<div class="stat-grid">
			{#each SNAPSHOT as stat}
				<div class="stat">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-head"><h2>Parcours</h2></div>
		<div class="timeline">
			{#each EXPERIENCE as job}
				<article class="timeline-item" class:timeline-item--current={job.current}>
					<span class="timeline-date">{job.period}</span>
					<h3 class="timeline-title">{job.title}</h3>
					<p class="timeline-org">{job.org}</p>
					<p class="timeline-body">{job.impact}</p>
					<div class="tag-row">
						{#each job.scope as item}
							<span class="tag">{item}</span>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-head"><h2>Compétences</h2></div>
		<div class="skills">
			<div class="skill-group">
				<h3>Leadership</h3>
				<div class="tag-row">
					{#each SKILLS.leadership as skill}<span class="tag tag--accent">{skill}</span>{/each}
				</div>
			</div>
			<div class="skill-group">
				<h3>Technique</h3>
				<div class="tag-row">
					{#each SKILLS.technique as skill}<span class="tag">{skill}</span>{/each}
				</div>
			</div>
			<div class="skill-group">
				<h3>IA</h3>
				<div class="tag-row">
					{#each SKILLS.ia as skill}<span class="tag">{skill}</span>{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Communauté</h2>
			<p>Co-fondateur de CTO de Lyon, mentor de Tech Leads et de CTO.</p>
		</div>
		<ul class="plain-list">
			{#each COMMUNITY as item}
				<li>
					<strong>{item.role}</strong> — {item.title}
					<span class="muted">depuis {item.since}</span>
				</li>
			{/each}
		</ul>
		<a class="section-link no-print" href="/communaute/">Le détail des engagements</a>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Conférences</h2>
			<p>J’interviens sur le leadership d’ingénierie et sur l’IA appliquée au métier.</p>
		</div>
		<ul class="plain-list">
			{#each SPEAKING_TOPICS as topic}
				<li>{topic.title}</li>
			{/each}
		</ul>
		<a class="section-link no-print" href="/conferences/">Les sujets en détail</a>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Écrits</h2>
			<p>Deux livres gratuits, en ligne, et des projets open source.</p>
		</div>
		<ul class="plain-list">
			<li>
				<strong>Être ou ne pas être CTO</strong> — co-écrit avec des CTO, pour des (futur·e·s) CTO.
			</li>
			<li>
				<strong>En Quête d’Expérience</strong> — guide professionnel du développement moderne.
			</li>
			<li>Vingt et un outils d’aide à la décision, en accès libre sur ce site.</li>
		</ul>
		<a class="section-link no-print" href="/livres/">Lire les livres</a>
	</section>
</div>

<style>
	.cv-hero {
		max-width: 72ch;
	}
	.role {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--accent);
		margin-bottom: 20px;
	}

	.contact-line {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 20px;
		margin: 28px 0 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-sm);
		color: var(--secondary);
	}

	.skills {
		display: grid;
		gap: 28px;
	}
	.skill-group h3 {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-label);
		color: var(--tertiary);
		margin-bottom: 12px;
	}

	.plain-list {
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: 68ch;
	}
	.plain-list li {
		padding: 12px 0;
		border-bottom: 1px solid var(--border);
		font-size: var(--text-sm);
		color: var(--content);
	}
	.plain-list li:first-child {
		padding-top: 0;
	}
	.plain-list strong {
		color: var(--primary);
		font-weight: 600;
	}
	.muted {
		color: var(--tertiary);
	}

	/* Impression : on retire le chrome et on passe en encre noire sur blanc. */
	@media print {
		:global(.site-header),
		:global(footer.footer),
		:global(.skip-link),
		.no-print {
			display: none !important;
		}
		:global(html),
		:global(body) {
			background: #fff !important;
			color: #000 !important;
			font-size: 10.5pt;
		}
		:global(:root) {
			--primary: #000;
			--content: #1a1a1a;
			--secondary: #333;
			--tertiary: #555;
			--accent: #000;
			--border: #bbb;
			--surface: #fff;
			--space-section: 20px;
		}
		.page {
			padding: 0;
		}
		:global(.stat-grid) {
			background: none;
			gap: 0;
		}
		:global(.stat) {
			border: 1px solid #bbb;
		}
		:global(.timeline-item) {
			break-inside: avoid;
			padding-bottom: 16px;
		}
		:global(.section) {
			break-inside: avoid;
		}
	}
</style>
