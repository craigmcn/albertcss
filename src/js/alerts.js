export const initAlertClose = () => {
  document.querySelectorAll('.alert__close').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      const alertBlock = closeBtn.parentNode;

      alertBlock.classList.add('d-none');

      if (alertBlock.classList.contains('alert--removable'))
        alertBlock.remove();
    });
  });
};
