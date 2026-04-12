import Bouncer from 'formbouncerjs'
import { initAccordion } from './accordion'
import { initAlertClose } from './alerts'
import { initMenuToggle } from './menuToggle'
import { initModal } from './modal'
import scrollHeader from './scrollHeader'

window.addEventListener('load', function () {
  const validate = new Bouncer('form', {
    // eslint-disable-line
    messageAfterField: false,
    fieldClass: 'form__control--hasError',
    errorClass: 'form__control-error',
  })

  initAccordion()
  initAlertClose()
  initMenuToggle()
  initModal()

  scrollHeader()
})
