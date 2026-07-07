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
});
