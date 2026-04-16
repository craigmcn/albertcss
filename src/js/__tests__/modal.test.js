import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initModal } from '../modal';

const buildModal = ({ id = 'test-modal', withTrigger = true } = {}) => {
  const dialog = document.createElement('dialog');
  dialog.id = id;
  dialog.showModal = vi.fn();
  dialog.close = vi.fn();
  document.body.appendChild(dialog);

  let trigger = null;
  if (withTrigger) {
    trigger = document.createElement('button');
    trigger.dataset.modalTarget = id;
    document.body.appendChild(trigger);
  }

  return { dialog, trigger };
};

describe('initModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing when no triggers or dialogs are present', () => {
    initModal();
    // no error thrown
  });

  it('calls showModal on the target dialog when trigger is clicked', () => {
    const { dialog, trigger } = buildModal();
    initModal();

    trigger.click();

    expect(dialog.showModal).toHaveBeenCalledOnce();
  });

  it('does not throw when a trigger points to a missing dialog', () => {
    const trigger = document.createElement('button');
    trigger.dataset.modalTarget = 'nonexistent';
    document.body.appendChild(trigger);
    initModal();

    trigger.click();
    // no error thrown
  });

  it('closes the dialog on a click outside the content rect', () => {
    const { dialog } = buildModal({ withTrigger: false });
    dialog.getBoundingClientRect = vi.fn(() => ({
      left: 100,
      right: 400,
      top: 100,
      bottom: 300,
    }));
    initModal();

    dialog.dispatchEvent(
      new MouseEvent('click', { clientX: 0, clientY: 0, bubbles: true }),
    );

    expect(dialog.close).toHaveBeenCalledOnce();
  });

  it('does not close the dialog on a click inside the content rect', () => {
    const { dialog } = buildModal({ withTrigger: false });
    dialog.getBoundingClientRect = vi.fn(() => ({
      left: 100,
      right: 400,
      top: 100,
      bottom: 300,
    }));
    initModal();

    dialog.dispatchEvent(
      new MouseEvent('click', { clientX: 200, clientY: 200, bubbles: true }),
    );

    expect(dialog.close).not.toHaveBeenCalled();
  });

  it('handles multiple triggers pointing to different dialogs independently', () => {
    const first = buildModal({ id: 'modal-1' });
    const second = buildModal({ id: 'modal-2' });
    initModal();

    first.trigger.click();

    expect(first.dialog.showModal).toHaveBeenCalledOnce();
    expect(second.dialog.showModal).not.toHaveBeenCalled();
  });

  it('handles multiple triggers pointing to the same dialog', () => {
    const { dialog } = buildModal({ id: 'shared', withTrigger: false });

    const triggerA = document.createElement('button');
    triggerA.dataset.modalTarget = 'shared';
    const triggerB = document.createElement('button');
    triggerB.dataset.modalTarget = 'shared';
    document.body.append(triggerA, triggerB);

    initModal();

    triggerA.click();
    triggerB.click();

    expect(dialog.showModal).toHaveBeenCalledTimes(2);
  });
});
