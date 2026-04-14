import { describe, it, expect, beforeEach } from 'vitest';
import { initPopover } from '../popover';

const buildPopover = ({ id = 'test-pop', placement = 'bottom' } = {}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'popover';

  const trigger = document.createElement('button');
  trigger.className = 'popover__trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', id);
  wrapper.appendChild(trigger);

  const panel = document.createElement('div');
  panel.className = `popover__panel popover__panel--${placement}`;
  panel.id = id;
  panel.hidden = true;

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
    const { wrapper, trigger, panel } = buildPopover();
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
});
