export function initDarkMode() {
  const html = document.documentElement;
  const buttons = document.querySelectorAll('[data-toggle-dark-mode]');
  if (!buttons.length) return;

  function applyMode(dark) {
    html.dataset.mode = dark ? 'dark' : 'light';
    document.querySelectorAll('[data-color="light"]').forEach((el) => {
      el.classList.toggle('d-none', dark);
    });
    document.querySelectorAll('[data-color="dark"]').forEach((el) => {
      el.classList.toggle('d-none', !dark);
    });
    buttons.forEach((btn) => {
      btn.dataset.mode = dark ? 'light' : 'dark';
    });
  }

  const existingMode = html.dataset.mode;
  const prefersDark =
    window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
  applyMode(existingMode ? existingMode === 'dark' : prefersDark);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyMode(html.dataset.mode !== 'dark');
    });
  });
}
