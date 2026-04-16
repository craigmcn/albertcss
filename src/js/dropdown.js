export const initDropdown = () => {
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  if (!dropdowns.length) return;

  const getMenu = (dropdown) => dropdown.querySelector('.dropdown__menu');
  const getTrigger = (dropdown) => dropdown.querySelector('.dropdown__trigger');
  const getItems = (dropdown) =>
    Array.from(
      dropdown.querySelectorAll(
        '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])',
      ),
    );

  const isOpen = (dropdown) =>
    getTrigger(dropdown)?.getAttribute('aria-expanded') === 'true';

  const close = (dropdown) => {
    getTrigger(dropdown)?.setAttribute('aria-expanded', 'false');
    const menu = getMenu(dropdown);
    if (menu) menu.hidden = true;
  };

  const open = (dropdown) => {
    // Close any other open dropdowns first
    dropdowns.forEach((d) => {
      if (d !== dropdown) close(d);
    });
    getTrigger(dropdown)?.setAttribute('aria-expanded', 'true');
    const menu = getMenu(dropdown);
    if (menu) menu.hidden = false;
    // Move focus to the first menu item
    getItems(dropdown)[0]?.focus();
  };

  // Create the controller before attaching listeners so all of them — both
  // per-element and the global outside-click — can be removed with one abort.
  const controller = new AbortController();
  const { signal } = controller;

  dropdowns.forEach((dropdown) => {
    const trigger = getTrigger(dropdown);
    const menu = getMenu(dropdown);
    if (!trigger || !menu) return;

    trigger.addEventListener(
      'click',
      () => {
        isOpen(dropdown) ? close(dropdown) : open(dropdown);
      },
      { signal },
    );

    menu.addEventListener(
      'keydown',
      (e) => {
        const items = getItems(dropdown);
        const index = items.indexOf(document.activeElement);

        if (e.key === 'Escape') {
          close(dropdown);
          trigger.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[(index + 1) % items.length]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          items[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          items[items.length - 1]?.focus();
        } else if (e.key === 'Tab') {
          close(dropdown);
        }
      },
      { signal },
    );
  });

  // Close on outside click — all listeners share the same AbortController so
  // callers that re-initialize can abort the prior one for full cleanup.
  document.addEventListener(
    'click',
    (e) => {
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) close(dropdown);
      });
    },
    { signal },
  );

  return controller;
};
