# ProActive Design System

## Logos

Logo assets live in `assets/logos/` and are referenced through semantic logo tokens in `semantic/logo.json`.

### Files (as uploaded)

- Primary (full color): `assets/logos/primary/proactive-technology-logo-full-color-rgb.svg`
- Mono (one color): `assets/logos/mono/proactive-technology-logo-one-color-rgb.svg`
- Inverse (reverse): `assets/logos/inverse/proactive-technology-logo-reverse-rgb.svg`
- Inverted: `assets/logos/inverted/proactive-technology-logo-inverted-rgb.svg`

### Token keys

Use these keys in templates / components:

- `logo.primary`
- `logo.mono`
- `logo.inverse`
- `logo.inverted`

### Email usage

In HTML email, prefer explicit width and inline styles:

```html
<img src="{logo.primary}" alt="ProActive Technology" width="180" style="display:block;border:0;outline:none;text-decoration:none;" />
```

For dark sections/backgrounds, swap to `logo.inverse`.



## Email templates

See `templates/email/` for token-driven newsletter HTML.
