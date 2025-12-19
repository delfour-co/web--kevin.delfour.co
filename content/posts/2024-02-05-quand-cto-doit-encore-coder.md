---
author: ["Kevin Delfour"]
title: "Quand le CTO doit-il encore coder ?"
date: 2024-02-05
slug: "quand-cto-doit-encore-coder"
description: "Entre abandon total et micro-management technique : trouver le bon équilibre pour coder en tant que CTO."
categories: ["leadership"]
series: ["CTO"]
tags: ["cto", "code", "leadership", "posture"]
pillar: "le-role-du-cto"
pillars: ["le-role-du-cto"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"Tu codes encore ?" Cette question revient régulièrement quand je dis que je consacre environ 10 à 15% de mon temps au code. Elle traduit deux visions opposées : ceux qui pensent qu'un CTO ne doit plus coder du tout, et ceux qui pensent qu'il doit rester le meilleur développeur de l'équipe.

Ce que j'ai observé : ni l'un ni l'autre n'est vrai. Un CTO qui ne code jamais perd progressivement sa crédibilité technique et sa capacité à évaluer les décisions. Un CTO qui code trop devient un bottleneck et néglige ses responsabilités stratégiques.

## Le faux problème

Le faux problème serait de se demander "combien de temps je dois coder ?" Le vrai sujet est "pourquoi je code et dans quel contexte ?"

Un autre faux problème : croire qu'on peut garder le même niveau technique qu'en tant que développeur à temps plein. Accepter qu'on ne sera plus le meilleur codeur de l'équipe n'est pas un échec, c'est une réalité du rôle.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre quand coder apporte de la valeur et quand cela nuit au rôle :

**Coder pour comprendre, pas pour livrer** : Le code que j'écris en tant que CTO n'a pas vocation à aller en production tel quel. Il sert à comprendre la complexité réelle, tester une hypothèse technique, prototyper une solution avant de la déléguer.

**Coder pour maintenir la crédibilité** : Une équipe technique suit rarement un CTO qui ne comprend plus le code. Maintenir un niveau minimum permet de lire les PRs importantes, de comprendre les débats techniques, de garder de la crédibilité dans les arbitrages.

**Ne pas coder sur le chemin critique** : Dès que mon code devient bloquant pour l'équipe (features en production, reviews critiques, hotfixes urgents), je deviens un bottleneck. Mon rôle est de multiplier l'impact de l'équipe, pas d'ajouter ma propre vélocité.

**Le risque du code-refuge** : Quand le rôle devient difficile (conflits, décisions complexes, pression du board), la tentation est forte de retourner au code. C'est confortable, prévisible, et donne une satisfaction immédiate. Mais c'est une fuite, pas une contribution.

## Cadre de décision

Voici les situations où je code et celles où je m'abstiens :

**1. Quand je code (10-15% du temps)**
- Prototypage de nouvelles idées techniques pour valider la faisabilité
- Spike technique pour comprendre la complexité réelle avant de planifier
- Code reviews des PRs structurantes (architecture, sécurité, performance)
- Pair programming ponctuel avec des juniors pour transmettre
- Scripts d'automatisation ou outils internes qui facilitent le travail de l'équipe

**2. Quand je ne code pas**
- Features produit en production (sauf urgence critique)
- Refactoring de code existant (c'est le rôle de l'équipe)
- Hotfixes (sauf si personne d'autre n'est disponible)
- Toute tâche qui crée une dépendance à moi
- Tout code où je serais meilleur que l'équipe (signe que je dois recruter ou former)

**3. Le test de la bonne raison**
Avant de coder, je me demande : est-ce que je fais ça parce que c'est la meilleure utilisation de mon temps, ou parce que c'est plus confortable que mes vraies responsabilités ? Si c'est la deuxième raison, je ne code pas.

**4. Accepter d'être plus lent**
Quand je code, j'accepte d'être moins rapide qu'avant. Mon contexte change constamment (réunions, interruptions), je n'ai plus la même pratique quotidienne. Cette acceptation évite la frustration.

**5. Documenter mon code différemment**
Le code que j'écris doit être particulièrement bien documenté car je ne serai pas là pour l'expliquer. Si mon prototype devient un MVP, quelqu'un d'autre devra le reprendre et le maintenir.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**Le CTO qui code trop (40-50%)** : Livr des features, fait les code reviews critiques, intervient sur les hotfixes. **Résultat:**  l'équipe attend ses reviews, les décisions stratégiques sont retardées, le CTO est épuisé, et l'organisation dépend de lui. C'est un excellent développeur qui fait mal son travail de CTO.

**Le CTO qui ne code jamais** : Perd progressivement sa crédibilité. Les débats techniques deviennent opaques, les estimations incompréhensibles, les décisions déconnectées de la réalité du terrain. L'équipe contourne ses arbitrages ou les applique sans conviction.

**L'équilibre observable (10-20%)** : Code pour comprendre et prototyper, mais ne livre pas en production. Maintient sa crédibilité technique sans devenir un bottleneck. L'équipe respecte ses arbitrages techniques parce qu'ils sont informés.

**La transition difficile** : Passer de 80% de code à 15% est douloureux. La satisfaction immédiate du code qui fonctionne est remplacée par l'impact indirect et différé des décisions stratégiques. Cette transition prend 6 à 12 mois.

## Erreurs fréquentes

**Coder pour se sentir utile**
Retourner au code parce que les responsabilités stratégiques sont inconfortables ou donnent des résultats trop différés. **Résultat:**  négligence des vraies responsabilités du rôle.

**Devenir le bottleneck technique**
Coder sur des features critiques ou faire les code reviews importantes. **Résultat:**  l'équipe attend, la vélocité ralentit, la dépendance au CTO augmente.

**Vouloir rester le meilleur**
Refuser d'accepter que d'autres membres de l'équipe soient devenus meilleurs dans certains domaines. **Résultat:**  micro-management, frustration, perte de crédibilité.

**Ne jamais coder**
Perdre complètement le contact avec la réalité technique. **Résultat:**  décisions déconnectées, perte de crédibilité, incompréhension des débats de l'équipe.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Définir explicitement mes règles de code**
Communiquer clairement à l'équipe dans quels contextes je code et dans lesquels je m'abstiens. Cette transparence évite la confusion et les attentes décalées.

**Bloquer du temps protégé pour le code**
Plutôt que de coder de manière opportuniste, bloquer 2-3h par semaine dédiées au prototypage ou à la veille technique. Ce temps protégé évite que le code devienne une fuite.

**Pair programmer plutôt que coder seul**
Utiliser mon temps de code pour pair programmer avec des juniors ou sur des sujets complexes. Cette approche combine transmission et maintien de compétence technique.

**Accepter plus tôt la perte de vitesse**
Arrêter de me comparer à ma vitesse de développement d'il y a 5 ans. Mon contexte a changé, mon rôle a changé, c'est normal d'être plus lent.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment différents CTOs gèrent leur relation au code selon leur contexte organisationnel.

Pour approfondir, tu peux aussi consulter l'article ["Pourquoi le CTO n'est pas le meilleur développeur"](/posts/cto-pas-meilleur-developpeur/) ou les autres contenus du pilier ["Le rôle du CTO"](/le-role-du-cto/).
