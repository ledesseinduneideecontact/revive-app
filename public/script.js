// Éléments DOM
const serverIndicator = document.getElementById('server-indicator');
const railwayIndicator = document.getElementById('railway-indicator');
const githubIndicator = document.getElementById('github-indicator');

const serverDetails = document.getElementById('server-details');
const railwayDetails = document.getElementById('railway-details');
const githubDetails = document.getElementById('github-details');

const portInfo = document.getElementById('port-info');
const envInfo = document.getElementById('env-info');
const railwayUrl = document.getElementById('railway-url');
const branchInfo = document.getElementById('branch-info');

// Fonctions de test
async function testServer() {
    setLoading(serverIndicator, serverDetails);
    
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (response.ok) {
            setSuccess(serverIndicator, serverDetails, `Serveur opérationnel - ${data.timestamp}`);
            updateSystemInfo(data);
        } else {
            setError(serverIndicator, serverDetails, 'Erreur serveur');
        }
    } catch (error) {
        setError(serverIndicator, serverDetails, `Erreur de connexion: ${error.message}`);
    }
}

async function testRailway() {
    setLoading(railwayIndicator, railwayDetails);
    
    try {
        const response = await fetch('/api/railway-test');
        const data = await response.json();
        
        if (response.ok) {
            setSuccess(railwayIndicator, railwayDetails, `Railway connecté - Port: ${data.port}`);
            updateRailwayInfo(data);
        } else {
            setError(railwayIndicator, railwayDetails, 'Erreur Railway');
        }
    } catch (error) {
        setError(railwayIndicator, railwayDetails, `Erreur Railway: ${error.message}`);
    }
}

async function testGitHub() {
    setLoading(githubIndicator, githubDetails);
    
    try {
        const response = await fetch('/api/github-test');
        const data = await response.json();
        
        if (response.ok) {
            setSuccess(githubIndicator, githubDetails, `GitHub connecté - Branch: ${data.branch}`);
            updateGitHubInfo(data);
        } else {
            setError(githubIndicator, githubDetails, 'Erreur GitHub');
        }
    } catch (error) {
        setError(githubIndicator, githubDetails, `Erreur GitHub: ${error.message}`);
    }
}

// Fonctions utilitaires
function setLoading(indicator, details) {
    indicator.className = 'status-indicator loading';
    details.innerHTML = '<span class="loading">Test en cours...</span>';
}

function setSuccess(indicator, details, message) {
    indicator.className = 'status-indicator success';
    details.innerHTML = `<span style="color: #10b981;">✅ ${message}</span>`;
}

function setError(indicator, details, message) {
    indicator.className = 'status-indicator error';
    details.innerHTML = `<span style="color: #ef4444;">❌ ${message}</span>`;
}

function updateSystemInfo(data) {
    portInfo.textContent = data.port || window.location.port || '3000';
    envInfo.textContent = data.environment || 'development';
}

function updateRailwayInfo(data) {
    railwayUrl.textContent = data.railwayUrl || window.location.origin;
}

function updateGitHubInfo(data) {
    branchInfo.textContent = data.branch || 'main';
}

// Fonctions d'action
async function runAllTests() {
    console.log('🧪 Lancement de tous les tests...');
    
    // Désactiver les boutons pendant les tests
    const buttons = document.querySelectorAll('.test-btn, .primary-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    try {
        await Promise.all([
            testServer(),
            testRailway(),
            testGitHub()
        ]);
        
        console.log('✅ Tous les tests terminés');
    } catch (error) {
        console.error('❌ Erreur lors des tests:', error);
    } finally {
        // Réactiver les boutons
        buttons.forEach(btn => btn.disabled = false);
    }
}

function refreshPage() {
    window.location.reload();
}

// Tests automatiques au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Application Revive App V2 chargée');
    
    // Lancer les tests automatiquement après 1 seconde
    setTimeout(() => {
        runAllTests();
    }, 1000);
    
    // Ajouter des événements pour les touches clavier
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 'r':
                    event.preventDefault();
                    refreshPage();
                    break;
                case 't':
                    event.preventDefault();
                    runAllTests();
                    break;
            }
        }
    });
});

// Fonction pour afficher les informations de déploiement
function showDeploymentInfo() {
    const deploymentInfo = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port
    };
    
    console.log('📊 Informations de déploiement:', deploymentInfo);
    return deploymentInfo;
}

// Exposer les fonctions globalement pour les boutons HTML
window.testServer = testServer;
window.testRailway = testRailway;
window.testGitHub = testGitHub;
window.runAllTests = runAllTests;
window.refreshPage = refreshPage; 