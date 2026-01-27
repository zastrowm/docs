import { defineCollection } from 'astro:content';
import { docsLoader, } from '@astrojs/starlight/loaders';
import { z } from 'astro/zod'
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema({
    extend: z.object({
      languages: z.string().optional(),
      community: z.boolean().default(false),
      experimental: z.boolean().default(false),
    }),
  }) }),
};


