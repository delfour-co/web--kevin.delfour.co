<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<nav class="term-crumb" aria-label="Fil d'Ariane">
	<a href="/projets/">Projets</a> / {project.name}
</nav>

<header class="proj-hero">
	{#if project.icon}
		<img src={project.icon} alt={`Icône ${project.name}`} class="proj-ico" />
	{:else if project.iconText}
		<span class="proj-ico proj-ico--ph">{project.iconText}</span>
	{/if}
	<div class="proj-id">
		<h1 class="proj-h1">{project.name}</h1>
		{#if project.tagline}<p class="term-lead">{project.tagline}</p>{/if}
		<div class="term-chips proj-chips">
			<span class="term-chip term-chip--accent">{project.status}</span>
			<span class="term-chip">{project.lang}</span>
			{#if project.private}<span class="term-chip term-chip--muted">privé</span>{/if}
			{#if project.statusNote}<span class="term-chip">{project.statusNote}</span>{/if}
		</div>
		{#if project.heroLinks?.length}
			<div class="proj-links">
				{#each project.heroLinks as l}
					<a href={l.href} target="_blank" rel="noopener" class="term-link">{l.label}</a>
				{/each}
			</div>
		{/if}
	</div>
</header>

{#if project.heroImage}
	<img src={project.heroImage} alt={`Présentation ${project.name}`} class="proj-shot" />
{/if}

<style>
	.proj-hero {
		display: flex;
		gap: 18px;
		align-items: flex-start;
		margin-bottom: 26px;
	}
	.proj-ico {
		width: 72px;
		height: 72px;
		border-radius: 16px;
		flex-shrink: 0;
		border: 1px solid var(--border);
	}
	.proj-ico--ph {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 1.4rem;
		color: var(--accent);
		background: var(--surface);
	}
	.proj-id {
		min-width: 0;
	}
	.proj-h1 {
		font-size: 1.6rem;
		margin: 0 0 8px;
		color: var(--primary);
		letter-spacing: -0.01em;
	}
	.proj-chips {
		margin-top: 12px;
	}
	.proj-links {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-top: 14px;
	}
	.term-link {
		font-size: 0.78rem;
		color: var(--accent);
	}
	.term-link:hover {
		text-decoration: underline;
	}

	.proj-shot {
		width: 100%;
		border-radius: var(--radius);
		margin-bottom: 30px;
		border: 1px solid var(--border);
	}

	@media (max-width: 640px) {
		.proj-ico {
			width: 56px;
			height: 56px;
		}
		.proj-ico--ph {
			font-size: 1.1rem;
		}
	}
</style>
