#!/usr/bin/env python3
"""
Script pour tagger automatiquement les articles avec pillar, audience et featured.

Usage:
    python scripts/tag-articles.py --dry-run  # Affiche les propositions sans modifier
    python scripts/tag-articles.py --apply     # Applique les tags aux fichiers
"""

import os
import re
import yaml
import argparse
from pathlib import Path
from collections import defaultdict

# Mapping des mots-clés vers les piliers
PILLAR_KEYWORDS = {
    "role-cto": [
        "cto", "chief technology officer", "premiers jours", "prise de poste",
        "recrutement équipe", "hiring", "lead dev", "vp engineering",
        "rôle", "responsabilités cto", "devenir cto"
    ],
    "gouvernance-decision": [
        "architecture", "dette technique", "tech debt", "choix technique",
        "décision", "gouvernance", "holacratie", "entreprise libérée",
        "microservices", "monolithe", "refactoring", "strategie technique",
        "vision technique", "roadmap"
    ],
    "culture-management": [
        "culture", "management", "équipe", "onboarding", "feedback",
        "communication", "conflits", "leadership", "code review",
        "pair programming", "collaboration", "soft skills"
    ],
    "trouver-sa-place": [
        "carrière", "reconversion", "développeur", "junior", "alternant",
        "portfolio", "cv", "entretien", "négociation salariale",
        "freelance", "salarié", "formation", "compétences",
        "networking", "personal branding", "trouver sa place"
    ]
}

# Mapping des mots-clés vers les audiences
AUDIENCE_KEYWORDS = {
    "cto": [
        "cto", "chief technology officer", "leader tech", "vp engineering",
        "lead dev", "management", "équipe", "recrutement", "strategie",
        "vision technique", "roadmap", "gouvernance", "décision"
    ],
    "jeunesse": [
        "junior", "alternant", "reconversion", "premiers pas", "débutant",
        "carrière", "portfolio", "cv", "entretien", "formation",
        "trouver sa place", "networking", "personal branding"
    ]
}

# Articles repères proposés (basés sur l'analyse du contenu)
FEATURED_ARTICLES = {
    # Globaux (6 max)
    "2025-06-06-cto-vs-lead-dev-vp-engineering-differences-role.md": {"weight": 1},
    "2025-06-13-premiers-jours-cto-reussir-prise-de-poste.md": {"weight": 2},
    "2025-07-04-dette-technique-cto-gestion-compromis-strategies.md": {"weight": 3},
    "2025-06-20-vision-technique-roadmap-cto-strategy.md": {"weight": 4},
    "2024-08-12-holacratie-entreprise-liberee-gouvernance-partagee.md": {"weight": 5},
    "2025-11-28-onboarding-developpeurs-integration-rapide-efficace.md": {"weight": 6},
    
    # Par pilier (3 max chacun)
    "role-cto": [
        "2025-06-06-cto-vs-lead-dev-vp-engineering-differences-role.md",
        "2025-06-13-premiers-jours-cto-reussir-prise-de-poste.md",
        "2025-06-27-recruter-equipe-technique-cto-hiring-strategies.md"
    ],
    "gouvernance-decision": [
        "2025-07-04-dette-technique-cto-gestion-compromis-strategies.md",
        "2025-06-20-vision-technique-roadmap-cto-strategy.md",
        "2024-08-12-holacratie-entreprise-liberee-gouvernance-partagee.md"
    ],
    "culture-management": [
        "2025-11-28-onboarding-developpeurs-integration-rapide-efficace.md",
        "2025-12-26-feedback-performance-management-equipe.md",
        "2025-11-14-code-review-efficace-feedback-constructif-equipe.md"
    ],
    "trouver-sa-place": [
        "2025-03-07-reconversion-developpeur-transition-carriere-reussie.md",
        "2025-02-28-negociation-salariale-developpeur-augmentation-strategies.md",
        "2025-03-14-formation-continue-developpeur-rester-competitif-2025.md"
    ]
}

def extract_frontmatter(content):
    """Extrait le front matter YAML d'un fichier markdown."""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if match:
        try:
            frontmatter = yaml.safe_load(match.group(1))
            body = match.group(2)
            return frontmatter, body
        except yaml.YAMLError:
            return None, content
    return None, content

def detect_pillar(title, tags, categories, description):
    """Détecte le pilier basé sur le contenu."""
    text = f"{title} {description} {' '.join(tags)} {' '.join(categories)}".lower()
    
    scores = defaultdict(int)
    for pillar, keywords in PILLAR_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in text:
                scores[pillar] += 1
    
    if scores:
        return max(scores.items(), key=lambda x: x[1])[0]
    
    # Fallback : analyser les catégories existantes
    categories_lower = [c.lower() for c in categories]
    if 'leadership' in categories_lower or 'cto' in categories_lower:
        return 'role-cto'
    elif 'management' in categories_lower:
        return 'culture-management'
    elif 'developpement' in categories_lower or 'architecture' in categories_lower:
        return 'gouvernance-decision'
    
    # Par défaut, si aucun match
    return 'gouvernance-decision'  # Le plus général

