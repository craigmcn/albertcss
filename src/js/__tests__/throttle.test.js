import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import throttle from '../throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns a function', () => {
    const throttled = throttle(() => {}, 100)
    expect(typeof throttled).toBe('function')
  })

  it('does not call fn before wait period elapses', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()

    expect(fn).not.toHaveBeenCalled()
  })

  it('calls fn once wait period has elapsed', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    vi.advanceTimersByTime(101)
    throttled()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does not call fn again before the next wait period elapses', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    vi.advanceTimersByTime(101)
    throttled()
    vi.advanceTimersByTime(50)
    throttled()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('calls fn again after a second wait period elapses', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    vi.advanceTimersByTime(101)
    throttled()
    vi.advanceTimersByTime(101)
    throttled()

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('can be called multiple times across multiple wait periods', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    vi.advanceTimersByTime(101)
    throttled()
    vi.advanceTimersByTime(101)
    throttled()
    vi.advanceTimersByTime(101)
    throttled()

    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('does not call fn if never invoked', () => {
    const fn = vi.fn()
    throttle(fn, 100)
    vi.advanceTimersByTime(500)

    expect(fn).not.toHaveBeenCalled()
  })
})
