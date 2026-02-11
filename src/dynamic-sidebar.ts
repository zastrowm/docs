import type { StarlightRouteData } from '@astrojs/starlight/route-data'

type SidebarEntry = StarlightRouteData['sidebar'][number]
type SidebarGroup = Extract<SidebarEntry, { type: 'group' }>
type SidebarLink = Extract<SidebarEntry, { type: 'link' }>

export type { SidebarEntry, SidebarGroup, SidebarLink }

/**
 * Convert module_name to Display Name (e.g., "bidi_types" -> "Bidi Types")
 */
export function getDisplayName(moduleName: string): string {
  return moduleName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Minimal doc info needed for sidebar generation
 */
export interface DocInfo {
  id: string
  title: string
}

/**
 * Build a hierarchical sidebar from Python API docs.
 * Groups modules by their path segments after "strands."
 *
 * Example:
 * - strands.agent.agent -> Agent > Agent
 * - strands.experimental.bidi.types.events -> Experimental > Bidi > Types > Events
 */
export function buildPythonApiSidebar(docs: DocInfo[], currentSlug: string): SidebarEntry[] {
  const pythonApiDocs = docs.filter(
    (doc) => doc.id.startsWith('api/python/') && !doc.id.endsWith('api/python/index')
  )

  // Build a nested structure from module names
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tree: Record<string, any> = {}

  for (const doc of pythonApiDocs) {
    // Extract module name from title (e.g., "strands.agent.agent")
    const moduleName = doc.title
    if (!moduleName.startsWith('strands.')) continue

    // Split into parts after "strands." (e.g., ["agent", "agent"])
    const parts = moduleName.replace('strands.', '').split('.')

    // Build nested tree structure
    let current = tree
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]!
      if (!current[part]) {
        current[part] = { __children: {} }
      }
      current = current[part].__children
    }

    // Add the leaf node with doc info
    const leafName = parts[parts.length - 1]!
    current[leafName] = {
      __doc: doc,
      __children: current[leafName]?.__children ?? {},
    }
  }

  // Convert tree to sidebar entries
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function treeToSidebar(node: Record<string, any>, depth: number = 0): SidebarEntry[] {
    const entries: SidebarEntry[] = []

    for (const [key, value] of Object.entries(node)) {
      const displayName = getDisplayName(key)
      const hasChildren = Object.keys(value.__children).length > 0
      const hasDoc = value.__doc !== undefined

      if (hasDoc && !hasChildren) {
        // Leaf node - create a link
        const doc = value.__doc
        const href = `/${doc.id}/`
        const link: SidebarLink = {
          type: 'link',
          label: displayName,
          href,
          isCurrent: currentSlug === doc.id,
          badge: undefined,
          attrs: {},
        }
        entries.push(link)
      } else if (hasChildren) {
        // Group node
        const childEntries = treeToSidebar(value.__children, depth + 1)

        // If this node also has a doc, add it as the first item in the group
        if (hasDoc) {
          const doc = value.__doc
          const href = `/${doc.id}/`
          childEntries.unshift({
            type: 'link',
            label: 'Overview',
            href,
            isCurrent: currentSlug === doc.id,
            badge: undefined,
            attrs: {},
          })
        }

        const group: SidebarGroup = {
          type: 'group',
          label: displayName,
          entries: childEntries,
          collapsed: depth >= 1,
          badge: undefined,
        }
        entries.push(group)
      }
    }

    // Sort entries: alphabetically A-Z, with "Experimental" at the end
    return entries.sort((a, b) => {
      // Experimental always goes last
      if (a.label === 'Experimental') return 1
      if (b.label === 'Experimental') return -1

      // Alphabetically regardless of type
      return a.label.localeCompare(b.label)
    })
  }

  return treeToSidebar(tree)
}
