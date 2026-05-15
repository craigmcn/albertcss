export const initModal = () => {
  // Open modals via data-modal-target triggers
  document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
    const modal = document.getElementById(trigger.dataset.modalTarget);

    if (
      !modal ||
      modal.tagName !== 'DIALOG' ||
      typeof modal.showModal !== 'function'
    )
      return;

    trigger.addEventListener('click', () => {
      modal.showModal();
    });
  });

  // Close on backdrop click (click lands on dialog element itself, outside content box)
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (isOutside) dialog.close();
    });
  });
};
