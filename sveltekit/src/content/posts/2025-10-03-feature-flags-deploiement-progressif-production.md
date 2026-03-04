---
author:
- Kevin Delfour
title: 'Feature Flags : Déployer en prod sans stress (et rollback en 1 clic)'
date: 2025-10-03
description: Les Feature Flags transforment votre façon de déployer. Découvrez comment
  découpler déploiement et release, tester en prod et rollback instantanément.
categories: ["pratiques"]
series:
- Développement
tags:
- devops
- ci-cd
- feature-flags
- deploiement
- productivite
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
slug: feature-flags-deploiement-progressif-production
---
## Situation réelle

Déployer un vendredi soir ? Avec les Feature Flags, c'est possible. Cette situation n'est pas une fatalité. Les Feature Flags transforment le déploiement : avant (Deploy = stress, Rollback = 15-30min, Testing en prod = impossible), après (Deploy = routine, Rollback = 1 seconde, Testing en prod = safe).

Ce que j'ai observé : beaucoup d'équipes ont un problème traditionnel. Déploiement = Release (git push → CI/CD → Deploy prod → 🤞 Si bug rollback complet → redéploy entier → 15-30 minutes downtime). **Résultat:**  déploiements le mardi matin uniquement, freeze 2 jours avant weekend, stress maximum. Avec Feature Flags (git push → CI/CD → Deploy prod feature OFF → Test interne feature ON pour admins → Rollout 5% users → 100% users Si bug Toggle flag OFF instantané). **Résultat:**  deploy n'importe quand, rollback &lt;1 seconde, zero stress. Investissement minimal, impact maximum.

## Le faux problème

Le faux problème serait de croire que Feature Flags sont complexes à mettre en place. En réalité, Feature Flags peuvent être simples : Semaine 1 Setup (Installer Unleash Docker docker run -d -p 4242:4242 unleashorg/unleash-server Ou LaunchDarkly npm install launchdarkly-js-client-sdk), Semaine 2 Premier flag (Feature simple low-risk if featureFlags.isEnabled 'new-footer' return &lt;NewFooter /> return &lt;OldFooter />), Semaine 3-4 Rollout (Jour 1 Admins Jour 3 Interne Jour 5 5% users Jour 7 25% users Jour 10 100% users Jour 15 Cleanup flag). Cette approche progressive facilite l'adoption.

Un autre faux problème : penser qu'il faut Feature Flags pour tout. En réalité, Feature Flags doivent être utilisés stratégiquement : Release Flags temporaires (Nouvelle feature développement Supprimer flag après rollout complet 2-4 semaines), Ops Flags permanents (Kill switch cas incident Circuit breakers), Experiment Flags A/B testing (Optimisation produit), Permission Flags (Monétisation beta testing). Cette distinction maximise l'impact.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment découpler déploiement et release avec Feature Flags :

**Le problème traditionnel** : Déploiement = Release (git push → CI/CD → Deploy prod → 🤞 Si bug rollback complet → redéploy entier → 15-30 minutes downtime). **Résultat:**  déploiements le mardi matin uniquement, freeze 2 jours avant weekend, stress maximum. Ce problème coûte cher : déploiements limités, rollback lent, testing en prod impossible.

**Avec Feature Flags** : git push → CI/CD → Deploy prod feature OFF → Test interne feature ON pour admins → Rollout 5% users → 100% users Si bug Toggle flag OFF instantané. **Résultat:**  deploy n'importe quand, rollback &lt;1 seconde, zero stress. Ce découplage transforme le déploiement.

**Types Feature Flags** : Release Flags temporaires (Nouvelle feature développement if featureFlags.isEnabled 'new-checkout-flow' return &lt;NewCheckoutFlow /> return &lt;OldCheckoutFlow /> Supprimer flag après rollout complet 2-4 semaines Usage Deploy code incomplet prod). Ops Flags permanents (Kill switch cas incident if featureFlags.isEnabled 'enable-recommendations' return await fetchRecommendations Coûteux return Fallback si service recommendations down Usage Circuit breakers kill switches). Experiment Flags A/B testing (A/B test pricing const variant featureFlags.getVariant 'pricing-test' Si variant === 'premium' return &lt;PremiumPricing /> else if variant === 'standard' return &lt;StandardPricing /> Usage Optimisation produit). Permission Flags (Features par tier abonnement Si user.tier === 'premium' && featureFlags.isEnabled 'advanced-analytics' return &lt;AdvancedAnalytics /> Usage Monétisation beta testing).

