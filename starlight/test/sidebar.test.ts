import { describe, it, expect } from 'vitest'
import path from 'node:path'
import { loadSidebarFromMkdocs, loadMultiSidebarFromMkdocs, getTabsFromMkdocs, convertNavItem, mdPathToSlug, type StarlightSidebarItem } from '../src/sidebar'

describe('Sidebar Generation', () => {
  it('should generate sidebar structure from mkdocs.yml', () => {
    const sidebar = loadSidebarFromMkdocs(path.resolve('../mkdocs.yml'))
    
    console.log('\n=== Generated Sidebar Structure ===\n')
    console.log(JSON.stringify(sidebar, null, 2))
    
    expect(sidebar).toBeDefined()
    expect(Array.isArray(sidebar)).toBe(true)
    expect(sidebar.length).toBeGreaterThan(0)
  })

  it('should generate multi-sidebar structure from mkdocs.yml', () => {
    const multiSidebar = loadMultiSidebarFromMkdocs(path.resolve('../mkdocs.yml'))
    
    console.log('\n=== Generated Multi-Sidebar Structure ===\n')
    console.log(JSON.stringify(multiSidebar, null, 2))
    
    expect(multiSidebar).toBeDefined()
    expect(typeof multiSidebar).toBe('object')
    
    // Should have path-keyed sections
    const keys = Object.keys(multiSidebar)
    expect(keys.length).toBeGreaterThan(0)
    
    // Keys should be path-like (start and end with /)
    for (const key of keys) {
      expect(key.startsWith('/')).toBe(true)
      expect(key.endsWith('/')).toBe(true)
    }
  })

  it('should extract tabs from mkdocs.yml', () => {
    const tabs = getTabsFromMkdocs(path.resolve('../mkdocs.yml'))
    
    console.log('\n=== Generated Tabs ===\n')
    console.log(JSON.stringify(tabs, null, 2))
    
    expect(tabs).toBeDefined()
    expect(Array.isArray(tabs)).toBe(true)
    expect(tabs.length).toBeGreaterThan(0)
    
    // Each tab should have label, slug, and items
    for (const tab of tabs) {
      expect(tab.label).toBeDefined()
      expect(tab.slug).toBeDefined()
      expect(tab.items).toBeDefined()
      expect(Array.isArray(tab.items)).toBe(true)
    }
  })

  it('should convert README.md to index slug', () => {
    expect(mdPathToSlug('README.md')).toBe('index')
    expect(mdPathToSlug('examples/README.md')).toBe('examples')
  })

  it('should strip .md extension and handle index files', () => {
    expect(mdPathToSlug('user-guide/quickstart/overview.md')).toBe('user-guide/quickstart/overview')
    expect(mdPathToSlug('user-guide/concepts/tools/index.md')).toBe('user-guide/concepts/tools')
  })

  it('should handle external links', () => {
    const item = convertNavItem({ 'Contribute ❤️': 'https://github.com/example' })
    expect(item).toEqual({
      label: 'Contribute ❤️',
      link: 'https://github.com/example',
      attrs: { target: '_blank' },
    })
  })

  it('should handle nested items', () => {
    const item = convertNavItem({
      'Quickstart': [
        { 'Getting Started': 'overview.md' },
        { 'Python': 'python.md' },
      ]
    })
    expect(item).toEqual({
      label: 'Quickstart',
      items: [
        { label: 'Getting Started', slug: 'overview' },
        { label: 'Python', slug: 'python' },
      ]
    })
  })
})
