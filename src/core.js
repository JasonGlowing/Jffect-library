/**
 * Jffect lib — ядро библиотеки веб-эффектов (MVP).
 * Все CSS-классы изолированы префиксом "jf-".
 */
const STYLE_ID = 'jf-base-styles';

const BASE_CSS = `
.jf-hover-scale{transition:transform .3s ease,box-shadow .3s ease;will-change:transform}
.jf-hover-scale:hover{transform:scale(1.06);box-shadow:0 12px 32px rgba(0,0,0,.45)}
.jf-fade{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease}
.jf-fade.jf-visible{opacity:1;transform:translateY(0)}
@media (prefers-reduced-motion:reduce){
  .jf-hover-scale,.jf-fade{transition:none}
  .jf-hover-scale:hover{transform:none}
  .jf-fade{opacity:1;transform:none}
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = BASE_CSS;
  document.head.appendChild(style);
}

function initFade(root = document) {
  const items = root.querySelectorAll('.jf-fade');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('jf-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('jf-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

export const Jffect = {
  version: '0.1.0',
  init(root = document) {
    injectStyles();
    initFade(root); // .jf-hover-scale работает на чистом CSS
    return this;
  },
};

if (typeof document !== 'undefined') {
  injectStyles();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Jffect.init());
  } else {
    Jffect.init();
  }
}

export default Jffect;
