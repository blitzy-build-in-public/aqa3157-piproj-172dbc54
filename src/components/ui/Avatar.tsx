import type { JSX } from 'react'

/**
 * Props for {@link Avatar}.
 *
 * The box, the round mask and the hairline ring are theme-driven; only the
 * image itself and its accessible name come from the caller.
 */
interface AvatarProps {
  /** Accessible name for the image, e.g. the account holder's display name. */
  alt: string
  /**
   * Image source, resolved by the caller from the icon asset map
   * (`ICONS.avatar.src`). It is passed in rather than imported here so this
   * primitive stays free of the asset subfolder's file layout.
   */
  src: string
  /** The design defines a single size: 32×32. */
  size: 'md'
}

/**
 * Tailwind classes per {@link AvatarProps.size}. Each size's box is a theme
 * token, so no dimension is written as a literal.
 */
const SIZE_CLASS: Record<AvatarProps['size'], string> = {
  md: 'size-avatar rounded-avatar',
}

/**
 * The account avatar: the design's 32×32 portrait, clipped to a circle by the
 * `radius-avatar` token and outlined by the 0.5px `color-avatar-ring` hairline.
 *
 * The hairline is an inset ring rather than the element's border. A border
 * cannot be painted below 1px — the browser floors a sub-pixel border width, so
 * the design's 0.5px stroke would render at double weight — whereas a 0.5px
 * ring spread is honoured. An inset ring is painted beneath a replaced
 * element's content, so the image carries a hairline padding of the same width
 * to expose it. That also reproduces the design, where the stroke covers the
 * raster's outer 0.5px and leaves a 31px visible portrait.
 *
 * It renders the caller-supplied `src` verbatim and keeps the raster's own
 * colours — the avatar is one of the two assets that must never be masked or
 * recoloured (the GitLab mark is the other), which is why its ink is not a
 * theme colour. Presentational only and not focusable: the account card's own
 * text and controls carry the interaction.
 */
/* BLITZY [LAYOUT]: the hairline is an inset ring exposed by an equal hairline
   padding. An inset shadow is painted beneath a replaced element's content, so
   without the padding the design's 0.5px stroke is occluded by the image
   (measured: only a quarter of its ink survives); a 0.5px border is instead
   floored to 1px by the browser (measured: double the design's weight). The
   residual divergence is sub-pixel and shows only at devicePixelRatio 1, where
   the 31px content box can snap to the pixel grid; at dpr >= 2 the ring and the
   raster both match the design. */
export function Avatar({ alt, src, size }: AvatarProps): JSX.Element {
  return (
    <img
      alt={alt}
      src={src}
      className={`${SIZE_CLASS[size]} p-hairline ring-hairline ring-avatar-ring ring-inset`}
    />
  )
}
