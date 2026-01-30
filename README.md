
# ProActive Design System

This repository contains the **ProActive design system** tokens and themes.

The design system is organized into **primitives**, **semantic tokens**, and **themes** to support a scalable and AI‑ready workflow.

## Folder structure

```
new_tokens/
├── primitives/        # Raw values (colors, opacity, font sizes, spacing, radii, strokes)
├── semantic/         # Contextual aliases of primitives (e.g. heading sizes, component radii)
├── themes/           # Theme definitions mapping semantic tokens to brand colors
└── README.md         # This file
```

### Primitives

* **color.json** – Defines the raw color palette. Colors are grouped into **neutral** shades and **brand** colors (`ghost`, `subtle_slate`, `onyx`, `gold`).
* **opacity.json** – Defines opacity levels for white, black (`neutral_darkest`), and gold using rgba notation.
* **font.json** – Provides a scale of font sizes (12–56). These are referenced by semantic tokens.
* **spacing.json** – Contains numeric tokens used for layout: container widths, maximum widths, page/section/button padding, line spacing, and hero padding. Compact variants (`compact`) are provided for tighter layouts.
* **radius.json** – Defines default radii values (`small`, `medium`, `large`) used by components.
* **stroke.json** – Defines stroke widths for borders and dividers.
* **font.json** – Now includes **size**, **family**, and **weight** keys. Use `family.primary` for Space Grotesk and `family.secondary` for Roboto. The `weight` section defines light, normal, semi‑bold, bold, and extra‑bold values.
* **line_height.json** – Defines relative line‑height scales (`xs`=1.2, `sm`=1.3, `md`=1.4, `lg`=1.5).
* **shadow.json** – Provides elevation shadows ranging from `xxsmall` to `xxlarge`.

### Semantic tokens

Semantic tokens map primitives to meaningful usage contexts:

* **typography.json** – Defines sizes for headings and body text (e.g. `heading.xl`, `body.md`) and compact variants (`heading_small`/`body_small`). These reference values from `font.json`.
* **radius.json** – Assigns specific radii to components (e.g. `button`, `card`, `input`) based on the primitive radii.

### Themes

Each theme file maps semantic color roles to specific brand or neutral colors:

* `classic_and_clean.json` – A light theme using `onyx` for text and `white`/`subtle_slate` for backgrounds and borders.
* `bold_and_luxe.json` – A dark theme with white text, dark backgrounds, and gold accents.
* `soft_and_neutral.json` – A light theme using neutral shades and subtle slate as accents.
* `modern_and_focused.json` – A neutral theme with dark text on subtle slate backgrounds and gold accents.

Within each theme, you’ll find keys such as `text.primary`, `foreground`, `background`, `border`, and `accent` mapped to the appropriate color tokens.

## Usage guidelines

1. **Consume primitives via semantic tokens.** Always reference primitives through their semantic aliases (e.g. use `heading.xl` instead of directly using `48`). This makes it easy to update underlying values without changing multiple components.

2. **Use themes for color values.** When applying colors in your UI, reference the roles defined in the current theme (e.g. `color.text.primary`). This ensures your interface adapts to theme changes.

3. **Spacing scale.** Use the spacing tokens consistently. For example, page and section padding values (`page_padding.global`, `section_padding.large`) ensure consistent vertical rhythm. Use compact variants (e.g. `compact_medium`) for dense layouts or mobile screens.

4. **Typography scale.** Use the semantic typography tokens for headings and body text. The `heading_small` and `body_small` variants are ideal for smaller breakpoints or compact layouts.

5. **Customizing tokens.** To add or override tokens for a new theme or brand:
   - Add new values to the appropriate primitives file if needed (e.g. a new color value).
   - Create or update a theme file under `themes/` mapping the semantic roles to your new primitives.
   - If you need new semantic aliases (e.g. for a new component), add them to the relevant file in `semantic/`.

6. **Integrating into your build.** These tokens are stored in plain JSON. You can transform them into CSS variables, TypeScript constants, or platform‑specific formats using tools like [Style Dictionary](https://amzn.github.io/style-dictionary/).

7. **Version control.** Commit the JSON files directly to the repository. Because these files are plain text, merging and reviewing changes is straightforward.

## Updating this README

When you add new tokens or themes:

1. Document the new primitives and semantic tokens here.
2. Update the usage guidelines if there are new categories (e.g. animation tokens, elevations).
3. Ensure naming conventions remain consistent. Use lowercase words separated by underscores and avoid special characters.

---

If you have any questions or need assistance using these tokens in Webflow, React, or your AI platform, please open an issue or reach out to the design system maintainer.

The semantic typography tokens now include a `xxl` size (72px) for display headers, a `tiny` size (14px) for captions or H6, and a `tagline` key (16px). These map back to the new primitives in `font.json`.