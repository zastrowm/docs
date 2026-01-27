// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import path from 'node:path'
import { loadSidebarFromMkdocs } from './src/sidebar.ts'
import remarkMkdocsSnippets from './src/plugins/remark-mkdocs-snippets.ts'

import AutoImport from 'astro-auto-import'

// Generate sidebar from mkdocs nav (validates against existing content files)
// Top-level groups will be rendered as tabs by the custom Sidebar component
const sidebar = loadSidebarFromMkdocs(
  path.resolve('../mkdocs.yml'),
  path.resolve('./src/content/docs')
)

// https://astro.build/config
export default defineConfig({
  site: 'https://strandsagents.com',
  markdown: {
    remarkPlugins: [remarkMkdocsSnippets],
  },
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
          
          const isDark = () => document.documentElement.dataset.theme === 'dark';
          
          function initMermaid() {
            // Find all mermaid code blocks and convert them
            document.querySelectorAll('pre[data-language="mermaid"]').forEach(pre => {
              const code = pre.querySelector('code');
              const diagram = [...pre.querySelectorAll('code > .ec-line')]
                     .map(it => it.textContent)
                     .join('\\n')
              const div = document.createElement('pre');
              div.className = 'mermaid';
              div.setAttribute('data-original', diagram);
              div.textContent = diagram;
              pre.replaceWith(div);
              console.log("done")
            });
            
            mermaid.initialize({ 
              startOnLoad: false, 
              theme: isDark() ? 'dark' : 'neutral' 
            });
            mermaid.run();
          }
          
          // Run on page load
          initMermaid();
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
  }), AutoImport({
      imports: [
        {
          // Explicitly alias a default export
          // generates:
          // import { default as B } from './src/components/B.astro';
          '@astrojs/starlight/components': [
            ['TabItem', 'Tab']
          ],
          './src/components/AutoSyncTabs.astro': [
            ['default', "Tabs"]
          ]
        },
      ],
    }),],
})