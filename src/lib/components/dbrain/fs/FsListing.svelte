<script lang="ts">
	import { ancestors, fileCount, isDirOfDirs } from '$lib/dbrain/filesystem';
	import type { FsDir } from '$lib/dbrain/filesystem';

	let { dir, onselect }: { dir: FsDir; onselect?: (id: string) => void } = $props();

	const crumbPath = $derived(
		'/' +
			ancestors(dir.id)
				.map((c) => (c.id === 'brain' ? 'brain' : c.name.replace('/', '')))
				.join('/')
	);
	const dirsView = $derived(isDirOfDirs(dir));
</script>

<section class="main" style="--c: {dir.color}">
	<div class="crumb">{crumbPath}</div>
	<header class="main-head">
		<span class="main-ico"></span>
		<h1 class="main-title">{dir.label}</h1>
		<span class="main-items">{fileCount(dir)} ITEMS</span>
	</header>
	<p class="main-desc">{dir.desc}</p>

	<div class="body">
		{#if dirsView}
			<div class="cards">
				{#each dir.children as child}
					{#if child.node === 'dir'}
						<button class="card" style="--c: {child.color}" onclick={() => onselect?.(child.id)}>
							<div class="card-top">
								<span class="card-ico"></span>
								<span class="card-count">{fileCount(child)}</span>
							</div>
							<span class="card-name">{child.name}</span>
							<span class="card-desc">{child.desc}</span>
							<span class="card-go">→ ouvrir</span>
						</button>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="listing">
				<div class="row head">
					<span class="c-name">NAME</span>
					<span class="c-type">TYPE</span>
					<span class="c-lang">LANG</span>
					<span class="c-nodes">NODES</span>
					<span class="c-status">STATUS</span>
				</div>
				<div class="rows">
					{#each dir.children as child}
						{#if child.node === 'file'}
							<a
								class="row"
								href={child.href}
								target={child.external ? '_blank' : undefined}
								rel={child.external ? 'noopener' : undefined}
							>
								<span class="c-name">
									<span class="row-ico">◈</span>
									{child.name}
									{#if child.private}<span class="badge-priv">privé</span>{/if}
								</span>
								<span class="c-type">{child.typeLabel}</span>
								<span class="c-lang">{child.lang}</span>
								<span class="c-nodes">{child.nodes}</span>
								<span class="c-status">{child.status}</span>
							</a>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.main {
		height: 100%;
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		background: rgba(8, 11, 18, 0.55);
		border-radius: 10px;
		padding: 16px 20px;
	}
	.crumb {
		font-size: 0.66rem;
		color: var(--lab-dim, #7c8ea3);
		margin-bottom: 10px;
	}
	.main-head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 8px;
	}
	.main-ico {
		position: relative;
		width: 30px;
		height: 22px;
		border: 1.6px solid var(--c, #00e5ff);
		border-radius: 0 5px 5px 5px;
		box-shadow: 0 0 12px color-mix(in srgb, var(--c, #00e5ff) 35%, transparent);
		flex-shrink: 0;
	}
	.main-ico::before {
		content: '';
		position: absolute;
		top: -7px;
		left: -1.6px;
		width: 13px;
		height: 7px;
		border: 1.6px solid var(--c, #00e5ff);
		border-bottom: none;
		border-radius: 5px 5px 0 0;
	}
	.main-title {
		font-size: 1.4rem;
		letter-spacing: 0.04em;
		margin: 0;
		color: var(--lab-fg, #eaf7ff);
	}
	.main-items {
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		color: var(--lab-dim, #7c8ea3);
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		border-radius: 999px;
		padding: 3px 10px;
	}
	.main-desc {
		font-size: 0.78rem;
		color: var(--lab-dim, #7c8ea3);
		margin: 0 0 16px;
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		/* Marge interne en haut : sans elle, le lift au survol (translateY) des
		   cartes du premier rang passe sous le bord du conteneur scrollable et
		   leur bordure haute (et le glow) se font rogner. */
		padding: 6px 6px 0 2px;
	}

	/* Vue dossiers (sous-dossiers en cartes) */
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		gap: 14px;
		align-content: start;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px 16px 14px;
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		border-radius: 10px;
		background: rgba(13, 17, 28, 0.7);
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: all 0.16s ease;
	}
	.card:hover {
		border-color: var(--c, #00e5ff);
		background: color-mix(in srgb, var(--c, #00e5ff) 12%, rgba(13, 17, 28, 0.7));
		box-shadow: 0 0 22px color-mix(in srgb, var(--c, #00e5ff) 20%, transparent);
		transform: translateY(-3px);
	}
	.card-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.card-ico {
		position: relative;
		width: 30px;
		height: 22px;
		border: 1.5px solid var(--c, #00e5ff);
		border-radius: 0 5px 5px 5px;
		box-shadow: 0 0 10px color-mix(in srgb, var(--c, #00e5ff) 30%, transparent);
	}
	.card-ico::before {
		content: '';
		position: absolute;
		top: -6px;
		left: -1.5px;
		width: 13px;
		height: 6px;
		border: 1.5px solid var(--c, #00e5ff);
		border-bottom: none;
		border-radius: 5px 5px 0 0;
	}
	.card-count {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--c, #00e5ff);
		line-height: 1;
	}
	.card-name {
		font-size: 0.92rem;
		letter-spacing: 0.04em;
		color: var(--lab-fg, #eaf7ff);
	}
	.card-desc {
		font-size: 0.68rem;
		color: var(--lab-dim, #7c8ea3);
		line-height: 1.5;
	}
	.card-go {
		font-size: 0.64rem;
		color: var(--c, #00e5ff);
		margin-top: 2px;
	}

	/* Vue fichiers (table) */
	.row {
		display: grid;
		grid-template-columns: minmax(0, 2.4fr) 0.9fr 0.9fr 0.7fr 0.9fr;
		gap: 10px;
		align-items: center;
		padding: 10px;
		font-size: 0.74rem;
	}
	.row.head {
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		color: var(--lab-dim, #7c8ea3);
		border-bottom: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		position: sticky;
		top: 0;
		background: rgba(8, 11, 18, 0.96);
	}
	a.row {
		text-decoration: none;
		color: var(--lab-fg, #eaf7ff);
		border-bottom: 1px solid rgba(124, 142, 163, 0.1);
		border-radius: 6px;
		transition: background 0.14s ease;
	}
	a.row:hover {
		text-decoration: none;
		background: color-mix(in srgb, var(--c, #00e5ff) 9%, transparent);
	}
	.c-name {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.row-ico {
		flex-shrink: 0;
		font-size: 0.68rem;
		color: var(--c, #00e5ff);
	}
	.c-type,
	.c-lang,
	.c-nodes {
		color: var(--lab-dim, #7c8ea3);
	}
	.c-nodes {
		font-variant-numeric: tabular-nums;
	}
	.c-status {
		color: var(--c, #00e5ff);
		font-size: 0.68rem;
	}
	.badge-priv {
		font-size: 0.54rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--lab-dimmer, #56697d);
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		border-radius: 4px;
		padding: 0 5px;
	}
</style>
