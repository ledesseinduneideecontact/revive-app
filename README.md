# 🎨 Photo Magique

Application web qui transforme des photos physiques en expériences interactives via NFC.

## 🚀 Concept

Photo Magique permet aux utilisateurs de créer des blocs photo-vidéo interactifs équipés de technologie NFC. En approchant leur smartphone, les utilisateurs peuvent accéder à des vidéos et contenus multimédias associés aux photos physiques.

## 🏗️ Architecture

### Navigation
- **Landing Page** : Présentation du produit avec bouton CTA
- **Dashboard** : Interface unique pour tout le processus (upload + infos + paiement)
- **Pas de navigation complexe** : Tout sur une seule page avec changement d'état

### Upload Strict
- **1 Photo + 1 Vidéo** par bloc (pas de mélange)
- **Maximum 5 blocs** par commande
- **Validation stricte** des formats et tailles

### Contraintes Techniques
- **Photos** : JPEG/PNG uniquement, max 10MB
- **Vidéos** : MP4 uniquement, max 50MB
- **Interface claire** : champs séparés photo/vidéo

## 🛠️ Tech Stack

- **Frontend** : Next.js 14 (App Router) + TypeScript strict
- **Styling** : Tailwind CSS + Shadcn/ui
- **Backend** : Supabase (auth + database + storage)
- **Paiements** : Stripe
- **Validation** : React Hook Form + Zod
- **Icons** : Lucide React

## 📁 Structure du Projet

```
src/
├── app/
│   ├── page.tsx              # Page principale avec gestion d'état
│   └── globals.css           # Styles globaux
├── components/
│   ├── ui/                   # Composants Shadcn/ui
│   ├── LandingPage.tsx       # Page d'accueil
│   └── Dashboard.tsx         # Interface de commande
├── lib/
│   ├── utils.ts              # Utilitaires
│   ├── validations.ts        # Schémas Zod
│   └── file-validation.ts    # Validation des fichiers
└── types/
    └── index.ts              # Types TypeScript
```

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd photo-magique
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp env.example .env.local
# Remplir les variables avec vos clés Supabase et Stripe
```

4. **Démarrer en développement**
```bash
npm run dev
```

## 🔧 Configuration

### Variables d'Environnement Requises

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📊 Fonctionnalités

### Landing Page
- ✅ Présentation du produit
- ✅ Fonctionnalités principales
- ✅ Processus en 4 étapes
- ✅ Bouton CTA pour commencer

### Dashboard
- ✅ Upload de photos et vidéos
- ✅ Validation stricte des formats
- ✅ Gestion des blocs (1-5)
- ✅ Interface intuitive
- ✅ Indicateur de progression

### Validation
- ✅ Photos : JPEG/PNG, max 10MB
- ✅ Vidéos : MP4, max 50MB
- ✅ Champs séparés et clairs
- ✅ Messages d'erreur explicites

## 🎯 Prochaines Étapes

1. **Intégration Supabase**
   - Configuration de la base de données
   - Upload des fichiers
   - Authentification

2. **Formulaires**
   - Informations client
   - Validation complète
   - Gestion d'état

3. **Paiement Stripe**
   - Intégration Stripe
   - Gestion des commandes
   - Webhooks

4. **Fonctionnalités Avancées**
   - Prévisualisation des fichiers
   - Drag & drop
   - Progress indicators

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ pour transformer vos souvenirs en expériences magiques**
