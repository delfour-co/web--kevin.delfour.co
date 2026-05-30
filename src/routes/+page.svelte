<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { toolCategories } from '$lib/data/tools';
	import { getProjectStageLabel } from '$lib/data/projects';

	let { data } = $props();

	const projects = [
		{ href: '/projets/asteroids/', name: 'neon-asteroids', desc: 'Arcade shooter néon. Flutter + Flame.', tech: 'Flutter', slug: 'asteroids' },
		{ href: '/projets/notch/', name: 'notch', desc: 'SMS chiffrés par Enigma. Pas de serveur.', tech: 'crypto', slug: 'notch' },
		{ href: '/projets/claude-pulse/', name: 'claude-pulse', desc: 'Monitore tes agents Claude Code en temps réel.', tech: 'CLI', slug: 'claude-pulse' },
		{ href: '/projets/repolens/', name: 'repolens', desc: "CLI d'audit de dépôts GitHub.", tech: 'CLI', slug: 'repolens' },
		{ href: '/projets/githero/', name: 'githero', desc: 'Livres-jeux où les branches git sont tes choix.', tech: 'web', slug: 'githero' },
		{ href: '/projets/open-event-orchestrator/', name: 'open-event-orchestrator', desc: "Plateforme open source d'événements.", tech: 'web', slug: 'open-event-orchestrator' }
	];

	const tools = toolCategories.flatMap((c) => c.tools).slice(0, 9);
</script>

<SEO
	description="Lead Tech (+ management) · 17 ans de terrain · Lyon. Mon lieu : ce que je construis, les outils que je bricole, mes livres."
	url="https://kevin.delfour.co/"
/>

