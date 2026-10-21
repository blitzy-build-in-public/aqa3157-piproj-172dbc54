/**
 * The no-match row of the branch tree: the design's literal text `Branch not found`,
 * rendered where the matched branch row would otherwise sit.
 *
 * Source of truth: Figma file `91TpUu5OYVLFkPdcBCmOUu`, frame set `48966-14667`,
 * screen / node `48966:70150` (flow "Branch-level search (Leaf node)", step 4), row `48966:70337`.
 *
 * This component is deliberately a plain row element with **no ARIA role**: ARIA permits
 * `role="tree"` to own only `treeitem` and `group` children, so a `treeitem` rendered outside
 * the `tree` element fails axe's `aria-required-parent` rule. The panel therefore places this
 * row in its status region, a sibling of the tree element, at the design's own row geometry.
 *
 * The design draws no icon and no call to action in this row: the git-branch glyph exists in the
 * frame's structure but paints white on the white row and renders nothing, and the frame contains
 * no button, link, count or trailing control. The empty-state call to action required by the
 * request belongs to the panel's status message, not here, and is not added.
 */

/** Props for {@link NoMatchRow}. */
export interface NoMatchRowProps {
  /** The message text; the design's literal is "Branch not found". */
  message: string
}

/**
 * Renders the design's `Branch not found` row.
 *
 * Geometry reproduces the shared tree row template: 32 tall, 12 inline padding, 4 block padding,
 * a 4 gap, and one 28-wide indent per tree level. The label sits at the level-5 position, matching
 * the frame exactly (five indent steps plus one empty icon slot before the text).
 *
 * @param props - {@link NoMatchRowProps}
 */
export function NoMatchRow({ message }: NoMatchRowProps) {
  return (
    <div className="flex h-row-h w-full items-center gap-row-gap py-1 ps-row-pad-x pe-row-pad-x">
      {/* Indent spacers for tree levels 0-4: five empty 24-wide slots, as the frame declares them. */}
      <span className="size-slot" aria-hidden="true" />
      <span className="size-slot" aria-hidden="true" />
      <span className="size-slot" aria-hidden="true" />
      <span className="size-slot" aria-hidden="true" />
      <span className="size-slot" aria-hidden="true" />
      {/* The icon slot stays empty: the frame's git-branch glyph paints white and renders nothing. */}
      <span className="size-slot" aria-hidden="true" />
      <span className="text-body text-text-muted">{message}</span>
    </div>
  )
}
