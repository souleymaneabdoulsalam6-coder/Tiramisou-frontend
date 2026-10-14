// ===== PANIER.JS =====

// Récupérer le panier
function getPanier() {
  try {
    return JSON.parse(localStorage.getItem('panier')) || []
  } catch {
    return []
  }
}

// Ajouter au panier
function ajouterAuPanier(produit, qty = 1) {
  const panier = getPanier()
  const existe  = panier.find(i => i.id === produit.id)

  if (existe) {
    existe.qty += qty
  } else {
    panier.push({ ...produit, qty })
  }

  localStorage.setItem('panier', JSON.stringify(panier))
  mettreAJourCompteur()
  afficherNotification(`${produit.nom} ajouté au panier !`)
}

// Supprimer du panier
function supprimerDuPanier(id) {
  const panier = getPanier().filter(i => i.id !== id)
  localStorage.setItem('panier', JSON.stringify(panier))
  mettreAJourCompteur()
  if (typeof afficherPanier === 'function') afficherPanier()
}

// Mettre à jour quantité
function mettreAJourQty(id, qty) {
  const panier = getPanier().map(i =>
    i.id === id ? { ...i, qty } : i
  )
  localStorage.setItem('panier', JSON.stringify(panier))
  mettreAJourCompteur()
}

// Mettre à jour le compteur navbar
function mettreAJourCompteur() {
  const total = getPanier().reduce((s, i) => s + i.qty, 0)
  const el    = document.getElementById('panier-count')
  if (el) el.textContent = total
}

// Notification toast
function afficherNotification(message, type = 'succes') {
  // Supprimer toast existant
  const ancien = document.getElementById('toast-notif')
  if (ancien) ancien.remove()

  const toast = document.createElement('div')
  toast.id    = 'toast-notif'
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'succes' ? 'var(--marron)' : 'var(--rouge)'};
    color: white;
    padding: 0.9rem 1.6rem;
    border-radius: 50px;
    font-size: 0.88rem;
    z-index: 9999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    transition: opacity 0.3s;
    opacity: 1;
  `
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 300)
  }, 2800)
}

// Lancer au chargement
document.addEventListener('DOMContentLoaded', mettreAJourCompteur)