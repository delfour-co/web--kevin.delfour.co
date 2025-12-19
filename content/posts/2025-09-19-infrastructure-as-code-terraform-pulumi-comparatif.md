---
author:
- Kevin Delfour
title: 'Infrastructure as Code : Terraform vs Pulumi, le match pragmatique'
date: 2025-09-19
description: Terraform ou Pulumi pour votre infra ? Comparatif technique basé sur
  des projets réels, avec benchmarks, pièges et recommandations.
categories:
- developpement
series:
- Développement
tags:
- infrastructure
- iac
- terraform
- devops
- cloud
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

Terraform domine le marché IaC depuis des années. Pulumi arrive avec la promesse d'utiliser de vrais langages de programmation. Après avoir utilisé les deux en production, voici mon retour sans bullshit.

Ce que j'ai observé : il n'y a pas de mauvais choix. Terraform et Pulumi sont tous deux excellents pour faire de l'IaC en 2025. Le vrai critère : votre équipe. Équipe infra/ops → Terraform, Équipe dev → Pulumi, Équipe mixte → Terraform plus facile pour tout le monde. Mon conseil : Faire POC 1 feature simple, Mesurer vitesse dev bugs satisfaction équipe, Décider avec vraie data.

## Le faux problème

Le faux problème serait de croire qu'il faut choisir entre Terraform et Pulumi de manière exclusive. En réalité, Terraform et Pulumi sont des outils différents pour résoudre des problèmes différents. Approche hybride possible (Core Infra Terraform VPC IAM etc, App Infra Pulumi App-specific Avantages Stabilité Terraform base Flexibilité Pulumi apps). Cette approche hybride peut être pertinente selon contexte.

Un autre faux problème : penser qu'il faut Terraform parce que c'est le standard. En réalité, le choix dépend de l'équipe. Utilisez Terraform si (Équipe majoritairement Ops/infra, Multi-cloud complexe, Écosystème modules mature requis, Compétences HCL déjà présentes). Utilisez Pulumi si (Équipe développeurs forte, Infra complexe logique métier, Besoin tests unitaires poussés, TypeScript/Python/Go déjà mastered). Cette distinction aide à choisir selon contexte.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment choisir entre Terraform et Pulumi selon votre contexte :

**Terraform standard de facto** : Forces (1 Écosystème mature 4000+ providers officiels provider aws provider kubernetes provider datadog tout est supporté, 2 State management robuste terraform backend s3 bucket terraform-state key prod/terraform.tfstate dynamodb_table terraform-locks, 3 Import ressources existantes terraform import aws_instance.web i-1234567890abcdef0 Import ressource cloud Terraform). Faiblesses (1 HCL limité Pas boucles complexes Pas conditions avancées Pas fonctions customs Exemple douloureux dupliquer config resource aws_instance app_1 ami ami-123 instance_type t3.micro 50 lignes config resource aws_instance app_2 ami ami-123 instance_type t3.micro 50 lignes identiques Solution Modules mais ça complexifie, 2 Tests difficiles Tests Terraform = lancer vraiment terraform plan terraform apply Pas tests unitaires réels, 3 Erreurs cryptiques Error Error creating DB Instance InvalidParameterCombination). Ces forces et faiblesses aident à comprendre quand Terraform fait sens.

**Pulumi vrais langages programmation** : Forces (1 Type safety TypeScript Python Go IDE support autocomplete, 2 Tests unitaires réels Tests infra comme code application, 3 Abstraction complexe Créer abstraction high-level class WebApp constructor name string config WebAppConfig Load balancer Auto Scaling Group CloudWatch Alarms RDS Database Utilisation simple const app new WebApp production minInstances 2 maxInstances 10 enableAlerts true database engine postgres instanceClass db.t3.micro En Terraform Possible modules mais moins ergonomique, 4 Infra dynamique basée API Pulumi Fetch data externe facile const zones await fetchAvailabilityZones zones.forEach zone new aws.ec2.Subnet subnet-zone availabilityZone zone cidrBlock calculateCIDR zone En Terraform Utiliser data sources moins flexible, 5 Policy as Code Pulumi Policy TypeScript import PolicyPack validateResourceOfType new PolicyPack aws-security policies name s3-no-public-read description S3 buckets must not allow public read access enforcementLevel mandatory validateResource validateResourceOfType aws.s3.Bucket bucket args reportViolation Si bucket.acl === public-read reportViolation S3 bucket must not allow public Terraform Sentinel HashiCorp payant Ou OPA plus complexe Gagnant Pulumi intégré, 6 Secrets encryptés natifs Secrets encryptés natifs import Config from @pulumi/pulumi const config new Config const dbPassword config.requireSecret dbPassword Encrypted state Gagnant Pulumi). Faiblesses (1 Écosystème moins mature Moins providers que Terraform, 2 APIs différentes par provider import * as aws from @pulumi/aws import * as gcp from @pulumi/gcp import * as azure from @pulumi/azure APIs différentes provider Gagnant Terraform meilleure cohérence, 3 Performance Benchmark Déployer 50 resources Terraform plan 4.2s apply 38s Pulumi preview 11.5s up 42s Gagnant Terraform plus rapide, 4 Collaboration équipe Pulumi Requiert compétences dev Réutilisation packages npm/pypi Moins standards Terraform HCL Facile lire même sans coder Modules partagés Terraform Registry Standards établis Gagnant Terraform équipes mixtes). Ces forces et faiblesses aident à comprendre quand Pulumi fait sens.

