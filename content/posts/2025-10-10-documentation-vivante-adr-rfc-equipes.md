---
author:
- Kevin Delfour
title: 'Documentation vivante : ADR et RFC pour des décisions d''équipe traçables'
date: 2025-10-10
description: Fini la doc obsolète et les décisions perdues. Découvrez les ADR et RFC
  pour documenter l'architecture et les décisions en continu.
categories:
- architecture
series:
- Architecture
tags:
- documentation
- architecture
- collaboration
- adr
- rfc
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

Pourquoi cette décision a été prise ? Qui l'a validée ? La documentation ne le dit pas... ou elle est obsolète. Cette situation n'est pas une fatalité. Les ADR et RFC résolvent ce problème de façon élégante.

Ce que j'ai observé : beaucoup d'équipes ont une documentation morte. Symptômes classiques (README.md last updated 2 years ago "We use microservices..." mais personne ne sait pourquoi microservices quelles alternatives considérées qui a décidé). **Résultat :**  décisions refaites plusieurs fois, contexte perdu, nouveaux arrivants perdus. Avec ADR/RFC, documentation vivante : toujours à jour archives immutables, contexte préservé, décisions traçables. Métriques adoption mesurée (Avant ADR/RFC décisions documentées 10% "Pourquoi ?" répondu rarement onboarding nouveau 2 semaines, Après ADR/RFC décisions documentées 95% "Pourquoi ?" dans ADR toujours onboarding nouveau 3 jours).

## Le faux problème

Le faux problème serait de croire qu'il faut documenter toutes les décisions en détail. En réalité, un ADR trop long (50 pages) devient obsolète rapidement et n'est pas maintenu. L'objectif n'est pas la documentation exhaustive, mais la documentation essentielle : ADR court 2 pages + link vers RFC pour détails si nécessaire.

Un autre faux problème : penser qu'il faut modifier un ADR existant pour changer une décision. En réalité, un ADR est immutable history. Modifier ancien ADR casse la traçabilité. Mieux vaut créer nouveau ADR qui supersede ancien ADR. Cette approche préserve l'historique et la traçabilité.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment transformer la documentation morte en documentation vivante :

**Le problème : Documentation morte** : Symptômes classiques (README.md last updated 2 years ago "We use microservices..." mais personne ne sait pourquoi microservices quelles alternatives considérées qui a décidé). **Résultat :**  décisions refaites plusieurs fois, contexte perdu, nouveaux arrivants perdus. Cette documentation morte coûte cher : décisions refaites plusieurs fois, contexte perdu, onboarding nouveau 2 semaines.

**ADR Architecture Decision Records** : Qu'est-ce qu'un ADR (Document léger capture UNE décision architecture). Structure (Status Accepted, Context nous avons besoin stocker données utilisateur relations complexes volume attendu 100k users, Decision nous utiliserons PostgreSQL base données principale, Consequences Positive ACID garanti Relations SQL naturelles Écosystème mature Negative Scaling vertical principalement Pas optimal time-series data). Template ADR (ADR-XXX Titre court décision Date YYYY-MM-DD Status Proposed Accepted Deprecated Superseded Deciders @alice @bob Context Quel problème essayons-nous résoudre Quelles contraintes Decision Quelle solution avons-nous choisi Alternatives Considered Option A Pros Cons Option B Pros Cons Consequences Positive Negative Risks). Cette structure capture l'essentiel sans surcharge.

