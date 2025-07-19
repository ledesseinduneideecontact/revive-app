// État global de l'application
let appState = {
    currentView: 'landing',
    uploadBlocks: [],
    maxBlocks: 5,
    blockPrice: 25 // Prix par bloc en euros
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialiser les événements
    setupEventListeners();
    
    // Afficher la vue initiale
    showLanding();
    
    // Initialiser le premier bloc d'upload
    addUploadBlock();
}

function setupEventListeners() {
    // Écouter les changements dans le formulaire client
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('input', validateForm);
    }
}

// Navigation entre les vues
function showDashboard() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    appState.currentView = 'dashboard';
    
    // Animation de transition
    const dashboard = document.getElementById('dashboard');
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        dashboard.style.transition = 'all 0.3s ease';
        dashboard.style.opacity = '1';
        dashboard.style.transform = 'translateY(0)';
    }, 10);
}

function showLanding() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('landing').style.display = 'block';
    appState.currentView = 'landing';
    
    // Animation de transition
    const landing = document.getElementById('landing');
    landing.style.opacity = '0';
    landing.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        landing.style.transition = 'all 0.3s ease';
        landing.style.opacity = '1';
        landing.style.transform = 'translateY(0)';
    }, 10);
}

// Gestion des blocs d'upload
function addUploadBlock() {
    if (appState.uploadBlocks.length >= appState.maxBlocks) {
        showNotification('Vous avez atteint le maximum de 5 blocs', 'warning');
        return;
    }
    
    const blockId = Date.now();
    const newBlock = {
        id: blockId,
        photo: null,
        video: null,
        isValid: false
    };
    
    appState.uploadBlocks.push(newBlock);
    renderUploadBlocks();
    updateBlockCount();
    updateAddBlockButton();
}

function removeUploadBlock(blockId) {
    appState.uploadBlocks = appState.uploadBlocks.filter(block => block.id !== blockId);
    renderUploadBlocks();
    updateBlockCount();
    updateAddBlockButton();
    validateForm();
}

function renderUploadBlocks() {
    const uploadBlocksContainer = document.getElementById('uploadBlocks');
    if (!uploadBlocksContainer) return;
    
    uploadBlocksContainer.innerHTML = '';
    
    appState.uploadBlocks.forEach((block, index) => {
        const blockElement = createUploadBlockElement(block, index + 1);
        uploadBlocksContainer.appendChild(blockElement);
    });
}

function createUploadBlockElement(block, blockNumber) {
    const blockDiv = document.createElement('div');
    blockDiv.className = 'upload-block';
    blockDiv.innerHTML = `
        <div class="upload-block-header">
            <h3>Bloc ${blockNumber}</h3>
            ${appState.uploadBlocks.length > 1 ? `
                <button class="remove-block-btn" onclick="removeUploadBlock(${block.id})">
                    <i class="fas fa-trash"></i>
                </button>
            ` : ''}
        </div>
        <div class="upload-area">
            <div class="upload-zone ${block.photo ? 'has-file' : ''}" onclick="triggerFileInput('photo-${block.id}')">
                <i class="fas fa-camera"></i>
                <p>${block.photo ? 'Photo sélectionnée' : 'Cliquez pour ajouter une photo'}</p>
                <input type="file" id="photo-${block.id}" accept="image/*" style="display: none;" onchange="handlePhotoUpload(${block.id}, this)">
            </div>
            <div class="upload-zone ${block.video ? 'has-file' : ''}" onclick="triggerFileInput('video-${block.id}')">
                <i class="fas fa-video"></i>
                <p>${block.video ? 'Vidéo sélectionnée' : 'Cliquez pour ajouter une vidéo'}</p>
                <input type="file" id="video-${block.id}" accept="video/*" style="display: none;" onchange="handleVideoUpload(${block.id}, this)">
            </div>
        </div>
        ${block.photo || block.video ? `
            <div class="file-preview">
                ${block.photo ? `
                    <div class="preview-item">
                        <img src="${block.photo.preview}" alt="Photo preview" style="max-width: 100px; max-height: 100px; border-radius: 8px;">
                        <span>${block.photo.name}</span>
                    </div>
                ` : ''}
                ${block.video ? `
                    <div class="preview-item">
                        <video src="${block.video.preview}" controls style="max-width: 100px; max-height: 100px; border-radius: 8px;"></video>
                        <span>${block.video.name}</span>
                    </div>
                ` : ''}
            </div>
        ` : ''}
    `;
    
    return blockDiv;
}

function triggerFileInput(inputId) {
    document.getElementById(inputId).click();
}

