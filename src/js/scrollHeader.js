import throttle from './throttle'

// https://codingreflections.com/hide-header-on-scroll-down/

const setBodyProperties = (height) => {
    const body = document.querySelector('body')
    body.style.setProperty('--headerHeight', height + 'px')
    body.style.paddingTop = height + 'px'
}

export default function scrollHeader () {
    const header = document.querySelector('header.header--scroll')

    if (header) {
        const doc = document.documentElement
        const w = window

        let prevScroll = w.scrollY || doc.scrollTop
        let curScroll
        let direction = 0
        let prevDirection = 0

        const headerHeight = header.offsetHeight
        setBodyProperties(headerHeight)

        const observer = new ResizeObserver((entries) => {
            setBodyProperties(entries[0].target.offsetHeight)
        })
        observer.observe(header)

        const checkScroll = () => {
            curScroll = w.scrollY || doc.scrollTop

            if (curScroll > headerHeight) {
                direction = (curScroll > prevScroll) ? 2 : (curScroll < prevScroll) ? 1 : 0
                direction !== prevDirection && toggleHeader()
            }

            if (curScroll <= headerHeight) {
                direction = 1
                toggleHeader()
            }

            prevScroll = curScroll
        }

        const toggleHeader = () => {
            if (direction) {
                header.classList.toggle('hidden', direction === 2 && curScroll > headerHeight)
                prevDirection = direction
            }
        }

        window.addEventListener('scroll', throttle(checkScroll, 100))
    }
}
