/**
 * ========================================
 * MORRIS GREEN LANDSCAPING - MAIN JS
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // NAVBAR - HIDE ON SCROLL DOWN / SHOW ON SCROLL UP
    // ========================================
    const navbar = document.getElementById('navbar');
    const topBar = document.querySelector('.top-bar');
    let lastScrollY = 0;
    let isHidden = false;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            if (!isHidden) {
                navbar.classList.add('hide');
                isHidden = true;
            }
        } 
        else if (currentScrollY < lastScrollY) {
            if (isHidden) {
                navbar.classList.remove('hide');
                isHidden = false;
            }
        }
        
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

    // Show navbar at very top
    window.addEventListener('scroll', function() {
        if (window.scrollY < 50 && isHidden) {
            navbar.classList.remove('hide');
            isHidden = false;
        }
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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

    // ========================================
    // STAT COUNTER ANIMATION
    // ========================================
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

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
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

    // ========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ========================================
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

    // ========================================
    // CLICKABLE IMAGE LIGHTBOX
    // ========================================
    function createLightbox(img) {
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
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;
        
        const clone = img.cloneNode();
        clone.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            object-fit: contain;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        lightbox.appendChild(clone);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', function() {
            this.remove();
            document.body.style.overflow = '';
        });
        
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

    document.querySelectorAll('.service-images img.clickable-img').forEach(function(img) {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            createLightbox(this);
        });
    });

    document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                createLightbox(img);
            }
        });
    });

    // ========================================
    // CONTACT FORM - REDIRECT TO WHATSAPP
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const whatsappNumber = '27767048283';

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phoneNumber').value.trim();
            const service = document.getElementById('serviceType').value;
            const details = document.getElementById('projectDetails').value.trim();
            
            // Build the WhatsApp message
            let message = 'Hello Morris Green Landscaping!%0A%0A';
            message += '📋 *New Quote Request*%0A';
            message += '📝 *Name:* ' + encodeURIComponent(name) + '%0A';
            message += '📱 *Phone:* ' + encodeURIComponent(phone) + '%0A';
            message += '🛠️ *Service:* ' + encodeURIComponent(service) + '%0A%0A';
            message += '📄 *Project Details:*%0A' + encodeURIComponent(details);
            
            // Create WhatsApp URL
            const whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + message;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Show confirmation
            alert('✅ Your message has been prepared! You will be redirected to WhatsApp to send it.');
        });
    }

    // ========================================
    // NEWSLETTER FORM
    // ========================================
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

    // ========================================
    // PARALLAX EFFECT ON HERO VIDEO
    // ========================================
    const heroVideo = document.querySelector('.hero-video');
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            if (heroVideo) {
                heroVideo.style.transform = 'scale(' + (1 + scrolled * 0.0003) + ')';
            }
        }
    });

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll(
        '.service-card, .gallery-item, .why-item, .testimonial-card, .info-item'
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

    // ========================================
    // DYNAMIC YEAR IN FOOTER
    // ========================================
    const footerYear = document.querySelector('.footer-bottom p span');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ========================================
    // SCROLL INDICATOR CLICK
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ========================================
    // CONSOLE WELCOME
    // ========================================
    console.log('%c🌿 Morris Green Landscaping', 'font-size: 24px; font-weight: bold; color: #1B5E20;');
    console.log('%c🏆 South Africa\'s Trusted Landscaping Experts Since 2010', 'font-size: 14px; color: #66A63A;');
    console.log('%c📞 +27 76 704 8283 | 📍 47 Dalmada Rd, Dalmada AH', 'font-size: 12px; color: #555;');
    console.log('%c✅ Click on any before/after image to view full size!', 'font-size: 12px; color: #1B5E20;');

});
