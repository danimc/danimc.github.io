// Content is visible by default. WAAPI adds motion only after the element enters
// the viewport, so an unavailable script or observer never hides the page.
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const active = new Set();
const seen = new WeakSet();
const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';

function enter(element, delay = 0, distance = 18) {
  if (preference.matches || typeof element.animate !== 'function') return;
  const animation = element.animate([
    { opacity: 0.45, transform: `translateY(${distance}px)` },
    { opacity: 1, transform: 'translateY(0)' },
  ], { duration: 480, delay, easing, fill: 'backwards' });
  active.add(animation);
  const remove = () => active.delete(animation);
  animation.finished.then(remove, remove);
}

const selector = '.work-feature, .work-secondary, .intro > div, .section-heading, .job, .practice-list li, .education ul, .faq > div, .contact-section h2';
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!seen.has(entry.target)) {
        seen.add(entry.target);
        enter(entry.target);
      }
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll(selector).forEach(element => observer.observe(element));
}

// The CSS filter still works without this enhancement.
document.querySelector('#skills')?.addEventListener('change', () => {
  const section = document.querySelector('#skills');
  const selected = section?.querySelector('input:checked')?.value;
  let index = 0;
  section?.querySelectorAll('[data-tags]').forEach(row => {
    row.getAnimations().forEach(animation => animation.cancel());
    if (selected === 'all' || row.dataset.tags?.split(' ').includes(selected)) {
      enter(row, Math.min(index++ * 35, 140), 8);
    }
  });
});

for (const details of document.querySelectorAll('.faq details, .work-details, .entry-details')) {
  details.addEventListener('toggle', () => {
    const paragraph = details.querySelector('.detail-content, p');
    if (details.open && paragraph) enter(paragraph, 0, 6);
  });
}

function finishMotion() {
  for (const animation of active) animation.cancel();
  active.clear();
}
preference.addEventListener('change', () => {
  if (preference.matches) finishMotion();
});
window.addEventListener('beforeprint', finishMotion);
