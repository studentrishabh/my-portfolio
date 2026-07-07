/* ==========================================================================
   RISHABH CHAURASIYA — PORTFOLIO SCRIPT
   Vanilla JS only. No dependencies beyond Bootstrap bundle + AOS.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initLoader();
    initAOS();
    initScrollProgress();
    initNavbarScroll();
    initScrollSpyActive();
    initThemeToggle();
    initTypingEffect();
    initSkillBars();
    initCounters();
    initProjectFilters();
    initRippleButtons();
    initCursorFollower();
    initBackToTop();
    initContactForm();
    initSmoothAnchors();
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  /* ---------- Loader ---------- */
  function initLoader() {
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("loaded"), 400);
    });
  }

  /* ---------- AOS scroll animations ---------- */
  function initAOS() {
    if (window.AOS) {
      AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
    }
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    window.addEventListener("scroll", () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + "%";
    });
  }

  /* ---------- Sticky navbar shrink on scroll ---------- */
  function initNavbarScroll() {
    const nav = document.getElementById("mainNav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  /* ---------- Scrollspy: highlight active nav link ---------- */
  function initScrollSpyActive() {
    const sections = document.querySelectorAll("main section[id], header#home");
    const links = document.querySelectorAll(".navbar-nav .nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            links.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  /* ---------- Dark / Light mode toggle ----------
     Note: theme choice lives only in memory for this session
     (no browser storage APIs are used). Defaults to dark on reload. */
  function initThemeToggle() {
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");
    btn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      root.setAttribute("data-theme", isLight ? "dark" : "light");
    });
  }

  /* ---------- Hero typing animation ---------- */
  function initTypingEffect() {
    const el = document.getElementById("typedRole");
    if (!el) return;
    const roles = [
      "PHP Laravel Developer",
      "RESTful API Developer",
      "Backend Engineer",
      "Laravel Sanctum Specialist"
    ];
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;

    function tick() {
      const current = roles[roleIndex];
      if (deleting) {
        charIndex--;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 400);
          return;
        }
      } else {
        charIndex++;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    setTimeout(tick, 1200);
  }

  /* ---------- Animated skill bars ---------- */
  function initSkillBars() {
    const bars = document.querySelectorAll(".skill-bar");
    bars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent") || 0;
      const track = document.createElement("div");
      track.className = "skill-track";
      const fill = document.createElement("div");
      fill.className = "skill-fill";
      track.appendChild(fill);
      bar.appendChild(track);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fill.style.width = percent + "%";
              observer.unobserve(bar);
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(bar);
    });
  }

  /* ---------- Animated counters (statistics) ---------- */
  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(counter, target);
              observer.unobserve(counter);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(counter);
    });

    function animateCounter(el, target) {
      let current = 0;
      const duration = 1400;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, stepTime);
    }
  }

  /* ---------- Project category filters ---------- */
  function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".project-item");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        items.forEach((item) => {
          const match = filter === "all" || item.getAttribute("data-cat") === filter;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- Button ripple effect ---------- */
  function initRippleButtons() {
    const buttons = document.querySelectorAll(".btn-primary-glow, .btn-outline-glow");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* ---------- Optional custom cursor (desktop only) ---------- */
  function initCursorFollower() {
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 992) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      ringX = e.clientX;
      ringY = e.clientY;
    });

    (function animateRing() {
      const currentLeft = parseFloat(ring.style.left) || ringX;
      const currentTop = parseFloat(ring.style.top) || ringY;
      ring.style.left = currentLeft + (ringX - currentLeft) * 0.15 + "px";
      ring.style.top = currentTop + (ringY - currentTop) * 0.15 + "px";
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.style.transform = "translate(-50%,-50%) scale(1.6)");
      el.addEventListener("mouseleave", () => ring.style.transform = "translate(-50%,-50%) scale(1)");
    });
  }

  /* ---------- Back to top FAB ---------- */
  function initBackToTop() {
    const fab = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      fab.classList.toggle("show", window.scrollY > 500);
    });
    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Contact form (client-side validation + demo submit) ---------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        status.textContent = "Please fill in all required fields correctly.";
        status.className = "form-status error mt-3";
        return;
      }

      // Demo-only: no backend is wired up yet.
      // Replace this block with a fetch() call to your form endpoint (e.g. Formspree, EmailJS, or a custom API route).
      status.textContent = "Thanks! Your message looks ready to send — connect a form endpoint to deliver it.";
      status.className = "form-status success mt-3";
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  /* ---------- Smooth anchor scrolling (fallback for older browsers) ---------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: "smooth" });
          // Close mobile nav if open
          const navMenu = document.getElementById("navMenu");
          if (navMenu.classList.contains("show")) {
            new bootstrap.Collapse(navMenu).hide();
          }
        }
      });
    });
  }
})();

// add sound 

document.addEventListener("DOMContentLoaded", () => {

    const clickSound = document.getElementById("clickSound");

    if (!clickSound) {
        console.log("Audio element not found");
        return;
    }

    clickSound.volume = 0.3;

    document.addEventListener("click", function (e) {

        const target = e.target.closest("a, button, .btn, .tool-chip");

        if (target) {
            clickSound.currentTime = 0;

            clickSound.play()
                .then(() => console.log("Playing"))
                .catch(err => console.log(err));
        }

    });

});


