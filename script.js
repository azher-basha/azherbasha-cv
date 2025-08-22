// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Navbar Active Link and Scroll Progress
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scrollProgress');

function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';

    sections.forEach((section, index) => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinksAll.forEach(link => link.classList.remove('active'));
            const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Skill Progress Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            
            // Trigger skill animation when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkills, 500);
            }
        }
    });
}, observerOptions);

// Observe all sections for animations
sections.forEach(section => {
    observer.observe(section);
});

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    observer.observe(item);
    item.style.animationDelay = `${index * 0.2}s`;
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add dynamic typing effect to hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-text .subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 100);
        }, 1000);
    }
});

// Add floating animation to skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.2}s`;
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-10px) rotate(1deg)';
    });
    
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Dynamic background animation
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    const colors = ['rgba(245, 158, 11, 0.1)', 'rgba(37, 99, 235, 0.1)', 'rgba(30, 64, 175, 0.1)'];
    
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = Math.random() * 100 + 50 + 'px';
        element.style.height = element.style.width;
        element.style.background = colors[Math.floor(Math.random() * colors.length)];
        element.style.borderRadius = '50%';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        element.style.animationDelay = Math.random() * 2 + 's';
        element.style.pointerEvents = 'none';
        
        if (hero) {
            hero.appendChild(element);
        }
    }
}

// Initialize floating elements
createFloatingElements();

// Add scroll-triggered counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace('+', ''));
        const increment = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = counter.innerText.includes('+') ? target + '+' : target;
                clearInterval(timer);
            } else {
                counter.innerText = Math.ceil(current);
            }
        }, 1);
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.getElementById('about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    counterObserver.observe(aboutSection);
}