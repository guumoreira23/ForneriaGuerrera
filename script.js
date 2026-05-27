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
    entries.forEach((entry) => {
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

  // ===== SMOOTH ANCHOR SCROLL (handles ?produto= query param) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      // Extract hash and query param separately (e.g. #contato?produto=lasanha)
      const hashPart = href.split('?')[0];
      const queryPart = href.includes('?') ? href.split('?')[1] : null;

      const target = document.querySelector(hashPart);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // If there's a produto param, pre-select it in the form
        if (queryPart) {
          const params = new URLSearchParams(queryPart);
          const produto = params.get('produto');
          if (produto) {
            setTimeout(() => {
              const select = document.getElementById('form-pedido');
              if (select) {
                select.value = produto;
                // Trigger a subtle highlight to draw attention
                select.style.borderColor = 'var(--gold)';
                select.style.transition = 'border-color 0.3s ease';
                setTimeout(() => { select.style.borderColor = ''; }, 2000);
              }
            }, 600); // slight delay to let scroll finish
          }
        }
      }
    });
  });

  // ===== URL QUERY PARAM ON PAGE LOAD =====
  const handlePageLoadParams = () => {
    let params = new URLSearchParams(window.location.search);
    let produto = params.get('produto');

    if (!produto && window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      params = new URLSearchParams(hashQuery);
      produto = params.get('produto');
    }

    if (produto) {
      const select = document.getElementById('form-pedido');
      if (select) {
        select.value = produto;
        const target = document.getElementById('contato');
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
            select.style.borderColor = 'var(--gold)';
            select.style.transition = 'border-color 0.3s ease';
            setTimeout(() => { select.style.borderColor = ''; }, 2000);
          }, 800);
        }
      }
    }
  };
  handlePageLoadParams();

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

  // ===== ANIMATED COUNTERS for Stats =====
  function animateCounter(el, target, suffix, duration) {
    const isNumeric = !isNaN(parseFloat(target));
    if (!isNumeric) {
      // Non-numeric (e.g. "DOP") — just fade in
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.6s ease';
      setTimeout(() => { el.style.opacity = '1'; }, 100);
      return;
    }

    const startVal = 0;
    const endVal = parseFloat(target);
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (endVal - startVal) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statData = [
    { selector: '.stat-num', values: [
      { text: '100%', raw: 100, suffix: '%' },
      { text: '+5h', raw: 5, suffix: 'h', prefix: '+' },
      { text: 'DOP', raw: null, suffix: '' },
    ]}
  ];

  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const originalText = el.textContent.trim();
        
        // Parse the value
        if (originalText === 'DOP') {
          el.style.opacity = '0';
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease';
            el.style.opacity = '1';
          }, 200);
        } else if (originalText.startsWith('+') && originalText.includes('h')) {
          const val = parseFloat(originalText.replace('+', '').replace('h', ''));
          el.textContent = '0h';
          el.style.opacity = '1';
          let count = 0;
          const step = Math.ceil(val / 30);
          const interval = setInterval(() => {
            count = Math.min(count + step, val);
            el.textContent = (count < val ? '' : '+') + count + 'h';
            if (count >= val) { el.textContent = '+' + val + 'h'; clearInterval(interval); }
          }, 40);
        } else if (originalText.endsWith('%')) {
          const val = parseFloat(originalText);
          el.textContent = '0%';
          el.style.opacity = '1';
          let count = 0;
          const interval = setInterval(() => {
            count = Math.min(count + 4, val);
            el.textContent = count + '%';
            if (count >= val) { clearInterval(interval); }
          }, 20);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  // ===== DYNAMIC COPYRIGHT YEAR =====
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

// ===== FORM SUBMIT HANDLER =====
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value;
  const whatsapp = form.whatsapp.value;
  const pedido = form.pedido.value;
  const quantidade = form.quantidade ? form.quantidade.value : '1';
  const mensagem = form.mensagem.value;

  const produtoNome = {
    'lasanha': 'Lasanha alla Bolognese',
    'rondeli': 'Rondeli de Queijo',
    'caneloni': 'Caneloni Ricota & Espinafre',
    'nhoque': 'Nhoque Artesanal',
    'parmegiana': 'Parmegiana Premium',
    'ravioli': 'Ravioli Artesanal',
    'kit': 'Kit Completo'
  };

  const produto = produtoNome[pedido] || pedido || 'Não especificado';
  const qtdText = quantidade ? `\nQuantidade: ${quantidade}` : '';
  const text = `Olá, Forneria Guerrera! Meu nome é ${nome}.\n\nProduto de interesse: ${produto}${qtdText}\n\n${mensagem || 'Gostaria de mais informações sobre os produtos e como realizar meu pedido.'}`;

  // IMPORTANTE: Substitua o número abaixo pelo número real do WhatsApp da Forneria Guerrera
  // Formato: código do país + DDD + número (sem espaços, parênteses ou hífens)
  // Exemplo para São Paulo: 5511999998888
  const WHATSAPP_NUMBER = '5500000000000'; // ← SUBSTITUIR PELO NÚMERO REAL

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  
  // Show success feedback
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '✓ Redirecionando para WhatsApp...';
  btn.style.background = '#2d6a4f';
  btn.style.color = '#fff';
  btn.disabled = true;
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    btn.disabled = false;
    form.reset();
  }, 800);
}
