---
author:
- Kevin Delfour
title: 'Machine Learning en production : budget, équipes et ROI réel'
date: 2025-06-13
description: 'Retour d''expérience sur le déploiement ML en production : coûts infrastructure,
  équipes nécessaires, métriques business et décisions techniques pragmatiques.'
categories:
- ia
series:
- IA & Productivité
tags:
- machine-learning
- mlops
- production
- budget
- roi
- infrastructure
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

Faire du ML en production, c'est 10% de data science et 90% d'infrastructure. Après avoir déployé plusieurs projets ML en prod, voici les vraies métriques qui comptent : combien ça coûte, quelles équipes tu as besoin, et comment justifier le ROI auprès du board.

Ce que j'ai observé : le budget ML qui tue. Sur projet recommendation engine 100M users 50K RPS, vrais coûts mensuels Infrastructure Serving AWS Model serving 12x c5.2xlarge $3,600/mois Feature store Redis Cluster $2,400/mois Data pipeline Airflow + workers $1,800/mois Monitoring stack Prometheus Grafana $600/mois Total serving $8,400/mois Training Infrastructure GPU training p3.8xlarge 40h/mois $4,200/mois Data storage S3 500TB $1,200/mois Compute feature engineering $2,100/mois Total training $7,500/mois Équipes nécessaires coûts annuels 2x Data Scientists seniors 140k€ chacun 280k€ 1x ML Engineer 120k€ 120k€ 0.5x Platform Engineer 130k€ 65k€ 0.3x DevOps spécialisé 140k€ 42k€ Total équipes 507k€/an ROI réel +18% click-through rate → +2.3M€ revenus annuels Payback period 8 mois Pas mal mais jamais linéaire. Le ML production c'est 10% data science 90% ingénierie. Si tu veux recherche reste lab. Si tu veux impact business investis infrastructure.

## Le faux problème

Le faux problème serait de croire qu'il faut une infrastructure ML complexe dès le début. En réalité, il faut commencer simple. Si tu commences aujourd'hui (1 Start small FastAPI + scikit-learn + Redis Pas K8s avant trafic réel 2 Monitoring first investis observabilité jour 1 3 Managed services utilise SageMaker/Vertex AI training tant que pas core business 4 Data quality 80% problèmes viennent là pas modèle 5 Team first bon ML Engineer vaut mieux 3 Data Scientists sans expérience prod). Cette progression facilite l'adoption.

Un autre faux problème : penser qu'il faut choisir entre managed et self-hosted de manière exclusive. En réalité, une approche hybride peut être pertinente. Architecture decisions managed vs self-hosted (Option 1 Full managed AWS SageMaker Coût 40% plus cher mais 0 ops Time-to-market 2-3 mois Équipe 1 ML Engineer suffit Limitation vendor lock-in moins contrôle Recommandé MVP équipes <5 personnes Option 2 Self-hosted K8s Coût infrastructure -40% vs managed Coût équipes +200k€/an DevOps + Platform Time-to-market 6-9 mois Flexibilité totale complexité opérationnelle Recommandé scale >100M requests/jour Option 3 Hybride notre choix final Training sur SageMaker Serving self-hosted EKS Feature store managed Redis Cloud Monitoring custom Prometheus Sweet spot contrôle serving + simplicité training Décision technique clé après 6 mois full managed migré hybride Raison coûts serving managed explosent partir 1M predictions/jour). Cette approche hybride peut être pertinente selon contexte.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment déployer ML en production avec ROI réel :

**Le budget ML qui tue** : Sur projet recommendation engine 100M users 50K RPS, vrais coûts mensuels Infrastructure Serving AWS (Model serving 12x c5.2xlarge $3,600/mois Feature store Redis Cluster $2,400/mois Data pipeline Airflow + workers $1,800/mois Monitoring stack Prometheus Grafana $600/mois Total serving $8,400/mois). Training Infrastructure (GPU training p3.8xlarge 40h/mois $4,200/mois Data storage S3 500TB $1,200/mois Compute feature engineering $2,100/mois Total training $7,500/mois). Équipes nécessaires coûts annuels (2x Data Scientists seniors 140k€ chacun 280k€ 1x ML Engineer 120k€ 120k€ 0.5x Platform Engineer 130k€ 65k€ 0.3x DevOps spécialisé 140k€ 42k€ Total équipes 507k€/an). ROI réel (+18% click-through rate → +2.3M€ revenus annuels Payback period 8 mois Pas mal mais jamais linéaire). Ce budget montre les vrais coûts.

