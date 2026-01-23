# Strands Agents Documentation (Starlight)

This is the Strands Agents documentation site built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
starlight/
├── src/
│   ├── assets/          # Logo and static assets
│   ├── content/
│   │   └── docs/        # Documentation markdown files
│   └── styles/          # Custom CSS
├── astro.config.mjs     # Astro configuration with Starlight
├── package.json
└── tsconfig.json
```

## Features

- **Search**: Built-in Pagefind search (excludes API docs by default)
- **Mermaid**: Client-side mermaid diagram rendering
- **Dark/Light Mode**: Automatic theme switching
- **Mobile Responsive**: Full mobile support

## Adding Content

1. Add markdown files to `src/content/docs/`
2. Include frontmatter with at least a `title`:

```markdown
---
title: "My Page Title"
---

# My Page Title

Content goes here...
```

## Configuration

See `astro.config.mjs` for:
- Sidebar navigation
- Social links
- Custom head scripts (mermaid)
- Theme customization
