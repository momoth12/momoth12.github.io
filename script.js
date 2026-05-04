// ===========================
// HERO TYPEWRITER
// ===========================
(function () {
  const greeting = document.getElementById('tw-greeting');
  const cursor   = document.getElementById('tw-cursor');
  const name     = document.getElementById('tw-name');
  const tagline  = document.getElementById('tw-tagline');
  const sub      = document.getElementById('tw-sub');
  const cta      = document.getElementById('tw-cta');

  // Typewriter: types `text` into `el`, calls `done` when finished
  function typeInto(el, text, speed, done) {
    let i = 0;
    el.textContent = '';
    function step() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(step, speed);
      } else {
        if (done) done();
      }
    }
    step();
  }

  // Reveal an element with a fade-up
  function reveal(el, delay, done) {
    setTimeout(() => {
      el.classList.remove('tw-hidden');
      el.classList.add('tw-reveal');
      if (done) setTimeout(done, 400);
    }, delay);
  }

  // Blink cursor while idle, hide it when typing next block
  function blinkPause(duration, done) {
    cursor.classList.add('tw-blink');
    setTimeout(() => {
      cursor.classList.remove('tw-blink');
      if (done) done();
    }, duration);
  }

  // Sequence
  blinkPause(300, () => {
    typeInto(greeting, "Hi, I'm", 60, () => {
      blinkPause(500, () => {
        // Move cursor next to name heading
        cursor.style.display = 'none';
        reveal(name, 0, () => {
          reveal(tagline, 0, () => {
            // Type the tagline text
            typeInto(tagline, 'AI Engineer & Research Scientist', 45, () => {
              reveal(sub, 200, () => {
                reveal(cta, 300, null);
              });
            });
          });
        });
      });
    });
  });
})();

// ===========================
// NAVBAR — scroll shadow
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===========================
// SCROLL ANIMATIONS (IntersectionObserver)
// ===========================
const aosElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in the same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-aos]')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

aosElements.forEach(el => observer.observe(el));

// ===========================
// ACTIVE NAV LINK highlight
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
