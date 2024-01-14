document.addEventListener("DOMContentLoaded", function () {
    // Fetch and insert the common navigation bar
    fetch("/html/navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-container").innerHTML = html;
            // Highlight the active tab
            highlightActiveTab();
        });

    // Fetch and insert the common footer
    fetch("/html/footer.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;
        });
});

function highlightActiveTab() {
    // Get the current page's filename
    const currentPage = window.location.pathname.split('/').pop();

    // Find the corresponding nav link and add the 'active' class
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}
