export const initMenuToggle = () => {
    const menuToggle = document.getElementById('menu-toggle')

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            const targets = [document.getElementById('navigation'), document.getElementById('toolbar')]
            const expanded =
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'

            targets.forEach((target) => {
                if (target) {
                    if (target.classList.contains('expanded')) {
                        target.classList.add('collapsed')
                        target.classList.remove('expanded')
                    } else {
                        target.classList.add('expanded')
                        target.classList.remove('collapsed')
                    }
                }
            })

            menuToggle.setAttribute('aria-expanded', expanded)
        })
    }
}
