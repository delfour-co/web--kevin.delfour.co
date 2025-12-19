---
author:
- Kevin Delfour
title: 'API Versioning : Gérer les breaking changes sans casser les clients'
date: 2025-11-21
description: Faire évoluer une API sans casser les clients existants ? Stratégies
  de versioning pragmatiques et patterns de backward compatibility éprouvés en prod.
categories:
- architecture
series:
- Architecture
tags:
- api
- versioning
- architecture
- backward-compatibility
- developpement
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
---
## Situation réelle

"On doit changer ce endpoint mais 500 clients l'utilisent." Cette situation n'est pas une fatalité. Le versioning d'API résout ce problème.

Ce que j'ai observé : le problème Breaking changes. Scénario classique (V1 API 1000 clients utilisent ça GET /api/users/123 id 123 name Alice email alice@example.com V2 On veut séparer prénom/nom GET /api/users/123 id 123 firstName Alice Breaking change lastName Smith email alice@example.com Résultat 1000 clients cassés Besoin Faire évoluer API sans casser existant). Versioning d'API n'est pas optionnel. C'est promesse clients : Stabilité, Prévisibilité, Temps migration. Best practices : URL versioning /api/v1 /api/v2, Backward compatible quand possible, Deprecation graduelle 6 mois minimum, Communication proactive, Monitoring usage. Éviter breaking changes : Additive changes only, GraphQL si possible, BFF pattern.

## Le faux problème

Le faux problème serait de croire qu'il faut éviter tout breaking change. En réalité, les breaking changes sont parfois nécessaires. L'important est de les gérer correctement : URL versioning /api/v1 /api/v2, Backward compatible quand possible, Deprecation graduelle 6 mois minimum, Communication proactive, Monitoring usage. Cette gestion réduit l'impact sur les clients.

Un autre faux problème : penser qu'il faut choisir une seule stratégie de versioning. En réalité, les stratégies peuvent être combinées selon contexte. Stratégies versioning : Strategy 1 URL versioning (GET /api/v1/users/123 Ancien format GET /api/v2/users/123 Nouveau format Avantages Simple explicite Cache HTTP friendly Routage facile Inconvénients Duplication code potentielle URLs multiples même resource Quand utiliser APIs publiques breaking changes majeurs), Strategy 2 Header versioning (GET /api/users/123 Accept application/vnd.myapi.v2+json Returns V2 format GET /api/users/123 Accept application/vnd.myapi.v1+json Returns V1 format Avantages URL unique RESTful pur Flexible Inconvénients Moins évident hidden in headers Cache complexe Debugging plus dur Quand utiliser APIs internes contrôle client fort), Strategy 3 Query parameter (GET /api/users/123?version=2 GET /api/users/123?version=1 Avantages Simple Visible URL Inconvénients Pas RESTful). Cette diversité permet de choisir selon contexte.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment faire évoluer une API sans casser les clients existants :

**Le problème Breaking changes** : Scénario classique (V1 API 1000 clients utilisent ça GET /api/users/123 id 123 name Alice email alice@example.com V2 On veut séparer prénom/nom GET /api/users/123 id 123 firstName Alice Breaking change lastName Smith email alice@example.com Résultat 1000 clients cassés Besoin Faire évoluer API sans casser existant). Ce problème coûte cher : clients cassés, confiance perdue, support élevé.

**Stratégies versioning** : Strategy 1 URL versioning (GET /api/v1/users/123 Ancien format GET /api/v2/users/123 Nouveau format Avantages Simple explicite Cache HTTP friendly Routage facile Inconvénients Duplication code potentielle URLs multiples même resource Quand utiliser APIs publiques breaking changes majeurs). Strategy 2 Header versioning (GET /api/users/123 Accept application/vnd.myapi.v2+json Returns V2 format GET /api/users/123 Accept application/vnd.myapi.v1+json Returns V1 format Avantages URL unique RESTful pur Flexible Inconvénients Moins évident hidden in headers Cache complexe Debugging plus dur Quand utiliser APIs internes contrôle client fort). Strategy 3 Query parameter (GET /api/users/123?version=2 GET /api/users/123?version=1 Avantages Simple Visible URL Inconvénients Pas RESTful). Cette diversité permet de choisir selon contexte.

