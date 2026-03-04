---
author: [Kevin Delfour]
title: "IA et sécurité du code : nouveaux risques, nouvelles pratiques"
date: 2026-01-14
slug: "ia-securite-code-nouveaux-risques"
description: "L'IA accélère le développement. Elle accélère aussi les failles. Tour d'horizon des risques de sécurité introduits par l'IA — et des pratiques pour les contenir."
categories: ["craft"]
series: [IA & Développement]
tags: [ia, securite, vulnerabilites, owasp, risque, bonnes-pratiques]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un développeur génère un endpoint d'API avec un assistant IA. Le code fonctionne, les tests passent. En code review, personne ne remarque que la requête SQL utilise une concaténation de string au lieu d'un paramètre préparé. L'injection SQL passe en production. Pas parce que le développeur ne savait pas — mais parce que le code généré semblait correct et que la vigilance était relâchée.

Ce que j'ai observé : l'IA ne crée pas de nouveaux types de failles. Elle amplifie les failles existantes en les rendant plus fréquentes et plus difficiles à détecter — parce que le code généré a l'apparence de la qualité.

## Le faux problème

La question habituelle : « L'IA produit-elle du code sécurisé ? »

En réalité, l'IA produit du code qui ressemble à du code sécurisé. Elle utilise les patterns les plus courants de ses données d'entraînement. Si les patterns courants sont sécurisés, le code l'est. Si les exemples les plus fréquents contiennent des raccourcis dangereux — et beaucoup en contiennent — l'IA les reproduit.

## Le vrai enjeu

Le vrai enjeu est double : les **failles dans le code généré** et les **fuites de données vers les outils IA**.

### Les risques dans le code généré

- **Injection (SQL, XSS, command injection).** L'IA génère fréquemment du code qui construit des requêtes par concaténation plutôt que par paramétrage. Le pattern fonctionne dans le cas nominal — et crée une faille.
- **Gestion des secrets.** Le code généré peut inclure des tokens en dur, des clés d'API dans les constantes, des mots de passe par défaut. L'IA reproduit ce qu'elle a vu dans les exemples.
- **Validation insuffisante des entrées.** Le code généré valide souvent le format (est-ce un email ?) mais pas le contenu (est-ce un email autorisé ?). La validation métier est systématiquement absente.
- **Dépendances vulnérables.** L'IA peut suggérer des packages obsolètes ou vulnérables. Elle recommande ce qui est populaire dans ses données d'entraînement — pas ce qui est à jour.

### Les risques de fuite de données

- **Code propriétaire envoyé en clair.** Chaque prompt contenant du code est envoyé à un serveur externe. Sans politique claire, du code critique fuit sans contrôle.
- **Données clients dans les prompts.** Un développeur qui debug un problème avec des données réelles peut envoyer des données personnelles à un service tiers.
- **Contexte accumulé.** Certains outils gardent le contexte de conversation. Ce contexte peut contenir des informations sensibles accessibles à d'autres requêtes.

## Cadre de décision

1. **Ajouter une étape de revue sécurité pour le code IA.** Pas une revue complète — un scan ciblé sur les patterns de vulnérabilité connus : injections, gestion des secrets, validation des entrées, dépendances. Peut être automatisé avec un SAST.

2. **Interdire les données réelles dans les prompts.** Utiliser des données synthétiques ou anonymisées pour le debug et les tests. La règle doit être explicite et connue de tous.

3. **Scanner les dépendances suggérées.** Avant d'ajouter un package recommandé par l'IA, vérifier sa version, ses vulnérabilités connues et sa maintenance active. Un `npm audit` ou un `snyk test` prend trente secondes.

4. **Former aux patterns de vulnérabilité, pas à l'IA.** Les développeurs qui connaissent les failles OWASP les détectent dans le code IA comme dans le code humain. La compétence de sécurité est indépendante de l'outil utilisé.

5. **Maintenir un inventaire des outils IA et de leurs politiques de données.** Savoir exactement où va le code envoyé à chaque outil. Certains outils stockent les données pour l'entraînement — d'autres non. La différence est critique.

## Retour terrain

Ce que j'ai constaté :

- Les failles les plus fréquentes dans le code IA sont les injections SQL et XSS. Ce sont aussi les failles les mieux connues — mais la vigilance baisse quand le code « semble propre ».
- Les équipes qui ont intégré un SAST dans leur pipeline CI détectent la plupart de ces failles automatiquement. L'investissement est faible, le retour est élevé.
- Les fuites de données vers les outils IA sont presque toujours involontaires. Un canal de communication clair (« ne jamais envoyer de données réelles ») réduit le risque de 90 %.

## Erreurs fréquentes

- **Faire confiance au code IA parce qu'il « compile et passe les tests ».** Un code peut compiler, passer les tests et être vulnérable. La sécurité ne se teste pas avec des tests unitaires classiques.
- **Ne pas auditer les outils IA utilisés par l'équipe.** Si tu ne sais pas quels outils tes développeurs utilisent et où vont les données, tu as un problème de sécurité — pas un problème d'IA.
- **Déléguer la sécurité à l'IA.** « L'IA va détecter les failles » — non. L'IA peut aider, mais elle peut aussi les introduire. La sécurité reste une responsabilité humaine.

## Si c'était à refaire

- J'intégrerais un SAST dans le pipeline CI dès le premier jour de l'adoption d'outils IA. Pas après le premier incident.
- Je ferais un atelier de 30 minutes sur les failles OWASP courantes dans le code généré — avec des exemples réels tirés de l'équipe.
- Je rédigerais une check-list de 5 points à vérifier avant de merger du code assisté par IA : injections, secrets, validation, dépendances, données.

## Pour approfondir

- [Architecture et craft](/articles/?cat=craft)
- [Hallucinations et fiabilité : quand l'IA se trompe](/posts/hallucinations-ia-fiabilite-production/)
- [Gouvernance IA en entreprise : cadrer sans bloquer](/posts/gouvernance-ia-entreprise-cadrer-sans-bloquer/)
