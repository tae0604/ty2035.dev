import { defineCollection, z } from 'astro:content';

// ——— Blog posts collection ———
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    readTime: z.string().optional(), // e.g. "3 min read"
  }),
});

// ——— Entry projects collection ———
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    // thumbnail options (choose ONE of the following):
    //   thumbImage — path to an image in /public/thumbnails/...
    //   thumbColor + thumbIcon — generated gradient thumbnail
    thumbImage: z.string().optional(),
    thumbColor: z
      .enum(['warm', 'cool', 'sun', 'fresh', 'muted', 'navy'])
      .default('navy'),
    thumbIcon: z
      .enum(['circle', 'square', 'triangle', 'wave', 'dots', 'ring'])
      .default('circle'),
    featured: z.boolean().default(true),
    order: z.number().default(99), // lower = appears first
  }),
});

export const collections = { blog, projects };
