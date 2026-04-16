export const initTooltip = () => {
  const tooltips = Array.from(document.querySelectorAll('.tooltip[data-tooltip]'));
  if (!tooltips.length) return;

  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const TOTAL = 0.75 * rootPx; // $_total: $_gap + $_arrow converted to px
  const EDGE = 8; // minimum px clearance from viewport edge

  const getPlacement = (el) => {
    if (el.classList.contains('tooltip--bottom')) return 'bottom';
    if (el.classList.contains('tooltip--left')) return 'left';
    if (el.classList.contains('tooltip--right')) return 'right';
    return 'top';
  };

  const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

  // Measure the bubble text at the same font/padding as the CSS ::before pseudo-element.
  const measureBubble = (text) => {
    const probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText =
      'position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;' +
      'white-space:nowrap;font-size:0.875rem;line-height:1.5;padding:0.25rem 0.5rem;';
    probe.textContent = text;
    document.body.appendChild(probe);
    const { width, height } = probe.getBoundingClientRect();
    probe.remove();
    return { width, height };
  };

  const needsFlip = (el, rect, placement) => {
    const { width: bw, height: bh } = measureBubble(el.dataset.tooltip);
    switch (placement) {
      case 'top':    return rect.top    - bh - TOTAL < EDGE;
      case 'bottom': return rect.bottom + bh + TOTAL > window.innerHeight - EDGE;
      case 'left':   return rect.left   - bw - TOTAL < EDGE;
      case 'right':  return rect.right  + bw + TOTAL > window.innerWidth  - EDGE;
      default:       return false;
    }
  };

  tooltips.forEach((el) => {
    const show = () => {
      const placement = getPlacement(el);
      if (needsFlip(el, el.getBoundingClientRect(), placement)) {
        el.dataset.tooltipFlip = opposite[placement];
      }
    };

    const hide = () => delete el.dataset.tooltipFlip;

    el.addEventListener('mouseenter', show);
    el.addEventListener('focusin', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focusout', hide);
  });
};
