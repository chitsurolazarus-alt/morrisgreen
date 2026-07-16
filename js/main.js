/**
 * ========================================
 * MORRIS GREEN LANDSCAPING - MAIN JS
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // ===== NAVBAR HIDE ON SCROLL =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    let isHidden = false;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            if (!isHidden) {
                navbar.classList.add('hide');
                isHidden = true;
            }
        } else if (currentScrollY < lastScrollY) {
            if (isHidden) {
                navbar.classList.remove('hide');
                isHidden = false;
            }
        }
        
        // Shadow effect
        if (currentScrollY > 60) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.25)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Show navbar when hovering near top
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 50 && isHidden) {
            navbar.classList.remove('hide');
            isHidden = false;
        }
    });

    // ===== MOBILE MENU =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('open');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Thank you! We\'ll get back to you within 24 hours.');
            this.reset();
        });
    }

    // ===== GALLERY LIGHTBOX =====
    document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.92); display: flex; align-items: center;
                    justify-content: center; z-index: 9999; cursor: pointer; padding: 20px;
                `;
                const clone = img.cloneNode();
                clone.style.cssText = `
                    max-width: 90%; max-height: 90%; border-radius: 8px; object-fit: contain;
                `;
                lightbox.appendChild(clone);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                lightbox.addEventListener('click', function() {
                    this.remove();
                    document.body.style.overflow = '';
                });
            }
        });
    });

    // ===== FOOTER YEAR =====
    const yearSpan = document.querySelector('.footer p span');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log('🌿 Morris Green Landscaping loaded!');
});
