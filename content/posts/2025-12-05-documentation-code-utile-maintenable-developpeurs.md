---
author:
- Kevin Delfour
title: 'Documentation code : Comment écrire une doc que les développeurs vont vraiment
  lire'
date: 2025-12-05
description: La documentation code est souvent négligée ou obsolète. Principes et
  formats pour créer une doc utile, maintenue et réellement utilisée par l'équipe.
categories:
- developpement
series:
- Développement
tags:
- documentation
- developpement
- best-practices
- collaboration
- productivite
ShowToc: true
TocOpen: false
pillar: culture-management
pillars:
- culture-management
audience: cto
audiences:
- cto
---
## Dédramatisation

"Lisez la doc." Mais quelle doc ? Celle écrite il y a 2 ans et obsolète depuis 18 mois ? Cette situation n'est pas une fatalité. Voici comment créer une documentation que les développeurs vont réellement lire et maintenir.

Ce que j'ai observé : le problème Doc obsolète inexistante. Symptômes classiques (README.md Last updated 2021 Run npm install Mais projet utilise pnpm depuis 2023 Ou pire Fichier user.service.ts 500 lignes Commentaire Aucun README "Le code se documente lui-même" Résultat Nouveaux devs perdus Bugs incompréhension Temps perdu reverse-engineer). Documentation n'est pas optionnelle. C'est multiplier : Onboarding 3x plus rapide Bugs -50% meilleure compréhension Contributions facilitées. Principes : Code self-documenting d'abord, Documenter "Pourquoi", Rester proche code, Tester maintenir. Commencer petit : README Quick Start 1h, Guides essentiels 1 jour, CI check docs 2h, Iterate feedback.

## Le réel (sans filtre)

La réalité documentation code : beaucoup de documentation est obsolète ou inexistante. Le problème Doc obsolète inexistante (Symptômes classiques README.md Last updated 2021 Run npm install Mais projet utilise pnpm depuis 2023 Ou pire Fichier user.service.ts 500 lignes Commentaire Aucun README "Le code se documente lui-même" Résultat Nouveaux devs perdus Bugs incompréhension Temps perdu reverse-engineer). Cette réalité coûte cher : temps perdu, bugs fréquents, frustration équipe.

Principe Code qui s'explique > Commentaires : Self-documenting code (Mauvais Commentaire expliquer code obscur Check if user can buy age >18 and balance >price if u.a >18 && u.b >p Process purchase db.insert uid u.id pid p.id Bon Code explicite pas besoin commentaire function canUserPurchase user User product Product boolean const isAdult user.age >= MINIMUM_AGE const hasSufficientBalance user.balance >= product.price return isAdult && hasSufficientBalance if canUserPurchase user product createPurchase user product Règle Si besoin commentaire refactorez d'abord). Cette approche réduit le besoin de documentation.

Quand documenter et quoi : Le "Pourquoi" pas "Quoi" (Mauvais Décrit CE QUE fait code évident Incrémente counter counter++ Bon Explique POURQUOI pas évident Workaround API returns duplicates dedupe client-side TODO Fix API ticket #1234 counter++). Décisions non-évidentes (Context important Using polling instead WebSocket because 1 Corporate firewalls block WS 2 90% users won't benefit rarely updates 3 Simpler implementation no reconnect logic setInterval checkUpdates 30000). Cette documentation explique les décisions importantes.

## Repères clairs

Voici une manière de voir les choses pour créer une documentation utile et maintenable :

**Principe Code qui s'explique > Commentaires** : Self-documenting code (Mauvais Commentaire expliquer code obscur Check if user can buy age >18 and balance >price if u.a >18 && u.b >p Process purchase db.insert uid u.id pid p.id Bon Code explicite pas besoin commentaire function canUserPurchase user User product Product boolean const isAdult user.age >= MINIMUM_AGE const hasSufficientBalance user.balance >= product.price return isAdult && hasSufficientBalance if canUserPurchase user product createPurchase user product Règle Si besoin commentaire refactorez d'abord). Cette approche réduit le besoin de documentation.