**Patterns backward compatibility** : Pattern 1 Additive changes only (Ajouter nouveau field NON breaking change Ajouter nouvel endpoint NON breaking change Ajouter enum value NON usually Deprecate avec support NON breaking change). Pattern 2 Adapter pattern (V1 interface ancien interface UserV1 id number name string V2 interface nouveau interface UserV2 id number firstName string lastName string Adapter V2 → V1 function toV1 userV2 UserV2 UserV1 return id userV2.id name userV2.firstName userV2.lastName V1 endpoint utilise V2 data + adapter app.get /api/v1/users/:id async req res const userV2 await getUserV2 req.params.id const userV1 toV1 userV2 res.json userV1 V1 maintenu sans code dupliqué). Pattern 3 Feature flags per version (const features v1 newPagination false expandedFields false v2 newPagination true expandedFields true app.get /api/:version/users req res const version req.params.version v1 or v2 const config features version Si config.newPagination Nouvelle pagination else Ancienne pagination). Ces patterns facilitent la backward compatibility.

**Migration clients plan** : Phase 1 Annonce Mois 0 (Breaking Change Announcement What User API v2 released Why Better naming more fields When V1 deprecated 6 months Migration guide Detailed guide examples Support Slack #api-migration Email api-support@company.com). Phase 2 Deprecation headers Mois 1-3 (HTTP/1.1 200 OK Deprecation true Sunset Wed 1 Jun 2025 12:00:00 GMT Link /api/v2/users rel="successor-version" id 123 name Alice). Phase 3 Monitoring Mois 1-6 (Track V1 usage app.use /api/v1 req res next metrics.increment api.v1.usage endpoint req.path client req.headers user-agent next Dashboard V1 API Usage Total calls 12,500/day Unique clients 45 Top clients still V1 mobile-app 8k calls/day partner-acme 3k legacy-cron 1k). Phase 4 Outreach Mois 4-5 (Email top V1 users Subject Action Required Migrate V2 June 1st Hi client_name Your app still uses V1 API 12k calls/day V1 retired June 1st 2025 Migration guide link Need help Schedule call calendly We're here help). Phase 5 Cutover Mois 6 (Mois 6 Retirer V1 app.use /api/v1 req res res.status 410.json error V1 API retired message Please migrate V2 guide https://docs.api.com/migration-v1-to-v2). Ce plan facilite la migration.

## Cadre de décision

Voici les principes qui m'ont aidé à gérer les breaking changes sans casser les clients :

**1. URL versioning plutôt qu'header versioning pour APIs publiques**  
Strategy 1 URL versioning (GET /api/v1/users/123 Ancien format GET /api/v2/users/123 Nouveau format Avantages Simple explicite Cache HTTP friendly Routage facile Inconvénients Duplication code potentielle URLs multiples même resource Quand utiliser APIs publiques breaking changes majeurs) plutôt que Strategy 2 Header versioning (GET /api/users/123 Accept application/vnd.myapi.v2+json Avantages URL unique RESTful pur Flexible Inconvénients Moins évident hidden in headers Cache complexe Debugging plus dur Quand utiliser APIs internes contrôle client fort). Cette sélection optimise selon contexte.

**2. Patterns backward compatibility plutôt que duplication code**  
Pattern 1 Additive changes only (Ajouter nouveau field NON breaking change Ajouter nouvel endpoint NON breaking change Ajouter enum value NON usually Deprecate avec support NON breaking change). Pattern 2 Adapter pattern (V1 interface ancien V2 interface nouveau Adapter V2 → V1 function toV1 userV2 UserV2 UserV1 V1 endpoint utilise V2 data + adapter V1 maintenu sans code dupliqué). Pattern 3 Feature flags per version (const features v1 newPagination false v2 newPagination true app.get /api/:version/users const config features version Si config.newPagination Nouvelle pagination else Ancienne pagination). Ces patterns facilitent la backward compatibility sans duplication code.

**3. Migration clients plan plutôt que breaking change brutal**  
Phase 1 Annonce Mois 0 (Breaking Change Announcement What User API v2 released Why Better naming more fields When V1 deprecated 6 months Migration guide Detailed guide examples Support Slack #api-migration Email api-support@company.com). Phase 2 Deprecation headers Mois 1-3 (HTTP/1.1 200 OK Deprecation true Sunset Wed 1 Jun 2025 12:00:00 GMT Link /api/v2/users rel="successor-version"). Phase 3 Monitoring Mois 1-6 (Track V1 usage metrics.increment api.v1.usage Dashboard V1 API Usage Total calls 12,500/day Unique clients 45 Top clients still V1 mobile-app 8k calls/day partner-acme 3k legacy-cron 1k). Phase 4 Outreach Mois 4-5 (Email top V1 users Subject Action Required Migrate V2 June 1st Migration guide link Need help Schedule call). Phase 5 Cutover Mois 6 (Mois 6 Retirer V1 res.status 410.json error V1 API retired message Please migrate V2 guide migration-v1-to-v2). Ce plan facilite la migration.

**4. Alternatives éviter breaking changes**  
GraphQL Natural versioning (V1 type User id ID! name String! V2 Ajouter fields sans casser V1 type User id ID! name String! @deprecated reason Use firstName/lastName firstName String! lastName String! V1 clients query user id 123 id name Encore supporté V2 clients query user id 123 id firstName lastName Avantage Clients demandent seulement ce qu'ils veulent). BFF Backend for Frontend (Mobile app → BFF Mobile → Core API V2 Web app → BFF Web → Core API V2 Partner → BFF Partner → Core API V2 Chaque BFF adapte format selon besoin client Core API peut évoluer sans casser clients). Ces alternatives évitent les breaking changes.

**5. Checklist Breaking change**  
Est-ce breaking change ? (Renommer field → OUI Supprimer field → OUI Changer type string → number → OUI Changer format date string format → OUI Changer enum values → OUI Changer error codes → OUI Ajouter nouveau field → NON Ajouter nouvel endpoint → NON Ajouter enum value → NON usually Deprecate avec support → NON). Cette checklist aide à identifier breaking changes.

## Retour terrain

Ce que j'ai observé dans différentes APIs :

**Ce qui fonctionne** : URL versioning plutôt qu'header versioning APIs publiques (Strategy 1 URL versioning GET /api/v1/users/123 GET /api/v2/users/123 Avantages Simple explicite Cache HTTP friendly Routage facile Quand utiliser APIs publiques breaking changes majeurs) optimise selon contexte. Patterns backward compatibility (Pattern 1 Additive changes only Ajouter nouveau field NON breaking change Ajouter nouvel endpoint NON breaking change, Pattern 2 Adapter pattern V1 interface ancien V2 interface nouveau Adapter V2 → V1 V1 endpoint utilise V2 data + adapter V1 maintenu sans code dupliqué, Pattern 3 Feature flags per version const features v1 v2 app.get /api/:version/users const config features version) facilitent backward compatibility sans duplication code. Migration clients plan (Phase 1 Annonce Mois 0 Breaking Change Announcement Migration guide Support, Phase 2 Deprecation headers Mois 1-3 Deprecation true Sunset date Link successor-version, Phase 3 Monitoring Mois 1-6 Track V1 usage Dashboard V1 API Usage, Phase 4 Outreach Mois 4-5 Email top V1 users Migration guide link Need help Schedule call, Phase 5 Cutover Mois 6 Retirer V1 res.status 410.json error V1 API retired message Please migrate V2 guide migration-v1-to-v2) facilite migration.

**Ce qui bloque** : Breaking change brutal (Changer endpoint sans versioning V1 API 1000 clients utilisent ça V2 On veut séparer prénom/nom firstName Breaking change lastName Résultat 1000 clients cassés). **Résultat :**  clients cassés, confiance perdue, support élevé. Mieux vaut URL versioning (GET /api/v1/users/123 Ancien format GET /api/v2/users/123 Nouveau format) plutôt que breaking change brutal. Pas de migration clients plan (Changer endpoint sans annonce sans deprecation headers sans monitoring sans outreach sans cutover). **Résultat :**  clients surpris, migration difficile. Mieux vaut Migration clients plan (Phase 1 Annonce Mois 0, Phase 2 Deprecation headers Mois 1-3, Phase 3 Monitoring Mois 1-6, Phase 4 Outreach Mois 4-5, Phase 5 Cutover Mois 6) facilite migration.

**Alternatives éviter breaking changes** : GraphQL Natural versioning (V1 type User id ID! name String! V2 Ajouter fields sans casser V1 type User id ID! name String! @deprecated firstName String! lastName String! V1 clients query name Encore supporté V2 clients query firstName lastName Avantage Clients demandent seulement ce qu'ils veulent). BFF Backend for Frontend (Mobile app → BFF Mobile → Core API V2 Web app → BFF Web → Core API V2 Partner → BFF Partner → Core API V2 Chaque BFF adapte format selon besoin client Core API peut évoluer sans casser clients). Ces alternatives évitent les breaking changes.

## Erreurs fréquentes

**Breaking change brutal**  
Changer endpoint sans versioning V1 API 1000 clients utilisent ça V2 On veut séparer prénom/nom firstName Breaking change lastName. **Résultat :**  clients cassés, confiance perdue, support élevé. Mieux vaut URL versioning (GET /api/v1/users/123 Ancien format GET /api/v2/users/123 Nouveau format) plutôt que breaking change brutal.

**Pas de migration clients plan**  
Changer endpoint sans annonce sans deprecation headers sans monitoring sans outreach sans cutover. **Résultat :**  clients surpris, migration difficile. Mieux vaut Migration clients plan (Phase 1 Annonce Mois 0 Breaking Change Announcement Migration guide Support, Phase 2 Deprecation headers Mois 1-3 Deprecation true Sunset date Link successor-version, Phase 3 Monitoring Mois 1-6 Track V1 usage Dashboard, Phase 4 Outreach Mois 4-5 Email top V1 users Migration guide link, Phase 5 Cutover Mois 6 Retirer V1 res.status 410.json) facilite migration.

**Duplication code plutôt que patterns backward compatibility**  
Dupliquer code V1 V2 plutôt que patterns backward compatibility. **Résultat :**  maintenance difficile, bugs fréquents. Mieux vaut Patterns backward compatibility (Pattern 1 Additive changes only, Pattern 2 Adapter pattern V1 endpoint utilise V2 data + adapter V1 maintenu sans code dupliqué, Pattern 3 Feature flags per version) facilitent backward compatibility sans duplication code.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Mettre en place URL versioning dès le début**  
Plutôt que breaking change brutal, mettre en place URL versioning dès le début (GET /api/v1/users/123 Ancien format GET /api/v2/users/123 Nouveau format Avantages Simple explicite Cache HTTP friendly Routage facile Quand utiliser APIs publiques breaking changes majeurs). Cette approche évite les clients cassés.

**Mettre en place patterns backward compatibility dès le début**  
Plutôt que duplication code, mettre en place patterns backward compatibility dès le début (Pattern 1 Additive changes only Ajouter nouveau field NON breaking change, Pattern 2 Adapter pattern V1 endpoint utilise V2 data + adapter V1 maintenu sans code dupliqué, Pattern 3 Feature flags per version const features v1 v2 app.get /api/:version/users const config features version). Ces patterns facilitent la backward compatibility sans duplication code.

**Mettre en place migration clients plan dès le début**  
Plutôt que changement sans plan, mettre en place migration clients plan dès le début (Phase 1 Annonce Mois 0 Breaking Change Announcement Migration guide Support, Phase 2 Deprecation headers Mois 1-3 Deprecation true Sunset date Link successor-version, Phase 3 Monitoring Mois 1-6 Track V1 usage Dashboard, Phase 4 Outreach Mois 4-5 Email top V1 users Migration guide link, Phase 5 Cutover Mois 6 Retirer V1 res.status 410.json). Ce plan facilite la migration.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
