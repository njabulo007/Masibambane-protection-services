/* ============================================
   MASIBAMBANE PROTECTION SERVICES - SCRIPTS
   ============================================ */

// ============ MOBILE MENU TOGGLE ============
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
});

// ============ BACK TO TOP BUTTON ============
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Scroll to top when clicked
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ============ STICKY NAVBAR SCROLL EFFECT ============
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// ============ HERO SLIDESHOW ============
document.addEventListener('DOMContentLoaded', function() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    if (heroSlides.length > 0) {
        let currentSlide = 0;

        function showSlide(n) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroSlides[n].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        }

        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
});

// ============ CONTACT FORM HANDLING ============
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.6';

            // Send email via mailto (for demo)
            // In production, use a backend service
            const email = data.email || 'info@masibambane.co.za';
            const subject = `New Contact Form Submission - ${data.service || 'General Inquiry'}`;
            const message = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service || 'Not specified'}
Message: ${data.message}
            `;

            // Simulate success after 1 second
            setTimeout(() => {
                // Create mailto link
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';

                // Show success message
                showNotification('Thank you! Your message has been prepared for sending.', 'success');
            }, 1000);
        });
    }
});

// ============ FORM VALIDATION ============
function validateForm(data) {
    // Check required fields
    if (!data.name || !data.name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }

    if (!data.email || !validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    if (!data.phone || !validatePhone(data.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }

    if (!data.message || !data.message.trim()) {
        showNotification('Please enter your message', 'error');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; color: white; font-weight: 500;">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px',
        wordWrap: 'break-word'
    };

    const bgColor = type === 'success' ? '#28a745' : 
                    type === 'error' ? '#dc3545' : 
                    '#17a2b8';

    notification.style.backgroundColor = bgColor;

    Object.assign(notification.style, styles);

    // Add animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a # or used for navigation
            if (href === '#' || href === '#!') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============ LAZY LOADING IMAGES ============
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ============ ANIMATE ON SCROLL ============
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Add initial styles and observe elements
        const elementsToAnimate = document.querySelectorAll('.service-card, .job-listing, .cert-badge');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const menuToggle = document.getElementById('menuToggle');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    }
});

// ============ PERFORMANCE: DEFER NON-CRITICAL CODE ============
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Load any additional features when browser is idle
        console.log('Masibambane Protection Services fully loaded');
    });
}
