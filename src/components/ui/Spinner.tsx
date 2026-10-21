import type { JSX } from 'react'

/**
 * The loading indicator of the `Connect codebase` screens.
 *
 * The Figma frame set (`91TpUu5OYVLFkPdcBCmOUu`, node `48966-14667`) contains no
 * loading visual at all — no spinner, skeleton, shimmer or animation, and the four
 * floating overlays that could be mistaken for one are a single static
 * hand-pointer annotation. The request nevertheless requires every screen to show
 * its loading state first, before any empty or error content, so this indicator is
 * built from the token layer rather than transcribed from a design node, and the
 * plan adds exactly one token for it: `--animate-spinner`, whose keyframes are
 * declared beside it in `src/styles/theme.css`.
 *
 * Every visual value is therefore theme-driven: a 24×24 ring drawn in
 * `color-primary` over `color-surface`, turning on the `animate-spinner` token and
 * held still when the user asks for reduced motion. No node in the frame set
 * carries a shadow, a gradient or a second motion, so this ring has none either.
 */

/**
 * Props for {@link Spinner}.
 */
interface SpinnerProps {
  /**
   * Text announced by the indicator's own `role="status"` region — for example
   * `'Loading branches'`.
   *
   * Supply it when the indicator is the only element that can report the loading
   * state: the text is rendered for assistive technology only, so the 24×24
   * geometry is untouched and no second copy of the message appears on screen.
   * Leave it out when the consumer announces the state itself — a status line
   * rendered beside the indicator, for instance — because then both the label and
   * that line would be announced.
   */
  label?: string
  /**
   * The design defines a single size: a 24×24 ring. Accepting only that value makes
   * any other size a compile error rather than a silently mis-sized indicator.
   */
  size: 'sm'
}

/**
 * The class list for each {@link SpinnerProps.size}, so the property's one value
 * selects its geometry explicitly and no branch is left implicit.
 *
 * `size-icon-md` is the design's 24×24 box — the token the tree's icon slots use —
 * and `block` is what lets a `span` take a width and a height at all. `shrink-0`
 * keeps the box square when a consumer places the indicator in a flex row.
 */
const SIZE_CLASS: Record<SpinnerProps['size'], string> = {
  sm: 'block size-icon-md shrink-0',
}

/**
 * The ring itself: a circle whose ink is `color-primary` and whose interior is
 * `color-surface`.
 *
 * The visible arc comes from leaving one border transparent rather than from a
 * second colour or a gradient, since the only colour values available are the
 * design's own tokens and no node in the frame set carries a gradient. The
 * remaining ink is then the design's primary colour, at the ring weight a 24×24
 * indicator reads at (`border-2`), over the surface it sits on.
 *
 * `rounded-full` is the circle: it is the shape of the indicator, not one of the
 * design's corner radii, which are read from the `radius-*` tokens for the rows,
 * cards and containers. The motion is the animation token plus its reduced-motion
 * counterpart: the keyframes ship from the token layer with `animate-spinner`, and
 * `motion-reduce:animate-none` holds the same ring still for a user whose
 * `prefers-reduced-motion` is `reduce`.
 */
const RING_CLASSES =
  'rounded-full border-2 border-primary border-t-transparent bg-surface animate-spinner motion-reduce:animate-none'

/**
 * Renders the loading indicator: a rotating `color-primary` ring, inside a
 * `role="status"` region so the loading state is announced and not only seen.
 *
 * The region is always rendered, which is what lets a consumer compose the
 * indicator without announcing the state twice:
 *
 * - With `label`, the region carries that text as its content (rendered for
 *   assistive technology only) and the consumer adds no announced line of its own.
 * - Without `label`, the region stays present but empty and the consumer renders
 *   the announced line itself — typically in the status region of the panel that
 *   also holds the tree — so only that line is announced.
 *
 * Presentational only: props in, markup out. It calls no hook, imports neither the
 * feature's API client nor the router, holds no state and starts no timer of its
 * own — the request that is in flight belongs to the consumer that renders it. The
 * ring is decorative and hidden from assistive technology, so the text inside the
 * region is the single source of the announcement.
 *
 * @param props - The accessible label to announce, and the indicator's size.
 * @returns The announced loading region holding the rotating ring.
 */
export function Spinner({ label, size }: SpinnerProps): JSX.Element {
  return (
    // `aria-live` and `aria-atomic` are stated alongside the role rather than left
    // to `role="status"`'s implicit values, so the announcement a loading state
    // depends on is visible in the markup a reviewer reads.
    <span role="status" aria-live="polite" aria-atomic="true" className="inline-flex items-center">
      <span aria-hidden="true" className={`${SIZE_CLASS[size]} ${RING_CLASSES}`} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}
