import type { JSX } from 'react'

/**
 * Props for {@link Divider}.
 */
export interface DividerProps {
  /**
   * Rule direction. Every rule the design draws is horizontal — the wizard
   * connectors and the section rule above `Environment setup` — so this is the
   * only accepted value: anything else is a compile error rather than a rule
   * that silently renders nothing.
   */
  orientation: 'horizontal'
}

/**
 * The class list for each {@link DividerProps.orientation}, so the property's
 * one value selects its geometry explicitly and no branch is left implicit.
 *
 * `h-px` is the design's 1px thickness and `w-full` its Fill Container width.
 * `border-0` cancels the 1px top border Tailwind's preflight gives an `hr`,
 * which would otherwise draw the rule 2px tall in the inherited text colour.
 * `bg-border-default` paints the stroke with the design's divider colour.
 * Deliberately absent: a fill beyond that stroke, a radius and a shadow — no
 * rule node in the frame set carries any of them.
 */
const ORIENTATION_CLASS: Record<DividerProps['orientation'], string> = {
  horizontal: 'h-px w-full border-0 bg-border-default',
}

/**
 * A 1px rule spanning its container, in the design's divider colour.
 *
 * Renders the frame set's divider nodes — the wizard connector rules and the
 * section rule above `Environment setup` — as 1px of `color-border-default` with
 * no fill of its own, no radius and no shadow, which is what every rule node in
 * the design carries. The rule is decorative and is hidden from assistive
 * technology: an `hr` with no accessible name would be announced as a meaningful
 * separator, while these rules carry only visual spacing.
 *
 * Two of the design's 1px lines are deliberately not drawn with this component.
 * Container and card borders — including the split the design puts between the
 * navigation panel and the right panel — are painted in the subtle-border colour
 * on the box that owns that edge, which is not this rule's divider colour. The
 * confirmation strip's top-only border belongs to the strip, which also carries a
 * bottom radius this rule has none of. This rule spans its container and takes no
 * spacing of its own: the design gives each connector its own width, so a
 * consumer that needs one wraps it in a container sized as the design shows.
 */
export function Divider({ orientation }: DividerProps): JSX.Element {
  return <hr aria-hidden="true" className={ORIENTATION_CLASS[orientation]} />
}
