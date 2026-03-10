/**
 * Utilities for querying and filtering integration content from the docs collection.
 *
 * This module provides typed helper functions for working with integration pages
 * (model providers, tools, etc.) that have `integrationType` frontmatter.
 */

import type { CollectionEntry } from 'astro:content'

/**
 * Integration types that can be used to filter content.
 */
export type IntegrationType = 'model-provider'

/**
 * Represents language support for an integration.
 */
export interface LanguageSupport {
  python: boolean
  typescript: boolean
}

/**
 * Represents a processed integration entry with computed properties.
 */
export interface IntegrationEntry {
  /** The document ID (path) */
  id: string
  /** The page title */
  title: string
  /** Optional sidebar label override */
  sidebarLabel?: string
  /** The href to the page */
  href: string
  /** Python support status */
  pythonSupport: boolean
  /** TypeScript support status */
  typescriptSupport: boolean
  /** Whether this is a community-contributed integration */
  community: boolean
}

/**
 * Determines language support based on the `languages` frontmatter field.
 *
 * Convention:
 * - No `languages` field = both Python and TypeScript supported
 * - `languages: 'Python'` = Python only
 * - `languages: 'TypeScript'` = TypeScript only
 * - `languages: ['Python', 'TypeScript']` = both supported
 */
export function getLanguageSupport(languages: string | string[] | undefined): LanguageSupport {
  if (!languages) {
    return { python: true, typescript: true }
  }

  const langArray = Array.isArray(languages) ? languages : [languages]

  // Empty array means both supported
  if (langArray.length === 0) {
    return { python: true, typescript: true }
  }

  return {
    python: langArray.includes('Python'),
    typescript: langArray.includes('TypeScript'),
  }
}

/**
 * Filters and processes docs collection entries by integration type.
 *
 * @param docs - The full docs collection from `getCollection('docs')`
 * @param integrationType - The integration type to filter by
 * @param basePath - The base path prefix to filter entries (e.g., 'docs/user-guide/concepts/model-providers/')
 * @returns Sorted array of integration entries (non-community first, then alphabetically)
 */
export function getIntegrationEntries(
  docs: CollectionEntry<'docs'>[],
  integrationType: IntegrationType,
  basePath: string
): IntegrationEntry[] {
  // Remove trailing slash for consistent comparison
  const normalizedBasePath = basePath.replace(/\/$/, '')

  return docs
    .filter((doc) => {
      // Must have matching integrationType
      if (doc.data.integrationType !== integrationType) return false

      // Must be within the base path
      if (!doc.id.startsWith(basePath)) return false

      // Exclude the index page (exact match with base path without trailing content)
      if (doc.id === normalizedBasePath || doc.id === basePath.slice(0, -1)) return false

      return true
    })
    .map((doc) => {
      const { python, typescript } = getLanguageSupport(doc.data.languages)

      // Get sidebar label if available
      const sidebarLabel = (doc.data.sidebar as { label?: string } | undefined)?.label

      return {
        id: doc.id,
        title: doc.data.title as string,
        sidebarLabel,
        href: `/docs/${doc.id.replace(/^docs\//, '')}/`,
        pythonSupport: python,
        typescriptSupport: typescript,
        community: doc.data.community === true,
      }
    })
    .sort((a, b) => {
      // Community providers go last
      if (a.community !== b.community) {
        return a.community ? 1 : -1
      }
      // Alphabetical by display name within each group
      const aName = a.sidebarLabel || a.title
      const bName = b.sidebarLabel || b.title
      return aName.localeCompare(bName)
    })
}

/**
 * Splits integration entries into official and community groups.
 *
 * @param entries - Array of integration entries
 * @returns Object with `official` and `community` arrays
 */
export function splitByCategory(entries: IntegrationEntry[]): {
  official: IntegrationEntry[]
  community: IntegrationEntry[]
} {
  return {
    official: entries.filter((e) => !e.community),
    community: entries.filter((e) => e.community),
  }
}
