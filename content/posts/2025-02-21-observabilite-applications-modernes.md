---
author:
- Kevin Delfour
title: 'Observabilité des applications modernes : voir au-delà des logs'
date: 2025-02-21
description: Guide pratique pour implémenter une observabilité efficace avec métriques,
  traces et logs structurés, adaptée aux architectures distribuées
categories:
- architecture
series:
- Tech
tags:
- observabilite
- monitoring
- logs
- metriques
- devops
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

"Ça marchait hier, pourquoi ça ne marche plus aujourd'hui ?" Cette phrase, tout développeur l'a prononcée au moins une fois. Dans un monolithe simple, on peut encore s'en sortir en regardant les logs. Mais avec des architectures distribuées, des microservices et des déploiements fréquents, cette approche montre vite ses limites.

Ce que j'ai observé : l'observabilité moderne va bien au-delà du simple monitoring. C'est la capacité à comprendre l'état interne d'un système à partir de ses données externes. Une observabilité efficace n'est pas qu'une question d'outils, c'est une culture. Elle change la façon dont on développe, déploie et maintient les applications. L'objectif n'est pas de tout surveiller, mais de voir ce qui compte vraiment. Commencez simple avec les Golden Signals, puis enrichissez progressivement avec des métriques business et des traces détaillées. Dans un monde où les systèmes deviennent de plus en plus complexes, l'observabilité n'est plus un luxe : c'est une nécessité pour maintenir la qualité de service et la vélocité de développement.

## Le faux problème

Le faux problème serait de croire que l'observabilité moderne est juste du monitoring amélioré. En réalité, l'observabilité moderne va bien au-delà du simple monitoring. C'est la capacité à comprendre l'état interne d'un système à partir de ses données externes. Cette distinction est importante pour comprendre comment diagnostiquer les problèmes dans un système distribué.

Un autre faux problème : penser qu'il faut tout surveiller dès le début. En réalité, l'objectif n'est pas de tout surveiller, mais de voir ce qui compte vraiment. Commencez simple avec les Golden Signals, puis enrichissez progressivement avec des métriques business et des traces détaillées. Cette approche progressive facilite l'adoption.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment implémenter une observabilité efficace pour diagnostiquer les problèmes rapidement :

**Les trois piliers observabilité** : Logs récit ce qui s'est passé (Logs structurés vs logs textuels Log textuel difficile parser console.log User userId failed login from ip at new Date, Log structuré facilement analysable logger.info User login failed userId ip timestamp new Date.toISOString event login_failed metadata userAgent req.headers user-agent attemptNumber 3 reason invalid_credentials, Niveaux log pertinents Structure logging par niveau ERROR Something failed requires action examples Database connection lost Payment processing failed alerting true WARN Something unexpected recoverable happened examples Retry successful failure Deprecated API used alerting false INFO Significant business events examples User registered Order completed Service started alerting false DEBUG Detailed execution flow development only examples Function parameters SQL queries HTTP requests alerting false). Métriques signaux vitaux système (Les quatre métriques fondamentales Golden Signals Instrumenter Golden Signals Latency Temps réponse latency histogram http_request_duration_seconds help Duration HTTP requests seconds labelNames method route status_code Traffic Volume requêtes traffic counter http_requests_total help Total number HTTP requests labelNames method route status_code Errors Taux erreur errors counter http_requests_errors_total help Total number HTTP request errors labelNames method route error_type Saturation Utilisation ressources saturation gauge system_resource_usage help System resource usage percentage). Traces parcours requêtes système distribué (Tracing distribué reconstitue parcours complet requête travers tous services Composants clés Trace voyage complet requête cross-services Span opération individuelle service Span attributes métadonnées key-value contexte Span events occurrences ponctuelles spans Stratégies échantillonnage sampling Head-based décision début trace simple limité Tail-based décision après completion complexe puissant Adaptive échantillonnage dynamique selon charge système Bonnes pratiques implémentation Utiliser histogrammes latences pas moyennes Taggez métriques dimensions pertinentes Implémenter alerting basé SLI/SLO Surveiller golden signals latency traffic errors saturation).

