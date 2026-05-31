<script lang="ts">
	import '$lib/labs/lab.css';
	import { groupedStories, labStories, statusLabel } from '$lib/labs/stories';

	const groups = groupedStories();
</script>

<svelte:head>
	<title>D-Brain OS — Component Lab</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="lab">
	<header class="lab-bar">
		<span class="lab-brand">D-BRAIN&nbsp;OS</span>
		<span class="lab-bar-sub">component lab</span>
		<span class="lab-bar-status">{labStories.length} composant{labStories.length > 1 ? 's' : ''}</span>
	</header>

	<div class="lab-catalog">
		<p class="lab-intro">
			Banc d'essai des composants de D-Brain OS — l'équivalent d'un Storybook, taillé pour le
			projet. Chaque composant est isolé, manipulable, et se déploie avec le site. Pour en ajouter
			un : une entrée dans <code>src/lib/labs/stories.ts</code> + une page sous
			<code>src/routes/labs/&lt;id&gt;/</code>.
		</p>

		{#each groups as group}
			<section class="lab-group">
				<h2 class="lab-group-h">{group.name}</h2>
				<div class="lab-cards">
					{#each group.stories as story}
						<a class="lab-card" href={story.href}>
							<div class="lab-card-top">
								<span class="lab-card-title">{story.title}</span>
								<span class="lab-status {story.status}">{statusLabel[story.status]}</span>
							</div>
							<p class="lab-card-blurb">{story.blurb}</p>
							<span class="lab-card-go">→ ouvrir</span>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
