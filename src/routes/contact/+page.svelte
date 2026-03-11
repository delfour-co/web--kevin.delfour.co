<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Contact"
	description="Me contacter pour un échange, une question, ou une collaboration."
	url="https://kevin.delfour.co/contact/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Connexion</span>
		<h1>Contact</h1>
	</header>

	<div class="post-content">
		<h2>Me retrouver</h2>
		<ul>
			<li><strong>GitHub</strong> : <a href="https://github.com/kdelfour" target="_blank" rel="noopener">kdelfour</a></li>
			<li><strong>LinkedIn</strong> : <a href="https://linkedin.com/in/kevindelfour" target="_blank" rel="noopener">kevindelfour</a></li>
		</ul>

		<h2>Pour une demande d'accompagnement</h2>
		<p>Si tu cherches un accompagnement personnalisé — consultation, mentorat, audit technique — contacte-moi avec :</p>
		<ul>
			<li>Ton contexte et ton besoin précis</li>
			<li>Ta disponibilité et tes contraintes</li>
			<li>Ton budget si applicable</li>
		</ul>
		<p>Je réponds à toutes les demandes sérieuses.</p>
	</div>
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
</style>
