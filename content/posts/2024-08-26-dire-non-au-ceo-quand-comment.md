---
author: ["Kevin Delfour"]
title: "Dire non au CEO : quand et comment"
date: 2024-08-26
slug: "dire-non-au-ceo-quand-comment"
description: "L'art du refus stratégique face au CEO : courage et diplomatie pour protéger la tech et le business."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["ceo", "decision", "courage", "diplomatie"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"Le CEO veut cette feature pour la démo client dans 1 semaine. Techniquement impossible sans casser tout le reste." Dire non au CEO est l'un des moments les plus difficiles du rôle de CTO.

Ce que j'ai observé : les CTOs qui ne disent jamais non perdent leur crédibilité technique. Ceux qui disent non sans alternative perdent leur crédibilité business. L'art est dans le "non, mais".

## Le faux problème

Le faux problème serait de croire qu'un bon CTO dit toujours oui. En réalité, dire oui à tout mène à des promesses impossibles et détruit la crédibilité à moyen terme.

Un autre faux problème : penser que dire non détruit la relation CEO-CTO. En réalité, dire un non argumenté avec alternatives renforce la confiance sur le long terme.

## Le vrai enjeu CTO

Le vrai enjeu est de savoir quand et comment dire non pour protéger à la fois la tech et le business :

**Quand dire non est nécessaire** :

**Situation 1 - Timeline impossible** : CEO veut feature en 2 semaines, réaliste = 2 mois. Dire oui = échec garanti. Impact : crédibilité détruite, équipe épuisée, résultat médiocre.

**Situation 2 - Dette technique catastrophique** : CEO veut feature qui nécessiterait workaround créant dette massive. Impact : hypothèque capacité future, coût ×10 pour corriger.

**Situation 3 - Risque sécurité inacceptable** : CEO veut feature qui expose données sensibles. Impact : régulation, réputation, légal.

**Situation 4 - Ressources insuffisantes** : CEO veut 3 projets, capacité pour 1. Dire oui = 3 échecs au lieu de 1 succès.

**Comment dire non efficacement** :

**Framework "Non, mais"** :
1. Reconnaître l'enjeu business : "Je comprends pourquoi c'est critique"
2. Expliquer le problème technique : "Voici pourquoi ce délai n'est pas réaliste"
3. Proposer 3 alternatives : A (rapide-et-sale), B (équilibré), C (robuste-et-long)
4. Recommander : "Je recommande B parce que..."
5. Laisser CEO choisir : "Qu'est-ce qui fait le plus sens pour vous ?"

**Les 3 niveaux d'alternatives** :

Alternative A - Rapide et sale : Timeline courte, scope réduit, dette assumée. Exemple : "Démo fonctionnelle en 1 semaine, mais code jetable."

Alternative B - Équilibré : Timeline réaliste, scope négocié, qualité acceptable. Exemple : "Feature v1 en 3 semaines, itérable, maintenable."

Alternative C - Robuste : Timeline longue, scope complet, zéro dette. Exemple : "Solution complète en 2 mois, scalable, extensible."

## Cadre de décision

Voici comment je dis non au CEO :

**1. Préparer les données**
Jamais dire non sur le feeling. Venir avec : estimation réaliste, risques identifiés, alternatives chiffrées. Ces données rendent le non crédible.

**2. Cadrer le non en termes business**
Pas "techniquement impossible", mais "cette timeline mènerait à un échec public, voici pourquoi et voici les alternatives".

**3. Toujours proposer alternatives**
Jamais juste "non". Toujours "non à ça, mais oui à ça". Cette approche transforme le non en négociation constructive.

**4. Laisser CEO choisir**
Présenter alternatives A/B/C, recommander, mais laisser CEO trancher selon priorités business. Respecter sa décision.

**5. Si CEO choisit l'impossible, documenter**
Si CEO insiste malgré explication, documenter par écrit : risques, timeline réaliste, conséquences. Cette trace protège si échec.

## Retour terrain

Ce que j'ai observé dans différentes situations :

**Le oui systématique qui détruit** : CTO qui ne dit jamais non. Promesses impossibles, échecs répétés, crédibilité perdue, replacement.

**Le non brutal qui isole** : "Impossible." Sans explication ni alternative. Résultat : CEO contourne le CTO, décisions prises sans tech, isolement progressif.

**Le "non, mais" qui renforce** : "Timeline 1 semaine impossible. Options : démo simulée en 3 jours, ou feature v1 en 2 semaines. Je recommande démo." CEO choisit démo, succès, confiance renforcée.

**L'exemple de courage** : CEO veut lancer feature sans tests sécurité. CTO dit non, explique risques RGPD, propose planning avec tests (2 semaines de plus). CEO initially frustré, accepte. Aucun incident, confiance renforcée à long terme.

## Erreurs fréquentes

**Ne jamais dire non**
Accepter toutes les demandes. Résultat : promesses impossibles, échecs, crédibilité détruite, burn-out.

**Dire non sans alternative**
"Impossible" sans proposer d'options. Résultat : CEO frustré, contournement, relation détériorée.

**Argumenter uniquement technique**
"L'architecture ne permet pas." CEO s'en fout. Mieux : "Cette approche créerait dette qui ralentirait delivery 40% pendant 6 mois."

**Ne pas documenter quand CEO insiste**
CEO insiste malgré warnings. Pas de trace écrite. Résultat : échec, CTO blâmé, "tu aurais dû dire non plus fort".

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Dire non plus tôt et plus clairement**
Ne pas laisser CEO s'engager avant d'avoir analysé. Exprimer doutes dès que demande arrive.

**Systématiser les 3 alternatives**
Framework A/B/C pour toute demande significative. Cette structure rend le "non, mais" automatique.

**Documenter par écrit**
Quand enjeu critique, email récapitulatif : demande, risques, alternatives, décision. Cette trace protège et clarifie.

**Mesurer et partager les résultats**
"Q2 : j'ai dit non à feature X, proposé alternative Y. Résultat : livrée avec succès, zéro dette." Cette visibilité justifie futurs non.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/livres/etre-ou-ne-pas-etre-cto/) explore la relation CTO-CEO avec des exemples de "non" bien et mal gérés.

Pour approfondir, tu peux aussi consulter l'article ["Dire non quand tous attendent oui"](/posts/dire-non-quand-tous-attendent-oui/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
