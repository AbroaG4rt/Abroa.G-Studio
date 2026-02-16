document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initScrollAnimations();
});

function initLoader() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('main-content');
    
    // Check if user has visited in this session
    const hasVisited = sessionStorage.getItem('abroa_visited');

    if (!loader) return;

    if (hasVisited) {
        // If visited, hide loader immediately
        loader.style.display = 'none';
        if (content) {
            content.style.opacity = '1';
            content.style.display = 'block';
        }
    } else {
        // First visit
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Wait for animation (approx 3s as per CSS)
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.8s ease';
            
            if (content) {
                content.style.display = 'block';
                // Trigger reflow
                void content.offsetWidth;
                content.style.opacity = '1';
            }

            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = ''; // Restore scroll
                sessionStorage.setItem('abroa_visited', 'true');
            }, 800); // Wait for fade out
        }, 3000); // Matches CSS animation duration
    }
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
}
