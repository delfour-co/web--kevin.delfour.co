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

		// Floating particles
		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			alpha: number;
			life: number;
			maxLife: number;
		}

		const particles: Particle[] = [];
		const MAX_PARTICLES = 40;

		function spawnParticle() {
			if (particles.length >= MAX_PARTICLES) return;
			particles.push({
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * 0.3,
				vy: -0.2 - Math.random() * 0.5,
				size: 1 + Math.random() * 2,
				alpha: 0,
				life: 0,
				maxLife: 3 + Math.random() * 5
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

			ctx!.clearRect(0, 0, w, h);

			// === Tron floor grid — horizon at 35%, spreads to full width ===
			const vanishX = w * 0.5;
			const horizon = h * 0.35;
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

				let px: number;
				if (p.isVertical) {
					px = vanishX + (p.x - 0.5) * w * spread;
				} else {
					const xSpread = w * spread;
					px = vanishX - xSpread / 2 + p.x * xSpread;
				}

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

			// === Floating particles ===
			if (Math.random() < 0.08) spawnParticle();

			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.life += dt;
				if (p.life > p.maxLife) {
					particles.splice(i, 1);
					continue;
				}
				p.x += p.vx;
				p.y += p.vy;

				const lifeRatio = p.life / p.maxLife;
				if (lifeRatio < 0.1) {
					p.alpha = lifeRatio / 0.1;
				} else if (lifeRatio > 0.7) {
					p.alpha = (1 - lifeRatio) / 0.3;
				} else {
					p.alpha = 1;
				}

				const finalAlpha = p.alpha * 0.4;
				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${finalAlpha})`;
				ctx!.fill();

				if (p.size > 1.5) {
					const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
					glow.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${finalAlpha * 0.3})`);
					glow.addColorStop(1, 'rgba(6,182,212,0)');
					ctx!.fillStyle = glow;
					ctx!.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
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
		inset: 0;
		pointer-events: none;
		z-index: -1;
	}
</style>
