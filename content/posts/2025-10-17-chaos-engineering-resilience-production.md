---
author:
- Kevin Delfour
title: 'Chaos Engineering : Casser votre prod volontairement (pour la rendre incassable)'
date: 2025-10-17
description: Netflix tue des serveurs en prod tous les jours. Et si vous faisiez pareil
  ? Découvrez le Chaos Engineering pour une prod vraiment résiliente.
categories:
- developpement
series:
- Développement
tags:
- resilience
- devops
- chaos-engineering
- production
- sre
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
---
## Situation réelle

"Notre système est résilient." Vraiment ? L'avez-vous testé ? Cette situation n'est pas une fatalité. Le Chaos Engineering consiste à casser volontairement la prod pour vérifier qu'elle survit.

Ce que j'ai observé : beaucoup d'équipes croient que leur système est résilient (Redondance serveurs, Auto-scaling configuré, Health checks en place, Backups automatiques → "Le système est résilient !"). La réalité (Premier incident critique Auto-scaling ne scale pas config obsolète Health checks passent mais app bugue Backup restore jamais testé ne marche pas Cascading failure tout tombe → Downtime 4 heures Problème On ne teste résilience que pendant incidents). Chaos Engineering n'est pas destruction pour fun. C'est assurance : Tester résilience avant incidents réels, Découvrir faiblesses conditions contrôlées, Build confidence équipe système. Commencer petit : GameDay staging 1 scénario simple, Fixer ce qui casse, Répéter jusqu'à confiance, Progresser vers prod. En 6 mois : Système vraiment résilient.

## Le faux problème

Le faux problème serait de croire que le Chaos Engineering est de la destruction pour le fun. En réalité, le Chaos Engineering est de l'assurance : Tester résilience avant incidents réels, Découvrir faiblesses conditions contrôlées, Build confidence équipe système. Cette distinction est importante pour comprendre comment améliorer la résilience.

Un autre faux problème : penser qu'il faut commencer le Chaos Engineering directement en production. En réalité, la progression peut être progressive : Niveau 1 GameDays planifiés Mois 1-2 (1 GameDay/mois Scénarios simples kill 1 pod Environnement staging Équipe complète présente), Niveau 2 Chaos automatisé non-prod Mois 3-4 (Cron job chaos staging schedule "0 10 * * MON" Tous lundis 10h scenarios pod-kill network-latency), Niveau 3 Chaos automatisé prod Mois 5-6 (Chaos prod safeguards schedule "0 14 * * TUE,THU" Mardi/jeudi 14h safeguards error_rate <0.5% on_call_available true no_ongoing_incident true), Niveau 4 Continuous Chaos Mois 7+ (Chaos 24/7 prod Scenarios aléatoires Abort si SLI violated Auto-remediation Résultat Prod vraiment antifragile). Cette progression facilite l'adoption.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment tester la résilience avant les incidents réels :

**Le problème Fausse résilience** : Ce qu'on croit (Redondance serveurs, Auto-scaling configuré, Health checks en place, Backups automatiques → "Le système est résilient !"). La réalité (Premier incident critique Auto-scaling ne scale pas config obsolète Health checks passent mais app bugue Backup restore jamais testé ne marche pas Cascading failure tout tombe → Downtime 4 heures Problème On ne teste résilience que pendant incidents). Ce problème coûte cher : incidents fréquents, MTTR élevé, confiance perdue.

**Chaos Engineering principe** : Injecter failures volontaires prod prouver résilience. Les 4 piliers (1 Hypothèse "Le système survit si service X crash", 2 Expérience Tuer service X prod, 3 Mesure Observer métriques métier not just tech, 4 Learn Si ça casse fixer avant vrai incident). Netflix Simian Army (Netflix popularisé concept Chaos Monkey Tue instances EC2 random Latency Monkey Ajoute latence réseau Chaos Kong Tue région AWS entière Résultat Netflix peut perdre région entière sans impact utilisateur). Cette approche teste la résilience avant les incidents réels.

**Commencer simple GameDays** : Qu'est-ce qu'un GameDay (Exercice planifié simule incidents Format 2-3 heures Planning 30min Équipe complète réunie Scénario annoncé "On va tuer DB principale" Métriques observer définies Execution 1h Injecter failure Observer comportement système Noter surprises/bugs Debrief 1h Qu'est-ce qui a cassé Qu'est-ce qui a bien marché Actions correctives). Exemple GameDay réel (Scénario Service "Recommendations" crash 10h00 Baseline metrics curl /metrics grep recommendation_calls → 1200 req/min 0.2% errors 10h15 Kill service kubectl delete pod recommendations-xxx 10h16 Observer Erreur 500 homepage Checkout bloqué depend on reco). Cette approche simple facilite l'adoption.