function handlePhotoUpload(blockId, input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validation du fichier photo
    const validation = validatePhotoFile(file);
    if (!validation.isValid) {
        showNotification(validation.message, 'error');
        input.value = '';
        return;
    }
    
    const block = appState.uploadBlocks.find(b => b.id === blockId);
    if (block) {
        block.photo = {
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
            preview: URL.createObjectURL(file)
        };
        
        renderUploadBlocks();
        validateBlock(blockId);
        validateForm();
    }
}

function handleVideoUpload(blockId, input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validation du fichier vidéo
    const validation = validateVideoFile(file);
    if (!validation.isValid) {
        showNotification(validation.message, 'error');
        input.value = '';
        return;
    }
    
    const block = appState.uploadBlocks.find(b => b.id === blockId);
    if (block) {
        block.video = {
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
            preview: URL.createObjectURL(file)
        };
        
        renderUploadBlocks();
        validateBlock(blockId);
        validateForm();
    }
}

// Validation des fichiers
function validatePhotoFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            message: 'Format de photo non supporté. Utilisez JPG, PNG ou WebP.'
        };
    }
    
    if (file.size > maxSize) {
        return {
            isValid: false,
            message: 'La photo est trop volumineuse. Taille maximum : 10MB.'
        };
    }
    
    return { isValid: true };
}

function validateVideoFile(file) {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            message: 'Format de vidéo non supporté. Utilisez MP4, AVI, MOV ou WMV.'
        };
    }
    
    if (file.size > maxSize) {
        return {
            isValid: false,
            message: 'La vidéo est trop volumineuse. Taille maximum : 100MB.'
        };
    }
    
    return { isValid: true };
}

function validateBlock(blockId) {
    const block = appState.uploadBlocks.find(b => b.id === blockId);
    if (block) {
        block.isValid = !!(block.photo && block.video);
    }
}

// Validation du formulaire
function validateForm() {
    const customerName = document.getElementById('customerName')?.value;
    const customerEmail = document.getElementById('customerEmail')?.value;
    const customerPhone = document.getElementById('customerPhone')?.value;
    
    const hasValidBlocks = appState.uploadBlocks.some(block => block.isValid);
    const hasRequiredInfo = customerName && customerEmail;
    
    const submitButton = document.querySelector('.submit-order-btn');
    if (submitButton) {
        submitButton.disabled = !(hasValidBlocks && hasRequiredInfo);
    }
}

// Mise à jour de l'interface
function updateBlockCount() {
    const blocksCountElement = document.getElementById('blocksCount');
    if (blocksCountElement) {
        blocksCountElement.textContent = `${appState.uploadBlocks.length}/${appState.maxBlocks}`;
    }
    
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        const total = appState.uploadBlocks.length * appState.blockPrice;
        totalPriceElement.textContent = `${total}€`;
    }
}

function updateAddBlockButton() {
    const addBlockBtn = document.getElementById('addBlockBtn');
    if (addBlockBtn) {
        addBlockBtn.disabled = appState.uploadBlocks.length >= appState.maxBlocks;
    }
}

// Soumission de la commande
function submitOrder() {
    const customerName = document.getElementById('customerName')?.value;
    const customerEmail = document.getElementById('customerEmail')?.value;
    const customerPhone = document.getElementById('customerPhone')?.value;
    const customerMessage = document.getElementById('customerMessage')?.value;
    
    if (!customerName || !customerEmail) {
        showNotification('Veuillez remplir les informations obligatoires', 'error');
        return;
    }
    
    const validBlocks = appState.uploadBlocks.filter(block => block.isValid);
    if (validBlocks.length === 0) {
        showNotification('Veuillez ajouter au moins un bloc avec photo et vidéo', 'error');
        return;
    }
    
    // Préparer les données de la commande
    const orderData = {
        customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            message: customerMessage
        },
        blocks: validBlocks.map(block => ({
            id: block.id,
            photo: {
                name: block.photo.name,
                size: block.photo.size,
                type: block.photo.type
            },
            video: {
                name: block.video.name,
                size: block.video.size,
                type: block.video.type
            }
        })),
        totalPrice: validBlocks.length * appState.blockPrice,
        timestamp: new Date().toISOString()
    };
    
    // Simuler l'envoi de la commande
    showNotification('Traitement de votre commande...', 'info');
    
    setTimeout(() => {
        console.log('Commande soumise:', orderData);
        showNotification('Commande soumise avec succès !', 'success');
        
        // Réinitialiser le formulaire
        resetForm();
    }, 2000);
}

function resetForm() {
    // Réinitialiser les blocs
    appState.uploadBlocks = [];
    addUploadBlock();
    
    // Réinitialiser le formulaire client
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.reset();
    }
    
    // Mettre à jour l'interface
    updateBlockCount();
    updateAddBlockButton();
    validateForm();
}

// Notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colors[type] || '#3498db';
}

// Styles CSS pour les notifications
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;

// Ajouter les styles de notification au head
if (!document.querySelector('#notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
} 