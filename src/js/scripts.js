import Bouncer from 'formbouncerjs'
import { initAlertClose } from './alerts'

window.addEventListener('load', function () {

  const validate = new Bouncer('form', {
    messageAfterField: false,
    fieldClass: 'form__control--hasError',
    errorClass: 'form__control-error'
  })

  initAlertClose()

})