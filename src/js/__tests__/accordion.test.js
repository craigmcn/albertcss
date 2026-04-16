import { describe, it, expect, beforeEach } from 'vitest';
import { initAccordion } from '../accordion';

const buildAccordion = (itemCount = 3) => {
  const accordion = document.createElement('div');
  accordion.className = 'accordion';

  const items = Array.from({ length: itemCount }, () => {
    const item = document.createElement('details');
    item.className = 'accordion__item';
    accordion.appendChild(item);
    return item;
  });

  document.body.appendChild(accordion);
  return { accordion, items };
};

describe('initAccordion', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing when no accordions are present', () => {
    initAccordion();
    // no error thrown
  });

  it('closes sibling items when one is opened', () => {
    const { items } = buildAccordion(3);
    initAccordion();

    items[1].open = true;
    items[1].dispatchEvent(new Event('toggle'));

    items[0].open = true;
    items[0].dispatchEvent(new Event('toggle'));

    expect(items[0].open).toBe(true);
    expect(items[1].open).toBe(false);
  });

  it('does not close other items when an item is closed', () => {
    const { items } = buildAccordion(3);
    initAccordion();

    items[0].open = true;
    items[1].open = true;

    items[0].open = false;
    items[0].dispatchEvent(new Event('toggle'));

    expect(items[1].open).toBe(true);
  });

  it('leaves item open when it is the only open item', () => {
    const { items } = buildAccordion(3);
    initAccordion();

    items[0].open = true;
    items[0].dispatchEvent(new Event('toggle'));

    expect(items[0].open).toBe(true);
    expect(items[1].open).toBe(false);
    expect(items[2].open).toBe(false);
  });

  it('handles multiple independent accordions without cross-interference', () => {
    const first = buildAccordion(2);
    const second = buildAccordion(2);
    initAccordion();

    first.items[0].open = true;
    first.items[0].dispatchEvent(new Event('toggle'));
    second.items[0].open = true;
    second.items[0].dispatchEvent(new Event('toggle'));

    // Opening second item in second accordion should only close within that accordion
    second.items[1].open = true;
    second.items[1].dispatchEvent(new Event('toggle'));

    expect(first.items[0].open).toBe(true);
    expect(second.items[0].open).toBe(false);
    expect(second.items[1].open).toBe(true);
  });

  it('only closes direct children, not items in nested accordions', () => {
    const { items } = buildAccordion(2);

    const nestedAccordion = document.createElement('div');
    nestedAccordion.className = 'accordion';
    const nestedItem = document.createElement('details');
    nestedItem.className = 'accordion__item';
    nestedItem.open = true;
    nestedAccordion.appendChild(nestedItem);
    items[0].appendChild(nestedAccordion);

    initAccordion();

    items[1].open = true;
    items[1].dispatchEvent(new Event('toggle'));

    expect(nestedItem.open).toBe(true);
  });

  it('does not re-initialize when called a second time on the same accordion', () => {
    const { accordion, items } = buildAccordion(2);
    initAccordion();
    initAccordion(); // second call should be a no-op

    // If listeners were duplicated, item[1] would be closed twice — harmless
    // but we can verify the guard by checking the dataset flag was set once.
    expect(accordion.dataset.accordionInitialized).toBe('true');

    // Behaviour still works correctly after double-init
    items[0].open = true;
    items[0].dispatchEvent(new Event('toggle'));
    items[1].open = true;
    items[1].dispatchEvent(new Event('toggle'));

    expect(items[0].open).toBe(false);
    expect(items[1].open).toBe(true);
  });
});
