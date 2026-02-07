# CSS Architecture: Intrinsic and Container-Driven Layout

## Overview

This theme uses a modern, intrinsic CSS architecture that eliminates fixed breakpoints in favor of fluid, container-driven layouts. This approach provides better adaptability across all viewport sizes without hardcoded media query breakpoints.

## Key Principles

### 1. Fluid Typography with `clamp()`

Instead of fixed font sizes at specific breakpoints, we use `clamp()` to create fluid typography that scales smoothly:

```css
font-size: clamp(min, preferred, max);
```

Example:
```css
--body-font-size: clamp(1.0625em, 1rem + 0.25vw, 1.125em);
/* Fluid between 17px and 18px based on viewport */
```

### 2. Container Queries

Where supported, we use CSS Container Queries to make components responsive to their container size rather than viewport size:

```css
@supports (container-type: inline-size) {
  main {
    container-type: inline-size;
    container-name: main-content;
  }

  @container main-content (min-width: 1360px) {
    /* Styles applied based on container width */
  }
}
```

This allows components to adapt based on available space, making them truly modular and reusable.

### 3. Fallback Support

For browsers that don't support container queries, we provide fallback media queries:

```css
@supports not (container-type: inline-size) {
  @media screen and (min-width: 1360px) {
    /* Fallback styles */
  }
}
```

### 4. Fluid Spacing and Sizing

We use `clamp()` and `min()` for spacing and sizing to create layouts that adapt smoothly:

```css
max-width: min(800px, 95vw);
padding: 0 clamp(0.5rem, 2vw, 1rem);
gap: clamp(0.4rem, 1vw, 0.6rem);
```

### 5. Semantic Breakpoints

When media queries are necessary, we use semantic rem-based breakpoints that relate to content needs rather than device sizes:

- `48rem` (~768px) - Typical tablet/small desktop threshold
- `64rem` (~1024px) - Desktop threshold

## File Structure

### Core Variables (`vars.css`)

Contains all CSS custom properties with fluid sizing:
- Fluid font sizes using `clamp()`
- Responsive spacing using viewport units
- Flexible width constraints

### Foundation (`base.css`)

Base element styles without media queries. Typography scales fluidly based on CSS variables.

### Layout Components

- **`body.css`**: Main layout structure with container support
- **`main.css`**: Content area with container queries for TOC display
- **`nav.css`**: Navigation with progressive enhancement
- **`header.css`**: Navbar with semantic breakpoints
- **`doc.css`**: Document content with fluid typography

### UI Components

- **`toc.css`**: Table of contents with container query support
- **`toolbar.css`**: Toolbar with fluid sizing
- **`pagination.css`**: Pagination controls
- **`breadcrumbs.css`**: Breadcrumb navigation
- **`preview.css`**: Blog preview cards with container queries
- **`share.css`**: Share buttons with fluid sizing

## Benefits

1. **No Fixed Breakpoints**: Layout adapts smoothly at any viewport size
2. **Container-Aware**: Components respond to available space, not viewport
3. **Better Maintainability**: Fewer media queries to manage
4. **Progressive Enhancement**: Fallbacks for older browsers
5. **Fluid Scaling**: Typography and spacing scale smoothly
6. **Component Modularity**: Components work in any context

## Browser Support

- **Container Queries**: Supported in Chrome 105+, Safari 16+, Firefox 110+
- **Fallback**: Media queries for older browsers
- **clamp()**: Widely supported (IE excluded)
- **CSS Custom Properties**: All modern browsers

## Development Guidelines

### Adding New Components

1. Start with intrinsic sizing (no media queries)
2. Use fluid units (`clamp()`, `%`, `vw`, `vh`)
3. Add container queries if component needs responsive behavior
4. Provide media query fallback for older browsers
5. Test at various sizes, not just common breakpoints

### Updating Existing Components

1. Identify hardcoded breakpoints
2. Replace with fluid sizing where possible
3. Use container queries for container-responsive behavior
4. Keep media query fallback
5. Test smooth transitions between sizes

## Examples

### Before (Fixed Breakpoints)

```css
.component {
  font-size: 14px;
}

@media screen and (min-width: 768px) {
  .component {
    font-size: 16px;
  }
}

@media screen and (min-width: 1024px) {
  .component {
    font-size: 18px;
  }
}
```

### After (Intrinsic)

```css
.component {
  font-size: clamp(0.875rem, 0.8rem + 0.5vw, 1.125rem);
  /* Smoothly scales from 14px to 18px */
}
```

### Using Container Queries

```css
/* Make container queryable */
.parent {
  container-type: inline-size;
  container-name: my-component;
}

/* Respond to container size */
@container my-component (min-width: 40rem) {
  .child {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## Resources

- [MDN: CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [Every Layout: The principles of intrinsic web design](https://every-layout.dev/)
- [Utopia: Fluid Responsive Design](https://utopia.fyi/)

## Migration Notes

This refactoring maintains backward compatibility through:
1. Fallback media queries for browsers without container query support
2. Graceful degradation of fluid sizing
3. No HTML changes required
4. Same visual appearance across supported browsers

The main difference users will notice is smoother responsive behavior without "jumps" at specific breakpoints.
