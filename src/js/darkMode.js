export function initDarkMode() {
  const html = document.documentElement;
  const buttons = document.querySelectorAll('[data-toggle-dark-mode]');
  if (!buttons.length) return;

  function applyMode(dark) {
    html.dataset.mode = dark ? 'dark' : 'light';
    buttons.forEach((btn) => {
      btn.dataset.mode = dark ? 'light' : 'dark';
      btn.querySelectorAll('[data-color="light"]').forEach((el) => {
        el.classList.toggle('d-none', dark);
      });
      btn.querySelectorAll('[data-color="dark"]').forEach((el) => {
        el.classList.toggle('d-none', !dark);
      });
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyMode(html.dataset.mode !== 'dark');
    });
  });
}
