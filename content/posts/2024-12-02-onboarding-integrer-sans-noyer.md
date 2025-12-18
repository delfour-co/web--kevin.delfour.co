---
author: ["Kevin Delfour"]
title: "Onboarding : intégrer sans noyer"
date: 2024-12-02
slug: "onboarding-integrer-sans-noyer"
description: "Les 90 premiers jours : comment structurer l'arrivée pour créer de l'autonomie, pas de la dépendance."
categories: ["culture"]
series: ["Management"]
tags: ["onboarding", "integration", "premiers-jours", "autonomie"]
pillar: "culture-management"
pillars: ["culture-management"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Jour 1. 47 accès à créer, 12 outils à installer, 200 pages de doc à lire, 15 personnes à rencontrer. Nouvel arrivant noyé avant même de commencer.

Ce que j'ai observé : l'onboarding peut faire la différence entre "je reste 5 ans" et "je pars à 6 mois". Pourtant, beaucoup d'organisations le bâclent ou le surchargent.

## Le faux problème

Le faux problème serait de croire qu'un bon onboarding = beaucoup d'information. En réalité, trop d'info tue l'info. Un bon onboarding dose et séquence.

Un autre faux problème : penser que l'onboarding s'arrête à J+7. En réalité, l'intégration prend 90 jours minimum pour être solide.

## Le vrai enjeu CTO

Le vrai enjeu est de créer un onboarding qui intègre sans submerger :

**Les 3 phases de l'onboarding (90 jours)** :

**Phase 1 - Semaine 1 : Bases et premiers contacts (J1-J7)** : Objectifs : environnement de travail opérationnel, contexte minimal compris, premières relations créées. Activités : setup technique (ordi, accès), rencontres clés (manager, équipe directe, buddy), contexte entreprise/produit (1h présentation, pas 200 slides). Premier micro-projet (2-3 jours max, succès garanti). Piège à éviter : surcharge d'infos, 47 réunions, zéro temps de digestion.

**Phase 2 - Mois 1 : Apprentissage actif (J8-J30)** : Objectifs : comprendre produit/architecture, premiers commits mergés, relations élargies. Activités : onboarding technique progressif (architecture, stack, processus), petites tâches réelles (bugs, features simples), pair programming avec plusieurs personnes, one-on-ones avec stakeholders clés. Piège à éviter : tâches critiques trop tôt, attendre qu'il comprenne tout avant de livrer.

**Phase 3 - Mois 2-3 : Autonomie progressive (J31-J90)** : Objectifs : autonome sur scope défini, intégré dans équipe, comprend dynamiques. Activités : features de taille moyenne en autonomie croissante, participation rituels (standups, retros, reviews), début de contribution process/culture. Piège à éviter : laisser sans feedback, supposer que tout va bien.

**Les 5 piliers d'un onboarding réussi** :

**Pilier 1 - Buddy dédié** : Rôle : point de contact principal pour questions "bêtes", safe space, guide informel. Qui : pair (pas manager), volontaire, bon communicant. Durée : 3 mois minimum. Impact : réduit isolement, accélère intégration.

**Pilier 2 - Quick wins programmés** : Principe : succès rapides (merge PR semaine 1, ship feature semaine 4). Pourquoi : confiance, sentiment d'utilité, preuve de capacité. Comment : projets calibrés (pas triviaux, pas critiques), support disponible.

**Pilier 3 - Documentation vivante** : Contenu : architecture (contexte + schémas), processus (deploy, review, incident), qui fait quoi, FAQ. Format : wiki accessible, mis à jour, pas 200 pages. Utilisation : référence, pas lecture exhaustive J1.

**Pilier 4 - Checkpoints structurés** : Fréquence : J1, J7, J14, J30, J60, J90. Format : one-on-one manager, questions ouvertes ("Comment tu te sens ?", "Qu'est-ce qui bloque ?"). Objectif : détecter problèmes tôt, ajuster.

**Pilier 5 - Feedback bidirectionnel** : Manager → nouveau : "Voici ce qui va bien, voici où progresser." Nouveau → process : "Voici ce qui m'a aidé, voici ce qui était confus." Impact : amélioration continue onboarding.

## Cadre de décision

Voici comment je structure l'onboarding :

**1. Préparer AVANT J1**
Ordi configuré, accès créés, buddy assigné, planning semaine 1 partagé. Cette préparation évite friction J1.

**2. Séquencer l'information**
Pas tout J1. Semaine 1 : bases. Mois 1 : approfondissement. Mois 2-3 : détails. Cette progression évite submersion.

**3. Créer quick wins**
Semaine 1 : merge 1 PR (fix doc, petit bug). Semaine 2-4 : ship petite feature. Ces succès créent confiance.

**4. Ritualiser les checkpoints**
Calendrier pré-rempli : one-on-one J1, J7, J14, J30, J60, J90. Ces points détectent problèmes tôt.

**5. Mesurer et améliorer**
Survey à J90 : "Qu'est-ce qui t'a aidé ? Qu'est-ce qui manquait ?" Ces retours améliorent processus.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**L'onboarding inexistant** : "Voilà ton ordi, démerde-toi." Pas de buddy, pas de doc, pas de structure. Résultat : 3 mois perdus, frustration, risque départ à 6 mois.

**L'onboarding submersion** : J1 : 8h de réunions, 200 pages à lire. Semaine 1 : 15 personnes rencontrées, zéro temps de faire. Résultat : surcharge cognitive, rien retenu, stress.

**L'onboarding progressif** : J1 : setup (2h) + présentation équipe (1h) + premier micro-projet (4h). Semaine 1 : merge première PR. Mois 1 : ship première feature. Checkpoints J7, J14, J30. Buddy dédié. Résultat : confiance, intégration rapide, productive à J30.

**L'exemple du quick win** : J3 : "Ton premier projet : corriger cette typo dans la doc + améliorer ce bout de README." 2h de travail, PR mergée, félicitations. Message : "Tu peux contribuer dès maintenant." Impact : confiance, sentiment d'appartenance immédiat.

**La mesure qui améliore** : Survey systématique J90 à tous nouveaux. Résultat : identification que doc architecture illisible. Réécriture. Prochains onboardings 30% plus rapides.

## Erreurs fréquentes

**Rien préparer avant J1**
Nouveau arrive, ordi pas prêt, accès manquants. Résultat : 2-3 jours perdus, mauvaise première impression.

**Surcharge d'info J1**
8 réunions, 200 slides, 15 personnes. Résultat : rien retenu, épuisement.

**Pas de quick wins**
3 semaines de lecture avant premier commit. Résultat : frustration, sentiment d'inutilité.

**Pas de checkpoints**
Supposer que tout va bien. Découvrir problèmes à J60. Résultat : trop tard pour corriger facilement.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Checklist pré-J1**
Ordi configuré, accès créés, buddy assigné, planning semaine 1. Cette préparation montre professionnalisme et respect.

**Quick win programmé semaine 1**
Projet calibré (2-4h, succès garanti, merge rapide). Ce succès early crée dynamique positive.

**Checkpoints J1-J7-J14-J30-J60-J90**
Calendrier pré-rempli, questions structurées. Ces points détectent friction tôt.

**Survey J90 systématique**
"Qu'est-ce qui t'a aidé ? Qu'est-ce qui manquait ? Note 1-10 l'onboarding." Ces retours améliorent process en continu.

## Pour approfondir

Le livre [\"Être ou ne pas être CTO\"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment créer des processus d'intégration qui retiennent les talents.

Pour approfondir, tu peux aussi consulter l'article [\"Former sans infantiliser\"](/posts/former-sans-infantiliser/) ou les autres contenus du pilier [\"Culture & management\"](/culture-management/).
