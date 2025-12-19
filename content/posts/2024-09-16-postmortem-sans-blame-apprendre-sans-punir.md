---
author: ["Kevin Delfour"]
title: "Post-mortem sans blame : apprendre sans punir"
date: 2024-09-16
slug: "postmortem-sans-blame-apprendre-sans-punir"
description: "L'art du post-mortem blameless : transformer les échecs en apprentissages collectifs."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["postmortem", "culture", "apprentissage", "blameless"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Incident majeur résolu. Maintenant vient le post-mortem. L'équipe est tendue, s'attend à être blâmée. Comment transformer cet échec en opportunité d'apprentissage plutôt qu'en séance de tribunal ?

Ce que j'ai observé : les organisations qui punissent les erreurs créent une culture du silence. Celles qui apprennent des erreurs créent une culture de l'amélioration continue.

## Le faux problème

Le faux problème serait de croire que "blameless" signifie "pas de responsabilité". En réalité, blameless signifie "focus sur le système qui a permis l'erreur, pas sur la personne".

Un autre faux problème : penser qu'on peut éviter toutes les erreurs. En réalité, les erreurs sont inévitables dans les systèmes complexes. L'enjeu est d'en tirer des leçons.

## Le vrai enjeu CTO

Le vrai enjeu est de créer une culture où les erreurs sont des opportunités d'apprentissage :

**Les principes du post-mortem blameless** :

**Principe 1 - Focus système, pas personne** : Pas : "Bob a oublié de checker." Mais : "Notre processus deploy ne force pas review pré-prod." Question clé : "Qu'est-ce qui, dans notre système, a permis cette erreur ?"

**Principe 2 - Assumer complexité** : Les systèmes sont complexes, les humains font des erreurs, c'est normal. Question : "Comment rendre impossible de refaire cette erreur ?"

**Principe 3 - Chercher causes racines, pas symptômes** : Pas s'arrêter à "erreur humaine". Aller 5 niveaux plus profond avec "5 Why". Exemple : "Pourquoi Bob n'a pas vu le bug ? Parce que pas de tests. Pourquoi pas de tests ? Parce que deadline trop courte. Pourquoi deadline courte ? Parce que pas d'estimation réaliste..."

**Principe 4 - Actions concrètes, pas abstractions** : Pas : "Être plus vigilants." Mais : "Ajouter check automatique X au pipeline." Actions mesurables avec owners et deadlines.

**Principe 5 - Célébrer la détection** : Remercier qui a détecté/signalé le problème. Cette reconnaissance encourage la transparence future.

**Structure post-mortem efficace** :

**Section 1 - Timeline factuelle** : Quoi, quand, par qui. Purement factuel, zéro jugement. But : comprendre séquence événements.

**Section 2 - Impact** : Clients affectés, durée, revenue impact, réputation. Quantifier objectivement.

**Section 3 - Root causes (5 Why)** : Descendre 5 niveaux. Identifier défauts systémiques, pas personnes.

**Section 4 - What went well** : Qu'est-ce qui a bien fonctionné ? Détection rapide ? Résolution efficace ? Reconnaître les bons réflexes.

**Section 5 - Actions** : Par root cause : action concrète, owner, deadline, critère succès. Tracking transparent.

**Section 6 - Lessons learned** : Pour l'organisation entière. Partage public si pertinent.

## Cadre de décision

Voici comment je facilite des post-mortems productifs :

**1. Timing post-incident**
3-5 jours après résolution. Pas pendant (urgence), pas 3 mois après (contexte perdu). Sweet spot : émotions retombées, contexte encore frais.

**2. Facilitateur neutre**
Pas la personne impliquée. Quelqu'un qui guide 5 Why, empêche blame, maintient focus système.

**3. Template structure**
Document pré-rempli avec 6 sections. Facilite rédaction, assure cohérence.

**4. Review meeting blameless**
1-2h, équipe concernée + stakeholders. Règle : pas de "qui", seulement "pourquoi/comment". Violations rappelées calmement.

**5. Actions tracking transparent**
Jira/Linear, suivi public, review mensuel. Ces actions doivent être vraiment faites, pas juste documentées.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**Le blame qui détruit** : Post-mortem qui cherche coupable. "C'est Bob qui a merdé." **Résultat:**  Bob démissionne, l'équipe cache futurs problèmes, culture toxique.

**Le blameless qui améliore** : Incident DB. Post-mortem : "Root cause : pas de monitoring disk space. **Action:** alerting automatique." 0 blame, problème résolu systémiquement. **Résultat:**  apprentissage, amélioration continue.

**La célébration qui renforce** : Incident détecté par junior en veille. Post-mortem commence par : "Merci Lisa d'avoir détecté et escaladé rapidement." **Résultat:**  culture de transparence renforcée.

**L'exemple concret** : Deploy qui casse prod. Timeline : 14h45 deploy, 14h50 erreurs, 15h00 rollback. ****Impact :** ** 10% users, 15 min. Root causes (5 Why) : 1) Pourquoi deploy cassé ? Tests pas complets. 2) Pourquoi tests incomplets ? Feature complexe, pas de tests edge cases. 3) Pourquoi pas edge cases ? Deadline court, pas temps. 4) Pourquoi deadline court ? Estimation irréaliste. 5) Pourquoi estimation irréaliste ? Pas de spike technique préalable. Actions : 1) Spike obligatoire features complexes, 2) Review estimation process, 3) Tests edge cases checklist.

## Erreurs fréquentes

**Chercher un coupable**
"C'est qui qui a fait ça ?" **Résultat:**  culture de peur, problèmes cachés, turnover.

**Actions vagues**
"Être plus vigilants", "Mieux communiquer". **Résultat:**  rien ne change, même erreur se répète.

**Pas de suivi actions**
Actions documentées, jamais faites. **Résultat:**  faux sentiment sécurité, même problème revient.

**Post-mortem trop tard**
3 mois après, contexte perdu. **Résultat:**  analyse superficielle, leçons ratées.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Former l'équipe au blameless**
Workshop sur "comment faire post-mortem". Cette formation crée culture commune.

**Template post-mortem dès le début**
Document standard avec 6 sections. Facilite écriture, assure qualité.

**Facilitateur dédié**
Personne formée qui facilite post-mortems. Cette expertise améliore qualité et maintient blameless.

**Actions tracking systématique**
Jira board dédié, review mensuel comex. Ces actions doivent être visibles et faites.

**Partager apprentissages**
Post-mortems significatifs partagés en all-hands ou publiquement. Cette transparence démultiplie l'apprentissage.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment construire une culture blameless avec exemples de post-mortems réels.

Pour approfondir, tu peux aussi consulter l'article ["Communication de crise"](/posts/communication-crise-dire-verite-sans-paniquer/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
