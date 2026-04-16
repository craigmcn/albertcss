export const initPopover = () => {
  const popovers = Array.from(document.querySelectorAll('.popover'));
  if (!popovers.length) return;

  const getPanel = (popover) => popover.querySelector('.popover__panel');
  const getTrigger = (popover) => popover.querySelector('.popover__trigger');

  const isOpen = (popover) =>
    getTrigger(popover)?.getAttribute('aria-expanded') === 'true';

  const EDGE = 8; // minimum px clearance from viewport edge

  const getPlacement = (panel) => {
    if (panel.classList.contains('popover__panel--top')) return 'top';
    if (panel.classList.contains('popover__panel--left')) return 'left';
    if (panel.classList.contains('popover__panel--right')) return 'right';
    return 'bottom';
  };

  const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

  // Called after the panel is shown so getBoundingClientRect() returns real dimensions.
  const applyFlip = (panel) => {
    const placement = getPlacement(panel);
    const rect = panel.getBoundingClientRect();
    let overflows;
    switch (placement) {
      case 'bottom': overflows = rect.bottom > window.innerHeight - EDGE; break;
      case 'top':    overflows = rect.top    < EDGE;                       break;
      case 'left':   overflows = rect.left   < EDGE;                       break;
      case 'right':  overflows = rect.right  > window.innerWidth  - EDGE;  break;
      default:       overflows = false;
    }
    if (overflows) {
      panel.dataset.popoverFlip = opposite[placement];
    }
  };

  const close = (popover) => {
    getTrigger(popover)?.setAttribute('aria-expanded', 'false');
    const panel = getPanel(popover);
    if (panel) {
      panel.hidden = true;
      delete panel.dataset.popoverFlip;
    }
  };

  const open = (popover) => {
    // Close any other open popovers first
    popovers.forEach((other) => {
      if (other !== popover) close(other);
    });
    getTrigger(popover)?.setAttribute('aria-expanded', 'true');
    const panel = getPanel(popover);
    if (panel) {
      panel.hidden = false;
      applyFlip(panel);
    }
  };

  // Create the controller before attaching listeners so all of them — both
  // per-element and the global outside-click — can be removed with one abort.
  const controller = new AbortController();
  const { signal } = controller;

  popovers.forEach((popover) => {
    const trigger = getTrigger(popover);
    const panel = getPanel(popover);
    if (!trigger || !panel) return;

    trigger.addEventListener(
      'click',
      () => {
        isOpen(popover) ? close(popover) : open(popover);
      },
      { signal },
    );

    // Escape closes from anywhere within the popover wrapper (trigger or panel)
    popover.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape' && isOpen(popover)) {
          close(popover);
          trigger.focus();
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
      popovers.forEach((popover) => {
        if (!popover.contains(e.target)) close(popover);
      });
    },
    { signal },
  );

  return controller;
};
