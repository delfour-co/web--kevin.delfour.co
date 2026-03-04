<script lang="ts">
	import { browser } from '$app/environment';

	let progress = $state(0);

	$effect(() => {
		if (!browser) return;

		function handleScroll() {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="scroll-progress" aria-hidden="true">
	<div class="scroll-progress-bar" style="width: {progress}%"></div>
</div>

<style>
	.scroll-progress {
		position: fixed;
		top: var(--header-height);
		left: 0;
		right: 0;
		height: 3px;
		z-index: 49;
		background: transparent;
	}

	.scroll-progress-bar {
		height: 100%;
		background: var(--accent);
		transition: width 0.1s linear;
	}
</style>
