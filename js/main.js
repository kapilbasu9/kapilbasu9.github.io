// ==================================
// main.js — PRODUCTION CLEAN VERSION
// ==================================

(function () {

    const $ = (s) => document.querySelector(s);
    const $$ = (s) => Array.from(document.querySelectorAll(s));

    // ============================
    // PAGE LOAD FADE-IN
    // ============================
    document.addEventListener("DOMContentLoaded", () => {
        const page = $(".page-transition");
        if (page) setTimeout(() => page.classList.add("visible"), 120);
    });

    // ============================
    // PAGE CHANGE FADE TRANSITION
    // ============================
    (function pageTransitions() {
        const links = document.querySelectorAll("a[href]");
        const trans = $(".page-transition");
        if (!trans) return;

        links.forEach(link => {
            link.addEventListener("click", (e) => {
                const url = link.getAttribute("href");

                if (
                    !url ||
                    url.startsWith("#") ||
                    url.startsWith("http") ||
                    url.startsWith("mailto:") ||
                    url.startsWith("tel:") ||
                    link.hasAttribute("download")
                ) return;

                e.preventDefault();
                trans.classList.remove("visible");
                trans.classList.add("fade-out");

                setTimeout(() => window.location.href = url, 350);
            });
        });
    })();

    // ============================
    // PRELOADER
    // ============================
    window.addEventListener("load", () => {
        const pre = $("#preloader");
        if (!pre) return;

        pre.style.opacity = "0";
        pre.style.transition = "opacity 300ms ease";
        setTimeout(() => pre.style.display = "none", 350);
    });

    // ============================
    // SCROLL REVEAL
    // ============================
    (function revealAnimations() {
        const items = $$(".reveal");
        if (!items.length) return;

        if (!("IntersectionObserver" in window)) {
            items.forEach(r => r.classList.add("visible"));
            return;
        }

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
        }, { threshold: 0.15 });

        items.forEach(r => obs.observe(r));
    })();

    // ============================
    // TIMELINE SCROLL ANIMATION
    // ============================
    (function timelineAnimation() {
        const items = $$(".timeline-item");
        if (!items.length) return;

        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const index = items.indexOf(entry.target);
                setTimeout(() => entry.target.classList.add("visible"), index * 120);
                o.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        items.forEach(i => obs.observe(i));
    })();

    // ====================================
    // SKILL RINGS & BARS ANIMATION
    // ====================================
    (function skillAnimation() {
        const rings = document.querySelectorAll(".ring");
        const bars = document.querySelectorAll(".bar-fill");

        if (!rings.length && !bars.length) return;

        function getPercent(el) {
            return parseInt(
                el.dataset.progress ||
                el.dataset.percent ||
                el.dataset.value ||
                0
            ) || 0;
        }

        function animateRing(el, target) {
            const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            const bg = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
            const percentText = el.querySelector(".percent");

            const duration = 900;
            const startTime = performance.now();

            function frame(now) {
                const t = Math.min(1, (now - startTime) / duration);
                const eased = (1 - Math.cos(Math.PI * t)) / 2;
                const current = Math.round(target * eased);
                const deg = current * 3.6;

                el.style.background = `conic-gradient(${accent} ${deg}deg, ${bg} ${deg}deg)`;
                if (percentText) percentText.textContent = current + "%";

                if (t < 1) requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
        }

        function animateBar(el, target) {
            el.style.width = `${target}%`;
        }

        const observer = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (entry.target.classList.contains("ring")) {
                    animateRing(entry.target, getPercent(entry.target));
                }

                if (entry.target.classList.contains("bar-fill")) {
                    animateBar(entry.target, getPercent(entry.target));
                }

                o.unobserve(entry.target);
            });
        }, { threshold: 0.25 });

        rings.forEach(r => observer.observe(r));
        bars.forEach(b => observer.observe(b));
    })();

    // ============================
    // STAT COUNTER (FIXED)
    // ============================
    (function statsCounter() {

        const counters = $$(".stat-number");
        if (!counters.length) return;

        const obs = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const target = parseInt(el.dataset.count, 10) || 0;
                let current = 0;

                const duration = 1200;
                const start = performance.now();

                function update(now) {
                    const progress = Math.min(1, (now - start) / duration);
                    const ease = (1 - Math.cos(Math.PI * progress)) / 2;
                    current = Math.round(target * ease);

                    el.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }

                el.classList.add("visible");
                requestAnimationFrame(update);
                obs.unobserve(el);
            });

        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -80px 0px"
        });

        counters.forEach(c => obs.observe(c));

    })();

    // ============================
    // NAV ACTIVE LINK HIGHLIGHT
    // ============================
    (function highlightNav() {
        const links = $$(".nav a");
        if (!links.length) return;

        const page = location.pathname.split("/").pop() || "index.html";
        links.forEach(a => {
            const href = a.getAttribute("href").split("/").pop();
            if (href === page) a.classList.add("active");
        });
    })();

    // ============================
    // SCROLL TO TOP BUTTON
    // ============================
    (function scrollTop() {
        const btn = $("#toTopBtn");
        if (!btn) return;

        window.addEventListener("scroll", () => {
            btn.style.display = window.scrollY > 400 ? "flex" : "none";
        });

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    })();

    // ============================
    // TYPING EFFECT (Home Page)
    // ============================
    (function typingEffect() {
        const roleText = $("#roleText");
        if (!roleText) return;

        const roles = [
            "Electronics Engineer",
            "HR Recruiter",
            "AI Projects",
            "Developer",
            "Tech Enthusiast"
        ];

        let index = 0, charIndex = 0, deleting = false;

        function type() {
            const word = roles[index];

            roleText.textContent = deleting
                ? word.slice(0, charIndex--)
                : word.slice(0, charIndex++);

            if (!deleting && charIndex > word.length + 3) deleting = true;
            else if (deleting && charIndex === 0) {
                deleting = false;
                index = (index + 1) % roles.length;
            }

            setTimeout(type, deleting ? 60 : 90);
        }
        type();
    })();

    // ============================
    // FOOTER REVEAL
    // ============================
    (function footerReveal() {
        const footer = $(".footer-reveal");
        if (!footer) return;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) footer.classList.add("visible");
            });
        }, { threshold: 0.2 });

        obs.observe(footer);
    })();

    // ============================================================
    // ABOUT PAGE — IMAGE POPUP SYSTEM (ONLY RUNS IN about.html)
    // ============================================================
    (function aboutImagePopup() {

        if (!location.pathname.endsWith("about.html")) return;
    
        const images = document.querySelectorAll(".gallery-image");
        const popup = document.querySelector(".image-popup");
        const popupImg = document.querySelector(".popup-image");
        const closeBtn = document.querySelector(".close-popup");
    
        if (!images.length || !popup || !popupImg || !closeBtn) return;
    
        images.forEach(img => {
            img.addEventListener("click", () => {
                popupImg.src = img.src;
                popup.classList.add("active");
            });
        });
    
        closeBtn.addEventListener("click", () => popup.classList.remove("active"));
        popup.addEventListener("click", (e) => {
            if (e.target === popup) popup.classList.remove("active");
        });
    
        console.log("✔ Image Preview Popup Active");
    
    })();
    

    // ============================================================
