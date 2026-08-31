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
document.querySelectorAll("[data-image-tabs]").forEach((component) => {
  const tabs = Array.from(component.querySelectorAll('[role="tab"]'));
  const panels = Array.from(
    component.querySelectorAll('[role="tabpanel"]')
  );

  function selectTab(selectedIndex, moveFocus = false) {
    tabs.forEach((tab, index) => {
      const isActive = index === selectedIndex;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      panels[index].classList.toggle("is-active", isActive);
      panels[index].setAttribute("aria-hidden", String(!isActive));
    });

    if (moveFocus) {
      tabs[selectedIndex].focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectTab(index);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (index + 1) % tabs.length;
          break;

        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      selectTab(nextIndex, true);
    });
  });
});