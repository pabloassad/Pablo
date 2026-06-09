---
name: ckm:ui-styling
description: Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs.
license: MIT
metadata:
  author: claudekit
  version: "1.0.0"
---

# UI Styling

Create beautiful, accessible user interfaces with shadcn/ui + Tailwind CSS.

## When to Use

- Building or styling React UI components
- Setting up shadcn/ui in a project
- Implementing Tailwind CSS design systems
- Creating accessible, responsive layouts
- Dark mode implementation
- Component library setup

## Installation

**shadcn/ui initialization:**
```bash
npx shadcn@latest init
```

**Alternative Vite + Tailwind setup:**
```bash
npm install @tailwindcss/vite
```
Then import Tailwind CSS directly in your entry file.

## Component Implementation

Use composable component primitives with utility-first Tailwind classes:

```tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeatureGrid() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Title</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
```

## Best Practices

- Composable component primitives
- Utility-first styling approach
- Mobile-first responsive design
- Accessibility-first implementation
- Design token consistency
- Dark mode implementation
- Performance optimization through CSS purging
- TypeScript type safety

## Scripts

| Script | Purpose |
|--------|---------|
| `shadcn_add.py` | Component installation helper |
| `tailwind_config_gen.py` | Tailwind configuration generator |

## References

| Topic | File |
|-------|------|
| Components | `references/components.md` |
| Theming | `references/theming.md` |
| Accessibility | `references/accessibility.md` |
| Tailwind Utilities | `references/tailwind-utilities.md` |
| Responsive Design | `references/responsive.md` |

## Integration

**With design-system:** Component tokens → Tailwind config
**With brand:** Brand colors → CSS variables → Tailwind theme

**Resources:** shadcn/ui, Tailwind CSS, Radix UI, Headless UI
