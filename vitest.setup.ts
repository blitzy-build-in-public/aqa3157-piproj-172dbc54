// Test setup, loaded by `vite.config.ts`'s `test.setupFiles` before every test
// file. It does three things and nothing else: bind the jest-dom matchers,
// unmount what React Testing Library rendered between tests, and fill the gaps
// jsdom leaves in the DOM APIs the screens reach for.

import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// The `/vitest` entry point above is what binds the matchers to Vitest's
// `expect`; the bare package entry binds them to Jest's global instead.

// React Testing Library unmounts what a test rendered, so one test's tree never
// leaks into the next.
afterEach(() => {
  cleanup()
})

// A component that reads a preference — the spinner's reduced-motion guard —
// needs a media query engine; where the environment provides none, this inert,
// non-matching fallback stands in for it, and an environment that provides its
// own is left as it stands.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }) as MediaQueryList
}

// jsdom observes neither element resizes nor viewport intersections; the tree
// only needs an observer to exist and to be inert.
class ObserverStub {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ObserverStub
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver
}

// jsdom implements neither scrolling call, and both are reached at runtime: the
// tree moves focus between rows with `scrollIntoView`, and the container scrolls
// to the next window of entries with `scrollTo`.
if (typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = vi.fn()
}

if (typeof HTMLElement.prototype.scrollTo !== 'function') {
  HTMLElement.prototype.scrollTo = vi.fn()
}
