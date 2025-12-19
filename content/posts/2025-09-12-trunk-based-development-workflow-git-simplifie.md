---
author:
- Kevin Delfour
title: 'Trunk-Based Development : Simplifier votre workflow Git sans sacrifier la
  qualité'
date: 2025-09-12
description: Git Flow est trop complexe ? Feature branches interminables ? Découvrez
  le Trunk-Based Development et pourquoi Google, Facebook et Netflix l'utilisent.
categories:
- developpement
series:
- Développement
tags:
- git
- devops
- productivite
- ci-cd
- developpement
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

Vous en avez marre des merge conflicts monstres ? Des feature branches qui durent 3 semaines ? Des hotfixes qui cassent tout ? Cette situation n'est pas une fatalité. Il existe une alternative plus simple : le Trunk-Based Development.

Ce que j'ai observé : beaucoup d'équipes utilisent Git Flow qui ne scale pas. Problèmes réels (Merge hell plus branche vit plus conflicts difficiles, Integration tardive on découvre bugs fin, Complexité develop release hotfix feature 4 types branches, Slow feedback PR mergée après plusieurs jours). Chez un client (Feature branch moyenne 8.5 jours, Merge conflicts 40% PRs, Time to production 2-3 semaines). Trunk-Based Development n'est pas magique, mais les bénéfices sont réels : merge conflicts drastiquement réduits, time to production divisé par 10, qualité améliorée, équipe plus heureuse.

## Le faux problème

Le faux problème serait de croire que Trunk-Based Development est dangereux ("On va casser la prod !"). En réalité, Trunk-Based Development n'est pas dangereux si vous avez : tests automatisés solides, CI qui bloque si tests fail, feature flags, monitoring proactif. Les géants tech le font (Google 25,000 engineers 1 trunk, Facebook commits toutes 15min, Netflix Amazon etc.).

Un autre faux problème : penser qu'il faut choisir entre Git Flow et Trunk-Based Development. En réalité, la migration peut être progressive : Phase 1 Réduire durée vie branches (Avant Feature branch 8 jours, Objectif Semaine 1-2 Max 5 jours Semaine 3-4 Max 3 jours Semaine 5-6 Max 2 jours Semaine 7+ Max 1 jour), Phase 2 Short-lived branches, Phase 3 Trunk-Based pur. Cette approche progressive facilite l'adoption.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment simplifier le workflow Git sans sacrifier la qualité :

**Le problème avec Git Flow** : Git Flow standard qui ne scale pas (master merge merge, develop merge merge, feature/123). Problèmes réels (Merge hell plus branche vit plus conflicts difficiles, Integration tardive on découvre bugs fin, Complexité develop release hotfix feature 4 types branches, Slow feedback PR mergée après plusieurs jours). Chez un client (Feature branch moyenne 8.5 jours, Merge conflicts 40% PRs, Time to production 2-3 semaines). Ce workflow complexe coûte cher : merge conflicts fréquents, intégration tardive, feedback lent.

**Trunk-Based Development solution** : Principe simple (Tout le monde commit sur même branche trunk/main plusieurs fois par jour). Règles (Commits fréquents plusieurs fois/jour, Petits changements <400 lignes, CI/CD obligatoire, Feature flags pour code incomplet). "Mais c'est dangereux !" Objection "On va casser prod !" Réponse pas si vous avez tests automatisés solides CI bloque si tests fail feature flags monitoring proactif. Les géants tech le font (Google 25,000 engineers 1 trunk, Facebook commits toutes 15min, Netflix Amazon etc.).

**Migration approche progressive** : Phase 1 Réduire durée vie branches (Avant Feature branch 8 jours, Objectif Semaine 1-2 Max 5 jours Semaine 3-4 Max 3 jours Semaine 5-6 Max 2 jours Semaine 7+ Max 1 jour, Comment découper features petites tâches review quotidiennes obligatoires alerte automatique si branch >2 jours). Phase 2 Short-lived branches. Phase 3 Trunk-Based pur. Cette approche progressive facilite l'adoption.

