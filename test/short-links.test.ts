import { describe, it, expect } from 'vitest'
import { parse } from 'yaml'
import fs from 'node:fs'
import path from 'node:path'
import { getCollection } from 'astro:content'

function loadShortLinks(): Record<string, string> {
  const raw = fs.readFileSync(path.resolve('src/config/short-links.yml'), 'utf-8')
  return parse(raw) as Record<string, string>
}

describe('short-links.yml', () => {
  it('parses without error', () => {
    expect(() => loadShortLinks()).not.toThrow()
  })

  it('all values are non-empty strings', () => {
    const links = loadShortLinks()
    for (const [alias, target] of Object.entries(links)) {
      expect(typeof target, `alias "${alias}" target should be a string`).toBe('string')
      expect(target.trim(), `alias "${alias}" target should not be empty`).not.toBe('')
    }
  })

  it('all keys are valid URL slugs (no spaces or special chars)', () => {
    const links = loadShortLinks()
    for (const alias of Object.keys(links)) {
      expect(alias, `"${alias}" should only contain lowercase letters, numbers, and hyphens`).toMatch(
        /^[a-z0-9-]+$/
      )
    }
  })

  it('all targets resolve to a real page in the docs collection', async () => {
    const links = loadShortLinks()
    const docs = await getCollection('docs')

    const validIds = new Set(docs.map((doc) => doc.id))

    const broken: { alias: string; target: string; slug: string }[] = []

    for (const [alias, target] of Object.entries(links)) {
      // Strip leading slash and hash fragment to get the bare slug
      const slug = target.replace(/^\//, '').replace(/#.*$/, '').replace(/\/$/, '')

      if (!validIds.has(slug)) {
        broken.push({ alias, target, slug })
      }
    }

    if (broken.length > 0) {
      console.log('\n=== Short-links with no matching content entry ===')
      for (const { alias, slug } of broken) {
        console.log(`  /r/${alias} → "${slug}" (not found)`)
      }
    }

    expect(broken).toEqual([])
  })
})
