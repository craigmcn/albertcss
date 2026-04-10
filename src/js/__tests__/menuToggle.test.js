import { describe, it, expect, beforeEach } from 'vitest'
import { initMenuToggle } from '../menuToggle'

const buildDOM = ({ withNav = true, withToolbar = true } = {}) => {
    document.body.innerHTML = ''

    const toggle = document.createElement('button')
    toggle.id = 'menu-toggle'
    toggle.setAttribute('aria-expanded', 'false')
    document.body.appendChild(toggle)

    let nav = null
    if (withNav) {
        nav = document.createElement('nav')
        nav.id = 'navigation'
        document.body.appendChild(nav)
    }

    let toolbar = null
    if (withToolbar) {
        toolbar = document.createElement('div')
        toolbar.id = 'toolbar'
        document.body.appendChild(toolbar)
    }

    return { toggle, nav, toolbar }
}

describe('initMenuToggle', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('does nothing when #menu-toggle is absent', () => {
        initMenuToggle()
        // no error thrown
    })

    it('expands nav and toolbar on first click', () => {
        const { toggle, nav, toolbar } = buildDOM()
        initMenuToggle()

        toggle.click()

        expect(nav.classList.contains('expanded')).toBe(true)
        expect(nav.classList.contains('collapsed')).toBe(false)
        expect(toolbar.classList.contains('expanded')).toBe(true)
        expect(toolbar.classList.contains('collapsed')).toBe(false)
    })

    it('sets aria-expanded to true on first click', () => {
        const { toggle } = buildDOM()
        initMenuToggle()

        toggle.click()

        expect(toggle.getAttribute('aria-expanded')).toBe('true')
    })

    it('collapses nav and toolbar on second click', () => {
        const { toggle, nav, toolbar } = buildDOM()
        initMenuToggle()

        toggle.click()
        toggle.click()

        expect(nav.classList.contains('collapsed')).toBe(true)
        expect(nav.classList.contains('expanded')).toBe(false)
        expect(toolbar.classList.contains('collapsed')).toBe(true)
        expect(toolbar.classList.contains('expanded')).toBe(false)
    })

    it('sets aria-expanded to false on second click', () => {
        const { toggle } = buildDOM()
        initMenuToggle()

        toggle.click()
        toggle.click()

        expect(toggle.getAttribute('aria-expanded')).toBe('false')
    })

    it('toggles correctly across multiple clicks', () => {
        const { toggle, nav } = buildDOM()
        initMenuToggle()

        toggle.click()
        expect(nav.classList.contains('expanded')).toBe(true)
        toggle.click()
        expect(nav.classList.contains('collapsed')).toBe(true)
        toggle.click()
        expect(nav.classList.contains('expanded')).toBe(true)
    })

    it('handles missing navigation element gracefully', () => {
        const { toggle, toolbar } = buildDOM({ withNav: false })
        initMenuToggle()

        toggle.click()

        expect(toolbar.classList.contains('expanded')).toBe(true)
    })

    it('handles missing toolbar element gracefully', () => {
        const { toggle, nav } = buildDOM({ withToolbar: false })
        initMenuToggle()

        toggle.click()

        expect(nav.classList.contains('expanded')).toBe(true)
    })

    it('removes collapsed class when expanding', () => {
        const { toggle, nav } = buildDOM()
        nav.classList.add('collapsed')
        initMenuToggle()

        toggle.click()

        expect(nav.classList.contains('expanded')).toBe(true)
        expect(nav.classList.contains('collapsed')).toBe(false)
    })
})
