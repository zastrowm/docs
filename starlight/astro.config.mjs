// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  site: 'https://strandsagents.com',
  integrations: [
    starlight({
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
      sidebar: [
        {
          label: 'User Guide',
          items: [
            { label: 'Welcome', slug: 'index' },
            {
              label: 'Quickstart',
              items: [
                { label: 'Getting Started', slug: 'user-guide/quickstart/overview' },
                { label: 'Python', slug: 'user-guide/quickstart/python' },
                { label: 'TypeScript', slug: 'user-guide/quickstart/typescript' },
              ],
            },
            {
              label: 'Concepts',
              items: [
                {
                  label: 'Agents',
                  autogenerate: { directory: 'user-guide/concepts/agents' },
                },
                {
                  label: 'Tools',
                  autogenerate: { directory: 'user-guide/concepts/tools' },
                },
                {
                  label: 'Model Providers',
                  autogenerate: { directory: 'user-guide/concepts/model-providers' },
                },
                {
                  label: 'Streaming',
                  autogenerate: { directory: 'user-guide/concepts/streaming' },
                },
                {
                  label: 'Multi-agent',
                  autogenerate: { directory: 'user-guide/concepts/multi-agent' },
                },
                { label: 'Interrupts', slug: 'user-guide/concepts/interrupts' },
                {
                  label: 'Bidirectional Streaming',
                  autogenerate: { directory: 'user-guide/concepts/bidirectional-streaming' },
                },
                {
                  label: 'Experimental',
                  autogenerate: { directory: 'user-guide/concepts/experimental' },
                },
              ],
            },
            {
              label: 'Safety & Security',
              autogenerate: { directory: 'user-guide/safety-security' },
            },
            {
              label: 'Observability & Debugging',
              autogenerate: { directory: 'user-guide/observability-evaluation' },
            },
            {
              label: 'Strands Evals SDK',
              autogenerate: { directory: 'user-guide/evals-sdk' },
            },
            {
              label: 'Deploy',
              autogenerate: { directory: 'user-guide/deploy' },
            },
          ],
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Community',
          autogenerate: { directory: 'community' },
        },
        {
          label: 'Contribute ❤️',
          link: 'https://github.com/strands-agents/sdk-python/blob/main/CONTRIBUTING.md',
          attrs: { target: '_blank' },
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
})
