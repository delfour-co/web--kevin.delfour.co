---
author: [Kevin Delfour]
title: "Prompt engineering pour développeurs : structurer ses demandes à l'IA"
date: 2025-07-23
slug: "prompt-engineering-developpeurs-structurer-demandes"
description: "Un bon prompt ne demande pas de magie. Il demande de la clarté. Retour sur les principes qui font la différence quand on travaille avec une IA au quotidien."
categories: ["pratiques"]
series: [IA & Développement]
tags: [ia, prompt-engineering, productivite, workflow, bonnes-pratiques]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "tous"
audiences: ["tous"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Deux développeurs utilisent le même modèle pour générer un service d'authentification. Le premier tape : « Génère un service d'auth en Node.js ». Il obtient un code générique, plein de choix par défaut qu'il ne veut pas. Le second écrit : « Génère un service d'authentification Express avec JWT, refresh tokens en base Redis, middleware de vérification, gestion des erreurs HTTP standard. TypeScript strict. Pas de commentaires. » Il obtient une base exploitable en cinq minutes.

La différence n'est pas le modèle. C'est la demande.

Ce que j'ai observé : la plupart des développeurs interagissent avec l'IA comme ils feraient une recherche Google — en mots-clés flous. Or l'IA répond mieux quand on lui parle comme à un collègue compétent mais qui ne connaît pas le contexte.

## Le faux problème

La question habituelle : « Quel est le meilleur prompt pour [X] ? »

En réalité, il n'existe pas de prompt magique. Le prompt engineering n'est pas une collection de recettes. C'est une compétence de communication : savoir exprimer clairement ce qu'on veut, avec le bon niveau de contexte et de contrainte.

L'autre piège : croire que le prompt engineering est un métier à part entière pour les développeurs. Ce n'est pas le cas. C'est une extension naturelle de la capacité à rédiger un ticket, une spécification, ou un message de commit clair. Si tu sais écrire une bonne issue, tu sais écrire un bon prompt.

## Le vrai enjeu

Le vrai enjeu n'est pas la syntaxe du prompt. C'est la **clarté de l'intention**. Un prompt efficace répond à quatre questions :

### 1. Quel est le contexte ?

L'IA ne connaît pas ton projet, ta stack, tes contraintes. Plus tu fournis de contexte, plus la réponse sera pertinente. Ce n'est pas différent d'un brief à un prestataire externe.

- La stack utilisée (langage, framework, version)
- Les contraintes techniques (performance, compatibilité, sécurité)
- Le style de code attendu (conventions, linting, patterns)

### 2. Quel est le livrable attendu ?

« Génère du code » est trop vague. « Génère une fonction TypeScript qui prend X en entrée et retourne Y, avec gestion d'erreur » est actionnable. Plus le livrable est précis, moins il y a d'allers-retours.

### 3. Quelles sont les contraintes ?

Ce que tu ne veux pas est aussi important que ce que tu veux. « Pas de dépendance externe », « pas de classe, uniquement des fonctions », « pas de any en TypeScript » — ces négations cadrent l'IA et évitent les réponses hors sujet.

### 4. Quel est le format ?

Code seul ? Code avec explications ? Pseudo-code ? Liste de choix ? Tableau comparatif ? L'IA s'adapte au format demandé — mais si tu ne le précises pas, elle choisira pour toi.

## Cadre de décision

1. **Itérer plutôt que viser la perfection.** Le premier prompt est rarement le bon. Ce n'est pas un échec — c'est le fonctionnement normal. Envoyer un prompt, lire la réponse, affiner, relancer. Trois itérations valent mieux qu'un prompt de trente lignes.

2. **Découper les demandes complexes.** Ne pas demander « génère une API complète avec auth, CRUD, validation et tests ». Demander d'abord le schéma de données. Puis les routes. Puis la validation. Puis les tests. Chaque étape est vérifiable individuellement.

3. **Donner des exemples.** « Génère un test comme celui-ci : [exemple] » est plus efficace que « génère un bon test ». L'IA apprend du format que tu lui montres. Un seul exemple bien choisi vaut dix lignes d'instructions.

4. **Utiliser le contexte de conversation.** Les modèles modernes gardent le fil de la conversation. En tirer parti : « En reprenant le code précédent, ajoute la gestion des erreurs » est plus efficace que de tout re-spécifier.

5. **Relire systématiquement.** Le prompt engineering ne remplace pas la relecture. Il accélère la production, pas la validation. Chaque réponse doit être lue, comprise et vérifiée avant d'être utilisée.

## Retour terrain

Ce que j'ai constaté en observant les développeurs qui maîtrisent le mieux l'interaction avec l'IA :

- Ils passent plus de temps à formuler leur demande qu'à lire la réponse. Le ratio est souvent 60/40 en faveur de la rédaction du prompt.
- Ils utilisent des templates personnels : un format de prompt par type de tâche (test, refactoring, documentation, debug).
- Ils ne copient jamais le code généré sans le comprendre. La règle est simple : si tu ne peux pas l'expliquer, tu ne le commites pas.
- Ils considèrent l'IA comme un premier jet, pas comme un livrable final. Le code généré est un point de départ, pas une destination.

## Erreurs fréquentes

- **Le prompt trop vague.** « Améliore ce code » ne donne rien d'utile. Améliorer quoi ? La lisibilité ? La performance ? La testabilité ? Sans critère, l'IA devine — et elle devine souvent mal.
- **Le prompt trop long.** Un prompt de cinquante lignes avec dix contraintes contradictoires produit du bruit. Mieux vaut découper en étapes.
- **La confiance aveugle.** Accepter la première réponse sans la lire. L'IA produit du code plausible, pas du code correct. La différence est cruciale.
- **L'absence de contexte.** Demander « génère un composant React » sans préciser la version, le style (hooks vs classes), les dépendances autorisées, le système de design — c'est demander à l'IA de deviner ton projet.

## Si c'était à refaire

- Je créerais un fichier de prompts partagé dans l'équipe — un catalogue de templates testés pour les tâches récurrentes (tests, documentation, migrations, refactoring).
- J'intégrerais le prompt engineering dans l'onboarding technique. Pas comme un cours formel, mais comme un atelier pratique d'une heure.
- Je mesurerais la qualité des interactions, pas leur quantité. Dix prompts itératifs qui produisent du bon code valent plus que cent autocomplétons acceptées sans réflexion.

## Pour approfondir

- [Pratiques de développement](/articles/?cat=pratiques)
- [Assistants IA : au-delà de l'autocomplétion](/posts/assistants-ia-au-dela-autocompletion/)
- [IA et développement : collaborer avec ChatGPT et Copilot](/posts/ia-developpeur-collaborer-chatgpt-copilot/)
