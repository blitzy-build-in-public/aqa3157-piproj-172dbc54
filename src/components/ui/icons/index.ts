import avatar from './avatar-jonathan-lo.png'
import logo from './blitzy-logo.svg'
import caret from './icon-account-caret-10.svg'
import chat from './icon-chat-23.svg'
import checkCircle from './icon-check-circle-24.svg'
import chevronDown from './icon-chevron-down-24.svg'
import chevronDownTree from './icon-chevron-down-tree-16.svg'
import chevronRight from './icon-chevron-right-16.svg'
import codeAlt from './icon-code-alt-16.svg'
import cog from './icon-cog-24.svg'
import dots from './icon-dots-horizontal-rounded-24.svg'
import file from './icon-file-20.svg'
import folder from './icon-folder-16.svg'
import folderOpen from './icon-folder-open-16.svg'
import gitBranch from './icon-git-branch-16.svg'
import gitlab from './icon-gitlab-logo-16.svg'
import group from './icon-group-23.svg'
import helpCircle from './icon-help-circle-24.svg'
import check from './icon-nav-check-15.svg'
import plus from './icon-plus-16.svg'
import repo from './icon-repo-16.svg'
import search from './icon-search-16.svg'
import x from './icon-x-16.svg'

/**
 * The design's short names for the Figma icon assets in this folder. Every name
 * maps to exactly one asset in {@link ICONS}, and consumers switch over this
 * union exhaustively, so a missing entry is a compile error rather than a
 * silently unrendered glyph.
 */
export type IconName =
  | 'logo'
  | 'chevron-down'
  | 'code-alt'
  | 'help-circle'
  | 'cog'
  | 'file'
  | 'chat'
  | 'group'
  | 'dots'
  | 'caret'
  | 'check'
  | 'gitlab'
  | 'chevron-right'
  | 'chevron-down-tree'
  | 'folder'
  | 'folder-open'
  | 'repo'
  | 'plus'
  | 'search'
  | 'git-branch'
  | 'x'
  | 'check-circle'
  | 'avatar'

/** One Figma asset, addressed by its {@link IconName}. */
export interface IconAsset {
  /**
   * URL Vite resolves for the asset at build time, suitable as a CSS
   * `mask-image` for `mode: 'mask'` and as an `<img src>` for `mode: 'img'`.
   */
  src: string
  /**
   * Size the asset is drawn at, from the design's own node dimensions. These
   * are deliberately not the asset files' rounded view box sizes (the vectors
   * export as `20 x 20`, `23 x 22`, `15 x 12` and `10 x 6`, and the avatar
   * ships as a 64 x 64 raster), because the design's rendered geometry is what
   * the layout is measured against.
   */
  width: number
  height: number
  /**
   * How the asset is painted: `mask` for the single-colour icons, whose ink
   * comes from a theme colour token applied by the consumer, and `img` for the
   * two assets that carry their own fills — the GitLab mark and the avatar.
   */
  mode: 'mask' | 'img'
}

/**
 * Every icon the screens render, keyed by {@link IconName}.
 *
 * `git-branch` is one asset serving two tones: the consumer sets its ink to
 * `color-icon-muted` in tree rows and `color-text-body` in the confirmation
 * strip, so no second key or file exists for it.
 */
export const ICONS: Record<IconName, IconAsset> = {
  logo: { src: logo, width: 25, height: 36, mode: 'mask' },
  'chevron-down': { src: chevronDown, width: 24, height: 24, mode: 'mask' },
  'code-alt': { src: codeAlt, width: 16, height: 16, mode: 'mask' },
  'help-circle': { src: helpCircle, width: 24, height: 24, mode: 'mask' },
  cog: { src: cog, width: 24, height: 24, mode: 'mask' },
  file: { src: file, width: 20, height: 19.1, mode: 'mask' },
  chat: { src: chat, width: 22.79, height: 21.77, mode: 'mask' },
  group: { src: group, width: 22.79, height: 21.77, mode: 'mask' },
  dots: { src: dots, width: 24, height: 24, mode: 'mask' },
  caret: { src: caret, width: 10, height: 5.89, mode: 'mask' },
  check: { src: check, width: 14.41, height: 11.12, mode: 'mask' },
  gitlab: { src: gitlab, width: 16, height: 16, mode: 'img' },
  'chevron-right': { src: chevronRight, width: 16, height: 16, mode: 'mask' },
  'chevron-down-tree': { src: chevronDownTree, width: 16, height: 16, mode: 'mask' },
  folder: { src: folder, width: 16, height: 16, mode: 'mask' },
  'folder-open': { src: folderOpen, width: 16, height: 16, mode: 'mask' },
  repo: { src: repo, width: 16, height: 16, mode: 'mask' },
  plus: { src: plus, width: 16, height: 16, mode: 'mask' },
  search: { src: search, width: 16, height: 16, mode: 'mask' },
  'git-branch': { src: gitBranch, width: 16, height: 16, mode: 'mask' },
  x: { src: x, width: 16, height: 16, mode: 'mask' },
  'check-circle': { src: checkCircle, width: 24, height: 24, mode: 'mask' },
  avatar: { src: avatar, width: 32, height: 32, mode: 'img' },
}
