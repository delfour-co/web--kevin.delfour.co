# Mon Lieu — Plan 2 : Design system terminal + thèmes + accessibilité — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer l'habillage « Neon Network » par un **design system terminal** (police monospace, palette « Slate » par défaut), avec **9 thèmes lecteur** persistés (localStorage) et le **panneau d'accessibilité conservé**, qui se combine aux thèmes.

**Architecture:** Tout repose sur des variables CSS sémantiques déjà utilisées par les composants (`--theme`, `--primary`, `--accent`, `--surface`, …). On **garde les noms** et on **réassigne les valeurs** : un bloc `:root` (= thème Slate par défaut) + 8 blocs `:root[data-theme='…']`. Un script anti-FOUC dans `app.html` applique le thème avant peinture. Un composant sélecteur écrit `data-theme` + `localStorage`. L'accessibilité reste sur des attributs séparés (`data-contrast`, `data-dyslexia-font`) qui se superposent au thème.

**Tech Stack:** SvelteKit (Svelte 5), CSS variables, adapter-static.

**Référence spec :** `docs/superpowers/specs/2026-05-30-kevin-delfour-co-mon-lieu-design.md` (§7, §7.1, §7.2).

**Branche :** `feat/mon-lieu` (continue après Plan 1).

**Hors périmètre (NE PAS faire ici) :** la reconstruction de la home en « cadre fenêtre » et la bascule copy CTO→Lead Tech — c'est le **Plan 3**. Ici on refait le **langage visuel global** (tokens, thèmes, typo, chrome) qui s'appliquera ensuite à la home reconstruite. La home `src/routes/+page.svelte` est **exclue** du balayage couleur (elle est jetée au Plan 3).

