import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { z } from 'astro/zod'

const slimSchema = z.object({
  head: z.array(z.object({})).default([]),
  sidebar: z
    .object({
      hidden: z.boolean().default(false),
    })
    .default({}),
  languages: z.string().optional(),
  community: z.boolean().default(false),
})

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: slimSchema }),
};

