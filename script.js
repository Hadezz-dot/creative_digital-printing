
// ============================================
// CREATIVE DIGITAL PRINTING - PREMIUM JAVASCRIPT
// ============================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔥 Creative Digital Printing - Premium Edition Loaded');
  
  // Initialize all components
  initParticles();
  initAnimations();
  initNavigation();
  initScrollEffects();
  initGallery();
  initContactForm();
  initCounters();
  initBackToTop();
  
  // Show page after loading
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 1000);
});

// ===== PARTICLES BACKGROUND =====
function initParticles() {
  const container = document.querySelector('.hero-bg-particles');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const color = getRandomColor();
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.background = color;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
  }
}

function getRandomColor() {
  const colors = [
    'rgba(139, 92, 246, 0.6)',
    'rgba(6, 182, 212, 0.6)',
    'rgba(236, 72, 153, 0.6)',
    'rgba(251, 191, 36, 0.6)',
    'rgba(16, 185, 129, 0.6)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ===== ANIMATIONS =====
function initAnimations() {
  // Add animation classes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        
        // Animate counters if exists
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          if (!counter.hasAttribute('data-animated')) {
            animateCounter(counter);
            counter.setAttribute('data-animated', 'true');
          }
        });
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  const nav = document.querySelector('.nav-premium');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
      });
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollEffects();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  updateScrollEffects();
}

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.parallaxSpeed || 0.5;
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
}

// ===== GALLERY =====
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item-premium');
  const lightbox = document.createElement('div');
  lightbox.className = 'fixed inset-0 bg-black/90 z-50 hidden items-center justify-center p-4';
  document.body.appendChild(lightbox);
  
  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'max-w-full max-h-full rounded-2xl';
  lightbox.appendChild(lightboxImg);
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'absolute top-4 right-4 text-3xl text-white hover:text-purple-400 transition';
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);
  
  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
    }
  });
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      lightboxImg.src = imgSrc;
      lightbox.classList.remove('hidden');
    });
  });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    counter.setAttribute('data-target', counter.textContent);
    counter.textContent = '0';
  });
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      counter.textContent = target + (counter.getAttribute('data-suffix') || '');
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
    }
  }, 16);
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400';
      successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Pesan berhasil dikirim! Kami akan menghubungi Anda segera.';
      
      form.appendChild(successMsg);
      
      // Reset form
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    }, 2000);
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.className = 'fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-purple-600 to-cyan-500 text-white rounded-full shadow-2xl z-40 opacity-0 transition-all duration-300 flex items-center justify-center hover:scale-110';
  backToTop.innerHTML = '<i class="fas fa-chevron-up text-xl"></i>';
  backToTop.id = 'backToTop';
  
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.remove('opacity-0');
      backToTop.classList.add('opacity-100');
    } else {
      backToTop.classList.remove('opacity-100');
      backToTop.classList.add('opacity-0');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PRELOADER =====
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1500);
    });
  }
}

// Initialize preloader
initPreloader();

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-effect');
  if (!typingElement) return;
  
  const texts = typingElement.getAttribute('data-texts').split('|');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 1000);
}

// Initialize typing effect
initTypingEffect();

// ===== CURSOR EFFECT =====
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2';
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'fixed w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 opacity-50';
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animate() {
    // Main cursor
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    
    // Follower cursor with delay
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Hide cursor on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
  }
}

// Initialize cursor effect
initCursorEffect();
