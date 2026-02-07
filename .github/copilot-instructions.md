# Copilot Instructions: Minimal Hugo Theme for Developer & STEAM Blogs

## Project Overview
This Hugo theme is designed for blogs targeting developers and STEAM audiences. It prioritizes simplicity, modern standards, and minimal dependencies. The theme supports Asciidoc content, Hugo’s built-in features, and internationalization (i18n) using Hugo’s standard mechanisms.

## Philosophy & Guidelines
- **Minimalism:** No fancy frameworks, preprocessors, or bloat. Only barebones CSS, HTML, and limited JavaScript.
- **Modern Standards:** Use modern CSS, HTML, and JavaScript features. No support for outdated browsers (e.g., Internet Explorer).
- **No Preprocessing:** Avoid tools like TailWindCSS, SCSS, or JavaScript frameworks. Do not use post/preprocessing for CSS or JS.
- **Simplicity:** Only add JavaScript when absolutely necessary, and keep it minimal.

## Theme Structure
- `assets/` — CSS, fonts, and JavaScript files Hugo treats as resources. Use plain CSS and JS.
- `layouts/` — Hugo templates for pages, partials, and base layouts.
- `static/` — Static files (images, fonts) served as-is.
- `archetypes/` — Default content templates (Asciidoc).
- `i18n/` — Language files for Hugo’s i18n support.

## Key Features
- **Asciidoc Support:** Content is written in Asciidoc, rendered by Hugo and asciidoctor with its extensions.
- **Responsive Design:** Mobile-friendly layouts using modern CSS.
- **Beautiful professionally looking pages:** Use web fonts and CSS for clean, readable typography, optimized for immersive reading. Must be pleasant to read on both desktop and mobile, responsive and modern.
- **Syntax Highlighting:** Prefer the rouge gem, but additionally support highlight.js via simple CSS/JS includes.
- **Navigation & Pagination:** Minimal, accessible navigation and pagination.
- **Internationalization:** Use Hugo’s standard i18n features, nothing custom.

## Contribution Guidelines
- Stick to the project philosophy: minimal, modern, and simple.
- Do not introduce frameworks, preprocessors, or unnecessary dependencies.
- Use plain CSS, HTML, and JavaScript. Only add JS if required for usability.
- Organize code according to the theme structure above.
- Test changes locally using Hugo’s built-in server.
- Reference previous Copilot PRs for context on implemented features.

## Development & Testing
- Install Hugo and Asciidoc (see README.md for details).
- Run `hugo server` to preview changes locally.
- Keep i18n simple: use Hugo’s language files.
- Submit pull requests with clear descriptions and reference relevant issues or previous PRs.

## Out of Scope
- No support for old browsers (e.g., IE).
- No advanced build tools or dependency managers (e.g., nix flake optional, not required).
- No custom i18n or accessibility frameworks beyond Hugo’s basics.
- No fancy CSS processors or JavaScript frameworks.

---

For more details, see README.md and previous Copilot PRs. Keep the theme simple, modern, and developer-friendly.
