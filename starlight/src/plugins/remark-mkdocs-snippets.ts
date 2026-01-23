/**
 * Remark plugin to handle mkdocs-style code snippets.
 * 
 * Supports the syntax:
 * ```typescript
 * --8<-- "path/to/file.ts:section_name"
 * ```
 * 
 * Which will be replaced with the content between:
 * // --8<-- [start:section_name]
 * ...code...
 * // --8<-- [end:section_name]
 */

import { visit } from 'unist-util-visit'
import fs from 'node:fs'
import path from 'node:path'
import type { Root, Code } from 'mdast'
import type { VFile } from 'vfile'

interface RemarkMkdocsSnippetsOptions {
  /** Base directory for resolving snippet paths (defaults to src/content/docs) */
  baseDir?: string
}

// Regex to match mkdocs snippet syntax: --8<-- "path:section" or --8<-- "path"
const SNIPPET_PATTERN = /^-+8<-+\s*"([^"]+)"$/

// Regex to find section markers in source files (with optional spaces around colon)
const START_MARKER_PATTERN = /--8<--\s*\[start:\s*([^\]]+?)\s*\]/
const END_MARKER_PATTERN = /--8<--\s*\[end:\s*([^\]]+?)\s*\]/

function extractSection(content: string, sectionName: string): string | null {
  const lines = content.split('\n')
  let inSection = false
  const sectionLines: string[] = []
  
  for (const line of lines) {
    const startMatch = line.match(START_MARKER_PATTERN)
    const endMatch = line.match(END_MARKER_PATTERN)
    
    if (startMatch && startMatch[1].trim() === sectionName.trim()) {
      inSection = true
      continue
    }
    
    if (endMatch && endMatch[1].trim() === sectionName.trim()) {
      break
    }
    
    if (inSection) {
      sectionLines.push(line)
    }
  }
  
  if (sectionLines.length === 0) {
    return null
  }
  
  // Remove common leading indentation
  const nonEmptyLines = sectionLines.filter(line => line.trim().length > 0)
  if (nonEmptyLines.length === 0) {
    return sectionLines.join('\n')
  }
  
  const minIndent = Math.min(
    ...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/)
      return match ? match[1].length : 0
    })
  )
  
  return sectionLines
    .map(line => line.slice(minIndent))
    .join('\n')
    .trim()
}

function resolveSnippetPath(snippetPath: string, baseDir: string): string {
  return path.resolve(baseDir, snippetPath)
}

export default function remarkMkdocsSnippets(options: RemarkMkdocsSnippetsOptions = {}) {
  // Default base directory is src/content/docs relative to project root
  const baseDir = options.baseDir || path.resolve(process.cwd(), 'src/content/docs')
  
  return (tree: Root, file: VFile) => {
    visit(tree, 'code', (node: Code) => {
      if (!node.value) return
      
      const lines = node.value.trim().split('\n')
      const processedLines: string[] = []
      let hasSnippets = false
      
      for (const line of lines) {
        const trimmedLine = line.trim()
        const match = trimmedLine.match(SNIPPET_PATTERN)
        
        if (match) {
          hasSnippets = true
          const reference = match[1]
          
          // Parse path and optional section: "path:section" or just "path"
          const colonIndex = reference.lastIndexOf(':')
          let filePath: string
          let sectionName: string | null = null
          
          // Check if there's a section name (colon not part of Windows path like C:)
          if (colonIndex > 0 && reference[colonIndex - 1] !== '\\') {
            filePath = reference.slice(0, colonIndex)
            sectionName = reference.slice(colonIndex + 1)
          } else {
            filePath = reference
          }
          
          const resolvedPath = resolveSnippetPath(filePath, baseDir)
          
          try {
            const fileContent = fs.readFileSync(resolvedPath, 'utf-8')
            
            let snippetContent: string
            if (sectionName) {
              const extracted = extractSection(fileContent, sectionName)
              if (extracted === null) {
                console.warn(`[remark-mkdocs-snippets] Section "${sectionName}" not found in ${resolvedPath}`)
                processedLines.push(`// Section "${sectionName}" not found in ${filePath}`)
                continue
              }
              snippetContent = extracted
            } else {
              snippetContent = fileContent.trim()
            }
            
            processedLines.push(snippetContent)
          } catch (err) {
            console.warn(`[remark-mkdocs-snippets] Failed to read file: ${resolvedPath}`)
            processedLines.push(`// Failed to load snippet from ${filePath}`)
          }
        } else {
          processedLines.push(line)
        }
      }
      
      if (hasSnippets) {
        node.value = processedLines.join('\n')
      }
    })
  }
}