// ABOUT PAGE — IMAGE CAROUSEL SYSTEM (ONLY RUNS IN about.html)
// ============================================================
(function aboutCarousel() {

    if (!location.pathname.endsWith("about.html")) return;

    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");

    if (!slides.length) return;

    let index = 0;
    let autoPlayTimer = null;
    const autoPlayInterval = 4000;

    // ---------------------------
    // Activate Slide
    // ---------------------------
    function showSlide(newIndex) {
        const oldSlide = slides[index];
        const newSlide = slides[newIndex];

        if (oldSlide) {
            oldSlide.classList.remove("active");
            oldSlide.classList.add("fade-out");

            setTimeout(() => oldSlide.classList.remove("fade-out"), 600);
        }

        newSlide.classList.add("active");
        index = newIndex;
    }

    // ---------------------------
    // Controls
    // ---------------------------
    function next() {
        showSlide((index + 1) % slides.length);
        restartAutoPlay();
    }

    function prev() {
        showSlide((index - 1 + slides.length) % slides.length);
        restartAutoPlay();
    }

    // ---------------------------
    // Autoplay Timer
    // ---------------------------
    function startAutoPlay() {
        autoPlayTimer = setInterval(next, autoPlayInterval);
    }

    function restartAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // ---------------------------
    // Event Listeners
    //----------------------------
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    });

    // Swipe detection
    let touchStartX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (endX < touchStartX - 50) next();
        if (endX > touchStartX + 50) prev();
    });

    // Start
    showSlide(0);
    startAutoPlay();

    console.log("✔ About Page Carousel Active");

})();


    console.log("%c✔ main.js loaded", "background:#00ff00;color:#000;padding:4px;border-radius:4px");

})();

// ====================================
// THEME SWITCH — FINAL VERSION
// ====================================
function initThemeButton() {
    const html = document.documentElement;
    const btn = document.getElementById("themeBtn");

    if (!btn) return;

    let saved = localStorage.getItem("site-theme") || "dark";
    html.setAttribute("data-theme", saved);
    btn.textContent = saved === "light" ? "🌙" : "☀️";

    btn.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("site-theme", next);
        btn.textContent = next === "light" ? "🌙" : "☀️";
    });
}

// GLOBAL SCROLL REVEAL ANIMATION
function triggerReveal() {
    const windowHeight = window.innerHeight;

    document.querySelectorAll(".reveal").forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("load", triggerReveal);
window.addEventListener("scroll", triggerReveal);
document.addEventListener("DOMContentLoaded", triggerReveal);
document.addEventListener("headerLoaded", triggerReveal);
document.addEventListener("footerLoaded", triggerReveal);

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});
