export const initAlertClose = () => {
    document.querySelectorAll('.alert__close').forEach((a) => {
        a.addEventListener('click', (e) => {
            const alertBlock = a.parentNode

            alertBlock.style.display = 'none'

            if (alertBlock.classList.contains('alert--removable')) alertBlock.remove()
        })
    })
}
