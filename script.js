// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

// Close menu on outside click (mobile)
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && navLinks.classList.contains('open')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.classList.remove('nav-open');
  }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add shadow when scrolled
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 120;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getOffsetTop() - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Helper function for offsetTop
Element.prototype.getOffsetTop = function() {
  let offsetTop = 0;
  let element = this;
  while (element) {
    offsetTop += element.offsetTop || 0;
    element = element.offsetParent;
  }
  return offsetTop;
};

// ============================================
// FORM SUBMISSION FEEDBACK
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '⏳ Mengirim...';
    submitBtn.disabled = true;
    
    // Reset button after submission (Formspree will redirect)
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 3000);
  });
}

// ============================================
// INTERSECTION OBSERVER - ANIMATION ON SCROLL
// ============================================
const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .stat');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================================
// CONSOLE WELCOME
// ============================================
console.log('%c👋 Halo! Terima kasih sudah melihat portfolio saya.', 'font-size: 16px; font-weight: bold; color: #2563eb;');
console.log('%cKhalif Nalbandian - Generalist | Admin | Teknisi', 'font-size: 14px; color: #64748b;');
console.log('%cHubungi saya: khalifnalbanb60@gmail.com', 'font-size: 12px; color: #94a3b8;');