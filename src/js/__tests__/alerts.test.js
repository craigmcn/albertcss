import { describe, it, expect, beforeEach } from 'vitest';
import { initAlertClose } from '../alerts';

const buildAlert = ({ removable = false } = {}) => {
  const alert = document.createElement('div');
  alert.className = removable ? 'alert alert--removable' : 'alert';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'alert__close';
  alert.appendChild(closeBtn);

  document.body.appendChild(alert);
  return { alert, closeBtn };
};

describe('initAlertClose', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('hides the alert block on close button click', () => {
    const { alert, closeBtn } = buildAlert();
    initAlertClose();

    closeBtn.click();

    expect(alert.style.display).toBe('none');
  });

  it('does not remove a non-removable alert from the DOM', () => {
    const { alert, closeBtn } = buildAlert({ removable: false });
    initAlertClose();

    closeBtn.click();

    expect(document.body.contains(alert)).toBe(true);
  });

  it('removes a removable alert from the DOM on close', () => {
    const { alert, closeBtn } = buildAlert({ removable: true });
    initAlertClose();

    closeBtn.click();

    expect(document.body.contains(alert)).toBe(false);
  });

  it('handles multiple alerts independently', () => {
    const first = buildAlert();
    const second = buildAlert({ removable: true });
    initAlertClose();

    first.closeBtn.click();

    expect(first.alert.style.display).toBe('none');
    expect(document.body.contains(first.alert)).toBe(true);
    expect(second.alert.style.display).toBe('');
    expect(document.body.contains(second.alert)).toBe(true);
  });

  it('does nothing when there are no alert close buttons', () => {
    initAlertClose();
    // no error thrown is the assertion
  });
});
