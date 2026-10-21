// ===== BOUTIQUE.JS =====
let tousLesProduits = []
let categorieActive = ''

// Charger les produits depuis l'API Laravel
async function chargerProduits() {
  const grille = document.getElementById('grille-produits')
  grille.innerHTML = '<p style="color:var(--gris);">Chargement...</p>'

  try {
    const res = await fetch(`${API_URL}/produits`)
    const data = await res.json()
    tousLesProduits = data.data || []
    afficherProduits(tousLesProduits)
  } catch (err) {
    grille.innerHTML = '<p style="color:red;">Erreur de chargement.</p>'
  }
}

// Afficher les produits dans la grille
function afficherProduits(produits) {
  const grille   = document.getElementById('grille-produits')
  const vide     = document.getElementById('message-vide')
  const nb       = document.getElementById('nombre-resultats')

  nb.textContent = produits.length

  if (produits.length === 0) {
    grille.innerHTML = ''
    vide.style.display = 'block'
    return
  }

  vide.style.display = 'none'
  grille.innerHTML = produits.map(p => `
    <div class="card">
      ${p.image
        ? `<img src="${p.image}" alt="${p.nom}" class="card-img"/>`
        : `<div class="card-img-placeholder">🎂</div>`
      }
      <div class="card-body">
        <p class="card-category">${p.categorie?.nom || ''}</p>
        <h3 class="card-title">${p.nom}</h3>
        <p style="font-size:0.82rem; color:var(--gris); margin-bottom:0.5rem;">
          ${p.description?.substring(0, 60) || ''}...
        </p>
        <div class="card-footer">
          <span class="card-price">${parseFloat(p.prix).toFixed(2)} €</span>
          <button
            class="btn btn-caramel"
            style="font-size:0.78rem; padding:0.4rem 0.9rem;"
            onclick="ajouterAuPanier(${JSON.stringify(p).replace(/"/g, '&quot;')})"
            ${p.stock === 0 ? 'disabled style="opacity:0.4"' : ''}
          >
            ${p.stock === 0 ? 'Épuisé' : '+ Panier'}
          </button>
        </div>
      </div>
    </div>
  `).join('')
}

// Filtrer par catégorie
function filtrerCategorie(cat) {
  categorieActive = cat
  document.querySelectorAll('.btn-filtre').forEach(b => {
    b.classList.toggle('actif', b.dataset.cat === cat)
  })
  appliquerFiltres()
}

// Appliquer recherche + catégorie + tri
function appliquerFiltres() {
  const recherche = document.getElementById('recherche').value.toLowerCase()
  const tri = document.getElementById('tri').value

  let resultats = tousLesProduits.filter(p => {
    const matchCat = !categorieActive || p.categorie?.slug === categorieActive
    const matchSearch = p.nom.toLowerCase().includes(recherche) ||
                        p.description?.toLowerCase().includes(recherche)
    return matchCat && matchSearch
  })

  if (tri === 'prix-asc')  resultats.sort((a,b) => a.prix - b.prix)
  if (tri === 'prix-desc') resultats.sort((a,b) => b.prix - a.prix)
  if (tri === 'nom')       resultats.sort((a,b) => a.nom.localeCompare(b.nom))

  afficherProduits(resultats)
}

// Événements
document.getElementById('recherche').addEventListener('input', appliquerFiltres)
document.getElementById('tri').addEventListener('change', appliquerFiltres)

document.querySelectorAll('.btn-filtre').forEach(btn => {
  btn.addEventListener('click', () => filtrerCategorie(btn.dataset.cat))
})

// Lancer au chargement
chargerProduits()