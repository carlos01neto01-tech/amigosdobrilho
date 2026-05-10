const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const slider = document.querySelector('[data-slider]');
const slides = [...document.querySelectorAll('.slide')];
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');
const dotsWrap = document.querySelector('.slider__dots');

let current = 0;
let startX = 0;
let isDragging = false;
let autoplay;

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

function buildDots(){
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para produto ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsWrap.appendChild(dot);
  });
}

function updateSlider(){
  slides.forEach((slide, index) => slide.classList.toggle('is-active', index === current));
  [...dotsWrap.children].forEach((dot, index) => dot.classList.toggle('is-active', index === current));
}

function goTo(index){
  current = (index + slides.length) % slides.length;
  updateSlider();
  restartAutoplay();
}

function next(){ goTo(current + 1); }
function prev(){ goTo(current - 1); }

function restartAutoplay(){
  clearInterval(autoplay);
  autoplay = setInterval(next, 5200);
}

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

slider.addEventListener('pointerdown', (event) => {
  isDragging = true;
  startX = event.clientX;
  slider.setPointerCapture(event.pointerId);
});

slider.addEventListener('pointerup', (event) => {
  if(!isDragging) return;
  const diff = event.clientX - startX;
  isDragging = false;
  if(Math.abs(diff) > 55){ diff < 0 ? next() : prev(); }
});

slider.addEventListener('pointercancel', () => { isDragging = false; });

buildDots();
updateSlider();
restartAutoplay();