def detect_audience(title, tags, categories, description):
    """Détecte l'audience basée sur le contenu."""
    text = f"{title} {description} {' '.join(tags)} {' '.join(categories)}".lower()
    
    scores = defaultdict(int)
    for audience, keywords in AUDIENCE_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in text:
                scores[audience] += 1
    
    if scores:
        return max(scores.items(), key=lambda x: x[1])[0]
    return "cto"  # Par défaut, public CTO

def is_featured(filename, pillar):
    """Vérifie si un article doit être marqué comme featured."""
    basename = os.path.basename(filename)
    
    # Vérifier dans les featured globaux
    if basename in FEATURED_ARTICLES:
        return True, FEATURED_ARTICLES[basename].get("weight", 10)
    
    # Vérifier dans les featured par pilier
    if pillar and pillar in FEATURED_ARTICLES:
        if basename in FEATURED_ARTICLES[pillar]:
            return True, 10
    
    return False, None

def update_frontmatter(filepath, dry_run=True):
    """Met à jour le front matter d'un fichier."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    frontmatter, body = extract_frontmatter(content)
    if frontmatter is None:
        print(f"⚠️  {filepath}: Impossible de parser le front matter")
        return False
    
    # Détecter pillar et audience
    title = frontmatter.get('title', '')
    tags = frontmatter.get('tags', [])
    categories = frontmatter.get('categories', [])
    description = frontmatter.get('description', '')
    
    pillar = detect_pillar(title, tags, categories, description)
    audience = detect_audience(title, tags, categories, description)
    
    # Vérifier si featured
    featured, weight = is_featured(filepath, pillar)
    
    # Préparer les modifications
    changes = []
    # Utiliser 'pillar' pour la compatibilité avec les layouts existants
    # et 'pillars' pour la taxonomie Hugo
    if not frontmatter.get('pillar'):
        frontmatter['pillar'] = pillar
        changes.append(f"pillar: {pillar}")
    elif frontmatter.get('pillar') != pillar:
        changes.append(f"pillar: {frontmatter.get('pillar')} → {pillar}")
        frontmatter['pillar'] = pillar
    
    # Ajouter aussi dans la taxonomie Hugo (pluriel)
    if pillar:
        if 'pillars' not in frontmatter:
            frontmatter['pillars'] = [pillar]
            changes.append(f"pillars: [{pillar}]")
        elif pillar not in frontmatter['pillars']:
            frontmatter['pillars'] = [pillar]
            changes.append(f"pillars: [{pillar}]")
    
    if not frontmatter.get('audience'):
        frontmatter['audience'] = audience
        changes.append(f"audience: {audience}")
    elif frontmatter.get('audience') != audience:
        changes.append(f"audience: {frontmatter.get('audience')} → {audience}")
        frontmatter['audience'] = audience
    
    # Ajouter aussi dans la taxonomie Hugo (pluriel)
    if audience:
        if 'audiences' not in frontmatter:
            frontmatter['audiences'] = [audience]
            changes.append(f"audiences: [{audience}]")
        elif audience not in frontmatter['audiences']:
            frontmatter['audiences'] = [audience]
            changes.append(f"audiences: [{audience}]")
    
    if featured and not frontmatter.get('featured'):
        frontmatter['featured'] = True
        changes.append("featured: true")
        if weight:
            frontmatter['weight'] = weight
            changes.append(f"weight: {weight}")
    elif not featured and frontmatter.get('featured'):
        # Ne pas retirer featured si déjà présent
        pass
    
    if changes:
        if dry_run:
            print(f"📝 {os.path.basename(filepath)}:")
            print(f"   {' | '.join(changes)}")
        else:
            # Réécrire le fichier
            new_frontmatter = yaml.dump(frontmatter, allow_unicode=True, default_flow_style=False, sort_keys=False)
            new_content = f"---\n{new_frontmatter}---\n{body}"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ {os.path.basename(filepath)}: {' | '.join(changes)}")
        return True
    
    return False

def main():
    parser = argparse.ArgumentParser(description='Tagger automatiquement les articles')
    parser.add_argument('--dry-run', action='store_true', help='Affiche les propositions sans modifier')
    parser.add_argument('--apply', action='store_true', help='Applique les tags aux fichiers')
    args = parser.parse_args()
    
    if not args.dry_run and not args.apply:
        parser.print_help()
        return
    
    posts_dir = Path(__file__).parent.parent / 'content' / 'posts'
    if not posts_dir.exists():
        print(f"❌ Répertoire non trouvé: {posts_dir}")
        return
    
    files = list(posts_dir.glob('*.md'))
    print(f"📚 Analyse de {len(files)} articles...\n")
    
    updated = 0
    for filepath in sorted(files):
        if update_frontmatter(filepath, dry_run=args.dry_run):
            updated += 1
    
    print(f"\n{'📊 Résumé:' if args.dry_run else '✅ Terminé:'}")
    print(f"   {updated} fichiers {'seraient modifiés' if args.dry_run else 'modifiés'} sur {len(files)}")

if __name__ == '__main__':
    main()
