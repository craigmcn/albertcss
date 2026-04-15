import { describe, it, expect, beforeEach } from 'vitest';
import { initTabs } from '../tabs';

const buildTabs = (count = 3) => {
  const container = document.createElement('div');

  const tablist = document.createElement('div');
  tablist.setAttribute('role', 'tablist');

  const tabs = [];
  const panels = [];

  for (let i = 0; i < count; i++) {
    const tab = document.createElement('button');
    tab.setAttribute('role', 'tab');
    tab.id = `tab-${i}`;
    tab.setAttribute('aria-controls', `panel-${i}`);
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
    tablist.appendChild(tab);
    tabs.push(tab);

    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.id = `panel-${i}`;
    panel.hidden = i !== 0;
    container.appendChild(panel);
    panels.push(panel);
  }

  container.prepend(tablist);
  document.body.appendChild(container);
  return { tablist, tabs, panels };
};

const keydown = (target, key) =>
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

describe('initTabs', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing when no tablists are present', () => {
    initTabs();
    // no error thrown
  });

  it('activates a tab and shows its panel on click', () => {
    const { tabs, panels } = buildTabs();
    initTabs();

    tabs[1].click();

    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
    expect(panels[1].hidden).toBe(false);
  });

  it('deactivates other tabs and hides their panels on click', () => {
    const { tabs, panels } = buildTabs();
    initTabs();

    tabs[1].click();

    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
    expect(panels[0].hidden).toBe(true);
    expect(tabs[2].getAttribute('aria-selected')).toBe('false');
    expect(tabs[2].getAttribute('tabindex')).toBe('-1');
    expect(panels[2].hidden).toBe(true);
  });

  it('moves to the next tab on ArrowRight', () => {
    const { tabs, panels } = buildTabs();
    initTabs();

    keydown(tabs[0], 'ArrowRight');

    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(panels[1].hidden).toBe(false);
  });

  it('wraps ArrowRight from last tab to first', () => {
    const { tabs, panels } = buildTabs(3);
    initTabs();

    keydown(tabs[2], 'ArrowRight');

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(panels[0].hidden).toBe(false);
  });

  it('moves to the previous tab on ArrowLeft', () => {
    const { tabs, panels } = buildTabs();
    initTabs();

    keydown(tabs[1], 'ArrowLeft');

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(panels[0].hidden).toBe(false);
  });

  it('wraps ArrowLeft from first tab to last', () => {
    const { tabs, panels } = buildTabs(3);
    initTabs();

    keydown(tabs[0], 'ArrowLeft');

    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(panels[2].hidden).toBe(false);
  });

  it('activates the first tab on Home', () => {
    const { tabs, panels } = buildTabs();
    initTabs();

    keydown(tabs[2], 'Home');

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(panels[0].hidden).toBe(false);
  });

  it('activates the last tab on End', () => {
    const { tabs, panels } = buildTabs();
    initTabs();

    keydown(tabs[0], 'End');

    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(panels[2].hidden).toBe(false);
  });

  it('ignores unrelated keys', () => {
    const { tabs } = buildTabs();
    initTabs();

    keydown(tabs[0], 'Tab');
    keydown(tabs[0], 'Enter');
    keydown(tabs[0], 'Escape');

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  it('handles tabs with no matching panel without throwing', () => {
    const { tabs } = buildTabs();
    document.querySelectorAll('[role=tabpanel]').forEach((p) => p.remove());
    initTabs();

    tabs[1].click();

    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  it('handles multiple independent tablists without cross-interference', () => {
    const first = buildTabs(2);
    const second = buildTabs(2);
    initTabs();

    second.tabs[1].click();

    expect(first.tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(second.tabs[1].getAttribute('aria-selected')).toBe('true');
  });
});
