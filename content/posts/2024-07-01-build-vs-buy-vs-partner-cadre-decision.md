---
author: ["Kevin Delfour"]
title: "Build vs Buy vs Partner : un cadre de décision pragmatique"
date: 2024-07-01
slug: "build-vs-buy-vs-partner-cadre-decision"
description: "Construire, acheter ou s'associer : comment décider face à ce trilemme classique."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["decision", "strategie", "build-vs-buy", "architecture"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"On doit implémenter un système de paiement. On le code nous-mêmes, on prend Stripe, ou on s'associe avec un partenaire fintech ?" Cette question, tout CTO l'a déjà rencontrée des dizaines de fois.

Ce que j'ai observé : la décision Build vs Buy vs Partner revient constamment. Sans cadre clair, elle se prend au feeling ou selon les préférences techniques. Avec un cadre, elle devient rationnelle.

## Le faux problème

Le faux problème serait de croire qu'il existe une réponse universelle. "Toujours acheter" ou "Toujours construire" sont également faux. La bonne réponse dépend du contexte.

Un autre faux problème : évaluer uniquement sur le coût immédiat. En réalité, le TCO (Total Cost of Ownership) sur 3 ans change souvent la conclusion.

## Le vrai enjeu CTO

Le vrai enjeu est de structurer la décision avec des critères objectifs :

**Les 3 options expliquées** :

**Build (construire en interne)** : Avantages : contrôle total, différenciation possible, pas de dépendance externe, données en interne. Inconvénients : temps de dev, coût développement + maintenance, compétences à avoir, risque de sous-estimer.

**Buy (acheter SaaS/licence)** : Avantages : rapidité (jours vs mois), maintenance externalisée, features matures, expertise du vendor. Inconvénients : coût récurrent, dépendance vendor, personnalisation limitée, risque lock-in.

**Partner (s'associer)** : Avantages : mutualisation coûts, expertise partagée, réseau/distribution. Inconvénients : gouvernance complexe, alignement stratégique nécessaire, risque relationnel, partage de valeur.

**Le framework de décision** :

**Critère 1 - Différenciation** : Est-ce un avantage compétitif pour nous ? Core business → Build. Commodity → Buy. Nouveau marché → Partner.

**Critère 2 - Complexité** : Simple et mature → Buy. Complexe et spécifique → Build. Très complexe et hors expertise → Partner.

**Critère 3 - TCO 3 ans** : Coût build : dev initial + maintenance (souvent sous-estimé ×2). Coût buy : licences × 36 mois + intégration. Coût partner : investissement + sharing.

**Critère 4 - Time to market** : Besoin immédiat → Buy. Peut attendre 3-6 mois → Build. Expérimentation → Partner (test de marché).

**Critère 5 - Compétences** : Expertise en interne → Build possible. Pas d'expertise → Buy ou Partner. Compétence stratégique à développer → Build comme investissement.

## Cadre de décision

Voici ma matrice pour décider :

**1. Scoring simple (0-10 par critère)**
- Différenciation compétitive (10 = cœur business)
- Complexité technique (10 = très complexe)
- Urgence (10 = besoin immédiat)
- Compétences internes (10 = expertise forte)
- Budget disponible (10 = budget large)

**2. Interpréter les scores**
- Build si : différenciation >7, compétences >7, urgence <5
- Buy si : différenciation <4, urgence >7, ou complexité trop haute vs compétences
- Partner si : nouveau marché, complexité très haute, ou mutualisation intéressante

**3. Calculer TCO sur 3 ans**
Exemple paiement :
- Build : 6 mois × 2 devs (120k€) + 20% maintenance/an (48k€ sur 3 ans) = 168k€
- Buy Stripe : 2.9% + 0.25€/transaction × volume + intégration (10k€) = calculer selon volume
- Partner : négocier revshare + investissement initial

**4. Tester avec MVP si incertitude**
Si hésitation, commencer par Buy (rapide), puis Build si ça devient stratégique. Ou Partner en pilote.

**5. Critères de révision**
"On Buy maintenant, mais on revisite dans 12 mois si volume × 10." Cette clause évite la paralysie.

## Retour terrain

Ce que j'ai observé dans différentes décisions :

**Le build raté** : Système de facturation construit en interne. "On est une tech company, on sait faire." Sous-estimation ×3, 18 mois au lieu de 6, coût réel 400k€ vs 80k€ si Buy. Leçon : pas une différenciation, était un Buy.

**Le buy qui limite** : Pris Salesforce pour CRM, customisation impossible pour cas spécifiques. Lock-in progressif, dépendance totale. Leçon : quand c'est différenciant, Build peut avoir du sens.

**Le partner qui marche** : S'associer avec un acteur logistique pour nouvelle offre. Mutualisation expertise, accès marché, partage risque. Résultat : succès partagé, ROI rapide.

**La transition Build→Buy** : Construit système de monitoring custom. Maintenance 30% temps équipe. Migration vers Datadog. Résultat : -70% coût, features meilleures, équipe focus sur différenciation.

## Erreurs fréquentes

**Build par ego technique**
"On est capables de le faire." Oui, mais est-ce qu'on devrait ? Résultat : temps et argent gaspillés sur du non-différenciant.

**Buy sans évaluer TCO**
Prendre SaaS sans calculer coût sur 3 ans. Résultat : surprise à 300k€/an alors qu'on pensait 50k€/an.

**Partner sans gouvernance claire**
S'associer sans définir qui décide quoi. Résultat : blocages, désalignement, échec du partenariat.

**Sous-estimer le coût du Build**
Oublier la maintenance (souvent 20-30% du coût initial par an). Résultat : TCO réel × 2-3 vs estimé.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Systématiser le framework**
Utiliser la matrice scoring pour toute décision Build/Buy/Partner. Cette rigueur évite les décisions au feeling.

**Calculer TCO 3 ans systématiquement**
Ne jamais décider sans ce calcul. Inclure maintenance, évolution, coût opportunité.

**Commencer par Buy, migrer vers Build si nécessaire**
Stratégie par défaut : Buy pour valider rapidement, puis Build si ça devient différenciant et le volume le justifie.

**Documenter la décision et les critères de révision**
ADR avec : option choisie, scoring, TCO, et "on révise si X change". Cette clause permet d'ajuster.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/livres/etre-ou-ne-pas-etre-cto/) explore différentes décisions Build/Buy/Partner avec leurs résultats à long terme.

Pour approfondir, tu peux aussi consulter l'article ["Dette technique"](/posts/dette-technique-cto-gestion-compromis-strategies/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