**Rollout progressif** : Étape 1 Admins Jour 0 (targeting custom email endsWith '@mycompany.com' Objectif Valider feature prod réel). Étape 2 Équipe interne Jour 1-2 (targeting custom email endsWith '@mycompany.com' Objectif Dogfooding récolter feedback). Étape 3 Beta users Jour 3-5 (targeting custom betaTester true rollout 100 100% beta testers Objectif Valider early adopters). Étape 4 Canary Jour 6-10 (rollout 5 5% tous users Objectif Détecter bugs vraie charge Monitoring critique Error rate &lt;0.1% Latency p95 <baseline +10% Conversions maintenues). Étape 5 Rollout progressif Jour 11-20 (Jour 11 10% Jour 13 25% Jour 15 50% Jour 17 75% Jour 20 100% Critère avancement Toutes métriques OK 48h). Étape 6 Cleanup Jour 30 (Supprimer flag code if featureFlags.isEnabled 'new-dashboard' return &lt;NewDashboard /> return &lt;OldDashboard /> → return &lt;NewDashboard /> Important Ne pas accumuler dette technique). Ce rollout progressif réduit les risques.

## Cadre de décision

Voici les principes qui m'ont aidé à découpler déploiement et release :

**1. Feature Flags découplent déploiement et release**  
git push → CI/CD → Deploy prod feature OFF → Test interne feature ON pour admins → Rollout 5% users → 100% users Si bug Toggle flag OFF instantané plutôt que git push → CI/CD → Deploy prod → 🤞 Si bug rollback complet redéploy entier 15-30 minutes downtime. Ce découplage transforme le déploiement : deploy n'importe quand, rollback &lt;1 seconde, zero stress.

**2. Types Feature Flags selon usage**  
Release Flags temporaires (Nouvelle feature développement Supprimer flag après rollout complet 2-4 semaines Usage Deploy code incomplet prod). Ops Flags permanents (Kill switch cas incident Circuit breakers Usage Circuit breakers kill switches). Experiment Flags A/B testing (A/B test pricing Optimisation produit Usage Optimisation produit). Permission Flags (Features par tier abonnement Monétisation beta testing Usage Monétisation beta testing). Cette distinction maximise l'impact.

**3. Rollout progressif réduit risques**  
Étape 1 Admins Jour 0 (targeting custom email endsWith '@mycompany.com' Objectif Valider feature prod réel). Étape 2 Équipe interne Jour 1-2 (targeting custom email endsWith '@mycompany.com' Objectif Dogfooding récolter feedback). Étape 3 Beta users Jour 3-5 (targeting custom betaTester true rollout 100 Objectif Valider early adopters). Étape 4 Canary Jour 6-10 (rollout 5 Objectif Détecter bugs vraie charge Monitoring critique Error rate &lt;0.1% Latency p95 <baseline +10% Conversions maintenues). Étape 5 Rollout progressif Jour 11-20 (Jour 11 10% Jour 13 25% Jour 15 50% Jour 17 75% Jour 20 100% Critère avancement Toutes métriques OK 48h). Étape 6 Cleanup Jour 30 (Supprimer flag code Important Ne pas accumuler dette technique). Ce rollout progressif réduit les risques.

**4. Rollback instantané**  
Incident détecté (12:34 Deploy new-payment-flow 10% users 12:42 Spike errors +500% 12:43 Toggle flag OFF via dashboard 12:43:05 Errors retour normale MTTR 5 secondes vs 15-30min rollback traditionnel). Automated rollback (Monitoring auto-rollback const metrics await getMetrics 'new-payment-flow' Si metrics.errorRate >0.5 >0.5% await featureFlags.disable 'new-payment-flow' await alert.page oncall 'Auto-rollback triggered'). Ce rollback instantané réduit le MTTR.

