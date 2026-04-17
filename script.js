document.addEventListener("DOMContentLoaded", function () {
    // Fetch and insert the common navigation bar
    fetch("/html/navbar.html")
        .then(response => response.text())
        .then(html => {
            const navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                navbarContainer.innerHTML = html;
                highlightActiveTab();
            }
        });

    // Fetch and insert the common footer
    fetch("/html/footer.html")
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.getElementById("footer-container");
            if (footerContainer) {
                footerContainer.innerHTML = html;
            }
        });

    // Setup Intersection Observer for scroll animations
    setupScrollAnimations();
});

function highlightActiveTab() {
    // Get the current page's filename
    let currentPage = window.location.pathname.split('/').pop();
    
    // Default to index.html if at root
    if (!currentPage || currentPage === "") {
        currentPage = "index.html";
    }

    // Find the corresponding nav link and add the 'active' class
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated if we only want it to happen once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => observer.observe(el));
}
