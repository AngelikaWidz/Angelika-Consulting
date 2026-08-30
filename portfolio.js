const gallery = document.querySelector('[data-gallery]');

if (gallery) {
  const slides = [...gallery.querySelectorAll('[data-slide]')];
  const dots = [...gallery.querySelectorAll('[data-dot]')];
  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
      dots[slideIndex].classList.toggle('is-active', active);
      dots[slideIndex].setAttribute('aria-selected', String(active));
    });
  }

  gallery.querySelector('[data-prev]').addEventListener('click', () => showSlide(current - 1));
  gallery.querySelector('[data-next]').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(current - 1);
    if (event.key === 'ArrowRight') showSlide(current + 1);
  });
}


document.querySelectorAll('.finding-list:not(.finding-list--static) .finding').forEach((finding) => {
  const activate = () => {
    finding.parentElement.querySelectorAll('.finding').forEach((item) => item.classList.remove('is-active'));
    finding.classList.add('is-active');
  };
  finding.addEventListener('mouseenter', activate);
  finding.addEventListener('focus', activate);
  finding.addEventListener('click', activate);
});
