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

function getItemsPerView(galleryType) {
  // Example: if viewport < 768px, show fewer items
  if (window.innerWidth < 768) {
    return 1;  // show 1 item on phones
  } 
  // otherwise, keep the original 4 or 3
  return (galleryType === 'horizontal') ? 3 : 4;
}

function moveSlide(direction, galleryType, galleryIndex) {
  const selector = `.gallery.${galleryType}[data-gallery-index="${galleryIndex}"] .gallery-container`;
  const gallery = document.querySelector(selector);
  if (!gallery) return;

  const items = gallery.querySelectorAll('.item');
  const totalItems = items.length;

  // Dynamically get how many items should be in view
  const itemsPerView = getItemsPerView(galleryType);

  // Retrieve current index or default to 0
  let index = (galleryType === 'horizontal')
    ? horizontalIndexes[galleryIndex] || 0
    : verticalIndexes[galleryIndex] || 0;

  // Increment or decrement
  index += direction;

  // Calculate maximum slides
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;
  if (index < 0) index = maxIndex;
  if (index > maxIndex) index = 0;

  // Gap & item width
  const gap = (galleryType === 'horizontal') ? 30 : 20;
  const itemWidth = items[0].offsetWidth;
  const pageWidth = itemsPerView * (itemWidth + gap) - gap;

  // Move the container
  gallery.style.transform = `translateX(-${index * pageWidth}px)`;

  // Save updated index
  if (galleryType === 'horizontal') {
    horizontalIndexes[galleryIndex] = index;
  } else {
    verticalIndexes[galleryIndex] = index;
  }
}

// Optional: re-calculate on window resize so the slider adjusts if orientation changes
window.addEventListener('resize', () => {
  // e.g., if you have 8 vertical galleries
  for (let i = 0; i < 8; i++) {
    moveSlide(0, 'vertical', i); 
  }
});
