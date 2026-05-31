<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/labs/lab.css';
	import { getDir } from '$lib/dbrain/filesystem';
	import FsTree from '$lib/components/dbrain/fs/FsTree.svelte';
	import FsWelcome from '$lib/components/dbrain/fs/FsWelcome.svelte';
	import FsListing from '$lib/components/dbrain/fs/FsListing.svelte';
	import CognitiveCore from '$lib/components/dbrain/fs/CognitiveCore.svelte';
	import CoreStatus from '$lib/components/dbrain/fs/CoreStatus.svelte';
	import Observations from '$lib/components/dbrain/fs/Observations.svelte';
	import QuickAccess from '$lib/components/dbrain/fs/QuickAccess.svelte';
	import CommandBar from '$lib/components/dbrain/fs/CommandBar.svelte';

	// Sélection par défaut : la racine /brain (cube idle).
	let selectedId = $state('brain');
	const active = $derived(getDir(selectedId));
	const select = (id: string) => (selectedId = id);

	let clock = $state('--:--:--');
	onMount(() => {
		const tick = () => (clock = new Date().toLocaleTimeString('fr-FR'));
		tick();
		const t = setInterval(tick, 1000);
		return () => clearInterval(t);
	});
</script>

<svelte:head>
	<title>D-Brain OS — Cognitive Filesystem</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="lab" style="--lab-accent: {active.color}">
	<header class="lab-bar fs-bar">
		<a class="lab-brand" href="/labs">D-BRAIN&nbsp;OS</a>
		<span class="fs-sub">cognitive filesystem</span>
		<span class="fs-ver">v2.0</span>
		<span class="fs-center">COGNITIVE CORE <i style="background: {active.color}"></i> ONLINE</span>
		<span class="fs-user">USER <b>KEVIN</b></span>
		<span class="fs-clock">{clock}</span>
	</header>

	<div class="fs">
		<FsTree {selectedId} onselect={select} />
		<div class="center">
			{#if selectedId === 'brain'}<FsWelcome />{/if}
			<div class="center-list"><FsListing dir={active} onselect={select} /></div>
		</div>
		<aside class="corecol">
			<CognitiveCore activity={active.activity} color={active.color} />
			<CoreStatus dir={active} />
			<Observations dir={active} />
			<QuickAccess />
		</aside>
	</div>

	<CommandBar {selectedId} onselect={select} />
</div>

<style>
	.fs-bar {
		gap: 14px;
	}
	.fs-sub {
		color: var(--lab-dim);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.fs-ver {
		font-size: 0.58rem;
		color: var(--lab-accent);
		border: 1px solid var(--lab-line);
		border-radius: 4px;
		padding: 1px 6px;
	}
	.fs-center {
		margin: 0 auto;
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		color: var(--lab-dim);
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.fs-center i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		box-shadow: 0 0 8px currentColor;
	}
	.fs-user {
		font-size: 0.64rem;
		color: var(--lab-dim);
		letter-spacing: 0.08em;
	}
	.fs-user b {
		color: var(--lab-fg);
	}
	.fs-clock {
		font-size: 0.7rem;
		color: var(--lab-fg);
		font-variant-numeric: tabular-nums;
	}

	.fs {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: 268px minmax(0, 1fr) 312px;
		gap: 12px;
		padding: 12px;
	}

	.center {
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.center-list {
		flex: 1;
		min-height: 0;
	}

	.corecol {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-height: 0;
		overflow-y: auto;
		padding-right: 4px;
	}

	@media (max-width: 1100px) {
		.fs {
			grid-template-columns: 230px minmax(0, 1fr);
		}
		.corecol {
			display: none;
		}
	}
	@media (max-width: 720px) {
		.fs {
			grid-template-columns: 1fr;
		}
		.fs-center,
		.fs-user,
		.fs-clock {
			display: none;
		}
	}
</style>
