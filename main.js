/* ==========================================
   MOBILE NAVIGATION DRAWER TOGGLE (ACCESSIBLE)
   ========================================== */
const menuBtn = document.querySelector(".menu-icon");
const navList = document.getElementById("nav-list");

if (menuBtn && navList) {
    menuBtn.onclick = () => {
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", !expanded);
        navList.classList.toggle("open-menu");
        menuBtn.classList.toggle("move");
    };
}

// Helper to reset mobile nav drawer
function closeMobileMenu() {
    if (navList && navList.classList.contains("open-menu")) {
        navList.classList.remove("open-menu");
        menuBtn.classList.remove("move");
        menuBtn.setAttribute("aria-expanded", "false");
    }
}

// Close drawer on link clicks
document.querySelectorAll(".nav-link").forEach(link => {
    link.onclick = () => {
        closeMobileMenu();
    };
});

// Close drawer when pressing Escape
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList && navList.classList.contains("open-menu")) {
        closeMobileMenu();
        if (menuBtn) menuBtn.focus();
    }
});

/* ==========================================
   THROTTLED SCROLL LISTENER & EFFECTS
   ========================================== */
const header = document.getElementById("header");
const progressIndicator = document.getElementById("scroll-progress");
const scrollToTopBtn = document.getElementById("scroll-to-top");
const sections = document.querySelectorAll("section[id]");

function handleScrollEffects() {
    const scrollY = window.scrollY;

    // 1. Transparent Header Toggle
    if (header) {
        if (scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    }

    // 2. Reading Progress Indicator Width
    if (progressIndicator) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progressIndicator.style.width = scrollPercent + "%";
    }

    // 3. Scroll to Top Button Visibility
    if (scrollToTopBtn) {
        if (scrollY > 500) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    // 4. Scroll Active Navigation Highlights
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 180; // Offset for header padding
        const sectionId = current.getAttribute("id");
        
        const navLink = document.querySelector(`.navbar a[href*="${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active");
            } else {
                navLink.classList.remove("active");
            }
        }
    });
}

// Performance Throttling via requestAnimationFrame
let scrollTicking = false;
window.addEventListener("scroll", () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            handleScrollEffects();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Scroll to Top Click Trigger
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ==========================================
   RESUME VIEWER ACTIONS
   ========================================== */
const resumeBtn = document.querySelector('.btn');
if (resumeBtn) {
    resumeBtn.onclick = (e) => {
        window.open('https://drive.google.com/file/d/1C-xbWdSqu-T6EKS3FVgs7_7FcTr-q9VX/view', '_blank');
    };
}

/* ==========================================
   INTERACTIVE SCROLL-REVEAL OBSERVER
   ========================================== */
const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================
   ACCESSIBLE CONTACT FORM VALIDATION
   ========================================== */
const contactForm = document.getElementById("contact-form");
const toastAlert = document.getElementById("toast");

if (contactForm) {
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const msgInput = document.getElementById("contact-msg");
    
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const msgError = document.getElementById("msg-error");

    function validateEmail(emailVal) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    }

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset error messages and visual warnings
        nameInput.classList.remove("invalid");
        emailInput.classList.remove("invalid");
        msgInput.classList.remove("invalid");
        nameError.textContent = "";
        emailError.textContent = "";
        msgError.textContent = "";

        // 1. Name Check
        if (!nameInput.value.trim()) {
            nameInput.classList.add("invalid");
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        // 2. Email Check
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            emailInput.classList.add("invalid");
            emailError.textContent = "Please enter your email address.";
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            emailInput.classList.add("invalid");
            emailError.textContent = "Please enter a valid email (e.g. name@domain.com).";
            isValid = false;
        }

        // 3. Message Check
        if (!msgInput.value.trim()) {
            msgInput.classList.add("invalid");
            msgError.textContent = "Please write a message.";
            isValid = false;
        }

        // Action on valid submission
        if (isValid) {
            if (toastAlert) {
                toastAlert.classList.add("show");
                setTimeout(() => {
                    toastAlert.classList.remove("show");
                }, 4000);
            }
            contactForm.reset();
        }
    });
}

/* ==========================================
   INTERACTIVE CANVAS PARTICLE CONSTELLATION
   ========================================== */
const canvas = document.getElementById("particle-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null, radius: 100 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3; // slow ambient drift
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.5 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse repulsion
            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.hypot(dx, dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx / dist * force * 1.2;
                    this.y -= dy / dist * force * 1.2;
                }
            }
        }
        draw() {
            ctx.fillStyle = "rgba(99, 102, 241, 0.35)"; // Indigo point
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        // Calculate density: less nodes on mobile viewports
        const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 28000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.hypot(dx, dy);
                if (dist < 100) {
                    // Connective lines fade out as particles separate
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    init();
    animate();
}

/* ==========================================
   CONSOLE EASTER EGG FOR HACKERS & RECRUITERS
   ========================================== */
console.log(
    `%c  ___        _  _ _ _     _             \n / _ \\ _ __ (_)(_|_) |_  | |__   ___ \n| | | | '_ \\| | | | | __| | '_ \\ / _ \\\n| |_| | | | | | | | | |_  | |_) |  __/\n \\___/|_| |_|_|_|_|_|\\__| |_.__/ \\___|\n`,
    "color: #6366f1; font-weight: bold;"
);
console.log(
    "%cHey there, curious developer or recruiter! 👋\nThanks for checking out my source code. If you like what you see and want to discuss distributed systems or backend opportunities, feel free to drop me a mail at arijitbhatta123@gmail.com!",
    "color: #3b82f6; font-size: 14px; font-weight: 500; font-family: sans-serif;"
);
