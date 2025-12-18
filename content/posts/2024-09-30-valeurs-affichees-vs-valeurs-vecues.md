---
author: ["Kevin Delfour"]
title: "Valeurs affichées vs valeurs vécues : combler l'écart"
date: 2024-09-30
slug: "valeurs-affichees-vs-valeurs-vecues"
description: "Quand les valeurs affichées ne correspondent pas aux comportements réels : diagnostic et solutions."
categories: ["culture"]
series: ["Culture"]
tags: ["valeurs", "culture", "coherence", "authenticite"]
pillar: "culture-management"
pillars: ["culture-management"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Valeur affichée : "Droit à l'erreur". Réalité : première erreur, développeur blâmé publiquement. Cet écart entre valeurs affichées et comportements réels détruit la crédibilité et crée du cynisme.

Ce que j'ai observé : toutes les organisations ont cet écart. La différence entre les bonnes et les mauvaises, c'est la volonté de le reconnaître et de le réduire.

## Le faux problème

Le faux problème serait de croire qu'on peut avoir zéro écart. En réalité, l'écart existera toujours. L'enjeu est de le mesurer, le réduire, et surtout de ne pas le nier.

Un autre faux problème : penser que l'écart vient de mauvaise volonté. En réalité, il vient souvent de pressions contradictoires (urgence vs qualité, autonomie vs contrôle).

## Le vrai enjeu CTO

Le vrai enjeu est de détecter les écarts et de les combler progressivement :

**Les 5 écarts classiques** :

**Écart 1 - "Innovation" vs "Ne rien casser"** : Affiché : "On encourage l'innovation, testez des choses." Vécu : "Pourquoi tu as cassé la prod ? Tu aurais dû être plus prudent." Impact : personne n'innove, stagnation. Correction : définir sandbox innovation, feature flags, budget d'erreur explicite.

**Écart 2 - "Autonomie" vs "Tout valider"** : Affiché : "Vous êtes autonomes, décidez." Vécu : "Pourquoi tu n'as pas demandé validation avant ?" Impact : paralysie décisionnelle, attente systématique de validation. Correction : framework décision Type 1/Type 2, expliciter ce qui nécessite validation.

**Écart 3 - "Droit à l'erreur" vs "Zéro erreur acceptée"** : Affiché : "On apprend des erreurs." Vécu : erreur = blame, pas de post-mortem blameless. Impact : erreurs cachées, pas d'apprentissage. Correction : post-mortems systématiques blameless, CTO partage ses erreurs.

**Écart 4 - "Équilibre pro-perso" vs "Héros surmenés"** : Affiché : "L'équilibre est important." Vécu : héros qui font 60h/semaine sont valorisés. Impact : burn-out, turnover, culture toxique. Correction : arrêter de valoriser surmenage, mesurer heures réelles, intervenir si >45h.

**Écart 5 - "Collaboration" vs "Compétition interne"** : Affiché : "On travaille ensemble." Vécu : promo et reconnaissance sur performance individuelle uniquement. Impact : silos, rétention info, guerre d'ego. Correction : évaluation incluant collaboration, célébrer succès collectifs.

**Comment détecter les écarts** :

**Méthode 1 - Survey anonyme** : Questions simples : "Valeur X est-elle vécue au quotidien ?" échelle 1-10. Écart = différence entre importance affichée et réalité vécue.

**Méthode 2 - Observation comportements** : Pas écouter ce qui est dit, observer ce qui est fait. Qui est promu ? Qui est valorisé ? Qui est puni ? Ces comportements révèlent vraies valeurs.

**Méthode 3 - Exit interviews** : Personnes qui partent disent souvent vérité. "Pourquoi tu pars ?" révèle écarts entre promesses et réalité.

## Cadre de décision

Voici comment je réduis les écarts :

**1. Mesurer l'écart trimestriellement**
Survey : importance affichée vs réalité vécue. Score par valeur. Trend sur 12 mois. Ces données forcent lucidité.

**2. Prioriser 1-2 écarts à combler**
Pas tout régler en même temps. Choisir 1-2 écarts les plus toxiques. Focus 6 mois.

**3. Identifier comportements concrets à changer**
Pas "être plus bienveillant", mais "stop blâmer en réunion, post-mortem blameless systématique". Actions mesurables.

**4. Leadership doit incarner en premier**
CTO et managers doivent être premiers à changer comportements. Si leadership ne change pas, rien ne bouge.

**5. Communiquer transparence sur écarts**
Partager résultats survey, reconnaître écarts, annoncer actions. Cette transparence crée confiance.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**Le déni des écarts** : "Nos valeurs sont vécues." Survey montre écart massif. Leadership nie. Résultat : cynisme, turnover, culture toxique.

**La reconnaissance qui répare** : Survey révèle écart "autonomie". CEO all-hands : "Survey montre qu'on dit autonomie mais on micro-manage. Voici ce qu'on va changer." Actions concrètes. 6 mois plus tard, écart réduit 50%. Résultat : confiance restaurée.

**L'exemple du "droit à l'erreur"** : Valeur affichée mais erreur = blame. Action : CTO partage en all-hands 3 erreurs majeures faites cette année et apprentissages. Post-mortems blameless systématiques. 6 mois : culture change, erreurs discutées ouvertement.

**Le piège des indicateurs** : Afficher "équilibre" mais mesurer uniquement output. Résultat : surmenage invisible. Correction : tracker heures réelles, alerter si >45h, intervenir.

## Erreurs fréquentes

**Nier l'écart**
"Nos valeurs sont parfaitement vécues." Résultat : cynisme, personne ne croit plus aux valeurs.

**Multiplier les valeurs**
20 valeurs affichées, impossible de toutes vivre. Résultat : écarts partout, dilution totale.

**Ne pas mesurer**
Pas de survey, pas de feedback. Résultat : écarts invisibles jusqu'à crise (départs massifs).

**Changer sans actions concrètes**
"On va être plus bienveillants." Résultat : rien ne change, frustration augmente.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Mesurer dès 10 personnes**
Survey trimestriel simple sur 3-5 valeurs. Ces données révèlent écarts avant qu'ils deviennent toxiques.

**Reconnaître écarts publiquement**
All-hands : "Survey montre écart sur valeur X. Voici pourquoi, voici ce qu'on change." Cette transparence crée confiance.

**Actions comportementales concrètes**
Pour chaque écart : 3 comportements concrets à changer. Mesurables, avec timeline.

**Leadership incarner en premier**
CTO doit être premier à changer. Si je dis "droit à l'erreur" mais je blame, rien ne change. Modéliser comportements attendus.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment combler l'écart entre valeurs et comportements.

Pour approfondir, tu peux aussi consulter l'article ["Construire une culture durable"](/posts/construire-culture-technique-durable/) ou les autres contenus du pilier ["Culture & management"](/culture-management/).
