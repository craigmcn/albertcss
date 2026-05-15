import Bouncer from 'formbouncerjs';
import { initAccordion } from './accordion';
import { initDropdown } from './dropdown';
import { initPopover } from './popover';
import { initTabs } from './tabs';
import { initAlertClose } from './alerts';
import { initMenuToggle } from './menuToggle';
import { initModal } from './modal';
import { initTooltip } from './tooltip';
import scrollHeader from './scrollHeader';

window.addEventListener('load', function () {
  // eslint-disable-next-line no-unused-vars
  const validate = new Bouncer('form', {
    messageAfterField: false,
    fieldClass: 'form__control--hasError',
    errorClass: 'form__control-error',
  });

  initAccordion();
  // Both return an AbortController for cleanup if the component is ever re-initialized.
  // Not needed here — the page has a single load lifetime.
  initDropdown();
  initPopover();
  initTabs();
  initAlertClose();
  initMenuToggle();
  initModal();
  initTooltip();

  scrollHeader();
});
