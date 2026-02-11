import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data'
import { getCollection } from 'astro:content'
import { buildPythonApiSidebar, type DocInfo } from './dynamic-sidebar'

type SidebarEntry = StarlightRouteData['sidebar'][number]

/**
 * Route middleware that filters the sidebar to only show items
 * from the current page's top-level group.
 *
 * For Python API pages, generates a hierarchical sidebar from the docs collection.
 */
export const onRequest = defineRouteMiddleware(async (context) => {
  const { starlightRoute } = context.locals
  const { sidebar } = starlightRoute
  const currentSlug = starlightRoute.id

  // Check if we're on a Python API page
  if (currentSlug.startsWith('api/python')) {
    const docs = await getCollection('docs')
    const docInfos: DocInfo[] = docs.map((doc) => ({
      id: doc.id,
      title: doc.data.title as string,
    }))

    const pythonSidebar = buildPythonApiSidebar(docInfos, currentSlug)

    // Add index link at the top
    pythonSidebar.unshift({
      type: 'link',
      label: 'Overview',
      href: '/api/python/',
      isCurrent: currentSlug === 'api/python/index',
      badge: undefined,
      attrs: {},
    })

    starlightRoute.sidebar = pythonSidebar
    return
  }

  // Find which top-level group contains the current page
  const findCurrentInGroup = (items: SidebarEntry[]): boolean => {
    for (const item of items) {
      if (item.type === 'link' && item.isCurrent) return true
      if (item.type === 'group' && findCurrentInGroup(item.entries)) return true
    }
    return false
  }

  // Expand first-level groups (set collapsed to false)
  const expandFirstLevelGroups = (items: SidebarEntry[]): SidebarEntry[] => {
    return items.map((item) => {
      if (item.type === 'group') {
        return { ...item, collapsed: false }
      }
      return item
    })
  }

  // Find the top-level group that contains the current page
  for (const entry of sidebar) {
    if (entry.type === 'group' && findCurrentInGroup(entry.entries)) {
      // Replace sidebar with just this group's entries, with first-level expanded
      starlightRoute.sidebar = expandFirstLevelGroups(entry.entries)
      return
    }
  }

  // If no group found (e.g., top-level page), expand first-level groups anyway
  starlightRoute.sidebar = expandFirstLevelGroups(sidebar)
})
