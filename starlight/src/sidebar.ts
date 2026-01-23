import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

// Starlight-compatible sidebar item types
export type StarlightSidebarItem = 
  | { label: string; slug: string; attrs?: Record<string, string> }  // Internal link
  | { label: string; link: string; attrs?: Record<string, string> }  // External link
  | { label: string; items: StarlightSidebarItem[] }                 // Group

// Internal type for conversion (before we know if it's a link or group)
interface SidebarItemInternal {
  label: string
  slug?: string
  link?: string
  items?: SidebarItemInternal[]
  attrs?: Record<string, string>
}

export interface TabConfig {
  label: string
  slug: string  // The root slug for this tab (e.g., 'user-guide')
  items: StarlightSidebarItem[]
}

export type MultiSidebar = Record<string, StarlightSidebarItem[]>

// Content directory for checking file existence
let contentDir = ''

/**
 * Check if a slug has a corresponding content file
 */
function contentExists(slug: string): boolean {
  if (!contentDir) return true
  
  // Check for .md, .mdx, or directory with index
  const possiblePaths = [
    path.join(contentDir, `${slug}.md`),
    path.join(contentDir, `${slug}.mdx`),
    path.join(contentDir, slug, 'index.md'),
    path.join(contentDir, slug, 'index.mdx'),
  ]
  
  return possiblePaths.some(p => fs.existsSync(p))
}

/**
 * Convert mkdocs md path to Starlight slug
 */
export function mdPathToSlug(mdPath: string): string {
  let slug = mdPath.replace(/\.md$/, '')
  
  // Handle README.md -> index
  if (slug === 'README' || slug.endsWith('/README')) {
    slug = slug === 'README' ? 'index' : slug.replace(/\/README$/, '')
  }
  
  // Handle index.md files
  if (slug.endsWith('/index')) {
    slug = slug.replace(/\/index$/, '')
  }
  
  return slug
}

/**
 * Convert internal item to Starlight-compatible format
 */
function toStarlightItem(item: SidebarItemInternal): StarlightSidebarItem {
  if (item.link) {
    return { label: item.label, link: item.link, ...(item.attrs && { attrs: item.attrs }) }
  }
  if (item.items) {
    return { label: item.label, items: item.items.map(toStarlightItem) }
  }
  // Must have slug
  return { label: item.label, slug: item.slug!, ...(item.attrs && { attrs: item.attrs }) }
}

/**
 * Convert mkdocs nav item to sidebar item (internal format)
 */
export function convertNavItem(item: unknown): SidebarItemInternal | null {
  // String item: "path.md" - use filename as label
  if (typeof item === 'string') {
    const slug = mdPathToSlug(item)
    if (!contentExists(slug)) return null
    return {
      label: item.replace(/\.md$/, '').split('/').pop() || item,
      slug,
    }
  }

  // Object item: { "Label": "path.md" } or { "Label": [...] }
  if (typeof item === 'object' && item !== null) {
    const [label, value] = Object.entries(item)[0]

    // External link
    if (typeof value === 'string' && value.startsWith('http')) {
      return {
        label,
        link: value,
        attrs: { target: '_blank' },
      }
    }

    // Empty array (placeholder like Python API)
    if (Array.isArray(value) && value.length === 0) {
      return null
    }

    // Single file: { "Label": "path.md" }
    if (typeof value === 'string') {
      const slug = mdPathToSlug(value)
      if (!contentExists(slug)) return null
      return {
        label,
        slug,
      }
    }

    // Nested items: { "Label": [...] }
    if (Array.isArray(value)) {
      const items = (value as unknown[]).map(convertNavItem).filter((i): i is SidebarItemInternal => i !== null)
      // Skip empty groups
      if (items.length === 0) return null
      return {
        label,
        items,
      }
    }
  }

  return null
}

/**
 * Derive a URL-friendly path key from a tab label
 * e.g., "User Guide" -> "/user-guide/"
 */
function labelToPathKey(label: string): string {
  return '/' + label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '/'
}

/**
 * Detect the root path from the first content item in a nav section
 * Skips 'index' slugs and looks for actual path prefixes
 */
