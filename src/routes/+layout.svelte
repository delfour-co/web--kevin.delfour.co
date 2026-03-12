<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AccessibilityPanel from '$lib/components/AccessibilityPanel.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let w = 0;
		let h = 0;
		let animId: number;

		// Tron color palette
		const CYAN = { r: 6, g: 182, b: 212 };
		const BLUE = { r: 30, g: 80, b: 220 };

		// Light pulses traveling along the ground
		interface Pulse {
			x: number;
			speed: number;
			width: number;
			brightness: number;
			isVertical: boolean;
			pos: number;
		}

		const pulses: Pulse[] = [];
		const MAX_PULSES = 12;

		function spawnPulse() {
			if (pulses.length >= MAX_PULSES) return;
			const isVertical = Math.random() > 0.5;
			pulses.push({
				x: Math.random(),
				speed: 0.15 + Math.random() * 0.35,
				width: 60 + Math.random() * 120,
				brightness: 0.3 + Math.random() * 0.5,
				isVertical,
				pos: -0.05
			});
		}

		// Grid-following particles
		interface GridParticle {
			pos: number;       // 0→1 progress along the line (vanish→bottom)
			speed: number;
			lineIndex: number; // which grid line (-1..1 ratio for vertical, 0..1 for horizontal)
			isVertical: boolean;
			size: number;
			brightness: number;
			trail: number;     // trail length in progress units
		}

		const gridParticles: GridParticle[] = [];
		const MAX_GRID_PARTICLES = 50;
		const VERT_LINES = 24;

		function spawnGridParticle() {
			if (gridParticles.length >= MAX_GRID_PARTICLES) return;
			gridParticles.push({
				pos: -0.02,
				speed: 0.08 + Math.random() * 0.2,
				lineIndex: (Math.floor(Math.random() * (VERT_LINES + 1)) - VERT_LINES / 2) / (VERT_LINES / 2),
				isVertical: true,
				size: 1 + Math.random() * 1.5,
				brightness: 0.4 + Math.random() * 0.5,
				trail: 0.03 + Math.random() * 0.06
			});
		}

		function resize() {
			const dpr = Math.min(window.devicePixelRatio, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		function draw(t: number) {
			const dt = 0.016;
			const time = t * 0.001;

			if (w === 0 || h === 0) {
				animId = requestAnimationFrame(draw);
				return;
			}

			ctx!.clearRect(0, 0, w, h);

			// === Tron floor grid — vanishing point at avatar center ===
			const vanishX = w * 0.5;
			const isMobile = w < 768;
			const horizon = isMobile ? h * 0.28 : h * 0.35;
			const gridBottom = h;
			const gridLines = 20;
			const vertLines = 24;

			// Horizontal perspective lines
			for (let i = 0; i <= gridLines; i++) {
				const t_val = i / gridLines;
				const perspective = Math.pow(t_val, 2.5);
				const y = horizon + (gridBottom - horizon) * perspective;
				const spread = 0.3 + perspective * 2.5;
				const x1 = vanishX - (w * spread) / 2;
				const x2 = vanishX + (w * spread) / 2;

				const alpha = perspective * 0.12;
				ctx!.beginPath();
				ctx!.moveTo(x1, y);
				ctx!.lineTo(x2, y);
				ctx!.strokeStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${alpha})`;
				ctx!.lineWidth = 0.5 + perspective * 0.5;
				ctx!.stroke();
			}

			// Vertical perspective lines converging to vanishing point
			for (let i = -vertLines / 2; i <= vertLines / 2; i++) {
				const ratio = i / (vertLines / 2);
				const bottomX = vanishX + ratio * w * 1.5;
				const alpha = Math.max(0, 0.1 - Math.abs(ratio) * 0.06);

				ctx!.beginPath();
				ctx!.moveTo(vanishX, horizon);
				ctx!.lineTo(bottomX, gridBottom);
				ctx!.strokeStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${alpha})`;
				ctx!.lineWidth = 0.5;
				ctx!.stroke();
			}

			// === Horizon glow ===
			const horizonGlow = ctx!.createLinearGradient(0, horizon - 60, 0, horizon + 40);
			horizonGlow.addColorStop(0, 'rgba(6,182,212,0)');
			horizonGlow.addColorStop(0.5, `rgba(6,182,212,${0.03 + Math.sin(time * 0.3) * 0.01})`);
			horizonGlow.addColorStop(1, 'rgba(6,182,212,0)');
			ctx!.fillStyle = horizonGlow;
			ctx!.fillRect(0, horizon - 60, w, 100);

			// === Traveling light pulses ===
			if (Math.random() < 0.02) spawnPulse();

			for (let i = pulses.length - 1; i >= 0; i--) {
				const p = pulses[i];
				p.pos += p.speed * dt;

				if (p.pos > 1.1) {
					pulses.splice(i, 1);
					continue;
				}

				const progress = p.pos;
				const perspective = Math.pow(progress, 2.5);
				const py = horizon + (gridBottom - horizon) * perspective;
				const spread = 0.3 + perspective * 2.5;
				const glowSize = p.width * Math.max(0.1, perspective);
				if (glowSize < 1) continue;

				let px: number;
				if (p.isVertical) {
					px = vanishX + (p.x - 0.5) * w * spread;
				} else {
					const xSpread = w * spread;
					px = vanishX - xSpread / 2 + p.x * xSpread;
				}

				if (!isFinite(px) || !isFinite(py)) continue;
				const grad = ctx!.createRadialGradient(px, py, 0, px, py, glowSize);
				grad.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${p.brightness * perspective})`);
				grad.addColorStop(0.5, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${p.brightness * perspective * 0.3})`);
				grad.addColorStop(1, 'rgba(6,182,212,0)');
				ctx!.fillStyle = grad;
				ctx!.fillRect(px - glowSize, py - glowSize, glowSize * 2, glowSize * 2);
			}

			// === Subtle vertical light beams (upper area) ===
			for (let i = 0; i < 3; i++) {
				const beamX = w * (0.2 + i * 0.3) + Math.sin(time * 0.2 + i * 2) * 50;
				const beamAlpha = 0.015 + Math.sin(time * 0.4 + i) * 0.008;
				const grad = ctx!.createLinearGradient(beamX, 0, beamX, horizon);
				grad.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${beamAlpha})`);
				grad.addColorStop(0.5, `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${beamAlpha * 0.5})`);
				grad.addColorStop(1, 'rgba(6,182,212,0)');
				ctx!.fillStyle = grad;
				ctx!.fillRect(beamX - 40, 0, 80, horizon);
			}

			// === Grid-following particles ===
			if (Math.random() < 0.12) spawnGridParticle();

			for (let i = gridParticles.length - 1; i >= 0; i--) {
				const gp = gridParticles[i];
				gp.pos += gp.speed * dt;

				if (gp.pos > 1.1) {
					gridParticles.splice(i, 1);
					continue;
				}

				// Compute screen position along the grid line
				const trailSteps = 6;
				const stepSize = gp.trail / trailSteps;

				for (let s = 0; s < trailSteps; s++) {
					const p = gp.pos - s * stepSize;
					if (p < 0 || p > 1) continue;

					const perspective = Math.pow(p, 2.5);
					let sx: number, sy: number;

					// Follow a vertical line from vanish point to bottom
					const bottomX = vanishX + gp.lineIndex * w * 1.5;
					sx = vanishX + (bottomX - vanishX) * perspective;
					sy = horizon + (gridBottom - horizon) * perspective;

					if (!isFinite(sx) || !isFinite(sy)) continue;

					// Fade trail: head is bright, tail fades
					const trailFade = 1 - s / trailSteps;
					const alpha = gp.brightness * perspective * trailFade;
					const size = gp.size * (0.5 + perspective * 0.5) * trailFade;

					if (alpha < 0.01 || size < 0.3) continue;

					// Draw particle dot
					ctx!.beginPath();
					ctx!.arc(sx, sy, size, 0, Math.PI * 2);
					ctx!.fillStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${alpha})`;
					ctx!.fill();

					// Glow on head only
					if (s === 0 && size > 1) {
						const glowR = size * 6;
						const glow = ctx!.createRadialGradient(sx, sy, 0, sx, sy, glowR);
						glow.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${alpha * 0.4})`);
						glow.addColorStop(1, 'rgba(6,182,212,0)');
						ctx!.fillStyle = glow;
						ctx!.fillRect(sx - glowR, sy - glowR, glowR * 2, glowR * 2);
					}
				}
			}

			// === Edge vignette ===
			const vignette = ctx!.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.8);
			vignette.addColorStop(0, 'rgba(0,0,0,0)');
			vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
			ctx!.fillStyle = vignette;
			ctx!.fillRect(0, 0, w, h);

			animId = requestAnimationFrame(draw);
		}

		resize();
		animId = requestAnimationFrame(draw);
		window.addEventListener('resize', resize);

		// Re-measure when document height changes (e.g. after navigation)
		const resizeObs = new ResizeObserver(() => resize());
		resizeObs.observe(document.body);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
			resizeObs.disconnect();
		};
	});
</script>

<a href="#main-content" class="skip-link">Aller au contenu</a>

<canvas bind:this={canvas} class="global-grid-bg" aria-hidden="true"></canvas>

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />

<AccessibilityPanel />

<style>
	.global-grid-bg {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: -1;
	}
</style>