**Infrastructure métriques système** : Docker containers monitoring (docker-compose.yml monitoring version 3.8 services app build environment OTEL_EXPORTER_JAEGER_ENDPOINT http://jaeger:14268 labels monitoring.enable=true monitoring.port=9090 prometheus image prom/prometheus ports 9090:9090 volumes ./prometheus.yml:/etc/prometheus/prometheus.yml command --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheus --web.console.libraries=/etc/prometheus/console_libraries --web.console.templates=/etc/prometheus/consoles --storage.tsdb.retention.time=200h --web.enable-lifecycle grafana image grafana/grafana ports 3001:3000 environment GF_SECURITY_ADMIN_PASSWORD=admin volumes grafana-storage:/var/lib/grafana ./grafana/dashboards:/etc/grafana/provisioning/dashboards ./grafana/datasources:/etc/grafana/provisioning/datasources). Configuration Prometheus (prometheus.yml global scrape_interval 15s evaluation_interval 15s rule_files alert_rules.yml scrape_configs job_name node-app static_configs targets app:9090 scrape_interval 5s metrics_path /metrics job_name node-exporter static_configs targets node-exporter:9100). Cette infrastructure facilite la collecte et la visualisation des métriques.

**Alerting être prévenu bon moment** : Règles alerte intelligentes (alert_rules.yml groups name application.rules rules Taux erreur élevé alert HighErrorRate expr rate http_requests_errors_total 5m / rate http_requests_total 5m >0.05 for 2m labels severity warning annotations summary High error rate detected description Error rate is value humanizePercentage for last 5 minutes Latence élevée alert HighLatency expr histogram_quantile 0.95 rate http_request_duration_seconds_bucket 5m >1 for 5m labels severity critical annotations summary High latency detected description 95th percentile latency is value s for last 5 minutes Service down alert ServiceDown expr up ==0 for 1m labels severity critical annotations summary Service is down description labels.instance has been down more than 1 minute name business.rules rules Baisse conversion alert ConversionRateDrop expr orders_conversion_rate <0.02 for 10m labels severity warning team product annotations summary Conversion rate dropped significantly description Conversion rate is value humanizePercentage below 2%). Notifications contextuelles (Webhook alertmanager Slack enrichi app.post /webhook/alerts req res const alerts req.body.alerts alerts.forEach alert const slackMessage channel getChannelForAlert alert attachments color getColorForSeverity alert.labels.severity title alert.annotations.summary text alert.annotations.description fields title Service value alert.labels.job short true title Environment value alert.labels.environment short true title Runbook value getRunbookUrl alert.labels.alertname View runbook short false actions name acknowledge text Acknowledge type button value alert.fingerprint name silence text Silence 1h type button value alert.fingerprint footer Prometheus Alert ts new Date alert.startsAt.getTime /1000 sendSlackMessage slackMessage res.status 200.send OK). Cette alerting permet de détecter et répondre aux incidents rapidement.

## Cadre de décision

Voici les principes qui m'ont aidé à implémenter une observabilité efficace :

**1. Les trois piliers complémentaires plutôt qu'un seul**  
Logs récit ce qui s'est passé (Logs structurés vs logs textuels Log structuré facilement analysable logger.info User login failed userId ip timestamp event metadata, Niveaux log pertinents ERROR Something failed requires action WARN Something unexpected recoverable happened INFO Significant business events DEBUG Detailed execution flow development only). Métriques signaux vitaux système (Les quatre métriques fondamentales Golden Signals Latency Temps réponse Traffic Volume requêtes Errors Taux erreur Saturation Utilisation ressources). Traces parcours requêtes système distribué (Tracing distribué reconstitue parcours complet requête Composants clés Trace Span Span attributes Span events Stratégies échantillonnage Head-based Tail-based Adaptive Bonnes pratiques histogrammes latences taggez métriques alerting basé SLI/SLO surveiller golden signals). Ces 3 piliers complémentaires donnent vision complète comportement système.

**2. Infrastructure métriques système**  
Docker containers monitoring (docker-compose.yml monitoring app prometheus grafana labels monitoring.enable monitoring.port environment OTEL_EXPORTER_JAEGER_ENDPOINT ports volumes). Configuration Prometheus (prometheus.yml global scrape_interval evaluation_interval rule_files alert_rules.yml scrape_configs job_name node-app node-exporter static_configs targets scrape_interval metrics_path). Cette infrastructure facilite la collecte et la visualisation des métriques.

**3. Alerting intelligent plutôt que seuils statiques**  
Règles alerte intelligentes (alert_rules.yml groups application.rules rules HighErrorRate HighLatency ServiceDown business.rules rules ConversionRateDrop labels severity annotations summary description). Notifications contextuelles (Webhook alertmanager Slack enrichi slackMessage channel attachments color title text fields actions acknowledge silence footer ts sendSlackMessage). Cette alerting permet de détecter et répondre aux incidents rapidement.

**4. Dashboards par audience**  
Dashboard développeur focus debug (Developer Debug Dashboard panels Request Rate by Endpoint graph targets expr rate http_requests_total 5m legendFormat method route Error Rate by Service singlestat targets expr rate http_requests_errors_total 5m / rate http_requests_total 5m *100 Recent Error Logs logs targets expr level="error" Database Query Performance heatmap targets expr rate db_query_duration_seconds_bucket 5m). Dashboard business focus métier (Business Metrics Dashboard panels Daily Active Users stat targets expr daily_active_users legendFormat DAU Conversion Funnel barchart targets visits_total signups_total purchases_total Revenue Trend timeseries targets expr increase revenue_total 1d legendFormat Daily Revenue). Ces dashboards donnent vision adaptée selon audience.

**5. Corrélation multi-sources liens intelligents entre outils**  
Enrichir logs liens traces (logger.info Payment processed orderId amount paymentMethod traceUrl https://jaeger.company.com/trace/traceId metricsUrl https://grafana.company.com/d/payments?var-order_id=orderId). Cette corrélation permet de diagnostiquer les problèmes rapidement.

## Retour terrain

Ce que j'ai observé dans différents systèmes :

**Ce qui fonctionne** : Les trois piliers complémentaires (Logs structurés vs logs textuels Niveaux log pertinents ERROR WARN INFO DEBUG, Métriques Golden Signals Latency Traffic Errors Saturation, Traces parcours requêtes système distribué Tracing distribué Composants clés Trace Span Span attributes Stratégies échantillonnage Bonnes pratiques histogrammes latences taggez métriques alerting basé SLI/SLO surveiller golden signals) donnent vision complète comportement système. Infrastructure métriques système (Docker containers monitoring docker-compose.yml Prometheus Grafana, Configuration Prometheus prometheus.yml scrape_configs) facilite collecte visualisation métriques. Alerting intelligent (Règles alerte intelligentes alert_rules.yml HighErrorRate HighLatency ServiceDown ConversionRateDrop, Notifications contextuelles Webhook alertmanager Slack enrichi) permet détecter répondre incidents rapidement.

**Ce qui bloque** : Monitoring classique seul (Logs textuels difficiles parser, Pas métriques Golden Signals, Pas traces distribué). **Résultat:**  diagnostic difficile, MTTR élevé. Mieux vaut observabilité moderne (Logs structurés Niveaux log pertinents, Métriques Golden Signals Latency Traffic Errors Saturation, Traces parcours requêtes système distribué). Pas d'infrastructure métriques (Pas Prometheus Grafana, Pas configuration scraping). **Résultat:**  métriques non collectées, visualisation impossible. Mieux vaut infrastructure métriques système (Docker containers monitoring Prometheus Grafana, Configuration Prometheus scrape_configs).


**Plan mise en œuvre** : Phase 1 Fondations Semaines 1-2 (Logs structurés migrer console.log vers logger structuré, Métriques base instrumenter HTTP requests/responses, Health checks endpoint /health détaillé, Environnement local Prometheus + Grafana local). Phase 2 Visibilité Semaines 3-4 (Dashboard développeur métriques techniques essentielles, Alertes critiques service down erreur rate élevé, Distributed tracing setup OpenTelemetry base, Log aggregation centraliser logs structure). Phase 3 Corrélation Mois 2 (Métriques business conversion usage features, Traces détaillées instrumenter logique métier critique, Dashboard business KPIs temps réel, Alertes métier baisse conversion churn). Phase 4 Optimisation Mois 3+ (SLOs/SLIs définir objectifs performance, Runbooks procédures résolution incidents, Chaos engineering tester résilience, Post-mortem process apprendre incidents). Ce plan progressif facilite l'adoption.

## Erreurs fréquentes

**Monitoring classique seul**  
Logs textuels difficiles parser, Pas métriques Golden Signals, Pas traces distribué. **Résultat:**  diagnostic difficile, MTTR élevé. Mieux vaut observabilité moderne (Logs structurés Niveaux log pertinents ERROR WARN INFO DEBUG, Métriques Golden Signals Latency Traffic Errors Saturation, Traces parcours requêtes système distribué).

**Pas d'infrastructure métriques**  
Pas Prometheus Grafana, Pas configuration scraping. **Résultat:**  métriques non collectées, visualisation impossible. Mieux vaut infrastructure métriques système (Docker containers monitoring Prometheus Grafana, Configuration Prometheus scrape_configs).

**Alerting trop bruit**  
Alertes sans règles criticité sans notifications contextuelles. **Résultat:**  fatigue alertes, alertes ignorées. Mieux vaut alerting intelligent (Règles alerte intelligentes HighErrorRate HighLatency ServiceDown ConversionRateDrop, Notifications contextuelles Webhook alertmanager Slack enrichi).

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Mettre en place trois piliers complémentaires dès le début**  
Plutôt que monitoring classique seul, mettre en place trois piliers complémentaires dès le début (Logs structurés Niveaux log pertinents ERROR WARN INFO DEBUG, Métriques Golden Signals Latency Traffic Errors Saturation, Traces parcours requêtes système distribué Tracing distribué Composants clés Trace Span Stratégies échantillonnage Bonnes pratiques). Ces 3 piliers complémentaires donnent vision complète comportement système dès le départ.

**Mettre en place infrastructure métriques dès le début**  
Plutôt que pas d'infrastructure métriques, mettre en place infrastructure métriques dès le début (Docker containers monitoring Prometheus Grafana, Configuration Prometheus scrape_configs). Cette infrastructure facilite la collecte et la visualisation des métriques.

**Mettre en place alerting intelligent dès le début**  
Plutôt qu'alerting trop bruit, mettre en place alerting intelligent dès le début (Règles alerte intelligentes HighErrorRate HighLatency ServiceDown ConversionRateDrop, Notifications contextuelles Webhook alertmanager Slack enrichi). Cette alerting permet de détecter et répondre aux incidents rapidement.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
