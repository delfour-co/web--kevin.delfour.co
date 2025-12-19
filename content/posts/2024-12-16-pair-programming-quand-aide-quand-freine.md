---
author: ["Kevin Delfour"]
title: "Pair programming : quand ça aide, quand ça freine"
date: 2024-12-16
slug: "pair-programming-quand-aide-quand-freine"
description: "Le pair programming peut accélérer ou ralentir. Comprendre quand l'utiliser et comment."
categories: ["culture"]
series: ["Culture"]
tags: ["pair-programming", "collaboration", "apprentissage", "productivite"]
pillar: "culture-management"
pillars: ["culture-management"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"On va faire du pair programming systématique." Six mois plus tard : équipe épuisée, vélocité divisée par deux, talents partent. Le pair programming imposé sans discernement peut détruire autant qu'il peut aider.

Ce que j'ai observé : le pair programming est un outil puissant dans certains contextes, contre-productif dans d'autres. Le problème n'est pas l'outil, c'est l'usage dogmatique.

## Le faux problème

Le faux problème serait de croire que pair programming = toujours mieux. En réalité, c'est un outil à utiliser dans des situations spécifiques, pas une religion.

Un autre faux problème : penser que c'est binaire (tout le temps ou jamais). En réalité, l'enjeu est de savoir quand et comment.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre quand le pair programming aide et quand il freine :

**Les 4 situations où ça aide** :

**Situation 1 - Onboarding et transfert de connaissance** : Contexte : nouveau développeur, domaine complexe à comprendre. Pourquoi ça marche : apprentissage accéléré, questions en temps réel, contexte transmis. Durée optimale : 2-4h par jour pendant 2-4 semaines, puis décroissance. Piège : prolonger trop longtemps, créer dépendance.

**Situation 2 - Problème complexe et bloquant** : Contexte : bug critique non résolu depuis 2 jours, architecture complexe à designer. Pourquoi ça marche : deux cerveaux > un, déblocage rapide, décisions meilleures. Durée optimale : 2-6h intensives jusqu'à déblocage. Piège : utiliser pour tout, y compris tâches simples.

**Situation 3 - Code critique (sécurité, finance, etc.)** : Contexte : code manipulant données sensibles, argent, sécurité. Pourquoi ça marche : réduction drastique erreurs, review en temps réel. Durée optimale : sessions courtes (1-2h) sur parties critiques uniquement. Piège : appliquer à tout le code, pas juste le critique.

**Situation 4 - Montée en compétence ciblée** : Contexte : dev veut apprendre techno/pattern spécifique. Pourquoi ça marche : apprentissage pratique immédiat, feedback direct. Durée optimale : 2-3 sessions de 2h sur sujet défini. Piège : remplacer formation structurée par pair ad hoc.

**Les 4 situations où ça freine** :

**Situation 1 - Tâches simples et routinières** : Contexte : CRUD basique, bug simple, tâche bien comprise. Pourquoi ça freine : coût double pour valeur équivalente, frustration du surinvestissement. Alternative : solo + review.

**Situation 2 - Exploration et recherche** : Contexte : POC, spike technique, exploration de solutions. Pourquoi ça freine : exploration nécessite divergence, pair crée convergence prématurée. Alternative : exploration solo puis discussion/partage résultats.

**Situation 3 - Charge cognitive élevée continue** : Contexte : pair 6-8h par jour pendant semaines. Pourquoi ça freine : épuisement cognitif, pas de temps pour réflexion solo, burn-out. Alternative : sessions courtes (2-4h max/jour) avec breaks solo.

**Situation 4 - Personnalités incompatibles** : Contexte : un domine, l'autre subit. Styles de travail incompatibles. Pourquoi ça freine : frustration, inefficacité, relation dégradée. Alternative : changer les paires, accepter que certains ne pairent pas bien ensemble.

## Cadre de décision

Voici comment je décide quand utiliser le pair programming :

**1. Critères de décision**
Questions : complexité élevée ? Connaissance à transmettre ? Code critique ? Si oui à 1+, considérer pair. Si non à tous, probablement solo.

**2. Format adapté au contexte**
Onboarding : 2-4h/jour, 2-4 semaines. Problème complexe : sessions intensives 2-6h jusqu'à résolution. Code critique : 1-2h sur parties sensibles. Formation : 2-3 sessions ciblées. Routine : solo.

**3. Règles d'hygiène**
Max 4h pair/jour (au-delà, épuisement). Rotation driver/navigator toutes les 20-30min. Breaks réguliers. Ces pratiques préservent efficacité.

**4. Mesurer impact**
Avant/après : vélocité, qualité (bugs prod), satisfaction équipe. Si pair freine vélocité sans gain qualité, réduire. Cette mesure évite dogme.

**5. Volontariat, pas obligation**
Encourager, pas imposer. Certains excellent solo. Respecter différences. Cette flexibilité préserve performance.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**Le pair dogmatique** : "Tout le code en pair, tout le temps." 6 mois : vélocité divisée par 2, équipe épuisée, talents partent ("pas de temps pour réfléchir"). **Résultat :**  abandon complet du pair après.

**Le pair ciblé** : Pair utilisé pour : onboarding (2 semaines), code critique (sécurité, paiement), problèmes bloqués >1 jour. Reste en solo. **Résultat :**  qualité élevée, vélocité préservée, satisfaction équipe.

**L'exemple de l'onboarding** : Nouveau dev : semaine 1-2 pair 3h/jour avec buddy. Semaine 3-4 pair 1h/jour. Mois 2+ : pair ponctuel sur demande. **Résultat :**  autonomie rapide sans submersion.

**Le piège de la compatibilité** : Pair imposée entre dev senior dominant et junior intimidé. Junior ne contribue plus, devient "spectateur". **Résultat :**  frustration, pas d'apprentissage. Changement de binôme résout problème.

## Erreurs fréquentes

**Pair systématique sur tout**
Dogme "tout en pair". **Résultat :**  épuisement, vélocité effondrée, frustration.

**Sessions trop longues**
Pair 8h/jour pendant semaines. **Résultat :**  burn-out cognitif, inefficacité.

**Pas de rotation driver/navigator**
Un code, l'autre regarde passivement. **Résultat :**  désengagement du navigateur, pas de bénéfice collaboration.

**Ignorer incompatibilités**
Forcer paires qui ne fonctionnent pas. **Résultat :**  toxicité, inefficacité.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Pair sur critères clairs**
Guidelines : onboarding, problème complexe, code critique. Reste en solo. Ces critères évitent dogme.

**Limiter durée sessions**
Max 4h pair/jour. Au-delà, rendements décroissants. Cette limite préserve équipe.

**Mesurer avant/après**
Vélocité, qualité, satisfaction avant et après introduction pair. Ces données évitent superstition.

**Respecter préférences**
Encourager pair, pas imposer. Certains performent mieux solo. Cette flexibilité respecte différences.

## Pour approfondir

Le livre [\"Être ou ne pas être CTO\"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore différentes pratiques de collaboration et leur impact réel.

Pour approfondir, tu peux aussi consulter l'article [\"Code review\"](/posts/code-review-qualite-ou-guerre-ego/) ou les autres contenus du pilier [\"Culture & management\"](/culture-management/).
