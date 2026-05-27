/* ========================================
   FORNERIA GUERRERA — JavaScript
   Premium interactions & animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for grid items
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        let delay = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) delay = i * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== PARALLAX HERO =====
  const heroBgImg = document.querySelector('.hero-bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const activateNavLink = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', activateNavLink, { passive: true });

  // ===== CARD TILT EFFECT (subtle) =====
  document.querySelectorAll('.produto-card, .diferencial-card, .testimonial').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== CONTACT FORM =====
  // Handled by global function below

  // ===== GOLD LINE ACCENT (animated separator on scroll) =====
  const goldDividers = document.querySelectorAll('.gold-divider');
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'width 0.8s ease';
        entry.target.style.width = '60px';
        dividerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  goldDividers.forEach(div => {
    div.style.width = '0';
    dividerObserver.observe(div);
  });

  // ===== COUNTER ANIMATION =====
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.transition = 'opacity 0.6s ease';
          el.style.opacity = '1';
        }, 200);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

});

// ===== FORM SUBMIT HANDLER =====
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value;
  const whatsapp = form.whatsapp.value;
  const pedido = form.pedido.value;
  const mensagem = form.mensagem.value;

  // Build WhatsApp message
  const produtoNome = {
    'lasanha': 'Lasanha alla Bolognese',
    'rondeli': 'Rondeli de Queijo',
    'caneloni': 'Caneloni Ricota & Espinafre',
    'nhoque': 'Nhoque Artesanal',
    'parmegiana': 'Parmegiana Premium',
    'ravioli': 'Ravioli Artesanal',
    'kit': 'Kit Completo'
  };

  const produto = produtoNome[pedido] || pedido;
  const text = `Olá, Forneria Guerrera! Meu nome é ${nome}.\n\nInteresse: ${produto}\n\n${mensagem || 'Gostaria de mais informações sobre os produtos.'}`;
  const whatsappUrl = `https://wa.me/5500000000000?text=${encodeURIComponent(text)}`;
  
  // Show success feedback
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '✓ Redirecionando para WhatsApp...';
  btn.style.background = '#2d6a4f';
  btn.style.color = '#fff';
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    form.reset();
  }, 800);
}
