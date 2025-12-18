---
author: ["Kevin Delfour"]
title: "Dette technique : investir maintenant ou plus tard ?"
date: 2024-08-05
slug: "dette-technique-investir-maintenant-ou-plus-tard"
description: "Quand rembourser la dette technique : timing et stratégies selon le contexte."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["dette-technique", "refactoring", "strategie", "timing"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"On a 3 mois de dette technique accumulée. On la rembourse maintenant ou on continue à livrer des features ?" Cette question revient constamment, et la réponse change selon le contexte.

Ce que j'ai observé : il n'y a pas de bon moment universel pour rembourser la dette. Mais il y a des signaux qui indiquent qu'il est temps d'investir.

## Le faux problème

Le faux problème serait de croire qu'on peut toujours reporter. En réalité, la dette technique croît de manière exponentielle. Reporter trop longtemps mène à la paralysie.

Un autre faux problème : penser qu'il faut tout rembourser avant de reprendre les features. En réalité, l'approche incrémentale (20% capacité continue) est plus efficace que les big bang rewrites.

## Le vrai enjeu CTO

Le vrai enjeu est de reconnaître les signaux qui indiquent qu'il est temps d'investir :

**Les 5 signaux d'alarme** :

**Signal 1 - Vélocité en chute** : Observation : temps moyen feature ×2 vs il y a 6 mois, estimations constamment dépassées. Seuil critique : vélocité -30% sur 2 sprints. Action : investir 30-40% capacité sur dette pendant 2-3 sprints.

**Signal 2 - Bugs et incidents récurrents** : Observation : même types de bugs reviennent, incidents production fréquents. Seuil critique : >2 incidents/mois, bug rate +50%. Action : sprint dédié stabilité + refonte zones fragiles.

**Signal 3 - Difficulté à onboarder** : Observation : nouveaux devs prennent 3+ mois pour être autonomes, code "legacy" incompréhensible. Seuil critique : temps onboarding ×2 vs objectif. Action : documentation + refonte modules critiques.

**Signal 4 - Résistance à développer** : Observation : équipe évite certaines zones, features contournent des modules "legacy". Seuil critique : >20% codebase "no-go zones". Action : refonte progressive zones critiques.

**Signal 5 - Turnover technique** : Observation : devs seniors partent en citant "tech stack obsolète" ou "dette ingérable". Seuil critique : >2 départs en 6 mois pour raisons techniques. Action : plan remboursement agressif + communication transparente.

**Les 3 stratégies de remboursement** :

**Stratégie 1 - Continuous (20%)** : Contexte : dette modérée, vélocité acceptable. Approche : 20% capacité sprint dédiée dette. Timing : permanent. Avantages : pas de disruption business, amélioration continue.

**Stratégie 2 - Sprint dédié (100%)** : Contexte : dette critique localisée, incident récurrent. Approche : 1-2 sprints 100% dette sur zone spécifique. Timing : entre releases ou après incidents. Avantages : focus, résultats visibles.

**Stratégie 3 - Strangler Fig (50%)** : Contexte : dette massive, refonte nécessaire. Approche : 50% capacité pendant 3-6 mois, remplacer progressivement. Timing : quand dette bloque croissance. Avantages : pas de big bang, livraison continue possible.

## Cadre de décision

Voici comment je décide quand et comment investir :

**1. Mesurer la dette régulièrement**
Métriques : cyclomatic complexity, test coverage, duplication, dependency freshness. Dashboard mensuel pour voir tendances.

**2. Matrice Impact × Effort**
Pour chaque zone de dette : Impact business (vélocité, bugs, risque) vs Effort remboursement. Prioriser high impact + low effort d'abord.

**3. Règle 70/20/10**
70% capacité features, 20% dette technique, 10% innovation/R&D. Ajuster selon contexte mais rester proche.

**4. Communiquer le plan business**
Pas "on doit refactoriser", mais "dette ralentit delivery 40%, 2 sprints remboursement = retour vélocité normale, ROI 6 mois".

**5. Mesurer l'impact du remboursement**
Avant/après : vélocité, bug rate, satisfaction équipe. Ces données justifient les futurs investissements.

## Retour terrain

Ce que j'ai observé dans différentes situations :

**Reporter indéfiniment** : "Pas maintenant, après la release." 18 mois plus tard : vélocité divisée par 3, refonte forcée, 9 mois perdus, coût ×10.

**Le sprint dédié qui sauve** : Vélocité en chute, bugs récurrents. 2 sprints 100% dette sur modules critiques. Résultat : vélocité +60%, bug rate -70%, équipe remotivée.

**L'approche continue** : 20% capacité permanente sur dette. 12 mois plus tard : vélocité stable, code quality en amélioration continue, zéro refonte nécessaire.

**La communication business qui convainc** : "Dette ralentit delivery 50%. Investment 3 sprints = ROI 6 mois." CEO convaincu, budget obtenu, résultats mesurés et communiqués.

## Erreurs fréquentes

**Reporter jusqu'à la crise**
"Après cette release." La release suivante : "après celle-là aussi." Résultat : dette qui explose, refonte forcée, coût ×10.

**Big bang rewrite**
"On refait tout proprement pendant 9 mois." Résultat : taux échec 80%, business frustré, souvent abandon.

**Rembourser sans mesurer**
Investir dans la dette sans mesurer l'impact. Résultat : impossible de justifier futurs investissements, perte de crédibilité.

**Ne pas communiquer en termes business**
"Code plus clean." Le CEO s'en fout. Mieux : "Vélocité +40%, moins de bugs, ROI 6 mois."

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Mesurer la dette dès le début**
Métriques automatisées (SonarQube, CodeClimate) depuis J1. Voir les tendances avant que ça devienne critique.

**Allouer 20% dès 10 personnes**
Ne pas attendre la crise. 20% capacité permanente sur dette dès que l'équipe grandit.

**Communiquer mensuellement**
Dashboard dette technique au comex mensuel. Montrer tendances, expliquer investissements, mesurer ROI. Cette transparence facilite les budgets.

**Documenter ROI remboursements**
Chaque investment dette : mesurer avant/après. "Sprint dette modules X : vélocité +35%, bugs -60%." Ces données justifient futurs investissements.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore différentes stratégies de gestion de dette technique avec cas réels.

Pour approfondir, tu peux aussi consulter l'article ["Dette technique : gérer sans bloquer"](/posts/dette-technique-cto-gestion-compromis-strategies/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
