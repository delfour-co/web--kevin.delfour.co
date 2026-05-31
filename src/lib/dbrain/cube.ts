/**
 * D-Brain OS — Cube Conscience (Three.js / WebGL).
 *
 * Lattice de sous-cubes filaires + cœur lumineux. Le glow est obtenu par des
 * halos additifs (sprites) — pas de post-processing — pour garantir un fond
 * réellement transparent. Trois activités (idle / exploration / response) et
 * une couleur thématique, interpolées en douceur. Pensé pour être lazy-loadé.
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type CubeActivity = 'idle' | 'exploration' | 'response';

export interface CubeController {
	setActivity(a: CubeActivity): void;
	setColor(hex: string): void;
	resize(): void;
	renderOnce(): void;
	start(): void;
	stop(): void;
	dispose(): void;
}

interface CubeOptions {
	color?: string;
}

interface Preset {
	rot: number;
	explode: number;
	scale: number;
	core: number;
}

const PRESETS: Record<CubeActivity, Preset> = {
	idle: { rot: 0.1, explode: 0.0, scale: 1.0, core: 0.12 },
	exploration: { rot: 0.28, explode: 0.6, scale: 0.97, core: 0.22 },
	response: { rot: 0.05, explode: 0.0, scale: 1.05, core: 0.85 }
};

interface SubCube {
	mesh: THREE.LineSegments;
	base: THREE.Vector3;
	dir: THREE.Vector3;
	dist: number;
	phase: number;
}

interface Tween {
	cur: number;
	tgt: number;
}

function approach(t: Tween, dt: number, k: number): void {
	t.cur += (t.tgt - t.cur) * Math.min(1, dt * k);
}

function makeGlowTexture(): THREE.Texture {
	const c = document.createElement('canvas');
	c.width = c.height = 128;
	const ctx = c.getContext('2d');
	if (ctx) {
		const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
		g.addColorStop(0, 'rgba(255,255,255,1)');
		g.addColorStop(0.22, 'rgba(255,255,255,0.45)');
		g.addColorStop(1, 'rgba(255,255,255,0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 128, 128);
	}
	const tex = new THREE.CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

/**
 * Cadran radar (à plat sur le socle, il tourne avec le reste) :
 * graduations épaisses tous les 10° (majeures tous les 30°) + degrés 0 → 360
 * orientés radialement pour rester lisibles quand le cadran pivote.
 */
function makeDialTexture(): THREE.Texture {
	const size = 1024;
	const c = document.createElement('canvas');
	c.width = c.height = size;
	const ctx = c.getContext('2d');
	if (ctx) {
		const cx = size / 2;
		const cy = size / 2;
		const stroke = '#cfe6f5';

		// Graduations épaisses.
		ctx.strokeStyle = stroke;
		ctx.lineCap = 'round';
		const rOut = size * 0.4;
		for (let deg = 0; deg < 360; deg += 10) {
			const a = ((deg - 90) * Math.PI) / 180;
			const major = deg % 30 === 0;
			const rIn = size * (major ? 0.362 : 0.382);
			ctx.lineWidth = major ? 6 : 3;
			ctx.beginPath();
			ctx.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn);
			ctx.lineTo(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut);
			ctx.stroke();
		}

		// Degrés, orientés radialement.
		ctx.fillStyle = stroke;
		ctx.font = `500 ${Math.round(size * 0.02)}px "JetBrains Mono", monospace`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		const rText = size * 0.445;
		for (let deg = 0; deg < 360; deg += 30) {
			const a = ((deg - 90) * Math.PI) / 180;
			ctx.save();
			ctx.translate(cx + Math.cos(a) * rText, cy + Math.sin(a) * rText);
			ctx.rotate(a - Math.PI / 2);
			ctx.fillText(String(deg), 0, 0);
			ctx.restore();
		}
	}
	const tex = new THREE.CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

