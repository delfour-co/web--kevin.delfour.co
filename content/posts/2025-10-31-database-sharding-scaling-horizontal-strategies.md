---
author:
- Kevin Delfour
title: 'Database Sharding : Quand et comment scaler horizontalement votre base de
  données'
date: 2025-10-31
description: Votre DB est saturée ? Le sharding peut résoudre le problème. Mais c'est
  complexe. Guide pragmatique pour sharding réussi (ou évité si pas nécessaire).
categories:
- architecture
series:
- Architecture
tags:
- database
- scaling
- sharding
- architecture
- performance
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

10 millions de users, 1TB de data, votre database PostgreSQL rame. Sharding ? Peut-être. Mais avant, explorons toutes les alternatives (plus simples).

Ce que j'ai observé : sharding n'est pas premier choix. Alternatives plus simples : Vertical scaling augmenter machine DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent, Read replicas scaling lecture Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine, Partitioning même DB tables séparées Partition par date CREATE TABLE orders_2024 PARTITION OF orders FOR VALUES FROM '2024-01-01' TO '2025-01-01' CREATE TABLE orders_2025 PARTITION OF orders FOR VALUES FROM '2025-01-01' TO '2026-01-01' Performance Queries 10x plus rapides partition Effort 1 semaine, Caching agressif Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%. Quand sharding devient nécessaire : Vertical scaling maxed out Machine biggest available Coût prohibitif >$10k/mois, Write throughput saturé Master CPU >80% Write lag croissant Read replicas suffisent plus, Data size >1TB Backups trop longs >6h Restore impossible RTO Queries lentes malgré index, Geographic distribution Users worldwide Latency critique Data residency laws GDPR. Sharding n'est pas premier choix. Alternatives plus simples : Vertical scaling Read replicas Caching Partitioning. Mais si nécessaire : Choisir bonne stratégie hash range geo, Migration progressive 6-12 mois, Monitoring intensif. Complexité réelle : Cross-shard queries Transactions distribuées Resharding. Commencez simple. Shardez seulement si vraiment requis.

## Le faux problème

Le faux problème serait de croire qu'il faut sharding dès le début. En réalité, sharding n'est pas premier choix. Alternatives plus simples : Vertical scaling augmenter machine DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent, Read replicas scaling lecture Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine, Partitioning même DB tables séparées Partition par date CREATE TABLE orders_2024 PARTITION OF orders FOR VALUES FROM '2024-01-01' TO '2025-01-01' Performance Queries 10x plus rapides partition Effort 1 semaine, Caching agressif Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%. Cette progression facilite l'adoption.

Un autre faux problème : penser qu'il faut choisir une seule stratégie de sharding. En réalité, les stratégies peuvent être combinées selon contexte. Sharding stratégies : Hash-based sharding (Distribuer users par ID def get_shard user_id int num_shards int int return hash user_id % num_shards user_id 123 → shard 1 user_id 456 → shard 2 user_id 789 → shard 1 Avantages Distribution uniforme Simple implémenter Inconvénients Resharding difficile change hash Queries cross-shard impossibles), Range-based sharding (Sharding par plage IDs shard_1 users 1-1M shard_2 users 1M-2M shard_3 users 2M-3M def get_shard user_id int int return user_id -1 // 1_000_000 +1 Avantages Resharding plus facile Range queries possibles Inconvénients Déséquilibre potentiel shard 1 saturé Hotspots), Geographic sharding (Sharding par région shard_eu users.region ='EU' shard_us users.region ='US' shard_asia users.region ='ASIA' def get_shard user User str return f'shard_{user.region.lower()} Avantages Latency réduite Compliance locale Data residency Inconvénients Cross-region queries complexes). Cette diversité permet de choisir selon contexte.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre quand sharding devient nécessaire et comment le mettre en place :

**Alternatives plus simples avant sharding** : Vertical scaling augmenter machine (DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent). Read replicas scaling lecture (Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine). Partitioning même DB tables séparées (Partition par date CREATE TABLE orders_2024 PARTITION OF orders FOR VALUES FROM '2024-01-01' TO '2025-01-01' CREATE TABLE orders_2025 PARTITION OF orders FOR VALUES FROM '2025-01-01' TO '2026-01-01' Performance Queries 10x plus rapides partition Effort 1 semaine). Caching agressif (Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%). Ces alternatives sont plus simples que sharding.

**Quand sharding devient nécessaire** : Vertical scaling maxed out (Machine biggest available Coût prohibitif >$10k/mois). Write throughput saturé (Master CPU >80% Write lag croissant Read replicas suffisent plus). Data size >1TB (Backups trop longs >6h Restore impossible RTO Queries lentes malgré index). Geographic distribution (Users worldwide Latency critique Data residency laws GDPR). Ces signaux indiquent que sharding devient nécessaire.

