import type { ReactNode } from 'react'

/**
 * Props for {@link PanelHeading}.
 */
export interface PanelHeadingProps {
  /**
   * The section heading, rendered as an `h2`.
   *
   * Figma draws it with the `Heading/Desktop/H5` style — Inter SemiBold 600 at the theme's h5
   * size token — so it sits one level below the page's `h1` (the project name, Figma node
   * `48966:64375`). The two groups that use this component, `Connect codebase` and
   * `Environment setup`, are top-level sections of the right panel, which is why the element is
   * an `h2` and not an `h5`.
   */
  heading: string
  /** The muted sentence beneath the heading: one short paragraph of supporting copy. */
  children: ReactNode
}

/**
 * A section heading with its muted sentence — the feature's heading group.
 *
 * Renders a column of an `h2` over a paragraph, the two held apart by the theme's heading-group
 * gap. Both heading groups of the `Connect codebase` page are this component, and the Figma
 * groups are plain frames: no fill, border, radius, shadow, icon or other decoration, and no
 * breakpoint, since the design is a fixed desktop canvas.
 *
 * Layout comes from the design and every value from the theme token layer: the heading's type
 * and colour from the h5 type token and the strong text token, the sentence's from the body type
 * token and the muted text token. The group's own width and the surrounding panel padding belong
 * to the component that composes it, not here.
 *
 * Figma: file `91TpUu5OYVLFkPdcBCmOUu`, screen `48966:64339` ("Branch pagination + search"),
 * heading groups `48966:64448` (heading `48966:64449`, sentence `48966:64450`) and `48966:64689`
 * (heading `48966:64690`, sentence `48966:64691`).
 */
export function PanelHeading({ heading, children }: PanelHeadingProps) {
  return (
    <div className="flex flex-col gap-heading-gap">
      <h2 className="text-heading-h5 text-text-strong">{heading}</h2>
      {/* BLITZY [A11Y]: the design paints this sentence in its light muted grey, which measures
          below the WCAG 2.1 AA minimum for normal text on the panel surface. The muted
          foreground token — a darker grey taken from the design's own palette, 5.74:1 on the
          surface — is used here instead, so the design's lighter grey must not be restored. */}
      <p className="text-body text-text-muted">{children}</p>
    </div>
  )
}
