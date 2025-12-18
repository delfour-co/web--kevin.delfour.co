---
author: ["Kevin Delfour"]
title: "Code review : outil de qualité ou terrain de guerre d'ego ?"
date: 2024-12-09
slug: "code-review-qualite-ou-guerre-ego"
description: "La code review peut élever la qualité ou détruire la confiance. Tout dépend de comment elle est pratiquée."
categories: ["culture"]
series: ["Culture"]
tags: ["code-review", "qualite", "collaboration", "culture"]
pillar: "culture-management"
pillars: ["culture-management"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Commentaire sur une pull request : "Ça, c'est du code de junior. Refais tout." Le développeur ne contribuera plus jamais avec la même confiance. La code review vient de passer d'outil de qualité à arme de destruction.

Ce que j'ai observé : la code review est l'un des rituels les plus puissants pour la qualité ET la culture. Elle peut construire ou détruire. Rarement neutre.

## Le faux problème

Le faux problème serait de croire que la code review sert uniquement à trouver des bugs. En réalité, elle sert à partager connaissance, aligner standards, et renforcer culture.

Un autre faux problème : penser que toute critique est bonne à dire. En réalité, la manière dont on formule compte autant que ce qu'on dit.

## Le vrai enjeu CTO

Le vrai enjeu est de faire de la code review un outil d'amélioration continue sans toxicité :

**Les 3 dérives de la code review** :

**Dérive 1 - Le terrain d'ego** : Signaux : commentaires méprisants, ton condescendant, critique de la personne (pas du code). Exemples : "T'as vraiment codé ça ?", "Un dev senior ferait jamais ça", "C'est évident, non ?" Impact : peur de soumettre PR, créativité tuée, culture toxique. Cause racine : insécurité du reviewer, absence de guidelines comportement.

**Dérive 2 - Le blocage systématique** : Signaux : reviewer demande perfection absolue, bloque pour des détails mineurs, change avis entre reviews. Exemples : "Cette variable devrait s'appeler X pas Y", "Refactor tout avant merge", demandes contradictoires. Impact : vélocité effondrée, frustration massive, évitement du reviewer. Cause racine : perfectionnisme, absence de définition "good enough".

**Dérive 3 - Le rubber stamp** : Signaux : LGTM systématique sans vraie lecture, approbation en 30 secondes sur 500 lignes. Impact court terme : vélocité élevée. Impact long terme : qualité dégradée, bugs en prod, dette technique. Cause racine : surcharge, manque de temps, désengagement.

**Les 5 principes d'une code review saine** :

**Principe 1 - Critiquer le code, jamais la personne** : ✅ Bon : "Ce code a cette vulnérabilité [lien]. On pourrait faire X." ❌ Mauvais : "Tu n'as pas pensé à la sécurité ?" Impact : préserve dignité, focus sur amélioration.

**Principe 2 - Expliquer le pourquoi** : ✅ Bon : "Cette approche risque de créer une fuite mémoire parce que [raison]. Alternative : [suggestion]." ❌ Mauvais : "Change ça, c'est pas bon." Impact : éducation vs autorité.

**Principe 3 - Distinguer blocker vs nice-to-have** : Blockers : bugs, vulnérabilités sécurité, violations standards critiques. Nice-to-have : refactoring, optimisations mineures, préférences styling. Convention : préfixer "nit:" ou "question:" pour non-bloquant. Impact : clarté sur ce qui doit changer vs ce qui peut attendre.

**Principe 4 - Reconnaître ce qui est bien** : Pas seulement critiquer. Aussi : "Nice approche ici", "Bon test case". Impact : renforce positif, montre que review n'est pas juste critique.

**Principe 5 - Limiter scope et durée** : Max 400 lignes par review (au-delà, efficacité s'effondre). Max 60 minutes. Target : 24h pour première réponse. Impact : qualité review, vélocité préservée.

## Cadre de décision

Voici comment je structure la code review :

**1. Guidelines écrites et partagées**
Document : quoi vérifier (sécurité, tests, lisibilité), comment commenter (ton, format), qu'est-ce qui bloque vs nice-to-have. Ces règles explicites évitent dérive.

**2. Template de review**
Checklist : tests présents ? sécurité vérifiée ? doc mise à jour ? breaking changes ? Cela structure et accélère.

**3. Culture du feedback constructif**
Formation : comment donner feedback technique sans blesser. Sanction : commentaire méprisant = feedback immédiat du manager. Cette rigueur protège culture.

**4. Limiter taille des PRs**
Guideline : max 400 lignes. Si plus, découper. Cette contrainte améliore qualité review.

**5. Mesurer santé du processus**
Métriques : temps moyen review, nombre iterations, % PRs bloquées >48h. Survey : "Code review aide ou freine ?" Ces données révèlent dysfonctionnements.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**La review toxique** : Dev senior commente avec mépris. "Ce code est nul." Pas de suggestion constructive. Junior terrorisé, arrête de proposer idées. Résultat : innovation tuée, turnover junior élevé.

**Le perfectionnisme bloquant** : Reviewer demande refactor complet pour chaque PR. 5-8 allers-retours. Vélocité divisée par 3. Résultat : frustration massive, devs évitent ce reviewer, silos se créent.

**La review qui éduque** : PR soumise. Commentaire : "Cette approche risque un race condition ici [lien article]. Alternative : [suggestion code]. Qu'en penses-tu ?" → Discussion constructive. Résultat : bug évité, junior apprend, relation renforcée.

**L'exemple des guidelines** : Guidelines écrites : ton respectueux obligatoire, critiquer code pas personne, distinguer blocker ("🚫") vs suggestion ("💡"). Premier commentaire méprisant → manager intervient. Résultat : culture review saine en 2 mois.

## Erreurs fréquentes

**Pas de guidelines comportement**
Guidelines uniquement techniques, rien sur ton et approche. Résultat : dérives ego tolérées.

**Taille PRs illimitée**
PRs de 2000 lignes. Résultat : reviews superficielles ou bloquées des jours.

**Perfectionnisme non-calibré**
Bloquer pour des détails mineurs. Résultat : vélocité effondrée, frustration.

**Ne jamais reconnaître le positif**
Uniquement critiquer. Résultat : code review perçue comme punition.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Guidelines code review dès 3 personnes**
Document clair : quoi vérifier, comment commenter, blockers vs nice-to-have. Cette structure évite dérive.

**Formation feedback technique**
Workshop : comment critiquer code sans blesser personne. Roleplay. Cette compétence s'apprend.

**Limiter taille PRs**
Max 400 lignes. Si plus, découper ou justifier exception. Cette contrainte améliore qualité.

**Mesurer satisfaction review**
Survey trimestriel : "Code review aide ou freine ?" 1-10. Score <7 = action corrective. Cette mesure détecte toxicité.

## Pour approfondir

Le livre [\"Être ou ne pas être CTO\"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment créer des pratiques techniques qui renforcent la culture.

Pour approfondir, tu peux aussi consulter l'article [\"Feedback difficile\"](/posts/feedback-difficile-dire-verite-sans-detruire/) ou les autres contenus du pilier [\"Culture & management\"](/culture-management/).
