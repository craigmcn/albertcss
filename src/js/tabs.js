export const initTabs = () => {
    document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
        const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'))

        const activate = (tab) => {
            // Deactivate all tabs and hide all panels
            tabs.forEach((t) => {
                t.setAttribute('aria-selected', 'false')
                t.setAttribute('tabindex', '-1')
                const panel = document.getElementById(t.getAttribute('aria-controls'))
                if (panel) panel.hidden = true
            })

            // Activate selected tab and show its panel
            tab.setAttribute('aria-selected', 'true')
            tab.setAttribute('tabindex', '0')
            const panel = document.getElementById(tab.getAttribute('aria-controls'))
            if (panel) panel.hidden = false
            tab.focus()
        }

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => activate(tab))

            tab.addEventListener('keydown', (e) => {
                const index = tabs.indexOf(tab)
                let next

                if (e.key === 'ArrowRight') {
                    next = tabs[(index + 1) % tabs.length]
                } else if (e.key === 'ArrowLeft') {
                    next = tabs[(index - 1 + tabs.length) % tabs.length]
                } else if (e.key === 'Home') {
                    next = tabs[0]
                } else if (e.key === 'End') {
                    next = tabs[tabs.length - 1]
                }

                if (next) {
                    e.preventDefault()
                    activate(next)
                }
            })
        })
    })
}
