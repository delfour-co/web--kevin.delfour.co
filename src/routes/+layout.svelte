<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AccessibilityPanel from '$lib/components/AccessibilityPanel.svelte';

	let { children } = $props();
</script>

<a href="#main-content" class="skip-link">Aller au contenu</a>

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />

<AccessibilityPanel />
