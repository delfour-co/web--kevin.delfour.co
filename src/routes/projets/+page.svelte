<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { projectCategories } from '$lib/data/projects';
</script>

<SEO
	title="Projets"
	description="Katas de programmation pour s'entraîner, et projets plus complexes illustrant architecture et stratégie technique."
	url="https://kevin.delfour.co/projets/"
/>

<div class="page-container">
	<header class="page-header">
		<h1>Projets</h1>
		<p class="page-description">Katas de programmation et projets open source illustrant architecture et stratégie technique.</p>
	</header>

	{#each projectCategories as category}
		<section class="category-section">
			<h2>{category.label}</h2>
			<div class="projects-grid">
				{#each category.projects as project}
					<a href={project.url} target="_blank" rel="noopener" class="project-card">
						<h3 class="project-name">{project.nom}</h3>
						<p class="project-desc">{project.description}</p>
						<div class="project-meta">
							<span class="project-lang">{project.langage}</span>
							{#each project.technologies.slice(0, 3) as tech}
								<span class="project-tech">{tech}</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.page-description { color: var(--secondary); font-size: 1.1rem; }

	.category-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.category-section h2 {
		font-size: 1.2rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--gap);
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: calc(var(--gap) * 1.2);
		border: 1px solid var(--border);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	.project-card:hover {
		border-color: var(--accent);
		text-decoration: none;
	}

	.project-name {
		font-size: 1rem;
		margin: 0;
		font-family: var(--font-ui);
	}

	.project-desc {
		font-size: 0.85rem;
		color: var(--secondary);
		margin: 0;
		line-height: 1.5;
	}

	.project-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 4px;
	}

	.project-lang {
		font-family: var(--font-ui);
		font-size: 11px;
		padding: 2px 8px;
		background: var(--accent);
		color: white;
		border-radius: 10px;
		font-weight: 500;
	}

	.project-tech {
		font-family: var(--font-ui);
		font-size: 11px;
		padding: 2px 8px;
		background: var(--accent-light);
		color: var(--accent);
		border-radius: 10px;
	}
</style>
