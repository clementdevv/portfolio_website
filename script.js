document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');

    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMobile.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Scroll spy for navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Animate skill cards on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const skillsObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const skillsObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                entry.target.style.animation = `fadeInUp 0.6s ${delay}ms forwards`;
                skillsObserver.unobserve(entry.target);
            }
        });
    };

    const skillsObserver = new IntersectionObserver(skillsObserverCallback, skillsObserverOptions);
    skillCards.forEach(card => {
        card.style.opacity = '0';
        skillsObserver.observe(card);
    });

    // Smooth scroll for navigation links
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
});