**CI/CD configuration requise** : Pipeline exemple (Tests rapides d'abord fail fast Lint Unit tests Integration tests Build Security Deploy staging si main Deploy prod feature flags, Durée <10 minutes objectif <5min). Protection branch main (GitHub branch protection required_status_checks strict true contexts test lint security-scan required_reviews required_approving_review_count 1 dismiss_stale_reviews true enforce_admins true allow_force_pushes false). Cette configuration protège la branche main sans bloquer le workflow.

## Cadre de décision

Voici les principes qui m'ont aidé à simplifier le workflow Git :

**1. Trunk-Based Development plutôt que Git Flow**  
Principe simple (Tout le monde commit sur même branche trunk/main plusieurs fois par jour). Règles (Commits fréquents plusieurs fois/jour, Petits changements <400 lignes, CI/CD obligatoire, Feature flags pour code incomplet). Cette approche simplifie le workflow et réduit les merge conflicts.

**2. Migration progressive plutôt que Big Bang**  
Phase 1 Réduire durée vie branches (Avant Feature branch 8 jours, Objectif Semaine 1-2 Max 5 jours Semaine 3-4 Max 3 jours Semaine 5-6 Max 2 jours Semaine 7+ Max 1 jour, Comment découper features petites tâches review quotidiennes obligatoires alerte automatique si branch >2 jours). Phase 2 Short-lived branches. Phase 3 Trunk-Based pur. Cette approche progressive facilite l'adoption.

**3. CI/CD configuration requise**  
Pipeline exemple (Tests rapides d'abord fail fast Lint Unit tests Integration tests Build Security Deploy staging si main Deploy prod feature flags, Durée <10 minutes objectif <5min). Protection branch main (GitHub branch protection required_status_checks strict true contexts test lint security-scan required_reviews required_approving_review_count 1 dismiss_stale_reviews true enforce_admins true allow_force_pushes false). Cette configuration protège la branche main sans bloquer le workflow.

**4. Code Review adapter process**  
Review rapides obligatoires (Avant Git Flow Feature complète à review 500-1000 lignes Review lendemain 3-4 aller-retours, Après Trunk-Based Petit changement <400 lignes Review dans l'heure 1-2 aller-retours max). Process review optimisé (09h00 Dev1 crée PR 150 lignes, 09h30 Dev2 review 15min, 09h45 Dev1 corrige commentaires, 10h00 Merge + Deploy staging, 10h15 Tests smoke OK, 10h30 Deploy production feature flag 5%, Temps total 1h30 au lieu 2 jours). Cette adaptation accélère le feedback sans sacrifier la qualité.

**5. Feature flags pour code incomplet**  
Feature flags si code incomplet plutôt que code incomplet pushé sans flag. Outils recommandés (Unleash Open Source Self-hosted, LaunchDarkly SaaS Enterprise, Flagsmith Hybrid Flexible). Cette approche permet de déployer du code incomplet sans casser la production.

## Retour terrain

Ce que j'ai observé dans différentes équipes :

**Ce qui fonctionne** : Trunk-Based Development (Principe simple tout le monde commit sur même branche trunk/main plusieurs fois par jour, Règles commits fréquents petits changements <400 lignes CI/CD obligatoire feature flags code incomplet) simplifie workflow réduit merge conflicts. Migration progressive (Phase 1 Réduire durée vie branches, Phase 2 Short-lived branches, Phase 3 Trunk-Based pur) facilite adoption. CI/CD configuration requise (Pipeline exemple tests rapides fail fast durée <10 minutes objectif <5min, Protection branch main required_status_checks required_reviews enforce_admins allow_force_pushes false) protège branche main sans bloquer workflow. Code Review adapter process (Review rapides obligatoires petit changement <400 lignes review dans l'heure 1-2 aller-retours max, Process review optimisé temps total 1h30 au lieu 2 jours) accélère feedback sans sacrifier qualité.

**Ce qui bloque** : Git Flow standard qui ne scale pas (Merge hell plus branche vit plus conflicts difficiles, Integration tardive on découvre bugs fin, Complexité develop release hotfix feature 4 types branches, Slow feedback PR mergée après plusieurs jours). **Résultat:**  Feature branch moyenne 8.5 jours, Merge conflicts 40% PRs, Time to production 2-3 semaines. Mieux vaut Trunk-Based Development (Commits fréquents petits changements <400 lignes CI/CD obligatoire feature flags code incomplet) simplifie workflow réduit merge conflicts.


**Les métriques succès** : Chez un client 6 mois Trunk-Based (Developer Experience Time to merge 2.5 jours → 4h -94%, Merge conflicts 40% → 5% PRs, Lines changed/PR 850 → 280 -67%, Quality Bugs production -35%, Incidents -42%, MTTR 2h → 25min -79%, Business Time to production 2 semaines → 1 jour -93%, Deploys/week 3 → 42 +1300%, Developer satisfaction 6.2 → 8.7 /10). Ces métriques permettent de voir si Trunk-Based Development fonctionne et d'ajuster si nécessaire.

## Erreurs fréquentes

**Pas de feature flags**  
Code incomplet pushé sans flag. **Résultat:**  Feature cassée en prod. Mieux vaut feature flags si code incomplet (Unleash Open Source, LaunchDarkly SaaS, Flagsmith Hybrid).

**PRs trop grosses**  
PR #123 Refonte page checkout 1200 lignes. **Résultat:**  Review difficile, merge conflicts fréquents. Mieux vaut découper en 4-5 PRs 250-300 lignes chacune.

**Tests insuffisants**  
Sans tests solides, trunk-based = chaos. **Résultat:**  Bugs en production fréquents. Mieux vaut minimum requis (Coverage >80%, Tests E2E parcours critiques, CI <10 minutes).

**Skip code review**  
"On merge direct on verra après". **Résultat:**  Dette technique explosive. Mieux vaut review obligatoire même petits changements.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Migration progressive dès le début**  
Plutôt que Big Bang, migration progressive dès le début (Phase 1 Réduire durée vie branches, Phase 2 Short-lived branches, Phase 3 Trunk-Based pur). Cette approche progressive facilite l'adoption.

**Mettre en place CI/CD configuration requise dès le début**  
Plutôt que CI/CD basique, mettre en place CI/CD configuration requise dès le début (Pipeline exemple tests rapides fail fast durée <10 minutes objectif <5min, Protection branch main required_status_checks required_reviews enforce_admins allow_force_pushes false). Cette configuration protège la branche main sans bloquer le workflow.

**Mettre en place feature flags dès le début**  
Plutôt que code incomplet pushé sans flag, mettre en place feature flags dès le début (Unleash Open Source, LaunchDarkly SaaS, Flagsmith Hybrid). Cette approche permet de déployer du code incomplet sans casser la production.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
