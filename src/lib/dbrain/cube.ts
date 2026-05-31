/**
 * D-Brain OS — Cube Conscience (Three.js / WebGL).
 *
 * Lattice de sous-cubes filaires + cœur lumineux. Le glow est obtenu par des
 * halos additifs (sprites) — pas de post-processing — pour garantir un fond
 * réellement transparent. Trois activités (idle / exploration / response) et
 * une couleur thématique, interpolées en douceur. Pensé pour être lazy-loadé.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

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
	background?: string;
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
	mesh: THREE.Mesh;
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

/**
 * Texture de circuit (PCB) pour les faces des cubes. Masque 2 canaux :
 * canal vert = traces « principales » (teintées cluster), canal rouge = traces
 * et nœuds « accent » (orange). Le shader colorise ; bloom fait le glow.
 */
function makeCircuitTexture(): THREE.Texture {
	const size = 512;
	const c = document.createElement('canvas');
	c.width = c.height = size;
	const ctx = c.getContext('2d');
	if (ctx) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, size, size);
		ctx.globalCompositeOperation = 'lighter';
		ctx.lineCap = 'square';
		const grid = size / 18;
		const snap = () => Math.round(Math.random() * 18) * grid;
		const trace = (col: string, count: number, width: number) => {
			ctx.strokeStyle = col;
			ctx.fillStyle = col;
			ctx.lineWidth = width;
			for (let i = 0; i < count; i++) {
				let x = snap();
				let y = snap();
				ctx.beginPath();
				ctx.moveTo(x, y);
				const seg = 2 + Math.floor(Math.random() * 5);
				for (let s = 0; s < seg; s++) {
					const len = (1 + Math.floor(Math.random() * 4)) * grid * (Math.random() < 0.5 ? 1 : -1);
					if (Math.random() < 0.5) x += len;
					else y += len;
					ctx.lineTo(x, y);
				}
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(x, y, width * 1.4, 0, Math.PI * 2);
				ctx.fill();
			}
		};
		const dots = (col: string, count: number, rmax: number) => {
			ctx.fillStyle = col;
			for (let i = 0; i < count; i++) {
				ctx.beginPath();
				ctx.arc(snap(), snap(), 2 + Math.random() * rmax, 0, Math.PI * 2);
				ctx.fill();
			}
		};
		trace('#00ff00', 13, 3); // principal (canal vert) — densité réduite
		trace('#00ff00', 8, 2);
		trace('#ff0000', 6, 3); // accent (canal rouge)
		dots('#00ff00', 10, 3);
		dots('#ff0000', 8, 4);
	}
	const tex = new THREE.CanvasTexture(c);
	tex.colorSpace = THREE.NoColorSpace; // masque de données, pas une couleur
	tex.needsUpdate = true;
	return tex;
}

