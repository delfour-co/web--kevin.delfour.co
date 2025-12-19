---
author: ["Kevin Delfour"]
title: "Décisions réversibles vs décisions irréversibles"
date: 2024-07-08
slug: "decisions-reversibles-vs-irreversibles"
description: "Distinguer les décisions à une porte vs deux portes : adapter le processus selon le type de décision."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["decision", "strategie", "reversibilite", "bezos"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Jeff Bezos a popularisé le concept : Type 1 decisions (irréversibles, portes à sens unique) vs Type 2 decisions (réversibles, portes à double sens). Cette distinction change radicalement comment on décide.

Ce que j'ai observé : traiter toutes les décisions comme irréversibles ralentit l'organisation. Traiter toutes les décisions comme réversibles crée des erreurs coûteuses. Distinguer les deux est crucial.

## Le faux problème

Le faux problème serait de croire que la plupart des décisions sont irréversibles. En réalité, 80-90% des décisions tech sont réversibles. On les traite juste comme irréversibles par peur.

Un autre faux problème : penser que "réversible" signifie "gratuit à inverser". En réalité, même les décisions réversibles ont un coût d'inversion. L'enjeu est de savoir si ce coût est acceptable.

## Le vrai enjeu CTO

Le vrai enjeu est de classifier correctement chaque décision et d'adapter le processus :

**Décisions Type 1 (irréversibles ou très coûteuses à inverser)** :

Caractéristiques : Coût d'inversion >3 mois de travail, Impact sur architecture globale, Crée des dépendances fortes, Exemples : choix cloud provider, langage core, architecture monolithe→microservices, base de données principale.

Processus adapté : Analyse approfondie (1-4 semaines), Consultation large (équipe + experts), POC/spike si nécessaire, Documentation extensive (ADR), Validation CTO obligatoire.

**Décisions Type 2 (réversibles à coût acceptable)** :

Caractéristiques : Coût d'inversion <1 semaine, Impact limité à une équipe/feature, Pas de dépendances fortes, Exemples : framework UI pour une feature, librairie utilitaire, structure de code, process équipe.

Processus adapté : Décision rapide (heures/jours), Consultation limitée (équipe directe), Pas de POC nécessaire, Documentation minimale, Délégation possible.

**Le test de réversibilité** : 3 questions pour classifier :
1. Combien de temps pour revenir en arrière ? (<1 semaine = Type 2)
2. Combien d'équipes impactées ? (>2 équipes = Type 1)
3. Crée-t-on des dépendances fortes ? (oui = Type 1)

## Cadre de décision

Voici comment j'applique ce framework :

**1. Classifier avant de décider**
Première étape : est-ce Type 1 ou Type 2 ? Ne pas commencer à analyser avant de savoir.

**2. Adapter le processus selon le type**
Type 1 : processus lourd justifié (1-4 semaines). Type 2 : processus léger (24-72h max). Cette différence multiplie la vélocité.

**3. Document the classification**
Dans l'ADR ou doc décision : "Classifié Type 2 car réversible en 3 jours". Cette justification évite les débats futurs.

**4. Règle de delegation**
Type 2 : délégation large possible. Type 1 : CTO doit valider. Cette règle claire évite les blocages.

**5. Accepter les erreurs Type 2**
Une décision Type 2 qui s'avère mauvaise ? On inverse rapidement. Le coût est acceptable. Ne pas punir, apprendre.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**Tout traiter en Type 1** : Chaque décision passe par validation CTO, analyse de 2 semaines, POC. **Résultat :**  paralysie, vélocité divisée par 5, talents frustrés qui partent.

**Tout traiter en Type 2** : "Tentez, on verra." **Résultat :**  migration cloud lancée sans analyse (Type 1 traité en Type 2), échec coûteux, 6 mois perdus.

**La distinction qui accélère** : Type 2 décidées en 48h par l'équipe. Type 1 analysées 2-4 semaines avec CTO. **Résultat :**  85% décisions en Type 2, vélocité ×3, qualité Type 1 maintenue.

**L'erreur Type 2 bien gérée** : Framework UI choisi (Type 2), s'avère mauvais après 2 semaines. Changé en 3 jours. Coût : 2 semaines de travail. Acceptable. Apprentissage : quels critères pour le prochain choix.

## Erreurs fréquentes

**Classifier en Type 1 par défaut**
"Dans le doute, on analyse à fond." **Résultat :**  paralysie, analyse de 2 semaines pour décisions réversibles.

**Sous-estimer l'irréversibilité**
Traiter migration cloud (Type 1) comme changement de librairie (Type 2). **Résultat :**  décision précipitée, lock-in coûteux.

**Ne pas documenter la classification**
Décider sans dire "c'est Type 1 ou 2". **Résultat :**  incohérence processus, débats sur "pourquoi cette décision a pris 2 semaines vs celle-là 2 jours".

**Punir les erreurs Type 2**
Blâmer quelqu'un pour une décision Type 2 qui s'avère mauvaise. **Résultat :**  personne n'ose plus décider, retour à la paralysie.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Former l'équipe au framework**
Workshop d'1h sur Type 1 vs Type 2 avec exemples concrets. Cette formation permet à l'équipe de classifier correctement.

**Créer une liste de référence**
Document partagé listant décisions classiques avec leur type. "Migration cloud = Type 1", "Choix librairie util = Type 2". Cette référence évite les débats.

**Documenter la classification systématiquement**
Dans chaque décision : "Type 2 car réversible en X jours avec coût Y". Cette transparence justifie le processus.

**Célébrer les inversions Type 2**
Mettre en avant les décisions Type 2 inversées rapidement. "On a essayé X, ça ne marchait pas, on est revenus à Y en 2 jours. Good." Cette culture encourage l'expérimentation.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore ce framework avec des exemples concrets de classifications correctes et incorrectes.

Pour approfondir, tu peux aussi consulter l'article ["Build vs Buy vs Partner"](/posts/build-vs-buy-vs-partner-cadre-decision/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
