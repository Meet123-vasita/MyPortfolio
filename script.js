document.addEventListener('DOMContentLoaded', function() {
    const designations = ["Web Developer", "Front-end Developer", "Python Developer", "Java Developer"];
    let index = 0;

    function typeDesignation(text, i, callback) {
        const speed = 100;
        if (i < text.length) {
            document.getElementById('designation').textContent += text.charAt(i);
            setTimeout(function() {
                typeDesignation(text, i + 1, callback);
            }, speed);
        } else {
            setTimeout(callback, 1000);
        }
    }

    function eraseDesignation(i, callback) {
        const speed = 50;
        if (i >= 0) {
            const currentText = document.getElementById('designation').textContent;
            document.getElementById('designation').textContent = currentText.substring(0, i);
            setTimeout(function() {
                eraseDesignation(i - 1, callback);
            }, speed);
        } else {
            callback();
        }
    }

    function changeDesignation() {
        eraseDesignation(document.getElementById('designation').textContent.length, function() {
            index = (index + 1) % designations.length;
            typeDesignation(designations[index], 0, function() {
                setTimeout(changeDesignation, 1000);
            });
        });
    }

    changeDesignation();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    gsap.from('.hero-content h1', { opacity: 0, y: -50, duration: 1, delay: 0.2 });
    gsap.from('.hero-content button', { opacity: 0, y: -20, duration: 1, delay: 0.6 });
    gsap.from('.hero-image', { opacity: 0, x: 100, duration: 1, delay: 0.8 });
    gsap.from('.social-links a', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 1
    });

    document.querySelector('.hero').addEventListener('pointermove', function(e) {
        const depth = 5;
        const moveX = (e.pageX - window.innerWidth / 2) / depth;
        const moveY = (e.pageY - window.innerHeight / 2) / depth;
        gsap.to('.hero-image', { x: moveX, y: moveY, duration: 0.5 });
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, { scale: 1.1, duration: 0.3 });
        });
        link.addEventListener('mouseleave', function() {
            if (!link.classList.contains('active')) {
                gsap.to(this, { scale: 1, duration: 0.3 });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Responsive menu
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Close the menu when a link is clicked
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickInsideMenuToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideMenuToggle) {
            menu.classList.remove('active');
        }
    });
});