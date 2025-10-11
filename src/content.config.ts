import { defineCollection } from "astro:content"
import { docsSchema } from "@astrojs/starlight/schema"
import { glob, type Loader, type LoaderContext } from "astro/loaders"

type GlobOptions = Parameters<typeof glob>[0]

export function getCollectionPathFromRoot(
  collection: "docs",
  { root, srcDir }: { root: URL | string; srcDir: URL | string },
) {
  return (
    (typeof srcDir === "string" ? srcDir : srcDir.pathname).replace(
      typeof root === "string" ? root : root.pathname,
      "",
    ) +
    "content/" +
    collection
  )
}

export const collections = {
  blah: defineCollection({
    loader: {
      name: "starlight-docs-loader",
      load: async (context: LoaderContext) => {
        const extensions = ["markdown", "mdown", "mkdn", "mkd", "mdwn", "md", "mdx"]

        if (context.config.integrations.find(({ name }) => name === "@astrojs/markdoc")) {
          // https://github.com/withastro/astro/blob/main/packages/integrations/markdoc/src/content-entry-type.ts#L28
          extensions.push("mdoc")
        }

        console.warn("starting")
        const value = await glob({
          //base: "./src/content/docs",
          base: getCollectionPathFromRoot("docs", context.config),
          pattern: `**/*.md`,
          //pattern: `**/*.(README.md|agent.md)`,
        }).load(context)
        console.warn("value", value)
        return value
      },
    },
    schema: docsSchema(),
  }),

  docs: defineCollection({
    loader: {
      name: "starlight-docs-loader",
      load: createGlobLoadFn("docs"),
    },
    schema: docsSchema(),
  }),
}
const docsExtensions = ["markdown", "mdown", "mkdn", "mkd", "mdwn", "md", "mdx"]

function createGlobLoadFn(collection: "docs"): Loader["load"] {
  return (context: LoaderContext) => {
    const extensions = docsExtensions

    if (collection === "docs" && context.config.integrations.find(({ name }) => name === "@astrojs/markdoc")) {
      // https://github.com/withastro/astro/blob/main/packages/integrations/markdoc/src/content-entry-type.ts#L28
      extensions.push("mdoc")
    }

    const options: GlobOptions = {
      base: "docs/user-guide/concepts/agents",
      pattern: `**/[^_]*.{${extensions.join(",")}}`,
    }

    return glob(options).load(context)
  }
}
