const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menu) menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.textContent = isOpen ? 'Закрыть' : 'Меню';
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
  if (!isIntersecting) return;
  const end = Number(target.dataset.count); let current = 0;
  const timer = setInterval(() => { current += Math.max(1, Math.ceil(end / 38)); target.textContent = current >= end ? end : current; if (current >= end) clearInterval(timer); }, 28);
  counterObserver.unobserve(target);
}), { threshold: 0.7 });
counters.forEach((counter) => counterObserver.observe(counter));

document.querySelector('.signal-time') && setInterval(() => {
  document.querySelector('.signal-time').textContent = new Date().toLocaleTimeString('ru-RU', { hour12: false });
}, 1000);