function detectRootPath(items: SidebarItemInternal[]): string | null {
  for (const item of items) {
    if (item.slug && item.slug !== 'index') {
      // Get the first path segment
      const firstSegment = item.slug.split('/')[0]
      if (firstSegment) return '/' + firstSegment + '/'
    }
    if (item.items) {
      const nested = detectRootPath(item.items)
      if (nested) return nested
    }
  }
  return null
}

/**
 * Load and parse mkdocs.yml, returning a flat sidebar config
 * @param mkdocsPath - Path to mkdocs.yml
 * @param docsContentDir - Path to src/content/docs for validating file existence (optional)
 */
export function loadSidebarFromMkdocs(mkdocsPath: string, docsContentDir?: string): StarlightSidebarItem[] {
  // Set content directory for validation
  contentDir = docsContentDir || ''
  
  let mkdocsContent = fs.readFileSync(mkdocsPath, 'utf-8')
  
  // Strip Python-specific YAML tags that js-yaml can't handle
  mkdocsContent = mkdocsContent.replace(/!!python\/[^\s]+/g, '')
  
  const mkdocs = yaml.load(mkdocsContent) as { nav: unknown[] }
  
  return mkdocs.nav
    .map(convertNavItem)
    .filter((i): i is SidebarItemInternal => i !== null)
    .filter(item => !item.link?.endsWith('.html'))
    .map(toStarlightItem)
}

/**
 * Load mkdocs.yml and return a multi-sidebar config for Starlight tabs
 * Each top-level nav section becomes a tab with its own sidebar
 * @param mkdocsPath - Path to mkdocs.yml
 * @param docsContentDir - Path to src/content/docs for validating file existence (optional)
 */
export function loadMultiSidebarFromMkdocs(mkdocsPath: string, docsContentDir?: string): MultiSidebar {
  // Set content directory for validation
  contentDir = docsContentDir || ''
  
  let mkdocsContent = fs.readFileSync(mkdocsPath, 'utf-8')
  
  // Strip Python-specific YAML tags that js-yaml can't handle
  mkdocsContent = mkdocsContent.replace(/!!python\/[^\s]+/g, '')
  
  const mkdocs = yaml.load(mkdocsContent) as { nav: unknown[] }
  
  const multiSidebar: MultiSidebar = {}
  
  for (const navItem of mkdocs.nav) {
    const converted = convertNavItem(navItem)
    if (!converted) continue
    
    // Skip external links and items without nested content
    if (converted.link) continue
    if (!converted.items || converted.items.length === 0) continue
    
    // Detect the path key from content or fall back to label
    const detectedPath = detectRootPath(converted.items)
    const pathKey = detectedPath || labelToPathKey(converted.label)
    
    multiSidebar[pathKey] = converted.items.map(toStarlightItem)
  }
  
  return multiSidebar
}

/**
 * Get tab configuration for Starlight's top navigation
 * Returns array of tabs with labels and their root slugs
 */
export function getTabsFromMkdocs(mkdocsPath: string, docsContentDir?: string): TabConfig[] {
  contentDir = docsContentDir || ''
  
  let mkdocsContent = fs.readFileSync(mkdocsPath, 'utf-8')
  mkdocsContent = mkdocsContent.replace(/!!python\/[^\s]+/g, '')
  
  const mkdocs = yaml.load(mkdocsContent) as { nav: unknown[] }
  
  const tabs: TabConfig[] = []
  
  for (const navItem of mkdocs.nav) {
    const converted = convertNavItem(navItem)
    if (!converted) continue
    
    // Skip external links
    if (converted.link) continue
    if (!converted.items || converted.items.length === 0) continue
    
    const detectedPath = detectRootPath(converted.items)
    const slug = detectedPath ? detectedPath.replace(/^\/|\/$/g, '') : converted.label.toLowerCase().replace(/\s+/g, '-')
    
    tabs.push({
      label: converted.label,
      slug,
      items: converted.items.map(toStarlightItem),
    })
  }
  
  return tabs
}
