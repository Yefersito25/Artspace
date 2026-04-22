// ============================================
// 1. Datos de la galería (simula una API)
// ============================================
const obras = [
    { id: 1, titulo: "Horizonte en llamas", categoria: "pintura", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=500", desc: "Óleo sobre lienzo, 2024" },
    { id: 2, titulo: "Naturaleza líquida", categoria: "pintura", img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=500", desc: "Acrílico y resina, 2023" },
    { id: 3, titulo: "Ser digital #7", categoria: "digital", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500", desc: "Arte generativo, 2025" },
    { id: 4, titulo: "Raíces", categoria: "escultura", img: "https://images.unsplash.com/photo-1562300870-e44f1c0a6f38?q=80&w=500", desc: "Madera reciclada, 2024" },
    { id: 5, titulo: "Caos armónico", categoria: "digital", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500", desc: "Render 3D, 2025" },
    { id: 6, titulo: "Efímero", categoria: "pintura", img: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=500", desc: "Mixta sobre tela, 2024" },
    { id: 7, titulo: "Resiliencia", categoria: "escultura", img: "https://images.unsplash.com/photo-1558980664-3a031f67ad9c?q=80&w=500", desc: "Metal reciclado, 2023" },
    { id: 8, titulo: "Fractal emocional", categoria: "digital", img: "https://images.unsplash.com/photo-1563089145-5998f5c5bf3c?q=80&w=500", desc: "Arte algorítmico, 2025" },
    { id: 9, titulo: "Maternidad tierra", categoria: "pintura", img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=500", desc: "Acrílico y hoja de oro, 2024" }
];

// ============================================
// 2. Renderizar galería
// ============================================
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(filtro = 'all') {
    const filtradas = filtro === 'all' ? obras : obras.filter(o => o.categoria === filtro);
    
    galleryGrid.innerHTML = filtradas.map(obra => `
        <div class="gallery-item" data-id="${obra.id}">
            <img src="${obra.img}" alt="${obra.titulo}" loading="lazy" onerror="this.src='https://picsum.photos/id/20/500/500'">
            <div class="gallery-overlay">
                <h3>${obra.titulo}</h3>
                <p>${obra.desc}</p>
            </div>
        </div>
    `).join('');
    
    // Re-asignar eventos a los nuevos elementos
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            const obra = obras.find(o => o.id === id);
            abrirLightbox(obra);
        });
    });
}

// ============================================
// 3. Filtros (botones)
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filtro = btn.dataset.filter;
        renderGallery(filtro);
    });
});

// ============================================
// 4. Lightbox
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.querySelector('.lightbox-close');

function abrirLightbox(obra) {
    lightboxImg.src = obra.img;
    lightboxCaption.textContent = `${obra.titulo} - ${obra.desc}`;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeLightbox.addEventListener('click', cerrarLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) cerrarLightbox();
});

// ============================================
// 5. Menú hamburguesa
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

// ============================================
// 6. Smooth scroll para anclas
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// 7. Formulario de contacto
// ============================================
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('contactNombre').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    
    if (nombre && email.includes('@')) {
        contactForm.style.display = 'none';
        contactSuccess.classList.remove('hidden');
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            contactSuccess.classList.add('hidden');
        }, 3000);
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
});

// ============================================
// 8. Inicializar galería
// ============================================
renderGallery();
