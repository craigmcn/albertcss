export const initAlertClose = () => {
  document.querySelectorAll('.alert__close').forEach((a) => {
    a.addEventListener('click', (e) => {
      const alertBlock = a.parentNode;

      alertBlock.classList.add('d-none');

      if (alertBlock.classList.contains('alert--removable'))
        alertBlock.remove();
    });
  });
};
