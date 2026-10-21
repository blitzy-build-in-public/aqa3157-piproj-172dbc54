/**
 * Shared data types for the `Testing for QA` feature.
 *
 * This module is type-only: it imports nothing, declares no runtime value, and
 * carries no design value (no colour, size, token name or class string). It exists
 * so that every model the feature's client, hooks, components and pages exchange has
 * exactly one declaration site, and it is the first artefact of the feature in build
 * order — `api/`, `hooks/`, `components/` and `pages/` all compile against it.
 *
 * The dependency runs one way only: `api/client.ts` imports this module, never the
 * reverse, so the client's own `ApiErrorCode`, `ApiErrorShape` and `ApiError` and the
 * mock's `MockScenario` are declared where they belong and are deliberately absent here.
 */

/**
 * The kind of node a tree row represents.
 *
 * The kind selects the row's icon asset and decides whether the row can carry a
 * selection: `'folder'` and `'repository'` rows expand and collapse, `'branch'` rows
 * can be selected, and `'action'` rows — the `New branch` row and the closed-search
 * `Search` row — are rows in the list that are never selectable.
 *
 * Note: `src/components/ui/TreeRow.tsx` re-declares this same four-literal union
 * locally. That duplication is deliberate, because the shared-primitives layer may
 * import nothing from the feature. The two unions are structurally identical, so a
 * `TreeNode['kind']` value type-checks as `TreeRow`'s own `kind` prop without a cast.
 * Neither union should be changed to remove the duplication.
 */
export type NodeKind = 'folder' | 'repository' | 'branch' | 'action'

/**
 * One rendered row of the repository/branch tree.
 *
 * A node's `level` is the single source of indentation for the tree: no component
 * computes a level of its own.
 */
export interface TreeNode {
  /** Stable identifier, unique within the dataset. */
  id: string
  /** The name rendered as the row's label and used as a path segment. */
  name: string
  /** The kind of node, which selects the row's icon and its selectability. */
  kind: NodeKind
  /** The `id` of the node this one sits inside, or `null` at the tree's root. */
  parentId: string | null
  /**
   * The node's indent level, **0-based**: `platform` is 0, `customer-portal` is 3 and
   * every branch row is 5. The rendered indent is this level multiplied by the theme's
   * per-level indent step, and the row's `aria-level` is `level + 1`. Keep this
   * 0-based; the two derived values, not the components, carry the +1.
   */
  level: number
  /** Whether the node has children, so its row offers an expand/collapse chevron. */
  hasChildren: boolean
  /** Present only when `hasChildren` is `true`; whether the node's children are shown. */
  expanded?: boolean
  /** Present only on `'branch'` rows; whether the branch is the current selection. */
  selected?: boolean
  /** The node's ancestor chain of names, root first. The confirmation path is this chain plus the node's own name. */
  path: string[]
}

/**
 * One window of the tree's rendered rows, plus the cursor that advances it.
 */
export interface TreePage {
  /** The rows in this window. */
  nodes: TreeNode[]
  /**
   * An opaque cursor identifying the next window — the string form of that window's
   * start row index — or `null` when no further rows remain. The window's unit is
   * rendered rows, not nodes: the search position occupies one row, so the first
   * window holds eleven nodes across twelve rows.
   */
  nextCursor: string | null
  /** The total number of rows the list holds, across every window. */
  total: number
}

/**
 * The repository provider the selector renders.
 *
 * The design shows exactly one provider, so this is a pair of literals rather than a
 * general provider union. Both literals must stay identical to `REPOSITORY_ID` and the
 * provider name exported from `api/dataset.ts` and to what `RepositorySelect` renders.
 */
export interface RepositoryProvider {
  /** The provider's identifier. */
  id: 'gitlab-self-managed'
  /** The provider's display label. */
  name: 'GitLab Self-Managed'
}

/**
 * The result of searching the branch list for a query.
 */
export interface BranchSearchResult {
  /** The query the result answers. */
  query: string
  /**
   * The single branch row the query matched, or `null` for the no-match state, which
   * renders `NoMatchRow` rather than a tree row.
   */
  matched: TreeNode | null
  /**
   * The tail folder rows that stay below the result. They are the six tail rows of the
   * unfiltered list, three of which the window clips.
   */
  tail: TreeNode[]
  /** The total number of rows the filtered list holds — one matched row plus the tail. */
  total: number
}

/**
 * The outcome of selecting a branch: the branch itself, its ancestor path and the
 * restored window the tree returns to with the branch selected.
 */
export interface BranchSelection {
  /** The selected branch node. */
  branch: TreeNode
  /**
   * The selected branch's ancestor chain of names, root first — for example
   * `['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-2']` — which the
   * confirmation strip renders as one `/`-joined string.
   */
  path: string[]
  /** The restored list of rows, with the selected branch marked. */
  nodes: TreeNode[]
}

/**
 * One branch, as the item route renders it.
 */
export interface BranchDetail {
  /** The branch's name. */
  name: string
  /** The branch's full ancestor chain of names, root first. */
  path: string[]
}

/**
 * Which page of the tree's rows a screen's preset starts at.
 */
export interface TreeWindow {
  /**
   * The start index of the window, measured in **rendered rows** — not nodes and not
   * pixels. The layout's fixed row pitch and its viewport advance are derived from
   * theme tokens by the container and are never stored here.
   */
  startIndex: number
}

/**
 * The search row's appearance, which selects its fill and border.
 *
 * The `TextInput` primitive's own `state` prop adds a fourth member, `'invalid'`;
 * `BranchSearchRow` derives that from a present `errorMessage` and it does not belong
 * to this union.
 */
export type SearchRowAppearance = 'rest' | 'hover' | 'focused'

/**
 * Everything one screen of the feature decides.
 *
 * A page owns nothing else: it renders the feature's container with a literal preset,
 * and the preset is exhaustive per screen, so a page cannot ask for a state the design
 * does not contain.
 */
export interface ScreenPreset {
  /** Stable key identifying the screen, unique across the feature's routes. */
  key: string
  /** The screen's title, used as the document title while the screen is mounted. */
  title: string
  /** Which page of the tree's rows the screen starts at. */
  treeWindow: TreeWindow
  /**
   * Whether the search field is open. It is `false` on exactly the screens whose design
   * shows the closed `Search` action row in the field's position.
   */
  searchOpen: boolean
  /** The appearance the search row renders with. */
  searchAppearance: SearchRowAppearance
  /** The query the screen seeds the search field with; empty when nothing is seeded. */
  query: string
  /** The `id` of the row a screen marks as selected for display, or `null` for none. */
  highlightRowId: string | null
  /** Whether the repository's branch entries are loaded or still arriving. */
  branchEntries: 'loaded' | 'pending'
  /** Whether the confirmation strip is shown. It is `true` only on the branch-confirmed screen. */
  showConfirmation: boolean
  /** The name of the selected branch, or `null` where no branch is selected. */
  selectedBranchName: string | null
}

/**
 * The status every screen's data access reports, and every row of the state coverage
 * matrix exercises.
 *
 * The states are exhaustive: `loading` renders before anything else so no empty or
 * error content can flash, `empty` and `error` are distinct outcomes that never appear
 * together, and `ready` renders the data. A fifth value, `'not-found'`, is the detail
 * hook's own outcome for an absent item and belongs to that hook's status union, never
 * to this one.
 */
export type ApiStatus = 'loading' | 'ready' | 'empty' | 'error'
