/// <reference types="vite/client" />

// Ambient, not a module: a top-level import or export would stop the interfaces below
// from merging with Vite's own, leaving `import.meta.env` keys untyped.
interface ImportMetaEnv {
  /** Mock scenario default for the feature's in-process API: `normal`, `empty`,
   * `error` or `slow`, the values `.env.example` documents. A route's `?scenario=`
   * query parameter overrides it. */
  readonly VITE_MOCK_SCENARIO?: 'normal' | 'empty' | 'error' | 'slow'
}
