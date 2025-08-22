// ==========================
// CAROUSEL AVEC POINTS + AUTOPLAY
// ==========================
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const dotsContainer = document.querySelector(".dots");

let index = 0;
const total = images.length;
const AUTOPLAY_MS = 5000; // défilement toutes les 5 secondes
let timerId = null;

// Créer les points
const dots = Array.from({ length: total }, (_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.addEventListener("click", () => {
    stopAutoplay(); // stop autoplay quand on clique
    goTo(i);
  });
  dotsContainer.appendChild(dot);
  return dot;
});

function update() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

function goTo(n) {
  index = (n + total) % total;
  update();
}

function next() {
  goTo(index + 1);
}

// --- Autoplay
function startAutoplay() {
  if (timerId) return;
  timerId = setInterval(next, AUTOPLAY_MS);
}

function stopAutoplay() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

// --- Swipe tactile ---
let startX = 0;
let startY = 0;
let swiping = false;
const SWIPE_THRESHOLD = 40;

slides.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
  swiping = true;
  stopAutoplay(); // stop autoplay quand on commence à swiper
}, { passive: true });

slides.addEventListener("touchmove", (e) => {
  if (!swiping) return;
  const t = e.touches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
    swiping = false;
    if (dx < 0) next();
    else goTo(index - 1);
  }
}, { passive: true });

slides.addEventListener("touchend", () => {
  swiping = false;
  startAutoplay(); // relance autoplay après swipe
});

// --- Pause au survol sur PC
slides.addEventListener("mouseenter", stopAutoplay);
slides.addEventListener("mouseleave", startAutoplay);

// Init
goTo(0);
startAutoplay();


// ==========================
// SYSTÈME DE CODE SECRET
// ==========================
function initSecretCode() {
  const VALID_CODE = "Creator";

  const input = document.getElementById("codeInput");
  const message = document.getElementById("message");
  const secret = document.getElementById("secret");

  if (!input || !message || !secret) {
    console.warn("Éléments requis pour le code secret manquants !");
    return;
  }

  // Vérifier si le secret est déjà débloqué
  if (localStorage.getItem("secretUnlocked") === "1") {
    showSecret("Code déjà validé ✅");
  }

  // Afficher le secret et message de succès
  function showSecret(msg) {
    secret.classList.add("show");
    message.textContent = msg;
    message.classList.remove("error");
    message.classList.add("success");
  }

  // Masquer le secret et afficher message d'erreur
  function hideSecret(msg) {
    secret.classList.remove("show");
    message.textContent = msg;
    message.classList.remove("success");
    message.classList.add("error");
  }

  // Fonction de vérification du code
  function verifierCode() {
    const codeEntre = input.value.trim();
    if (codeEntre.toLowerCase() === VALID_CODE.toLowerCase()) {
      showSecret("Code correct ! 🎉");
      localStorage.setItem("secretUnlocked", "1");
    } else {
      hideSecret("Code incorrect, réessayez.");
      localStorage.removeItem("secretUnlocked");
    }
  }

  // Rendre la fonction accessible globalement pour l'attribut onclick
  window.verifierCode = verifierCode;

  // Vérifier le code avec la touche Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifierCode();
    }
  });
}

// Initialiser après le chargement du DOM
document.addEventListener("DOMContentLoaded", initSecretCode);
