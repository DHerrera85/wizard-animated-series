// ---------------------------
// HERO SLIDER LOGIC (5 slides)
// ---------------------------
let heroIndex = 0;

function moveHero(direction) {
  const hero = document.querySelector('.hero-container');
  const slides = hero.querySelectorAll('.hero-slide');
  const totalSlides = slides.length;

  heroIndex += direction;
  if (heroIndex < 0) heroIndex = totalSlides - 1;
  if (heroIndex >= totalSlides) heroIndex = 0;

  // Each slide occupies 100% width
  hero.style.transform = `translateX(-${heroIndex * 100}%)`;
}

// ---------------------------
// MULTIPLE GALLERIES LOGIC
// ---------------------------
let verticalIndexes = {};
let horizontalIndexes = {};

function moveSlide(direction, galleryType, galleryIndex) {
  const selector = `.gallery.${galleryType}[data-gallery-index="${galleryIndex}"] .gallery-container`;
  const gallery = document.querySelector(selector);
  if (!gallery) return;

  const items = gallery.querySelectorAll('.item');
  const totalItems = items.length;
  // Items per view: 3 for horizontal, 4 for vertical
  const itemsPerView = (galleryType === 'horizontal') ? 3 : 4;
  let index = (galleryType === 'horizontal') ? horizontalIndexes[galleryIndex] || 0 : verticalIndexes[galleryIndex] || 0;

  index += direction;
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;
  if (index < 0) index = maxIndex;
  if (index > maxIndex) index = 0;

  // Gap: 30px for horizontal, 20px for vertical
  const gap = (galleryType === 'horizontal') ? 30 : 20;
  const itemWidth = items[0].offsetWidth;
  const pageWidth = itemsPerView * (itemWidth + gap) - gap;

  gallery.style.transform = `translateX(-${index * pageWidth}px)`;

  if (galleryType === 'horizontal') {
    horizontalIndexes[galleryIndex] = index;
  } else {
    verticalIndexes[galleryIndex] = index;
  }
}
