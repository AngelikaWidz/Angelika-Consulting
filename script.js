const phrases = [
  "People visit your website but don't get in touch.",
  "You're getting attention but no action.",
  "People compare you instead of choosing you."
];

let phrase = 0;
let char = 0;
let deleting = false;

const target = document.getElementById("typing");

function tick() {
  const current = phrases[phrase];

  if (!deleting) {
    target.textContent = current.slice(0, ++char);

    if (char === current.length) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
  } else {
    target.textContent = current.slice(0, --char);

    if (char === 0) {
      deleting = false;
      phrase = (phrase + 1) % phrases.length;
    }
  }

  setTimeout(tick, deleting ? 30 : 60);
}

tick();

// ─── FAQ ACCORDION ───────────────────────────────────────────
document.querySelectorAll('.faq__question').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    var answer = this.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq__question').forEach(function(other) {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.classList.remove('is-open');
    });

    // Open this one if it was closed
    if (!expanded) {
      this.setAttribute('aria-expanded', 'true');
      answer.classList.add('is-open');
    }
  });
});