**Architecture decisions managed vs self-hosted** : Option 1 Full managed AWS SageMaker (Coût 40% plus cher mais 0 ops Time-to-market 2-3 mois Équipe 1 ML Engineer suffit Limitation vendor lock-in moins contrôle Recommandé MVP équipes <5 personnes). Option 2 Self-hosted K8s (Coût infrastructure -40% vs managed Coût équipes +200k€/an DevOps + Platform Time-to-market 6-9 mois Flexibilité totale complexité opérationnelle Recommandé scale >100M requests/jour). Option 3 Hybride notre choix final (Training sur SageMaker Serving self-hosted EKS Feature store managed Redis Cloud Monitoring custom Prometheus Sweet spot contrôle serving + simplicité training Décision technique clé après 6 mois full managed migré hybride Raison coûts serving managed explosent partir 1M predictions/jour). Cette comparaison aide à choisir selon contexte.

**Data pipeline vrais problèmes terrain** : Top 3 pannes ML vécues (1 Data drift silencieux 60% incidents Symptôme accuracy passe 89% 73% 2 semaines Cause changement upstream micro-service Impact business -12% conversion 8 jours Coût 340k€ manque gagner Leçon alertes distributions pas juste valeurs nulles 2 Latence explose 25% incidents Target p95 <50ms réalité p95 800ms Cause feature store Redis swap Impact timeout frontend → fallback recommendations simples Fix cache L1 mémoire + monitoring granulaire 3 Biais non détecté 15% incidents Modèle performant métriques globales Mais accuracy -15% segment "nouveaux users" Découvert 3 mois après équipe business Leçon monitoring segments pas juste global). Métriques data quality comptent vraiment (Distribution drift detection alertes KS-test >0.15 Schema validation 100% couverture sinon pipeline arrête Freshness données plus 4h alerte critique Completeness segment business pas juste global Monitoring seuils percentile p99 p95 p75). Ces problèmes montrent ce qui casse vraiment en prod.

