// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import path from 'node:path'
import { loadSidebarFromMkdocs } from './src/sidebar.ts'

// Generate sidebar from mkdocs nav (validates against existing content files)
// Top-level groups will be rendered as tabs by the custom Sidebar component
const sidebar = loadSidebarFromMkdocs(
  path.resolve('../mkdocs.yml'),
  path.resolve('./src/content/docs')
)

// https://astro.build/config
export default defineConfig({
  site: 'https://strandsagents.com',
  integrations: [starlight({
    title: 'Strands Agents SDK',
    description: 'A model-driven approach to building AI agents in just a few lines of code.',
    logo: {
      light: './src/assets/logo-light.svg',
      dark: './src/assets/logo-dark.svg',
      replacesTitle: false,
    },
    social: [
      {
        icon: 'github',
        label: 'GitHub',
        href: 'https://github.com/strands-agents/sdk-python',
      },
    ],
    editLink: {
      baseUrl: 'https://github.com/strands-agents/docs/edit/main/docs',
    },
    head: [
      // Mermaid client-side rendering
      {
        tag: 'script',
        attrs: {
          type: 'module',
        },
        content: `
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
          mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
          
          // Handle theme changes
          const observer = new MutationObserver(() => {
            const isDark = document.documentElement.dataset.theme === 'dark';
            mermaid.initialize({ 
              startOnLoad: false, 
              theme: isDark ? 'dark' : 'neutral' 
            });
            document.querySelectorAll('.mermaid').forEach(el => {
              const svg = el.querySelector('svg');
              if (svg) {
                el.innerHTML = el.getAttribute('data-original') || el.innerHTML;
              }
            });
            mermaid.run();
          });
          observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        `,
      },
    ],
    sidebar,
    customCss: ['./src/styles/custom.css'],
    components: {
      Header: './src/components/Header.astro',
      Sidebar: './src/components/Sidebar.astro',
      MarkdownContent: './src/components/MarkdownContent.astro',
    },
  })],
})
