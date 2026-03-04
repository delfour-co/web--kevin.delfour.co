---
author: [Kevin Delfour]
title: "Build vs Buy IA : développer en interne ou acheter une solution"
date: 2026-01-28
slug: "build-vs-buy-ia-developper-interne-ou-acheter"
description: "Faut-il construire ses propres capacités IA ou acheter des solutions ? Le cadre de décision classique s'applique, avec des nuances spécifiques à l'IA."
categories: ["décision"]
series: [IA & Développement]
tags: [ia, build-vs-buy, strategie, decision, cto, architecture]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un CEO demande à son CTO : « Il nous faut de l'IA dans le produit. » Le CTO a deux options. Option A : intégrer une API LLM (OpenAI, Anthropic, Mistral) et construire une couche d'intégration maison. Option B : acheter une solution SaaS qui fait « de l'IA » dans le domaine. Le CEO veut une réponse rapide. Le CTO sait que la réponse rapide est souvent la mauvaise.

Ce que j'ai observé : la question « build vs buy » en IA est plus complexe qu'ailleurs, parce que le marché est immature, les solutions évoluent tous les trois mois, et la différence entre ce qui est promis et ce qui est livré est souvent considérable.

## Le faux problème

La question habituelle : « Vaut-il mieux construire ou acheter ? »

En réalité, la question est rarement binaire. La plupart des solutions viables en IA sont hybrides : une brique externe (API de modèle, service managé) intégrée dans une couche métier interne. Le vrai choix n'est pas « tout construire vs tout acheter ». C'est « où placer la frontière entre ce qu'on maîtrise et ce qu'on délègue ».

## Le vrai enjeu CTO

Le vrai enjeu est de **protéger la valeur métier** tout en évitant de réinventer ce qui n'a pas besoin de l'être.

### Quand construire

- **Le différenciant métier est dans l'IA.** Si l'IA est le produit — si c'est elle qui crée la valeur pour le client — la construire en interne est souvent nécessaire. Déléguer son avantage compétitif à un tiers est risqué.
- **Les données sont sensibles ou spécifiques.** Si le modèle doit être entraîné sur des données propriétaires, internes, ou réglementées, un service externe peut ne pas être compatible.
- **La latence et la fiabilité sont critiques.** Dépendre d'une API externe pour un chemin critique du produit est un risque. Si l'API est indisponible, le produit est indisponible.

### Quand acheter

- **L'IA est un complément, pas le cœur.** Un chatbot de support, une recherche sémantique, une aide à la rédaction — si l'IA améliore une fonctionnalité sans en être le cœur, acheter est plus rapide et moins risqué.
- **L'équipe n'a pas les compétences ML.** Construire une solution IA sans compétence ML interne, c'est naviguer à l'aveugle. Mieux vaut utiliser une API bien documentée qu'un modèle mal maîtrisé.
- **Le time-to-market est critique.** Une API s'intègre en quelques jours. Un modèle interne prend des mois. Si la fenêtre de marché est courte, acheter fait sens.

## Cadre de décision

1. **Identifier où se situe la valeur.** Si la valeur est dans les données et la logique métier, construire la couche d'intégration en interne et utiliser un modèle externe comme moteur. Si la valeur est dans le modèle lui-même, envisager le fine-tuning ou l'entraînement interne.

2. **Évaluer le coût total sur 18 mois.** Pas sur 3 mois. Inclure : coût de l'API (qui peut augmenter), coût de maintenance, coût de migration si le fournisseur change ses termes, coût humain d'intégration et de suivi.

3. **Tester la réversibilité.** Si le fournisseur triple ses prix dans six mois, ou s'il est racheté, ou s'il change son API — quel est le coût de migration ? Plus le couplage est fort, plus le risque est élevé.

4. **Commencer par acheter, puis internaliser si nécessaire.** L'approche la plus pragmatique : utiliser une API externe pour valider le cas d'usage. Si la valeur est confirmée et que le volume justifie l'investissement, internaliser progressivement.

5. **Ne pas construire ce qui sera commoditisé.** Les modèles de fondation (GPT, Claude, Llama) sont en voie de commoditisation. Construire un modèle de langage from scratch n'a aucun sens pour 99 % des entreprises. L'avantage est dans la couche métier au-dessus du modèle.

## Retour terrain

**Cas 1** — Une startup construit un modèle NLP spécialisé pendant huit mois. Coût : 400K en salaires et infrastructure. Résultat : le modèle est dépassé par une API commerciale sortie deux mois après le lancement. L'équipe aurait pu intégrer l'API en trois semaines.

**Cas 2** — Une entreprise utilise une API LLM pour un cas d'usage critique (analyse de contrats juridiques). Le fournisseur change ses conditions d'utilisation et interdit l'usage sur des données réglementées. Migration d'urgence en six semaines, avec interruption de service.

**Cas 3** — Approche hybride : API externe comme moteur, couche métier interne pour le prompt engineering, le RAG et la logique de scoring. Quand le fournisseur augmente ses prix, l'équipe switch vers un autre modèle en deux semaines — parce que la couche d'abstraction était en place.

Ce que j'ai constaté : l'approche hybride avec couche d'abstraction est celle qui survit le mieux à la volatilité du marché IA.

## Erreurs fréquentes

- **Construire « parce qu'on est techniques ».** La capacité à construire n'est pas une raison suffisante. La question est : est-ce le meilleur usage du temps de l'équipe ?
- **Acheter sans plan de sortie.** Le vendor lock-in en IA est rapide et douloureux. Toujours avoir une couche d'abstraction entre le produit et le fournisseur.
- **Sous-estimer le coût d'opération.** Un modèle en production demande du monitoring, du fine-tuning, de la gestion de drift, de l'infrastructure. Ce n'est pas un déploiement one-shot.
- **Décider sous pression.** Le CEO veut de l'IA. Le board veut de l'IA. La pression ne justifie pas un mauvais choix architectural. Prendre le temps de décider correctement.

## Si c'était à refaire

- Je commencerais toujours par une API externe pour valider le cas d'usage. Le build interne vient après la validation, pas avant.
- Je construirais une couche d'abstraction dès le jour 1 — même pour un POC. Le coût est minime, et le jour où il faut changer de fournisseur, la migration est triviale.
- Je documenterais les critères de bascule : à quel volume, à quel coût, avec quelles contraintes, le build interne devient plus pertinent que l'achat.

## Pour approfondir

- [Gouvernance et décision](/articles/?cat=décision)
- [Build vs Buy vs Partner : cadre de décision](/posts/build-vs-buy-vs-partner-cadre-decision/)
- [Évaluer un outil IA : grille de décision pour CTO](/posts/evaluer-outil-ia-grille-decision-cto/)
