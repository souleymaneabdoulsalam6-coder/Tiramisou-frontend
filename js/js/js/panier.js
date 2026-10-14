// ===== PANIER.JS =====

const API_URL = 'https://ton-api.infinityfree.com/api'

// Récupérer le panier depuis localStorage
function getPanier() {
  try {
    return JSON.parse(localStorage.getItem('panier')) || []
  } catch {
    return []
  }
}

// Ajouter un produit au panier
function ajouterAuPanier(produit, qty = 1) {
  const panier = getPanier()
  const existe = panier.find(i => i.id === produit.id)

  if (existe) {
    existe.qty += qty
  } else {
    panier.push({ ...produit, qty })
  }

  localStorage.setItem('panier', JSON.stringify(panier))
  mettreAJourCompteur()
  afficherNotification(`${produit.nom} ajouté au panier !`)
}

// Supprimer un produit
function supprimerDuPanier(id) {
  let panier = getPanier().filter(i => i.id !== id)
  localStorage.setItem('panier', JSON.stringify(panier))
  mettreAJourCompteur()
  if (typeof afficherPanier === 'function') afficherPanier()
}

// Mettre à jour la quantité
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
  const el = document.getElementById('panier-count')
  if (el) el.textContent = total
}

// Notification toast
function afficherNotification(message, type = 'succes') {
  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'succes' ? 'var(--marron)' : 'var(--rouge)'};
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    font-size: 0.85rem;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  `
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// Mettre à jour le compteur au chargement
document.addEventListener('DOMContentLoaded', mettreAJourCompteur)