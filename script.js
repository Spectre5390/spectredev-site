// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ========== PARALLAX HERO ==========
const heroVideo = document.querySelector('.hero video');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroVideo) {
    heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
  }
});

// ========== FADE-IN ON SCROLL ==========
const fadeEls = document.querySelectorAll('.fade-in, .game-card, .about-content, .contact');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ========== SIMPLE LIGHTBOX ==========
const cards = document.querySelectorAll('.game-card');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

lightbox.innerHTML = `<span class="close">&times;</span><img src="" alt="Game Preview">`;

const lbImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');

cards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const img = card.querySelector('img');
    lbImg.src = img.src;
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// ========== STATIC HTML INCLUDES ==========
async function loadHTML(id, file) {
  try {
    const res = await fetch(file);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
  } catch (err) {
    console.error("Error loading include:", file, err);
  }
}

// Load header and footer dynamically
window.addEventListener('DOMContentLoaded', () => {
  loadHTML('header-include', '/includes/header.html');
  loadHTML('footer-include', '/includes/footer.html');
});
