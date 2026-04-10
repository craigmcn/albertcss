import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import scrollHeader from '../scrollHeader'

const buildHeader = ({ offsetHeight = 80 } = {}) => {
    document.body.innerHTML = ''

    const header = document.createElement('header')
    header.className = 'header--scroll'
    document.body.appendChild(header)

    // jsdom doesn't compute layout, so stub offsetHeight
    Object.defineProperty(header, 'offsetHeight', { get: () => offsetHeight, configurable: true })

    return header
}

const fireScroll = (scrollY) => {
    Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true })
    window.dispatchEvent(new Event('scroll'))
}

describe('scrollHeader', () => {
    let observeMock
    let disconnectMock
    let resizeObserverCallback

    beforeEach(() => {
        vi.useFakeTimers()
        observeMock = vi.fn()
        disconnectMock = vi.fn()

        global.ResizeObserver = vi.fn(function (cb) {
            resizeObserverCallback = cb
            return { observe: observeMock, disconnect: disconnectMock }
        })

        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    })

    afterEach(() => {
        vi.useRealTimers()
        vi.restoreAllMocks()
        document.body.innerHTML = ''
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, configurable: true })
    })

    it('does nothing when no header.header--scroll exists', () => {
        document.body.innerHTML = ''
        scrollHeader()
        // no error thrown
    })

    it('sets --headerHeight and paddingTop on body from header offsetHeight', () => {
        buildHeader({ offsetHeight: 80 })
        scrollHeader()

        expect(document.body.style.getPropertyValue('--headerHeight')).toBe('80px')
        expect(document.body.style.paddingTop).toBe('80px')
    })

    it('observes the header with ResizeObserver', () => {
        const header = buildHeader()
        scrollHeader()

        expect(observeMock).toHaveBeenCalledWith(header)
    })

    it('updates body properties when ResizeObserver fires', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        // Simulate header growing to 120px
        Object.defineProperty(header, 'offsetHeight', { get: () => 120, configurable: true })
        resizeObserverCallback([{ target: header }])

        expect(document.body.style.getPropertyValue('--headerHeight')).toBe('120px')
        expect(document.body.style.paddingTop).toBe('120px')
    })

    it('hides header when scrolling down past header height', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        // Scroll down past header height
        fireScroll(81)
        vi.advanceTimersByTime(101)
        fireScroll(200)
        vi.advanceTimersByTime(101)

        expect(header.classList.contains('hidden')).toBe(true)
    })

    it('shows header when scrolling up', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        // Scroll down first
        fireScroll(81)
        vi.advanceTimersByTime(101)
        fireScroll(200)
        vi.advanceTimersByTime(101)

        expect(header.classList.contains('hidden')).toBe(true)

        // Now scroll up
        fireScroll(150)
        vi.advanceTimersByTime(101)

        expect(header.classList.contains('hidden')).toBe(false)
    })

    it('shows header when scrolling back to within header height', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        fireScroll(200)
        vi.advanceTimersByTime(101)
        fireScroll(40)
        vi.advanceTimersByTime(101)

        expect(header.classList.contains('hidden')).toBe(false)
    })

    it('falls back to document.documentElement.scrollTop when window.scrollY is undefined', () => {
        const header = buildHeader({ offsetHeight: 80 })
        Object.defineProperty(window, 'scrollY', { value: undefined, configurable: true })
        // Start scrollTop at 0 so prevScroll initialises to 0
        let scrollTopValue = 0
        Object.defineProperty(document.documentElement, 'scrollTop', {
            get: () => scrollTopValue,
            configurable: true,
        })
        scrollHeader()

        // Scroll down past header height
        scrollTopValue = 200
        vi.advanceTimersByTime(101)
        window.dispatchEvent(new Event('scroll'))
        scrollTopValue = 300
        vi.advanceTimersByTime(101)
        window.dispatchEvent(new Event('scroll'))

        expect(header.classList.contains('hidden')).toBe(true)
    })

    it('sets direction to 0 and skips toggle when scroll position is unchanged', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        // Scroll down past header height
        fireScroll(200)
        vi.advanceTimersByTime(101)
        fireScroll(300)
        vi.advanceTimersByTime(101)

        // Trigger again at exact same position (direction = 0, no toggle)
        vi.advanceTimersByTime(101)
        window.dispatchEvent(new Event('scroll'))

        // Header should remain hidden as no direction change
        expect(header.classList.contains('hidden')).toBe(true)
    })

    it('does not call toggleHeader when scroll direction has not changed', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        // Two consecutive downward scrolls — direction stays 2, prevDirection becomes 2 after first
        fireScroll(200)
        vi.advanceTimersByTime(101)
        fireScroll(300)
        vi.advanceTimersByTime(101)
        fireScroll(400)
        vi.advanceTimersByTime(101)

        // Header remains hidden — toggle not called redundantly
        expect(header.classList.contains('hidden')).toBe(true)
    })

    it('throttles scroll handler to 100ms', () => {
        const header = buildHeader({ offsetHeight: 80 })
        scrollHeader()

        fireScroll(81)
        vi.advanceTimersByTime(50)
        fireScroll(200)
        // Not 100ms yet — header should not be hidden
        expect(header.classList.contains('hidden')).toBe(false)

        vi.advanceTimersByTime(51)
        fireScroll(250)
        expect(header.classList.contains('hidden')).toBe(true)
    })
})