**Cas d'usage réels** : Cas 1 Startup tech 50 devs (Choix Pulumi TypeScript Raison Équipe 100% dev Infra complexe logique métier Besoin tests unitaires TypeScript déjà utilisé partout Résultat Onboarding dev 1 jour vs 1 semaine Terraform Tests infra 85% coverage Bugs infra -60%). Cas 2 Grande entreprise 200+ ingénieurs (Choix Terraform Raison Équipe infra dédiée Multi-cloud complexe AWS + Azure + GCP Besoin écosystème mature Standards déjà établis Résultat Modules réutilisables 40+ projets Gouvernance centralisée Coût maîtrisé). Cas 3 SaaS B2B infra par client (Choix Pulumi Raison Infra multi-tenant complexe Logique métier infra Besoin générer config dynamiquement Créer infra chaque client clients.forEach client new CustomerInfra client.id tier client.subscriptionTier region client.preferredRegion features client.enabledFeatures). Ces cas montrent quand chaque outil fait sens.

## Cadre de décision

Voici les principes qui m'ont aidé à choisir entre Terraform et Pulumi :

**1. Terraform équipe infra/ops multi-cloud écosystème mature**  
Forces (Écosystème mature 4000+ providers officiels provider aws provider kubernetes provider datadog tout est supporté, State management robuste terraform backend s3 bucket terraform-state key prod/terraform.tfstate dynamodb_table terraform-locks, Import ressources existantes terraform import aws_instance.web i-1234567890abcdef0). Faiblesses (HCL limité Pas boucles complexes Pas conditions avancées Pas fonctions customs Solution Modules mais ça complexifie, Tests difficiles Tests Terraform = lancer vraiment Pas tests unitaires réels, Erreurs cryptiques). Utilisez Terraform si (Équipe majoritairement Ops/infra, Multi-cloud complexe, Écosystème modules mature requis, Compétences HCL déjà présentes). Ces cas justifient Terraform.

**2. Pulumi équipe développeurs forte infra complexe tests unitaires**  
Forces (Type safety TypeScript Python Go IDE support autocomplete, Tests unitaires réels Tests infra comme code application, Abstraction complexe Créer abstraction high-level class WebApp Utilisation simple const app new WebApp production En Terraform Possible modules mais moins ergonomique, Infra dynamique basée API Pulumi Fetch data externe facile zones.forEach zone new aws.ec2.Subnet En Terraform Utiliser data sources moins flexible, Policy as Code Pulumi Policy TypeScript intégré Terraform Sentinel HashiCorp payant Ou OPA plus complexe Gagnant Pulumi intégré, Secrets encryptés natifs Secrets encryptés natifs Encrypted state Gagnant Pulumi). Faiblesses (Écosystème moins mature Moins providers que Terraform, APIs différentes par provider Gagnant Terraform meilleure cohérence, Performance Terraform plus rapide plan 4.2s apply 38s vs Pulumi preview 11.5s up 42s, Collaboration équipe Pulumi Requiert compétences dev Terraform HCL Facile lire même sans coder Gagnant Terraform équipes mixtes). Utilisez Pulumi si (Équipe développeurs forte, Infra complexe logique métier, Besoin tests unitaires poussés, TypeScript/Python/Go déjà mastered). Ces cas justifient Pulumi.

**3. Approche hybride possible selon contexte**  
Core Infra Terraform (VPC IAM etc Stabilité Terraform base). App Infra Pulumi (App-specific Flexibilité Pulumi apps). Avantages (Stabilité Terraform base, Flexibilité Pulumi apps). Cette approche hybride peut être pertinente selon contexte.

**4. Coût total possession TCO**  
Terraform (Coûts Terraform Cloud teamwork 20$/user/mois HashiCorp Sentinel policies Enterprise only Formation équipe 2-3 jours Total/an équipe 10 ~$2,400 + $6,000 formation). Pulumi (Coûts Pulumi Cloud free OSS Pulumi Team 50$/user/mois Formation 0 si équipe dev Total/an équipe 10 $6,000 Gagnant Terraform moins cher grandes équipes). Cette comparaison aide à choisir selon budget.

**5. Cas d'usage réels**  
Cas 1 Startup tech 50 devs (Choix Pulumi TypeScript Raison Équipe 100% dev Infra complexe logique métier Besoin tests unitaires TypeScript déjà utilisé partout Résultat Onboarding dev 1 jour vs 1 semaine Terraform Tests infra 85% coverage Bugs infra -60%). Cas 2 Grande entreprise 200+ ingénieurs (Choix Terraform Raison Équipe infra dédiée Multi-cloud complexe AWS + Azure + GCP Besoin écosystème mature Standards déjà établis Résultat Modules réutilisables 40+ projets Gouvernance centralisée Coût maîtrisé). Cas 3 SaaS B2B infra par client (Choix Pulumi Raison Infra multi-tenant complexe Logique métier infra Besoin générer config dynamiquement Créer infra chaque client clients.forEach client new CustomerInfra). Ces cas montrent quand chaque outil fait sens.

