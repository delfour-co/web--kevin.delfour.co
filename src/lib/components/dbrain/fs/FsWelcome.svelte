<script lang="ts">
	// Encart d'accueil affiché à la racine /brain : bienvenue + ce qu'on y trouve.
</script>

<section class="welcome">
	<span class="w-h">// WELCOME — kevin@delfour:~/brain</span>
	<p class="w-lead">
		Bienvenue ! Ce n'est pas un site, c'est <b>une image d'une partie de mon cerveau</b>, rangée comme un
		système de fichiers.
	</p>
	<p class="w-text">
		Tu y trouveras <b>mes projets</b> (des jeux, des applications, des libs et des outils en ligne
		de commande), <b>mes outils</b> de décision que je bricole et utilise au quotidien, <b>les
			livres</b> que j'ai écrits et mis en ligne gratuitement, <b>les conférences</b> que j'ai données
		et <b>les communautés</b> où je donne du temps. Rien à vendre, rien à prouver : juste de quoi
		explorer ce que je construis.
	</p>
	<p class="w-foot">
		Ouvre un dossier à gauche, ou une carte ci-dessous pour explorer.
	</p>
</section>

<style>
	.welcome {
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		border-radius: 10px;
		padding: 16px 20px;
		background: rgba(8, 11, 18, 0.55);
	}
	.w-h {
		display: block;
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		color: var(--lab-accent, #00e5ff);
		margin-bottom: 10px;
	}
	.w-lead {
		margin: 0 0 8px;
		font-size: 0.86rem;
		line-height: 1.6;
		color: var(--lab-fg, #eaf7ff);
	}
	.w-lead b {
		color: var(--lab-accent, #00e5ff);
		font-weight: 600;
	}
	.w-text {
		margin: 0 0 10px;
		font-size: 0.8rem;
		line-height: 1.75;
		color: var(--lab-dim, #7c8ea3);
	}
	.w-text b {
		color: var(--lab-fg, #eaf7ff);
		font-weight: 600;
	}
	.w-foot {
		margin: 0;
		font-size: 0.74rem;
		line-height: 1.6;
		color: var(--lab-dimmer, #56697d);
	}
</style>
