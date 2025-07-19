# 🚀 Revive App V2

Application web de test pour valider les connexions Railway et GitHub.

## 📋 Description

Cette application web simple permet de tester et valider :
- ✅ Connexion au serveur Express
- ✅ Déploiement sur Railway
- ✅ Intégration avec GitHub
- ✅ Health checks automatiques

## 🛠️ Technologies

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Hébergement**: Railway
- **Versioning**: GitHub

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Compte Railway
- Compte GitHub

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/ledesseinduneideecontact/revive-app.git
cd revive-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer en mode développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🚂 Déploiement sur Railway

### Méthode 1 : Via GitHub (Recommandée)

1. **Pousser le code sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connecter Railway à GitHub**
   - Aller sur [Railway.app](https://railway.app)
   - Créer un nouveau projet
   - Choisir "Deploy from GitHub repo"
   - Sélectionner votre repository `revive-app`

3. **Configuration automatique**
   - Railway détectera automatiquement le `package.json`
   - Le déploiement se lancera automatiquement

### Méthode 2 : Via Railway CLI

1. **Installer Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Se connecter à Railway**
```bash
railway login
```

3. **Déployer**
```bash
railway up
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` pour la configuration locale :

```env
NODE_ENV=development
PORT=3000
```

### Variables Railway

Railway configure automatiquement :
- `PORT` : Port d'écoute
- `RAILWAY_STATIC_URL` : URL de l'application
- `RAILWAY_GIT_BRANCH` : Branche déployée
- `RAILWAY_GIT_COMMIT_SHA` : Hash du commit

## 📊 Tests de connexion

L'application inclut des endpoints de test :

- **Health Check**: `GET /api/health`
- **Test Railway**: `GET /api/railway-test`
- **Test GitHub**: `GET /api/github-test`

### Interface utilisateur

L'interface web permet de :
- ✅ Tester chaque connexion individuellement
- 🧪 Lancer tous les tests en une fois
- 📊 Voir les informations système
- 🔄 Actualiser les données

## 🎯 Fonctionnalités

### Tests automatiques
- Vérification du serveur Express
- Validation de la connexion Railway
- Confirmation de l'intégration GitHub
- Health checks en temps réel

### Interface moderne
- Design responsive
- Animations fluides
- Indicateurs visuels de statut
- Informations système détaillées

### Raccourcis clavier
- `Ctrl/Cmd + R` : Actualiser la page
- `Ctrl/Cmd + T` : Lancer tous les tests

## 📁 Structure du projet

```
revive-app/
├── public/
│   ├── index.html      # Page principale
│   ├── styles.css      # Styles CSS
│   └── script.js       # JavaScript client
├── server.js           # Serveur Express
├── package.json        # Dépendances et scripts
├── railway.json        # Configuration Railway
├── .gitignore          # Fichiers ignorés
└── README.md           # Documentation
```

## 🔍 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Changer le port dans .env
   PORT=3001
   ```

2. **Erreur de dépendances**
   ```bash
   # Supprimer node_modules et réinstaller
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Problème de déploiement Railway**
   - Vérifier que `railway.json` est présent
   - S'assurer que `package.json` contient le script `start`
   - Vérifier les logs dans Railway Dashboard

## 📈 Monitoring

### Logs Railway
```bash
railway logs
```

### Health Check
```bash
curl https://votre-app.railway.app/api/health
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- 📧 Créer une issue sur GitHub
- 🐛 Signaler un bug
- 💡 Proposer une amélioration

---

**Développé avec ❤️ pour tester Railway et GitHub**