**Progression simple complexe** : Niveau 1 GameDays planifiés Mois 1-2 (1 GameDay/mois Scénarios simples kill 1 pod Environnement staging Équipe complète présente). Niveau 2 Chaos automatisé non-prod Mois 3-4 (Cron job chaos staging schedule "0 10 * * MON" Tous lundis 10h scenarios pod-kill network-latency). Niveau 3 Chaos automatisé prod Mois 5-6 (Chaos prod safeguards schedule "0 14 * * TUE,THU" Mardi/jeudi 14h safeguards error_rate <0.5% on_call_available true no_ongoing_incident true). Niveau 4 Continuous Chaos Mois 7+ (Chaos 24/7 prod Scenarios aléatoires Abort si SLI violated Auto-remediation Résultat Prod vraiment antifragile). Cette progression facilite l'adoption.

## Cadre de décision

Voici les principes qui m'ont aidé à tester la résilience avant les incidents réels :

**1. Chaos Engineering principe plutôt que supposer résilience**  
Injecter failures volontaires prod prouver résilience plutôt que supposer résilience sans tester. Les 4 piliers (1 Hypothèse "Le système survit si service X crash", 2 Expérience Tuer service X prod, 3 Mesure Observer métriques métier not just tech, 4 Learn Si ça casse fixer avant vrai incident). Netflix Simian Army (Chaos Monkey Tue instances EC2 random Latency Monkey Ajoute latence réseau Chaos Kong Tue région AWS entière Résultat Netflix peut perdre région entière sans impact utilisateur). Cette approche teste la résilience avant les incidents réels.

**2. Commencer simple GameDays plutôt que chaos automatisé prod**  
Qu'est-ce qu'un GameDay (Exercice planifié simule incidents Format 2-3 heures Planning 30min Équipe complète réunie Scénario annoncé Métriques observer définies Execution 1h Injecter failure Observer comportement système Noter surprises/bugs Debrief 1h Qu'est-ce qui a cassé Qu'est-ce qui a bien marché Actions correctives). Exemple GameDay réel (Scénario Service "Recommendations" crash Baseline metrics Kill service Observer Erreur 500 homepage Checkout bloqué). Cette approche simple facilite l'adoption plutôt que chaos automatisé prod dès début.

**3. Progression simple complexe plutôt que Big Bang**  
Niveau 1 GameDays planifiés Mois 1-2 (1 GameDay/mois Scénarios simples kill 1 pod Environnement staging Équipe complète présente). Niveau 2 Chaos automatisé non-prod Mois 3-4 (Cron job chaos staging schedule "0 10 * * MON" scenarios pod-kill network-latency). Niveau 3 Chaos automatisé prod Mois 5-6 (Chaos prod safeguards schedule "0 14 * * TUE,THU" safeguards error_rate <0.5% on_call_available true no_ongoing_incident true). Niveau 4 Continuous Chaos Mois 7+ (Chaos 24/7 prod Scenarios aléatoires Abort si SLI violated Auto-remediation Résultat Prod vraiment antifragile). Cette progression facilite l'adoption.

**4. Scénarios chaos progressifs**  
Scénarios simples (Pod Kill kubectl delete pod service-xxx Observer Timeouts configurés Circuit breakers activés UX dégradée gracefully, Network Latency Ajouter latence 200ms Observer Timeouts configurés Circuit breakers activés UX dégradée gracefully, Database Failure Killer DB primary kubectl delete pod postgres-primary Observer Failover automatique Readonly mode activé Queues temporaires, Dependency Failure Service externe down Stripe SendGrid Mock 500 errors Observer Circuit breaker Retry logic Fallback, Resource Exhaustion CPU stress StressChaos workers 4 load 100). Ces scénarios progressifs testent différents aspects résilience.

**5. Mesurer impact réel**  
Cas réel migration (Situation initiale 0 Chaos Engineering 4-5 incidents/mois MTTR 2-3 heures "On hope it works", Après 6 mois Chaos Mois 1-2 GameDays staging Découvert 12 single points of failure Fixé 8/12 Mois 3-4 Chaos auto staging Découvert Circuit breakers mal configurés Découvert Timeouts trop longs 30s Mois 5-6 Chaos auto prod Premier GameDay prod checkout cassé Fixé avant incident réel Résultats 6 mois Incidents 4/mois → 0.5/mois -87% MTTR 2h → 15min -87% Confidence 3/10 → 9/10). Ces métriques montrent l'impact réel.

## Retour terrain

Ce que j'ai observé dans différents systèmes :

