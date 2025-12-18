---
author: ["Kevin Delfour"]
title: "Gérer les conflits de priorités entre product et tech"
date: 2024-08-19
slug: "gerer-conflits-priorites-product-tech"
description: "Quand le CPO veut features et le CTO veut dette technique : naviguer ce conflit récurrent."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["product", "priorites", "conflit", "alignement"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"Le CPO veut 10 features ce trimestre. Moi je veux 3 sprints de dette technique. On fait comment ?" Ce conflit, c'est le quotidien de nombreux CTOs.

Ce que j'ai observé : ce conflit est structurel. Le CPO optimize pour valeur utilisateur court terme, le CTO pour capacité long terme. Les deux ont raison selon leur perspective.

## Le faux problème

Le faux problème serait de croire que l'un a tort et l'autre raison. En réalité, les deux perspectives sont légitimes. L'enjeu est de créer un cadre d'arbitrage partagé.

Un autre faux problème : penser que ce conflit révèle un dysfonctionnement. En réalité, c'est une tension saine qui force à équilibrer court et long terme.

## Le vrai enjeu CTO

Le vrai enjeu est de transformer ce conflit récurrent en processus d'arbitrage sain :

**Les 3 sources du conflit** :

**Source 1 - Horizons temporels différents** : Product pense en trimestres (roadmap, OKRs). Tech pense en années (dette cumulative, scalabilité). Resolution : rendre visible l'impact long terme des choix court terme.

**Source 2 - Métriques différentes** : Product mesure : adoption, revenue, NPS. Tech mesure : vélocité, qualité, stabilité. Resolution : créer métriques partagées (velocity sustainable, tech-enabled features).

**Source 3 - Invisibilité de la dette technique** : Product voit : "pas de valeur user visible". Tech voit : "fondations qui s'effondrent". Resolution : traduire dette en impact business mesurable.

**Le framework d'arbitrage** :

**Principe 1 - Capacité allocation partagée** : Décision conjointe CTO-CPO : 70% features, 20% tech, 10% innovation. Pas "tech vs product" mais "ensemble".

**Principe 2 - Traduction business de la dette** : Pas "on doit refactoriser", mais "dette ralentit delivery 40%, feature F attendue 8 semaines au lieu de 4". Impact business tangible.

**Principe 3 - Critères d'arbitrage explicites** : Quand conflit : Impact user (1-10) × Urgence business (1-10) × Coût tech long terme (1-10). Score par initiative.

**Principe 4 - Escalation au CEO claire** : Si désaccord après critères : escalation CEO avec données des deux côtés. Décision tranchée, pas de rancune.

## Cadre de décision

Voici comment je gère ce conflit au quotidien :

**1. Planning trimestriel conjoint**
CTO + CPO définissent ensemble allocation : X% features, Y% tech, Z% innovation. Cette co-construction évite "nous vs eux".

**2. Traduire systématiquement**
Chaque item tech doit avoir traduction business. "Refacto auth" devient "Reduce login bugs 70%, enable SSO for enterprise deals".

**3. Critères d'arbitrage documentés**
Framework visible : Impact user, Urgence, Tech cost. Scoring de chaque initiative. Priorisation objective.

**4. Review velocity mensuelle**
CTO + CPO : vélocité stable ? Si baisse, pourquoi ? Dette à adresser ? Cette revue régulière anticipe les crises.

**5. Escalation constructive**
Si désaccord : proposition des deux côtés au CEO avec données. CEO tranche. Pas de ressentiment, exécution propre.

## Retour terrain

Ce que j'ai observé dans différentes situations :

**La guerre permanente** : CTO vs CPO, chaque trimestre. "Features" vs "Tech". Aucun framework. Résultat : décisions politiques, frustration mutuelle, sous-optimisation.

**L'alignement forcé** : CEO impose "80% features, 20% tech". Pas de discussion. Résultat : dette explose, vélocité s'effondre, CTO part.

**Le partenariat qui marche** : CTO + CPO définissent ensemble 70/20/10. Chaque item tech a traduction business. Critères d'arbitrage clairs. Résultat : confiance mutuelle, arbitrages sains, meilleurs résultats.

**L'exemple concret** : Trimestre Q2. CPO veut 8 features. CTO veut 2 sprints dette. Traduction : dette ralentit delivery 35%, features Q2 prendraient 12 semaines au lieu de 8. Arbitrage : 6 features + 1 sprint dette. Q3 : vélocité remontée, 8 features livrées en 9 semaines vs 12 projetées.

## Erreurs fréquentes

**Communication en jargon tech**
"On doit refactoriser le legacy." Product ne comprend pas, refuse. Résultat : dette qui explose.

**Pas de framework d'arbitrage**
Chaque conflit est un combat politique. Résultat : épuisement mutuel, décisions suboptimales.

**Capacité tech non protégée**
Product grignote progressivement : "Juste cette feature urgente." Résultat : 0% capacité tech, dette explosive.

**Ne pas escalader**
Rester en désaccord sans remonter au CEO. Résultat : paralysie, frustration, relation détériorée.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Établir le framework dès le début**
Planning conjoint CTO-CPO avec allocation claire dès Q1. Cette fondation évite les conflicts futurs.

**Traduire systématiquement tech en business**
Chaque item tech : impact business mesurable. "Refacto module X = enable feature Y, reduce bugs 60%, velocity +25%".

**Review mensuelle vélocité**
CTO + CPO : vélocité trending ? Dette impacting ? Ajustements nécessaires ? Cette revue régulière anticipe.

**Célébrer les arbitrages réussis**
"Q2 : on a sacrifié 2 features pour dette, Q3 : vélocité +40%, 10 features livrées vs 8 projetées." Cette visibilité justifie les investments tech.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore la relation CTO-CPO avec des frameworks concrets.

Pour approfondir, tu peux aussi consulter l'article ["Dette technique"](/posts/dette-technique-cto-gestion-compromis-strategies/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
