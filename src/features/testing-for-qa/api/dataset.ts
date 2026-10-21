/**
 * The design's data for the `Testing for QA` feature, declared once.
 *
 * The tree's row content is fixed sample data: the frames draw one specific list, and the
 * build reproduces it row for row so that design fidelity can be checked. That list is
 * declared here and nowhere else — a hook, a component or a test fixture reads these exports
 * rather than restating a row name.
 *
 * The module is data only. It imports nothing but the feature's shared models, declares no
 * behaviour, and carries no design value: no colour, size, radius, type style, token name,
 * class string, React element or Figma node id appears in it.
 *
 * Every export is immutable by contract. The arrays are typed `TreeNode[]` because that is
 * the shape the client and the mock exchange; a consumer that needs a changed node copies it,
 * and nothing in the feature writes to these objects.
 */

import type { NodeKind, TreeNode } from '@/features/testing-for-qa/types'

/**
 * The identifier of the repository provider the repository selector renders.
 *
 * Its value must stay identical to `RepositoryProvider['id']` in
 * `src/features/testing-for-qa/types.ts`, which pairs this id with the label
 * `'GitLab Self-Managed'`. The two are matched by string, so a typo here yields an unmatched
 * provider and a wrong label on screen instead of a type error.
 */
export const REPOSITORY_ID = 'gitlab-self-managed'

/**
 * The kinds the branchless repository view excludes.
 *
 * Only `'folder'` and `'repository'` rows survive that view, so the exclusion is stated once
 * as data rather than repeated as a predicate over row names.
 */
const BRANCHLESS_KINDS: readonly NodeKind[] = ['branch', 'action']

/**
 * The tree's rows in the design's own order: the 29 dataset nodes, plus the derived views
 * built from them.
 *
 * Row arithmetic the rest of the feature derives from this list. The design draws thirty
 * rendered rows — these 29 nodes plus one search position — and the search position sits at
 * row 8, between `New branch` (row 7) and `branch-1` (row 9). The window's unit is rendered
 * rows and not nodes: the first window is rows 1-12, which is eleven nodes plus the search
 * position, and a cursor at row 13 opens rows 13-24, which is `branch-5` through `branch-16`,
 * advancing the viewport exactly 384px (twelve rows at the design's 32px row pitch).
 *
 * Row rules the frames fix. `level` is the design's rendered indent level, not
 * `parentLevel + 1`: the action row and every branch row sit at level 5 under
 * `customer-portal`, which sits at level 3. `expanded` is present only where `hasChildren` is
 * true. `selected` is present only on `branch` rows and is `false` throughout, because this is
 * the unselected state of the design's data — a selection is expressed by the mock's response,
 * never by a rewrite of these nodes. `path` is the node's self-inclusive chain of names, root
 * first, so it already ends with the node's own name and a consumer must not append `name` to
 * it again: `customer-portal` carries
 * `['engineering', 'frontend', 'web-app', 'customer-portal']`, and the confirmation strip
 * renders a branch's chain as one `/`-joined string.
 */
