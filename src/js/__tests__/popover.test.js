import { describe, it, expect, beforeEach } from 'vitest';
import { initPopover } from '../popover';

const buildPopover = ({ id = 'test-pop', placement = 'bottom', panelRect = null } = {}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'popover';

  const trigger = document.createElement('button');
  trigger.className = 'popover__trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', id);
  wrapper.appendChild(trigger);

  const panel = document.createElement('div');
  // Default placement is bottom; only add the modifier class for non-default placements
  panel.className = placement === 'bottom'
    ? 'popover__panel'
    : `popover__panel popover__panel--${placement}`;
  panel.id = id;
  panel.hidden = true;

  if (panelRect) {
    panel.getBoundingClientRect = () => ({ bottom: 0, top: 0, left: 0, right: 0, ...panelRect });
  }

  const title = document.createElement('strong');
  title.className = 'popover__title';
  title.textContent = 'Title';
  panel.appendChild(title);

  const body = document.createElement('p');
  body.className = 'popover__body';
  body.textContent = 'Body text.';
  panel.appendChild(body);

  wrapper.appendChild(panel);
  document.body.appendChild(wrapper);
  return { wrapper, trigger, panel };
};

const keydown = (target, key) =>
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

describe('initPopover', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing when no popovers are present', () => {
    initPopover();
  });

  it('opens the panel on trigger click', () => {
    const { trigger, panel } = buildPopover();
    initPopover();

    trigger.click();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);
  });

  it('closes the panel on a second trigger click', () => {
    const { trigger, panel } = buildPopover();
    initPopover();

    trigger.click();
    trigger.click();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);
  });

  it('closes on Escape from the trigger and returns focus', () => {
    const { wrapper, trigger, panel } = buildPopover();
    initPopover();

    trigger.click();
    keydown(wrapper, 'Escape');

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);
    expect(document.activeElement).toBe(trigger);
  });

  it('closes on Escape from inside the panel and returns focus', () => {
    const { trigger, panel } = buildPopover();
    initPopover();

    trigger.click();
    keydown(panel, 'Escape');

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);
    expect(document.activeElement).toBe(trigger);
  });

  it('does not close on Escape when already closed', () => {
    const { wrapper, trigger } = buildPopover();
    initPopover();

    keydown(wrapper, 'Escape');

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on outside click', () => {
    const { trigger, panel } = buildPopover();
    initPopover();

    trigger.click();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);
  });

  it('does not close on click inside the popover', () => {
    const { trigger, panel } = buildPopover();
    initPopover();

    trigger.click();
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);
  });

  it('closes other open popovers when one is opened', () => {
    const first = buildPopover({ id: 'pop-1' });
    const second = buildPopover({ id: 'pop-2' });
    initPopover();

    first.trigger.click();
    second.trigger.click();

    expect(first.trigger.getAttribute('aria-expanded')).toBe('false');
    expect(first.panel.hidden).toBe(true);
    expect(second.trigger.getAttribute('aria-expanded')).toBe('true');
    expect(second.panel.hidden).toBe(false);
  });

  // Viewport flip -----------------------------------------------------------
  // jsdom default viewport: innerWidth=1024, innerHeight=768

  it('flips bottom→top when the panel overflows below the viewport', () => {
    const { trigger, panel } = buildPopover({
      id: 'pop-flip-bt',
      placement: 'bottom',
      panelRect: { bottom: 780 }, // past innerHeight 768
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBe('top');
  });

  it('flips top→bottom when the panel overflows above the viewport', () => {
    const { trigger, panel } = buildPopover({
      id: 'pop-flip-tb',
      placement: 'top',
      panelRect: { top: 4 }, // less than EDGE (8)
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBe('bottom');
  });

  it('flips left→right when the panel overflows the left edge', () => {
    const { trigger, panel } = buildPopover({
      id: 'pop-flip-lr',
      placement: 'left',
      panelRect: { left: 4 }, // less than EDGE (8)
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBe('right');
  });

  it('flips right→left when the panel overflows the right edge', () => {
    const { trigger, panel } = buildPopover({
      id: 'pop-flip-rl',
      placement: 'right',
      panelRect: { right: 1030 }, // past innerWidth 1024
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBe('left');
  });

  it('does not set data-popover-flip when the panel fits', () => {
    const { trigger, panel } = buildPopover({
      id: 'pop-no-flip',
      placement: 'bottom',
      panelRect: { bottom: 400 }, // well within viewport
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBeUndefined();
  });

  it('removes data-popover-flip on close', () => {
    const { trigger, panel } = buildPopover({
      id: 'pop-flip-close',
      placement: 'bottom',
      panelRect: { bottom: 780 },
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBe('top');
    trigger.click();
    expect(panel.dataset.popoverFlip).toBeUndefined();
  });

  it('removes data-popover-flip when closed via Escape', () => {
    const { wrapper, trigger, panel } = buildPopover({
      id: 'pop-flip-esc',
      placement: 'bottom',
      panelRect: { bottom: 780 },
    });
    initPopover();
    trigger.click();
    expect(panel.dataset.popoverFlip).toBe('top');
    keydown(wrapper, 'Escape');
    expect(panel.dataset.popoverFlip).toBeUndefined();
  });
});
