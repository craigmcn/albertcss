export const initCollapse = () => {
    document.querySelectorAll('.js-collapse').forEach((el) => {
        el.addEventListener('click', (e) => {
            const target = document.getElementById(el.dataset.target)
            const expanded =
        el.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'

            if (target.classList.contains('expanded')) {
                target.classList.add('collapsed')
                target.classList.remove('expanded')
            } else {
                target.classList.add('expanded')
                target.classList.remove('collapsed')
            }

            el.setAttribute('aria-expanded', expanded)
        })
    })
}
