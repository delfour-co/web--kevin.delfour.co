---
author: [Kevin Delfour]
title: "Pair programming : une pratique, pas un dogme"
date: 2026-03-01
slug: "pair-programming-pratique-pas-dogme"
description: "Le pair programming divise. Certains y voient un accélérateur, d'autres une perte de temps. Ce qui compte, c'est comment et quand l'utiliser."
categories: ["pratiques"]
series: [Collaboration]
tags: [pair-programming, collaboration, qualite, apprentissage, equipe]
pillar: "culture-management"
pillars: ["culture-management"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un tech lead pousse le pair programming dans son équipe. Deux développeurs seniors refusent : « On va deux fois moins vite. » Un junior, lui, adore — il apprend énormément. Le tech lead insiste. Les seniors se braquent. Trois semaines plus tard, le pair programming est abandonné. Tout le monde en conclut que « ça ne marche pas chez nous ».

Ce que j'ai observé, après avoir accompagné des équipes qui ont adopté — puis parfois abandonné — le pair programming : le problème n'est presque jamais la pratique elle-même. C'est la manière dont elle est introduite, cadrée et ajustée.

## Le faux problème

La question habituelle : « Le pair programming, c'est efficace ou pas ? »

En réalité, cette question n'a pas de réponse universelle. Le pair programming n'est ni un silver bullet ni une perte de temps. C'est un outil. Et comme tout outil, son efficacité dépend du contexte, du moment et des personnes impliquées.

L'autre piège : croire que le pair programming, c'est « deux personnes devant un écran ». Cette vision réductrice ignore la diversité des formats et des intentions derrière la pratique.

## Le vrai enjeu

Le vrai enjeu n'est pas de savoir si le pair programming est « bien » ou « mal ». C'est de comprendre **quand il apporte de la valeur** et **quand il en détruit**.

### Ce que le pair programming fait bien

- **Transfert de contexte** : quand un développeur rejoint un projet ou un module qu'il ne connaît pas, une session de pairing vaut dix lectures de documentation.
- **Résolution de problèmes complexes** : deux regards sur un bug difficile ou une décision d'architecture réduisent le risque de s'enfermer dans une impasse.
- **Montée en compétence** : un junior qui travaille avec un senior absorbe des réflexes, des raccourcis, des raisonnements qu'aucun tutoriel ne transmet.
- **Qualité du code** : la revue se fait en temps réel. Moins de surprises en code review, moins d'allers-retours.

### Ce que le pair programming fait mal

- **Tâches mécaniques** : écrire des tests unitaires sur un CRUD, configurer un pipeline CI, rédiger de la documentation — pas besoin d'être deux.
- **Exploration individuelle** : quand un développeur a besoin de tâtonner, d'essayer, de se tromper seul avant de converger.
- **Fatigue cognitive** : une journée entière de pairing épuise. Le cerveau n'est pas fait pour maintenir une attention partagée huit heures d'affilée.

## Cadre de décision

Avec le recul, voici les principes qui m'ont semblé les plus utiles pour intégrer le pair programming sans créer de rejet.

1. **Commencer par les moments où la valeur est évidente.** Onboarding, bugs critiques, décisions d'architecture. Pas sur les tâches de routine. Si la première expérience de pairing est ennuyeuse, la pratique est morte avant d'avoir commencé.

2. **Laisser le choix du format.** Driver/navigator, ping-pong, strong-style — chaque binôme trouvera ce qui lui convient. Imposer un format unique, c'est ignorer que les gens pensent différemment.

3. **Limiter la durée.** Des sessions de 45 à 90 minutes, avec une pause. Pas des journées entières. Le pair programming fatigue, et la fatigue produit du mauvais code et de la frustration.

4. **Ne jamais forcer.** Un développeur qui ne veut pas faire de pairing ne fera pas du bon pairing. Mieux vaut comprendre sa résistance — souvent légitime — que l'ignorer.

5. **Mesurer l'impact sur le flux, pas sur le nombre de lignes.** Le pair programming ralentit la production brute. Mais il accélère souvent le cycle complet : moins de bugs en review, moins de retours, moins de contexte perdu. C'est le throughput global qui compte, pas la vélocité individuelle.

## Retour terrain

Ce que j'ai constaté dans les équipes qui ont réussi à intégrer le pair programming durablement :

- Elles ne l'ont pas imposé comme une règle. Elles l'ont proposé comme une option, puis les résultats ont fait le reste.
- Elles ont commencé petit : une ou deux sessions par semaine, sur des sujets ciblés.
- Elles ont accepté que certaines personnes préfèrent travailler seules — et ce n'est pas un problème.
- Elles ont constaté une baisse des bugs en production et une amélioration de la cohérence du code, sans pouvoir l'attribuer uniquement au pairing — mais la corrélation était là.

À l'inverse, les équipes qui ont échoué avaient en commun un point : le pair programming avait été décrété, pas adopté.

## Erreurs fréquentes

- **Imposer le pair programming à toute l'équipe, tout le temps.** Résultat : rejet massif et perte de confiance dans la pratique.
- **Ne pas cadrer les sessions.** Sans objectif clair (résoudre ce bug, comprendre ce module, prendre une décision sur cette architecture), la session dérive et devient frustrante.
- **Ignorer l'asymétrie.** Un binôme senior/junior fonctionne si le senior accepte de ralentir. Si ce n'est pas le cas, le junior subit et n'apprend rien.
- **Confondre pair programming et surveillance.** Si la motivation est de « vérifier que le développeur travaille bien », ce n'est pas du pairing. C'est du contrôle. Et ça se sent.

## Si c'était à refaire

- Je ne commencerais jamais par une règle. Je commencerais par une invitation : « On essaie sur ce sujet ? »
- Je protégerais les plages de travail solo. Le deep work individuel reste indispensable.
- Je formerais les tech leads au rôle de facilitateur de pairing — savoir quand proposer, quand insister doucement, quand lâcher.
- Je mesurerais l'impact sur la durée (3 mois minimum), pas sur une semaine d'expérimentation.

## Pour approfondir

- [Qualité et pratiques de développement](/articles/?cat=pratiques)
- [Code review : cultiver la bienveillance sans sacrifier la qualité](/posts/code-review-culture-bienveillante/)
- [Sécurité psychologique : créer un environnement où l'on ose parler](/posts/securite-psychologique-environnement-oser-parler/)
