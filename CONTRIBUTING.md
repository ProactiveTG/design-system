# Contributing

## Rules
1. Tokens live in `new_tokens/` only.
2. Generated files live in `dist/` and should not be edited by hand.
3. Keep keys semantic and stable (avoid renaming without deprecation).

## Workflow
1. Create a branch
2. Make token changes in `new_tokens/`
3. Run:
   ```bash
   npm ci
   npm run validate
   npm run build
   ```
4. Add a Changeset:
   ```bash
   npx changeset
   ```
5. Open a PR

## Naming conventions
- Use lower_snake_case for file names.
- Use dot.notation for token paths.
- Prefer semantic names: `color.text.primary` over `color.scheme1.text`.
