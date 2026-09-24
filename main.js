document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
    const navLinks = document.querySelectorAll('.nav-menu li a');

 
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
 
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
    });

 
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
 
            navLinks.forEach(nav => nav.classList.remove('active-link'));
            
 
            this.classList.add('active-link');

 
            if(navMenu.classList.contains('active')){
                navMenu.classList.remove('active');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            }
        });
    });
});