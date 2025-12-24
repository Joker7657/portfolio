// Partículas animadas no fundo
function createParticles() {
  const particles = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    particles.appendChild(particle);
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Menu mobile toggle
function toggleMobileMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

function closeMobileMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.remove('active');
}

// Contador animado para estatísticas
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  });
}

// Animação das barras de habilidades
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = progress + '%';
  });
}

// Intersection Observer para animações ao scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Animar contadores quando a seção "sobre" aparecer
      if (entry.target.id === 'about') {
        animateCounters();
      }
      
      // Animar barras de habilidades quando aparecer
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observar seções para animação
document.querySelectorAll('section').forEach(section => {
  // Não ocultar a seção home e about inicialmente
  if (section.id !== 'home' && section.id !== 'about') {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
  } else {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
    section.style.transition = 'all 0.8s ease';
  }
  observer.observe(section);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Efeito de parallax no scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-content');
  
  parallaxElements.forEach(element => {
    element.style.transform = `translateY(${scrolled * 0.3}px)`;
    element.style.opacity = 1 - (scrolled / 800);
  });
});

// Cursor personalizado (opcional - efeito visual)
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    const cursorElement = document.createElement('div');
    cursorElement.className = 'cursor';
    cursorElement.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease;
      display: none; /* Oculto em mobile */
    `;
    document.body.appendChild(cursorElement);
    
    // Mostrar apenas em desktop
    if (window.innerWidth > 768) {
      cursorElement.style.display = 'block';
    }
  }
  
  const cursorEl = document.querySelector('.cursor');
  if (cursorEl && window.innerWidth > 768) {
    cursorEl.style.left = e.clientX - 10 + 'px';
    cursorEl.style.top = e.clientY - 10 + 'px';
  }
});

// Efeito hover nos botões e links
document.querySelectorAll('.btn, .project-card, .skill-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.borderColor = 'var(--secondary)';
    }
  });
  
  element.addEventListener('mouseleave', () => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = 'var(--primary)';
    }
  });
});

// Inicializar ao carregar a página
window.addEventListener('load', () => {
  createParticles();
  console.log('🚀 Portfolio carregado com sucesso!');
  
  // Fazer primeira seção visível imediatamente
  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
  }
});

// Prevenir zoom em mobile (opcional)
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