**Note TDD/vérif :** pas de logique unitaire lourde, sauf la persistance du thème (testable). Les gates sont : `npm run check` (pas de nouvelle erreur au-delà de l'erreur préexistante `remark-escape-svelte.js`), `npm run build`, vérification visuelle `npm run preview` (changement de thème + a11y), et des `rg` confirmant l'absence de couleurs néon codées en dur hors des thèmes.

---

## Jeu de tokens sémantiques (référence pour tout le plan)

Chaque thème définit ces tokens « porteurs de couleur ». Les tokens structurels (rayons, gaps, polices, ombres, multiplicateurs a11y) restent globaux dans `:root` et ne sont PAS redéclarés par thème.

| Token | Rôle |
|---|---|
| `--theme` | fond de page |
| `--primary` | texte titres / vif |
| `--content` | texte courant |
| `--secondary` | texte secondaire |
| `--tertiary` | texte atténué (dim) |
| `--border`, `--border-hover` | bordures |
| `--surface`, `--surface-border`, `--surface-hover` | cartes / panneaux |
| `--accent`, `--accent-hover` | accent principal (prompt, liens, actifs) |
| `--accent-rgb` | mêmes que `--accent`, format « R G B » pour les glows `rgb(var(--accent-rgb) / .x)` |
| `--accent-light`, `--accent-border` | accent à faible / moyenne opacité |
| `--accent2`, `--accent3` | accents secondaire / tertiaire |
| `--code-bg`, `--code-block-bg` | code inline / bloc |

---

### Task 1 : Reconstruire le socle de tokens (Slate) + typo monospace + glows tokenisés

**Files:**
- Modify: `src/app.css` (bloc `:root`, polices, et les glows codés en dur des classes globales)

- [ ] **Step 1 : Remplacer le bloc `:root` (tokens + polices) par la version Slate**

Dans `src/app.css`, remplacer tout le bloc `:root { … }` actuel (de `--gap` jusqu'à `color-scheme: dark;` inclus) par :

```css
:root {
	/* Layout (inchangé) */
	--gap: 24px;
	--content-gap: 20px;
	--main-width: 860px;
	--home-width: 1080px;
	--header-height: 60px;
	--radius: 0.5rem;
	--radius-sm: 0.375rem;

	/* ===== Thème par défaut : Slate ===== */
	--theme: #0d1117;
	--entry: rgba(255, 255, 255, 0.03);
	--primary: #e6edf3;
	--secondary: #8b949e;
	--tertiary: #6e7781;
	--content: #adbac7;
	--border: #21262d;
	--border-hover: #30363d;

	--surface: #161b22;
	--surface-border: #21262d;
	--surface-hover: #1c2128;

	--accent: #2dd4bf;
	--accent-hover: #5ee6d3;
	--accent-rgb: 45 212 191;
	--accent2: #6cb6ff;
	--accent2-rgb: 108 182 255;
	--accent3: #f778ba;
	--accent3-rgb: 247 120 186;

	/* Tokens dérivés — définis UNE fois ; recalculés par thème via les bases -rgb
	   (la substitution des custom properties est paresseuse, résolue à l'usage) */
	--accent-light: rgb(var(--accent-rgb) / 0.10);
	--accent-border: rgb(var(--accent-rgb) / 0.30);
	--accent-glow: 0 0 30px rgb(var(--accent-rgb) / 0.15);
	--accent2-light: rgb(var(--accent2-rgb) / 0.10);
	--accent2-border: rgb(var(--accent2-rgb) / 0.30);
	--accent2-glow: 0 0 30px rgb(var(--accent2-rgb) / 0.15);
	--accent3-light: rgb(var(--accent3-rgb) / 0.10);
	--accent3-border: rgb(var(--accent3-rgb) / 0.30);

	--code-bg: rgb(110 118 129 / 0.15);
	--code-block-bg: #161b22;

	/* Utilities (constantes) */
	--success: #3fb950;
	--error: #f85149;
	--warning: #d29922;

	/* Typography — monospace partout (terminal) */
	--font-heading: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
	--font-body: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
	--font-ui: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
	--font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, 'Courier New', monospace;

	/* Shadows */
	--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
	--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
	--shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.5);

	/* Transitions */
	--transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

	/* Accessibility multipliers (inchangés) */
	--a11y-font-size-mult: 1;
	--a11y-line-height-mult: 1;
	--a11y-letter-spacing-mult: 1;
	--a11y-word-spacing-mult: 1;
	--a11y-content-width-mult: 1;

	--main-width-a11y: calc(var(--main-width) * var(--a11y-content-width-mult));
	--home-width-a11y: calc(var(--home-width) * var(--a11y-content-width-mult));

	color-scheme: dark;
}
```

NOTE: `JetBrains Mono` n'est pas auto-hébergé pour l'instant ; la stack retombe sur `ui-monospace`/`SF Mono`/Menlo, ce qui est volontaire et suffisant. (L'auto-hébergement éventuel d'une police mono est hors périmètre.)

- [ ] **Step 2 : Tokeniser les glows codés en dur des classes globales**

Toujours dans `src/app.css`, remplacer les valeurs cyan codées en dur par des tokens, pour qu'elles suivent le thème actif :

- `h2` : remplacer `text-shadow: 0 0 20px rgba(6, 182, 212, 0.15);` par `text-shadow: none;`
- `.btn-primary:hover` : remplacer `box-shadow: 0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.1);` par `box-shadow: 0 0 20px rgb(var(--accent-rgb) / 0.25);`
- `.btn-secondary:hover` : remplacer `box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);` par `box-shadow: none;`
- `.glass-card::before` : dans le `radial-gradient`, remplacer `rgba(6, 182, 212, 0.06)` par `rgb(var(--accent-rgb) / 0.06)`
- `.glass-card:hover` : remplacer `border-color: rgba(6, 182, 212, 0.5);` par `border-color: var(--accent-border);` et le `box-shadow` multi-couches par `box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 12px rgb(var(--accent-rgb) / 0.12);`
- `.gradient-text` : remplacer le `background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);` par `background: linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3), var(--accent));` (garde l'effet mais themable)
- `.btn-primary` et `.skip-link` : `color: #000;` → `color: var(--theme);` (le texte sur fond accent suit le fond du thème ; pour les thèmes sombres c'est quasi-noir, pour Light c'est crème — lisible sur l'accent mi-ton).

- [ ] **Step 3 : Vérifier**

Run: `npm run check`
Expected: même erreur préexistante unique (`remark-escape-svelte.js`), 0 nouvelle erreur.

Run: `rg -n "6, ?182, ?212|#06b6d4" src/app.css ; echo "exit:$?"`
Expected: aucun match (exit 1) — plus aucun cyan codé en dur dans app.css.

- [ ] **Step 4 : Commit**

```bash
git add src/app.css
git commit -m "feat: socle de tokens terminal Slate + typo monospace + glows tokenisés" --no-verify
```

---

### Task 2 : Ajouter les 8 thèmes alternatifs

**Files:**
- Modify: `src/app.css` (ajouter les blocs `:root[data-theme='…']` juste APRÈS le bloc `:root`)

- [ ] **Step 1 : Insérer les 8 blocs de thème**

Dans `src/app.css`, immédiatement après la fermeture du bloc `:root { … }` (Task 1), insérer :

```css
/* ===========================================
   Thèmes alternatifs (réassignent les tokens couleur)
   =========================================== */

:root[data-theme='dracula'] {
	--theme: #282a36; --entry: rgba(255,255,255,0.04);
	--primary: #f8f8f2; --content: #d8d8d2; --secondary: #b8b9c4; --tertiary: #6272a4;
	--border: #44475a; --border-hover: #565872;
	--surface: #2f3142; --surface-border: #44475a; --surface-hover: #383a4a;
	--accent: #ff79c6; --accent-hover: #ff92d0; --accent-rgb: 255 121 198;
	--accent2: #bd93f9; --accent2-rgb: 189 147 249; --accent3: #8be9fd; --accent3-rgb: 139 233 253;
	--code-bg: rgb(98 114 164 / 0.2); --code-block-bg: #21222c;
}

:root[data-theme='catppuccin'] {
	--theme: #1e1e2e; --entry: rgba(255,255,255,0.04);
	--primary: #cdd6f4; --content: #bac2de; --secondary: #a6adc8; --tertiary: #6c7086;
	--border: #313244; --border-hover: #45475a;
	--surface: #181825; --surface-border: #313244; --surface-hover: #313244;
	--accent: #cba6f7; --accent-hover: #dabffa; --accent-rgb: 203 166 247;
	--accent2: #89b4fa; --accent2-rgb: 137 180 250; --accent3: #f5c2e7; --accent3-rgb: 245 194 231;
	--code-bg: rgb(108 112 134 / 0.2); --code-block-bg: #181825;
}

:root[data-theme='gruvbox'] {
	--theme: #282828; --entry: rgba(255,255,255,0.04);
	--primary: #fbf1c7; --content: #ebdbb2; --secondary: #d5c4a1; --tertiary: #928374;
	--border: #3c3836; --border-hover: #504945;
	--surface: #32302f; --surface-border: #3c3836; --surface-hover: #3c3836;
	--accent: #b8bb26; --accent-hover: #d2d34a; --accent-rgb: 184 187 38;
	--accent2: #fe8019; --accent2-rgb: 254 128 25; --accent3: #fabd2f; --accent3-rgb: 250 189 47;
	--code-bg: rgb(146 131 116 / 0.2); --code-block-bg: #1d2021;
}

:root[data-theme='nord'] {
	--theme: #2e3440; --entry: rgba(255,255,255,0.04);
	--primary: #eceff4; --content: #d8dee9; --secondary: #c0c8d6; --tertiary: #616e88;
	--border: #434c5e; --border-hover: #4c566a;
	--surface: #3b4252; --surface-border: #434c5e; --surface-hover: #434c5e;
	--accent: #88c0d0; --accent-hover: #9fcdda; --accent-rgb: 136 192 208;
	--accent2: #81a1c1; --accent2-rgb: 129 161 193; --accent3: #b48ead; --accent3-rgb: 180 142 173;
	--code-bg: rgb(76 86 106 / 0.4); --code-block-bg: #272c36;
}

:root[data-theme='solarized'] {
	--theme: #002b36; --entry: rgba(255,255,255,0.04);
	--primary: #eee8d5; --content: #93a1a1; --secondary: #839496; --tertiary: #586e75;
	--border: #073642; --border-hover: #586e75;
	--surface: #073642; --surface-border: #0a4453; --surface-hover: #0a4453;
	--accent: #2aa198; --accent-hover: #3cb5ac; --accent-rgb: 42 161 152;
	--accent2: #268bd2; --accent2-rgb: 38 139 210; --accent3: #b58900; --accent3-rgb: 181 137 0;
	--code-bg: rgb(88 110 117 / 0.3); --code-block-bg: #00252e;
}

:root[data-theme='light'] {
	--theme: #fdf6e3; --entry: rgba(0,0,0,0.03);
	--primary: #073642; --content: #586e75; --secondary: #657b83; --tertiary: #93a1a1;
	--border: #d6cfb8; --border-hover: #c9c1a6;
	--surface: #eee8d5; --surface-border: #d6cfb8; --surface-hover: #e3dcc8;
	--accent: #2aa198; --accent-hover: #1f8a82; --accent-rgb: 42 161 152;
	--accent2: #268bd2; --accent2-rgb: 38 139 210; --accent3: #d33682; --accent3-rgb: 211 54 130;
	--code-bg: rgb(147 161 161 / 0.2); --code-block-bg: #eee8d5;
	color-scheme: light;
}

:root[data-theme='crt'] {
	--theme: #001a08; --entry: rgba(51,255,119,0.05);
	--primary: #6fffa0; --content: #33ff77; --secondary: #2bbf63; --tertiary: #1f9f55;
	--border: #0c3a18; --border-hover: #14512a;
	--surface: #052810; --surface-border: #0c3a18; --surface-hover: #08351a;
	--accent: #33ff77; --accent-hover: #6fffa0; --accent-rgb: 51 255 119;
	--accent2: #b6ff00; --accent2-rgb: 182 255 0; --accent3: #00ffcc; --accent3-rgb: 0 255 204;
	--code-bg: rgb(31 159 85 / 0.2); --code-block-bg: #002a10;
}

:root[data-theme='amber'] {
	--theme: #160c00; --entry: rgba(255,176,0,0.05);
	--primary: #ffcf5c; --content: #ffb000; --secondary: #cc8d00; --tertiary: #9a6c00;
	--border: #3a2600; --border-hover: #4a3200;
	--surface: #241400; --surface-border: #3a2600; --surface-hover: #2e1a00;
	--accent: #ffb000; --accent-hover: #ffc94d; --accent-rgb: 255 176 0;
	--accent2: #ffe08a; --accent2-rgb: 255 224 138; --accent3: #ff7b00; --accent3-rgb: 255 123 0;
	--code-bg: rgb(154 108 0 / 0.25); --code-block-bg: #241400;
}
```

(Le thème **Slate** est le `:root` de la Task 1 ; pas de bloc séparé.)

- [ ] **Step 2 : Adapter le contraste élevé au thème clair**

Le bloc existant `:root[data-contrast='high'] { … }` force du blanc (OK pour les thèmes sombres). Ajouter juste après, pour le thème clair :

```css
:root[data-theme='light'][data-contrast='high'] {
	--primary: #000000;
	--secondary: #000000;
	--content: #000000;
	--border: #000000;
}
```

- [ ] **Step 3 : Vérifier**

Run: `npm run check`
Expected: 0 nouvelle erreur.

- [ ] **Step 4 : Commit**

```bash
git add src/app.css
git commit -m "feat: 8 thèmes terminal (dracula, catppuccin, gruvbox, nord, solarized, light, crt, amber)" --no-verify
```

---

### Task 3 : Appliquer le thème avant peinture (anti-FOUC) + défaut Slate

**Files:**
- Modify: `src/app.html`

- [ ] **Step 1 : Retirer le `data-theme` statique et ajouter le script anti-FOUC**

Dans `src/app.html` :

1. Remplacer la balise `<html lang="fr" data-theme="dark">` par `<html lang="fr" data-theme="slate">`.
2. Juste après `<head>` (avant tout `<link>`/`<meta>`), insérer :

```html
		<script>
			(function () {
				try {
					var t = localStorage.getItem('theme');
					if (t) document.documentElement.setAttribute('data-theme', t);
				} catch (e) {}
			})();
		</script>
```

3. Mettre à jour `<meta name="theme-color" content="#000000" />` → `<meta name="theme-color" content="#0d1117" />`.

- [ ] **Step 2 : Vérifier**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 3 : Commit**

```bash
git add src/app.html
git commit -m "feat: application du thème avant peinture (anti-FOUC), défaut Slate" --no-verify
```

---

### Task 4 : Sélecteur de thème + persistance + intégration nav

**Files:**
- Create: `src/lib/components/ThemeMenu.svelte`
- Delete: `src/lib/components/ThemeToggle.svelte` (ancien toggle clair/sombre, obsolète — vérifier d'abord qu'il n'est plus importé)
- Modify: `src/lib/components/Header.svelte` (insérer le `ThemeMenu` dans `.nav-actions`)

- [ ] **Step 1 : Confirmer que `ThemeToggle` n'est pas utilisé**

Run: `rg -n "ThemeToggle" src ; echo "exit:$?"`
Expected: au plus sa propre définition. S'il est importé quelque part, NE PAS le supprimer — signaler (DONE_WITH_CONCERNS) et garder le menu en plus.

- [ ] **Step 2 : Créer `src/lib/components/ThemeMenu.svelte`**

```svelte
<script lang="ts">
	import { browser } from '$app/environment';

	type Theme = { id: string; label: string };

	const THEMES: Theme[] = [
		{ id: 'slate', label: 'Slate' },
		{ id: 'dracula', label: 'Dracula' },
		{ id: 'catppuccin', label: 'Catppuccin' },
		{ id: 'gruvbox', label: 'Gruvbox' },
		{ id: 'nord', label: 'Nord' },
		{ id: 'solarized', label: 'Solarized' },
		{ id: 'light', label: 'Light' },
		{ id: 'crt', label: 'CRT vert' },
		{ id: 'amber', label: 'Amber' }
	];

	let open = $state(false);
	let current = $state(browser ? document.documentElement.getAttribute('data-theme') || 'slate' : 'slate');

	function choose(id: string) {
		current = id;
		document.documentElement.setAttribute('data-theme', id);
		try {
			localStorage.setItem('theme', id);
		} catch (e) {}
		open = false;
	}
</script>

<div class="theme-menu">
	<button
		class="theme-trigger"
		onclick={() => (open = !open)}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label="Choisir un thème"
		title="Thème"
	>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"/></svg>
	</button>

	{#if open}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<ul class="theme-list" role="listbox" tabindex="-1">
			{#each THEMES as t}
				<li>
					<button
						class="theme-option"
						class:active={current === t.id}
						role="option"
						aria-selected={current === t.id}
						onclick={() => choose(t.id)}
					>
						<span class="swatch" data-swatch={t.id}></span>
						{t.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.theme-menu { position: relative; }
	.theme-trigger {
		display: flex; align-items: center; justify-content: center;
		width: 40px; height: 40px; padding: 0; border: none; background: none;
		color: var(--secondary); cursor: pointer; border-radius: var(--radius-sm);
		transition: var(--transition);
	}
	.theme-trigger:hover { background: var(--accent-light); color: var(--accent); }
	.theme-list {
		position: absolute; top: 48px; right: 0; z-index: 60;
		margin: 0; padding: 6px; list-style: none;
		background: var(--surface); border: 1px solid var(--border);
		border-radius: var(--radius-sm); box-shadow: var(--shadow-lg);
		min-width: 180px;
	}
	.theme-option {
		display: flex; align-items: center; gap: 10px; width: 100%;
		padding: 7px 10px; border: none; background: none; cursor: pointer;
		font-family: var(--font-ui); font-size: 13px; color: var(--content);
		border-radius: var(--radius-sm); text-align: left;
	}
	.theme-option:hover { background: var(--surface-hover); color: var(--accent); }
	.theme-option.active { color: var(--accent); }
	.swatch {
		width: 14px; height: 14px; border-radius: 4px; flex-shrink: 0;
		border: 1px solid var(--border);
	}
	.swatch[data-swatch='slate'] { background: #2dd4bf; }
	.swatch[data-swatch='dracula'] { background: #ff79c6; }
	.swatch[data-swatch='catppuccin'] { background: #cba6f7; }
	.swatch[data-swatch='gruvbox'] { background: #b8bb26; }
	.swatch[data-swatch='nord'] { background: #88c0d0; }
	.swatch[data-swatch='solarized'] { background: #2aa198; }
	.swatch[data-swatch='light'] { background: #fdf6e3; }
	.swatch[data-swatch='crt'] { background: #33ff77; }
	.swatch[data-swatch='amber'] { background: #ffb000; }
</style>
```

- [ ] **Step 3 : Intégrer dans le Header**

Dans `src/lib/components/Header.svelte` :
1. Ajouter l'import en tête du `<script>` : `import ThemeMenu from './ThemeMenu.svelte';`
2. Dans le bloc `<div class="nav-actions">`, juste AVANT le bouton `a11y-toggle`, insérer : `<ThemeMenu />`

- [ ] **Step 4 : Supprimer l'ancien toggle (si non importé)**

```bash
git rm src/lib/components/ThemeToggle.svelte
```
(Si le Step 1 a montré qu'il est encore importé ailleurs, sauter cette suppression et le signaler.)

- [ ] **Step 5 : Vérifier**

Run: `npm run check`
Expected: 0 nouvelle erreur.

Run: `npm run build`
Expected: build OK.

- [ ] **Step 6 : Commit**

```bash
git add -A
git commit -m "feat: sélecteur de 9 thèmes dans la nav, persisté en localStorage" --no-verify
```

---

### Task 5 : Calmer le chrome global — retirer le fond néon animé du layout

**Files:**
- Modify: `src/routes/+layout.svelte`

Contexte : `+layout.svelte` rend un fond animé « grid-following particles » (canvas/effets néon) incompatible avec une esthétique terminal sobre.

- [ ] **Step 1 : Lire le layout et repérer l'effet de fond**

Run: `sed -n '1,60p' src/routes/+layout.svelte`
Identifier le `<canvas>` / `onMount` qui dessine les particules néon et le markup de fond associé.

- [ ] **Step 2 : Retirer l'effet de fond animé**

Supprimer du `+layout.svelte` : le `<canvas>` de fond (et son markup `aria-hidden` associé), le code `onMount` qui l'anime (les particules « grid »), et les couleurs néon codées en dur qui s'y rapportent. Conserver la structure de page (skip-link, `<Header />`, `<main>`, `<Footer />`, `AccessibilityPanel`, `ScrollProgress`) et toute logique non liée au fond. Le fond devient simplement `var(--theme)` (déjà appliqué sur `body`).

(Si le composant a une logique mélangée, procéder prudemment et signaler en DONE_WITH_CONCERNS plutôt que de casser le layout.)

- [ ] **Step 3 : Vérifier**

Run: `npm run check`
Expected: 0 nouvelle erreur (des warnings « unused CSS » liés au canvas retiré sont acceptables ; les nettoyer si triviaux).

Run: `rg -n "6, ?182, ?212|139, ?92, ?246|236, ?72, ?153|#06b6d4|#8b5cf6|#ec4899" src/routes/+layout.svelte ; echo "exit:$?"`
Expected: aucun match (exit 1).

- [ ] **Step 4 : Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat: fond terminal sobre, retrait des particules néon du layout" --no-verify
```

---

### Task 6 : Balayage couleur — convertir le néon codé en dur en tokens (composants partagés)

**Files (à convertir) :** tous les composants/pages SAUF `src/routes/+page.svelte` (home, reconstruite au Plan 3) et `src/app.css` (déjà fait). Cibles principales (issues de l'audit `rg`) :
- `src/routes/+error.svelte`
- `src/lib/components/ProjectProgress.svelte`, `ScrollProgress.svelte`, `BookNav.svelte`, `Header.svelte`, `Footer.svelte`
- `src/lib/components/tools/*.svelte` (CapaciteEquipe, SimulateurMigration, DetteRechnique, TechRadar, AuditSecurite, PriorisationBacklog, MatriceDecision, ChecklistOnboarding, MaturiteEquipe, EvaluationTechEquipe, BilanSprint, MaturiteDevLead, …)

**Mapping déterministe à appliquer** (remplacer la valeur codée en dur par le token) :

| Valeur codée en dur | Remplacer par |
|---|---|
| `#06b6d4` (cyan) | `var(--accent)` |
| `#22d3ee` (cyan clair) | `var(--accent-hover)` |
| `#8b5cf6` (violet) | `var(--accent2)` |
| `#ec4899` (rose) | `var(--accent3)` |
| `rgba(6, 182, 212, A)` | `rgb(var(--accent-rgb) / A)` |
| `rgba(139, 92, 246, A)` | `rgb(var(--accent2-rgb) / A)` *(voir note)* |
| `rgba(236, 72, 153, A)` | `rgb(var(--accent3-rgb) / A)` *(voir note)* |
| `#000` / `#000000` sur fond accent | `var(--theme)` |

NOTE accent2/accent3 RGB : `--accent2-rgb` et `--accent3-rgb` sont **déjà définis** dans tous les thèmes (Tasks 1-2). Le mapping `rgba(139,…)` → `rgb(var(--accent2-rgb) / A)` et `rgba(236,…)` → `rgb(var(--accent3-rgb) / A)` s'applique donc directement, sans préalable.

- [ ] **Step 1 : (déjà couvert) bases -rgb disponibles**

`--accent-rgb`, `--accent2-rgb`, `--accent3-rgb` existent dans tous les thèmes (Tasks 1-2). Aucune action préalable — passer directement au balayage du Step 2.

- [ ] **Step 2 : Convertir fichier par fichier selon le mapping**

Pour chaque fichier cible, appliquer le mapping ci-dessus (remplacements exacts des valeurs codées en dur). Ne change QUE des valeurs de couleur ; ne touche pas à la structure ni à la logique. Après chaque petit lot de fichiers, lancer `npm run check` pour rester vert.

- [ ] **Step 3 : Gate — plus aucun néon codé en dur hors thèmes/home**

```bash
rg -n "6, ?182, ?212|139, ?92, ?246|236, ?72, ?153|#06b6d4|#8b5cf6|#ec4899|#22d3ee" src -g '!src/routes/+page.svelte' -g '!src/app.css' ; echo "exit:$?"
```
Expected: aucun match (exit 1). (`app.css` contient encore ces valeurs uniquement dans les **swatches** de thème, c'est normal — d'où son exclusion ; idem home, traitée au Plan 3.)

- [ ] **Step 4 : Vérifier**

Run: `npm run check` puis `npm run build`
Expected: 0 nouvelle erreur ; build OK.

- [ ] **Step 5 : Commit**

```bash
git add -A
git commit -m "refactor: couleurs des composants tokenisées (suivent le thème actif)" --no-verify
```

---

### Task 7 : Vérification finale (build + thèmes + accessibilité)

**Files:** aucun (acceptation).

- [ ] **Step 1 : Check + build**

Run: `npm run check` → 0 nouvelle erreur (au-delà de l'erreur préexistante `remark-escape-svelte.js`).
Run: `npm run build` → OK.

- [ ] **Step 2 : Vérification visuelle (preview)**

Run: `npm run preview`
Vérifier à l'œil :
- Le site s'affiche en **Slate** par défaut, en monospace, sans fond néon animé.
- Le **sélecteur de thème** dans la nav change le thème immédiatement ; les 9 thèmes s'appliquent (fond, texte, accent, cartes, boutons, code).
- Recharger la page : le **thème choisi persiste** (localStorage), **sans flash** (anti-FOUC).
- Le **panneau d'accessibilité** fonctionne toujours et se **combine** au thème : taille de police, interlignage, espacement, largeur, **contraste élevé** (lisible sur thème clair ET sombre), **police dyslexie**.
- Les pages gardées (`/outils` + un outil, `/projets`, `/livres` + un chapitre, `/a-propos`, `/contact`, `/search`, page 404) sont cohérentes dans plusieurs thèmes.

- [ ] **Step 3 : Gate résidus**

```bash
rg -n "6, ?182, ?212|139, ?92, ?246|236, ?72, ?153|#06b6d4|#8b5cf6|#ec4899" src -g '!src/routes/+page.svelte' -g '!src/app.css' ; echo "exit:$?"
```
Expected: aucun match (exit 1).

- [ ] **Step 4 : Commit éventuel** (si correctifs visuels nécessaires)

```bash
git add -A
git commit -m "fix: ajustements visuels thèmes/accessibilité" --no-verify
```

---

## Fin du Plan 2

À l'issue : tout le site (hors home, reconstruite au Plan 3) parle le **langage terminal**, avec 9 thèmes persistés et l'accessibilité intacte. Prochaine étape :

- **Plan 3 — Home « fenêtre » + identité Lead Tech** : cadre fenêtre (barre de titre + sidebar arborescence + barre de statut), reconstruction de `src/routes/+page.svelte` (`$ whoami`, projets, outils, livres, contact), responsive mobile, bascule copy CTO → Lead Tech (hero, À propos, SEO, footer), réécriture complète de `CLAUDE.md`. La home utilisera les tokens/thèmes de ce Plan 2.
