// ===== MAIN.JS =====

// Charger les produits vedettes sur la page d'accueil
async function chargerVedettes() {
  const conteneur = document.getElementById('produits-vedettes')
  if (!conteneur) return

  try {
    const res  = await fetch(`${API_URL}/produits?vedette=1&limit=4`)
    const data = await res.json()
    const produits = data.data || []

    if (produits.length === 0) {
      conteneur.innerHTML = `
        <p style="color:var(--gris); grid-column:1/-1; text-align:center;
                  padding:2rem;">
          Catalogue bientôt disponible.
        </p>`
      return
    }

    conteneur.innerHTML = produits.map(p => `
      <div class="card">
        ${p.image
          ? `<img src="${p.image}" alt="${p.nom}" class="card-img"/>`
          : `<div class="card-img-placeholder">🎂</div>`}
        <div class="card-body">
          <p class="card-category">${p.categorie?.nom || ''}</p>
          <h3 class="card-title">${p.nom}</h3>
          <div class="card-footer">
            <span class="card-price">
              ${parseFloat(p.prix).toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA
            </span>
            <button
              class="btn btn-caramel"
              style="font-size:0.78rem; padding:0.4rem 0.9rem;"
              onclick="ajouterAuPanier(${JSON.stringify(p).replace(/"/g,'&quot;')})"
              ${p.stock === 0 ? 'disabled style="opacity:0.4"' : ''}>
              ${p.stock === 0 ? 'Épuisé' : '+ Panier'}
            </button>
          </div>
        </div>
      </div>
    `).join('')

  } catch(err) {
    if (conteneur) {
      conteneur.innerHTML = `
        <p style="color:var(--gris); grid-column:1/-1; text-align:center;">
          Catalogue bientôt disponible.
        </p>`
    }
  }
}

document.addEventListener('DOMContentLoaded', chargerVedettes)