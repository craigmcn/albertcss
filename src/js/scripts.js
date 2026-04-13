import Bouncer from 'formbouncerjs';
import { initAccordion } from './accordion';
import { initTabs } from './tabs';
import { initAlertClose } from './alerts';
import { initMenuToggle } from './menuToggle';
import { initModal } from './modal';
import scrollHeader from './scrollHeader';

window.addEventListener('load', function () {
  const validate = new Bouncer('form', {
    // eslint-disable-line
    messageAfterField: false,
    fieldClass: 'form__control--hasError',
    errorClass: 'form__control-error',
  });

  initAccordion();
  initTabs();
  initAlertClose();
  initMenuToggle();
  initModal();

  scrollHeader();
});
