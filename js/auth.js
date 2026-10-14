// ===== AUTH.JS =====

// Mettre à jour le bouton connexion dans la navbar
function mettreAJourNavbar() {
  const user   = JSON.parse(localStorage.getItem('user') || 'null')
  const btnCnx = document.getElementById('btn-connexion')

  if (!btnCnx) return

  if (user) {
    btnCnx.textContent = user.prenom
    btnCnx.href        = 'mon-compte.html'
  } else {
    btnCnx.textContent = 'Connexion'
    btnCnx.href        = 'connexion.html'
  }
}

// Lancer au chargement
document.addEventListener('DOMContentLoaded', mettreAJourNavbar)