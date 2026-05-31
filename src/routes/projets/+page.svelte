<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { groupedProjects, cardHref, type Project } from '$lib/data/projects';

	const groups = groupedProjects();
</script>

<SEO
	title="Projets"
	description="Tout ce que je construis : jeux, apps mobiles, outils CLI, librairies et plateformes web. Dépôts publics et privés des orgs delfour-co, exec-d et systm-d."
	url="https://kevin.delfour.co/projets/"
/>

<div class="term-page">
	<header class="term-head">
		<div class="term-cmd"><span class="p">$</span> ls projets/ <span class="hash"># tout ce que je construis</span></div>
		<h1 class="visually-hidden">Projets</h1>
		<p class="term-lead">
			Jeux, apps mobiles, outils, librairies, plateformes. Publics quand ils peuvent l'être,
			<span class="priv-inline">privés</span> quand ils ne le sont pas encore — pour ceux-là, je dis le problème adressé et comment.
		</p>
	</header>

	{#each groups as group}
		<section class="term-sec">
			<div class="term-cmd"><span class="p">$</span> ls {group.type}/</div>
			<h2 class="visually-hidden">{group.label}</h2>
			<div class="term-grid">
				{#each group.items as p}
					{@const href = cardHref(p)}
					{#snippet body(proj: Project)}
						<div class="proj-top">
							<span class="term-name">{proj.name}</span>
							{#if proj.private}<span class="term-chip term-chip--muted">privé</span>{/if}
						</div>
						<p class="term-card-text proj-desc">{proj.desc}</p>
						{#if proj.private && proj.problem}
							<dl class="proj-pb">
								<div>
									<dt>Problème</dt>
									<dd>{proj.problem}</dd>
								</div>
								<div>
									<dt>Réponse</dt>
									<dd>{proj.how}</dd>
								</div>
							</dl>
						{/if}
						<div class="term-chips proj-meta">
							<span class="term-chip">{proj.lang}</span>
							<span class="term-chip term-chip--accent">{proj.status}</span>
						</div>
					{/snippet}

					{#if href}
						<a class="term-card" href={href}>{@render body(p)}</a>
					{:else}
						<div class="term-card term-card--static">{@render body(p)}</div>
					{/if}
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.priv-inline {
		color: var(--accent2);
	}

	.proj-top {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-bottom: 7px;
	}

	.proj-desc {
		margin-bottom: 10px;
	}

	.proj-meta {
		margin-top: 2px;
	}

	/* Bloc problème / réponse — spécifique aux projets privés */
	.proj-pb {
		margin: 0 0 12px;
		padding: 10px 12px;
		border-left: 2px solid var(--accent-border);
		background: var(--accent-light);
		border-radius: 0 6px 6px 0;
		display: grid;
		gap: 8px;
	}
	.proj-pb dt {
		color: var(--accent);
		font-size: 0.625rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 2px;
	}
	.proj-pb dd {
		margin: 0;
		color: var(--secondary);
		font-size: 0.72rem;
		line-height: calc(1.5 * var(--a11y-line-height-mult));
	}
</style>
