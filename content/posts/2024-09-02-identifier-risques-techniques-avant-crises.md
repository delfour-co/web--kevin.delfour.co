---
author: ["Kevin Delfour"]
title: "Identifier les risques techniques avant qu'ils deviennent des crises"
date: 2024-09-02
slug: "identifier-risques-techniques-avant-crises"
description: "L'art de voir les problèmes venir : signaux faibles et systèmes d'alerte précoce."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["risques", "anticipation", "prevention", "crise"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"On a un incident majeur." "Depuis quand ce problème existe ?" "Euh... probablement 6 mois." La plupart des crises tech sont prévisibles si on sait où regarder.

Ce que j'ai observé : les bons CTOs ne sont pas plus chanceux que les autres. Ils ont juste des systèmes pour voir les risques avant qu'ils explosent.

## Le faux problème

Le faux problème serait de croire qu'on peut prévenir toutes les crises. En réalité, certaines sont imprévisibles. L'enjeu est de détecter et prévenir les 80% qui sont prévisibles.

Un autre faux problème : penser qu'il faut surveiller tout. En réalité, il faut surveiller les bons signaux, pas tous les signaux.

## Le vrai enjeu CTO

Le vrai enjeu est de construire des systèmes d'alerte précoce pour les risques critiques :

**Les 6 catégories de risques techniques** :

**Risque 1 - Scalabilité** : Signaux : croissance trafic +50%/mois, temps réponse qui augmente, DB queries qui ralentissent. Seuil d'alerte : performance -20% sur trend 3 mois. Actions préventives : load testing, architecture review, migration planning.

**Risque 2 - Sécurité** : Signaux : dependencies obsolètes, tentatives intrusion, configurations by default. Seuil d'alerte : >10 CVE critiques non patchées. Actions préventives : security audit trimestriel, dependency scanning automatisé.

**Risque 3 - Dette technique** : Signaux : vélocité en baisse, onboarding qui rallonge, bugs récurrents. Seuil d'alerte : vélocité -30% vs 6 mois avant. Actions préventives : mesure dette mensuelle, allocation 20% remboursement.

**Risque 4 - Dépendance à une personne** : Signaux : 1 personne connaît module critique, knowledge hoarding, documentation absente. Seuil d'alerte : bus factor = 1 sur composant critique. Actions préventives : pair programming, documentation, rotation.

**Risque 5 - Vendor lock-in** : Signaux : dépendance croissante à vendor, pricing qui augmente, roadmap désalignée. Seuil d'alerte : coût vendor ×2 en 12 mois ou feature critique bloquée. Actions préventives : abstraction layer, plan B documenté.

**Risque 6 - Obsolescence techno** : Signaux : framework plus maintenu, difficulty recruter, talent qui part pour "tech moderne". Seuil d'alerte : techno >5 ans sans maj ou EOL annoncée. Actions préventives : tech radar trimestriel, migration planning.

**Le système d'alerte précoce** :

**Layer 1 - Métriques automatisées** : Dashboard : performance, error rate, dependency vulnerabilities, debt metrics. Review : hebdomadaire (métriques), mensuel (trends), trimestriel (risques structurels).

**Layer 2 - Signaux humains** : One-on-ones : "Qu'est-ce qui t'inquiète ?", "Quel risque tu vois venir ?". Retros : postmortems préventifs "What could go wrong ?". Anonymous feedback : channel Slack pour signaler risques sans jugement.

**Layer 3 - Audit externe** : Security audit : annuel. Architecture review : semestriel. Pentest : annuel. Ces audits externes révèlent angles morts.

## Cadre de décision

Voici mon système d'identification des risques :

**1. Dashboard risques mensuel**
6 catégories, score 1-10 par catégorie, trend. Review mensuel comex. Seuils d'alerte documentés.

**2. Rituel "What could go wrong ?"**
Trimestre planning : 1h dédiée à identifier risques prochain trimestre. Liste priorisée, actions préventives.

**3. Blameless risk reporting**
Culture : signaler risque = acte responsable, pas alarmisme. Channel Slack #risks pour signaux faibles. Review hebdo.

**4. Plan d'action par risque**
Risque identifié → Owner, Timeline, Actions concrètes. Tracking transparent. Follow-up mensuel.

**5. Post-mortems préventifs**
Avant lancement majeur : "Si ça tourne mal, pourquoi ?" Identifier risques, mitigation avant launch.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**L'absence de système** : Risques découverts quand ils explosent. Incident DB : "On savait qu'elle ralentissait depuis 6 mois mais pas prioritaire." Coût : 200k€, 3 jours downtime.

**Le système qui alerte** : Dashboard risques révèle : DB performance -40% sur 3 mois. **Action:** migration planning, exécutée avant crise. Coût : 30k€, zéro downtime.

**Le signal humain qui sauve** : Dev junior signale en one-on-one : "Module auth me fait peur, code 8 ans, personne ne le touche." Investigation : CVE critique trouvée. Patch avant exploit. Breach évitée.

**L'audit externe qui révèle** : Pentest annuel découvre faille injection SQL. Fix avant découverte malveillante. Coût : 10k€ audit + 2 semaines fix vs millions € si breach.

## Erreurs fréquentes

**Ne rien surveiller**
"On verra quand ça casse." **Résultat:**  crises en série, réaction permanente, coûts ×10.

**Sur-monitorer**
100 métriques, personne ne regarde. **Résultat:**  alerte fatigue, vrais risques noyés dans le bruit.

**Culture du blame**
Punir qui signale risque. **Résultat:**  silence, risques cachés jusqu'à explosion.

**Identifier sans agir**
Liste risques sans plan d'action ni suivi. **Résultat:**  faux sentiment de contrôle, risques qui se concrétisent.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Implémenter dashboard risques dès 10 personnes**
6 catégories, score mensuel, trend. Review systématique. Cette discipline évite les crises.

**Ritualiser "What could go wrong ?"**
Chaque trimestre planning, 1h dédiée. Cette pratique systématique révèle risques avant qu'ils soient critiques.

**Créer culture signalement**
Célébrer qui signale risque tôt. Channel dédié, review hebdo, actions transparentes. Cette culture démultiplie la détection.

**Audits externes réguliers**
Security + architecture, pas juste quand problème. Ces audits révèlent angles morts internes.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment construire des systèmes d'alerte précoce efficaces.

Pour approfondir, tu peux aussi consulter les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