**Ce qui fonctionne** : Chaos Engineering principe (Injecter failures volontaires prod prouver résilience Les 4 piliers Hypothèse Expérience Mesure Learn Netflix Simian Army Chaos Monkey Latency Monkey Chaos Kong Résultat Netflix peut perdre région entière sans impact utilisateur) teste résilience avant incidents réels. Commencer simple GameDays (Exercice planifié simule incidents Format 2-3 heures Planning Execution Debrief Exemple GameDay réel Scénario Service "Recommendations" crash Baseline metrics Kill service Observer Erreur 500 homepage Checkout bloqué) facilite adoption. Progression simple complexe (Niveau 1 GameDays planifiés Mois 1-2, Niveau 2 Chaos automatisé non-prod Mois 3-4, Niveau 3 Chaos automatisé prod Mois 5-6, Niveau 4 Continuous Chaos Mois 7+ Résultat Prod vraiment antifragile) facilite adoption.

**Ce qui bloque** : Supposer résilience sans tester (Redondance serveurs Auto-scaling configuré Health checks en place Backups automatiques → "Le système est résilient !"). Résultat : Premier incident critique Auto-scaling ne scale pas config obsolète Health checks passent mais app bugue Backup restore jamais testé ne marche pas Cascading failure tout tombe Downtime 4 heures. Mieux vaut Chaos Engineering principe (Injecter failures volontaires prod prouver résilience Les 4 piliers Hypothèse Expérience Mesure Learn) teste résilience avant incidents réels. Chaos automatisé prod dès début (Chaos 24/7 prod dès début sans safeguards). Résultat : incidents fréquents, équipe stressée, confiance perdue. Mieux vaut progression simple complexe (Niveau 1 GameDays planifiés Mois 1-2, Niveau 2 Chaos automatisé non-prod Mois 3-4, Niveau 3 Chaos automatisé prod Mois 5-6 safeguards, Niveau 4 Continuous Chaos Mois 7+).

**Cas réel migration** : Situation initiale (0 Chaos Engineering 4-5 incidents/mois MTTR 2-3 heures "On hope it works"). Après 6 mois Chaos (Mois 1-2 GameDays staging Découvert 12 single points of failure Fixé 8/12, Mois 3-4 Chaos auto staging Découvert Circuit breakers mal configurés Découvert Timeouts trop longs 30s, Mois 5-6 Chaos auto prod Premier GameDay prod checkout cassé Fixé avant incident réel, Résultats 6 mois Incidents 4/mois → 0.5/mois -87% MTTR 2h → 15min -87% Confidence 3/10 → 9/10). Ce cas montre l'impact réel du Chaos Engineering.

## Erreurs fréquentes

**Supposer résilience sans tester**  
Redondance serveurs Auto-scaling configuré Health checks en place Backups automatiques → "Le système est résilient !". Résultat : Premier incident critique Auto-scaling ne scale pas config obsolète Health checks passent mais app bugue Backup restore jamais testé ne marche pas Cascading failure tout tombe Downtime 4 heures. Mieux vaut Chaos Engineering principe (Injecter failures volontaires prod prouver résilience Les 4 piliers Hypothèse Expérience Mesure Learn) teste résilience avant incidents réels.

**Chaos automatisé prod dès début**  
Chaos 24/7 prod dès début sans safeguards. Résultat : incidents fréquents, équipe stressée, confiance perdue. Mieux vaut progression simple complexe (Niveau 1 GameDays planifiés Mois 1-2, Niveau 2 Chaos automatisé non-prod Mois 3-4, Niveau 3 Chaos automatisé prod Mois 5-6 safeguards, Niveau 4 Continuous Chaos Mois 7+).

**Pas de safeguards chaos prod**  
Chaos prod sans safeguards error_rate on_call_available no_ongoing_incident. Résultat : incidents fréquents, équipe stressée. Mieux vaut safeguards (error_rate <0.5% on_call_available true no_ongoing_incident true) réduit risques.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Commencer simple GameDays systématiquement**  
Plutôt que supposer résilience sans tester, commencer simple GameDays systématiquement (Exercice planifié simule incidents Format 2-3 heures Planning Execution Debrief Exemple GameDay réel Scénario Service "Recommendations" crash Baseline metrics Kill service Observer). Cette approche simple facilite l'adoption.

**Mettre en place progression simple complexe dès le début**  
Plutôt que chaos automatisé prod dès début, mettre en place progression simple complexe dès le début (Niveau 1 GameDays planifiés Mois 1-2, Niveau 2 Chaos automatisé non-prod Mois 3-4, Niveau 3 Chaos automatisé prod Mois 5-6 safeguards, Niveau 4 Continuous Chaos Mois 7+). Cette progression facilite l'adoption.

**Mettre en place safeguards chaos prod dès le début**  
Plutôt que chaos prod sans safeguards, mettre en place safeguards chaos prod dès le début (error_rate <0.5% on_call_available true no_ongoing_incident true). Ces safeguards réduisent les risques.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
