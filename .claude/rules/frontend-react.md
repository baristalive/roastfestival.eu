# Frontend Development

You are an expert frontend engineer specializing in React, Next.js, TypeScript, and Tailwind CSS. Apply these patterns and principles when working on this codebase.

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with `@theme inline` for custom tokens
- **Fonts**: Google Fonts via `next/font`
- **Build**: Static export mode (`output: "export"`)
- **i18n**: Dictionary-based with `[lang]` dynamic route

## Code Style & Patterns

### Component Structure

```tsx
"use client"; // Only when needed (hooks, interactivity)

import { useParams } from "next/navigation";
// Group imports: React/Next → Internal → Types

export const ComponentName = () => {
  const params = useParams();
  // Hooks first, then derived state, then handlers

  return (
    <section id="section-id" className="...">
      {/* Semantic HTML with accessibility in mind */}
    </section>
  );
};
```

### File Organization

```plain
app/
├── [lang]/
│   ├── sections/     # Page sections (Header, Footer, etc.)
│   ├── components/   # Reusable components for this route
│   └── page.tsx      # Page composition
├── components/       # Global reusable components
├── icons/            # SVG icon components
├── dictionaries/     # i18n JSON files
└── globals.css       # Tailwind config + custom utilities
```

### Tailwind CSS Guidelines

1. **Use Tailwind v4 `@theme inline`** for custom design tokens:

   ```css
   @theme inline {
     --color-primary: #f75c03;
     --font-family-display: "Syne", sans-serif;
     --animate-custom: custom-animation 1s ease infinite;

     @keyframes custom-animation {
       /* keyframes here */
     }
   }
   ```

2. **Prefer Tailwind utilities** over custom CSS classes

3. **Use semantic color names** matching the design system:
   - `bg-midnight`, `text-cream`, `border-teal`, etc.

4. **Responsive design**: Mobile-first with `md:` and `lg:` breakpoints

5. **Custom utilities** in globals.css for complex, reusable patterns:

   ```css
   .punk-border {
     border: 4px solid var(--black);
   }
   ```

### TypeScript Patterns

1. **Always check dictionary types** before accessing properties
2. **Use type guards** for complex union types:

   ```tsx
   type HeadingPart = string | { superscript: string };
   const renderHeading = (parts: HeadingPart[]): string =>
     parts.map((p) => (typeof p === "string" ? p : p.superscript)).join("");
   ```

3. **Avoid `any`** - use proper types or generics
4. **Use `as const`** for literal type inference when needed

### Dictionary/i18n Pattern

```tsx
const params = useParams();
const lang = dictionaries[params.lang as SupportedLanguages];

// Access with fallbacks for optional fields
{
  lang.title || "Default Title";
}

// Check property existence before accessing nested
{
  lang.nav?.about || "About";
}
```

### Component Patterns

1. **Sections** are self-contained with their own `id` for anchor navigation
2. **Use semantic HTML**: `<section>`, `<header>`, `<footer>`, `<nav>`, `<article>`
3. **Keep components focused** - extract sub-components when logic gets complex
4. **Animations** via Tailwind's `animate-*` utilities defined in `@theme inline`

### Styling Conventions

1. **Class order**: Layout → Spacing → Sizing → Typography → Colors → Effects

   ```tsx
   className =
     "flex flex-col gap-4 p-8 text-xl font-bold text-midnight bg-cream rounded-lg shadow-lg";
   ```

2. **Conditional classes** with template literals:

   ```tsx
   className={`base-classes ${condition ? "active-classes" : "inactive-classes"}`}
   ```

3. **Responsive patterns**:

   ```tsx
   className = "text-2xl md:text-4xl lg:text-6xl";
   ```

4. **Hover/focus states**:

   ```tsx
   className = "transition-colors hover:bg-orange focus:ring-2";
   ```

## Best Practices

### Do

- Use `"use client"` only when component needs client-side features
- Keep components pure and side-effect free when possible
- Use CSS custom properties for values that need JS access
- Prefer `Link` from `next/link` for internal navigation
- Use `target="_blank" rel="external"` for external links
- Add `title` and `aria-*` attributes for accessibility

### Don't

- Don't use inline styles except for truly dynamic values
- Don't create new files unless necessary - prefer editing existing
- Don't add unnecessary abstractions for one-time use
- Don't use `className` string concatenation with `+` - use template literals
- Don't forget to handle loading and error states

## Design System Colors

| Token      | Hex       | Usage                       |
| ---------- | --------- | --------------------------- |
| `midnight` | `#04151f` | Primary dark, text on light |
| `cream`    | `#efd6ac` | Background, text on dark    |
| `teal`     | `#04a777` | Accent, success states      |
| `burgundy` | `#89023e` | Accent, emphasis            |
| `orange`   | `#f75c03` | Primary action, CTA         |

## Animation Guidelines

- Use CSS animations defined in `@theme inline` for performance
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` when possible
- Common patterns: `animate-float`, `animate-pop`, `animate-marquee`

## Testing Changes

After making changes, verify:

1. No TypeScript errors (`npx tsc --noEmit`)
2. Linting passes (`npm run lint`)
3. Visual check in browser (`npm run dev`)
4. Responsive behavior at different breakpoints
5. Both language versions work (`/cz` and `/en`)
