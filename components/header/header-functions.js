navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // <--- Esta línea es crucial
        const targetPage = this.getAttribute('data-target');
        loadContent(targetPage);
    });
});