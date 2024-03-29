import Bouncer from 'formbouncerjs'
import { initAlertClose } from './alerts'
import { initMenuToggle } from './menuToggle'
import scrollHeader from './scrollHeader'

window.addEventListener('load', function () {
    const validate = new Bouncer('form', { // eslint-disable-line
        messageAfterField: false,
        fieldClass: 'form__control--hasError',
        errorClass: 'form__control-error',
    })

    initAlertClose()
    initMenuToggle()

    scrollHeader()
})