<div class="win">
	<div class="win-bar" aria-hidden="true">
		<span class="dot dot-r" aria-hidden="true"></span>
		<span class="dot dot-y" aria-hidden="true"></span>
		<span class="dot dot-g" aria-hidden="true"></span>
		<span class="win-title">kevin@delfour: ~/lieu — zsh</span>
	</div>

	<div class="win-body">
		<nav class="side" aria-label="Sections du lieu">
			<div class="side-head">~ / LIEU</div>
			<a class="side-row" href="#projets"><span class="tw">▸</span> projets/</a>
			<a class="side-row" href="#outils"><span class="tw">▸</span> outils/</a>
			<a class="side-row" href="#livres"><span class="tw">▸</span> livres/</a>
			<a class="side-row" href="/a-propos/"><span class="ch">≡</span> about.md</a>
			<a class="side-row" href="#contact"><span class="ch">@</span> contact</a>
		</nav>

		<div class="main">
			<section class="sec hero">
				<div class="cmd"><span class="p">$</span> whoami</div>
				<h1 class="h1">Kevin Delfour</h1>
				<p class="role">Lead Tech · management · 17 ans de terrain · Lyon</p>
				<div class="cmd"><span class="p">$</span> cat intention.md</div>
				<p class="intent"><span class="hash">#</span> Mon lieu. Ce que je construis, les outils que je bricole, ce que j'essaie. Pas une mission — juste chez moi.<span class="cur" aria-hidden="true"></span></p>
			</section>

			<section class="sec" id="projets">
				<h2 class="visually-hidden">Projets</h2>
				<div class="cmd"><span class="p">$</span> ls projets/</div>
				<div class="grid">
					{#each projects as p}
						<a class="card" href={p.href}>
							<div class="card-name">{p.name}</div>
							<div class="card-desc">{p.desc}</div>
							<div class="card-meta">
								<span class="stage">{getProjectStageLabel(p.slug)}</span>
								<span class="tech">{p.tech}</span>
							</div>
						</a>
					{/each}
				</div>
				<p class="more"><a href="/projets/">→ tous les projets</a></p>
			</section>

			<section class="sec" id="outils">
				<h2 class="visually-hidden">Outils</h2>
				<div class="cmd"><span class="p">$</span> ls outils/ <span class="hash"># des trucs que je bricole et que j'utilise</span></div>
				<div class="tools">
					{#each tools as t}
						<a class="tool" href={t.url}>
							<span class="tool-name">{t.slug}</span>
							<span class="tool-cat">{t.categorie}</span>
						</a>
					{/each}
				</div>
				<p class="more"><a href="/outils/">→ tous les outils</a></p>
			</section>

			<section class="sec" id="livres">
				<h2 class="visually-hidden">Livres</h2>
				<div class="cmd"><span class="p">$</span> cat livres/* <span class="hash"># ce que j'ai écrit</span></div>
				<div class="books">
					{#each data.books as b}
						<a class="book" href="/livres/{b.slug}/">
							{#if b.cover}
								<img class="book-cov" src={b.cover} alt="Couverture {b.title}" loading="lazy" />
							{/if}
							<div class="book-info">
								<div class="book-title">{b.title}</div>
								<div class="book-sub">{b.subtitle}</div>
								<div class="book-meta">{b.chapterCount} chapitres · gratuit</div>
							</div>
						</a>
					{/each}
				</div>
			</section>

			<section class="sec contact" id="contact">
				<h2 class="visually-hidden">Contact</h2>
				<div class="cmd"><span class="p">$</span> contact --me</div>
				<div class="crow"><span class="ckey">github</span> <a href="https://github.com/kdelfour" target="_blank" rel="noopener noreferrer">→ github.com/kdelfour</a></div>
				<div class="crow"><span class="ckey">linkedin</span> <a href="https://linkedin.com/in/kevindelfour" target="_blank" rel="noopener noreferrer">→ in/kevindelfour</a></div>
			</section>
		</div>
	</div>

	<div class="win-status" aria-hidden="true">
		<span class="seg mode">NORMAL</span>
		<span class="seg path">~/lieu</span>
		<span class="sp"></span>
		<span class="seg">lyon</span>
		<span class="seg">17y</span>
		<span class="seg">utf-8</span>
	</div>
</div>

<style>
	.win {
		max-width: 1000px;
		margin: calc(var(--gap) * 1.5) auto;
		background: var(--theme);
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		font-size: 13px;
		line-height: 1.6;
	}

	/* Title bar */
	.win-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 9px 14px;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}
	.dot { width: 11px; height: 11px; border-radius: 50%; }
	.dot-r { background: #ff5f57; }
	.dot-y { background: #febc2e; }
	.dot-g { background: #28c840; }
	.win-title { flex: 1; text-align: center; color: var(--tertiary); font-size: 12px; }

	/* Body */
	.win-body { display: flex; min-height: 420px; }

	.side {
		width: 188px;
		flex-shrink: 0;
		border-right: 1px solid var(--border);
		padding: 14px 0;
		font-size: 12px;
	}
	.side-head { color: var(--tertiary); font-size: 10px; letter-spacing: 0.14em; padding: 0 16px 10px; }
	.side-row {
		display: flex; gap: 7px; align-items: center;
		padding: 5px 16px; color: var(--content); text-decoration: none;
		transition: var(--transition);
	}
	.side-row:hover { background: var(--surface-hover); color: var(--accent); text-decoration: none; }
	.side-row .tw { color: var(--tertiary); }
	.side-row .ch { color: var(--accent2); }

	.main { flex: 1; min-width: 0; padding: 26px 26px 30px; }

	.cmd { color: var(--tertiary); font-size: 12px; margin-bottom: 12px; }
	.cmd .p { color: var(--accent); }
	.cmd .hash { color: var(--tertiary); }
	.sec { margin-bottom: 26px; scroll-margin-top: calc(var(--header-height) + 12px); }

	.hero .h1 { font-size: 34px; font-weight: 700; color: var(--primary); margin: 4px 0; letter-spacing: -0.02em; }
	.hero .role { color: var(--secondary); font-size: 13px; margin-bottom: 16px; }
	.hero .intent { color: var(--content); font-size: 14px; max-width: 560px; line-height: 1.65; }
	.hero .intent .hash { color: var(--accent); }
	.cur { display: inline-block; width: 8px; height: 14px; background: var(--accent); vertical-align: -2px; margin-left: 2px; animation: blink 1.1s steps(1) infinite; }
	@keyframes blink { 50% { opacity: 0; } }

	/* Projects */
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(228px, 1fr)); gap: 11px; }
	.card {
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 13px 15px;
		background: var(--surface);
		text-decoration: none;
		transition: var(--transition);
		display: block;
	}
	.card:hover { border-color: var(--accent); transform: translateY(-2px); text-decoration: none; }
	.card-name { color: var(--accent); font-weight: 600; font-size: 13px; margin-bottom: 5px; }
	.card-name::before { content: './'; color: var(--tertiary); }
	.card-desc { color: var(--content); font-size: 11.5px; line-height: 1.5; margin-bottom: 9px; }
	.card-meta { display: flex; gap: 8px; align-items: center; font-size: 10.5px; }
	.stage { color: var(--accent); border: 1px solid var(--accent-border); background: var(--accent-light); border-radius: 999px; padding: 1px 8px; }
	.tech { color: var(--tertiary); }

	/* Tools */
	.tools { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 22px; }
	.tool { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed var(--border); text-decoration: none; font-size: 12px; }
	.tool:hover { text-decoration: none; }
	.tool:hover .tool-name { color: var(--accent); }
	.tool-name { color: var(--content); }
	.tool-cat { color: var(--tertiary); }

	.more { margin-top: 12px; font-size: 12px; }
	.more a { color: var(--accent); }

	/* Books */
	.books { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
	.book { display: flex; gap: 12px; border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; background: var(--surface); text-decoration: none; transition: var(--transition); }
	.book:hover { border-color: var(--accent); text-decoration: none; }
	.book-cov { width: 46px; height: auto; border-radius: 4px; flex-shrink: 0; border: 1px solid var(--border); }
	.book-title { color: var(--primary); font-weight: 600; font-size: 12.5px; margin-bottom: 3px; }
	.book-sub { color: var(--secondary); font-size: 10.5px; margin-bottom: 6px; }
	.book-meta { color: var(--tertiary); font-size: 10.5px; }

	/* Contact */
	.crow { padding: 5px 0; }
	.ckey { color: var(--accent2); display: inline-block; width: 80px; }
	.contact a { color: var(--content); text-decoration: none; }
	.contact a:hover { color: var(--accent); }

	/* Status bar */
	.win-status { display: flex; align-items: stretch; font-size: 11px; background: var(--surface); border-top: 1px solid var(--border); }
	.win-status .seg { display: flex; align-items: center; padding: 5px 12px; color: var(--tertiary); }
	.win-status .mode { background: var(--accent); color: var(--theme); font-weight: 700; }
	.win-status .path { color: var(--accent2); }
	.win-status .sp { flex: 1; }

	/* Responsive — sidebar devient onglets, contenu en 1 colonne */
	@media (max-width: 760px) {
		.win { margin: var(--gap) var(--gap) calc(var(--gap) * 2); }
		.win-body { flex-direction: column; }
		.side {
			width: auto;
			border-right: none;
			border-bottom: 1px solid var(--border);
			display: flex;
			gap: 4px;
			overflow-x: auto;
			padding: 10px 12px;
		}
		.side-head { display: none; }
		.side-row { padding: 4px 9px; border-radius: 6px; white-space: nowrap; }
		.main { padding: 20px 16px 24px; }
		.grid, .tools, .books { grid-template-columns: 1fr; }
	}
</style>