**Sharding stratégies** : Hash-based sharding (Distribuer users par ID def get_shard user_id int num_shards int int return hash user_id % num_shards user_id 123 → shard 1 user_id 456 → shard 2 Avantages Distribution uniforme Simple implémenter Inconvénients Resharding difficile change hash Queries cross-shard impossibles). Range-based sharding (Sharding par plage IDs shard_1 users 1-1M shard_2 users 1M-2M shard_3 users 2M-3M def get_shard user_id int int return user_id -1 // 1_000_000 +1 Avantages Resharding plus facile Range queries possibles Inconvénients Déséquilibre potentiel shard 1 saturé Hotspots). Geographic sharding (Sharding par région shard_eu users.region ='EU' shard_us users.region ='US' shard_asia users.region ='ASIA' def get_shard user User str return f'shard_{user.region.lower()} Avantages Latency réduite Compliance locale Data residency Inconvénients Cross-region queries complexes). Cette diversité permet de choisir selon contexte.

**Migration progressive plutôt que Big Bang** : Phase 1 Dual writes Mois 1-2 (Écrire old DB ET nouveau shard async def createUser user User Old DB legacy await old_db.insert user New shard progressive shard get_shard user.id await shard.insert user). Phase 2 Backfill data Mois 3-4 (Migrer data existante async def backfill_shard shard_id int users await old_db.query SELECT * FROM users WHERE MOD id total_shards = shard_id for user in users await shards shard_id.insert user). Phase 3 Dual reads Mois 5-6 (Lire shard fallback vers old DB async def getUser user_id int shard get_shard user_id user await shard.query SELECT * FROM users WHERE id =$1 user_id if not user Fallback data pas encore migrée user await old_db.query SELECT * FROM users WHERE id =$1 user_id return user). Phase 4 Cutover Mois 7-8 (Lire seulement shard async def getUser user_id int shard get_shard user_id return await shard.query SELECT * FROM users WHERE id =$1 user_id Old DB → Read-only → Archive → Delete). Cette progression facilite l'adoption.

## Cadre de décision

Voici les principes qui m'ont aidé à décider quand sharding devient nécessaire :

**1. Alternatives plus simples avant sharding**  
Vertical scaling augmenter machine (DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent) plutôt que sharding dès début. Read replicas scaling lecture (Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine). Partitioning même DB tables séparées (Partition par date CREATE TABLE orders_2024 PARTITION OF orders Performance Queries 10x plus rapides partition Effort 1 semaine). Caching agressif (Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%). Ces alternatives sont plus simples que sharding.

**2. Quand sharding devient nécessaire signaux alarme**  
Vertical scaling maxed out (Machine biggest available Coût prohibitif >$10k/mois). Write throughput saturé (Master CPU >80% Write lag croissant Read replicas suffisent plus). Data size >1TB (Backups trop longs >6h Restore impossible RTO Queries lentes malgré index). Geographic distribution (Users worldwide Latency critique Data residency laws GDPR). Ces signaux indiquent que sharding devient nécessaire.

**3. Sharding stratégies selon contexte**  
Hash-based sharding (Distribuer users par ID def get_shard user_id int num_shards int int return hash user_id % num_shards Avantages Distribution uniforme Simple implémenter Inconvénients Resharding difficile change hash Queries cross-shard impossibles). Range-based sharding (Sharding par plage IDs shard_1 users 1-1M shard_2 users 1M-2M Avantages Resharding plus facile Range queries possibles Inconvénients Déséquilibre potentiel shard 1 saturé Hotspots). Geographic sharding (Sharding par région shard_eu users.region ='EU' shard_us users.region ='US' Avantages Latency réduite Compliance locale Data residency Inconvénients Cross-region queries complexes). Cette sélection optimise selon contexte.

**4. Migration progressive plutôt que Big Bang**  
Phase 1 Dual writes Mois 1-2 (Écrire old DB ET nouveau shard async def createUser user User Old DB legacy await old_db.insert user New shard progressive shard get_shard user.id await shard.insert user). Phase 2 Backfill data Mois 3-4 (Migrer data existante async def backfill_shard shard_id int users await old_db.query SELECT * FROM users WHERE MOD id total_shards = shard_id for user in users await shards shard_id.insert user). Phase 3 Dual reads Mois 5-6 (Lire shard fallback vers old DB async def getUser user_id int shard get_shard user_id user await shard.query SELECT * FROM users WHERE id =$1 user_id if not user Fallback user await old_db.query SELECT * FROM users WHERE id =$1 user_id return user). Phase 4 Cutover Mois 7-8 (Lire seulement shard async def getUser user_id int shard get_shard user_id return await shard.query SELECT * FROM users WHERE id =$1 user_id Old DB → Read-only → Archive → Delete). Cette progression facilite l'adoption.

**5. Problèmes complexes cross-shard queries transactions distribuées resharding**  
Problème 1 Cross-shard queries (Impossible sharding SELECT u.name o.total FROM users u JOIN orders o ON u.id =o.user_id WHERE o.total >1000 users orders shards différents Solutions A Dénormalisation Dupliquer user data orders CREATE TABLE orders id INT user_id INT user_name VARCHAR Dupliqué user_email VARCHAR Dupliqué total DECIMAL Query devient possible SELECT user_name total FROM orders WHERE total >1000 B Application-level joins Fetch chaque shard orders await fetch_orders_from_all_shards total >1000 user_ids o.user_id for o in orders Fetch users chaque shard concerné users await fetch_users_by_ids user_ids Join mémoire results join_in_memory users orders C Analytics database Sharded OLTP DBs → ETL → Data Warehouse Snowflake BigQuery Run analytics here). Problème 2 Transactions distribuées (Transaction cross-shard complexe async def transferMoney from_user_id to_user_id amount shard1 get_shard from_user_id shard2 get_shard to_user_id Si différents shards transaction distribuée if shard1 != shard2 Two-phase commit 2PC ou Saga pattern await distributed_transaction lambda shard1.debit from_user_id amount lambda shard2.credit to_user_id amount Éviter si possible Garder transactions même shard Utiliser event sourcing Eventual consistency). Problème 3 Resharding ajouter shards (2 shards → 4 shards hash user_id %2 → hash user_id %4 50% users changent shard Migration massive requise Solutions A Consistent hashing Minimise data movement 10-20% au lieu 50% from consistent_hash import ConsistentHash ring ConsistentHash ring.add_node shard1 ring.add_node shard2 Ajouter shard3 ring.add_node shard3 Seulement 33% migré B Pre-sharding Créer 256 logical shards début Mapper 4 physical shards logical_shard hash user_id %256 physical_shard logical_to_physical logical_shard Resharding remapper pas data move). Ces problèmes complexes nécessitent des solutions adaptées.

## Retour terrain

Ce que j'ai observé dans différentes bases de données :

**Ce qui fonctionne** : Alternatives plus simples avant sharding (Vertical scaling augmenter machine DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent, Read replicas scaling lecture Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine, Partitioning même DB tables séparées Partition par date CREATE TABLE orders_2024 PARTITION OF orders Performance Queries 10x plus rapides partition Effort 1 semaine, Caching agressif Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%) évite sur-ingénierie. Quand sharding devient nécessaire signaux alarme (Vertical scaling maxed out Machine biggest available Coût prohibitif >$10k/mois Write throughput saturé Master CPU >80% Write lag croissant Read replicas suffisent plus Data size >1TB Backups trop longs >6h Restore impossible RTO Queries lentes malgré index Geographic distribution Users worldwide Latency critique Data residency laws GDPR) justifie complexité. Sharding stratégies selon contexte (Hash-based sharding Distribution uniforme Simple implémenter Inconvénients Resharding difficile change hash Queries cross-shard impossibles Range-based sharding Resharding plus facile Range queries possibles Inconvénients Déséquilibre potentiel shard 1 saturé Hotspots Geographic sharding Latency réduite Compliance locale Data residency Inconvénients Cross-region queries complexes) optimise selon contexte.

**Ce qui bloque** : Sharding dès début sans alternatives simples (Vertical scaling augmenter machine DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent Read replicas scaling lecture Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine Partitioning même DB tables séparées Partition par date CREATE TABLE orders_2024 PARTITION OF orders Performance Queries 10x plus rapides partition Effort 1 semaine Caching agressif Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%). Résultat : complexité ajoutée, coûts inutiles. Mieux vaut Alternatives plus simples avant sharding (Vertical scaling augmenter machine Read replicas scaling lecture Partitioning même DB tables séparées Caching agressif Redis cache). Pas sharding quand nécessaire (Vertical scaling maxed out Machine biggest available Coût prohibitif >$10k/mois Write throughput saturé Master CPU >80% Write lag croissant Read replicas suffisent plus Data size >1TB Backups trop longs >6h Restore impossible RTO Queries lentes malgré index Geographic distribution Users worldwide Latency critique Data residency laws GDPR). Résultat : performance dégradée, limitations techniques. Mieux vaut Quand sharding devient nécessaire signaux alarme (Vertical scaling maxed out Write throughput saturé Data size >1TB Geographic distribution).

**Cas réel SaaS B2B tenant sharding** : Situation (5000 tenants 10 tenants 70% traffic déséquilibre 1 DB saturée). Solution (Stratégie hybrid PREMIUM_TENANTS 1 5 12 23 45 Gros clients def get_db tenant_id if tenant_id in PREMIUM_TENANTS return dedicated_dbs tenant_id Shard dédié Petits tenants hash sharding shard_id hash tenant_id %10 return shared_shards shard_id). Résultats (Performance p95 latency 450ms → 85ms -81% Isolation 0 noisy neighbor problems Coût +$3k/mois 5 shards dédiés Satisfaction Enterprise clients 9.2/10). Ce cas montre quand sharding fait sens.

## Erreurs fréquentes

**Sharding dès début sans alternatives simples**  
Vertical scaling augmenter machine DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent Read replicas scaling lecture Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine Partitioning même DB tables séparées Partition par date CREATE TABLE orders_2024 PARTITION OF orders Performance Queries 10x plus rapides partition Effort 1 semaine Caching agressif Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%. Résultat : complexité ajoutée, coûts inutiles. Mieux vaut Alternatives plus simples avant sharding (Vertical scaling augmenter machine Read replicas scaling lecture Partitioning même DB tables séparées Caching agressif Redis cache).

**Pas sharding quand nécessaire**  
Vertical scaling maxed out Machine biggest available Coût prohibitif >$10k/mois Write throughput saturé Master CPU >80% Write lag croissant Read replicas suffisent plus Data size >1TB Backups trop longs >6h Restore impossible RTO Queries lentes malgré index Geographic distribution Users worldwide Latency critique Data residency laws GDPR. Résultat : performance dégradée, limitations techniques. Mieux vaut Quand sharding devient nécessaire signaux alarme (Vertical scaling maxed out Write throughput saturé Data size >1TB Geographic distribution).

**Migration Big Bang plutôt que progressive**  
Migration complète d'un coup. Résultat : complexité opérationnelle élevée, échecs fréquents. Mieux vaut Migration progressive (Phase 1 Dual writes Mois 1-2 Écrire old DB ET nouveau shard, Phase 2 Backfill data Mois 3-4 Migrer data existante, Phase 3 Dual reads Mois 5-6 Lire shard fallback vers old DB, Phase 4 Cutover Mois 7-8 Lire seulement shard Old DB → Read-only → Archive → Delete).

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Essayer alternatives plus simples avant sharding**  
Plutôt que sharding dès début, essayer alternatives plus simples avant sharding (Vertical scaling augmenter machine DB actuelle 8 CPU 32GB RAM DB upgradée 32 CPU 256GB RAM Coût $500/mois → $2000/mois Effort 1 heure migration Jusqu'où Machines jusqu'à 128 CPU 4TB RAM existent, Read replicas scaling lecture Master Primary Writes Read replicas R1 R2 R3 Reads Cas usage 90% reads 10% writes Effort 1 semaine, Partitioning même DB tables séparées Partition par date CREATE TABLE orders_2024 PARTITION OF orders Performance Queries 10x plus rapides partition Effort 1 semaine, Caching agressif Redis cache Requêtes fréquentes Sessions Rate limiting Hit rate 80%+ → Reduce DB load 80%). Ces alternatives sont plus simples que sharding.

**Mettre en place migration progressive dès le début**  
Plutôt que migration Big Bang, mettre en place migration progressive dès le début (Phase 1 Dual writes Mois 1-2 Écrire old DB ET nouveau shard async def createUser user User Old DB legacy await old_db.insert user New shard progressive shard get_shard user.id await shard.insert user, Phase 2 Backfill data Mois 3-4 Migrer data existante async def backfill_shard shard_id int users await old_db.query SELECT * FROM users WHERE MOD id total_shards = shard_id for user in users await shards shard_id.insert user, Phase 3 Dual reads Mois 5-6 Lire shard fallback vers old DB async def getUser user_id int shard get_shard user_id user await shard.query SELECT * FROM users WHERE id =$1 user_id if not user Fallback user await old_db.query SELECT * FROM users WHERE id =$1 user_id return user, Phase 4 Cutover Mois 7-8 Lire seulement shard async def getUser user_id int shard get_shard user_id return await shard.query SELECT * FROM users WHERE id =$1 user_id Old DB → Read-only → Archive → Delete). Cette progression facilite l'adoption.

**Choisir stratégie sharding selon contexte**  
Plutôt qu'une seule stratégie, choisir stratégie sharding selon contexte (Hash-based sharding Distribution uniforme Simple implémenter Inconvénients Resharding difficile change hash Queries cross-shard impossibles Range-based sharding Resharding plus facile Range queries possibles Inconvénients Déséquilibre potentiel shard 1 saturé Hotspots Geographic sharding Latency réduite Compliance locale Data residency Inconvénients Cross-region queries complexes). Cette sélection optimise selon contexte.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
