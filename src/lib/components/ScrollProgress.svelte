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
	<div class="scroll-progress-bar" style="width: {progress}%">
		<div class="scroll-progress-head"></div>
	</div>
</div>

<style>
	.scroll-progress {
		position: fixed;
		top: var(--header-height);
		left: 0;
		right: 0;
		height: 2px;
		z-index: 49;
		background: rgba(6, 182, 212, 0.08);
	}

	.scroll-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.4), var(--accent));
		transition: width 0.1s linear;
		position: relative;
	}

	/* Light trail head — bright point at the tip */
	.scroll-progress-head {
		position: absolute;
		right: -1px;
		top: 50%;
		transform: translateY(-50%);
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #fff;
		box-shadow:
			0 0 6px 2px rgba(6, 182, 212, 0.9),
			0 0 16px 4px rgba(6, 182, 212, 0.5),
			0 0 30px 8px rgba(6, 182, 212, 0.2);
	}

	@media (max-width: 768px) {
		.scroll-progress {
			height: 2px;
		}
	}
</style>
