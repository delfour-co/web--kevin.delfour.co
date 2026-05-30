# Brief d'intention — kevin.delfour.co, version « mon lieu »

- **Date :** 2026-05-30
- **Statut :** Validé (intention + style visuel terminal)
- **Auteur :** Kevin Delfour (brainstorming assisté)

---

## 1. Contexte & déclencheur

Le site existant est construit comme un **site de transmission** : une mission
(« donner des repères aux CTO et à la jeunesse tech »), une ligne éditoriale
contraignante, 6 publics/piliers, une cadence « 1 article/mois », 172 articles,
21 outils, des projets, 2 livres.

En auditant le site, une contradiction est apparue : la **forme réelle** (thème
« Neon Network » — fond noir, accents cyan/violet/rose, halos animés,
glassmorphism, Space Grotesk) contredit la **mission affichée** (calme, sobre,
éditorial, ambre/Fraunces dans la doc). Le `CLAUDE.md` et le `DESIGN_SYSTEM.md`
décrivent un site qui n'existe plus.

Mais le vrai problème était en amont : **l'intention elle-même n'était plus
claire.** Interrogé, Kevin a tranché :

- Job n°1 du site : **« mon espace à moi »** (pas un service, pas un public).
- Ce qui pèse : **le cadre de mission** + **le stock de 172 articles**.
- Ce qui ne pèse pas : les outils, le ton joueur, l'esprit maker.

La dissonance n'était donc pas « le néon trahit la mission sobre ». C'était
**l'habit de mission posé sur un lieu qui veut être personnel.** L'esprit
joueur/maker et les projets sont la partie sincère ; la couche « transmission »
est le costume. Le néon en était l'expression d'alors ; après exploration,
cette énergie passe par une **esthétique terminal** (voir §7) plutôt que néon.

---

## 2. Décisions actées (issues du brainstorming)

