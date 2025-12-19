---
author: ["Kevin Delfour"]
title: "Définir les niveaux de décision dans l'organisation technique"
date: 2024-05-20
slug: "definir-niveaux-decision-organisation-technique"
description: "Qui décide quoi dans une organisation technique : clarifier les responsabilités sans bureaucratie."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["gouvernance", "decision", "autonomie", "organisation"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: true
weight: 1
ShowToc: true
TocOpen: false
---

## Situation réelle

"Qui décide si on migre vers Kubernetes ?" "Qui valide le choix de cette librairie ?" "Est-ce que je peux changer cette architecture sans demander ?" Ces questions révèlent un flou sur qui décide quoi.

Ce que j'ai observé : sans cadre clair de décision, soit tout remonte au CTO (bottleneck), soit tout le monde décide en silo (incohérence). Le bon équilibre est un cadre explicite qui donne de l'autonomie sans créer le chaos.

## Le faux problème

Le faux problème serait de croire qu'il faut un processus formel pour chaque décision. En réalité, un cadre léger mais explicite suffit pour 90% des cas.

Un autre faux problème : penser que plus d'autonomie crée toujours plus d'efficacité. En réalité, l'autonomie sans cadre crée de l'incohérence et des décisions incompatibles.

## Le vrai enjeu CTO

Le vrai enjeu est de créer un cadre de décision qui donne de l'autonomie tout en préservant la cohérence :

**Les 4 niveaux de décision** :

**Niveau 1 - Décision individuelle** : Développeur seul décide, aucune validation nécessaire. Exemples : naming variables, structure fichiers d'un composant, choix algorithme local, librairie utilitaire (<1000 downloads/semaine). ****Impact :** ** limité à un composant, réversible en <1 jour.

**Niveau 2 - Décision d'équipe** : Tech Lead + équipe décident, pas besoin CTO. Exemples : architecture feature spécifique, choix framework UI pour un projet, patterns code équipe, processus reviews équipe. ****Impact :** ** limité à une équipe, réversible en <1 semaine.

**Niveau 3 - Décision transverse** : CTO ou Staff+ décide après consultation. Exemples : architecture globale, choix base de données, stratégie déploiement, standards cross-équipes. ****Impact :** ** multiple équipes, réversible en 1-3 mois.

**Niveau 4 - Décision structurante** : CTO + CEO décident, souvent avec board. Exemples : migration cloud majeure, rewrite complet, build vs buy stratégique, pivot technique. ****Impact :** ** toute l'organisation, difficile à réverser.

**Le framework de classification** : Pour chaque décision, se demander :
- ****Impact :** ** combien d'équipes affectées ?
- Réversibilité : coût de revenir en arrière ?
- Risque : que se passe-t-il si mauvais choix ?

## Cadre de décision

Voici comment j'implémente ce framework :

**1. Documenter le framework**
Page wiki accessible listant les 4 niveaux avec exemples concrets. Cette documentation élimine 80% des questions "qui décide ?"

**2. Former les Tech Leads**
Workshop sur comment utiliser le framework, comment escalader, comment documenter. Cette formation assure cohérence.

**3. Règle d'escalation**
Quand hésitation entre 2 niveaux, escalader au niveau supérieur pour cette fois, puis clarifier le framework. Cette pratique affine le cadre.

**4. Documenter les décisions niveau 3+**
ADR (Architecture Decision Records) pour toute décision niveau 3-4. Cette documentation partage le contexte et évite de refaire le débat.

**5. Mesurer l'efficacité**
Tracker : combien de décisions bloquées en attente CTO ? Combien de décisions incohérentes créées par trop d'autonomie ? Ajuster le framework selon les données.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**L'absence de framework** : Tout remonte au CTO "par sécurité". **Résultat :**  CTO bottleneck, décisions qui prennent des semaines, frustration équipe, talents qui partent.

**L'autonomie totale** : "Chaque équipe décide". **Résultat :**  5 frameworks différents, 3 bases de données, aucune cohérence, coût de maintenance explosif.

**Le framework bureaucratique** : Processus lourd pour chaque décision, comités multiples. **Résultat :**  paralysie, contournements, innovation tuée.

**Le framework léger qui marche** : 4 niveaux clairs, documentation minimale, escalation simple. **Résultat :**  85% décisions prises sans CTO, cohérence maintenue, vélocité élevée.

## Erreurs fréquentes

**Tout vouloir valider**
CTO qui valide même les décisions niveau 1-2. **Résultat :**  bottleneck, équipe déresponsabilisée, vélocité divisée par 3.

**Aucun cadre**
"Débrouillez-vous." **Résultat :**  incohérence massive, décisions incompatibles, dette organisationnelle.

**Framework trop complexe**
6 niveaux, 10 critères, processus formel. **Résultat :**  personne ne l'utilise, contournements, retour au chaos.

**Ne jamais réviser le framework**
Framework défini une fois, jamais ajusté. **Résultat :**  inadéquation progressive avec la réalité, contournements.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Implémenter le framework dès 10-15 personnes**
Ne pas attendre le chaos à 30 personnes. Définir le cadre tôt, quand c'est encore simple.

**Co-créer avec les Tech Leads**
Pas imposer le framework top-down, le construire avec ceux qui l'utiliseront. Cette co-création assure l'adoption.

**Commencer simple, itérer**
Framework v1 : 3 niveaux, 5 exemples par niveau. Affiner progressivement selon les cas réels.

**Célébrer les bonnes décisions autonomes**
Mettre en avant les décisions niveau 1-2 bien prises. Cette reconnaissance encourage l'autonomie responsable.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore différents frameworks de décision selon les contextes organisationnels.

Pour approfondir, tu peux aussi consulter les autres articles du pilier ["Gouvernance & décision"](/gouvernance-decision/).