export function createCubeScene(canvas: HTMLCanvasElement, opts: CubeOptions = {}): CubeController {
	const initial = opts.color ?? '#00E5FF';
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		powerPreference: 'high-performance'
	});
	// Opaque, accordé au fond de la page → bloom OK, pas de boîte visible.
	renderer.setClearColor(new THREE.Color(opts.background ?? '#05070d'), 1);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
	const camTarget = new THREE.Vector3(0, -0.5, 0);
	camera.position.set(0, 3.6, 7.4);
	camera.lookAt(camTarget);

	// Monde : porte l'inclinaison commune au cube ET au socle.
	const worldGroup = new THREE.Group();
	scene.add(worldGroup);

	const group = new THREE.Group();
	worldGroup.add(group);

	// Post-processing : bloom (le glow néon des circuits / traces / nœuds).
	const composer = new EffectComposer(renderer);
	composer.addPass(new RenderPass(scene, camera));
	const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.35, 0.4, 0.5);
	composer.addPass(bloom);

	const targetColor = new THREE.Color(initial);
	const curColor = targetColor.clone();
	const white = new THREE.Color('#ffffff');
	const ringColor = new THREE.Color('#dceeff'); // socle / anneaux : blanc constant
	const accentColor = new THREE.Color('#ff8a1e'); // accent orange (traces / nœuds)
	const glowTex = makeGlowTexture();
	const circuitTex = makeCircuitTexture();

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

	// Faces « verre poli » : translucides + reflets, écrivent la profondeur pour
	// occulter ce qui passe derrière le cube (anneaux, etc.).
	// Faces « cube d'énergie » : champ de force fresnel teinté par le cluster
	// (fond dense + silhouette lumineuse). Écrit la profondeur → occulte ce qui
	// passe derrière le cube.
	const faceMat = new THREE.ShaderMaterial({
		uniforms: {
			uColor: { value: new THREE.Color(initial) },
			uAccent: { value: accentColor.clone() },
			uCircuit: { value: circuitTex },
			uPower: { value: 2.2 },
			uOpacity: { value: 1 },
			uTime: { value: 0 },
			uAlpha: { value: 0.85 }
		},
		vertexShader: `
			varying vec3 vN;
			varying vec3 vV;
			varying vec3 vW;
			varying vec2 vUv;
			void main() {
				vec4 wp = modelMatrix * vec4(position, 1.0);
				vW = wp.xyz;
				vUv = uv;
				vN = normalize(mat3(modelMatrix) * normal);
				vV = normalize(cameraPosition - wp.xyz);
				gl_Position = projectionMatrix * viewMatrix * wp;
			}
		`,
		fragmentShader: `
			uniform vec3 uColor;
			uniform vec3 uAccent;
			uniform sampler2D uCircuit;
			uniform float uPower;
			uniform float uOpacity;
			uniform float uTime;
			uniform float uAlpha;
			varying vec3 vN;
			varying vec3 vV;
			varying vec3 vW;
			varying vec2 vUv;
			float hash(vec3 p) {
				return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
			}
			void main() {
				vec3 ct = texture2D(uCircuit, vUv).rgb;
				float mainM = ct.g;   // traces principales (cluster)
				float accentM = ct.r; // traces / nœuds accent (orange)
				float fres = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), uPower);
				// Pulse « data-flow » le long des traces.
				float flow = 0.55 + 0.45 * sin((vUv.x + vUv.y) * 22.0 - uTime * 3.0);
				vec3 body = uColor * 0.06;
				vec3 trace = (uColor * mainM * 0.8 + uAccent * accentM * 1.0) * (0.75 + 0.35 * flow);
				// Liseré sur les arêtes arrondies : cluster qui vire vers l'accent orange
				// sur la silhouette (remplace l'ancien wireframe néon).
				vec3 rim = mix(uColor, uAccent, 0.35 * fres) * fres * 0.85;
				vec3 col = body + trace + rim;
				col = mix(col, vec3(1.0), 0.28 * fres * fres);
				// Grain animé + fines scanlines.
				float g = hash(floor(vW * 7.0) + floor(uTime * 1.5));
				col *= 0.9 + 0.12 * g;
				col *= 0.96 + 0.04 * sin(vW.y * 60.0 + uTime * 2.0);
				gl_FragColor = vec4(col * uOpacity, uAlpha);
			}
		`,
		transparent: true,
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
	// Coque « cube d'énergie » arrondie (RoundedBox) : arêtes douces, pas de wireframe —
	// le liseré fresnel du shader fait glow la silhouette arrondie.
	const faceGeo = new RoundedBoxGeometry(cell, cell, cell, 4, 0.07);

	// Cube « cœur » solide arrondi (~90% du sous-cube), sans glow, vu par les faces translucides.
	const coreBoxGeo = new RoundedBoxGeometry(0.9, 0.9, 0.9, 4, 0.12);
	const coreBoxMat = new THREE.MeshBasicMaterial({ color: curColor.clone() });

	const subs: SubCube[] = [];
	for (let x = 0; x < N; x++) {
		for (let y = 0; y < N; y++) {
			for (let z = 0; z < N; z++) {
				if (x === 1 && y === 1 && z === 1) continue; // centre laissé vide pour l'atome
				// La coque circuit EST le sous-cube. renderOrder 0 : rendue AVANT les
				// anneaux → écrit la profondeur → les anneaux derrière sont occultés.
				const mesh = new THREE.Mesh(faceGeo, faceMat);
				const base = new THREE.Vector3(x * step - off, y * step - off, z * step - off);
				mesh.position.copy(base);
				mesh.add(new THREE.Mesh(coreBoxGeo, coreBoxMat));
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

	// --- Réseau de connaissances : nœuds autour du cube + lignes de connexion ---
	// (apparaît en EXPLORATION : « scanning knowledge network »).
	const network = new THREE.Group();
	worldGroup.add(network);

	const NODE_COUNT = 11;
	const nodePos: THREE.Vector3[] = [];
	for (let i = 0; i < NODE_COUNT; i++) {
		const y = 1 - (i / (NODE_COUNT - 1)) * 2;
		const r = Math.sqrt(Math.max(0, 1 - y * y));
		const theta = i * 2.399963; // angle d'or
		const rad = 3.0 + Math.random() * 0.9;
		nodePos.push(new THREE.Vector3(Math.cos(theta) * r * rad, y * rad * 0.7, Math.sin(theta) * r * rad));
	}

	const linePts: number[] = [];
	for (const p of nodePos) linePts.push(0, 0, 0, p.x, p.y, p.z);
	const netLineGeo = new THREE.BufferGeometry();
	netLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
	const netLineMat = new THREE.LineBasicMaterial({
		color: curColor.clone(),
		transparent: true,
		opacity: 0,
		depthWrite: false
	});
	const netLines = new THREE.LineSegments(netLineGeo, netLineMat);
	netLines.renderOrder = 2;
	network.add(netLines);

	const nodeMat = new THREE.SpriteMaterial({
		map: glowTex,
		color: curColor.clone(),
		transparent: true,
		opacity: 0,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	const pulseMat = new THREE.SpriteMaterial({
		map: glowTex,
		color: new THREE.Color('#eaf7ff'),
		transparent: true,
		opacity: 0,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	const nodeSprites: THREE.Sprite[] = [];
	const pulseSprites: THREE.Sprite[] = [];
	const pulsePhase: number[] = [];
	for (const p of nodePos) {
		const n = new THREE.Sprite(nodeMat);
		n.scale.set(0.42, 0.42, 1);
		n.position.copy(p);
		n.renderOrder = 3;
		network.add(n);
		nodeSprites.push(n);

		const pl = new THREE.Sprite(pulseMat);
		pl.scale.set(0.24, 0.24, 1);
		pl.renderOrder = 3;
		network.add(pl);
		pulseSprites.push(pl);
		pulsePhase.push(Math.random());
	}

	// --- Anneaux orbitaux (plateforme holographique inclinée autour du cube) ---
	const ringGroup = new THREE.Group();
	ringGroup.rotation.x = -Math.PI / 2; // plan horizontal — même repère que le cube
	ringGroup.position.y = -1.9; // plateforme sous le cube
	worldGroup.add(ringGroup);

	// Reflet de la lumière du cube sur le socle (le glow « se pose » sur la plateforme).
	const poolMat = new THREE.MeshBasicMaterial({
		map: glowTex,
		color: curColor.clone(),
		transparent: true,
		opacity: 0.25,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
	const poolGeo = new THREE.PlaneGeometry(5.5, 5.5);
	const pool = new THREE.Mesh(poolGeo, poolMat);
	pool.renderOrder = 0; // sous les anneaux
	ringGroup.add(pool);

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

	// --- Instrumentation « sci-fi » du socle (tout en blanc constant) ---------

	// Anneau-bezel fin qui borne la bande de graduations.
	const geoRingD = new THREE.TorusGeometry(4.34, 0.012, 8, 200);
	const mRingD = mkTorusMat(0.45);
	ringMats.push(mRingD);
	const ringD = new THREE.Mesh(geoRingD, mRingD);
	ringD.renderOrder = 1;
	ringGroup.add(ringD);

	// Bande de graduations fines : un tick tous les 5°, long tous les 30°.
	const gradPos: number[] = [];
	const gradInner = 4.1;
	for (let deg = 0; deg < 360; deg += 5) {
		const a = (deg * Math.PI) / 180;
		const cx = Math.cos(a);
		const cy = Math.sin(a);
		const r1 = deg % 30 === 0 ? 4.34 : 4.22;
		gradPos.push(cx * gradInner, cy * gradInner, 0, cx * r1, cy * r1, 0);
	}
	const gradGeo = new THREE.BufferGeometry();
	gradGeo.setAttribute('position', new THREE.Float32BufferAttribute(gradPos, 3));
	const mGrad = mkRingMat(0.4);
	ringMats.push(mGrad);
	const grad = new THREE.LineSegments(gradGeo, mGrad);
	grad.renderOrder = 1;
	ringGroup.add(grad);

	// Réticule rotatif : 4 arcs « caliper » avec pattes radiales (contre-sens du cadran).
	const reticlePos: number[] = [];
	const reticleR = 2.9;
	for (const baseDeg of [45, 135, 225, 315]) {
		const a0 = (baseDeg * Math.PI) / 180 - 0.18;
		const span = 0.36;
		const segN = 18;
		for (let i = 0; i < segN; i++) {
			const aa = a0 + (i / segN) * span;
			const ab = a0 + ((i + 1) / segN) * span;
			reticlePos.push(
				Math.cos(aa) * reticleR, Math.sin(aa) * reticleR, 0,
				Math.cos(ab) * reticleR, Math.sin(ab) * reticleR, 0
			);
		}
		for (const ae of [a0, a0 + span]) {
			reticlePos.push(
				Math.cos(ae) * (reticleR - 0.12), Math.sin(ae) * (reticleR - 0.12), 0,
				Math.cos(ae) * (reticleR + 0.12), Math.sin(ae) * (reticleR + 0.12), 0
			);
		}
	}
	const reticleGeo = new THREE.BufferGeometry();
	reticleGeo.setAttribute('position', new THREE.Float32BufferAttribute(reticlePos, 3));
	const mReticle = mkRingMat(0.55);
	ringMats.push(mReticle);
	const reticle = new THREE.LineSegments(reticleGeo, mReticle);
	reticle.renderOrder = 1;
	ringGroup.add(reticle);

	// Nœuds de jonction (pads PCB) aux croisements axes × anneaux — petits points lumineux.
	const socleNodePos: number[] = [];
	for (let deg = 0; deg < 360; deg += 60) {
		const a = (deg * Math.PI) / 180;
		for (const r of [2.5, 3.3, 4.0]) {
			socleNodePos.push(Math.cos(a) * r, Math.sin(a) * r, 0.002);
		}
	}
	const nodeGeo = new THREE.BufferGeometry();
	nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(socleNodePos, 3));
	const mNodes = new THREE.PointsMaterial({
		map: glowTex,
		color: ringColor.clone(),
		size: 0.22,
		transparent: true,
		opacity: 0.85,
		depthWrite: false,
		sizeAttenuation: true
	});
	const socleNodes = new THREE.Points(nodeGeo, mNodes);
	socleNodes.renderOrder = 1;
	ringGroup.add(socleNodes);

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
		composer.render();
	}

	function frame(dt: number, t: number): void {
		approach(T.rot, dt, 1.5);
		approach(T.explode, dt, 1.2);
		approach(T.scale, dt, 2);
		approach(T.core, dt, 1.5);

		curColor.lerp(targetColor, Math.min(1, dt * 2));
		auraMat.color.copy(curColor);
		nucleusGlowMat.color.copy(curColor);
		nucleusMat.color.copy(curColor).lerp(white, 0.5);
		orbitMat.color.copy(curColor);

		const ex = T.explode.cur;

		yRot += T.rot.cur * dt;
		group.rotation.y = yRot; // rotation propre du cube (toupie) ; inclinaison fixe (worldGroup à 0)

		const pulse = Math.sin(t * 3.2) * 0.04 * T.core.cur * (T.scale.tgt > 1.0 ? 1 : 0.15);
		group.scale.setScalar(T.scale.cur * (1 + Math.sin(t * 1.0) * 0.02 + pulse));

		for (const sc of subs) {
			// Les sous-cubes dérivent vers l'extérieur en suivant une onde « scan »
			// qui se propage du centre — mais restent alignés (pas de rotation propre).
			const wave = 0.5 + 0.5 * Math.sin(t * 1.4 - sc.dist * 2.0 + sc.phase);
			sc.mesh.position.copy(sc.base).addScaledVector(sc.dir, ex * (0.2 + 0.55 * wave));
			sc.mesh.scale.setScalar(1 + ex * (wave - 0.5) * 0.22);
		}

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

		// Réseau de connaissances — faisceaux + nœuds + pulses, en exploration.
		const netVis = Math.min(1, ex * 1.6);
		network.visible = netVis > 0.01;
		if (network.visible) {
			netLineMat.color.copy(curColor);
			nodeMat.color.copy(curColor);
			netLineMat.opacity = 0.3 * netVis;
			nodeMat.opacity = 0.85 * netVis;
			pulseMat.opacity = netVis;
			for (let i = 0; i < nodeSprites.length; i++) {
				nodeSprites[i].scale.setScalar(0.34 + 0.12 * Math.sin(t * 3 + i));
				const f = (pulsePhase[i] + t * 0.45) % 1;
				const p = nodePos[i];
				pulseSprites[i].position.set(p.x * f, p.y * f, p.z * f);
			}
		}

		// Cube d'énergie : couleur du cluster, plus intense en response.
		faceMat.uniforms.uColor.value.copy(curColor);
		faceMat.uniforms.uOpacity.value = 0.9 + 0.5 * T.core.cur;
		faceMat.uniforms.uTime.value = t;
		coreBoxMat.color.copy(curColor).multiplyScalar(0.5);

		// Anneaux orbitaux (socle blanc, fixe) : graduations + scanner qui tournent ; estompés en response.
		const ringFade = 1 - 0.3 * T.core.cur;
		mRingA.opacity = (0.55 + 0.1 * ex) * ringFade;
		mRingB.opacity = (0.7 + 0.12 * ex) * ringFade;
		mRingC.opacity = 0.5 * ringFade;
		mSweep.opacity = (0.85 + 0.15 * ex) * ringFade;
		mRingD.opacity = 0.45 * ringFade;
		mGrad.opacity = (0.35 + 0.1 * ex) * ringFade;
		mReticle.opacity = (0.5 + 0.15 * ex) * ringFade;
		mNodes.opacity = (0.6 + 0.2 * (0.5 + 0.5 * Math.sin(t * 1.6))) * ringFade;
		poolMat.color.copy(curColor);
		poolMat.opacity = 0.18 + 0.4 * T.core.cur;
		// Cadran (graduations + chiffres) tourne ; axes/secteurs suivent ; réticule à contre-sens.
		dial.rotation.z += (0.22 + ex * 0.45) * dt;
		axes.rotation.z = dial.rotation.z;
		sweep.rotation.z -= (0.5 + ex * 0.9) * dt;
		reticle.rotation.z -= (0.18 + ex * 0.5) * dt;
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
		composer.setPixelRatio(dpr);
		composer.setSize(w, h);
		bloom.setSize(w, h);
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
		faceGeo.dispose();
		faceMat.dispose();
		coreBoxGeo.dispose();
		coreBoxMat.dispose();
		circuitTex.dispose();
		nucleusGeo.dispose();
		nucleusMat.dispose();
		nucleusGlowMat.dispose();
		orbitMat.dispose();
		for (const g of orbitGeos) g.dispose();
		for (const m of electronMats) m.dispose();
		netLineGeo.dispose();
		netLineMat.dispose();
		nodeMat.dispose();
		pulseMat.dispose();
		glowTex.dispose();
		auraMat.dispose();
		geoRingA.dispose();
		geoRingB.dispose();
		geoRingC.dispose();
		geoRingD.dispose();
		geoSweep.dispose();
		gradGeo.dispose();
		reticleGeo.dispose();
		nodeGeo.dispose();
		mNodes.dispose();
		axisGeo.dispose();
		mAxes.dispose();
		dialGeo.dispose();
		dialMat.dispose();
		dialTex.dispose();
		poolGeo.dispose();
		poolMat.dispose();
		for (const m of ringMats) m.dispose();
		composer.dispose();
		renderer.dispose();
	}

	return { setActivity, setColor, resize, renderOnce, start, stop, dispose };
}