export function createCubeScene(canvas: HTMLCanvasElement, opts: CubeOptions = {}): CubeController {
	const initial = opts.color ?? '#00E5FF';
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true,
		premultipliedAlpha: false,
		powerPreference: 'high-performance'
	});
	renderer.setClearColor(0x000000, 0); // fond transparent — pas de post-processing

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
	const camTarget = new THREE.Vector3(0, -0.5, 0);
	camera.position.set(0, 3.6, 7.4);
	camera.lookAt(camTarget);

	// Monde : porte l'inclinaison commune au cube ET au socle (ils bougent ensemble).
	const worldGroup = new THREE.Group();
	scene.add(worldGroup);

	const group = new THREE.Group();
	worldGroup.add(group);

	// Environnement (reflets) — indispensable pour que le verre poli accroche la lumière.
	const pmrem = new THREE.PMREMGenerator(renderer);
	const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
	scene.environment = envRT.texture;
	pmrem.dispose();

	const targetColor = new THREE.Color(initial);
	const curColor = targetColor.clone();
	const white = new THREE.Color('#ffffff');
	const ringColor = new THREE.Color('#dceeff'); // socle / anneaux : blanc constant
	const glowTex = makeGlowTexture();

	// Halo ambiant (derrière tout) — remplace le bloom.
	const auraMat = new THREE.SpriteMaterial({
		map: glowTex,
		color: curColor.clone(),
		transparent: true,
		opacity: 0.06,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		depthTest: true
	});
	const aura = new THREE.Sprite(auraMat);
	aura.scale.set(7, 7, 1);
	aura.renderOrder = -2;
	group.add(aura);

	// Arêtes néon — respectent la profondeur : les arêtes arrière sont masquées
	// par les faces opaques (on ne voit que celles de devant).
	const edgeMat = new THREE.LineBasicMaterial({
		color: curColor.clone(),
		transparent: true,
		opacity: 0.8,
		depthWrite: false,
		depthTest: true
	});

	// Faces « verre poli » : translucides + reflets, écrivent la profondeur pour
	// occulter ce qui passe derrière le cube (anneaux, etc.).
	// Faces « cube d'énergie » : champ de force fresnel teinté par le cluster
	// (fond dense + silhouette lumineuse). Écrit la profondeur → occulte ce qui
	// passe derrière le cube.
	const faceMat = new THREE.ShaderMaterial({
		uniforms: {
			uColor: { value: new THREE.Color(initial) },
			uBase: { value: 0.45 },
			uRim: { value: 0.55 },
			uPower: { value: 2.2 },
			uOpacity: { value: 1 }
		},
		vertexShader: `
			varying vec3 vN;
			varying vec3 vV;
			void main() {
				vec4 wp = modelMatrix * vec4(position, 1.0);
				vN = normalize(mat3(modelMatrix) * normal);
				vV = normalize(cameraPosition - wp.xyz);
				gl_Position = projectionMatrix * viewMatrix * wp;
			}
		`,
		fragmentShader: `
			uniform vec3 uColor;
			uniform float uBase;
			uniform float uRim;
			uniform float uPower;
			uniform float uOpacity;
			varying vec3 vN;
			varying vec3 vV;
			void main() {
				float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), uPower);
				vec3 col = uColor * (uBase + uRim * f);
				col = mix(col, vec3(1.0), 0.45 * f * f);
				gl_FragColor = vec4(col * uOpacity, 1.0);
			}
		`,
		transparent: false,
		depthWrite: true,
		side: THREE.FrontSide
	});

	// Lumières pour animer les reflets du verre.
	scene.add(new THREE.AmbientLight(0xbfeaff, 0.55));
	const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
	keyLight.position.set(2.5, 4, 5);
	scene.add(keyLight);
	const rimLight = new THREE.PointLight(0x2979ff, 6, 30);
	rimLight.position.set(-4, -2, 3);
	scene.add(rimLight);

	const N = 3;
	const cell = 1.0;
	const step = cell + 0.22;
	const off = ((N - 1) / 2) * step;
	const faceGeo = new THREE.BoxGeometry(cell, cell, cell);
	// Arêtes sur une boîte très légèrement plus grande : elles encadrent les faces
	// sans z-fighting, et les arêtes arrière passent bien derrière (occultées).
	const edgeBox = new THREE.BoxGeometry(cell * 1.012, cell * 1.012, cell * 1.012);
	const edgeGeo = new THREE.EdgesGeometry(edgeBox);
	edgeBox.dispose();

	const subs: SubCube[] = [];
	for (let x = 0; x < N; x++) {
		for (let y = 0; y < N; y++) {
			for (let z = 0; z < N; z++) {
				if (x === 1 && y === 1 && z === 1) continue; // centre laissé vide pour l'atome
				const mesh = new THREE.LineSegments(edgeGeo, edgeMat);
				mesh.renderOrder = 3; // arêtes au-dessus
				const base = new THREE.Vector3(x * step - off, y * step - off, z * step - off);
				mesh.position.copy(base);
				// Face verre, enfant de l'arête (suit position/échelle). renderOrder 0 :
				// rendue AVANT les anneaux → écrit la profondeur → les anneaux derrière
				// sont rejetés (occultés).
				mesh.add(new THREE.Mesh(faceGeo, faceMat));
				const dir = base.clone().normalize();
				subs.push({
					mesh,
					base,
					dir,
					dist: base.length(),
					phase: Math.random() * Math.PI * 2
				});
				group.add(mesh);
			}
		}
	}

	// Cœur : ATOME (noyau lumineux + électrons orbitaux), au centre vide du cube.
	// Tout en depthTest=false → toujours visible, même au milieu des cubes opaques.
	const atom = new THREE.Group();
	group.add(atom);

	const nucleusGeo = new THREE.IcosahedronGeometry(0.15, 2);
	const nucleusMat = new THREE.MeshBasicMaterial({
		color: curColor.clone(),
		transparent: true,
		opacity: 0.95,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		depthTest: true
	});
	const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
	nucleus.renderOrder = 6;
	atom.add(nucleus);

	const nucleusGlowMat = new THREE.SpriteMaterial({
		map: glowTex,
		color: curColor.clone(),
		transparent: true,
		opacity: 0.6,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		depthTest: true
	});
	const nucleusGlow = new THREE.Sprite(nucleusGlowMat);
	nucleusGlow.scale.set(3.0, 3.0, 1);
	nucleusGlow.renderOrder = 5;
	atom.add(nucleusGlow);

	// 3 orbites inclinées différemment, chacune avec un électron.
	const orbitR = 0.62;
	const orbitMat = new THREE.LineBasicMaterial({
		color: curColor.clone(),
		transparent: true,
		opacity: 0.4,
		depthWrite: false,
		depthTest: true
	});
	const orbitTilts: THREE.Euler[] = [
		new THREE.Euler(0, 0, 0),
		new THREE.Euler(Math.PI / 2.3, 0, Math.PI / 3),
		new THREE.Euler(-Math.PI / 3, Math.PI / 2.4, 0)
	];
	const orbitGeos: THREE.BufferGeometry[] = [];
	const electronMats: THREE.SpriteMaterial[] = [];
	const electrons: { sprite: THREE.Sprite; speed: number; angle: number }[] = [];
	for (let i = 0; i < orbitTilts.length; i++) {
		const pivot = new THREE.Group();
		pivot.rotation.copy(orbitTilts[i]);
		atom.add(pivot);

		const pts: THREE.Vector3[] = [];
		for (let k = 0; k < 72; k++) {
			const a = (k / 72) * Math.PI * 2;
			pts.push(new THREE.Vector3(Math.cos(a) * orbitR, Math.sin(a) * orbitR, 0));
		}
		const og = new THREE.BufferGeometry().setFromPoints(pts);
		orbitGeos.push(og);
		const ring = new THREE.LineLoop(og, orbitMat);
		ring.renderOrder = 5;
		pivot.add(ring);

		const eMat = new THREE.SpriteMaterial({
			map: glowTex,
			color: new THREE.Color('#eaf7ff'),
			transparent: true,
			opacity: 0.95,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			depthTest: true
		});
		electronMats.push(eMat);
		const e = new THREE.Sprite(eMat);
		e.scale.set(0.17, 0.17, 1);
		e.renderOrder = 6;
		pivot.add(e);
		electrons.push({ sprite: e, speed: 1.5 + i * 0.6, angle: Math.random() * Math.PI * 2 });
	}

	// --- Anneaux orbitaux (plateforme holographique inclinée autour du cube) ---
	const ringGroup = new THREE.Group();
	ringGroup.rotation.x = -Math.PI / 2; // plan horizontal — même repère que le cube
	ringGroup.position.y = -1.9; // plateforme sous le cube
	worldGroup.add(ringGroup);

	const arcGeo = (r: number, seg: number, span: number): THREE.BufferGeometry => {
		const pts: THREE.Vector3[] = [];
		for (let i = 0; i <= seg; i++) {
			const a = (i / seg) * span;
			pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
		}
		return new THREE.BufferGeometry().setFromPoints(pts);
	};

	// Socle : blanc constant. Anneaux en tores (épaisseur via le rayon de tube).
	const mkRingMat = (opacity: number): THREE.LineBasicMaterial =>
		new THREE.LineBasicMaterial({
			color: ringColor.clone(),
			transparent: true,
			opacity,
			depthWrite: false
		});
	const mkTorusMat = (opacity: number): THREE.MeshBasicMaterial =>
		new THREE.MeshBasicMaterial({
			color: ringColor.clone(),
			transparent: true,
			opacity,
			depthWrite: false
		});

	const geoRingA = new THREE.TorusGeometry(2.5, 0.014, 8, 140);
	const geoRingB = new THREE.TorusGeometry(3.3, 0.015, 8, 160);
	const geoRingC = new THREE.TorusGeometry(4.0, 0.018, 8, 190);
	const geoSweep = arcGeo(3.3, 60, 1.9);
	const mRingA = mkTorusMat(0.6);
	const mRingB = mkTorusMat(0.72);
	const mRingC = mkTorusMat(0.5);
	const mSweep = mkRingMat(0.9);
	const ringMats: THREE.Material[] = [mRingA, mRingB, mRingC, mSweep];

	const ringA = new THREE.Mesh(geoRingA, mRingA);
	const ringB = new THREE.Mesh(geoRingB, mRingB);
	const ringC = new THREE.Mesh(geoRingC, mRingC);
	const sweep = new THREE.Line(geoSweep, mSweep);
	ringGroup.add(ringA, ringB, ringC, sweep);
	// renderOrder 1 : rendus APRÈS le verre (renderOrder 0) → la profondeur du
	// verre les rejette quand ils passent derrière le cube (occultation).
	for (const o of [ringA, ringB, ringC, sweep]) o.renderOrder = 1;

	// Axes radiaux tous les 60° — dépassent le socle et se fondent vers la pointe
	// (alpha par sommet : plein sur le socle, → 0 au-delà du bord).
	const socleEdge = 4.0;
	const tipEnd = 5.9;
	const axisRadii = [0.3, socleEdge, 4.55, 5.15, tipEnd];
	const alphaAt = (r: number): number =>
		r <= socleEdge ? 0.5 : Math.max(0, 0.5 * (1 - (r - socleEdge) / (tipEnd - socleEdge)));
	const axisPos: number[] = [];
	const axisCol: number[] = [];
	for (let deg = 0; deg < 360; deg += 60) {
		const a = (deg * Math.PI) / 180;
		const cx = Math.cos(a);
		const cy = Math.sin(a);
		for (let i = 0; i < axisRadii.length - 1; i++) {
			const r0 = axisRadii[i];
			const r1 = axisRadii[i + 1];
			axisPos.push(cx * r0, cy * r0, 0, cx * r1, cy * r1, 0);
			axisCol.push(
				ringColor.r, ringColor.g, ringColor.b, alphaAt(r0),
				ringColor.r, ringColor.g, ringColor.b, alphaAt(r1)
			);
		}
	}
	const axisGeo = new THREE.BufferGeometry();
	axisGeo.setAttribute('position', new THREE.Float32BufferAttribute(axisPos, 3));
	axisGeo.setAttribute('color', new THREE.Float32BufferAttribute(axisCol, 4));
	const mAxes = new THREE.LineBasicMaterial({
		vertexColors: true,
		transparent: true,
		depthWrite: false
	});
	const axes = new THREE.LineSegments(axisGeo, mAxes);
	axes.renderOrder = 1;
	ringGroup.add(axes);

	// Cadran : degrés 0 → 360 imprimés à plat sur le socle.
	const dialTex = makeDialTexture();
	const dialMat = new THREE.MeshBasicMaterial({
		map: dialTex,
		transparent: true,
		opacity: 0.4,
		depthWrite: false,
		side: THREE.DoubleSide
	});
	const dialGeo = new THREE.PlaneGeometry(7.0, 7.0);
	const dial = new THREE.Mesh(dialGeo, dialMat);
	dial.renderOrder = 1;
	ringGroup.add(dial);

	// État animé interpolé.
	const T = {
		rot: { cur: PRESETS.idle.rot, tgt: PRESETS.idle.rot } as Tween,
		explode: { cur: 0, tgt: 0 } as Tween,
		scale: { cur: 1, tgt: 1 } as Tween,
		core: { cur: PRESETS.idle.core, tgt: PRESETS.idle.core } as Tween
	};

	const clock = new THREE.Clock();
	let raf = 0;
	let running = false;
	let yRot = 0;

	function render(): void {
		renderer.render(scene, camera);
	}

	function frame(dt: number, t: number): void {
		approach(T.rot, dt, 1.5);
		approach(T.explode, dt, 1.2);
		approach(T.scale, dt, 2);
		approach(T.core, dt, 1.5);

		curColor.lerp(targetColor, Math.min(1, dt * 2));
		edgeMat.color.copy(curColor);
		auraMat.color.copy(curColor);
		nucleusGlowMat.color.copy(curColor);
		nucleusMat.color.copy(curColor).lerp(white, 0.5);
		orbitMat.color.copy(curColor);

		const ex = T.explode.cur;

		yRot += T.rot.cur * dt;
		group.rotation.y = yRot; // rotation propre du cube (toupie)
		// Inclinaison appliquée au monde entier → cube ET socle s'inclinent ensemble.
		worldGroup.rotation.x = Math.sin(t * 0.25) * 0.16 + ex * Math.sin(t * 0.6) * 0.18;
		worldGroup.rotation.z = ex * Math.sin(t * 0.4) * 0.1;

		const pulse = Math.sin(t * 3.2) * 0.04 * T.core.cur * (T.scale.tgt > 1.0 ? 1 : 0.15);
		group.scale.setScalar(T.scale.cur * (1 + Math.sin(t * 1.0) * 0.02 + pulse));

		for (const sc of subs) {
			// Les sous-cubes dérivent vers l'extérieur en suivant une onde « scan »
			// qui se propage du centre — mais restent alignés (pas de rotation propre).
			const wave = 0.5 + 0.5 * Math.sin(t * 1.4 - sc.dist * 2.0 + sc.phase);
			sc.mesh.position.copy(sc.base).addScaledVector(sc.dir, ex * (0.2 + 0.55 * wave));
			sc.mesh.scale.setScalar(1 + ex * (wave - 0.5) * 0.22);
		}
		edgeMat.opacity = 0.62 + 0.16 * ex;

		// Atome : noyau qui bat, électrons qui orbitent, l'ensemble tourne doucement.
		atom.rotation.y += dt * 0.35;
		nucleus.scale.setScalar(1 + Math.sin(t * 4) * 0.12 + T.core.cur * 0.5);
		nucleusMat.opacity = 0.7 + 0.3 * T.core.cur;
		nucleusGlowMat.opacity = 0.55 + 0.45 * T.core.cur;
		orbitMat.opacity = 0.28 + 0.22 * T.core.cur;
		for (const el of electrons) {
			el.angle += (el.speed + T.core.cur * 1.6) * dt;
			el.sprite.position.set(Math.cos(el.angle) * orbitR, Math.sin(el.angle) * orbitR, 0);
		}
		auraMat.opacity = 0.18 + 0.3 * T.core.cur + 0.06 * ex;

		// Cube d'énergie : couleur du cluster, plus intense en response.
		faceMat.uniforms.uColor.value.copy(curColor);
		faceMat.uniforms.uOpacity.value = 0.9 + 0.5 * T.core.cur;

		// Anneaux orbitaux (socle blanc, fixe) : graduations + scanner qui tournent ; estompés en response.
		const ringFade = 1 - 0.3 * T.core.cur;
		mRingA.opacity = (0.55 + 0.1 * ex) * ringFade;
		mRingB.opacity = (0.7 + 0.12 * ex) * ringFade;
		mRingC.opacity = 0.5 * ringFade;
		mSweep.opacity = (0.85 + 0.15 * ex) * ringFade;
		// Cadran (graduations + chiffres) tourne ; axes/secteurs suivent.
		dial.rotation.z += (0.22 + ex * 0.45) * dt;
		axes.rotation.z = dial.rotation.z;
		sweep.rotation.z -= (0.5 + ex * 0.9) * dt;
	}

	function snap(): void {
		T.rot.cur = T.rot.tgt;
		T.explode.cur = T.explode.tgt;
		T.scale.cur = T.scale.tgt;
		T.core.cur = T.core.tgt;
		curColor.copy(targetColor);
	}

	function setActivity(a: CubeActivity): void {
		const p = PRESETS[a];
		T.rot.tgt = p.rot;
		T.explode.tgt = p.explode;
		T.scale.tgt = p.scale;
		T.core.tgt = p.core;
		if (!running) {
			snap();
			renderOnce();
		}
	}

	function setColor(hex: string): void {
		targetColor.set(hex);
		if (!running) {
			curColor.copy(targetColor);
			renderOnce();
		}
	}

	function renderOnce(): void {
		frame(0.016, 0);
		render();
	}

	function loop(): void {
		raf = requestAnimationFrame(loop);
		const dt = Math.min(0.05, clock.getDelta());
		frame(dt, clock.elapsedTime);
		render();
	}

	function start(): void {
		if (running) return;
		running = true;
		clock.start();
		raf = requestAnimationFrame(loop);
	}

	function stop(): void {
		if (!running) return;
		running = false;
		cancelAnimationFrame(raf);
		clock.stop();
	}

	function resize(): void {
		const w = Math.max(1, canvas.clientWidth);
		const h = Math.max(1, canvas.clientHeight);
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		renderer.setPixelRatio(dpr);
		renderer.setSize(w, h, false);
		const aspect = w / h;
		camera.aspect = aspect;
		// Vue en légère plongée (3/4) ; recule sur les formats étroits.
		const k = 1 / Math.min(1, aspect);
		camera.position.set(0, 3.6 * k, 7.4 * k);
		camera.lookAt(camTarget);
		camera.updateProjectionMatrix();
		if (!running) renderOnce();
	}

	function dispose(): void {
		stop();
		edgeGeo.dispose();
		edgeMat.dispose();
		faceGeo.dispose();
		faceMat.dispose();
		envRT.dispose();
		nucleusGeo.dispose();
		nucleusMat.dispose();
		nucleusGlowMat.dispose();
		orbitMat.dispose();
		for (const g of orbitGeos) g.dispose();
		for (const m of electronMats) m.dispose();
		glowTex.dispose();
		auraMat.dispose();
		geoRingA.dispose();
		geoRingB.dispose();
		geoRingC.dispose();
		geoSweep.dispose();
		axisGeo.dispose();
		mAxes.dispose();
		dialGeo.dispose();
		dialMat.dispose();
		dialTex.dispose();
		for (const m of ringMats) m.dispose();
		renderer.dispose();
	}

	return { setActivity, setColor, resize, renderOnce, start, stop, dispose };
}