**Stack monitoring production** : Notre setup actuel (Prometheus + Grafana métriques système business DataDog APM traces distribuées Custom dashboard métriques ML spécifiques PagerDuty alerting intelligent pas spam 3h mat' Coût monitoring 1,200€/mois DataDog APM + infra + logs). Métriques ML comptent vraiment (1 Business Impact priorité absolue Revenue impact +/- euros pas % Conversion rate segment Time-to-value nouvelles features Customer satisfaction NPS impact 2 Model Performance technical Accuracy segment pas juste globale Prediction confidence distribution Model staleness dernière ré-entraînement Feature importance drift 3 Operational Health Prediction latency p50 p95 p99 Error rate endpoint Cache hit rate Queue depth batch processing). Alertes marchent après 18 mois itérations (Niveau 1 Critical PagerDuty Serving completement down Error rate >1% 5 minutes Latence p95 >200ms SLA breach Revenue impact >-5% vs yesterday Niveau 2 Warning Slack Accuracy drop >3% vs baseline Data drift score >0.15 Cache hit rate <50% Training pipeline fail Niveau 3 Info Dashboard Model performance trending Resource utilization Feature usage statistics Le piège faux positifs commencé 47 alertes différentes Après 6 mois 8 alertes utiles reste bruit). Ce monitoring réduit les incidents.

## Cadre de décision

Voici les principes qui m'ont aidé à déployer ML en production avec ROI réel :

**1. Commencer simple plutôt que infrastructure complexe dès début**  
Si tu commences aujourd'hui (1 Start small FastAPI + scikit-learn + Redis Pas K8s avant trafic réel 2 Monitoring first investis observabilité jour 1 3 Managed services utilise SageMaker/Vertex AI training tant que pas core business 4 Data quality 80% problèmes viennent là pas modèle 5 Team first bon ML Engineer vaut mieux 3 Data Scientists sans expérience prod) plutôt que infrastructure complexe dès début. Cette progression facilite l'adoption.

**2. Architecture decisions managed vs self-hosted selon contexte**  
Option 1 Full managed AWS SageMaker (Coût 40% plus cher mais 0 ops Time-to-market 2-3 mois Équipe 1 ML Engineer suffit Limitation vendor lock-in moins contrôle Recommandé MVP équipes <5 personnes). Option 2 Self-hosted K8s (Coût infrastructure -40% vs managed Coût équipes +200k€/an DevOps + Platform Time-to-market 6-9 mois Flexibilité totale complexité opérationnelle Recommandé scale >100M requests/jour). Option 3 Hybride notre choix final (Training sur SageMaker Serving self-hosted EKS Feature store managed Redis Cloud Monitoring custom Prometheus Sweet spot contrôle serving + simplicité training Décision technique clé après 6 mois full managed migré hybride Raison coûts serving managed explosent partir 1M predictions/jour). Cette sélection optimise selon contexte.

**3. Data pipeline vrais problèmes terrain plutôt que supposer**  
Top 3 pannes ML vécues (1 Data drift silencieux 60% incidents Symptôme accuracy passe 89% 73% 2 semaines Cause changement upstream micro-service Impact business -12% conversion 8 jours Coût 340k€ manque gagner Leçon alertes distributions pas juste valeurs nulles 2 Latence explose 25% incidents Target p95 <50ms réalité p95 800ms Cause feature store Redis swap Impact timeout frontend → fallback recommendations simples Fix cache L1 mémoire + monitoring granulaire 3 Biais non détecté 15% incidents Modèle performant métriques globales Mais accuracy -15% segment "nouveaux users" Découvert 3 mois après équipe business Leçon monitoring segments pas juste global). Métriques data quality comptent vraiment (Distribution drift detection alertes KS-test >0.15 Schema validation 100% couverture sinon pipeline arrête Freshness données plus 4h alerte critique Completeness segment business pas juste global Monitoring seuils percentile p99 p95 p75). Ces problèmes montrent ce qui casse vraiment en prod.

**4. Stack monitoring production plutôt que monitoring basique**  
Notre setup actuel (Prometheus + Grafana métriques système business DataDog APM traces distribuées Custom dashboard métriques ML spécifiques PagerDuty alerting intelligent pas spam 3h mat' Coût monitoring 1,200€/mois DataDog APM + infra + logs). Métriques ML comptent vraiment (1 Business Impact priorité absolue Revenue impact +/- euros pas % Conversion rate segment Time-to-value nouvelles features Customer satisfaction NPS impact 2 Model Performance technical Accuracy segment pas juste globale Prediction confidence distribution Model staleness dernière ré-entraînement Feature importance drift 3 Operational Health Prediction latency p50 p95 p99 Error rate endpoint Cache hit rate Queue depth batch processing). Alertes marchent après 18 mois itérations (Niveau 1 Critical PagerDuty Serving completement down Error rate >1% 5 minutes Latence p95 >200ms SLA breach Revenue impact >-5% vs yesterday Niveau 2 Warning Slack Accuracy drop >3% vs baseline Data drift score >0.15 Cache hit rate <50% Training pipeline fail Niveau 3 Info Dashboard Model performance trending Resource utilization Feature usage statistics Le piège faux positifs commencé 47 alertes différentes Après 6 mois 8 alertes utiles reste bruit). Ce monitoring réduit les incidents.

**5. Budget réaliste démarrer plutôt que supposer**  
MVP ML production 0-100k users (Infrastructure 2,500€/mois Équipes 1 ML Engineer + 0.5 DevOps Outils 800€/mois monitoring + CI/CD Total ~15k€/mois salaires). Scale-up 100k-1M users (Infrastructure 8,000€/mois Équipes 2 ML Engineers + 1 Data Scientist + 1 Platform Engineer Total ~45k€/mois). Enterprise 1M+ users (Infrastructure 25,000€/mois Équipes 4-6 personnes spécialisées Total ~80k€/mois). ROI réaliste Sur 12 projets ML accompagnés (4 ROI positif payback <18 mois 3 neutres break-even 24 mois 5 arrêtés pas product-market fit coûts trop élevés Success factors Metric business claire début Équipe mixte tech + business Infrastructure simple robuste Monitoring granulaire). Ce budget montre les vrais coûts.

## Retour terrain

Ce que j'ai observé dans différents projets ML :

**Ce qui fonctionne** : Commencer simple (Si tu commences aujourd'hui 1 Start small FastAPI + scikit-learn + Redis Pas K8s avant trafic réel 2 Monitoring first investis observabilité jour 1 3 Managed services utilise SageMaker/Vertex AI training tant que pas core business 4 Data quality 80% problèmes viennent là pas modèle 5 Team first bon ML Engineer vaut mieux 3 Data Scientists sans expérience prod) facilite adoption. Architecture decisions managed vs self-hosted selon contexte (Option 1 Full managed AWS SageMaker Recommandé MVP équipes <5 personnes Option 2 Self-hosted K8s Recommandé scale >100M requests/jour Option 3 Hybride notre choix final Training sur SageMaker Serving self-hosted EKS Sweet spot contrôle serving + simplicité training) optimise selon contexte. Data pipeline vrais problèmes terrain (Top 3 pannes ML vécues 1 Data drift silencieux 60% incidents Leçon alertes distributions pas juste valeurs nulles 2 Latence explose 25% incidents Fix cache L1 mémoire + monitoring granulaire 3 Biais non détecté 15% incidents Leçon monitoring segments pas juste global Métriques data quality comptent vraiment Distribution drift detection Schema validation Freshness Completeness segment business Monitoring seuils percentile) montre ce qui casse vraiment prod. Stack monitoring production (Prometheus + Grafana métriques système business DataDog APM traces distribuées Custom dashboard métriques ML spécifiques PagerDuty alerting intelligent Coût monitoring 1,200€/mois Métriques ML comptent vraiment Business Impact Revenue impact Conversion rate segment Time-to-value nouvelles features Customer satisfaction NPS impact Model Performance Accuracy segment pas juste globale Prediction confidence distribution Model staleness Feature importance drift Operational Health Prediction latency p50 p95 p99 Error rate endpoint Cache hit rate Queue depth Alertes marchent après 18 mois itérations Niveau 1 Critical PagerDuty Niveau 2 Warning Slack Niveau 3 Info Dashboard Le piège faux positifs commencé 47 alertes différentes Après 6 mois 8 alertes utiles reste bruit) réduit incidents.

**Ce qui bloque** : Infrastructure ML complexe dès début (K8s avant trafic réel Infrastructure complexe avant besoins réels). Résultat : coûts élevés, complexité opérationnelle ingérable. Mieux vaut Commencer simple (Start small FastAPI + scikit-learn + Redis Pas K8s avant trafic réel Monitoring first investis observabilité jour 1 Managed services utilise SageMaker/Vertex AI training tant que pas core business). Pas monitoring production (Pas Prometheus + Grafana Pas DataDog APM Pas Custom dashboard métriques ML Pas PagerDuty alerting intelligent). Résultat : incidents fréquents, diagnostic difficile. Mieux vaut Stack monitoring production (Prometheus + Grafana métriques système business DataDog APM traces distribuées Custom dashboard métriques ML spécifiques PagerDuty alerting intelligent Coût monitoring 1,200€/mois Métriques ML comptent vraiment Business Impact Model Performance Operational Health Alertes marchent après 18 mois itérations Niveau 1 Critical Niveau 2 Warning Niveau 3 Info).

**ROI réaliste** : Sur 12 projets ML accompagnés (4 ROI positif payback <18 mois 3 neutres break-even 24 mois 5 arrêtés pas product-market fit coûts trop élevés Success factors Metric business claire début Équipe mixte tech + business Infrastructure simple robuste Monitoring granulaire). Budget réaliste démarrer (MVP ML production 0-100k users Infrastructure 2,500€/mois Équipes 1 ML Engineer + 0.5 DevOps Outils 800€/mois Total ~15k€/mois Scale-up 100k-1M users Infrastructure 8,000€/mois Équipes 2 ML Engineers + 1 Data Scientist + 1 Platform Engineer Total ~45k€/mois Enterprise 1M+ users Infrastructure 25,000€/mois Équipes 4-6 personnes spécialisées Total ~80k€/mois). Ce ROI montre les vrais coûts.

## Erreurs fréquentes

**Infrastructure ML complexe dès début**  
K8s avant trafic réel Infrastructure complexe avant besoins réels. Résultat : coûts élevés, complexité opérationnelle ingérable. Mieux vaut Commencer simple (Start small FastAPI + scikit-learn + Redis Pas K8s avant trafic réel Monitoring first investis observabilité jour 1 Managed services utilise SageMaker/Vertex AI training tant que pas core business).

**Pas monitoring production**  
Pas Prometheus + Grafana Pas DataDog APM Pas Custom dashboard métriques ML Pas PagerDuty alerting intelligent. Résultat : incidents fréquents, diagnostic difficile. Mieux vaut Stack monitoring production (Prometheus + Grafana métriques système business DataDog APM traces distribuées Custom dashboard métriques ML spécifiques PagerDuty alerting intelligent Coût monitoring 1,200€/mois Métriques ML comptent vraiment Business Impact Model Performance Operational Health Alertes marchent après 18 mois itérations Niveau 1 Critical Niveau 2 Warning Niveau 3 Info).

**Pas data quality monitoring**  
Pas Distribution drift detection Pas Schema validation Pas Freshness Pas Completeness segment business Pas Monitoring seuils percentile. Résultat : data drift silencieux, biais non détecté, incidents fréquents. Mieux vaut Métriques data quality comptent vraiment (Distribution drift detection alertes KS-test >0.15 Schema validation 100% couverture sinon pipeline arrête Freshness données plus 4h alerte critique Completeness segment business pas juste global Monitoring seuils percentile p99 p95 p75).

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Commencer simple systématiquement**  
Plutôt qu'infrastructure ML complexe dès début, commencer simple systématiquement (Start small FastAPI + scikit-learn + Redis Pas K8s avant trafic réel Monitoring first investis observabilité jour 1 Managed services utilise SageMaker/Vertex AI training tant que pas core business Data quality 80% problèmes viennent là pas modèle Team first bon ML Engineer vaut mieux 3 Data Scientists sans expérience prod). Cette progression facilite l'adoption.

**Mettre en place stack monitoring production dès le début**  
Plutôt que pas monitoring production, mettre en place stack monitoring production dès le début (Prometheus + Grafana métriques système business DataDog APM traces distribuées Custom dashboard métriques ML spécifiques PagerDuty alerting intelligent Coût monitoring 1,200€/mois Métriques ML comptent vraiment Business Impact Revenue impact Conversion rate segment Time-to-value nouvelles features Customer satisfaction NPS impact Model Performance Accuracy segment pas juste globale Prediction confidence distribution Model staleness Feature importance drift Operational Health Prediction latency p50 p95 p99 Error rate endpoint Cache hit rate Queue depth Alertes marchent après 18 mois itérations Niveau 1 Critical PagerDuty Niveau 2 Warning Slack Niveau 3 Info Dashboard). Ce monitoring réduit les incidents dès le départ.

**Mettre en place métriques data quality dès le début**  
Plutôt que pas data quality monitoring, mettre en place métriques data quality dès le début (Distribution drift detection alertes KS-test >0.15 Schema validation 100% couverture sinon pipeline arrête Freshness données plus 4h alerte critique Completeness segment business pas juste global Monitoring seuils percentile p99 p95 p75). Ces métriques réduisent les incidents dès le départ.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
