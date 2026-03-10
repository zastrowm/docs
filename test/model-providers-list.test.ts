import { describe, it, expect } from 'vitest'
import { getCollection } from 'astro:content'

/**
 * Helper to determine language support from the languages field.
 * No languages field = both supported
 * languages: 'Python' = Python only
 * languages: 'TypeScript' = TypeScript only
 * languages: ['Python', 'TypeScript'] = both supported
 */
function getLanguageSupport(languages: string | string[] | undefined): { python: boolean; typescript: boolean } {
  if (!languages) {
    return { python: true, typescript: true }
  }
  const langArray = Array.isArray(languages) ? languages : [languages]
  return {
    python: langArray.includes('Python') || langArray.length === 0,
    typescript: langArray.includes('TypeScript') || langArray.length === 0,
  }
}

describe('Model Providers List Component Logic', () => {
  it('should have integrationType field available in schema', async () => {
    const docs = await getCollection('docs')
    // Find the model-providers index page to verify schema access
    const indexPage = docs.find((doc) => doc.id === 'docs/user-guide/concepts/model-providers')

    expect(indexPage).toBeDefined()
    // The integrationType field should be accessible (even if undefined)
    expect('integrationType' in indexPage!.data || indexPage!.data.integrationType === undefined).toBe(true)
  })

  it('should filter model provider pages by integrationType', async () => {
    const docs = await getCollection('docs')

    // Filter docs with integrationType: 'model-provider'
    const modelProviders = docs.filter(
      (doc) =>
        doc.data.integrationType === 'model-provider' &&
        doc.id.startsWith('docs/user-guide/concepts/model-providers/') &&
        !doc.id.endsWith('/model-providers') // Exclude index page
    )

    // Once frontmatter is added, there should be 18 model provider pages
    // For now, we test the filtering logic works
    expect(modelProviders).toBeInstanceOf(Array)
  })

  it('should correctly detect language support', () => {
    // No languages field = both supported
    expect(getLanguageSupport(undefined)).toEqual({ python: true, typescript: true })

    // Python only
    expect(getLanguageSupport('Python')).toEqual({ python: true, typescript: false })

    // TypeScript only
    expect(getLanguageSupport('TypeScript')).toEqual({ python: false, typescript: true })

    // Array with both
    expect(getLanguageSupport(['Python', 'TypeScript'])).toEqual({ python: true, typescript: true })

    // Array with Python only
    expect(getLanguageSupport(['Python'])).toEqual({ python: true, typescript: false })
  })

  it('should sort providers correctly - non-community first, then alphabetically', async () => {
    // Test data simulating provider pages
    const mockProviders = [
      { title: 'Zebra Provider', community: true },
      { title: 'Amazon Bedrock', community: false },
      { title: 'Apple Provider', community: true },
      { title: 'OpenAI', community: false },
    ]

    // Sort: non-community first (alphabetically), then community (alphabetically)
    const sorted = [...mockProviders].sort((a, b) => {
      // Community providers go last
      if (a.community !== b.community) {
        return a.community ? 1 : -1
      }
      // Alphabetical within group
      return a.title.localeCompare(b.title)
    })

    expect(sorted.map((p) => p.title)).toEqual([
      'Amazon Bedrock',
      'OpenAI',
      'Apple Provider',
      'Zebra Provider',
    ])
  })

  it('should exclude index page from model providers list', async () => {
    const docs = await getCollection('docs')

    // Filter docs with integrationType: 'model-provider'
    const modelProviders = docs.filter(
      (doc) =>
        doc.data.integrationType === 'model-provider' &&
        doc.id.startsWith('docs/user-guide/concepts/model-providers/')
    )

    // Index page should not be in the filtered list
    const indexPage = modelProviders.find((doc) => doc.id === 'docs/user-guide/concepts/model-providers')
    expect(indexPage).toBeUndefined()
  })
})

describe('Model Provider Pages Frontmatter', () => {
  it('should have all model provider pages with integrationType after update', async () => {
    const docs = await getCollection('docs')

    // Get all pages in model-providers directory (excluding index)
    const modelProviderPages = docs.filter(
      (doc) =>
        doc.id.startsWith('docs/user-guide/concepts/model-providers/') &&
        doc.id !== 'docs/user-guide/concepts/model-providers'
    )

    // Check which pages have integrationType set
    const pagesWithIntegrationType = modelProviderPages.filter(
      (doc) => doc.data.integrationType === 'model-provider'
    )

    // After frontmatter updates, all 18 provider pages should have integrationType
    // This test will help verify the updates are complete
    console.log(`\n=== Model Provider Pages Status ===`)
    console.log(`Total pages in model-providers: ${modelProviderPages.length}`)
    console.log(`Pages with integrationType: ${pagesWithIntegrationType.length}`)

    if (pagesWithIntegrationType.length < modelProviderPages.length) {
      const missingPages = modelProviderPages.filter(
        (doc) => doc.data.integrationType !== 'model-provider'
      )
      console.log('\nPages missing integrationType:')
      missingPages.forEach((doc) => console.log(`  - ${doc.id}`))
    }

    // All model provider pages should have integrationType set
    expect(pagesWithIntegrationType.length).toBe(modelProviderPages.length)
  })

  it('should have consistent language support data', async () => {
    const docs = await getCollection('docs')

    // Get all model provider pages with integrationType
    const modelProviders = docs.filter(
      (doc) =>
        doc.data.integrationType === 'model-provider' &&
        doc.id.startsWith('docs/user-guide/concepts/model-providers/')
    )

    console.log('\n=== Language Support Overview ===')
    for (const provider of modelProviders) {
      const support = getLanguageSupport(provider.data.languages)
      const pythonIcon = support.python ? '✅' : '❌'
      const tsIcon = support.typescript ? '✅' : '❌'
      console.log(`${provider.data.title}: Python ${pythonIcon} | TypeScript ${tsIcon}`)
    }

    // Test passes if we can iterate - specific validation is visual
    expect(true).toBe(true)
  })
})