| Sujet | Décision |
|---|---|
| Job n°1 du site | Mon espace à moi |
| Blog (172 articles) | **Suppression physique** des fichiers + échafaudage |
| Cadre de mission | Retiré (ligne éditoriale, publics, piliers, cadence) |
| Projets | Au cœur de la home |
| 21 outils | Gardés, recadrés en « ce que j'ai fait/j'utilise » |
| 2 livres | Gardés comme objets finis (« ce que j'ai écrit ») |
| Direction visuelle | **Terminal moderne** (fenêtre + sidebar arborescence + barre de statut), abandon du néon |
| Thèmes lecteur | 9 thèmes terminal, **défaut Slate**, persistés (localStorage) |
| Accessibilité | Panneau actuel conservé (réglage séparé du thème) |
| « Léger à entretenir » | = zéro obligation récurrente, pas « peu de pages » |
| Contact | Version légère (liens), ton « offre de service » retiré |

---

## 3. Intention centrale

> Ce site n'est plus un site de transmission. C'est **le lieu de Kevin** :
> un espace personnel qui lui ressemble, où vivent les choses qu'il construit.
> Il ne sert pas un public, n'a pas de mission, ne doit rien à personne.
> Site-objet, joueur, **esthétique terminal / ligne de commande** assumée.

L'identité **CTO / 17 ans** reste — mais comme *qui il est*, pas comme une
autorité qui transmet.

---

## 4. Périmètre

### 4.1 Ce qui reste

- **Projets** — matière principale, au cœur de la home.
- **21 outils** — recadrés : objets faits/utilisés, pas un service d'aide à la
  décision.
- **2 livres** — objets finis, présentés comme « ce que j'ai écrit ».
- **Esthétique terminal / interactivité** — signature assumée (voir §7).
- **Contact** — version légère (liens pour joindre Kevin).

### 4.2 Ce qui part

- **Blog** : suppression physique des 172 `.md` (`src/content/posts/`).
- **Échafaudage blog** :
  - routes `src/routes/articles/`, `src/routes/articles/[slug]/`
  - `src/routes/categories/[category]/`
  - `src/routes/archives/`
  - `src/routes/posts/[slug]/` (redirection legacy)
  - redirections piliers legacy : `le-role-du-cto`, `culture-management`,
    `gouvernance-decision`, `trouver-sa-place` (+ vérifier `start-here`,
    `travailler-avec-moi`, `vision`, `guides-livres`)
  - RSS articles `src/routes/index.xml/+server.ts`
  - section « Derniers articles » + section « Suivre » de la home
  - entrée **Articles** du menu (`Header.svelte`)
  - chargement `data.latestPosts` et `src/lib/content.ts`
  - URLs articles dans `src/routes/sitemap.xml`
- **Couche mission** : `LIGNE_EDITORIALE.md`, kit `.claude/` (templates/prompts
  orientés mission), sections « mission » de `CLAUDE.md`, cadence, publics,
  piliers.

### 4.3 Ce qui est recadré

- **Home** : hero recentré sur « qui est Kevin » (`$ whoami`), plus de CTA de
  service. Projets en premier. Cadre fenêtre terminal (voir §7).
- **À propos** : réécrite en « qui je suis », sans vocabulaire de mission ni
  « ligne morale » de service.
- **SEO / méta home** : description reformulée (retirer « outils de décision,
  livres gratuits » formulé comme offre).
- **CLAUDE.md** : réécrit pour refléter « mon lieu » (sinon toute future
  intervention IA repart d'une fausse carte).

---

## 5. Définition de « léger »

« Léger à entretenir » ne veut **pas** dire *peu de pages*. Ça veut dire
**aucune obligation récurrente** :

- pas de cadence éditoriale,
- pas de stock de contenu à faire vivre,
- rien qui crée de la dette le jour où l'envie n'est pas là.

Un site **riche mais fini** est plus léger qu'un blog **minimal mais affamé**.
Kevin ajoute un projet quand il en termine un — jamais par devoir.

---

## 6. Ton & forme

- Première personne, libre.
- Identité CTO/17 ans = qui il est, pas une posture d'autorité.
- Esprit terminal, jeu, expérimentation : assumés plutôt que bridés.
- Micro-copy en métaphore shell : `$ whoami`, `$ ls projets/`,
  `$ cat livres/*`, `$ contact --me` — au service de la lisibilité, jamais
  gadget au point de gêner.

---

## 7. Style visuel — validé (terminal moderne)

Direction retenue après exploration visuelle (compagnon brainstorming) :
**terminal moderne**, saveur « Slate » (proche d'un éditeur de code sombre),
sans le côté CRT-musée (pas de scanlines par défaut).

**Cadre « fenêtre »** pour que le contenu soit posé, pas flottant :
- barre de titre type fenêtre (pastilles + `kevin@delfour: ~/lieu — zsh`) ;
- **sidebar arborescence** à gauche (`projets/`, `outils/`, `livres/`,
  `about.md`, `contact`) qui sert aussi de navigation ;
- **barre de statut** type tmux/powerline en bas
  (`NORMAL · ~/lieu/… · lyon · 17y`) ;
- largeur contenue (~1000px) centrée, gouttières, rythme vertical resserré.

**Palette Slate (défaut)** : fond `#0d1117`, texte `#adbac7`, titres `#e6edf3`,
accent teal `#2dd4bf`, bleu `#6cb6ff`, atténué `#6e7781`. Police monospace
(`SF Mono`/`ui-monospace`/Menlo…).

**Cartes projets** : nom préfixé `./` en accent, description, badge de stade,
tech ; survol qui réagit (bordure accent + léger lift).

**Responsive / mobile (exigence ferme)** :
- la sidebar arborescence devient une **barre d'onglets** horizontale
  scrollable sous la barre de titre ;
- contenu en **une seule colonne** (grille projets 1 colonne, outils/livres
  empilés) ;
- barre de statut simplifiée.

### 7.1 Thèmes lecteur (avec persistance)

Sélecteur de thème dans la nav, choix **mémorisé en `localStorage`**.
**9 thèmes**, défaut **Slate** :

1. **Slate** (défaut) 2. Dracula 3. Catppuccin (Mocha) 4. Gruvbox
5. Nord 6. Solarized Dark 7. Light (paper) 8. CRT vert (rétro)
9. Amber (rétro)

Chaque thème = un jeu de variables CSS (mêmes tokens, valeurs différentes).
Le thème « Light » assure une option claire (lecture de jour).

### 7.2 Accessibilité (conservée)

Le panneau d'accessibilité actuel est **conservé** et reste un réglage
**séparé** du thème (il se combine, ne le remplace pas) :
taille de police, interlignage, espacement lettres/mots, largeur de contenu,
contraste élevé, police dyslexie. Les multiplicateurs a11y existants
(`--a11y-*`) continuent de s'appliquer par-dessus le thème actif. Le mode
contraste élevé doit rester cohérent quel que soit le thème.

---

## 8. Hors périmètre / à revoir plus tard

- Porte d'entrée « pro » (accompagnement payant) : retirée pour l'instant,
  rouvrable plus tard si souhaité.
- Sort définitif de `start-here` / `travailler-avec-moi` / `vision` : à
  vérifier route par route lors de l'implémentation.

---

## 9. Critères de réussite (subjectifs, assumés)

- Le site **ressemble à Kevin** quand il le regarde.
- Plus aucune **obligation** ne pèse (ni cadence, ni stock).
- Un visiteur comprend vite : *voici qui je suis et ce que je construis* — sans
  qu'on lui dise quoi faire.

---

Fin du brief.
