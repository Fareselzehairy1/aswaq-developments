// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 4px 30px rgba(126, 87, 194, 0.15)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Modal functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(title, desc) {
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modal.style.opacity = '1';
    }, 300);
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// Form submission handler
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('شكراً لتواصلك مع أسواق! سيقوم فريقنا بالتواصل معك خلال 24 ساعة.');
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .project-card, .lifestyle-card, .stat-box-large').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Touch drag for 3D cube on mobile
(function() {
    const cube = document.getElementById('rotatingCube');
    const miniCube = document.getElementById('interactiveCube');
    
    function enableTouchDrag(element) {
        if (!element || window.innerWidth > 768) return; // Only on mobile
        
        let isDragging = false;
        let startX = 0;
        let currentRotation = 0;
        
        element.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            element.style.animationPlayState = 'paused';
        }, { passive: true });
        
        element.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const deltaX = e.touches[0].clientX - startX;
            currentRotation += deltaX * 0.5;
            element.style.transform = `rotateY(${currentRotation}deg) rotateX(15deg)`;
            startX = e.touches[0].clientX;
        }, { passive: false });
        
        element.addEventListener('touchend', () => {
            isDragging = false;
            element.style.animationPlayState = 'running';
        });
    }
    
    enableTouchDrag(cube);
    enableTouchDrag(miniCube);
})();
