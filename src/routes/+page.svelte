<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { toolCategories } from '$lib/data/tools';
	import { visibleProjects, cardHref } from '$lib/data/projects';

	let { data } = $props();

	const tools = toolCategories.flatMap((c) => c.tools).slice(0, 9);
</script>

<SEO
	description="Lead Tech (+ management) · 17 ans de terrain · Lyon. Mon lieu : ce que je construis, les outils que je bricole, mes livres."
	url="https://kevin.delfour.co/"
/>

<div class="home">
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
			{#each visibleProjects as p}
				{@const href = cardHref(p)}
				{#if href}
					<a class="card" href={href}>
						<div class="card-name">{p.name}</div>
						{#if p.desc}<div class="card-desc">{p.desc}</div>{/if}
						<div class="card-meta">
							{#if p.private}<span class="priv">privé</span>{/if}
							<span class="tech">{p.lang}</span>
						</div>
					</a>
				{:else}
					<div class="card card--static">
						<div class="card-name">{p.name}</div>
						{#if p.desc}<div class="card-desc">{p.desc}</div>{/if}
						<div class="card-meta">
							{#if p.private}<span class="priv">privé</span>{/if}
							<span class="tech">{p.lang}</span>
						</div>
					</div>
				{/if}
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

<style>
	.home {
		padding: 26px 26px 30px;
		font-size: 0.8125rem;
		line-height: calc(1.6 * var(--a11y-line-height-mult));
	}

	.cmd {
		color: var(--tertiary);
		font-size: 0.75rem;
		margin-bottom: 12px;
	}
	.cmd .p {
		color: var(--accent);
	}
	.cmd .hash {
		color: var(--tertiary);
	}
	.sec {
		margin-bottom: 26px;
	}

	.hero .h1 {
		font-size: 2.125rem;
		font-weight: 700;
		color: var(--primary);
		margin: 4px 0;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}
	.hero .role {
		color: var(--secondary);
		font-size: 0.8125rem;
		margin-bottom: 16px;
	}
	.hero .intent {
		color: var(--content);
		font-size: 0.875rem;
		max-width: 560px;
		line-height: calc(1.65 * var(--a11y-line-height-mult));
	}
	.hero .intent .hash {
		color: var(--accent);
	}
	.cur {
		display: inline-block;
		width: 8px;
		height: 14px;
		background: var(--accent);
		vertical-align: -2px;
		margin-left: 2px;
		animation: blink 1.1s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* Projets */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
		gap: 11px;
	}
	.card {
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 13px 15px;
		background: var(--surface);
		text-decoration: none;
		transition: var(--transition);
		display: block;
	}
	.card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
		text-decoration: none;
	}
	.card--static {
		cursor: default;
	}
	.card--static:hover {
		border-color: var(--border);
		transform: none;
	}
	.card-name {
		color: var(--accent);
		font-weight: 600;
		font-size: 0.8125rem;
		margin-bottom: 5px;
	}
	.card-name::before {
		content: './';
		color: var(--tertiary);
	}
	.card-desc {
		color: var(--content);
		font-size: 0.72rem;
		line-height: calc(1.5 * var(--a11y-line-height-mult));
		margin-bottom: 9px;
	}
	.card-meta {
		display: flex;
		gap: 8px;
		align-items: center;
		font-size: 0.66rem;
	}
	.priv {
		color: var(--tertiary);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 1px 8px;
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.tech {
		color: var(--tertiary);
	}

	/* Outils */
	.tools {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2px 22px;
	}
	.tool {
		display: flex;
		justify-content: space-between;
		padding: 4px 0;
		border-bottom: 1px dashed var(--border);
		text-decoration: none;
		font-size: 0.75rem;
	}
	.tool:hover {
		text-decoration: none;
	}
	.tool:hover .tool-name {
		color: var(--accent);
	}
	.tool-name {
		color: var(--content);
	}
	.tool-cat {
		color: var(--tertiary);
	}

	.more {
		margin-top: 12px;
		font-size: 0.75rem;
	}
	.more a {
		color: var(--accent);
	}

	/* Livres */
	.books {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 11px;
	}
	.book {
		display: flex;
		gap: 12px;
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 12px 14px;
		background: var(--surface);
		text-decoration: none;
		transition: var(--transition);
	}
	.book:hover {
		border-color: var(--accent);
		text-decoration: none;
	}
	.book-cov {
		width: 46px;
		height: auto;
		border-radius: 4px;
		flex-shrink: 0;
		border: 1px solid var(--border);
	}
	.book-title {
		color: var(--primary);
		font-weight: 600;
		font-size: 0.78rem;
		margin-bottom: 3px;
	}
	.book-sub {
		color: var(--secondary);
		font-size: 0.66rem;
		margin-bottom: 6px;
	}
	.book-meta {
		color: var(--tertiary);
		font-size: 0.66rem;
	}

	/* Contact */
	.crow {
		padding: 5px 0;
	}
	.ckey {
		color: var(--accent2);
		display: inline-block;
		width: 80px;
	}
	.contact a {
		color: var(--content);
		text-decoration: none;
	}
	.contact a:hover {
		color: var(--accent);
	}

	/* Responsive — contenu en 1 colonne */
	@media (max-width: 760px) {
		.home {
			padding: 20px 16px 24px;
		}
		.grid,
		.tools,
		.books {
			grid-template-columns: 1fr;
		}
	}
</style>
