const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes API de test
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Serveur opérationnel',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/railway-test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Connexion Railway validée',
    port: PORT,
    railwayUrl: process.env.RAILWAY_STATIC_URL || 'Non configuré',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/github-test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Connexion GitHub validée',
    repository: 'revive-app-V2',
    branch: process.env.RAILWAY_GIT_BRANCH || 'main',
    commit: process.env.RAILWAY_GIT_COMMIT_SHA || 'Non disponible',
    timestamp: new Date().toISOString()
  });
});

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📱 Application accessible sur: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
}); 