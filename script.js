// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- Navbar Scroll Effect ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// --- Hero Entrance Animation ---
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // Initial state cleanup for hero (since CSS has opacity 0)
    gsap.set('.navbar, .hero-content p, .hero-content h1, .hero-subtitle, .btn-group .btn', { opacity: 0, y: 30 });

    tl.to('.navbar', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out'
    })
    .to('.hero-content p', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-content h1', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.6')
    .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.btn-group .btn', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2
    }, '-=0.6');
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal-up');

revealElements.forEach((el) => {
    // If it's not the hero (hero handled separately), animate it
    if (!el.closest('.hero')) {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    }
});

// --- Image Hover Parallax Effect ---
document.querySelectorAll('.img-container').forEach(container => {
    const img = container.querySelector('img');
    
    container.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        gsap.to(img, {
            x: (x - 0.5) * 20,
            y: (y - 0.5) * 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    container.addEventListener('mouseleave', () => {
        gsap.to(img, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// --- Magnetic Button Effect ---
const magneticBtns = document.querySelectorAll('.btn, .nav-btn, .contact-icon');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = btn.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    
    if (isOpen) {
        gsap.fromTo(mobileMenu, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
        gsap.from('.mobile-nav-link', {
            opacity: 0,
            x: -20,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// --- Project Data & Modal Logic ---
const projectsData = {
    project1: {
        title: "EdTech Platform",
        category: "Visual Identity & UI Design",
        date: "2023",
        img: "https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        fullDesc: "A complete rebrand for an emerging Nigerian EdTech platform focusing on accessibility and modern learning.",
        goal: "To modernize the brand perception to attract international investors while keeping it accessible to local students.",
        colors: ["#6C5CE7", "#00CEC9", "#FFEAA7"],
        type: "Branding",
        tools: "Figma, Illustrator, Adobe XD"
    },
    project2: {
        title: "Tech Summit 2023",
        category: "Event Design",
        date: "2023",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        fullDesc: "Designed the visual identity and materials for one of the largest technology summits in West Africa.",
        goal: "Create a futuristic yet professional look that reflected the innovation of the participating tech companies.",
        colors: ["#2D3436", "#0984E3", "#D63031"],
        type: "Print, Digital",
        tools: "Photoshop, Illustrator, InDesign"
    },
    project3: {
        title: "Ope Arts Line",
        category: "Packaging",
        date: "2022",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        fullDesc: "Product packaging design for a local artisan soap and candle brand.",
        goal: "Shift from generic plastic packaging to eco-friendly, high-end aesthetic boxes.",
        colors: ["#E17055", "#FD79A8", "#FDCB6E"],
        type: "Packaging",
        tools: "Illustrator, Photoshop"
    },
    project4: {
        title: "Nexus Brand Motion",
        category: "Motion Design",
        date: "2023",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        fullDesc: "Short form animated explainer videos and logo animations for a fintech startup.",
        goal: "Simplify complex financial concepts into engaging 30-second video content.",
        colors: ["#6C5CE7", "#000000", "#FFFFFF"],
        type: "Video",
        tools: "After Effects, Cinema 4D"
    },
    project5: {
        title: "AfroFuture Arts",
        category: "Social Media",
        date: "2023",
        img: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        fullDesc: "A cohesive visual system for social media engagement focusing on African heritage.",
        goal: "Increase audience engagement by 40% through visually striking, culturally relevant content.",
        colors: ["#2d3436", "#dfe6e9", "#00b894"],
        type: "Social Media",
        tools: "Photoshop, Premiere Pro, After Effects"
    },
    project6: {
        title: "Lagos Fashion Week",
        category: "Editorial",
        date: "2022",
        img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        fullDesc: "Print editorial layouts and digital lookbook for a fashion showcase.",
        goal: "Showcase the fusion of traditional Nigerian fabrics with modern minimalist design.",
        colors: ["#B2BABB", "#4A4A4A", "#E0E0E0"],
        type: "Print",
        tools: "InDesign, Illustrator"
    }
};

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-content-body');

function openProject(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;

    modalBody.innerHTML = `
        <div class="modal-img-wrapper">
            <img src="${project.img}" alt="${project.title}" class="modal-img">
            <div class="modal-img-gradient"></div>
        </div>
        <div class="modal-body">
            <div class="modal-header">
                <h2 class="modal-title font-serif text-white">${project.title}</h2>
                <span class="modal-badge">${project.type}</span>
            </div>
            
            <div class="modal-meta-grid">
                <div>
                    <p class="meta-item-label">Client</p>
                    <p class="meta-item-value">Independent / 3rd Party</p>
                </div>
                <div>
                    <p class="meta-item-label">Date</p>
                    <p class="meta-item-value">${project.date}</p>
                </div>
                <div>
                    <p class="meta-item-label">Tools</p>
                    <p class="meta-item-value">${project.tools}</p>
                </div>
            </div>

            <div class="modal-description-grid">
                <div>
                    <p class="modal-text">${project.fullDesc}</p>
                    <p class="modal-text">
                        <strong style="color: white; display: block; margin-bottom: 0.5rem;">Project Goal:</strong> 
                        ${project.goal}
                    </p>
                </div>
                <div>
                    <p class="meta-item-label" style="margin-bottom: 1rem;">Palette</p>
                    <div class="palette-list">
                        ${project.colors.map(color => `
                            <div class="palette-item">
                                <div class="palette-color" style="background-color: ${color}; box-shadow: 0 0 10px ${color}44"></div>
                                <span class="palette-hex">${color}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate modal content
    gsap.from('.modal-content', {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out'
    });
}

function closeProject() {
    gsap.to('.modal-content', {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
}

// Global functions for HTML onclick
window.openModal = openProject;
window.closeModal = closeProject;

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProject();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProject();
    }
});

// --- Discord Webhook Integration ---
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1467879855881457739/aw9eKIq_Xn93EFCctcup9YDQ_45D6016GXHvMvE6vsAc8pohVur2pYRxTzEkemioIF_N'; // User needs to replace this

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('form-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;
        
        // Disable button and show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        const payload = {
            embeds: [
                {
                    title: 'New Contact Form Submission',
                    color: 13939843, // Decimal for #d4b483 (Straw color)
                    fields: [
                        { name: 'Name', value: name, inline: true },
                        { name: 'Email', value: email, inline: true },
                        { name: 'Message', value: message }
                    ],
                    footer: { text: 'Godswish Innocent Portfolio' },
                    timestamp: new Date().toISOString()
                }
            ]
        };
        
        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again or reach out directly.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}