**5. Patterns avancés**  
Pattern 1 Rampe montée automatique (Rollout automatique si métriques OK rolloutSchedule day 1 percentage 5 day 3 percentage 25 day 5 percentage 50 day 7 percentage 100 for stage rolloutSchedule await wait stage.day const metrics await getMetrics Si metrics.errorRate <threshold await featureFlags.setRollout 'feature' stage.percentage else await featureFlags.disable 'feature' break). Pattern 2 Targeting géographique (Rollout par région featureFlags.configure 'new-feature' targeting custom country in 'FR' 'BE' 'CH' DACH d'abord 1 semaine plus tard élargir country in 'FR' 'BE' 'CH' 'DE' 'AT' 'NL'). Pattern 3 Ring deployment (Rings Dev → Staging → Prod rings env dev users all env staging users internal env prod users beta env prod rollout 10 env prod rollout 100). Ces patterns avancés optimisent le rollout.

## Retour terrain

Ce que j'ai observé dans différentes équipes :

**Ce qui fonctionne** : Feature Flags découplent déploiement et release (git push → CI/CD → Deploy prod feature OFF → Test interne feature ON pour admins → Rollout 5% users → 100% users Si bug Toggle flag OFF instantané) transforme déploiement deploy n'importe quand rollback &lt;1 seconde zero stress. Types Feature Flags selon usage (Release Flags temporaires Nouvelle feature développement, Ops Flags permanents Kill switch cas incident, Experiment Flags A/B testing Optimisation produit, Permission Flags Features par tier abonnement) maximise impact. Rollout progressif (Étape 1 Admins Jour 0 Étape 2 Équipe interne Jour 1-2 Étape 3 Beta users Jour 3-5 Étape 4 Canary Jour 6-10 Étape 5 Rollout progressif Jour 11-20 Étape 6 Cleanup Jour 30) réduit risques. Rollback instantané (Incident détecté 12:34 Deploy 12:42 Spike errors 12:43 Toggle flag OFF 12:43:05 Errors retour normale MTTR 5 secondes vs 15-30min rollback traditionnel, Automated rollback Monitoring auto-rollback Si metrics.errorRate >0.5 await featureFlags.disable await alert.page) réduit MTTR.

**Ce qui bloque** : Déploiement = Release (git push → CI/CD → Deploy prod → 🤞 Si bug rollback complet redéploy entier 15-30 minutes downtime). **Résultat:**  déploiements le mardi matin uniquement, freeze 2 jours avant weekend, stress maximum. Mieux vaut Feature Flags découplent déploiement et release (git push → CI/CD → Deploy prod feature OFF → Test interne feature ON pour admins → Rollout 5% users → 100% users Si bug Toggle flag OFF instantané). Trop de flags (Flags qui durent 6+ mois old-feature-from-2024 Debt technique). **Résultat:**  dette technique accumulée, code complexe. Mieux vaut Cleanup automatique après 30 jours.


**Coûts et ROI** : Solutions Feature Flags (LaunchDarkly SaaS $50-$100/utilisateur/mois Toutes features Support 24/7, Unleash Open Source Gratuit self-hosted Infrastructure $50-$200/mois Maintenance 0.2 ETP, Custom fait maison Dev 2-3 semaines Maintenance 0.1 ETP). ROI mesuré (Avant Feature Flags Incidents/mois 8 MTTR moyen 25 minutes Coût incidents ~$50k/an, Après Feature Flags Incidents/mois 2 MTTR moyen 30 secondes Économie ~$35k/an, ROI Payé 3 mois même LaunchDarkly). Ce ROI justifie l'investissement.

## Erreurs fréquentes

**Trop de flags**  
Flags qui durent 6+ mois old-feature-from-2024 Debt technique. **Résultat:**  dette technique accumulée, code complexe. Mieux vaut Cleanup automatique après 30 jours.

**Nested flags**  
Flags imbriqués cauchemar if featureFlags.isEnabled 'feature-a' if featureFlags.isEnabled 'feature-b' if featureFlags.isEnabled 'feature-c' Quelle combinaison testée ??? **Résultat:**  combinaisons complexes, testing difficile. Mieux vaut 1 flag = 1 feature indépendante.

**Pas de fallback**  
Si service Feature Flags down = app crash const isEnabled await featureFlags.isEnabled 'feature'. **Résultat:**  app crash si service Feature Flags down. Mieux vaut Fallback si service down const isEnabled await featureFlags.isEnabled 'feature'.catch => false Safe default.

**Feature Flags en database**  
Query DB pour chaque check SELECT enabled FROM feature_flags WHERE name = 'feature'. **Résultat:**  performance dégradée, latence élevée. Mieux vaut Cache en mémoire refresh périodique.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Mettre en place Feature Flags dès le début**  
Plutôt que déploiement = release, mettre en place Feature Flags dès le début (Semaine 1 Setup Installer Unleash Docker ou LaunchDarkly, Semaine 2 Premier flag Feature simple low-risk, Semaine 3-4 Rollout Jour 1 Admins Jour 3 Interne Jour 5 5% users Jour 7 25% users Jour 10 100% users Jour 15 Cleanup flag). Ce découplage transforme le déploiement dès le départ.

**Mettre en place rollout progressif dès le début**  
Plutôt que rollout 100% d'un coup, mettre en place rollout progressif dès le début (Étape 1 Admins Jour 0, Étape 2 Équipe interne Jour 1-2, Étape 3 Beta users Jour 3-5, Étape 4 Canary Jour 6-10, Étape 5 Rollout progressif Jour 11-20, Étape 6 Cleanup Jour 30). Ce rollout progressif réduit les risques.

**Mettre en place cleanup automatique dès le début**  
Plutôt que flags qui durent 6+ mois, mettre en place cleanup automatique dès le début (Cleanup automatique après 30 jours Supprimer flag code Important Ne pas accumuler dette technique). Ce cleanup évite l'accumulation de dette technique.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