export const TREE_NODES: TreeNode[] = [
  {
    id: 'platform',
    name: 'platform',
    kind: 'folder',
    parentId: null,
    level: 0,
    hasChildren: true,
    expanded: false,
    path: ['platform'],
  },
  {
    id: 'engineering',
    name: 'engineering',
    kind: 'folder',
    parentId: null,
    level: 0,
    hasChildren: true,
    expanded: true,
    path: ['engineering'],
  },
  {
    id: 'backend',
    name: 'backend',
    kind: 'folder',
    parentId: 'engineering',
    level: 1,
    hasChildren: true,
    expanded: false,
    path: ['engineering', 'backend'],
  },
  {
    id: 'frontend',
    name: 'frontend',
    kind: 'folder',
    parentId: 'engineering',
    level: 1,
    hasChildren: true,
    expanded: true,
    path: ['engineering', 'frontend'],
  },
  {
    id: 'web-app',
    name: 'web-app',
    kind: 'folder',
    parentId: 'frontend',
    level: 2,
    hasChildren: true,
    expanded: true,
    path: ['engineering', 'frontend', 'web-app'],
  },
  {
    id: 'customer-portal',
    name: 'customer-portal',
    kind: 'repository',
    parentId: 'web-app',
    level: 3,
    hasChildren: true,
    expanded: true,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal'],
  },
  {
    id: 'new-branch',
    name: 'New branch',
    kind: 'action',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'New branch'],
  },
  {
    id: 'branch-1',
    name: 'branch-1',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-1'],
  },
  {
    id: 'branch-2',
    name: 'branch-2',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-2'],
  },
  {
    id: 'branch-3',
    name: 'branch-3',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-3'],
  },
  {
    id: 'branch-4',
    name: 'branch-4',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-4'],
  },
  {
    id: 'branch-5',
    name: 'branch-5',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-5'],
  },
  {
    id: 'branch-6',
    name: 'branch-6',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-6'],
  },
  {
    id: 'branch-7',
    name: 'branch-7',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-7'],
  },
  {
    id: 'branch-8',
    name: 'branch-8',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-8'],
  },
  {
    id: 'branch-9',
    name: 'branch-9',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-9'],
  },
  {
    id: 'branch-10',
    name: 'branch-10',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-10'],
  },
  {
    id: 'branch-11',
    name: 'branch-11',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-11'],
  },
  {
    id: 'branch-12',
    name: 'branch-12',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-12'],
  },
  {
    id: 'branch-13',
    name: 'branch-13',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-13'],
  },
  {
    id: 'branch-14',
    name: 'branch-14',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-14'],
  },
  {
    id: 'branch-15',
    name: 'branch-15',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-15'],
  },
  {
    id: 'branch-16',
    name: 'branch-16',
    kind: 'branch',
    parentId: 'customer-portal',
    level: 5,
    hasChildren: false,
    selected: false,
    path: ['engineering', 'frontend', 'web-app', 'customer-portal', 'branch-16'],
  },
  {
    id: 'admin-dash',
    name: 'admin-dash',
    kind: 'repository',
    parentId: 'web-app',
    level: 3,
    hasChildren: true,
    expanded: false,
    path: ['engineering', 'frontend', 'web-app', 'admin-dash'],
  },
  {
    id: 'design-system',
    name: 'design-system',
    kind: 'folder',
    parentId: 'frontend',
    level: 2,
    hasChildren: true,
    expanded: false,
    path: ['engineering', 'frontend', 'design-system'],
  },
  {
    id: 'shared-components',
    name: 'shared-components',
    kind: 'folder',
    parentId: 'frontend',
    level: 2,
    hasChildren: true,
    expanded: false,
    path: ['engineering', 'frontend', 'shared-components'],
  },
  {
    id: 'qa',
    name: 'qa',
    kind: 'folder',
    parentId: 'engineering',
    level: 1,
    hasChildren: true,
    expanded: false,
    path: ['engineering', 'qa'],
  },
  {
    id: 'data-science',
    name: 'data-science',
    kind: 'folder',
    parentId: null,
    level: 0,
    hasChildren: true,
    expanded: false,
    path: ['data-science'],
  },
  {
    id: 'infrastructure',
    name: 'infrastructure',
    kind: 'folder',
    parentId: null,
    level: 0,
    hasChildren: true,
    expanded: false,
    path: ['infrastructure'],
  },
]

/**
 * The branchless repository view: the twelve rows the tree renders while the selected
 * repository's branch entries are still arriving.
 *
 * The rows are the six head folders (`platform` down to `customer-portal`) followed by the six
 * tail folders (`admin-dash` down to `infrastructure`), with no branch row and no action row —
 * so the list carries no search position either. The view is reached only through
 * `listTree({ branches: 'pending' })`, which is what the branches-loading screen's preset asks
 * for; no cursor or other argument produces it.
 *
 * It is filtered from `TREE_NODES` rather than retyped, so a row name can never drift between
 * the full list and this view.
 */
export const TREE_NODES_REPOSITORY_VIEW: TreeNode[] = TREE_NODES.filter(
  (node) => !BRANCHLESS_KINDS.includes(node.kind),
)

/**
 * Every branch's full ancestor chain, keyed by branch name.
 *
 * The confirmation strip joins the selected branch's chain with `/` and renders it verbatim —
 * `engineering/frontend/web-app/customer-portal/branch-2` — so every segment is present,
 * unspaced and in root-first order. The values are the branches' own `path` fields from
 * `TREE_NODES`, so the two can never disagree.
 */
export const BRANCH_PATHS: Record<string, string[]> = Object.fromEntries(
  TREE_NODES.filter((node) => node.kind === 'branch').map(
    (node) => [node.name, node.path] as const,
  ),
)
