import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  {
    // Type-aware linting applies only to TypeScript sources, which are the only
    // files covered by a tsconfig project (tsconfig.app.json / tsconfig.node.json).
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // JavaScript config files (this one included) carry no type information.
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    // These modules deliberately export no components for Fast Refresh to preserve.
    files: ['src/app/router.tsx', 'src/components/ui/icons/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
)