**Quand documenter et quoi** : Le "Pourquoi" pas "Quoi" (Mauvais Décrit CE QUE fait code évident Incrémente counter counter++ Bon Explique POURQUOI pas évident Workaround API returns duplicates dedupe client-side TODO Fix API ticket #1234 counter++). Décisions non-évidentes (Context important Using polling instead WebSocket because 1 Corporate firewalls block WS 2 90% users won't benefit rarely updates 3 Simpler implementation no reconnect logic setInterval checkUpdates 30000). Cette documentation explique les décisions importantes.

**Formats documentation selon usage** : README Quick Start (README.md Quick start <5 minutes Setup script automated Exemples copy-paste fonctionnent immédiatement Links guides détaillés). Architecture Decision Records ADR (Format 1-page maximum Context problème contraintes Decision solution choisie Alternatives Considered Option A Pros Cons Option B Pros Cons Consequences Positive Negative Risks Exemple ADR 003 PostgreSQL Decision PostgreSQL chosen Positive ACID guarantees Rich SQL features Great tooling pgAdmin Negative Vertical scaling primarily More complex MongoDB Alternatives Considered MongoDB Rejected need ACID MySQL Rejected prefer PostgreSQL features). API Documentation (OpenAPI / Swagger /users/{id} get summary Get user ID description Returns user data Includes profile info settings Rate limit 100 req/min API key Permissions Requires users:read scope parameters name id in path required true schema type integer example 123 responses 200 description User found content application/json example id 123 name Alice email alice@example.com 404 description User not found Auto-généré code idéal TypeDoc JSDoc Génère OpenAPI). Code comments JSDoc/TSDoc (Calculate discount based user tier order total Discount tiers Standard 0% Premium 5% Enterprise 10% Additional 5% order >€1000 param user User object tier property param orderTotal Total order amount euros returns Discount amount euros example calculateDiscount premiumUser 500 Returns 25 5% 500 example calculateDiscount premiumUser 1200 Returns 120 10% 1200 5% tier + 5% volume). Guides docs/ (docs/ architecture.md Vue ensemble getting-started.md Setup détaillé guides/ adding-endpoint.md database-migrations.md testing.md deployment.md adr/ Architecture decisions 001-use-typescript.md 002-monorepo.md 003-postgres.md api/ openapi.yaml API spec). Ces formats organisent la documentation.

**Doc vivante Rester jour** : Problème Doc obsolète (README écrit 2021 jamais mis jour Run npm start Mais maintenant npm run dev). Solution 1 Doc code (Doc Code toujours synchro const CONFIG PORT parseInt process.env.PORT || '3000' Server port Default 3000 Override PORT env var DATABASE_URL process.env.DATABASE_URL Database URL Format postgresql://user:pass@host:port/db). Solution 2 Tests documentation (Tests documentent behavior describe calculateDiscount it gives 5% premium users const user tier premium expect calculateDiscount user 100.toBe 5 it gives additional 5% orders >€1000 const user tier premium expect calculateDiscount user 1200.toBe 120 10% total it gives 0% standard users small orders const user tier standard expect calculateDiscount user 100.toBe 0). Solution 3 CI vérifie doc (GitHub workflows docs.yml check-docs runs-on ubuntu-latest steps Check broken links run markdown-link-check docs/**/*.md Test code examples run npm run test:docs-examples Generate OpenAPI code run npm run generate:openapi Check OpenAPI up-to-date run git diff --exit-code docs/api/openapi.yaml). Solution 4 Doc ownership (CODEOWNERS docs/** @tech-lead *.md @tech-lead Force review doc changes). Ces solutions maintiennent la documentation à jour.

**Checklist Doc quality** : README Quick Start <5 minutes, Architecture explained diagram, Setup script automated, API documented OpenAPI, Common tasks guides, ADR key decisions, Code examples tested CI, Links checked CI, Updated <3 months ago. Cette checklist aide à maintenir la qualité.

## Erreurs classiques

**Wall text**  
README 2000 lignes. **Résultat:**  doc difficile lire, information perdue. Mieux vaut README Quick start 50 lignes Links guides détaillés.

**Doc mauvais endroit**  
"Read Confluence page" personne ne lit Confluence. **Résultat:**  doc ignorée, information perdue. Mieux vaut Doc repo proche code.

**Commentaires disent rien**  
Useless comments Get user const user getUser Set name user.name name Save user saveUser user. **Résultat:**  bruit documentation, code pas plus clair. Mieux vaut No comments needed code clear const user getUser user.name name saveUser user.

**Doc jamais testée**  
README écrit jamais testé Étapes manquantes obsolète. **Résultat:**  doc obsolète, frustration. Mieux vaut README testé chaque nouveau dev Toujours jour.

## Message de responsabilité

Créer une documentation utile et maintenable, c'est votre responsabilité. Personne ne le fera à votre place. Mais c'est aussi votre choix : vous pouvez choisir de créer une documentation utile et bénéficier des avantages (onboarding 3x plus rapide, bugs -50%, contributions facilitées), ou vous pouvez choisir de ne pas créer de documentation et accepter les conséquences (onboarding lent, bugs fréquents, contributions difficiles). L'important est d'assumer ce choix et ses conséquences.

Si vous choisissez de créer une documentation, faites-le efficacement. Principe Code qui s'explique > Commentaires (Self-documenting code Code explicite pas besoin commentaire Règle Si besoin commentaire refactorez d'abord). Quand documenter et quoi (Le "Pourquoi" pas "Quoi" Explique POURQUOI pas évident Décisions non-évidentes Context important). Formats documentation selon usage (README Quick Start, Architecture Decision Records ADR, API Documentation OpenAPI Swagger, Code comments JSDoc/TSDoc, Guides docs/). Doc vivante Rester jour (Solution 1 Doc code Doc Code toujours synchro, Solution 2 Tests documentation Tests documentent behavior, Solution 3 CI vérifie doc GitHub workflows docs.yml, Solution 4 Doc ownership CODEOWNERS). Checklist Doc quality (README Quick Start <5 minutes, Architecture explained diagram, Setup script automated, API documented OpenAPI, Common tasks guides, ADR key decisions, Code examples tested CI, Links checked CI, Updated <3 months ago). Cette pratique efficace maximise les bénéfices.

Si vous choisissez de ne pas créer de documentation, assumez ce choix. Vous acceptez probablement onboarding lent, bugs fréquents, contributions difficiles. Ce choix est valide si vous préférez éviter la documentation, mais comprenez les conséquences.

## Pour aller plus loin

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
