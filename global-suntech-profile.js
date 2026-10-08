
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    function setMenuOpen(open) {
      navLinks.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }

    menuBtn.addEventListener('click', () => {
      setMenuOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenuOpen(false);
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navLinks.classList.contains('open')) {
        setMenuOpen(false);
      }
    });

        // Play the cover video only when motion and data settings allow it.
        const coverVideo = document.querySelector('.cover-video');
        const coverBackground = document.querySelector('.cover-bg');
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const reducedMotion = window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (coverVideo && coverBackground && !reducedMotion && !(connection && connection.saveData)) {
          coverVideo.addEventListener('playing', () => {
            coverBackground.classList.add('video-ready');
          }, { once: true });
          coverVideo.addEventListener('error', () => {
            console.error('Unable to load the cover background video.', coverVideo.error);
          });

          const coverVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                coverVideo.play().catch((error) => {
                  console.warn('Cover video playback failed; keeping the static background.', error);
                });
              } else {
                coverVideo.pause();
              }
            });
          }, { threshold: 0.1 });

          coverVideoObserver.observe(coverBackground);
        }

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => setMenuOpen(false));
        });

    // Smooth scroll + active nav
    const sections = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActive() {
      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.id;
      });
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }
    window.addEventListener('scroll', updateActive);
    updateActive();

    // Fade-in on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  
