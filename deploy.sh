#!/bin/bash

# Script de déploiement pour Revive App V2
# Ce script automatise le processus de déploiement sur Railway via GitHub

echo "🚀 Démarrage du déploiement Revive App V2..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    print_error "Git n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

print_status "Vérification des prérequis terminée"

# Installer les dépendances
print_status "Installation des dépendances..."
if npm install; then
    print_success "Dépendances installées avec succès"
else
    print_error "Erreur lors de l'installation des dépendances"
    exit 1
fi

# Vérifier si le repository Git est initialisé
if [ ! -d ".git" ]; then
    print_status "Initialisation du repository Git..."
    git init
    print_success "Repository Git initialisé"
fi

# Ajouter tous les fichiers
print_status "Ajout des fichiers au staging..."
git add .

# Vérifier s'il y a des changements à commiter
if git diff --cached --quiet; then
    print_warning "Aucun changement à commiter"
else
    # Demander le message de commit
    echo -e "${BLUE}Entrez le message de commit (ou appuyez sur Entrée pour utiliser le message par défaut):${NC}"
    read -r commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="🚀 Déploiement initial Revive App V2"
    fi
    
    # Faire le commit
    print_status "Création du commit..."
    if git commit -m "$commit_message"; then
        print_success "Commit créé avec succès"
    else
        print_error "Erreur lors de la création du commit"
        exit 1
    fi
fi

# Vérifier si une remote existe
if ! git remote get-url origin &> /dev/null; then
    print_warning "Aucune remote 'origin' configurée"
    echo -e "${BLUE}Entrez l'URL de votre repository GitHub:${NC}"
    read -r github_url
    
    if [ -n "$github_url" ]; then
        git remote add origin "$github_url"
        print_success "Remote 'origin' ajoutée"
    else
        print_error "URL GitHub requise pour continuer"
        exit 1
    fi
fi

# Pousser vers GitHub
print_status "Poussage vers GitHub..."
if git push -u origin main; then
    print_success "Code poussé vers GitHub avec succès"
else
    print_warning "Erreur lors du push. Tentative avec la branche master..."
    if git push -u origin master; then
        print_success "Code poussé vers GitHub (branche master) avec succès"
    else
        print_error "Impossible de pousser vers GitHub"
        exit 1
    fi
fi

print_success "✅ Déploiement terminé avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Allez sur https://railway.app"
echo "2. Créez un nouveau projet"
echo "3. Choisissez 'Deploy from GitHub repo'"
echo "4. Sélectionnez votre repository 'revive-app-V2'"
echo "5. Railway déploiera automatiquement votre application"
echo ""
echo "🔗 Votre application sera accessible via l'URL fournie par Railway"
echo ""
print_status "Merci d'avoir utilisé Revive App V2 ! 🚀" 