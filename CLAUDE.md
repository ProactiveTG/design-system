# CLAUDE.md - ProActive Design System

## Overview

This is the **ProActive Design System** - an enterprise-grade, token-first design system for ProActive Technology Group. It uses **Style Dictionary** as the build pipeline to transform design tokens into multiple output formats (CSS, JSON, TypeScript).

**Key Principle:** Tokens are the single source of truth. The system does NOT include UI components - those would consume these tokens.

## Quick Reference

```bash
npm ci               # Install dependencies
npm run validate     # Validate tokens against schema
npm run build        # Full build: clean → validate → build
npm run format       # Format code with Prettier
npm run lint         # Run ESLint
```

## Directory Structure

```
design-system/
├── new_tokens/              # SOURCE OF TRUTH - Edit tokens HERE
│   ├── primitives/          # Base tokens (color, font, spacing, etc.)
│   ├── semantic/            # Semantic tokens (logo references)
│   ├── themes/              # Theme variations (4 themes)
│   └── assets/logos/        # Logo SVG assets (primary, mono, inverse, inverted)
├── dist/                    # GENERATED - Never edit manually
│   ├── css/tokens.css       # CSS custom properties
│   ├── json/tokens.flat.json
│   └── ts/tokens.d.ts       # TypeScript definitions
├── scripts/                 # Build automation
│   ├── build-tokens.mjs     # Style Dictionary build pipeline
│   └── validate-tokens.mjs  # Token validation with AJV
├── schemas/                 # JSON Schema definitions
│   └── token.schema.json    # Token file validation schema
├── docs/                    # Documentation
│   └── USAGE.md             # Platform usage guides
├── primitives/              # Legacy location (use new_tokens/ instead)
├── semantic/                # Legacy location (use new_tokens/ instead)
└── themes/                  # Legacy location (use new_tokens/ instead)
```

## Critical Rules

1. **ONLY edit tokens in `new_tokens/`** - This is the source of truth
2. **NEVER edit files in `dist/`** - These are auto-generated
3. **Always validate before building** - Run `npm run validate` first
4. **Use token references** - Use `{path.to.token}` syntax to reference other tokens
5. **Keep semantic naming** - Focus on intent (e.g., `color.text.primary`) over appearance

## Token Architecture

### Three-Layer System

```
Primitives → Semantic → Themes
```

1. **Primitives** (`new_tokens/primitives/`) - Raw values
   - `color.json` - Color palette (neutrals, brand colors)
   - `font.json` - Font sizes, families, weights
   - `spacing.json` - Spacing values
   - `opacity.json` - Opacity with RGBA formats
   - `shadow.json` - Shadow definitions (7 levels)
   - `radius.json` - Border radius
   - `stroke.json` - Border/stroke widths
   - `line_height.json` - Line heights

2. **Semantic** (`new_tokens/semantic/`) - Intent-based tokens
   - `logo.json` - Logo asset references

3. **Themes** (`new_tokens/themes/`) - Color scheme variations
   - `bold_and_luxe.json`
   - `classic_and_clean.json`
   - `modern_and_focused.json`
   - `soft_and_neutral.json`

### Token Format

```json
{
  "color": {
    "brand": {
      "gold": {
        "value": "#f9b62c"
      }
    }
  }
}
```

### Token References

Use curly braces to reference other tokens:

```json
{
  "theme": {
    "accent": {
      "value": "{color.brand.gold}"
    }
  }
}
```

## Build Pipeline

### Full Build Process

```bash
npm run build
```

This runs: `clean` → `validate` → `build:tokens`

### What Gets Generated

| Output | Path | Use Case |
|--------|------|----------|
| CSS Variables | `dist/css/tokens.css` | Web CSS consumption |
| Flat JSON | `dist/json/tokens.flat.json` | React/JS apps |
| Source Map | `dist/json/tokens.source-map.json` | Debug/reference |
| TypeScript | `dist/ts/tokens.d.ts` | Type-safe token names |

### Validation

The validation script (`scripts/validate-tokens.mjs`):
- Validates all JSON against `schemas/token.schema.json`
- Cross-validates logo tokens (checks referenced assets exist)
- Fails build on any validation error

## Code Conventions

### File Naming

- Token files: `lower_snake_case.json` (e.g., `color.json`, `line_height.json`)
- Scripts: `kebab-case.mjs`

### Token Path Naming

- Use `dot.notation` for token paths
- Prefer semantic names: `color.text.primary` over `color.scheme1.text`
- Keep stable - avoid renaming without deprecation strategy

### Code Style

Prettier config (`.prettierrc`):
- Single quotes: `true`
- Semicolons: `true`
- Print width: 100
- Trailing commas: `all`

ESLint allows `console` statements (for build scripts).

## Development Workflow

### Making Token Changes

1. Create a feature branch
2. Edit tokens in `new_tokens/` directory only
3. Run validation: `npm run validate`
4. Run build: `npm run build`
5. Create changeset: `npx changeset`
6. Open PR

### Adding New Tokens

1. Add to appropriate file in `new_tokens/primitives/` or `new_tokens/semantic/`
2. Follow existing token format with `value` property
3. Run `npm run build` to regenerate outputs

### Adding Theme Variations

1. Create new file in `new_tokens/themes/`
2. Reference existing primitive tokens using `{path.notation}`
3. Follow structure of existing theme files

## Technology Stack

| Purpose | Tool | Version |
|---------|------|---------|
| Token Building | Style Dictionary | 4.3.3 |
| Schema Validation | AJV | 8.17.1 |
| Code Formatting | Prettier | 3.3.3 |
| Linting | ESLint | 9.8.0 |
| Versioning | Changesets | 2.27.7 |

**Node Requirement:** >=18

## CI/CD

GitHub Actions runs on PRs and main branch pushes:
1. Setup Node 20 with NPM cache
2. `npm ci`
3. `npm run validate`
4. `npm run build`

## Common Tasks

### Check Token Validity

```bash
npm run validate
```

### Format All Files

```bash
npm run format
```

### Clean Build Directory

```bash
npm run clean
```

### Create a Changeset for Versioning

```bash
npx changeset
```

## Troubleshooting

### Build Fails with Validation Error

- Check JSON syntax in modified files
- Ensure token references (`{path}`) point to existing tokens
- Logo tokens must reference existing files in `new_tokens/assets/logos/`

### Token Not Appearing in Output

- Ensure token has `value` property
- Check file is in `new_tokens/` (not legacy directories)
- Verify JSON structure matches existing patterns

### Reference Resolution Errors

- Style Dictionary resolves `{references}` at build time
- Ensure referenced tokens exist in the build
- Check for circular references

## Key Files to Know

| File | Purpose |
|------|---------|
| `scripts/build-tokens.mjs` | Main build logic (Style Dictionary config) |
| `scripts/validate-tokens.mjs` | Token validation with schema + asset checks |
| `schemas/token.schema.json` | JSON Schema for token files |
| `package.json` | Scripts, dependencies, project config |
| `CONTRIBUTING.md` | Contribution guidelines |
| `docs/USAGE.md` | Platform-specific usage instructions |

## Ownership

- **Team:** `@ProactiveTG/design-system-owners`
- **Security Issues:** See `SECURITY.md`
