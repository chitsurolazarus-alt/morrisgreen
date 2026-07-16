/**
 * ========================================
 * MORRIS GREEN LANDSCAPING - MAIN JAVASCRIPT
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('open');
            }
        });

        // Close menu on link click (mobile)
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.25)';
            navbar.style.background = 'rgba(27, 94, 32, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
            navbar.style.background = 'rgba(27, 94, 32, 0.95)';
        }
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== STAT COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateStats = function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                const increment = count / 60;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= count) {
                        target.textContent = count + (count === 98 ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (count === 98 ? '%' : '');
                    }
                }, 25);
            }
        });
    };

    const statObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    statNumbers.forEach(function(stat) {
        statObserver.observe(stat);
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input && input.value) {
                alert('🎉 Thank you for subscribing! You\'ll receive landscaping tips and inspiration.');
                input.value = '';
            }
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Thank you for your message! We\'ll get back to you within 24 hours.');
            this.reset();
        });
    }

    // ===== GALLERY LIGHTBOX =====
    document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.92);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                    animation: fadeIn 0.3s ease;
                    padding: 20px;
                `;
                
                const imgClone = img.cloneNode();
                imgClone.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 8px;
                    object-fit: contain;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                `;
                
                lightbox.appendChild(imgClone);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close on click
                lightbox.addEventListener('click', function() {
                    this.remove();
                    document.body.style.overflow = '';
                });
                
                // Close with ESC key
                document.addEventListener('keydown', function escHandler(e) {
                    if (e.key === 'Escape') {
                        if (document.querySelector('div[style*="position: fixed"]')) {
                            document.querySelector('div[style*="position: fixed"]').remove();
                            document.body.style.overflow = '';
                            document.removeEventListener('keydown', escHandler);
                        }
                    }
                });
            }
        });
    });

    // ===== PARALLAX EFFECT ON HERO =====
    const hero = document.querySelector('.hero');
    const heroVideo = document.querySelector('.hero-video');

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            if (heroVideo) {
                heroVideo.style.transform = 'scale(' + (1 + scrolled * 0.0003) + ')';
            }
        }
    });

    // ===== SERVICE CARD INTERACTION =====
    document.querySelectorAll('.service-card').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 60px rgba(27, 94, 32, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll(
        '.service-card, .project-item, .testimonial-card, .gallery-item, ' +
        '.about-content, .contact-detail, .why-item, .about-image'
    );

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });

    // ===== DYNAMIC YEAR IN FOOTER =====
    const footerYear = document.querySelector('.footer-bottom p span');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = currentYear;
    }

    // ===== CONSOLE WELCOME =====
    console.log('%c🌿 Morris Green Landscaping', 'font-size: 24px; font-weight: bold; color: #1B5E20;');
    console.log('%cCrafting outdoor excellence since 2010', 'font-size: 14px; color: #66A63A;');
    console.log('%c📞 +27 62 525 5498 | 📍 47 Dalmada Rd, Dalmada AH, South Africa', 'font-size: 12px; color: #555;');
    console.log('%c✅ Website loaded successfully!', 'font-size: 12px; color: #1B5E20;');

    // ===== SMOOTH SCROLL INDICATOR =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

});