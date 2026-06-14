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