## Retour terrain

Ce que j'ai observé dans différents projets :

**Ce qui fonctionne** : Terraform équipe infra/ops multi-cloud écosystème mature (Forces Écosystème mature 4000+ providers officiels State management robuste Import ressources existantes, Utilisez Terraform si Équipe majoritairement Ops/infra Multi-cloud complexe Écosystème modules mature requis Compétences HCL déjà présentes) justifie Terraform. Pulumi équipe développeurs forte infra complexe tests unitaires (Forces Type safety TypeScript Python Go IDE support Tests unitaires réels Abstraction complexe Infra dynamique basée API Policy as Code intégré Secrets encryptés natifs, Utilisez Pulumi si Équipe développeurs forte Infra complexe logique métier Besoin tests unitaires poussés TypeScript/Python/Go déjà mastered) justifie Pulumi. Approche hybride possible (Core Infra Terraform VPC IAM Stabilité Terraform base App Infra Pulumi App-specific Flexibilité Pulumi apps) peut être pertinente selon contexte.

**Ce qui bloque** : Terraform pour équipe développeurs forte (Équipe développeurs forte Infra complexe logique métier Besoin tests unitaires poussés TypeScript/Python/Go déjà mastered). **Résultat :**  HCL limité, tests difficiles, productivité réduite. Mieux vaut Pulumi équipe développeurs forte (Type safety TypeScript Python Go IDE support Tests unitaires réels Abstraction complexe Infra dynamique basée API Policy as Code intégré). Pulumi pour équipe infra/ops (Équipe majoritairement Ops/infra Multi-cloud complexe Écosystème modules mature requis Compétences HCL déjà présentes). **Résultat :**  courbe apprentissage élevée, écosystème moins mature. Mieux vaut Terraform équipe infra/ops (Écosystème mature 4000+ providers officiels State management robuste Import ressources existantes).

**Cas d'usage réels** : Cas 1 Startup tech 50 devs (Choix Pulumi TypeScript Résultat Onboarding dev 1 jour vs 1 semaine Terraform Tests infra 85% coverage Bugs infra -60%). Cas 2 Grande entreprise 200+ ingénieurs (Choix Terraform Résultat Modules réutilisables 40+ projets Gouvernance centralisée Coût maîtrisé). Cas 3 SaaS B2B infra par client (Choix Pulumi Raison Infra multi-tenant complexe Logique métier infra Besoin générer config dynamiquement). Ces cas montrent quand chaque outil fait sens.

## Erreurs fréquentes

**Terraform pour équipe développeurs forte**  
Équipe développeurs forte Infra complexe logique métier Besoin tests unitaires poussés TypeScript/Python/Go déjà mastered. **Résultat :**  HCL limité, tests difficiles, productivité réduite. Mieux vaut Pulumi équipe développeurs forte (Type safety TypeScript Python Go IDE support Tests unitaires réels Abstraction complexe Infra dynamique basée API Policy as Code intégré).

**Pulumi pour équipe infra/ops**  
Équipe majoritairement Ops/infra Multi-cloud complexe Écosystème modules mature requis Compétences HCL déjà présentes. **Résultat :**  courbe apprentissage élevée, écosystème moins mature. Mieux vaut Terraform équipe infra/ops (Écosystème mature 4000+ providers officiels State management robuste Import ressources existantes).

**Choix sans POC**  
Choisir Terraform ou Pulumi sans POC. **Résultat :**  choix non optimal, productivité réduite. Mieux vaut faire POC 1 feature simple Mesurer vitesse dev bugs satisfaction équipe Décider avec vraie data.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Faire POC 1 feature simple avant choix**  
Plutôt que choisir sans POC, faire POC 1 feature simple avant choix (Faire POC 1 feature simple, Mesurer vitesse dev bugs satisfaction équipe, Décider avec vraie data). Ce POC permet de choisir avec de la vraie data.

**Choisir selon équipe plutôt qu'universel**  
Plutôt que Terraform toujours ou Pulumi toujours, choisir selon équipe plutôt qu'universel (Terraform équipe infra/ops multi-cloud écosystème mature Équipe majoritairement Ops/infra Multi-cloud complexe Écosystème modules mature requis Compétences HCL déjà présentes, Pulumi équipe développeurs forte infra complexe tests unitaires Équipe développeurs forte Infra complexe logique métier Besoin tests unitaires poussés TypeScript/Python/Go déjà mastered). Cette sélection optimise la productivité.

**Considérer approche hybride**  
Plutôt que choix exclusif, considérer approche hybride (Core Infra Terraform VPC IAM Stabilité Terraform base App Infra Pulumi App-specific Flexibilité Pulumi apps). Cette approche hybride peut être pertinente selon contexte.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
