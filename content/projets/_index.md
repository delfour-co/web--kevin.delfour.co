---
title: Ressources pédagogiques et projets
description: Katas de programmation pour s'entraîner, et projets plus complexes illustrant architecture et stratégie technique.
projets:
  # Projets complexes
  - nom: "workspace--gk"
    url: "https://github.com/delfour-co/workspace--gk"
    description: "Alternative self-hosted à Google Workspace avec interface conversationnelle IA. Système email complet (SMTP/IMAP) en Rust, intégration LLM locale (Ollama), protocole MCP, administration complète (SPF/DKIM/DMARC, backups, SSL). Architecture distribuée avec 3 services : mail-rs (serveur email), ai-runtime (orchestrateur LLM), mcp-mail-server (outils email via MCP)."
    langage: "Rust"
    technologies:
      - "Rust"
      - "SMTP/IMAP"
      - "WebAssembly"
      - "LLM"
      - "MCP"
      - "Architecture distribuée"
  - nom: "tui--survey-builder"
    url: "https://github.com/delfour-co/tui--survey-builder"
    description: "Outil d'audit technique et business en Rust avec interface TUI dans le navigateur (Ratzilla/WebAssembly). Questionnaires structurés par catégories (Infra, Sécurité, Architecture, etc.), génération automatique de recommandations, export/import YAML. Compatible déploiement statique (Vercel/Netlify), 45 tests unitaires, couverture 100%."
    langage: "Rust"
    technologies:
      - "Rust"
      - "WebAssembly"
      - "Ratzilla"
      - "TUI"
      - "YAML"
  - nom: "workshop--motive_mappers"
    url: "https://github.com/delfour-co/workshop--motive_mappers"
    description: "Extension de Moving Motivators (Jurgen Appello) pour comprendre les motivations intrinsèques d'une équipe. Version papier LaTeX (notice, cartes, feuille de score) avec compilation automatisée. Roadmap : version numérique pour équipes distantes. Outil de management et facilitation d'équipe."
    langage: "LaTeX"
    technologies:
      - "LaTeX"
      - "Management"
      - "Facilitation"
  
  # Katas TypeScript
  - nom: "game-of-life"
    url: "https://github.com/delfour-co/kata--game-of-life"
    description: "Implémentation du Game of Life de Conway en TypeScript. Automate cellulaire où les cellules évoluent selon des règles simples. Exercice de modélisation et TDD."
    langage: "TypeScript"
    technologies:
      - "TypeScript"
      - "TDD"
      - "Modélisation"
  - nom: "roman-2-numerals"
    url: "https://github.com/delfour-co/kata--roman-2-numerals"
    description: "Kata de conversion de nombres arabes en chiffres romains en TypeScript. Exercice d'algorithmique et manipulation de chaînes de caractères avec TDD."
    langage: "TypeScript"
    technologies:
      - "TypeScript"
      - "TDD"
      - "Algorithmique"
  - nom: "fizzbuzz-typescript"
    url: "https://github.com/delfour-co/kata--fizzbuzz-typescript"
    description: "Kata classique FizzBuzz en TypeScript : imprimer les nombres de 1 à 100 en remplaçant les multiples par \"Fizz\", \"Buzz\" ou \"FizzBuzz\". Exercice de TDD."
    langage: "TypeScript"
    technologies:
      - "TypeScript"
      - "TDD"
  - nom: "bowling"
    url: "https://github.com/delfour-co/kata--bowling"
    description: "Kata de programmation pour calculer le score d'une partie de bowling avec gestion des strikes et spares. Exercice de TDD et modélisation en TypeScript."
    langage: "TypeScript"
    technologies:
      - "TypeScript"
      - "TDD"
      - "Modélisation"
  
  # Katas JavaScript
  - nom: "xtreme-carpaccio-js-server"
    url: "https://github.com/delfour-co/kata--xtreme-carpaccio-js-server"
    description: "Kata Extreme Carpaccio - Serveur JavaScript pour facilitateurs. Serveur central pour animer l'atelier Extreme Carpaccio avec gestion des équipes et du scoring."
    langage: "JavaScript"
    technologies:
      - "JavaScript"
      - "Node.js"
      - "Atelier"
  - nom: "xtreme-carpaccio-js-client"
    url: "https://github.com/delfour-co/kata--xtreme-carpaccio-js-client"
    description: "Kata Extreme Carpaccio - Client JavaScript. Exercice d'atelier pour pratiquer le découpage de fonctionnalités, l'implémentation itérative et la communication HTTP."
    langage: "JavaScript"
    technologies:
      - "JavaScript"
      - "HTTP"
      - "TDD"
  - nom: "fizzbuzz"
    url: "https://github.com/delfour-co/kata--fizzbuzz"
    description: "Kata classique FizzBuzz : imprimer les nombres de 1 à 100 en remplaçant les multiples de 3 par \"Fizz\", de 5 par \"Buzz\" et de 15 par \"FizzBuzz\". Exercice JavaScript."
    langage: "JavaScript"
    technologies:
      - "JavaScript"
      - "TDD"
  
  # Katas Python
  - nom: "roman-2-numerals-python"
    url: "https://github.com/delfour-co/kata--roman-2-numerals-python"
    description: "Kata de conversion bidirectionnelle entre nombres arabes et chiffres romains en Python. Exercice de TDD avec pytest pour améliorer vos compétences en développement."
    langage: "Python"
    technologies:
      - "Python"
      - "pytest"
      - "TDD"
  
  # Applications Web
  - nom: "majikku-shisutemu"
    url: "https://github.com/delfour-co/webapp--majikku-shisutemu"
    description: "Application web avec système de design personnalisé."
    langage: "SCSS"
    technologies:
      - "SCSS"
      - "Web"
---

*Cette page fait partie des ressources complémentaires du site.*

---

## Katas pour s'entraîner

Les katas listés ci-dessous sont des exercices de programmation conçus pour pratiquer le TDD, la modélisation et les bonnes pratiques. Ils sont utiles pour l'apprentissage et la formation continue.

## Projets plus complexes

Les projets en haut de page illustrent des aspects d'architecture, d'infrastructure et de stratégie technique : systèmes distribués, intégration IA, outils CLI, etc.
