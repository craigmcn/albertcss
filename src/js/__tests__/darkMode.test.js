import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initDarkMode } from '../darkMode';

describe('initDarkMode', () => {
  let button;

  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    document.documentElement.removeAttribute('data-mode');
    document.body.innerHTML = `
      <button data-toggle-dark-mode data-mode="dark" type="button">
        <span data-color="light">dark</span>
        <span class="d-none" data-color="dark">light</span>
      </button>
    `;
    button = document.querySelector('[data-toggle-dark-mode]');
    initDarkMode();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.removeAttribute('data-mode');
    document.body.innerHTML = '';
  });

  it('sets dark mode on click', () => {
    button.click();
    expect(document.documentElement.dataset.mode).toBe('dark');
  });

  it('toggles back to light mode on second click', () => {
    button.click();
    button.click();
    expect(document.documentElement.dataset.mode).toBe('light');
  });

  it('updates button data-mode to light when dark mode is on', () => {
    button.click();
    expect(button.dataset.mode).toBe('light');
  });

  it('restores button data-mode to dark when dark mode is off', () => {
    button.click();
    button.click();
    expect(button.dataset.mode).toBe('dark');
  });

  it('hides light span and shows dark span when dark mode is on', () => {
    const lightSpan = button.querySelector('[data-color="light"]');
    const darkSpan = button.querySelector('[data-color="dark"]');
    button.click();
    expect(lightSpan.classList.contains('d-none')).toBe(true);
    expect(darkSpan.classList.contains('d-none')).toBe(false);
  });

  it('restores span visibility when dark mode is toggled off', () => {
    const lightSpan = button.querySelector('[data-color="light"]');
    const darkSpan = button.querySelector('[data-color="dark"]');
    button.click();
    button.click();
    expect(lightSpan.classList.contains('d-none')).toBe(false);
    expect(darkSpan.classList.contains('d-none')).toBe(true);
  });

  it('does nothing if no toggle buttons found', () => {
    document.body.innerHTML = '';
    expect(() => initDarkMode()).not.toThrow();
  });

  it('syncs to dark mode on init when prefers-color-scheme is dark', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    document.documentElement.removeAttribute('data-mode');
    initDarkMode();
    expect(document.documentElement.dataset.mode).toBe('dark');
  });

  it('defaults to light mode on init when prefers-color-scheme is light', () => {
    expect(document.documentElement.dataset.mode).toBe('light');
  });

  it('does not throw when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    document.documentElement.removeAttribute('data-mode');
    expect(() => initDarkMode()).not.toThrow();
    expect(document.documentElement.dataset.mode).toBe('light');
  });

  it('preserves a pre-set data-mode on init instead of overriding it from matchMedia', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    document.documentElement.dataset.mode = 'dark';
    initDarkMode();
    expect(document.documentElement.dataset.mode).toBe('dark');
  });

  it('toggles standalone [data-color] elements outside the toggle button', () => {
    const standalone = document.createElement('div');
    standalone.innerHTML = `
      <span data-color="light">light content</span>
      <span class="d-none" data-color="dark">dark content</span>
    `;
    document.body.appendChild(standalone);
    const lightEl = standalone.querySelector('[data-color="light"]');
    const darkEl = standalone.querySelector('[data-color="dark"]');

    button.click();
    expect(lightEl.classList.contains('d-none')).toBe(true);
    expect(darkEl.classList.contains('d-none')).toBe(false);

    button.click();
    expect(lightEl.classList.contains('d-none')).toBe(false);
    expect(darkEl.classList.contains('d-none')).toBe(true);
  });

  it('syncs data-mode across multiple toggle buttons when one is clicked', () => {
    document.body.innerHTML = `
      <button data-toggle-dark-mode data-mode="dark" type="button" id="header-toggle"></button>
      <button data-toggle-dark-mode data-mode="dark" type="button" id="footer-toggle"></button>
    `;
    initDarkMode();
    const headerToggle = document.getElementById('header-toggle');
    const footerToggle = document.getElementById('footer-toggle');

    headerToggle.click();
    expect(document.documentElement.dataset.mode).toBe('dark');
    expect(headerToggle.dataset.mode).toBe('light');
    expect(footerToggle.dataset.mode).toBe('light');

    footerToggle.click();
    expect(document.documentElement.dataset.mode).toBe('light');
    expect(headerToggle.dataset.mode).toBe('dark');
    expect(footerToggle.dataset.mode).toBe('dark');
  });
});
