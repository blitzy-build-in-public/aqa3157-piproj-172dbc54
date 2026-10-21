import type { CSSProperties } from 'react'

import { ICONS, type IconName } from '@/components/ui/icons'

/**
 * Props for {@link Icon}.
 */
export interface IconProps {
  /**
   * Which Figma asset to paint, named from the asset map's closed key set, so an
   * unknown glyph is a compile error rather than an empty box.
   */
  name: IconName
  /**
   * The box the asset is drawn in, in the token layer's own dimensions: `sm` 16px,
   * `md` 24px, `check` 14.41x11.12px, `caret` 10x5.89px, `file` 20x19.1px, `chat`
   * 22.79x21.77px (`chat` and `group` share the last). Pass the size the design gives
   * the glyph's own node; the asset keeps its aspect ratio inside the box.
   */
  size: 'sm' | 'md' | 'check' | 'caret' | 'file' | 'chat'
  /**
   * Ink for a single-colour glyph: `muted` (color-icon-muted), `primary`
   * (color-primary), `body` (color-text-body) or `surface` (color-surface, the white
   * glyph on a filled control). Ignored by the two assets that carry their own
   * colours — the GitLab mark and the avatar. Defaults to `muted`.
   */
  tone?: 'muted' | 'primary' | 'body' | 'surface'
  /**
   * Accessible name for a glyph that carries meaning. Omit it for a decorative glyph,
   * which is then hidden from assistive technology.
   */
  alt?: string
}

/**
 * Box size per size token, written as literal class names so Tailwind emits every
 * rule (`--width-*` and `--height-*` drive `w-*` and `h-*`; `--spacing-icon-*` drives
 * `size-*`).
 *
 * These six are the dimensions the screens draw. The logo's 25x36 mark and the
 * avatar's 32x32 raster have no member here and no size token to fall back on, so a
 * caller draws them in the nearest box: `mask-size: contain` then keeps their aspect
 * ratio intact rather than distorting them. A literal or an arbitrary-value utility
 * for either would put a design value outside the token layer.
 */
const SIZE_CLASSES: Record<IconProps['size'], string> = {
  sm: 'size-icon-sm',
  md: 'size-icon-md',
  check: 'w-icon-check h-icon-check',
  caret: 'w-icon-caret h-icon-caret',
  file: 'w-icon-file h-icon-file',
  chat: 'w-icon-chat h-icon-chat',
}

/**
 * Ink per tone token, applied to a masked glyph only.
 *
 * `muted` is `--color-icon-muted` (#666666) and not the design's #999999: #999999
 * misses the contrast the required WCAG 2.1 AA criterion sets on every surface it is
 * painted on, while #666666 is the design's own value for a muted glyph and clears it.
 * This is the one design value the build deliberately does not reproduce.
 */
const TONE_CLASSES: Record<NonNullable<IconProps['tone']>, string> = {
  muted: 'bg-icon-muted',
  primary: 'bg-primary',
  body: 'bg-text-body',
  surface: 'bg-surface',
}

/** The masked box itself: it needs a box, and a glyph must not be squashed by a flex row. */
const MASK_CLASSES = 'inline-block shrink-0'

/** The image box, whose own colours stay untouched. */
const IMAGE_CLASSES = 'block shrink-0 object-contain'

/**
 * Mask properties for one asset. The URL is the single value no class can express —
 * it is a build-time module import — so it is passed through `style`; the ink
 * (`bg-*`) and the box (`size-*`) stay theme classes.
 *
 * `mask-size: contain` and not `100% 100%`: reproducing the design's stretch of a
 * vector into its node box would be within a pixel for the six token sizes but a
 * visible distortion wherever an asset is drawn in a box that is not its own shape.
 * Containment keeps every glyph's aspect ratio.
 */
function maskStyle(src: string): CSSProperties {
  return {
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
  }
}

/**
 * Paints one Figma icon asset in a token size and a token ink.
 *
 * A single-colour glyph is painted as a CSS mask over a token-coloured box rather
 * than as an image: the exported vectors carry hard-coded fills with no
 * `currentColor` (the design paints the branch glyph from one component as #999999
 * in the tree rows and #333333 in the confirmation strip), so masking is what lets a
 * single asset take its ink from a theme token. The GitLab mark and the avatar carry
 * their own colours and render as an image instead.
 *
 * Presentational: props in, markup out — no hook, no data, no focus.
 */
export function Icon({ name, size, tone = 'muted', alt }: IconProps): JSX.Element {
  const entry = ICONS[name]

  if (entry.mode === 'img') {
    return (
      <img
        src={entry.src}
        alt={alt ?? ''}
        aria-hidden={alt ? undefined : true}
        width={entry.width}
        height={entry.height}
        draggable={false}
        className={`${IMAGE_CLASSES} ${SIZE_CLASSES[size]}`}
      />
    )
  }

  return (
    <span
      role={alt ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      className={`${MASK_CLASSES} ${SIZE_CLASSES[size]} ${TONE_CLASSES[tone]}`}
      style={maskStyle(entry.src)}
    />
  )
}
