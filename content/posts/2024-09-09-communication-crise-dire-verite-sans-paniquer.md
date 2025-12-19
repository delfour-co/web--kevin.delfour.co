---
author: ["Kevin Delfour"]
title: "Communication de crise : dire la vérité sans paniquer"
date: 2024-09-09
slug: "communication-crise-dire-verite-sans-paniquer"
description: "Gérer la communication pendant un incident majeur : transparence, calme et actions concrètes."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["crise", "communication", "incident", "leadership"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Incident majeur. Production down. Clients impactés. CEO qui appelle. Board qui demande des comptes. L'équipe est stressée. Comment communiquer dans ce chaos ?

Ce que j'ai observé : la communication en crise révèle la vraie maturité d'un CTO. Paniquer contagie la panique. Mentir détruit la confiance. Dire la vérité calmement crée de la confiance durable.

## Le faux problème

Le faux problème serait de croire qu'il faut tout expliquer immédiatement. En réalité, en pleine crise, on ne sait souvent pas tout. L'enjeu est de communiquer ce qu'on sait, ce qu'on ne sait pas, et ce qu'on fait.

Un autre faux problème : penser qu'il faut protéger le business de la vérité. En réalité, mentir ou minimiser crée plus de problèmes que de dire la vérité inconfortable.

## Le vrai enjeu CTO

Le vrai enjeu est de gérer plusieurs audiences simultanément avec des besoins différents :

**Les 4 audiences en crise** :

**Audience 1 - L'équipe technique** : Besoin : direction claire, pas de panique, support. **Message:** "Voici ce qu'on sait, voici le plan, vous gérez cette partie, je gère la communication externe." **Fréquence:** updates toutes les 30-60 min en pleine crise.

**Audience 2 - Le CEO / Management** : Besoin : facts, impact business, ETA, plan. **Message:** "Incident X affecte Y clients, cause probable Z, ETA résolution H+N, actions en cours." **Fréquence:** update toutes les 2h ou quand changement majeur.

**Audience 3 - Les clients** : Besoin : reconnaissance problème, transparence impact, ETA. **Message:** "Nous sommes conscients de l'incident. X% clients affectés. Équipe mobilisée. ETA H+N." **Fréquence:** status page updated toutes les heures.

**Audience 4 - Le board** : Besoin : gravité, impact business, actions, leçons. **Message:** Post-crise, pas pendant. Post-mortem complet avec causes, impact, actions, prévention. Timing : 3-5 jours après résolution.

**Le framework de communication** :

**Phase 1 - Détection (H0-H0.5)** : Actions : confirmer incident, évaluer impact, mobiliser équipe. Communication : interne équipe uniquement. Statut : "investigating".

**Phase 2 - Containment (H0.5-H2)** : Actions : limiter dégâts, identifier cause, plan résolution. Communication : CEO, status page "incident confirmé", update équipe. Statut : "identified, working on fix".

**Phase 3 - Résolution (H2-HN)** : Actions : fix en cours, tests, déploiement. Communication : updates réguliers toutes audiences, ETA ajusté. Statut : "fixing, ETA H+N".

**Phase 4 - Post-mortem (J+3 à J+7)** : Actions : analyse cause racine, actions prévention. Communication : post-mortem public (clients), private (board). Statut : "resolved, lessons learned".

## Cadre de décision

Voici comment je gère la communication en crise :

**1. Template incident prêt**
Message CEO, message status page, message équipe. Templates préremplis à adapter. Gagner 20 min critiques.

**2. Rôles clairs**
Incident commander (résolution), Communication lead (externe), Tech lead (équipe). Séparation claire évite surcharge.

**3. Les 3 règles de communication**
- Vérité : dire ce qu'on sait, admettre ce qu'on ne sait pas
- Calme : pas de panique dans le message, factuel
- **Action:** toujours dire ce qu'on fait, pas juste le problème

**4. Fréquence par audience**
Équipe : 30-60 min. CEO : 2h. Clients : 1h (status page). Board : post-crise uniquement.

**5. Post-mortem blameless obligatoire**
3-5 jours post-incident : analyse, actions, communication publique si pertinent. Pas de blame, focus amélioration.

## Retour terrain

Ce que j'ai observé dans différentes crises :

**La panique communiquée** : CTO stressé en réunion : "C'est la catastrophe, tout est cassé, je ne sais pas quoi faire." **Résultat:**  panique généralisée, équipe paralysée, clients paniqués.

**Le mensonge qui détruit** : CTO minimise : "Petit incident, 5 min." 3h plus tard toujours down. **Résultat:**  crédibilité détruite, CEO furieux, clients betrayed.

**La communication calm & clear** : Incident majeur. CTO au CEO : "Production down, 60% clients impactés, cause identifiée, fix en cours, ETA 2h." Updates toutes les 2h. Résolution en 2h15. Post-mortem 5 jours après. **Résultat:**  confiance maintenue, clients rassurés.

**L'exemple concret** : DB crash, 100% prod down. H0.5 : "Incident confirmé, DB primaire down, basculement secondaire en cours." H2 : "Failover réussi, prod up, investigating cause." H4 : "Root cause identifiée (disk full), actions prévention documentées." J+5 : post-mortem public.

## Erreurs fréquentes

**Pas de préparation**
Découvrir pendant crise qu'il faut écrire template. **Résultat:**  temps perdu, messages incohérents.

**Sur-promettre l'ETA**
"Résolu dans 30 min" par optimisme. 3h plus tard toujours en cours. **Résultat:**  crédibilité détruite.

**Communication floue**
"Problème technique en cours." **Résultat:**  customers imaginent le pire, rumeurs, frustration.

**Pas de post-mortem**
Résoudre et passer à autre chose. **Résultat:**  même incident se répète, aucun apprentissage.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Préparer templates en avance**
Message CEO, status page, équipe. Prêts à adapter. Ces templates économisent temps précieux en crise.

**Définir rôles incident dès le début**
Incident commander, communication lead, tech leads. Simuler une fois. Cette préparation évite chaos.

**Communiquer vérité même inconfortable**
"On ne sait pas encore" vaut mieux que inventer. "ETA incertain" vaut mieux que "30 min" non tenu.

**Post-mortem systématique et public**
Chaque incident >30 min : post-mortem interne + public (si pertinent). Cette transparence construit confiance long terme.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore la gestion de crise avec des exemples réels de communication réussie et ratée.

Pour approfondir, tu peux aussi consulter les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
