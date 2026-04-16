import { describe, it, expect, beforeEach } from 'vitest';
import { initTooltip } from '../tooltip';

// jsdom default viewport: innerWidth=1024, innerHeight=768

const buildTooltip = ({ placement = null, text = 'Tip', top = 400, left = 400 } = {}) => {
  const el = document.createElement('button');
  el.className = placement ? `tooltip tooltip--${placement}` : 'tooltip';
  el.setAttribute('data-tooltip', text);
  document.body.appendChild(el);

  // jsdom returns zeros for all rects; stub so tests can control position
  const height = 40;
  const width = 120;
  el.getBoundingClientRect = () => ({
    top,
    left,
    bottom: top + height,
    right: left + width,
    width,
    height,
  });

  return el;
};

const mouseenter = (el) => el.dispatchEvent(new MouseEvent('mouseenter'));
const mouseleave = (el) => el.dispatchEvent(new MouseEvent('mouseleave'));
const focusin = (el) => el.dispatchEvent(new FocusEvent('focusin'));
const focusout = (el) => el.dispatchEvent(new FocusEvent('focusout'));

describe('initTooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing when no tooltip elements are present', () => {
    initTooltip();
  });

  it('ignores elements with .tooltip but no data-tooltip attribute', () => {
    const el = document.createElement('button');
    el.className = 'tooltip';
    document.body.appendChild(el);
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  // Top placement (default) --------------------------------------------------

  it('flips top→bottom when element is near the top edge', () => {
    const el = buildTooltip({ top: 5 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBe('bottom');
  });

  it('does not flip when top placement has sufficient space', () => {
    const el = buildTooltip({ top: 400 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  // Bottom placement ---------------------------------------------------------

  it('flips bottom→top when element is near the bottom edge', () => {
    // innerHeight=768; near bottom means bottom edge (top + height) close to 768
    const el = buildTooltip({ placement: 'bottom', top: 760 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBe('top');
  });

  it('does not flip bottom placement when there is sufficient space below', () => {
    const el = buildTooltip({ placement: 'bottom', top: 400 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  // Left placement -----------------------------------------------------------

  it('flips left→right when element is near the left edge', () => {
    const el = buildTooltip({ placement: 'left', left: 5 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBe('right');
  });

  it('does not flip left placement when there is sufficient space to the left', () => {
    const el = buildTooltip({ placement: 'left', left: 400 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  // Right placement ----------------------------------------------------------

  it('flips right→left when element is near the right edge', () => {
    // innerWidth=1024; element right edge (left + width) close to 1024
    const el = buildTooltip({ placement: 'right', left: 900 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBe('left');
  });

  it('does not flip right placement when there is sufficient space to the right', () => {
    const el = buildTooltip({ placement: 'right', left: 400 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  // Cleanup ------------------------------------------------------------------

  it('removes data-tooltip-flip on mouseleave', () => {
    const el = buildTooltip({ top: 5 });
    initTooltip();
    mouseenter(el);
    expect(el.dataset.tooltipFlip).toBe('bottom');
    mouseleave(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  it('sets data-tooltip-flip on focusin and clears it on focusout', () => {
    const el = buildTooltip({ top: 5 });
    initTooltip();
    focusin(el);
    expect(el.dataset.tooltipFlip).toBe('bottom');
    focusout(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });

  it('does not add flip attribute when leaving without overflow', () => {
    const el = buildTooltip({ top: 400 });
    initTooltip();
    mouseenter(el);
    mouseleave(el);
    expect(el.dataset.tooltipFlip).toBeUndefined();
  });
});
