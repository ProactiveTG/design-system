# ProActive Design System

Enterprise-grade, token-first design system for ProActive Technology Group.

## What's included
- **Design tokens** (source of truth): `new_tokens/`
- **Brand assets**: `new_tokens/assets/` (logos, fonts)
- **Build outputs** (generated): `dist/`
- **Tooling**: Style Dictionary build pipeline + token validation

## Quick start

### 1) Install
```bash
npm install
```

### 2) Build tokens
```bash
npm run build
```

### 3) Use outputs
- CSS variables: `dist/css/tokens.css`
- JSON (resolved): `dist/json/tokens.resolved.json`
- TypeScript typings: `dist/ts/tokens.d.ts`

## Repo conventions
- Do **not** hand-edit `dist/` outputs. They are generated.
- Update tokens only in `new_tokens/`.
- Use semantic token keys (e.g. `color.text.primary`) in components.

## Versioning
This repo is set up for **semantic versioning** with Changesets.

## Support
Questions or changes: open a PR and follow `CONTRIBUTING.md`.
