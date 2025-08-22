document.addEventListener("DOMContentLoaded", function() {

    // ==========================
    // CAROUSEL AVEC POINTS + AUTOPLAY
    // ==========================
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const dotsContainer = document.querySelector(".dots");

    if (slides && images.length && dotsContainer) {

        let index = 0;
        const total = images.length;
        const AUTOPLAY_MS = 5000;
        let timerId = null;

        const dots = Array.from({ length: total }, (_, i) => {
            const dot = document.createElement("span");
            dot.className = "dot";
            dot.addEventListener("click", () => {
                stopAutoplay();
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

        function startAutoplay() {
            if (!timerId) {
                timerId = setInterval(next, AUTOPLAY_MS);
            }
        }

        function stopAutoplay() {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
        }

        let startX = 0, startY = 0, swiping = false;
        const SWIPE_THRESHOLD = 40;

        slides.addEventListener("touchstart", e => {
            const t = e.touches[0];
            startX = t.clientX;
            startY = t.clientY;
            swiping = true;
            stopAutoplay();
        }, { passive: true });

        slides.addEventListener("touchmove", e => {
            if (!swiping) return;
            const t = e.touches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
                swiping = false;
                dx < 0 ? next() : goTo(index - 1);
            }
        }, { passive: true });

        slides.addEventListener("touchend", () => {
            swiping = false;
            startAutoplay();
        });

        slides.addEventListener("mouseenter", stopAutoplay);
        slides.addEventListener("mouseleave", startAutoplay);

        goTo(0);
        startAutoplay();
    }

    // ==========================
    // SYSTÈME DE CODE SECRET
    // ==========================
    const VALID_CODE = "Creator";
    const input = document.getElementById("codeInput");
    const message = document.getElementById("message");
    const secret = document.getElementById("secret");
    const button = document.getElementById("codeButton");

    if (input && message && secret && button) {

        // Réinitialiser le code secret à chaque refresh
        localStorage.removeItem("secretUnlocked");

        // Masquer le secret au départ
        secret.style.display = "none";

        function showSecret(msg) {
            secret.style.display = "block";
            secret.style.opacity = "1";
            message.textContent = msg;
            message.classList.remove("error");
            message.classList.add("success");
        }

        function hideSecret(msg) {
            secret.style.display = "none";
            message.textContent = msg;
            message.classList.remove("success");
            message.classList.add("error");
        }

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

        button.addEventListener("click", verifierCode);
        input.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                verifierCode();
            }
        });

        window.verifierCode = verifierCode;
    }

});
