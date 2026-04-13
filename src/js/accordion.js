export const initAccordion = () => {
  // Exclusive open: closing sibling items when one opens
  document.querySelectorAll('.accordion').forEach((accordion) => {
    const items = accordion.querySelectorAll(':scope > .accordion__item');

    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach((sibling) => {
          if (sibling !== item && sibling.open) sibling.open = false;
        });
      });
    });
  });
};
