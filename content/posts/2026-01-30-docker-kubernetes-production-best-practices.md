---
author:
- Kevin Delfour
title: 'Docker et Kubernetes en production : Best practices qui évitent les pièges'
date: 2026-01-30
description: 'Guide pratique pour Docker et Kubernetes en production : sécurité, performance,
  monitoring et patterns qui fonctionnent vraiment.'
categories:
- developpement
series:
- Développement
tags:
- docker
- kubernetes
- containers
- devops
- production
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
---
"Docker ça marche en local, mais en prod..." Les pièges de Docker et Kubernetes en production sont nombreux. Voici les best practices qui évitent les erreurs coûteuses.

## TL;DR : Pièges à éviter

**Top 5 erreurs en production :**
1. **Images trop grosses** : +300% temps déploiement
2. **Secrets en clair** : Risque sécurité critique
3. **Ressources non limitées** : OOM kills, instabilité
4. **Health checks manquants** : Détection problèmes tardive
5. **Logs non centralisés** : Debugging impossible

## 1. Docker : Images optimisées

### Le problème : Images obèses

```dockerfile
# ❌ Image de 2.5GB
FROM node:18
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

**Problèmes :**
- Temps build : 10+ min
- Temps pull : 2+ min
- Surface attaque : Énorme
- Coût storage : Élevé

### Solution : Multi-stage builds

```dockerfile
# ✅ Image finale de 150MB
# Stage 1 : Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2 : Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER node
CMD ["node", "index.js"]
```

**Gain :** -94% taille image, -80% temps build

### Optimisations supplémentaires

```dockerfile
# ✅ Image optimale
FROM node:18-alpine AS builder

# Layer caching optimisé
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

FROM node:18-alpine
WORKDIR /app

# Copie seulement nécessaire
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

# Non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js

EXPOSE 3000
CMD ["node", "index.js"]
```

**Best practices :**
- Utiliser images Alpine (base minimale)
- Multi-stage pour séparer build/runtime
- Layer caching (dépendances avant code)
- Non-root user (sécurité)
- Health checks intégrés

## 2. Kubernetes : Ressources et limites

### Le problème : Pas de limites

```yaml
# ❌ Pas de limites = Instabilité
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:latest
    # Pas de resources définies
```

**Conséquences :**
- Pod peut consommer toute la RAM
- OOM kills aléatoires
- Pas de garantie de ressources
- Surcharge du cluster

### Solution : Requests et limits

```yaml
# ✅ Ressources définies
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"
```

**Explication :**
- **requests** : Ressources garanties (scheduling)
- **limits** : Maximum autorisé (OOM si dépassé)

### Calcul des ressources

**Méthode :**
1. Mesurer en dev/staging
2. Ajouter 20% buffer
3. Ajuster selon métriques prod

```bash
# Mesurer utilisation réelle
kubectl top pod myapp-pod

# Résultat :
# NAME          CPU(cores)   MEMORY(bytes)
# myapp-pod     180m         320Mi

# Configuration :
resources:
  requests:
    cpu: "200m"    # 180m + 10% buffer
    memory: "384Mi" # 320Mi + 20% buffer
  limits:
    cpu: "400m"    # 2x request
    memory: "512Mi" # 1.5x request
```

## 3. Sécurité : Secrets et RBAC

### Secrets : Ne jamais en clair

```yaml
# ❌ Secrets en clair dans le code
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    env:
    - name: DB_PASSWORD
      value: "super-secret-123" # ❌ DANGER
```

### Solution : Kubernetes Secrets

```yaml
# ✅ Secret créé séparément
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  password: super-secret-123
---
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: password
```

**Meilleure pratique :** Utiliser un secret manager externe (AWS Secrets Manager, HashiCorp Vault)

```yaml
# Avec External Secrets Operator
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: db-credentials
  data:
  - secretKey: password
    remoteRef:
      key: prod/db/password
```

### RBAC : Principe du moindre privilège

```yaml
# ✅ RBAC minimal
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-deployer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "create", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-deployer-binding
subjects:
- kind: User
  name: developer
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: app-deployer
  apiGroup: rbac.authorization.k8s.io
```

## 4. Health Checks : Détection précoce

### Liveness probe : L'app fonctionne-t-elle ?

```yaml
# ✅ Liveness probe
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:latest
    livenessProbe:
      httpGet:
        path: /health
        port: 3000
      initialDelaySeconds: 30
      periodSeconds: 10
      timeoutSeconds: 3
      failureThreshold: 3
