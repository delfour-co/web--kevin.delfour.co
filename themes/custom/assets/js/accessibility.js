/**
 * Gestion des préférences d'accessibilité
 */

const AccessibilityManager = {
    // Valeurs par défaut
    defaults: {
        fontSize: 'normal',
        contentWidth: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        wordSpacing: 'normal',
        highContrast: false,
        dyslexiaFont: false
    },

    // Valeurs des multiplicateurs
    multipliers: {
        fontSize: {
            small: 0.875,
            normal: 1,
            large: 1.125
        },
        contentWidth: {
            narrow: 0.8,
            normal: 1,
            wide: 1.2
        },
        lineHeight: {
            tight: 0.75,  // 1.6 * 0.75 = 1.2
            normal: 1,    // 1.6 * 1 = 1.6 (valeur originale)
            loose: 1.125  // 1.6 * 1.125 = 1.8
        },
        letterSpacing: {
            tight: 0.5,
            normal: 1,
            wide: 1.5
        },
        wordSpacing: {
            tight: 0.5,
            normal: 1,
            wide: 1.5
        }
    },

    /**
     * Charge les préférences depuis localStorage
     */
    loadPreferences() {
        try {
            const stored = localStorage.getItem('accessibility-preferences');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Erreur lors du chargement des préférences:', e);
        }
        return { ...this.defaults };
    },

    /**
     * Sauvegarde les préférences dans localStorage
     */
    savePreferences(prefs) {
        try {
            localStorage.setItem('accessibility-preferences', JSON.stringify(prefs));
        } catch (e) {
            console.warn('Erreur lors de la sauvegarde des préférences:', e);
        }
    },

    /**
     * Applique les préférences aux variables CSS
     */
    applyPreferences(prefs) {
        const root = document.documentElement;
        
        // Taille de police
        const fontSizeMult = this.multipliers.fontSize[prefs.fontSize] || 1;
        root.style.setProperty('--font-size-multiplier', fontSizeMult);

        // Largeur du contenu
        const contentWidthMult = this.multipliers.contentWidth[prefs.contentWidth] || 1;
        root.style.setProperty('--content-width-multiplier', contentWidthMult);

        // Interligne
        const lineHeightMult = this.multipliers.lineHeight[prefs.lineHeight] || 1;
        root.style.setProperty('--line-height-multiplier', lineHeightMult);

        // Espacement des lettres
        const letterSpacingMult = this.multipliers.letterSpacing[prefs.letterSpacing] || 1;
        root.style.setProperty('--letter-spacing-multiplier', letterSpacingMult);

        // Espacement des mots
        const wordSpacingMult = this.multipliers.wordSpacing[prefs.wordSpacing] || 1;
        root.style.setProperty('--word-spacing-multiplier', wordSpacingMult);

        // Contraste élevé
        if (prefs.highContrast) {
            root.setAttribute('data-contrast', 'high');
        } else {
            root.removeAttribute('data-contrast');
        }

        // Police dyslexique
        if (prefs.dyslexiaFont) {
            root.setAttribute('data-dyslexia-font', 'true');
            // Charger la police OpenDyslexic si elle n'est pas déjà chargée
            this.loadDyslexiaFont();
        } else {
            root.removeAttribute('data-dyslexia-font');
        }
    },

    /**
     * Charge la police OpenDyslexic depuis un CDN
     */
    loadDyslexiaFont() {
        // Vérifier si la police est déjà chargée
        if (document.getElementById('dyslexia-font-stylesheet')) {
            return;
        }

        // Créer un élément link pour charger la police depuis Fontsource
        const link = document.createElement('link');
        link.id = 'dyslexia-font-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@fontsource/opendyslexic@5.2.5/index.min.css';
        document.head.appendChild(link);
    },

    /**
     * Réinitialise toutes les préférences
     */
    resetPreferences() {
        const prefs = { ...this.defaults };
        this.savePreferences(prefs);
        this.applyPreferences(prefs);
        this.updateUI(prefs);
        
        // Afficher un message de confirmation (optionnel)
        const resetBtn = document.querySelector('.accessibility-reset');
        if (resetBtn) {
            const originalText = resetBtn.innerHTML;
            resetBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg> Réinitialisé !';
            resetBtn.style.background = 'var(--primary)';
            resetBtn.style.color = 'var(--theme)';
            
            setTimeout(() => {
                resetBtn.innerHTML = originalText;
                resetBtn.style.background = '';
                resetBtn.style.color = '';
            }, 2000);
        }
        
        return prefs;
    },

    /**
     * Met à jour l'interface utilisateur avec les préférences actuelles
     */
    updateUI(prefs) {
        // Taille de police
        document.querySelectorAll('[data-accessibility="fontSize"]').forEach(btn => {
            const isActive = btn.dataset.value === prefs.fontSize;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Largeur du contenu
        document.querySelectorAll('[data-accessibility="contentWidth"]').forEach(btn => {
            const isActive = btn.dataset.value === prefs.contentWidth;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Interligne
        document.querySelectorAll('[data-accessibility="lineHeight"]').forEach(btn => {
            const isActive = btn.dataset.value === prefs.lineHeight;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Espacement des lettres
        document.querySelectorAll('[data-accessibility="letterSpacing"]').forEach(btn => {
            const isActive = btn.dataset.value === prefs.letterSpacing;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Espacement des mots
        document.querySelectorAll('[data-accessibility="wordSpacing"]').forEach(btn => {
            const isActive = btn.dataset.value === prefs.wordSpacing;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Contraste élevé
        const highContrastToggle = document.querySelector('[data-accessibility="highContrast"]');
        if (highContrastToggle) {
            highContrastToggle.classList.toggle('active', prefs.highContrast);
            highContrastToggle.setAttribute('aria-checked', prefs.highContrast);
        }

        // Police dyslexique
        const dyslexiaFontToggle = document.querySelector('[data-accessibility="dyslexiaFont"]');
        if (dyslexiaFontToggle) {
            dyslexiaFontToggle.classList.toggle('active', prefs.dyslexiaFont);
            dyslexiaFontToggle.setAttribute('aria-checked', prefs.dyslexiaFont);
        }
    },

    /**
     * Ouvre le panneau d'accessibilité
     */
    openPanel() {
        const panel = document.getElementById('accessibility-panel');
        const overlay = document.getElementById('accessibility-overlay');
        const toggle = document.getElementById('accessibility-toggle');
        if (panel) {
            panel.setAttribute('aria-hidden', 'false');
            if (overlay) overlay.setAttribute('aria-hidden', 'false');
            if (toggle) toggle.setAttribute('aria-expanded', 'true');
            // Focus sur le premier élément interactif
            const firstButton = panel.querySelector('button, [tabindex="0"]');
            if (firstButton) firstButton.focus();
        }
    },

    /**
     * Ferme le panneau d'accessibilité
     */
    closePanel() {
        const panel = document.getElementById('accessibility-panel');
        const overlay = document.getElementById('accessibility-overlay');
        const toggle = document.getElementById('accessibility-toggle');
        if (panel) {
            panel.setAttribute('aria-hidden', 'true');
            if (overlay) overlay.setAttribute('aria-hidden', 'true');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
        // Retourner le focus au bouton d'ouverture
        if (toggle) toggle.focus();
    },

    /**
     * Initialise le gestionnaire d'accessibilité
     */
    init() {
        // Charger et appliquer les préférences au chargement
        const prefs = this.loadPreferences();
        this.applyPreferences(prefs);

        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    },

    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        // Bouton d'ouverture du panneau
        const toggle = document.getElementById('accessibility-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const panel = document.getElementById('accessibility-panel');
                const isOpen = panel && panel.getAttribute('aria-hidden') === 'false';
                if (isOpen) {
                    this.closePanel();
                } else {
                    this.openPanel();
                }
            });
            // Initialiser aria-expanded
            toggle.setAttribute('aria-expanded', 'false');
        }

        // Bouton de fermeture
        const closeBtn = document.querySelector('.accessibility-panel-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePanel());
        }

        // Overlay pour fermer au clic
        const overlay = document.getElementById('accessibility-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closePanel());
        }

        // Boutons de contrôle
        document.querySelectorAll('[data-accessibility]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.accessibility;
                const value = e.currentTarget.dataset.value;
                
                const prefs = this.loadPreferences();
                
                if (type === 'highContrast' || type === 'dyslexiaFont') {
                    // Toggle pour les booléens
                    prefs[type] = !prefs[type];
                    // Mettre à jour aria-checked immédiatement
                    e.currentTarget.setAttribute('aria-checked', prefs[type]);
                } else {
                    // Valeur pour les sélections
                    prefs[type] = value;
                }
                
                this.savePreferences(prefs);
                this.applyPreferences(prefs);
                this.updateUI(prefs);
            });
        });

        // Bouton réinitialiser
        const resetBtn = document.querySelector('.accessibility-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetPreferences();
            });
        }

        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const panel = document.getElementById('accessibility-panel');
                if (panel && panel.getAttribute('aria-hidden') === 'false') {
                    this.closePanel();
                }
            }
        });

        // Mettre à jour l'UI avec les préférences actuelles
        const prefs = this.loadPreferences();
        this.updateUI(prefs);
    }
};

// Initialiser au chargement
AccessibilityManager.init();
