<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { groupedProjects, cardHref, type Project } from '$lib/data/projects';

	const groups = groupedProjects();
</script>

<SEO
	title="Projets"
	description="Je mène des organisations d'ingénierie et je continue de livrer du code. Apps mobiles, outils CLI et librairies, tous publics."
	url="https://kevin.delfour.co/projets/"
	breadcrumbs={[{ label: 'Projets' }]}
/>

<div class="term-page">
	<header class="term-head">
		<div class="term-cmd">Côté code</div>
		<h1>J’emmène des équipes, et je continue de livrer</h1>
		<p class="term-lead">
			Rester hands-on n’est pas une posture : c’est la façon la plus honnête de comprendre ce que
			vivent mes équipes. Apps mobiles, outils en ligne de commande, librairies — tout ce qui est
			ici est public, le code se lit.
		</p>
	</header>

	{#each groups as group}
		<section class="term-sec">
			<div class="term-cmd">{group.label}</div>
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
