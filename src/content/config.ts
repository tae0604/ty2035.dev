import { defineCollection, z } from 'astro:content';

// ——— Blog posts collection ———
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // use *word* markers for italic-serif segments, e.g. "Hello *world*"
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
    title: z.string(), // supports *word* markers for italic-serif
    description: z.string(),
    year: z.number(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),

    // Thumbnail: image (in /public/thumbnails/) OR color+icon fallback
    thumbImage: z.string().optional(),
    thumbColor: z
      .enum(['warm', 'cool', 'sun', 'fresh', 'muted', 'navy'])
      .default('navy'),
    thumbIcon: z
      .enum(['circle', 'square', 'triangle', 'wave', 'dots', 'ring'])
      .default('circle'),

    featured: z.boolean().default(true),
    order: z.number().default(99), // lower = appears first

    // Video: YouTube or Vimeo URL. Auto-converted to embed.
    videoUrl: z.string().url().optional(),

    // Details table: small key/value pairs shown above the body
    // e.g. [{ key: "Role", value: "Designer & developer" }]
    details: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, projects };