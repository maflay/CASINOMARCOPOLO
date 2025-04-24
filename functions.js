const navToggle = document.getElementById('navToggle');
  const navItems = document.getElementById('navItems');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navItems.classList.toggle('open');
  });


window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".Navbar");
    if (window.scrollY > 0) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

