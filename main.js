const parallaxSections = document.querySelectorAll('.parallax');

const updateParallax = () => {
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const position = 50 + (rect.top / window.innerHeight) * 10;
        section.style.backgroundPosition = `center ${position}%`;
    });
};

window.addEventListener('scroll', updateParallax, { passive: true });
window.addEventListener('resize', updateParallax);
updateParallax();

function activateLightbox(){
  const lightbox = document.createElement('div');
  lightbox.id = 'global-lightbox';
  lightbox.className = 'lightbox hidden';
  lightbox.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" type="button" aria-label="Close image viewer">×</button>
      <img class="lightbox-image" alt="Expanded product image">
    </div>
  `;

  document.body.appendChild(lightbox);

  const imageEl = lightbox.querySelector('.lightbox-image');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const backdrop = lightbox.querySelector('.lightbox-backdrop');

  function hide(){
    lightbox.classList.add('hidden');
    lightbox.classList.remove('open');
    imageEl.src = '';
  }

  function show(src, alt){
    imageEl.src = src;
    imageEl.alt = alt || 'Expanded image';
    lightbox.classList.remove('hidden');
    requestAnimationFrame(() => lightbox.classList.add('open'));
  }

  backdrop.addEventListener('click', hide);
  closeBtn.addEventListener('click', hide);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) hide();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      hide();
    }
  });

  return { show };
}

const globalLightbox = activateLightbox();

function bindLightboxTriggers(container = document){
  container.querySelectorAll('.lightbox-trigger').forEach(img => {
    if (img.dataset.lightboxBound) return;
    img.dataset.lightboxBound = 'true';
    img.addEventListener('click', () => {
      globalLightbox.show(img.src, img.alt);
    });
    img.addEventListener('mouseenter', () => img.classList.add('hover-zoom'));
    img.addEventListener('mouseleave', () => img.classList.remove('hover-zoom'));
  });
}

function renderMakerMosaic(){
  const mosaic = document.getElementById('maker-mosaic');
  if (!mosaic) return;
  // Allow editors to override images via `data-images="a.jpg,b.jpg,c.jpg"` on the container.
  const data = mosaic.dataset.images;
  let images = [];
  if (data) {
    images = data.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    // Default selection from assets/images — change here if you'd like different defaults.
    images = [
      'assets/images/DSC08484.jpg',
      'assets/images/DSC08143.jpg',
      'assets/images/DSC08455.jpg'
    ];
  }

  const featured = images.slice(0, 3).map((src, index) => ({ src, alt: src.split('/').pop(), position: index }));

  mosaic.innerHTML = featured.map((item, index) => `
    <div class="mosaic-item mosaic-item-${index + 1}">
      <img src="${item.src}" alt="${item.alt}" class="lightbox-trigger" loading="lazy">
    </div>
  `).join('');

  bindLightboxTriggers(mosaic);
}

function initPageEnhancements(){
  renderMakerMosaic();
  bindLightboxTriggers();
}

document.addEventListener('DOMContentLoaded', () => {
  updateParallax();
  initPageEnhancements();
});