**RFC Request for Comments** : Différence ADR vs RFC (ADR décision déjà prise document court archive historique, RFC proposition en discussion document détaillé processus validation). Template RFC (RFC-XXX Titre proposition Author @alice Date YYYY-MM-DD Status Draft Review Accepted Rejected Summary 1 paragraphe Qu'est-ce qu'on propose Motivation Pourquoi faire changement Quel problème ça résout Detailed Design Comment exactement on va faire Diagrammes code examples Drawbacks Quels inconvénients Alternatives Quelles autres solutions possibles Open Questions Points clarifier Timeline Week 1 Week 2). Processus décision avec RFC (Phase 1 Draft 1-3 jours Author écrit RFC Partage review 2-3 pairs Itère feedback initial, Phase 2 Review 1 semaine RFC posté Slack #architecture Équipes concernées commentent Author répond questions Open Questions résolues, Phase 3 Decision Meeting 1h Meeting stakeholders Présentation RFC 15min Discussion 30min Décision Accept/Reject/Revise, Phase 4 Accepted → ADR RFC Accepted Créer ADR correspondant Implémenter selon timeline Update ADR si déviation).

## Cadre de décision

Voici les principes qui m'ont aidé à transformer la documentation morte en documentation vivante :

**1. ADR court plutôt qu'exhaustif**  
ADR court 2 pages + link vers RFC pour détails si nécessaire plutôt qu'ADR trop long 50 pages qui devient obsolète rapidement. Structure essentielle (Status Accepted, Context problème contraintes, Decision solution choisie, Alternatives Considered Option A Pros Cons Option B Pros Cons, Consequences Positive Negative Risks). Cette longueur facilite la maintenance et la lecture.

**2. RFC pour propositions en discussion**  
RFC proposition en discussion document détaillé processus validation plutôt qu'ADR décision déjà prise. Template RFC (Summary 1 paragraphe Qu'est-ce qu'on propose, Motivation Pourquoi faire changement Quel problème ça résout, Detailed Design Comment exactement on va faire Diagrammes code examples, Drawbacks Quels inconvénients, Alternatives Quelles autres solutions possibles, Open Questions Points clarifier, Timeline Week 1 Week 2). Processus décision (Phase 1 Draft 1-3 jours, Phase 2 Review 1 semaine, Phase 3 Decision Meeting 1h, Phase 4 Accepted → ADR). Ce processus structure la discussion et facilite la décision.

**3. ADR immutable history**  
ADR immutable history. Modifier ancien ADR casse traçabilité. Mieux vaut créer nouveau ADR qui supersede ancien ADR. Cette approche préserve l'historique et la traçabilité.

**4. Où stocker ADR et RFC**  
Option 1 Repo Git recommandé (Versionné avec code, Pull requests pour review, Historique Git complet). Option 2 Confluence/Notion (Interface riche, Commentaires inline, Accessibles non-devs, Inconvénients pas versionné peut devenir obsolète). Option 3 Hybrid (Git ADR archives, Confluence RFC en cours discussion, RFC Accepted → ADR dans Git). Cette organisation facilite l'accès et la maintenance.

**5. Métriques succès adoption mesurée**  
Avant ADR/RFC (Décisions documentées 10%, "Pourquoi ?" répondu rarement, Onboarding nouveau 2 semaines). Après ADR/RFC (Décisions documentées 95%, "Pourquoi ?" dans ADR toujours, Onboarding nouveau 3 jours). Qualité décisions (Nombre fois où on re-fait décision Avant 4/an Après 0/an, Décisions basées data vs opinion Avant 30% Après 85%). Ces métriques permettent de voir si ADR/RFC fonctionnent et d'ajuster si nécessaire.

## Retour terrain

Ce que j'ai observé dans différentes équipes :

**Ce qui fonctionne** : ADR court 2 pages + link vers RFC pour détails plutôt qu'ADR trop long 50 pages qui devient obsolète rapidement. RFC proposition en discussion document détaillé processus validation (Phase 1 Draft 1-3 jours, Phase 2 Review 1 semaine, Phase 3 Decision Meeting 1h, Phase 4 Accepted → ADR). ADR immutable history créer nouveau ADR qui supersede ancien ADR plutôt que modifier ancien ADR. Où stocker Repo Git recommandé versionné avec code pull requests review historique Git complet. Métriques succès adoption mesurée (Décisions documentées 95% "Pourquoi ?" dans ADR toujours Onboarding nouveau 3 jours, Qualité décisions Nombre fois où on re-fait décision 0/an Décisions basées data 85%).

**Ce qui bloque** : Documentation morte (README.md last updated 2 years ago "We use microservices..." mais personne ne sait pourquoi quelles alternatives considérées qui a décidé). **Résultat :**  décisions refaites plusieurs fois, contexte perdu, nouveaux arrivants perdus, onboarding nouveau 2 semaines. Mieux vaut ADR/RFC documentation vivante toujours à jour archives immutables contexte préservé décisions traçables. ADR trop longs (ADR-001 Use PostgreSQL 50 pages). **Résultat :**  devient obsolète rapidement, pas maintenu. Mieux vaut ADR court 2 pages + link vers RFC pour détails. Pas d'ownership (Deciders Team). **Résultat :**  personne ne sait qui a décidé, traçabilité perdue. Mieux vaut Deciders @alice-tech-lead @bob-cto. Modifier ancien ADR (Éditer ADR-003 pour changer décision). **Résultat :**  casse traçabilité, historique perdu. Mieux vaut créer ADR-015 qui supersede ADR-003.

**Les métriques succès** : Adoption mesurée (Avant ADR/RFC décisions documentées 10% "Pourquoi ?" répondu rarement onboarding nouveau 2 semaines, Après ADR/RFC décisions documentées 95% "Pourquoi ?" dans ADR toujours onboarding nouveau 3 jours). Qualité décisions (Nombre fois où on re-fait décision Avant 4/an Après 0/an, Décisions basées data vs opinion Avant 30% Après 85%). Ces métriques permettent de voir si ADR/RFC fonctionnent et d'ajuster si nécessaire.

## Erreurs fréquentes

**ADR trop longs**  
ADR-001 Use PostgreSQL 50 pages. **Résultat :**  devient obsolète rapidement, pas maintenu. Mieux vaut ADR court 2 pages + link vers RFC pour détails.

**Pas d'ownership**  
Deciders Team. **Résultat :**  personne ne sait qui a décidé, traçabilité perdue. Mieux vaut Deciders @alice-tech-lead @bob-cto.

**Modifier ancien ADR**  
Éditer ADR-003 pour changer décision. **Résultat :**  casse traçabilité, historique perdu. Mieux vaut créer ADR-015 qui supersede ADR-003. ADR = immutable history.

**RFC sans deadline**  
Status Draft depuis 6 mois. **Résultat :**  RFC qui traîne, décision jamais prise. Mieux vaut Deadline 2025-10-20 Si pas décision → Auto-reject.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Mettre en place ADR/RFC dès le début**  
Plutôt que documentation morte, mettre en place ADR/RFC dès le début (ADR court 2 pages + link vers RFC pour détails, RFC proposition en discussion processus validation, ADR immutable history créer nouveau ADR qui supersede ancien ADR). Cette approche transforme la documentation morte en documentation vivante dès le départ.

**Définir ownership dès le début**  
Plutôt que Deciders Team, définir ownership dès le début (Deciders @alice-tech-lead @bob-cto). Cette ownership facilite la traçabilité et la responsabilité.

**Mettre en place métriques succès dès le début**  
Plutôt que supposer que ça fonctionne, mettre en place métriques succès dès le début (Décisions documentées, "Pourquoi ?" dans ADR, Onboarding nouveau, Nombre fois où on re-fait décision, Décisions basées data vs opinion). Ces métriques permettent de voir si ADR/RFC fonctionnent et d'ajuster si nécessaire.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
