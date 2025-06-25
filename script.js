document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Efecto de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animación de las barras de habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    
    function animateSkills() {
        skillCards.forEach(card => {
            const percent = card.getAttribute('data-percent');
            if (percent) {
                const progressBar = card.querySelector('.skill-progress');
                progressBar.style.width = percent + '%';
            }
        });
    }
    
    // Observador de intersección para animar habilidades cuando son visibles
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Aquí puedes agregar el código para enviar el formulario
            console.log('Formulario enviado:', { name, email, message });
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
            this.reset();
        });
    }
});