```

**Comportement :**
- Si échec → Pod redémarré
- Détecte app bloquée (deadlock, etc.)

### Readiness probe : L'app est-elle prête ?

```yaml
# ✅ Readiness probe
readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 2
```

**Comportement :**
- Si échec → Pod retiré du service
- Détecte app pas encore prête (DB connexion, etc.)

### Startup probe : Démarrage lent

```yaml
# ✅ Startup probe pour apps lentes
startupProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 0
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 30  # 5 min max
```

**Comportement :**
- Désactive liveness/readiness pendant démarrage
- Évite redémarrages pendant initialisation

## 5. Deployments : Stratégies de déploiement

### Rolling Update : Déploiement progressif

```yaml
# ✅ Rolling update (par défaut)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # +1 pod pendant update
      maxUnavailable: 0  # 0 pod down pendant update
  template:
    spec:
      containers:
      - name: app
        image: myapp:v2
```

**Avantages :**
- Pas de downtime
- Rollback facile
- Dégradation progressive si problème

### Blue/Green : Déploiement instantané

```yaml
# Blue deployment (actuel)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-blue
spec:
  replicas: 3
  template:
    metadata:
      labels:
        version: blue
    spec:
      containers:
      - name: app
        image: myapp:v1
---
# Green deployment (nouveau)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-green
spec:
  replicas: 3
  template:
    metadata:
      labels:
        version: green
    spec:
      containers:
      - name: app
        image: myapp:v2
---
# Service bascule vers green
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    version: green  # Bascule vers green
```

**Avantages :**
- Rollback instantané (bascule selector)
- Test green avant bascule
- Pas de mélange versions

## 6. Monitoring et Observability

### Métriques : Prometheus

```yaml
# ✅ Exporter métriques
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:latest
    ports:
    - containerPort: 3000
      name: http
    - containerPort: 9090
      name: metrics
---
# ServiceMonitor pour Prometheus
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp-metrics
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
  - port: metrics
    path: /metrics
    interval: 30s
```

### Logs : Centralisation

```yaml
# ✅ Sidecar pour logs
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:latest
  - name: log-collector
    image: fluent/fluent-bit:latest
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
    env:
    - name: LOG_OUTPUT
      value: "elasticsearch"
```

**Alternative :** DaemonSet Fluentd/Fluent Bit sur chaque node

### Tracing : Distributed tracing

```yaml
# ✅ Injection sidecar pour tracing
apiVersion: v1
kind: Pod
metadata:
  annotations:
    sidecar.istio.io/inject: "true"
spec:
  containers:
  - name: app
    image: myapp:latest
    env:
    - name: JAEGER_AGENT_HOST
      value: "localhost"
    - name: JAEGER_AGENT_PORT
      value: "6831"
```

## 7. Autoscaling : Scalabilité automatique

### HPA : Horizontal Pod Autoscaler

```yaml
# ✅ Autoscaling basé sur CPU
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

**Comportement :**
- Si CPU >70% → Scale up
- Si CPU <70% → Scale down
- Entre min (2) et max (10) replicas

### VPA : Vertical Pod Autoscaler

```yaml
# ✅ Ajustement automatique des ressources
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: myapp-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  updatePolicy:
    updateMode: "Auto"  # ou "Off", "Initial", "Recreate"
```

**Comportement :**
- Analyse utilisation réelle
- Ajuste requests/limits automatiquement
- Recommande ou applique changements

## Checklist : Production-ready

### Docker

- [ ] Multi-stage builds
- [ ] Images Alpine (base minimale)
- [ ] Non-root user
- [ ] Health checks
- [ ] Secrets pas en clair
- [ ] Layer caching optimisé

### Kubernetes

- [ ] Resources requests/limits définies
- [ ] Health checks (liveness/readiness/startup)
- [ ] Secrets via Kubernetes Secrets ou externe
- [ ] RBAC configuré (moindre privilège)
- [ ] Deployment strategy définie
- [ ] Autoscaling configuré
- [ ] Monitoring métriques
- [ ] Logs centralisés
- [ ] Network policies (sécurité)

## Conclusion

Docker et Kubernetes en production, c'est :
- **Sécurité** : Secrets, RBAC, non-root
- **Performance** : Images optimisées, ressources définies
- **Fiabilité** : Health checks, autoscaling
- **Observability** : Métriques, logs, tracing
- **Scalabilité** : HPA/VPA, stratégies déploiement

**Prochaine étape :** Audit ton setup actuel avec cette checklist et identifie les 3 priorités à corriger.
