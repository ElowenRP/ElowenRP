// ==========================
// SLIDER
// ==========================
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

// Fonction pour afficher la slide actuelle
function showSlide(i) {
    if (i >= images.length) index = 0;
    if (i < 0) index = images.length - 1;
    slides.style.transform = `translateX(${-index * 100}%)`;
}

// Gestion des flèches
next.addEventListener('click', () => {
    index++;
    showSlide(index);
});

prev.addEventListener('click', () => {
    index--;
    showSlide(index);
});

// Défilement automatique toutes les 6 secondes
setInterval(() => {
    index++;
    showSlide(index);
}, 6000);

// Initialisation
showSlide(index);


// ==========================
// SYSTEME DE CODE SECRET
// ==========================
function verifierCode() {
    const codeCorrect = "Creator";
    const codeEntre = document.getElementById("codeInput").value.trim();
    const message = document.getElementById("message");
    const secret = document.getElementById("secret");

    if (codeEntre === codeCorrect) {
        message.textContent = "Code correct ! 🎉";
        message.classList.remove("error");
        message.classList.add("success");
        secret.classList.add("show");
    } else {
        message.textContent = "Code incorrect, réessayez.";
        message.classList.remove("success");
        message.classList.add("error");
        secret.classList.remove("show");
    }
}

