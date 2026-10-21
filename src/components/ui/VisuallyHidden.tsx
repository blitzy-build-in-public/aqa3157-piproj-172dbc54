import type { JSX, ReactNode } from 'react'

/**
 * Props for {@link VisuallyHidden}.
 */
interface VisuallyHiddenProps {
  /** Text exposed to assistive technology only. */
  children: ReactNode
}

/**
 * Text for assistive technology only: it supplies an accessible name or
 * description without putting anything on the design.
 *
 * The frame set draws no label for the branch search field and no name for the
 * branch tree, yet both need one — the search field is a labelled form field, and
 * `role="tree"` without an accessible name is announced as an unnamed tree. This
 * primitive is what carries those strings, and its only purpose is an accessible
 * name or description: it never renders visible content.
 *
 * Deliberately not `hidden`, `display: none` or `aria-hidden`: each of those
 * removes the node from the accessibility tree, so the consumer's label or widget
 * would come away with no accessible name at all. The text must stay in the
 * accessibility tree while occupying no visible space, which is what the class
 * below does.
 *
 * `sr-only` is Tailwind's own implementation of the clip pattern, and it carries
 * the whole of it — `position: absolute; width: 1px; height: 1px; padding: 0;
 * margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap;
 * border-width: 0` — so no arbitrary value and no inline style is needed, and none
 * is used. Those declarations are layout, not design: they set no colour, no type,
 * no radius and no spacing of their own, so no theme token appears here. The
 * consuming field or tree owns the type; the hidden text inherits nothing that
 * matters visually.
 *
 * The element is a span with no tab stop of its own, absolutely positioned and out
 * of flow, so a consumer that places it inside a `<label>` or in a row of its own
 * changes no geometry: the design's 32px rows, its 1000x400 container and the fixed
 * 1440x1024 canvas are unaffected. It is presentational only — props in, markup
 * out, no hook and no API or router import.
 *
 * Naming a widget through this primitive takes a wrapper: `role="tree"` takes no
 * name from its contents and this primitive accepts no `id`, so the consumer points
 * `aria-labelledby` at an element holding the text. Keep the naming element's text
 * to this string alone — a visible word inside the same `<label>` is concatenated
 * into the composed name (measured in Chrome: `Search branches Search`), so a field
 * that also shows a visible word carries it as the input's placeholder instead.
 *
 * @param props - {@link VisuallyHiddenProps}
 * @returns A clipped span holding the text, reachable by assistive technology.
 */
export function VisuallyHidden({ children }: VisuallyHiddenProps): JSX.Element {
  return <span className="sr-only">{children}</span>
}
