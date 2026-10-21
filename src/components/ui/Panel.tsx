/**
 * The design's surface primitive: the white, hairline-bordered, rounded panel that
 * wraps the app bar, the project header card, the body card and the branch tree
 * container of the `Connect codebase` screen.
 *
 * Every visual value comes from the token layer in `src/styles/theme.css`, so this
 * file carries no colour, size or radius literal. Two variants exist because the
 * design uses exactly two surface treatments, measured from Figma file
 * `91TpUu5OYVLFkPdcBCmOUu`:
 *
 * - `card` — the app bar (48966:64340), the project header card (48966:64371) and the
 *   body card (48966:64434): #FFFFFF fill, 1px #E9E9E9 border, 8px radius, uniform on
 *   all four corners.
 * - `tree-container` — the branch tree box (48966:64459): 1px #D9D9D9 border, 12px
 *   radius, clipping its content at its own bounds.
 *
 * No node in the frame set carries a shadow, blur, gradient or background image, so
 * neither does this primitive. Size is never set here: the three cards differ only in
 * their sizing modes (fixed, hug, fill) and the container is 1000x400, all of which the
 * consumer passes through `className`.
 *
 * The element is deliberately inert. It takes no `role`, no `aria-*` and no tab stop,
 * because the tree container wraps `role="tree"`, whose only permitted children are
 * `treeitem` and `group` — a widget role or a stray focus stop on this wrapper would
 * break `aria-required-children` on the tree inside it. Landmarks belong to the
 * consumers (`AppShell` renders `banner`/`main`/`navigation`) and the tree's own role
 * belongs to `Tree`.
 */

import type { ReactNode } from 'react'

/**
 * Props for {@link Panel}.
 */
interface PanelProps {
  /**
   * Which surface of the design this panel renders.
   *
   * - `'card'`: the plain card surface — the app bar, the project header card and the
   *   body card.
   * - `'tree-container'`: the branch tree box, which clips its content at its own
   *   bounds.
   */
  variant: 'card' | 'tree-container'
  /**
   * Consumer-supplied layout classes — width, height, padding, flex placement and the
   * like. A design value never belongs here; sizing reaches the panel through the token
   * utilities the layout needs (`w-tree-w`, `h-tree-h`, `w-full`, `flex-1`).
   */
  className?: string
  /** Panel contents. */
  children: ReactNode
}

/**
 * The card surface: #FFFFFF fill, 1px #E9E9E9 border, 8px uniform radius.
 *
 * The body card clips its own overflowing content in the design, but that clipping
 * follows from the height a consumer gives it, so a consumer that needs it adds
 * `overflow-hidden` through `className` rather than every card carrying it.
 */
const CARD_CLASSES = 'bg-surface border border-border-subtle rounded-card'

/**
 * The tree container surface: 1px #D9D9D9 border, 12px uniform radius, content clipped.
 *
 * `overflow-hidden` is what produces the design's window — the container's 400px box
 * against a 32px row pitch, so eleven whole rows and the clipped top of a twelfth —
 * and keeping the clipping on this wrapper leaves the scrolling region to the consumer's
 * inner list element, which is the element `scrollable-region-focusable` applies to.
 *
 * BLITZY [COLOR]: Figma declares no fill on this container (it is transparent, over the
 * body card's #FFFFFF); the surface token paints that same interior colour, so the
 * rendered result is identical and the design's flat-surface intent is preserved.
 */
const TREE_CONTAINER_CLASSES =
  'bg-surface border border-border-default rounded-container overflow-hidden'

/** The variant's surface classes, keyed by {@link PanelProps.variant}. */
const VARIANT_CLASSES: Record<PanelProps['variant'], string> = {
  card: CARD_CLASSES,
  'tree-container': TREE_CONTAINER_CLASSES,
}

/**
 * Renders one surface of the design.
 *
 * Presentational only: it takes props and returns markup, calls no hook and imports
 * neither the feature's API client nor the router. Consumers own everything the design
 * does not put on the surface itself — landmarks, sizing, and the roles of the content
 * they place inside.
 *
 * @param props - The surface to render, its layout classes and its contents.
 * @returns The variant's surface with its children inside it.
 */
export function Panel({ variant, className, children }: PanelProps): JSX.Element {
  const variantClasses = VARIANT_CLASSES[variant]

  // Consumer classes are appended last so a layout utility can win over a variant
  // default without having to fight it.
  const classes = className ? `${variantClasses} ${className}` : variantClasses

  return <div className={classes}>{children}</div>
}
