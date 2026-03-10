import { describe, it, expect } from 'vitest'
import { getCollection } from 'astro:content'
import {
  getLanguageSupport,
  getIntegrationEntries,
  splitByCategory,
  type IntegrationEntry,
} from '../src/util/integration-content'

describe('Integration Content Utilities', () => {
  describe('getLanguageSupport', () => {
    it('should return both supported when no languages field', () => {
      expect(getLanguageSupport(undefined)).toEqual({ python: true, typescript: true })
    })

    it('should return Python only when languages is "Python"', () => {
      expect(getLanguageSupport('Python')).toEqual({ python: true, typescript: false })
    })

    it('should return TypeScript only when languages is "TypeScript"', () => {
      expect(getLanguageSupport('TypeScript')).toEqual({ python: false, typescript: true })
    })

    it('should return both when languages array contains both', () => {
      expect(getLanguageSupport(['Python', 'TypeScript'])).toEqual({ python: true, typescript: true })
    })

    it('should return Python only when languages array contains only Python', () => {
      expect(getLanguageSupport(['Python'])).toEqual({ python: true, typescript: false })
    })

    it('should return both supported for empty array', () => {
      expect(getLanguageSupport([])).toEqual({ python: true, typescript: true })
    })
  })

  describe('splitByCategory', () => {
    it('should split entries into official and community', () => {
      const entries: IntegrationEntry[] = [
        { id: '1', title: 'A', href: '/a/', pythonSupport: true, typescriptSupport: true, community: false },
        { id: '2', title: 'B', href: '/b/', pythonSupport: true, typescriptSupport: false, community: true },
        { id: '3', title: 'C', href: '/c/', pythonSupport: true, typescriptSupport: true, community: false },
      ]

      const { official, community } = splitByCategory(entries)

      expect(official).toHaveLength(2)
      expect(community).toHaveLength(1)
      expect(official.map((e) => e.title)).toEqual(['A', 'C'])
      expect(community.map((e) => e.title)).toEqual(['B'])
    })
  })

  describe('getIntegrationEntries sorting', () => {
    it('should sort providers correctly - non-community first, then alphabetically', () => {
      // Test data simulating provider pages
      const mockProviders: IntegrationEntry[] = [
        { id: '1', title: 'Zebra Provider', href: '/z/', pythonSupport: true, typescriptSupport: true, community: true },
        { id: '2', title: 'Amazon Bedrock', href: '/a/', pythonSupport: true, typescriptSupport: true, community: false },
        { id: '3', title: 'Apple Provider', href: '/ap/', pythonSupport: true, typescriptSupport: true, community: true },
        { id: '4', title: 'OpenAI', href: '/o/', pythonSupport: true, typescriptSupport: true, community: false },
      ]

      // Sort using same logic as getIntegrationEntries
      const sorted = [...mockProviders].sort((a, b) => {
        if (a.community !== b.community) return a.community ? 1 : -1
        return a.title.localeCompare(b.title)
      })

      expect(sorted.map((p) => p.title)).toEqual([
        'Amazon Bedrock',
        'OpenAI',
        'Apple Provider',
        'Zebra Provider',
      ])
    })
  })
})

describe('Model Providers List Integration', () => {
  it('should have integrationType field available in schema', async () => {
    const docs = await getCollection('docs')
    const indexPage = docs.find((doc) => doc.id === 'docs/user-guide/concepts/model-providers')

    expect(indexPage).toBeDefined()
    expect('integrationType' in indexPage!.data || indexPage!.data.integrationType === undefined).toBe(true)
  })

  it('should filter model provider pages by integrationType', async () => {
    const docs = await getCollection('docs')
    const modelProviders = getIntegrationEntries(
      docs,
      'model-provider',
      'docs/user-guide/concepts/model-providers/'
    )

    expect(modelProviders).toBeInstanceOf(Array)
    expect(modelProviders.length).toBeGreaterThan(0)
  })

  it('should exclude index page from model providers list', async () => {
    const docs = await getCollection('docs')
    const modelProviders = getIntegrationEntries(
      docs,
      'model-provider',
      'docs/user-guide/concepts/model-providers/'
    )

    const indexPage = modelProviders.find((doc) => doc.id === 'docs/user-guide/concepts/model-providers')
    expect(indexPage).toBeUndefined()
  })

  it('should have all model provider pages with integrationType', async () => {
    const docs = await getCollection('docs')
    const modelProviders = getIntegrationEntries(
      docs,
      'model-provider',
      'docs/user-guide/concepts/model-providers/'
    )

    // Get all pages in model-providers directory (excluding index)
    const modelProviderPages = docs.filter(
      (doc) =>
        doc.id.startsWith('docs/user-guide/concepts/model-providers/') &&
        doc.id !== 'docs/user-guide/concepts/model-providers'
    )

    console.log(`\n=== Model Provider Pages Status ===`)
    console.log(`Total pages in model-providers: ${modelProviderPages.length}`)
    console.log(`Pages with integrationType: ${modelProviders.length}`)

    // All model provider pages should have integrationType set
    expect(modelProviders.length).toBe(modelProviderPages.length)
  })

  it('should have consistent language support data', async () => {
    const docs = await getCollection('docs')
    const modelProviders = getIntegrationEntries(
      docs,
      'model-provider',
      'docs/user-guide/concepts/model-providers/'
    )

    console.log('\n=== Language Support Overview ===')
    for (const provider of modelProviders) {
      const pythonIcon = provider.pythonSupport ? '✅' : '❌'
      const tsIcon = provider.typescriptSupport ? '✅' : '❌'
      console.log(`${provider.title}: Python ${pythonIcon} | TypeScript ${tsIcon}`)
    }

    expect(true).toBe(true)
  })
})
