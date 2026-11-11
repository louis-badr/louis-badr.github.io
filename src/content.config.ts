import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      year: z.coerce.number(),
      order: z.number(),
      image: image(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    }),
});

// Peer-reviewed papers, posters, theses... kept apart from the projects.
const publications = defineCollection({
  loader: file("src/content/publications.json"),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    type: z.string(), // e.g. "Full paper", "Demo", "Poster", "Thesis"
    doi: z.string().optional(), // e.g. "10.1145/3746058.3758471"
    award: z.string().optional(), // e.g. "Best Paper Award"
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: file("src/content/gallery.json"),
  schema: ({ image }) =>
    z.object({
      image: image(),
      animation: z.string().optional(),
      caption: z.string(),
      tag: z.string(),
      year: z.number(),
      order: z.number(),
    }),
});

export const collections = { projects, publications, notes, gallery };
