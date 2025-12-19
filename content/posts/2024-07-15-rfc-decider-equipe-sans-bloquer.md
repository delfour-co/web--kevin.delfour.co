---
author: ["Kevin Delfour"]
title: "La RFC : décider en équipe sans bloquer"
date: 2024-07-15
slug: "rfc-decider-equipe-sans-bloquer"
description: "Request for Comments : un outil puissant pour décisions techniques collaboratives sans paralysie."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["rfc", "decision", "collaboration", "processus"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"On doit choisir entre PostgreSQL et MongoDB. Le débat dure depuis 1 semaine, 2 camps s'opposent, aucun consensus." Sans processus structuré, ces débats s'éternisent ou se terminent par une décision frustrante.

Ce que j'ai observé : la RFC (Request for Comments) est un outil remarquablement efficace pour décider collectivement sans paralysie. Mais mal utilisée, elle devient bureaucratique.

## Le faux problème

Le faux problème serait de croire que la RFC est juste "un doc technique". En réalité, c'est un outil de gouvernance qui structure la prise de décision collective.

Un autre faux problème : penser que RFC = consensus obligatoire. En réalité, RFC = consultation structurée, pas consensus. Quelqu'un tranche à la fin.

## Le vrai enjeu CTO

Le vrai enjeu est d'utiliser la RFC pour combiner qualité de décision et vélocité :

**Qu'est-ce qu'une RFC** : Document structuré proposant une décision technique importante, avec contexte, options considérées, recommandation, et ouvert aux commentaires pendant une période limitée.

**Quand utiliser une RFC** :
- Décision architecturale importante (Type 1)
- Changement qui impacte plusieurs équipes
- Sujet controversé avec désaccords
- Besoin d'expertise diverse
Ne PAS utiliser pour : décisions mineures, décisions urgentes (<48h), sujets non techniques.

**Structure RFC type** :
1. Contexte : quel problème on résout, pourquoi maintenant

2. Options considérées : 3-5 options avec pros/cons chacune

3. Recommandation : option préférée avec justification

4. Risques identifiés : ce qui peut mal tourner

5. Plan d'implémentation : étapes, timeline, rollback

6. Ouverture commentaires : période (3-7 jours), qui doit reviewer

**Processus RFC** :
- J0 : Auteur publie RFC (draft)
- J0-J3 : Commentaires ouverts
- J3 : Auteur intègre feedbacks ou répond
- J4-J5 : Période finale commentaires
- J5 : Décision finale (auteur ou CTO selon scope)
- J6 : RFC marquée "approved" ou "rejected", implémentation

## Cadre de décision

Voici comment j'implémente les RFC efficacement :

**1. Template simple et clair**
Pas 10 pages, mais structure claire en 2-3 pages. Template dans wiki, facile à dupliquer.

**2. Désigner l'auteur et le décideur**
RFC author : porte la proposition, intègre feedbacks. Decision maker : tranche à la fin (peut être l'auteur ou CTO selon scope). Cette clarté évite "qui décide ?".

**3. Timebox strict**
Commentaires 3-7 jours max selon criticité. Pas 3 semaines. Cette contrainte force focus.

**4. Pas de consensus obligatoire**
But : qualité de décision via feedback diverse, pas consensus. Si désaccord reste, décideur tranche. Cette règle évite paralysie.

**5. Documenter la décision finale**
RFC devient un ADR quand approuvée. Archive le contexte, les options, le raisonnement. Évite de refaire le débat 6 mois plus tard.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**L'absence de processus** : Décisions architecturales prises dans des meetings ad hoc ou Slack threads. **Résultat:**  contexte perdu, personnes clés pas consultées, décisions sous-optimales.

**Le processus bureaucratique** : RFC obligatoire pour tout, 15 pages, 6 reviewers requis, 3 semaines. **Résultat:**  paralysie, contournement du processus.

**Le processus qui marche** : RFC pour décisions Type 1, template 2-3 pages, 5 jours review, décideur clair. **Résultat:**  qualité améliorée, contexte documenté, vélocité maintenue.

**L'exemple concret** : RFC "Migration PostgreSQL → MongoDB". Auteur : Tech Lead DB. Contenu : contexte (pourquoi changer), 3 options (Postgres optimisé, Mongo, Cassandra), recommandation (Mongo), risques (migration coûteuse), plan. Commentaires : 12 personnes, feedbacks intégrés. Décision : CTO approuve Mongo. Timeline : 6 jours. **Résultat:**  décision de qualité, buy-in collectif, doc pour futur.

## Erreurs fréquentes

**RFC pour tout**
Utiliser RFC même pour décisions mineures. **Résultat:**  bureaucratie, frustration, contournements.

**Pas de timebox**
Laisser commentaires ouverts "jusqu'à ce qu'on converge". **Résultat:**  débat sans fin, paralysie.

**Consensus obligatoire**
Attendre que tout le monde soit d'accord. **Résultat:**  paralysie, ou décision diluée pour satisfaire tout le monde.

**Pas de décideur clair**
"On verra selon les commentaires qui décide." **Résultat:**  confusion, frustration, débat sans conclusion.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Implémenter RFC dès 15-20 personnes**
Ne pas attendre le chaos à 50. Mettre en place le processus tôt, quand c'est encore simple.

**Template ultra-simple**
V1 : 1 page avec 5 sections. Affiner progressivement. Ne pas commencer avec template complexe qui décourage.

**Former sur RFC vs ADR**
Workshop 1h : RFC = avant décision (pour consultation), ADR = après décision (pour doc). Cette distinction clarifie l'usage.

**Célébrer les bonnes RFC**
Mettre en avant les RFC qui ont évité des erreurs ou accéléré des décisions. Cette reconnaissance encourage l'usage.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment implémenter RFC selon la taille et la maturité de l'organisation.

Pour approfondir, tu peux aussi consulter l'article ["ADR : documenter pour ne pas répéter"](/posts/adr-documenter-decisions-architecture/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
