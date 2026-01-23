import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const DOCS_DIR = "src/content/docs";
const INFO_BLOCK_PATTERN = '!!! info "Language Support"';
const INFO_BLOCK_CONTENT = "    This provider is only supported in Python.";
const COMMUNITY_BANNER = "{{ community_contribution_banner }}";
const SKIP_FILES = ["get-featured.md"];

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(currentDir: string) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

function processFile(content: string): { modified: boolean; newContent: string } {
  const hasLanguageBlock = content.includes(INFO_BLOCK_PATTERN);
  const hasCommunityBanner = content.includes(COMMUNITY_BANNER);
  const alreadyHasLanguages = content.includes("languages:");
  const alreadyHasCommunity = content.includes("community:");

  // Check if there's anything to do
  const needsLanguages = hasLanguageBlock && !alreadyHasLanguages;
  const needsCommunity = hasCommunityBanner && !alreadyHasCommunity;
  const needsToStripLanguageBlock = hasLanguageBlock;
  const needsToStripCommunityBanner = hasCommunityBanner;

  if (!needsLanguages && !needsCommunity && !needsToStripLanguageBlock && !needsToStripCommunityBanner) {
    return { modified: false, newContent: content };
  }

  const lines = content.split("\n");
  const newLines: string[] = [];
  const hasFrontMatter = lines[0] === "---";
  let inFrontMatter = false;
  let addedLanguages = alreadyHasLanguages;
  let addedCommunity = alreadyHasCommunity;
  let skipNextLine = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip the info block and its content line
    if (line === INFO_BLOCK_PATTERN) {
      skipNextLine = true;
      continue;
    }

    if (skipNextLine && line === INFO_BLOCK_CONTENT) {
      skipNextLine = false;
      // Skip blank line after the info block if present
      if (i + 1 < lines.length && lines[i + 1].trim() === "") {
        i++;
      }
      continue;
    }

    skipNextLine = false;

    // Skip community banner line
    if (line === COMMUNITY_BANNER) {
      // Skip blank line after the banner if present
      if (i + 1 < lines.length && lines[i + 1].trim() === "") {
        i++;
      }
      continue;
    }

    // Handle front-matter
    if (i === 0 && line === "---") {
      inFrontMatter = true;
      newLines.push(line);
      continue;
    }

    if (inFrontMatter && line === "---") {
      // End of front-matter - add fields before closing ---
      if (hasLanguageBlock && !addedLanguages) {
        newLines.push("languages: Python");
        addedLanguages = true;
      }
      if (hasCommunityBanner && !addedCommunity) {
        newLines.push("community: true");
        addedCommunity = true;
      }
      inFrontMatter = false;
      newLines.push(line);
      continue;
    }

    newLines.push(line);
  }

  // If no front-matter existed, add it at the beginning
  if (!hasFrontMatter) {
    const frontMatterFields: string[] = [];
    if (hasLanguageBlock) frontMatterFields.push("languages: Python");
    if (hasCommunityBanner) frontMatterFields.push("community: true");
    newLines.unshift("---", ...frontMatterFields, "---", "");
  }

  return { modified: true, newContent: newLines.join("\n") };
}

async function main() {
  console.log(`Scanning ${DOCS_DIR} for markdown files...`);

  const files = await getAllMarkdownFiles(DOCS_DIR);
  let processedCount = 0;

  for (const file of files) {
    // Skip special-cased files
    if (SKIP_FILES.some((skip) => file.endsWith(skip))) {
      continue;
    }

    const content = await readFile(file, "utf-8");
    const { modified, newContent } = processFile(content);

    if (modified) {
      await writeFile(file, newContent, "utf-8");
      console.log(`✓ Processed: ${file}`);
      processedCount++;
    }
  }

  console.log(`\nDone! Processed ${processedCount} file(s).`);
}

main().catch(console.error);
