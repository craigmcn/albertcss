export const initPopover = () => {
  const popovers = Array.from(document.querySelectorAll('.popover'));

  const getPanel = (popover) => popover.querySelector('.popover__panel');
  const getTrigger = (popover) => popover.querySelector('.popover__trigger');

  const isOpen = (popover) =>
    getTrigger(popover)?.getAttribute('aria-expanded') === 'true';

  const close = (popover) => {
    getTrigger(popover)?.setAttribute('aria-expanded', 'false');
    const panel = getPanel(popover);
    if (panel) panel.hidden = true;
  };

  const open = (popover) => {
    // Close any other open popovers first
    popovers.forEach((other) => {
      if (other !== popover) close(other);
    });
    getTrigger(popover)?.setAttribute('aria-expanded', 'true');
    const panel = getPanel(popover);
    if (panel) panel.hidden = false;
  };

  popovers.forEach((popover) => {
    const trigger = getTrigger(popover);
    const panel = getPanel(popover);
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      isOpen(popover) ? close(popover) : open(popover);
    });

    // Escape closes from anywhere within the popover wrapper (trigger or panel)
    popover.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen(popover)) {
        close(popover);
        trigger.focus();
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    popovers.forEach((popover) => {
      if (!popover.contains(e.target)) close(popover);
    });
  });
};
