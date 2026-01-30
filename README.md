# ProActive Design System (Tokens)

This repository contains the design tokens for the ProActive design system.  Tokens are organized into a hierarchical structure to support multi‑platform usage (Webflow, React, docs) and AI‑driven tooling.

## Directory structure

```
tokens/
  primitives/   # Raw, platform‑agnostic values (color, space, typography, radius, stroke)
  semantic/     # Meaningful aliases that describe usage (text, background, section spacing)
  components/   # Component‑specific tokens (button, card, input, layout)
  themes/       # Placeholders for light/dark themes (unused in this version)
  brand/        # Brand overrides (unused in this version)
```

### Primitives
Primitive tokens define the base values used throughout the system. They should not encode context or semantics—only raw values. For example, `space.3` is `12` and can be applied to any property that expects a spacing unit.

### Semantic tokens
Semantic tokens map meaning to primitives. They describe how the design system should use colors, spacing, or typography in a given context (e.g. `color.text.primary` refers to the primary text color, regardless of its underlying value).

### Component tokens
Component tokens provide guidance for specific UI elements. A `button` uses `color.accent.primary` for its background and `color.text.inverse` for its text, while a `card` uses `color.background.primary` and `color.border.default`.

## Contributing

All design tokens are defined in JSON files. When updating tokens, ensure that you:

1. Define the raw values in `primitives`.
2. Reference primitives in `semantic` definitions.
3. Reference semantic tokens in `components` definitions.

This layered approach keeps tokens maintainable and extensible.